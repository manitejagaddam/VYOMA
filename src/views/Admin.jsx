"use client";
/**
 * Admin.jsx — VYOMA CMS Dashboard
 * Professional DB admin panel with Supabase Auth.
 * All reads/writes go directly to Supabase — no fallback data.
 */
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { invalidateCache } from "@/hooks/useData";
import { useRouter } from "next/navigation";

/* ── Schema definition: what fields appear in each table's edit form ── */
const SCHEMAS = {
  projects: [
    { key: "slug",        label: "Slug",         type: "text", placeholder: "e.g., ai-agent-platform" },
    { key: "order_index", label: "Order",         type: "number", placeholder: "e.g., 10" },
    { key: "title",       label: "Title",         type: "text", placeholder: "e.g., Enterprise Agent System" },
    { key: "client",      label: "Client",        type: "text", placeholder: "e.g., Acme Corp" },
    { key: "role",        label: "Role / Category", type: "text", placeholder: "e.g., AI & Backend Engineering" },
    { key: "timeline",    label: "Timeline",      type: "text", placeholder: "e.g., 6 months" },
    { key: "year",        label: "Year",          type: "text", placeholder: "e.g., 2024" },
    { key: "overview",    label: "Overview",      type: "textarea", placeholder: "Short summary of the project..." },
    { key: "challenge",   label: "Challenge",     type: "textarea", placeholder: "The problem they faced..." },
    { key: "solution",    label: "Solution",      type: "textarea", placeholder: "What we built..." },
    { key: "impact",      label: "Impact",        type: "textarea", placeholder: "The results achieved..." },
    { key: "tags",        label: "Tags (JSON)",   type: "json", placeholder: '["React", "Node.js", "OpenAI"]' },
    { key: "image_url",   label: "Card Image",    type: "image" },
    { key: "banner_url",  label: "Banner Image",  type: "image" },
    { key: "gallery_urls",label: "Gallery Images",type: "gallery" },
    { key: "live_url",    label: "Live URL",      type: "text", placeholder: "e.g., https://example.com" },
    { key: "published",   label: "Published",     type: "boolean" },
  ],
  services: [
    { key: "slug",         label: "Slug",          type: "text", placeholder: "e.g., product-design" },
    { key: "no",           label: "Number",        type: "text", placeholder: "e.g., 01" },
    { key: "title",        label: "Title",         type: "text", placeholder: "e.g., Product Design" },
    { key: "intro",        label: "Introduction",  type: "textarea", placeholder: "We design things..." },
    { key: "deliverables", label: "Deliverables",  type: "json", placeholder: '["UI/UX", "Prototyping"]' },
    { key: "problems",     label: "Problems Solved",type: "json", placeholder: '["Low conversion", "High churn"]' },
    { key: "approach",     label: "Approach",      type: "text", placeholder: "Discover → Define → Build" },
    { key: "image_url",    label: "Image",         type: "image" },
  ],
  solutions: [
    { key: "slug",      label: "Slug",      type: "text", placeholder: "e.g., custom-crm" },
    { key: "no",        label: "Number",    type: "text", placeholder: "e.g., 01" },
    { key: "title",     label: "Title",     type: "text", placeholder: "e.g., Custom CRM" },
    { key: "intro",     label: "Introduction", type: "textarea", placeholder: "A CRM tailored to..." },
    { key: "features",  label: "Features",  type: "json", placeholder: '["Lead tracking", "Invoicing"]' },
    { key: "benefits",  label: "Benefits",  type: "json", placeholder: '["Save 10 hrs/wk", "Increase revenue"]' },
    { key: "ideal_for", label: "Ideal For", type: "textarea", placeholder: "e.g., Agencies and consultants" },
    { key: "image_url", label: "Image",     type: "image" },
  ],
  posts: [
    { key: "slug",         label: "Slug",          type: "text", placeholder: "e.g., the-future-of-ai" },
    { key: "title",        label: "Title",         type: "text", placeholder: "e.g., The Future of AI" },
    { key: "tag",          label: "Tag",           type: "text", placeholder: "e.g., Intelligence" },
    { key: "dek",          label: "Dek (subtitle)", type: "textarea", placeholder: "A brief summary of the article..." },
    { key: "body",         label: "Body",          type: "textarea", placeholder: "Full article content in Markdown or HTML..." },
    { key: "published",    label: "Published",     type: "boolean" },
  ],
  faqs: [
    { key: "question",    label: "Question",  type: "textarea", placeholder: "e.g., How much does a project cost?" },
    { key: "answer",      label: "Answer",    type: "textarea", placeholder: "Our pricing starts at..." },
    { key: "category",    label: "Category",  type: "text", placeholder: "e.g., Pricing" },
    { key: "order_index", label: "Order",     type: "number", placeholder: "e.g., 10" },
  ],
  leads: [
    { key: "name",        label: "Name",        type: "text", placeholder: "e.g., John Doe" },
    { key: "email",       label: "Email",       type: "text", placeholder: "e.g., john@example.com" },
    { key: "company",     label: "Company",     type: "text", placeholder: "e.g., Acme Corp" },
    { key: "need",        label: "Need",        type: "text", placeholder: "e.g., New website" },
    { key: "stage",       label: "Stage",       type: "text", placeholder: "e.g., Idea phase" },
    { key: "timeline",    label: "Timeline",    type: "text", placeholder: "e.g., 1-2 months" },
    { key: "budget",      label: "Budget",      type: "text", placeholder: "e.g., $10k - $25k" },
    { key: "description", label: "Description", type: "textarea", placeholder: "e.g., We need a platform to..." },
  ],
  team: [
    { key: "name",          label: "Name",          type: "text", placeholder: "e.g., Sarah Chen" },
    { key: "role",          label: "Role",          type: "text", placeholder: "e.g., Head of Engineering" },
    { key: "specialization",label: "Specialization",type: "text", placeholder: "e.g., Cloud Architecture, AI" },
    { key: "order_index",   label: "Order",         type: "number", placeholder: "e.g., 10" },
    { key: "image_url",     label: "Avatar Image",  type: "image" },
  ],
};

