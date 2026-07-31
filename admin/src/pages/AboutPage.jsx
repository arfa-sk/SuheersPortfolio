import { useEffect, useState } from 'react';
import api from '../api';

export default function AboutPage() {
    const [form, setForm] = useState({ badge: '', title: '', subtitle: '', paragraphs: [''] });
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState('');

    useEffect(() => { api.get('/about').then(r => { if (r.data) setForm(r.data); }).catch(() => {}); }, []);

    const updateParagraph = (i, val) => {
        const p = [...form.paragraphs];
        p[i] = val;
        setForm({ ...form, paragraphs: p });
    };

    const save = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.put('/admin/about', form);
            setToast('Saved!');
            setTimeout(() => setToast(''), 2000);
        } catch { setToast('Error saving'); }
        setSaving(false);
    };

    return (
        <>
            <div className="page-header"><h1>About Section</h1><p>Tell visitors about yourself</p></div>
            <form className="card" onSubmit={save}>
                <div className="form-row"><label>Badge Text</label><input value={form.badge || ''} onChange={e => setForm({ ...form, badge: e.target.value })} /></div>
                <div className="form-row"><label>Title (HTML allowed)</label><input value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
                <div className="form-row"><label>Subtitle</label><input value={form.subtitle || ''} onChange={e => setForm({ ...form, subtitle: e.target.value })} /></div>
                <label style={{ fontSize: 13, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Paragraphs</label>
                {form.paragraphs?.map((p, i) => (
                    <div key={i} className="form-row" style={{ display: 'flex', gap: 8 }}>
                        <textarea value={p} onChange={e => updateParagraph(i, e.target.value)} style={{ flex: 1 }} />
                        {form.paragraphs.length > 1 && <button type="button" className="btn btn-danger btn-sm" onClick={() => setForm({ ...form, paragraphs: form.paragraphs.filter((_, j) => j !== i) })}>X</button>}
                    </div>
                ))}
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setForm({ ...form, paragraphs: [...form.paragraphs, ''] })}>+ Add Paragraph</button>
                <div className="btn-group"><button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button></div>
            </form>
            {toast && <div className={`toast ${toast === 'Saved!' ? 'toast-success' : 'toast-error'}`}>{toast}</div>}
        </>
    );
}
