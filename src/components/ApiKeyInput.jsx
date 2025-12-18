import React, { useState, useEffect } from 'react';
import { Key, Eye, EyeOff } from 'lucide-react';

export default function ApiKeyInput({ value, onChange }) {
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '0.5rem' }}>
        <Key size={20} className="text-primary" style={{ color: 'var(--primary)' }} />
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Gemini API 金鑰</h2>
      </div>

      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
        您的金鑰僅儲存在瀏覽器本地，直接與 Google API 通訊生成評語。
      </p>

      <div style={{ position: 'relative' }}>
        <input
          type={showKey ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="請貼上您的 API 金鑰..."
          className="glass-input"
          style={{ paddingRight: '3rem' }}
        />
        <button
          onClick={() => setShowKey(!showKey)}
          style={{
            position: 'absolute',
            right: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          type="button"
        >
          {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <div style={{ marginTop: '0.75rem', display: 'flex', gap: '1rem', fontSize: '0.85rem' }}>
        <a
          href="https://makersuite.google.com/app/apikey"
          target="_blank"
          rel="noreferrer"
          style={{ color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
        >
          取得 API 金鑰 ↗
        </a>
      </div>
    </div>
  );
}
