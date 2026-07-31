import { useState } from 'react';
import api from '../api';

export default function ResumePage() {
    const [uploading, setUploading] = useState(false);
    const [toast, setToast] = useState('');

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2000); };

    const upload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('resume', file);

        setUploading(true);
        try {
            await api.post('/admin/resume', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            showToast('Resume uploaded!');
        } catch {
            showToast('Error uploading');
        }
        setUploading(false);
    };

    return (
        <>
            <div className="page-header"><h1>Resume</h1><p>Upload or update your resume</p></div>

            <div className="card">
                <div className="form-row">
                    <label>Current Resume</label>
                    <p><a href="/api/resume" target="_blank" rel="noopener" style={{ color: 'var(--accent)' }}>Download current resume</a></p>
                </div>
                <div className="form-row">
                    <label>Upload New Resume (PDF, DOC, DOCX)</label>
                    <div className="file-upload">
                        <input type="file" accept=".pdf,.doc,.docx" onChange={upload} disabled={uploading} />
                        {uploading && <span style={{ color: 'var(--text-muted)' }}>Uploading...</span>}
                    </div>
                </div>
            </div>

            {toast && <div className={`toast ${toast.includes('Error') ? 'toast-error' : 'toast-success'}`}>{toast}</div>}
        </>
    );
}
