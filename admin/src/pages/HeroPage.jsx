import { useEffect, useState } from 'react';
import api from '../api';

export default function HeroPage() {
    const [form, setForm] = useState({ greeting: '', title: '', subtitle: '' });
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState('');

    useEffect(() => { api.get('/hero').then(r => setForm(r.data)).catch(() => {}); }, []);

    const save = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.put('/admin/hero', form);
            setToast('Saved!');
            setTimeout(() => setToast(''), 2000);
        } catch { setToast('Error saving'); }
        setSaving(false);
    };

    return (
        <>
            <div className="page-header"><h1>Hero Section</h1><p>The first thing visitors see</p></div>
            <form className="card" onSubmit={save}>
                <div className="form-row"><label>Greeting</label><input value={form.greeting || ''} onChange={e => setForm({ ...form, greeting: e.target.value })} /></div>
                <div className="form-row"><label>Title (HTML allowed for &lt;em&gt; tags)</label><textarea value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
                <div className="form-row"><label>Subtitle</label><textarea value={form.subtitle || ''} onChange={e => setForm({ ...form, subtitle: e.target.value })} /></div>
                <div className="btn-group"><button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button></div>
            </form>
            {toast && <div className={`toast ${toast === 'Saved!' ? 'toast-success' : 'toast-error'}`}>{toast}</div>}
        </>
    );
}
