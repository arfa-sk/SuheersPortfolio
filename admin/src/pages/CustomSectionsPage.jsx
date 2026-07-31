import { useEffect, useState } from 'react';
import api from '../api';

const LAYOUTS = ['grid-2', 'grid-3', 'cards', 'text', 'list'];
const POSITIONS = ['left', 'center', 'right', 'bottom-left', 'bottom-right'];

const emptySection = {
    sectionId: '', title: '', titleEmWord: '', subtitle: '', badge: '',
    layout: 'grid-2', showGradient: false, gradientColor: '#00e5ff',
    gradientPosition: 'center', darkBg: false, enabled: true, order: 0, items: [],
};

const emptyItem = { title: '', subtitle: '', description: '', icon: '', link: '', linkText: '', tag: '', tagColor: '' };

export default function CustomSectionsPage() {
    const [sections, setSections] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ ...emptySection });
    const [newItem, setNewItem] = useState({ ...emptyItem });
    const [toast, setToast] = useState('');

    const load = () => api.get('/admin/custom-sections').then(r => setSections(r.data)).catch(() => {});
    useEffect(() => { load(); }, []);

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2000); };

    const startAdd = () => { setForm({ ...emptySection, order: sections.length }); setEditing('new'); };
    const startEdit = (sec) => { setForm({ ...sec, items: [...sec.items] }); setEditing(sec._id); };
    const cancel = () => { setEditing(null); };

    const addItem = () => {
        if (!newItem.title && !newItem.description) return;
        setForm({ ...form, items: [...form.items, { ...newItem }] });
        setNewItem({ ...emptyItem });
    };

    const removeItem = (i) => setForm({ ...form, items: form.items.filter((_, j) => j !== i) });

    const updateItem = (i, field, val) => {
        const items = [...form.items];
        items[i] = { ...items[i], [field]: val };
        setForm({ ...form, items });
    };

    const save = async () => {
        if (!form.sectionId || !form.title) { showToast('Section ID and Title required'); return; }
        try {
            if (editing === 'new') await api.post('/admin/custom-sections', form);
            else await api.put(`/admin/custom-sections/${editing}`, form);
            cancel(); load(); showToast('Saved!');
        } catch { showToast('Error saving'); }
    };

    const remove = async (id) => {
        if (!confirm('Delete this section?')) return;
        try { await api.delete(`/admin/custom-sections/${id}`); load(); showToast('Deleted'); } catch { showToast('Error'); }
    };

    return (
        <>
            <div className="page-header"><h1>Custom Sections</h1><p>Create new sections with configurable layouts and gradients</p></div>

            <div style={{ marginBottom: 16 }}><button className="btn btn-primary" onClick={startAdd}>+ New Section</button></div>

            {editing && (
                <div className="card" style={{ borderColor: 'var(--accent)' }}>
                    <h3 style={{ marginBottom: 16 }}>{editing === 'new' ? 'Create Section' : 'Edit Section'}</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div className="form-row"><label>Section ID (slug)</label><input value={form.sectionId} onChange={e => setForm({ ...form, sectionId: e.target.value.toLowerCase().replace(/\s+/g, '-') })} placeholder="e.g. services" /></div>
                        <div className="form-row"><label>Badge Text</label><input value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} /></div>
                        <div className="form-row"><label>Title</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
                        <div className="form-row"><label>Accent Word (italic cyan)</label><input value={form.titleEmWord} onChange={e => setForm({ ...form, titleEmWord: e.target.value })} placeholder="e.g. amazing" /></div>
                        <div className="form-row" style={{ gridColumn: '1/-1' }}><label>Subtitle</label><input value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} /></div>
                    </div>

                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 12, marginBottom: 16 }}>
                        <div className="form-row">
                            <label>Layout</label>
                            <select value={form.layout} onChange={e => setForm({ ...form, layout: e.target.value })} style={{ padding: '8px 12px', background: 'var(--bg-input)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 14 }}>
                                {LAYOUTS.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                        </div>
                        <div className="form-row"><label>Order</label><input type="number" value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })} style={{ width: 80 }} /></div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer', marginTop: 20 }}>
                            <input type="checkbox" checked={form.enabled} onChange={e => setForm({ ...form, enabled: e.target.checked })} /> Enabled
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer', marginTop: 20 }}>
                            <input type="checkbox" checked={form.darkBg} onChange={e => setForm({ ...form, darkBg: e.target.checked })} /> Dark Background
                        </label>
                    </div>

                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
                            <input type="checkbox" checked={form.showGradient} onChange={e => setForm({ ...form, showGradient: e.target.checked })} /> Gradient Glow
                        </label>
                        {form.showGradient && (
                            <>
                                <input type="color" value={form.gradientColor} onChange={e => setForm({ ...form, gradientColor: e.target.value })} style={{ width: 36, height: 28, padding: 1, cursor: 'pointer' }} />
                                <select value={form.gradientPosition} onChange={e => setForm({ ...form, gradientPosition: e.target.value })} style={{ padding: '4px 8px', background: 'var(--bg-input)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 13 }}>
                                    {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                            </>
                        )}
                    </div>

                    {/* Items */}
                    <h4 style={{ marginBottom: 12 }}>Items ({form.items.length})</h4>
                    {form.items.map((item, i) => (
                        <div key={i} style={{ padding: 12, background: 'var(--bg-input)', borderRadius: 8, marginBottom: 8, display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8, alignItems: 'start' }}>
                            <input placeholder="Title" value={item.title} onChange={e => updateItem(i, 'title', e.target.value)} style={{ padding: '6px 10px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 13 }} />
                            <input placeholder="Subtitle" value={item.subtitle || ''} onChange={e => updateItem(i, 'subtitle', e.target.value)} style={{ padding: '6px 10px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 13 }} />
                            <button className="btn btn-danger btn-sm" onClick={() => removeItem(i)}>X</button>
                            <textarea placeholder="Description" value={item.description || ''} onChange={e => updateItem(i, 'description', e.target.value)} style={{ gridColumn: '1/-1', padding: '6px 10px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 13, minHeight: 50, resize: 'vertical' }} />
                            <input placeholder="Link URL" value={item.link || ''} onChange={e => updateItem(i, 'link', e.target.value)} style={{ padding: '6px 10px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 13 }} />
                            <input placeholder="Link Text" value={item.linkText || ''} onChange={e => updateItem(i, 'linkText', e.target.value)} style={{ padding: '6px 10px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 13 }} />
                        </div>
                    ))}
                    <button className="btn btn-outline btn-sm" onClick={addItem} style={{ marginTop: 4 }}>+ Add Item</button>

                    <div className="btn-group" style={{ marginTop: 20 }}>
                        <button className="btn btn-primary" onClick={save}>Save Section</button>
                        <button className="btn btn-outline" onClick={cancel}>Cancel</button>
                    </div>
                </div>
            )}

            {sections.map(sec => (
                <div className="card" key={sec._id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3>{sec.title} <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 400 }}>#{sec.sectionId}</span></h3>
                            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                                Layout: {sec.layout} | Items: {sec.items.length} | {sec.enabled ? 'Enabled' : 'Disabled'}
                                {sec.showGradient && ` | Gradient: ${sec.gradientPosition}`}
                            </p>
                        </div>
                        <div className="btn-group" style={{ margin: 0 }}>
                            <button className="btn btn-outline btn-sm" onClick={() => startEdit(sec)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => remove(sec._id)}>Delete</button>
                        </div>
                    </div>
                </div>
            ))}

            {sections.length === 0 && !editing && <div className="card" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No custom sections yet. Create one to add new content to your portfolio.</div>}

            {toast && <div className={`toast ${toast.includes('Error') || toast.includes('required') ? 'toast-error' : 'toast-success'}`}>{toast}</div>}
        </>
    );
}
