import React from 'react';
import { Copy, Check, Download } from 'lucide-react';

export default function CommentDisplay({ results }) {
    const [copiedId, setCopiedId] = React.useState(null);

    const handleCopy = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    if (!results || results.length === 0) return null;

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', marginTop: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }} className="heading-gradient">評語預覽</h2>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    {results.filter(r => r.status === 'completed').length} / {results.length} 已完成
                </div>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {results.map((item, index) => (
                    <div key={index} className="fade-in" style={{
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        border: '1px solid var(--border-glass)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                            <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.student}</span>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <span className={`status-badge ${item.status}`} style={{
                                    fontSize: '0.75rem',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '4px',
                                    background: item.status === 'completed' ? 'rgba(52, 211, 153, 0.2)' : item.status === 'error' ? 'rgba(248, 113, 113, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                                    color: item.status === 'completed' ? '#34d399' : item.status === 'error' ? '#f87171' : '#94a3b8'
                                }}>
                                    {item.status === 'completed' ? '已完成' : item.status === 'error' ? '錯誤' : item.status === 'loading' ? '生成中' : '等待中'}
                                </span>

                                {item.status === 'completed' && (
                                    <button
                                        onClick={() => handleCopy(item.comment, index)}
                                        className="glass-btn-secondary"
                                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                    >
                                        {copiedId === index ? <Check size={14} /> : <Copy size={14} />}
                                        {copiedId === index ? '已複製' : '複製'}
                                    </button>
                                )}
                            </div>
                        </div>

                        <div style={{ lineHeight: '1.8', fontSize: '0.95rem', color: 'var(--text-main)', whiteSpace: 'pre-wrap' }}>
                            {item.status === 'loading' ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                                    <div className="spinner" style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                                    正在生成評語...
                                </div>
                            ) : item.status === 'error' ? (
                                <span style={{ color: 'var(--error)' }}>生成失敗，請稍後再試。</span>
                            ) : (
                                item.comment
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
}
