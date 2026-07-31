import { useEffect, useState } from 'react';
import api from '../api';

const SECTION_KEYS = ['hero', 'about', 'projects', 'skills', 'experience', 'testimonials', 'contact'];
const POSITIONS = ['left', 'center', 'right', 'bottom-left', 'bottom-right'];

export default function SiteSettingsPage() {
    const [form, setForm] = useState(null);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState('');

    useEffect(() => { api.get('/admin/settings').then(r => setForm(r.data)).catch(() => {}); }, []);

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2000); };

    const updateSection = (key, field, value) => {
        setForm({
            ...form,
            sections: {
                ...form.sections,
                [key]: { ...form.sections[key], [field]: value },
            },
        });
    };

    const save = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.put('/admin/settings', form);
            showToast('Saved!');
        } catch { showToast('Error saving'); }
        setSaving(false);
    };

    if (!form) return <p>Loading...</p>;

    return (
        <>
            <div className="page-header"><h1>Site Settings</h1><p>Global configuration, gradients, section visibility, SEO</p></div>

            <form onSubmit={save}>
                {/* Global */}
                <div className="card">
                    <h3 style={{ marginBottom: 16 }}>Global</h3>
                    <div className="form-row">
                        <label>Accent Color</label>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            <input type="color" value={form.accentColor || '#00e5ff'} onChange={e => setForm({ ...form, accentColor: e.target.value })} style={{ width: 50, height: 36, padding: 2, cursor: 'pointer' }} />
                            <input value={form.accentColor || ''} onChange={e => setForm({ ...form, accentColor: e.target.value })} style={{ flex: 1 }} />
                        </div>
                    </div>
                    <div className="form-row"><label>Footer Text</label><input value={form.footerText || ''} onChange={e => setForm({ ...form, footerText: e.target.value })} /></div>
                </div>

                {/* SEO */}
                <div className="card">
                    <h3 style={{ marginBottom: 16 }}>SEO</h3>
                    <div className="form-row"><label>Page Title</label><input value={form.seoTitle || ''} onChange={e => setForm({ ...form, seoTitle: e.target.value })} /></div>
                    <div className="form-row"><label>Meta Description</label><textarea value={form.seoDescription || ''} onChange={e => setForm({ ...form, seoDescription: e.target.value })} /></div>
                </div>

                {/* Section Config */}
                <div className="card">
                    <h3 style={{ marginBottom: 16 }}>Sections</h3>
                    {SECTION_KEYS.map(key => {
                        const cfg = form.sections?.[key] || {};
                        return (
                            <div key={key} style={{ padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                    <strong style={{ textTransform: 'capitalize', fontSize: 15 }}>{key}</strong>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: 'var(--text-muted)' }}>
                                        <input type="checkbox" checked={cfg.enabled !== false} onChange={e => updateSection(key, 'enabled', e.target.checked)} />
                                        Visible
                                    </label>
                                </div>
                                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-muted)', cursor: 'pointer' }}>
                                        <input type="checkbox" checked={cfg.showGradient || false} onChange={e => updateSection(key, 'showGradient', e.target.checked)} />
                                        Gradient
                                    </label>
                                    {cfg.showGradient && (
                                        <>
                                            <input type="color" value={cfg.gradientColor || '#00e5ff'} onChange={e => updateSection(key, 'gradientColor', e.target.value)} style={{ width: 36, height: 28, padding: 1, cursor: 'pointer' }} />
                                            <select value={cfg.gradientPosition || 'center'} onChange={e => updateSection(key, 'gradientPosition', e.target.value)} style={{ padding: '4px 8px', background: 'var(--bg-input)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontSize: 13 }}>
                                                {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                                            </select>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="btn-group">
                    <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save All Settings'}</button>
                </div>
            </form>

            {toast && <div className={`toast ${toast === 'Saved!' ? 'toast-success' : 'toast-error'}`}>{toast}</div>}
        </>
    );
}
