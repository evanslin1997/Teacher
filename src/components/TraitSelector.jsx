import React, { useState } from 'react';
import { Tag, Plus, X, RotateCcw } from 'lucide-react';

const TRAIT_CATEGORIES = {
    '性格特質': [
        '內向忍讓', '友善持重', '天真直爽', '合群寡言',
        '含蓄內斂', '沈靜忠厚', '秉性敦厚', '善於表達',
        '善解人意', '開朗活潑', '勤勉溫和', '意志堅強',
        '慎辨是非', '誠實坦白', '富有愛心', '語言能力佳',
        '嫻淑端莊', '樂天寬懷', '積極樂觀', '穎悟有禮',
        '聰明伶俐',
        '不負責任', '不重實際', '不善表達', '文過飾非',
        '斤斤計較', '任性多言', '因循敷衍', '好強孤僻',
        '好逸惡勞', '好慕虛榮', '個性倔強', '浮華不實',
        '浮躁多言', '做事草率', '得失心重', '患得患失',
        '情緒不穩', '深藏不露', '粗心大意', '喜打小報告',
        '意氣用事', '態度傲慢', '衝動易怒', '言語易衝動'
    ],
    '學習態度': [
        '力爭上游', '好學不倦', '字體有進步', '有志向上',
        '析理明確', '表現優異', '按部就班', '深知進取',
        '創造力強', '富想像力', '富領悟力', '虛心向上',
        '勤奮有為', '勤學專注', '樂於求教', '課業認真',
        '學習能力強', '勇於發問',
        '上課愛講話', '不用心思', '不求甚解', '心不由己',
        '心思不定', '未能自發', '未能持恆', '未能專注',
        '好高騖遠', '作業常遲交', '尚知勤勉', '注意力不集中',
        '玩心太重', '畏於求教', '荒於嬉戲', '散漫粗心',
        '無心向學', '發展不均', '程度較低', '遇挫則息',
        '寫字潦草', '毅力不夠', '獨學少友', '懶散不振',
        '上課易分心'
    ],
    '生活態度': [
        '平易近人', '任勞任怨', '克己助人', '努力服務',
        '刻苦自勵', '明理勤學', '明辨是非', '服務熱心',
        '服從負責', '知書達禮', '律己嚴謹', '急公好義',
        '做事勤快', '尊敬師友', '勤於灑掃', '愛護團體',
        '溫順善良', '誠實可靠', '儀容整潔', '談吐風雅',
        '舉止穩重', '謹慎誠懇', '守規矩', '安分守己',
        '作息有序', '改善遲到',
        '心高氣傲', '交友不慎', '因循成習', '行為失檢',
        '行為放縱', '明知故犯', '怠學貪玩', '計較小節',
        '缺乏群性', '逃避現實', '做事欠認真', '做事懶散',
        '意志薄弱', '屢教不悛', '儀容不整', '敷衍塞責',
        '衛生習慣差', '獨善其身'
    ],
    '綜合表現': [
        '以誠待人', '合群助人', '自我要求高', '行為端正',
        '均衡發展', '志向高超', '秀外慧中', '見義勇為',
        '言行端正', '身體強健', '乖巧守份', '具有領導力',
        '坦直隨和', '忠實文靜', '性情溫和', '明朗果斷',
        '知禮自重', '表現優異', '品學兼優', '負責盡職',
        '做事敏捷', '捨己為群', '爽朗俐落', '富正義感',
        '循規蹈矩', '勤儉樸實', '愛好閱讀', '敬業樂群',
        '慷慨豪邁', '精明能幹', '聞過即改', '樂於助人',
        '樂觀進取', '奮勉向上', '擇善固執', '隨遇而安',
        '禮貌週到', '嚴謹務實', '才德兼修', '反應迅速',
        '人緣好',
        '欠缺主見', '不愛惜物品', '不知用功', '心氣輕浮',
        '個性倔強', '固執己見', '身體虛弱', '言行放肆',
        '沉默發呆', '行為隨便', '行為粗野', '行事馬虎',
        '目光呆滯', '個性暴躁', '缺乏自信', '缺乏進取精神',
        '迷糊健忘', '動作緩慢', '常忘簽名', '欺侮弱者',
        '善言巧辯', '善於造假', '華而不實', '陽奉陰違',
        '意志頹喪', '愛管他人行事', '遇事主觀', '頑騖不訓',
        '精神散漫', '語多浮誇', '隨眾附和', '聰明不用功'
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
