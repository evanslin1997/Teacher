import React from 'react';
import { Settings, Sliders, RotateCcw } from 'lucide-react';

const STYLE_OPTIONS = [
    '口語人性化', '鼓勵型', '幽默', '溫馨', '分析型',
    '詩意', '個性化', '目標導向', '故事型', '十六箴言'
];

const WORD_COUNT_OPTIONS = [
    { label: '150字', value: 150 },
    { label: '100字', value: 100 },
    { label: '60字', value: 60 },
    { label: '45字', value: 45 },
    { label: '30字', value: 30 },
    { label: '16字', value: 16 }
];

export default function ControlPanel({ config, onChange }) {
    const handleChange = (key, value) => {
        onChange({ ...config, [key]: value });
    };

    const toggleStyle = (style) => {
        const currentStyles = config.styles || [];
        if (currentStyles.includes(style)) {
            handleChange('styles', currentStyles.filter(s => s !== style));
        } else {
            if (currentStyles.length >= 2) {
                alert('最多只能選擇兩種風格');
                return;
            }
            handleChange('styles', [...currentStyles, style]);
        }
    };

    const resetStyles = () => {
        handleChange('styles', []);
    };

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '0.5rem' }}>
                <Settings size={20} style={{ color: 'var(--primary)' }} />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>評語設定</h2>
            </div>

            {/* Style Selection */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <label style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Sliders size={16} /> 評語風格（最多選擇兩種）
                    </label>
                    <button
                        onClick={resetStyles}
                        className="glass-btn-secondary"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                        <RotateCcw size={12} /> 重置風格
                    </button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {STYLE_OPTIONS.map(style => (
                        <button
                            key={style}
                            onClick={() => toggleStyle(style)}
                            className="glass-btn-secondary"
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                fontSize: '0.9rem',
                                background: (config.styles || []).includes(style) ? 'var(--primary)' : undefined,
                                color: (config.styles || []).includes(style) ? 'white' : undefined,
                                border: (config.styles || []).includes(style) ? '1px solid var(--primary)' : undefined,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {style}
                        </button>
                    ))}
                </div>

                {(config.styles || []).length > 0 && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        已選擇：{(config.styles || []).join('、')}
                    </div>
                )}
            </div>

            {/* Word Count Selection */}
            <div>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 500 }}>評語字數限制</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                    {WORD_COUNT_OPTIONS.map(option => (
                        <button
                            key={option.value}
                            onClick={() => handleChange('wordCount', option.value)}
                            className="glass-btn-secondary"
                            style={{
                                padding: '0.75rem',
                                textAlign: 'center',
                                background: config.wordCount === option.value ? 'var(--primary)' : 'transparent',
                                color: config.wordCount === option.value ? 'white' : 'var(--text-main)',
                                border: config.wordCount === option.value ? '1px solid var(--primary)' : '1px solid var(--border-glass)',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: config.wordCount === option.value ? 600 : 400,
                                transition: 'all 0.2s'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
