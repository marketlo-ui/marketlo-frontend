'use client';

import { useState, useRef } from 'react';

export default function Home() {
  const [voiceFile, setVoiceFile] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const voiceRef = useRef(null);
  const screenRef = useRef(null);

  function handleVoiceClick() {
    voiceRef.current.click();
  }

  function handleScreenClick() {
    screenRef.current.click();
  }

  function handleVoiceChange(e) {
    const file = e.target.files[0];
    if (file) setVoiceFile(file);
  }

  function handleScreenChange(e) {
    const files = Array.from(e.target.files);
    setScreenshots(files);
  }

  async function handleUpload() {
    if (!voiceFile) {
      setError('Pehle voiceover file select karo!');
      return;
    }
    setError('');
    setUploading(true);

    const formData = new FormData();
    formData.append('voiceover', voiceFile);
    screenshots.forEach((s) => formData.append('screenshots', s));

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError('Backend connect nahi hua. Server chal raha hai?');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div style={{ background: '#05050a', minHeight: '100vh', color: '#f0eeff', fontFamily: 'sans-serif' }}>

      {/* FONTS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #05050a; }
      `}</style>

      {/* NAV */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 48px',
        background: 'rgba(5,5,10,0.9)',
        borderBottom: '1px solid rgba(255,255,255,0.07)'
      }}>
        <div style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.4rem',
          background: 'linear-gradient(135deg, #7c5cfc, #5cf4fc)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
        }}>Marketlo</div>
        <button style={{
          background: '#7c5cfc', color: '#fff', border: 'none',
          padding: '10px 24px', borderRadius: '100px', cursor: 'pointer',
          fontSize: '0.9rem', fontWeight: 500
        }}>Start Free</button>
      </div>

      {/* HERO */}
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '120px 24px 60px',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Orbs */}
        <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: '#7c5cfc', filter: 'blur(100px)', opacity: 0.2, top: '-150px', left: '-150px', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: '#fc5c8a', filter: 'blur(100px)', opacity: 0.2, bottom: '-100px', right: '-100px', pointerEvents: 'none' }}></div>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(124,92,252,0.15)', border: '1px solid rgba(124,92,252,0.4)',
          color: '#b8a4ff', padding: '6px 16px', borderRadius: '100px',
          fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase',
          letterSpacing: '0.05em', marginBottom: '28px'
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7c5cfc', display: 'inline-block' }}></span>
          AI-Powered Video Creation
        </div>

        <h1 style={{
          fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em',
          maxWidth: '800px', marginBottom: '24px'
        }}>
          Upload a voice.<br />
          Get a <span style={{
            background: 'linear-gradient(135deg, #7c5cfc, #fc5c8a)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>full video.</span>
        </h1>

        <p style={{ color: 'rgba(240,238,255,0.5)', fontSize: '1.1rem', maxWidth: '500px', marginBottom: '40px', lineHeight: 1.6 }}>
          Drop your voiceover and screenshots. Marketlo AI handles animations, icons, motion, and editing — in minutes.
        </p>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => document.getElementById('upload-box').scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'linear-gradient(135deg, #7c5cfc, #5b3de8)',
              color: '#fff', border: 'none', padding: '16px 36px',
              borderRadius: '100px', fontSize: '1rem', fontWeight: 500,
              cursor: 'pointer', boxShadow: '0 0 40px rgba(124,92,252,0.4)'
            }}>
            Create Your First Video
          </button>
          <button style={{
            background: 'transparent', color: '#f0eeff',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '16px 36px', borderRadius: '100px',
            fontSize: '1rem', cursor: 'pointer'
          }}>
            Watch Demo →
          </button>
        </div>
      </div>

      {/* UPLOAD BOX */}
      <div id="upload-box" style={{ padding: '60px 24px', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          background: '#111120', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '24px', padding: '48px', maxWidth: '720px', width: '100%',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
            background: 'linear-gradient(90deg, #7c5cfc, #5cf4fc, #fc5c8a)',
            borderRadius: '24px 24px 0 0'
          }}></div>

          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>
            Create a video now
          </h2>
          <p style={{ color: 'rgba(240,238,255,0.45)', marginBottom: '32px' }}>
            Select your files below — we will handle the rest.
          </p>

          {/* Hidden inputs */}
          <input ref={voiceRef} type="file" accept="audio/*" style={{ display: 'none' }} onChange={handleVoiceChange} />
          <input ref={screenRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleScreenChange} />

          {/* Drop zones */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>

            {/* Voiceover */}
            <div
              onClick={handleVoiceClick}
              style={{
                border: voiceFile ? '1.5px solid #5cf4fc' : '1.5px dashed rgba(124,92,252,0.5)',
                background: voiceFile ? 'rgba(92,244,252,0.05)' : 'transparent',
                borderRadius: '16px', padding: '32px 16px',
                textAlign: 'center', cursor: 'pointer'
              }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🎙️</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, marginBottom: '6px' }}>Voiceover Audio</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(240,238,255,0.45)' }}>MP3, WAV, M4A</div>
              {voiceFile && (
                <div style={{ color: '#5cf4fc', fontSize: '0.8rem', marginTop: '10px' }}>
                  ✓ {voiceFile.name}
                </div>
              )}
            </div>

            {/* Screenshots */}
            <div
              onClick={handleScreenClick}
              style={{
                border: screenshots.length > 0 ? '1.5px solid #5cf4fc' : '1.5px dashed rgba(124,92,252,0.5)',
                background: screenshots.length > 0 ? 'rgba(92,244,252,0.05)' : 'transparent',
                borderRadius: '16px', padding: '32px 16px',
                textAlign: 'center', cursor: 'pointer', position: 'relative'
              }}>
              <span style={{
                position: 'absolute', top: '10px', right: '10px',
                background: 'rgba(92,244,252,0.1)', color: '#5cf4fc',
                fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase',
                padding: '2px 8px', borderRadius: '100px'
              }}>Optional</span>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🖼️</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, marginBottom: '6px' }}>Screenshots</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(240,238,255,0.45)' }}>PNG, JPG</div>
              {screenshots.length > 0 && (
                <div style={{ color: '#5cf4fc', fontSize: '0.8rem', marginTop: '10px' }}>
                  ✓ {screenshots.length} file(s)
                </div>
              )}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: 'rgba(252,92,92,0.1)', border: '1px solid rgba(252,92,92,0.3)',
              borderRadius: '12px', padding: '14px', color: '#fc5c5c',
              fontSize: '0.9rem', marginBottom: '16px'
            }}>⚠️ {error}</div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleUpload}
            disabled={uploading}
            style={{
              width: '100%', background: uploading ? '#555' : 'linear-gradient(135deg, #7c5cfc, #5b3de8)',
              border: 'none', color: '#fff', padding: '18px',
              borderRadius: '14px', fontSize: '1rem', fontWeight: 500,
              cursor: uploading ? 'not-allowed' : 'pointer',
              boxShadow: '0 0 30px rgba(124,92,252,0.35)'
            }}>
            {uploading ? '⏳ Uploading...' : '⚡ Generate Video with AI'}
          </button>

          {/* Success */}
          {result && (
            <div style={{
              background: 'rgba(92,252,122,0.08)', border: '1px solid rgba(92,252,122,0.3)',
              borderRadius: '16px', padding: '20px', marginTop: '20px', color: '#5cfc7a'
            }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: '8px' }}>✅ Upload Successful!</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Job ID: {result.data?.jobId}</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>File: {result.data?.voiceover?.filename}</div>
              <div style={{ fontSize: '0.85rem', marginTop: '8px' }}>🤖 AI is processing your video...</div>
            </div>
          )}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ padding: '80px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7c5cfc', marginBottom: '12px' }}>How it works</div>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, textAlign: 'center', marginBottom: '48px' }}>3 simple steps</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            { n: '01', icon: '🎙️', t: 'Upload Voiceover', d: 'Drop your audio — AI transcribes every word and timing.' },
            { n: '02', icon: '🤖', t: 'AI Builds Video', d: 'Animated text, icons, transitions synced to your voice.' },
            { n: '03', icon: '🚀', t: 'Export & Share', d: 'Download MP4 or publish to YouTube, TikTok, Instagram.' },
          ].map(s => (
            <div key={s.n} style={{ background: '#111120', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '32px 24px' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.5rem', fontWeight: 800, color: 'rgba(124,92,252,0.15)', marginBottom: '12px' }}>{s.n}</div>
              <div style={{ fontSize: '1.6rem', marginBottom: '10px' }}>{s.icon}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: '8px' }}>{s.t}</div>
              <div style={{ color: 'rgba(240,238,255,0.45)', fontSize: '0.88rem' }}>{s.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '32px 48px', display: 'flex', justifyContent: 'space-between', color: 'rgba(240,238,255,0.4)', fontSize: '0.85rem' }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, background: 'linear-gradient(135deg, #7c5cfc, #5cf4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Marketlo</div>
        <div>© 2026 Marketlo.in</div>
      </div>

    </div>
  );
}