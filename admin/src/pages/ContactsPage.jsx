import { useEffect, useState } from 'react';
import api from '../api';

export default function ContactsPage() {
    const [contacts, setContacts] = useState([]);
    const [expanded, setExpanded] = useState(null);
    const [toast, setToast] = useState('');

    const load = () => api.get('/admin/contacts').then(r => setContacts(r.data)).catch(() => {});
    useEffect(() => { load(); }, []);

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2000); };

    const markRead = async (id) => {
        try {
            await api.put(`/admin/contacts/${id}/read`);
            load();
        } catch { showToast('Error'); }
    };

    const remove = async (id) => {
        if (!confirm('Delete this message?')) return;
        try {
            await api.delete(`/admin/contacts/${id}`);
            load();
            showToast('Deleted');
        } catch { showToast('Error deleting'); }
    };

    return (
        <>
            <div className="page-header"><h1>Contact Messages</h1><p>{contacts.filter(c => !c.read).length} unread</p></div>

            <div className="card">
                <div className="table-wrapper">
                    <table>
                        <thead><tr><th>Status</th><th>Name</th><th>Email</th><th>Date</th><th>Actions</th></tr></thead>
                        <tbody>
                            {contacts.map(c => (
                                <>
                                    <tr key={c._id} style={{ cursor: 'pointer' }} onClick={() => setExpanded(expanded === c._id ? null : c._id)}>
                                        <td><span className={`badge ${c.read ? 'badge-read' : 'badge-unread'}`}>{c.read ? 'Read' : 'New'}</span></td>
                                        <td>{c.name}</td>
                                        <td>{c.email}</td>
                                        <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <div className="btn-group" style={{ margin: 0 }}>
                                                {!c.read && <button className="btn btn-outline btn-sm" onClick={(e) => { e.stopPropagation(); markRead(c._id); }}>Mark Read</button>}
                                                <button className="btn btn-danger btn-sm" onClick={(e) => { e.stopPropagation(); remove(c._id); }}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                    {expanded === c._id && (
                                        <tr key={c._id + '-exp'}>
                                            <td colSpan="5" style={{ background: 'var(--bg-input)', padding: 20, whiteSpace: 'pre-wrap' }}>
                                                <strong>From:</strong> {c.name} ({c.email})<br /><br />
                                                {c.message}
                                            </td>
                                        </tr>
                                    )}
                                </>
                            ))}
                            {contacts.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No messages yet</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>

            {toast && <div className={`toast ${toast.includes('Error') ? 'toast-error' : 'toast-success'}`}>{toast}</div>}
        </>
    );
}
