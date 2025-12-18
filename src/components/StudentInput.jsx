import React from 'react';
import { Users, Info } from 'lucide-react';

export default function StudentInput({ value, onChange }) {
    return (
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '0.5rem' }}>
                <Users size={20} style={{ color: 'var(--primary)' }} />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>學生清單</h2>
            </div>

            <div
                style={{
                    background: 'rgba(59, 130, 246, 0.1)',
                    borderLeft: '4px solid #3b82f6',
                    padding: '0.75rem',
                    borderRadius: '0 8px 8px 0',
                    marginBottom: '1rem',
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'start'
                }}
            >
                <Info size={18} style={{ color: '#60a5fa', marginTop: '2px', flexShrink: 0 }} />
                <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    一行一個學生，格式：<strong>座號.姓名</strong><br />
                    例如：<br />
                    <span style={{ fontFamily: 'monospace', opacity: 0.8 }}>1.黃樂樂</span><br />
                    <span style={{ fontFamily: 'monospace', opacity: 0.8 }}>2.張小明</span>
                </p>
            </div>

            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="glass-input"
                placeholder="1.黃樂樂&#10;2.張小明&#10;3.李小華"
                rows={10}
                style={{ fontFamily: 'monospace', resize: 'vertical', minHeight: '200px' }}
            />
        </div>
    );
}
