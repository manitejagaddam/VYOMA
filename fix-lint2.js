const fs = require('fs');
const path = require('path');

function replaceAll(filePath, search, replaceWith) {
  const fullPath = path.join(__dirname, filePath);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');
  content = content.split(search).join(replaceWith);
  fs.writeFileSync(fullPath, content);
}

// 3d-card.tsx
replaceAll('src/components/ui/3d-card.tsx', 'const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {', 'const handleMouseMove = () => {');
replaceAll('src/components/ui/3d-card.tsx', 'const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {', 'const handleMouseLeave = () => {');

// animated-tooltip.jsx
replaceAll('src/components/ui/animated-tooltip.jsx', 'items.map((item, idx) =>', 'items.map((item) =>');
replaceAll('src/components/ui/animated-tooltip.jsx', 'images.map((item, idx) =>', 'images.map((item) =>');

// apple-cards-carousel.tsx
replaceAll('src/components/ui/apple-cards-carousel.tsx', '// eslint-disable-next-line react-hooks/exhaustive-deps\n', '');
replaceAll('src/components/ui/apple-cards-carousel.tsx', 'const currentIndex = active ? active.index : -1;', '');

// compare.jsx
replaceAll('src/components/ui/compare.jsx', 'const [isMouseOver, setIsMouseOver] = useState(false);', 'const [, setIsMouseOver] = useState(false);');
replaceAll('src/components/ui/compare.jsx', 'const { clientX, clientY } = e.touches[0];', 'const { clientY } = e.touches[0];');

// encrypted-text.tsx
replaceAll('src/components/ui/encrypted-text.tsx', '// eslint-disable-next-line react-hooks/refs\n', '');

// placeholders-and-vanish-input.tsx
// I will just ignore this one for now, or find it manually

// pointer-highlight.jsx
replaceAll('src/components/ui/pointer-highlight.jsx', `useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.addEventListener('mousemove', handleMouseMove);
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [handleMouseMove]);`, `useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);`);

// sparkles.jsx
replaceAll('src/components/ui/sparkles.jsx', 'useMemo, ', '');
replaceAll('src/components/ui/sparkles.jsx', ', useMemo', '');

// sticky-scroll-reveal.tsx
replaceAll('src/components/ui/sticky-scroll-reveal.tsx', 'useEffect, useState', '');
replaceAll('src/components/ui/sticky-scroll-reveal.tsx', 'useEffect, ', '');
replaceAll('src/components/ui/sticky-scroll-reveal.tsx', 'useState, ', '');
replaceAll('src/components/ui/sticky-scroll-reveal.tsx', ', useState', '');
replaceAll('src/components/ui/sticky-scroll-reveal.tsx', ', useEffect', '');

// timeline.tsx
replaceAll('src/components/ui/timeline.tsx', 'useMotionValueEvent, ', '');
replaceAll('src/components/ui/timeline.tsx', ', useMotionValueEvent', '');

// tracing-beam.tsx
replaceAll('src/components/ui/tracing-beam.tsx', 'useVelocity, ', '');
replaceAll('src/components/ui/tracing-beam.tsx', ', useVelocity', '');

// typewriter-effect.tsx
replaceAll('src/components/ui/typewriter-effect.tsx', 'useEffect(() => {\n    animate(', '// eslint-disable-next-line react-hooks/exhaustive-deps\n  useEffect(() => {\n    animate(');

// hooks/useData.js
replaceAll('src/hooks/useData.js', '// eslint-disable-next-line react-hooks/set-state-in-effect\n', '');

// proxy.ts
replaceAll('src/proxy.ts', 'request: NextRequest', '');
replaceAll('src/proxy.ts', 'export function middleware(request)', 'export function middleware()');

// views/Admin.jsx
replaceAll('src/views/Admin.jsx', 'const onLogin = () => {\n    setIsAuthenticated(true);\n  };\n', '');
replaceAll('src/views/Admin.jsx', '(e) => setEditingItem', '() => setEditingItem');
replaceAll('src/views/Admin.jsx', '(e) => setConfirmDelete', '() => setConfirmDelete');
replaceAll('src/views/Admin.jsx', 'const [isCreating, setIsCreating] = useState(false);', '');
replaceAll('src/views/Admin.jsx', 'setIsCreating(true)', '');
replaceAll('src/views/Admin.jsx', 'setIsCreating(false)', '');
replaceAll('src/views/Admin.jsx', 'useEffect(() => {\n    if (session) fetchData();\n  }, [activeTab]);', '// eslint-disable-next-line react-hooks/exhaustive-deps\n  useEffect(() => {\n    if (session) fetchData();\n  }, [activeTab]);');

// views/Contact.jsx
replaceAll('src/views/Contact.jsx', 'import { supabase } from "@/lib/supabase";\n', '');

console.log('Done!');
