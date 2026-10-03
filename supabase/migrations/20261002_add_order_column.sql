-- VYOMA Database Migration: Add order_index column & atomic reordering function
-- Run this in your Supabase SQL Editor (Dashboard -> SQL Editor)

-- 1. Add order_index to services table if not present & backfill 1..n
ALTER TABLE services ADD COLUMN IF NOT EXISTS order_index integer;
WITH numbered_services AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY id ASC) as seq
  FROM services
)
UPDATE services s
SET order_index = n.seq
FROM numbered_services n
WHERE s.id = n.id AND s.order_index IS NULL;

-- 2. Add order_index to solutions table if not present & backfill 1..n
ALTER TABLE solutions ADD COLUMN IF NOT EXISTS order_index integer;
WITH numbered_solutions AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY id ASC) as seq
  FROM solutions
)
UPDATE solutions s
SET order_index = n.seq
FROM numbered_solutions n
WHERE s.id = n.id AND s.order_index IS NULL;

-- 3. Add order_index to posts table if not present & backfill 1..n
ALTER TABLE posts ADD COLUMN IF NOT EXISTS order_index integer;
WITH numbered_posts AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY COALESCE(published_at, created_at) DESC, id ASC) as seq
  FROM posts
)
UPDATE posts p
SET order_index = n.seq
FROM numbered_posts n
WHERE p.id = n.seq AND p.order_index IS NULL;

-- 4. Normalize projects, team, faqs order_index to contiguous 1..n
WITH numbered_projects AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY COALESCE(order_index, id) ASC) as seq
  FROM projects
)
UPDATE projects p
SET order_index = n.seq
FROM numbered_projects n
WHERE p.id = n.id;

WITH numbered_team AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY COALESCE(order_index, id) ASC) as seq
  FROM team
)
UPDATE team t
SET order_index = n.seq
FROM numbered_team n
WHERE t.id = n.id;

WITH numbered_faqs AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY COALESCE(order_index, id) ASC) as seq
  FROM faqs
)
UPDATE faqs f
SET order_index = n.seq
FROM numbered_faqs n
WHERE f.id = n.id;

-- 5. Stored Procedure for atomic transactional reordering
CREATE OR REPLACE FUNCTION reorder_records(target_table text, id_order int[])
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  allowed_tables text[] := ARRAY['projects', 'services', 'solutions', 'posts', 'faqs', 'team'];
  item_id int;
  idx int := 1;
BEGIN
  -- Strict whitelist check
  IF NOT (target_table = ANY(allowed_tables)) THEN
    RAISE EXCEPTION 'Table % is not whitelisted for reordering', target_table;
  END IF;

  -- Update in a single transaction
  FOREACH item_id IN ARRAY id_order LOOP
    EXECUTE format('UPDATE %I SET order_index = $1 WHERE id = $2', target_table)
    USING idx, item_id;
    idx := idx + 1;
  END LOOP;

  RETURN true;
END;
$$;
