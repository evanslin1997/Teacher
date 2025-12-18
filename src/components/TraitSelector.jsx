import React, { useState } from 'react';
import { Tag, Plus, X, RotateCcw } from 'lucide-react';

const TRAIT_CATEGORIES = {
    '資質與態度': [
        '聰穎靈活', '理解力強', '領悟快速', '認真專注', '勤勉好學', '主動求知',
        '善於思考', '舉一反三', '觀察力佳', '表達清晰', '善於溝通', '勇於發表',
        '不夠認真', '欠缺專注', '怠忽學業', '理解較慢', '需多練習', '有待加強', '遲交作業'
    ],
    '個性與品德': [
        '性格溫和', '溫順文靜', '誠實守規矩', '有禮貌', '開朗活潑', '樂觀',
        '負責盡職', '做事認真', '守分負責', '性格內向', '不善交際', '羞怯膽小',
        '不夠自律', '做事粗心'
    ],
    '團體與人際': [
        '待人和善', '人緣良好', '善解人意', '樂於助人', '熱心服務', '具領導力',
        '友愛同學', '願意分享', '樂於合作', '不太合群', '較少互動', '不善合作', '較少參與'
    ],
    '專長與才藝': [
        '語文能力強', '寫作表達佳', '數理能力佳', '邏輯思維強', '計算能力好',
        '表演才能優', '美術天分佳', '音樂感佳', '運動能力強', '體能活動好',
        '動作協調佳', '創意思維佳', '想像力豐富', '創意點子多'
    ]
};

export default function TraitSelector({ selectedTraits, onChange }) {
    const [newTrait, setNewTrait] = useState('');
    const [customTraits, setCustomTraits] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState(Object.keys(TRAIT_CATEGORIES));

    const toggleTrait = (trait) => {
        if (selectedTraits.includes(trait)) {
            onChange(selectedTraits.filter(t => t !== trait));
        } else {
            if (selectedTraits.length >= 20) {
                alert('最多只能選擇 20 個特質');
                return;
            }
            onChange([...selectedTraits, trait]);
        }
    };

    const addCustomTrait = (e) => {
        e.preventDefault();
        if (newTrait.trim() && !selectedTraits.includes(newTrait.trim()) && !customTraits.includes(newTrait.trim())) {
            if (customTraits.length >= 10) {
                alert('最多只能新增 10 個自訂特質');
                return;
            }
            setCustomTraits([...customTraits, newTrait.trim()]);
            setNewTrait('');
        }
    };

    const clearCustomTraits = () => {
        setCustomTraits([]);
        onChange(selectedTraits.filter(t => !customTraits.includes(t)));
    };

    const resetAllTraits = () => {
        onChange([]);
    };

    const toggleCategory = (category) => {
        if (expandedCategories.includes(category)) {
            setExpandedCategories(expandedCategories.filter(c => c !== category));
        } else {
            setExpandedCategories([...expandedCategories, category]);
        }
    };

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Tag size={20} style={{ color: 'var(--primary)' }} />
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>特質選擇</h2>
                </div>
                <button
                    onClick={resetAllTraits}
                    className="glass-btn-secondary"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <RotateCcw size={14} /> 重置特質
                </button>
            </div>

            {/* Predefined Traits by Category */}
            {Object.entries(TRAIT_CATEGORIES).map(([category, traits]) => (
                <div key={category} style={{ marginBottom: '1.5rem' }}>
                    <button
                        onClick={() => toggleCategory(category)}
                        style={{
                            width: '100%',
                            textAlign: 'left',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--border-glass)',
                            padding: '0.75rem 1rem',
                            borderRadius: '8px',
                            color: 'var(--text-main)',
                            fontWeight: 600,
                            cursor: 'pointer',
                            marginBottom: '0.75rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        {category}
                        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                            {expandedCategories.includes(category) ? '▼' : '▶'}
                        </span>
                    </button>

                    {expandedCategories.includes(category) && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingLeft: '0.5rem' }}>
                            {traits.map(trait => (
                                <button
                                    key={trait}
                                    onClick={() => toggleTrait(trait)}
                                    className="glass-btn-secondary"
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '20px',
                                        fontSize: '0.9rem',
                                        background: selectedTraits.includes(trait) ? 'var(--primary)' : undefined,
                                        color: selectedTraits.includes(trait) ? 'white' : undefined,
                                        border: selectedTraits.includes(trait) ? '1px solid var(--primary)' : undefined,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {trait}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            {/* Custom Traits Section */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-glass)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>使用者客製</h3>
                    {customTraits.length > 0 && (
                        <button
                            onClick={clearCustomTraits}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--error)',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        >
                            清除自訂特質
                        </button>
                    )}
                </div>

                <form onSubmit={addCustomTrait} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    <input
                        type="text"
                        value={newTrait}
                        onChange={(e) => setNewTrait(e.target.value)}
                        placeholder="輸入自訂特質後按 Enter"
                        className="glass-input"
                        style={{ flex: 1 }}
                    />
                    <button type="submit" className="glass-btn" style={{ padding: '0.5rem 1rem' }} disabled={!newTrait.trim()}>
                        <Plus size={18} />
                    </button>
                </form>

                {customTraits.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {customTraits.map(trait => (
                            <button
                                key={trait}
                                onClick={() => toggleTrait(trait)}
                                className="glass-btn-secondary"
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '20px',
                                    fontSize: '0.9rem',
                                    background: selectedTraits.includes(trait) ? 'var(--secondary)' : 'rgba(192, 132, 252, 0.1)',
                                    color: selectedTraits.includes(trait) ? 'white' : 'var(--secondary)',
                                    border: `1px solid ${selectedTraits.includes(trait) ? 'var(--secondary)' : 'rgba(192, 132, 252, 0.3)'}`,
                                    cursor: 'pointer'
                                }}
                            >
                                {trait}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Selected Traits Section */}
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)', marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>已選擇的特質：</h3>
                    {selectedTraits.length > 0 && (
                        <button
                            onClick={resetAllTraits}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--text-muted)',
                                fontSize: '0.8rem',
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        >
                            清空已選特質
                        </button>
                    )}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {selectedTraits.length === 0 && <span style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.85rem' }}>尚未選擇</span>}
                    {selectedTraits.map(trait => (
                        <span
                            key={trait}
                            style={{
                                background: 'rgba(129, 140, 248, 0.2)',
                                border: '1px solid rgba(129, 140, 248, 0.4)',
                                color: 'var(--text-main)',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '16px',
                                fontSize: '0.85rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem'
                            }}
                        >
                            {trait}
                            <button
                                onClick={() => toggleTrait(trait)}
                                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex' }}
                            >
                                <X size={14} />
                            </button>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
