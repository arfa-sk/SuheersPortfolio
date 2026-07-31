import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function DashboardPage() {
    const [counts, setCounts] = useState({});

    useEffect(() => {
        Promise.all([
            api.get('/admin/projects').then(r => r.data.length),
            api.get('/admin/skills').then(r => r.data.length),
            api.get('/admin/testimonials').then(r => r.data.length),
            api.get('/admin/contacts').then(r => r.data),
        ]).then(([projects, skills, testimonials, contacts]) => {
            setCounts({
                projects,
                skills,
                testimonials,
                totalContacts: contacts.length,
                unread: contacts.filter(c => !c.read).length,
            });
        }).catch(() => {});
    }, []);

    return (
        <>
            <div className="page-header">
                <h1>Dashboard</h1>
                <p>Overview of your portfolio</p>
            </div>
            <div className="dashboard-grid">
                <Link to="/projects" className="card dashboard-stat" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="number">{counts.projects ?? '-'}</div>
                    <div className="label">Projects</div>
                </Link>
                <Link to="/skills" className="card dashboard-stat" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="number">{counts.skills ?? '-'}</div>
                    <div className="label">Skill Categories</div>
                </Link>
                <Link to="/testimonials" className="card dashboard-stat" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="number">{counts.testimonials ?? '-'}</div>
                    <div className="label">Testimonials</div>
                </Link>
                <Link to="/contacts" className="card dashboard-stat" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="number" style={{ color: counts.unread > 0 ? 'var(--accent)' : undefined }}>{counts.unread ?? '-'}</div>
                    <div className="label">Unread Messages</div>
                </Link>
            </div>
        </>
    );
}
