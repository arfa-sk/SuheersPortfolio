import { useEffect, useState } from 'react';
import api from '../api';

export default function SkillsPage() {
    const [categories, setCategories] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ title: '', items: [], order: 0 });
    const [newItem, setNewItem] = useState({ name: '', logo: '' });
    const [toast, setToast] = useState('');

    const load = () => api.get('/admin/skills').then(r => setCategories(r.data)).catch(() => {});
    useEffect(() => { load(); }, []);

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2000); };

    const startAdd = () => { setForm({ title: '', items: [], order: categories.length }); setEditing('new'); };
    const startEdit = (cat) => { setForm({ ...cat, items: [...cat.items] }); setEditing(cat._id); };
    const cancel = () => { setEditing(null); setForm({ title: '', items: [], order: 0 }); };

    const addItem = () => {
        if (!newItem.name) return;
        setForm({ ...form, items: [...form.items, { ...newItem, invert: false }] });
        setNewItem({ name: '', logo: '' });
    };

    const removeItem = (i) => {
        setForm({ ...form, items: form.items.filter((_, j) => j !== i) });
    };

    const save = async () => {
        try {
            if (editing === 'new') {
                await api.post('/admin/skills', form);
            } else {
                await api.put(`/admin/skills/${editing}`, form);
            }
            cancel();
            load();
            showToast('Saved!');
        } catch { showToast('Error saving'); }
    };

    const remove = async (id) => {
        if (!confirm('Delete this category?')) return;
        try {
            await api.delete(`/admin/skills/${id}`);
            load();
            showToast('Deleted');
        } catch { showToast('Error deleting'); }
    };

    return (
        <>
            <div className="page-header"><h1>Skills</h1><p>Manage skill categories and items</p></div>

            <div style={{ marginBottom: 16 }}>
                <button className="btn btn-primary" onClick={startAdd}>+ Add Category</button>
            </div>

            {editing && (
                <div className="card" style={{ borderColor: 'var(--accent)' }}>
                    <h3 style={{ marginBottom: 16 }}>{editing === 'new' ? 'Add Category' : 'Edit Category'}</h3>
                    <div className="form-row"><label>Category Title</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
                    <div className="form-row"><label>Order</label><input type="number" value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })} /></div>

                    <label style={{ fontSize: 13, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 16, display: 'block' }}>Items</label>
                    <div className="skill-items-list">
                        {form.items.map((item, i) => (
                            <div className="skill-chip" key={i}>
                                {item.logo && <img src={item.logo} alt="" />}
                                {item.name}
                                <button onClick={() => removeItem(i)}>&times;</button>
                            </div>
                        ))}
                    </div>
                    <div className="inline-form">
                        <input placeholder="Name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
                        <input placeholder="Logo URL" value={newItem.logo} onChange={e => setNewItem({ ...newItem, logo: e.target.value })} />
                        <button className="btn btn-outline btn-sm" onClick={addItem}>Add</button>
                    </div>

                    <div className="btn-group">
                        <button className="btn btn-primary" onClick={save}>Save</button>
                        <button className="btn btn-outline" onClick={cancel}>Cancel</button>
                    </div>
                </div>
            )}

            {categories.map(cat => (
                <div className="card" key={cat._id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <h3>{cat.title}</h3>
                        <div className="btn-group" style={{ margin: 0 }}>
                            <button className="btn btn-outline btn-sm" onClick={() => startEdit(cat)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => remove(cat._id)}>Delete</button>
                        </div>
                    </div>
                    <div className="skill-items-list">
                        {cat.items.map((item, i) => (
                            <div className="skill-chip" key={i}>
                                {item.logo && <img src={item.logo} alt="" />}
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {toast && <div className={`toast ${toast.includes('Error') ? 'toast-error' : 'toast-success'}`}>{toast}</div>}
        </>
    );
}