const TABS = ["projects", "services", "solutions", "posts", "faqs", "team", "leads"];

/* ── Styles ─────────────────────────────────────────────────── */
const S = {
  page: { minHeight: "100vh", background: "#0a0b0f", color: "#eef0f5", fontFamily: "'Inter', sans-serif" },
  topbar: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", height: "64px", background: "#111318", borderBottom: "1px solid rgba(255,255,255,0.07)", position: "sticky", top: 0, zIndex: 50 },
  logo: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "18px", letterSpacing: "-0.02em", color: "#eef0f5" },
  topbarActions: { display: "flex", gap: "12px", alignItems: "center" },
  layout: { display: "grid", gridTemplateColumns: "220px 1fr", minHeight: "calc(100vh - 64px)" },
  sidebar: { background: "#111318", borderRight: "1px solid rgba(255,255,255,0.07)", padding: "24px 16px", display: "flex", flexDirection: "column", gap: "4px" },
  tab: (active) => ({
    textAlign: "left", padding: "10px 14px", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px", fontWeight: 500,
    background: active ? "rgba(79,124,255,0.15)" : "transparent",
    color: active ? "#4f7cff" : "#7a8394",
    transition: "all 0.15s",
    textTransform: "capitalize",
  }),
  content: { padding: "32px" },
  card: { background: "#111318", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", overflow: "hidden" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)" },
  cardTitle: { fontSize: "16px", fontWeight: 600, color: "#eef0f5" },
  row: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)", transition: "background 0.1s" },
  rowTitle: { fontSize: "14px", fontWeight: 500, color: "#eef0f5" },
  rowMeta: { fontSize: "12px", color: "#4a5364", marginTop: "2px", fontFamily: "'DM Mono', monospace" },
  rowActions: { display: "flex", gap: "8px", flexShrink: 0 },
  // Buttons
  btnPrimary: { padding: "8px 16px", background: "#4f7cff", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: 600 },
  btnGhost: { padding: "8px 16px", background: "rgba(255,255,255,0.06)", color: "#eef0f5", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", cursor: "pointer", fontSize: "13px" },
  btnDanger: { padding: "6px 12px", background: "rgba(239,68,68,0.12)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px", cursor: "pointer", fontSize: "12px" },
  btnEdit: { padding: "6px 12px", background: "rgba(255,255,255,0.06)", color: "#eef0f5", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", cursor: "pointer", fontSize: "12px" },
  btnAccent: { padding: "10px 20px", background: "#b4ff5a", color: "#000", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px", fontWeight: 700 },
  // Form
  drawer: { position: "fixed", right: 0, top: 0, bottom: 0, width: "560px", background: "#111318", borderLeft: "1px solid rgba(255,255,255,0.1)", zIndex: 100, display: "flex", flexDirection: "column", boxShadow: "-24px 0 60px rgba(0,0,0,0.6)" },
  drawerHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)" },
  drawerBody: { flex: 1, overflowY: "auto", padding: "24px" },
  drawerFooter: { padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: "12px" },
  formField: { marginBottom: "20px" },
  label: { display: "block", marginBottom: "6px", fontSize: "11px", fontFamily: "'DM Mono', monospace", color: "#4a5364", textTransform: "uppercase", letterSpacing: "0.06em" },
  input: { width: "100%", padding: "10px 12px", background: "#0a0b0f", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: "#eef0f5", fontSize: "14px", fontFamily: "'Inter', sans-serif", boxSizing: "border-box", outline: "none" },
  textarea: { width: "100%", padding: "10px 12px", background: "#0a0b0f", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: "#eef0f5", fontSize: "14px", fontFamily: "'Inter', sans-serif", minHeight: "100px", resize: "vertical", boxSizing: "border-box", outline: "none" },
  imgPreview: { width: "100%", maxHeight: "160px", objectFit: "cover", borderRadius: "6px", marginBottom: "8px", border: "1px solid rgba(255,255,255,0.1)" },
  uploadBtn: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 14px", background: "rgba(255,255,255,0.06)", color: "#eef0f5", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "6px", cursor: "pointer", fontSize: "12px" },
  galleryGrid: { display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "10px" },
  galleryThumb: { width: "72px", height: "72px", objectFit: "cover", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.1)" },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 99 },
  loginPage: { display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#0a0b0f" },
  loginCard: { width: "100%", maxWidth: "400px", padding: "48px", background: "#111318", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px" },
  loginTitle: { fontFamily: "'Syne', sans-serif", fontSize: "28px", fontWeight: 800, marginBottom: "8px", color: "#eef0f5" },
  loginSub: { fontSize: "14px", color: "#7a8394", marginBottom: "36px" },
};

/* ── Login Screen ────────────────────────────────────────────── */
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setErr(error.message);
    setLoading(false);
  }

  return (
    <div style={S.loginPage}>
      <div style={S.loginCard}>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#4f7cff", letterSpacing: "0.1em", marginBottom: "20px" }}>VYOMA / ADMIN</p>
        <h1 style={S.loginTitle}>Sign in</h1>
        <p style={S.loginSub}>Access the VYOMA content management system.</p>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={S.label}>Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} style={S.input} autoComplete="email" />
          </div>
          <div>
            <label style={S.label}>Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} style={S.input} autoComplete="current-password" />
          </div>
          {err && <p style={{ color: "#f87171", fontSize: "13px", margin: 0 }}>{err}</p>}
          <button type="submit" disabled={loading} style={{ ...S.btnPrimary, padding: "12px", marginTop: "8px", fontSize: "14px" }}>
            {loading ? "Signing in…" : "Sign in →"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ── Field Input ─────────────────────────────────────────────── */
function FieldInput({ field, value, onChange, onUpload, onMultiUpload, uploading }) {
  const v = value ?? "";

  if (field.type === "boolean") {
    return (
      <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
        <input type="checkbox" checked={!!v} onChange={e => onChange(e.target.checked)}
          style={{ width: "16px", height: "16px", accentColor: "#4f7cff" }} />
        <span style={{ fontSize: "14px", color: "#eef0f5" }}>{v ? "Yes" : "No"}</span>
      </label>
    );
  }

  if (field.type === "json") {
    const str = Array.isArray(v) ? JSON.stringify(v, null, 2) : v;
    return <textarea placeholder={field.placeholder} value={str} onChange={e => onChange(e.target.value)} style={{ ...S.textarea, minHeight: "80px", fontSize: "12px", fontFamily: "'DM Mono', monospace" }} />;
  }

  if (field.type === "textarea") {
    return <textarea placeholder={field.placeholder} value={v} onChange={e => onChange(e.target.value)} style={S.textarea} />;
  }

  if (field.type === "number") {
    return <input placeholder={field.placeholder} type="number" value={v} onChange={e => onChange(e.target.value)} style={S.input} />;
  }

  if (field.type === "image") {
    return (
      <div>
        {v && <img src={v} alt="preview" style={S.imgPreview} />}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <input type="text" value={v} onChange={e => onChange(e.target.value)} style={{ ...S.input, fontSize: "12px" }} placeholder="https://..." />
          <input type="file" accept="image/*" onChange={e => onUpload(e, field.key)}
            disabled={uploading} style={{ display: "none" }} id={`upload-${field.key}`} />
          <label htmlFor={`upload-${field.key}`} style={S.uploadBtn}>
            {uploading ? "…" : "↑"}
          </label>
        </div>
      </div>
    );
  }

  if (field.type === "gallery") {
    let urls = [];
    if (Array.isArray(v)) urls = v;
    else if (typeof v === "string") { try { urls = JSON.parse(v) || []; } catch (e) {} }
    return (
      <div>
        {urls.length > 0 && (
          <div style={S.galleryGrid}>
            {urls.map((url, i) => (
              <div key={i} style={{ position: "relative" }}>
                <img src={url} alt={`gallery-${i}`} style={S.galleryThumb} />
                <button onClick={() => onChange(JSON.stringify(urls.filter((_, idx) => idx !== i)))}
                  style={{ position: "absolute", top: "-4px", right: "-4px", width: "18px", height: "18px", borderRadius: "50%", background: "#ef4444", color: "#fff", border: "none", cursor: "pointer", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
              </div>
            ))}
          </div>
        )}
        <input type="text" value={typeof v === "string" ? v : JSON.stringify(v)} onChange={e => onChange(e.target.value)}
          style={{ ...S.input, fontSize: "12px", marginBottom: "8px" }} placeholder='["url1","url2"]' />
        <input type="file" accept="image/*" multiple onChange={e => onMultiUpload(e, field.key)}
          disabled={uploading} style={{ display: "none" }} id={`gallery-${field.key}`} />
        <label htmlFor={`gallery-${field.key}`} style={{ ...S.uploadBtn, width: "100%", justifyContent: "center" }}>
          {uploading ? "Uploading…" : "↑ Upload Multiple Images"}
        </label>
      </div>
    );
  }

  return <input placeholder={field.placeholder} type="text" value={v} onChange={e => onChange(e.target.value)} style={S.input} />;
}

/* ── Edit Drawer ─────────────────────────────────────────────── */
function EditDrawer({ table, item, onClose, onSaved }) {
  const [formData, setFormData] = useState(item || {});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const schema = SCHEMAS[table] || [];
  const isNew = !item?.id;

  function handleChange(key, value) {
    setFormData(prev => ({ ...prev, [key]: value }));
  }

  async function uploadFile(file, folder) {
    const ext = file.name.split(".").pop();
    const name = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
    const { error } = await supabase.storage.from("project-files").upload(name, file, { upsert: true, contentType: file.type });
    if (error) throw error;
    return supabase.storage.from("project-files").getPublicUrl(name).data.publicUrl;
  }

  async function handleUpload(e, field) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file, table);
      handleChange(field, url);
    } catch (err) { alert("Upload failed: " + err.message); }
    finally { setUploading(false); }
  }

  async function handleMultiUpload(e, field) {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    try {
      const newUrls = await Promise.all(files.map(f => uploadFile(f, table)));
      const currentVal = formData[field];
      let currentUrls = [];
      if (Array.isArray(currentVal)) currentUrls = currentVal;
      else if (typeof currentVal === "string") { try { currentUrls = JSON.parse(currentVal) || []; } catch (e) {} }
      handleChange(field, [...currentUrls, ...newUrls]);
    } catch (err) { alert("Upload failed: " + err.message); }
    finally { setUploading(false); }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const payload = { ...formData };
      // Parse JSON strings into arrays
      ["tags", "deliverables", "problems", "features", "benefits", "gallery_urls"].forEach(k => {
        if (typeof payload[k] === "string") {
          try { payload[k] = JSON.parse(payload[k]); } catch (e) {}
        }
      });
      const { error } = await supabase.from(table).upsert(payload);
      if (error) throw error;
      invalidateCache(table);
      onSaved();
    } catch (err) {
      alert("Save failed: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div style={S.overlay} onClick={onClose} />
      <div style={S.drawer}>
        <div style={S.drawerHeader}>
          <div>
            <div style={{ fontSize: "11px", fontFamily: "'DM Mono', monospace", color: "#4a5364", textTransform: "uppercase", marginBottom: "4px" }}>{table}</div>
            <div style={{ fontSize: "16px", fontWeight: 600 }}>{isNew ? "Create new" : "Edit record"}</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#7a8394", cursor: "pointer", fontSize: "24px", lineHeight: 1 }}>×</button>
        </div>
        <div style={S.drawerBody}>
          {schema.map(field => (
            <div key={field.key} style={S.formField}>
              <label style={S.label}>{field.label}</label>
              <FieldInput
                field={field}
                value={formData[field.key]}
                onChange={v => handleChange(field.key, v)}
                onUpload={handleUpload}
                onMultiUpload={handleMultiUpload}
                uploading={uploading}
              />
            </div>
          ))}
        </div>
        <div style={S.drawerFooter}>
          <button onClick={handleSave} disabled={saving} style={S.btnAccent}>
            {saving ? "Saving…" : "Save to Database"}
          </button>
          <button onClick={onClose} style={S.btnGhost}>Cancel</button>
        </div>
      </div>
    </>
  );
}

/* ── Main Admin Component ───────────────────────────────────── */
export function Admin({}) {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("projects");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) fetchData();
  }, [activeTab, session]);

  async function fetchData() {
    setLoading(true);
    setEditingItem(null);
    setIsCreating(false);
    try {
      const { data: rows, error } = await supabase.from(activeTab).select("*").order("id", { ascending: true });
      if (error) throw error;
      setData(rows || []);
    } catch (err) {
      alert("Error fetching data: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id, label) {
    if (!confirm(`Delete "${label}"? This cannot be undone.`)) return;
    const { error } = await supabase.from(activeTab).delete().eq("id", id);
    if (error) alert("Delete failed: " + error.message);
    else { invalidateCache(activeTab); fetchData(); }
  }

  function openCreate() {
    setIsCreating(true);
    setEditingItem({});
  }

  function openEdit(item) {
    setIsCreating(false);
    setEditingItem(item);
  }

  if (authLoading) {
    return <div style={{ ...S.page, display: "flex", alignItems: "center", justifyContent: "center" }}>Loading…</div>;
  }

  if (!session) {
    return <LoginScreen />;
  }

  const itemLabel = (item) => item.title || item.name || item.question || item.slug || `ID ${item.id}`;

  return (
    <div style={S.page}>
      {/* Top Bar */}
      <div style={S.topbar}>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <span style={S.logo}>VYOMA</span>
          <span style={{ fontSize: "12px", color: "#4a5364", fontFamily: "'DM Mono', monospace" }}>CMS Dashboard</span>
        </div>
        <div style={S.topbarActions}>
          <button onClick={() => router.push("/")} style={S.btnGhost}>← View Site</button>
          <button onClick={() => supabase.auth.signOut()} style={S.btnGhost}>Sign Out</button>
        </div>
      </div>

      {/* Layout */}
      <div style={S.layout}>
        {/* Sidebar */}
        <nav style={S.sidebar}>
          <div style={{ fontSize: "11px", fontFamily: "'DM Mono', monospace", color: "#4a5364", padding: "8px 14px 12px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Tables</div>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={S.tab(activeTab === tab)}>
              {tab}
            </button>
          ))}
        </nav>

        {/* Main Content */}
        <div style={S.content}>
          <div style={S.card}>
            {/* Card Header */}
            <div style={S.cardHeader}>
              <div>
                <div style={S.cardTitle} className="capitalize">{activeTab}</div>
                <div style={{ fontSize: "12px", color: "#4a5364", marginTop: "2px" }}>
                  {loading ? "Loading…" : `${data.length} record${data.length !== 1 ? "s" : ""}`}
                </div>
              </div>
              <button onClick={openCreate} style={S.btnPrimary}>+ New {activeTab.replace(/s$/, "")}</button>
            </div>

            {/* Table */}
            {loading ? (
              <div style={{ padding: "60px", textAlign: "center", color: "#4a5364" }}>Loading records…</div>
            ) : data.length === 0 ? (
              <div style={{ padding: "60px", textAlign: "center", color: "#4a5364" }}>
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>○</div>
                <div>No records in this table.</div>
                <button onClick={openCreate} style={{ ...S.btnPrimary, marginTop: "20px" }}>Create first record</button>
              </div>
            ) : (
              data.map(item => (
                <div key={item.id} style={S.row}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", minWidth: 0 }}>
                    {(item.image_url) && (
                      <img src={item.image_url} alt="" style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "6px", flexShrink: 0 }} />
                    )}
                    <div style={{ minWidth: 0 }}>
                      <div style={S.rowTitle}>{itemLabel(item)}</div>
                      <div style={S.rowMeta}>
                        id:{item.id}
                        {item.slug && ` · /${item.slug}`}
                        {item.published !== undefined && ` · ${item.published ? "published" : "draft"}`}
                        {item.email && ` · ${item.email}`}
                      </div>
                    </div>
                  </div>
                  <div style={S.rowActions}>
                    {item.live_url && (
                      <a href={item.live_url} target="_blank" rel="noreferrer" style={{ ...S.btnEdit, textDecoration: "none" }}>↗</a>
                    )}
                    <button onClick={() => openEdit(item)} style={S.btnEdit}>Edit</button>
                    <button onClick={() => handleDelete(item.id, itemLabel(item))} style={S.btnDanger}>Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Edit/Create Drawer */}
      {(editingItem !== null) && (
        <EditDrawer
          table={activeTab}
          item={editingItem}
          onClose={() => { setEditingItem(null); setIsCreating(false); }}
          onSaved={() => { setEditingItem(null); setIsCreating(false); fetchData(); }}
        />
      )}
    </div>
  );
}

