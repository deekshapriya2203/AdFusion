import React, { useState } from 'react';
import axios from 'axios';

export default function AdGenerator({ userId }) {
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('professional');
  const [platform, setPlatform] = useState('instagram');
  const [length, setLength] = useState('short');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return setError('Please enter product details or prompt.');
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('/api/generate/ad', {
        prompt, tone, platform, length, userId
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!result) return;
    try {
      await axios.post('/api/history/save', {
        userId,
        type: 'ad',
        title: `${platform} ad`,
        prompt,
        response: JSON.stringify(result),
        metadata: { tone, platform, length }
      });
      alert('Saved to history');
    } catch (err) {
      console.error(err);
      alert('Failed to save history');
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Ad Generator</h5>

        <div className="mb-2">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="form-control"
            rows={4}
            placeholder="Describe the product, audience, features, brand voice..."
          />
        </div>

        <div className="d-flex gap-2 mb-2">
          <select className="form-select" value={tone} onChange={(e) => setTone(e.target.value)}>
            <option value="professional">Professional</option>
            <option value="friendly">Friendly</option>
            <option value="luxury">Luxury</option>
            <option value="funny">Funny</option>
            <option value="emotional">Emotional</option>
          </select>

          <select className="form-select" value={platform} onChange={(e) => setPlatform(e.target.value)}>
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="youtube">YouTube</option>
            <option value="google">Google Search</option>
            <option value="twitter">Twitter/X</option>
          </select>

          <select className="form-select" value={length} onChange={(e) => setLength(e.target.value)}>
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={handleGenerate} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Ad'}
          </button>
          <button className="btn btn-outline-secondary" onClick={() => { setPrompt(''); setResult(null); }}>Reset</button>
        </div>

        {error && <div className="text-danger mt-2">{error}</div>}

        {result && (
          <div className="mt-3">
            <h6>Generated Variations</h6>
            <div className="list-group">
              {(result.variants || [result.text]).map((v, i) => (
                <div key={i} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>{v}</div>
                    <div>
                      <button className="btn btn-sm btn-outline-primary me-1" onClick={() => navigator.clipboard.writeText(v)}>Copy</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2">
              <button className="btn btn-success me-2" onClick={handleSave}>Save to history</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
