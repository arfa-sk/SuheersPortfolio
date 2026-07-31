import { useEffect, useState } from 'react';
import api from '../api';

const fields = [
    { key: 'name', label: 'Full Name' },
    { key: 'shortName', label: 'Short Name' },
    { key: 'title', label: 'Title' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'location', label: 'Location' },
    { key: 'github', label: 'GitHub URL' },
    { key: 'linkedin', label: 'LinkedIn URL' },
];

export default function PersonalPage() {
    const [form, setForm] = useState({});
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState('');

    useEffect(() => { api.get('/personal').then(r => setForm(r.data)).catch(() => {}); }, []);

    const save = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.put('/admin/personal', form);
            setToast('Saved!');
            setTimeout(() => setToast(''), 2000);
        } catch { setToast('Error saving'); }
        setSaving(false);
    };

    return (
        <>
            <div className="page-header"><h1>Personal Info</h1><p>Your basic profile information</p></div>
            <form className="card" onSubmit={save}>
                {fields.map(f => (
                    <div className="form-row" key={f.key}>
                        <label>{f.label}</label>
                        <input value={form[f.key] || ''} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
                    </div>
                ))}
                <div className="btn-group"><button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button></div>
            </form>
            {toast && <div className={`toast ${toast === 'Saved!' ? 'toast-success' : 'toast-error'}`}>{toast}</div>}
        </>
    );
}
