import { useState } from 'react';
export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/process', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ url })});
    const data = await res.json();
    setResult(data); setLoading(false);
  };

 const subscribe = async (plan: 'creator' | 'agency') => {
  const r = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plan })
  });
  const { url } = await r.json();
  window.location.href = url;
};
  return (
    <main style={{padding:40,maxWidth:600,margin:'auto',fontFamily:'sans-serif'}}>
      <h1>Auto‑Shorts AI</h1>
      <p>Turn long YouTube videos into viral Shorts.</p>
      <form onSubmit={handleSubmit}>
        <input type="url" placeholder="YouTube link" value={url} onChange={e=>setUrl(e.target.value)} style={{width:'100%',padding:8}} required/>
        <button style={{marginTop:12}} disabled={loading}>{loading?'Processing…':'Generate Shorts'}</button>
      </form>
      <div style={{marginTop:20,display:'flex',gap:10}}>
        <button onClick={() => subscribe('creator')}>Creator $59/mo</button>
<button onClick={() => subscribe('agency')}>Agency $199/mo</button>
      </div>
      {result && <pre style={{background:'#eee',padding:16,marginTop:24}}>{JSON.stringify(result,null,2)}</pre>}
    </main>
  );
}
