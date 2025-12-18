import React, { useState, useEffect } from 'react';
import { Sparkles, GraduationCap } from 'lucide-react';
import ApiKeyInput from './components/ApiKeyInput';
import StudentInput from './components/StudentInput';
import TraitSelector from './components/TraitSelector';
import ControlPanel from './components/ControlPanel';
import CommentDisplay from './components/CommentDisplay';
import { generateComment } from './utils/generator';

function App() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
  const [students, setStudents] = useState('');
  const [traits, setTraits] = useState([]);
  const [config, setConfig] = useState({ styles: [], wordCount: 150 });
  const [results, setResults] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    localStorage.setItem('gemini_api_key', apiKey);
  }, [apiKey]);

  const parseStudents = (text) => {
    return text.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => {
        // Support both "1.Name" and "1. Name" formats
        const match = line.match(/^(\d+)\.\s*(.+)$/);
        return match ? match[2] : line;
      });
  };

  const handleGenerate = async () => {
    if (!apiKey) {
      alert('請先輸入您的 Gemini API 金鑰');
      return;
    }

    const studentList = parseStudents(students);
    if (studentList.length === 0) {
      alert('請至少輸入一位學生');
      return;
    }

    if (traits.length === 0) {
      if (!confirm("尚未選擇特質，是否生成通用評語？")) return;
    }

    setIsGenerating(true);

    // Initialize results
    const initialResults = studentList.map(name => ({
      student: name,
      status: 'pending',
      comment: ''
    }));
    setResults(initialResults);

    // Process sequentially to be safe with rate limits
    const newResults = [...initialResults];

    for (let i = 0; i < studentList.length; i++) {
      newResults[i] = { ...newResults[i], status: 'loading' };
      setResults([...newResults]);

      try {
        const comment = await generateComment(apiKey, studentList[i], traits, config);
        newResults[i] = { ...newResults[i], status: 'completed', comment: comment };
      } catch (error) {
        console.error(error);
        newResults[i] = { ...newResults[i], status: 'error', comment: '' };
      }

      setResults([...newResults]);

      // Small delay to be nice to the API
      if (i < studentList.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    setIsGenerating(false);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }} className="fade-in">
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', marginBottom: '1rem', boxShadow: '0 0 30px var(--primary-glow)' }}>
          <GraduationCap size={48} style={{ color: 'var(--primary)' }} />
        </div>
        <h1 className="heading-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          AI 學生評語產生器
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          使用 Gemini AI 快速生成個性化學生期末評語
        </p>
      </header>

      <div className="fade-in" style={{ animationDelay: '0.1s' }}>
        <ApiKeyInput value={apiKey} onChange={setApiKey} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
        <div className="fade-in" style={{ animationDelay: '0.2s' }}>
          <StudentInput value={students} onChange={setStudents} />
        </div>

        <div className="fade-in" style={{ animationDelay: '0.3s' }}>
          <ControlPanel config={config} onChange={setConfig} />

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !apiKey || !students.trim()}
            className="glass-btn btn-glow"
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '1rem'
            }}
          >
            {isGenerating ? (
              <>生成中...</>
            ) : (
              <>
                <Sparkles size={20} /> 生成評語
              </>
            )}
          </button>
        </div>
      </div>

      <div className="fade-in" style={{ animationDelay: '0.4s' }}>
        <TraitSelector selectedTraits={traits} onChange={setTraits} />
      </div>

      <div className="fade-in" style={{ animationDelay: '0.5s' }}>
        <CommentDisplay results={results} />
      </div>

      <footer style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', paddingBottom: '2rem' }}>
        <p>由 Google Gemini API 驅動 • 隱私優先（金鑰僅存於本地）</p>
      </footer>
    </div>
  );
}

export default App;
