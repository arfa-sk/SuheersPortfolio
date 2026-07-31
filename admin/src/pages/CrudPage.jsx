import { useEffect, useState } from 'react';
import api from '../api';

export default function CrudPage({ section, fields, arrayFields = [], title }) {
    const [items, setItems] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({});
    const [toast, setToast] = useState('');

    const load = () => api.get(`/admin/${section}`).then(r => setItems(r.data)).catch(() => {});
    useEffect(() => { load(); }, [section]);

    const emptyForm = () => {
        const f = {};
        fields.forEach(k => f[k] = '');
        arrayFields.forEach(k => f[k] = []);
        return f;
    };

    const startAdd = () => { setForm(emptyForm()); setEditing('new'); };
    const startEdit = (item) => { setForm({ ...item }); setEditing(item._id); };
    const cancel = () => { setEditing(null); setForm({}); };

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2000); };

    const save = async () => {
        try {
            if (editing === 'new') {
                await api.post(`/admin/${section}`, form);
            } else {
                await api.put(`/admin/${section}/${editing}`, form);
            }
            cancel();
            load();
            showToast('Saved!');
        } catch { showToast('Error saving'); }
    };

    const remove = async (id) => {
        if (!confirm('Delete this item?')) return;
        try {
            await api.delete(`/admin/${section}/${id}`);
            load();
            showToast('Deleted');
        } catch { showToast('Error deleting'); }
    };

    return (
        <>
            <div className="page-header">
                <h1>{title}</h1>
                <p>Manage your {title.toLowerCase()}</p>
            </div>

            <div style={{ marginBottom: 16 }}>
                <button className="btn btn-primary" onClick={startAdd}>+ Add {title.slice(0, -1)}</button>
            </div>

            {editing && (
                <div className="card" style={{ borderColor: 'var(--accent)' }}>
                    <h3 style={{ marginBottom: 16 }}>{editing === 'new' ? 'Add New' : 'Edit'}</h3>
                    {fields.map(key => (
                        <div className="form-row" key={key}>
                            <label>{key}</label>
                            {key === 'description' || key === 'quote' ? (
                                <textarea value={form[key] || ''} onChange={e => setForm({ ...form, [key]: e.target.value })} />
                            ) : (
                                <input value={form[key] || ''} onChange={e => setForm({ ...form, [key]: e.target.value })} />
                            )}
                        </div>
                    ))}
                    {arrayFields.map(key => (
                        <div className="form-row" key={key}>
                            <label>{key} (comma separated)</label>
                            <input
                                value={Array.isArray(form[key]) ? form[key].join(', ') : form[key] || ''}
                                onChange={e => setForm({ ...form, [key]: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                            />
                        </div>
                    ))}
                    <div className="form-row">
                        <label>Order</label>
                        <input type="number" value={form.order ?? 0} onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
                    </div>
                    <div className="btn-group">
                        <button className="btn btn-primary" onClick={save}>Save</button>
                        <button className="btn btn-outline" onClick={cancel}>Cancel</button>
                    </div>
                </div>
            )}

            <div className="card">
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                {fields.slice(0, 3).map(f => <th key={f}>{f}</th>)}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, i) => (
                                <tr key={item._id}>
                                    <td>{i + 1}</td>
                                    {fields.slice(0, 3).map(f => (
                                        <td key={f} style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {item[f]}
                                        </td>
                                    ))}
                                    <td>
                                        <div className="btn-group" style={{ margin: 0 }}>
                                            <button className="btn btn-outline btn-sm" onClick={() => startEdit(item)}>Edit</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => remove(item._id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {items.length === 0 && <tr><td colSpan={fields.length + 2} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No items yet</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>

            {toast && <div className={`toast ${toast.includes('Error') ? 'toast-error' : 'toast-success'}`}>{toast}</div>}
        </>
    );
}
