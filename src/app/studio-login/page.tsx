import type { Metadata } from 'next'
import { studioLogin } from './actions'

export const metadata: Metadata = {
  title: 'Admin Access — RemoteVakil',
  robots: { index: false, follow: false },
}

interface Props {
  searchParams: Promise<{ error?: string; from?: string }>
}

export default async function StudioLoginPage({ searchParams }: Props) {
  const params = await searchParams
  const hasError = params.error === '1'
  const from = params.from || '/studio'

  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex,nofollow" />
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            background: #0A0A0A;
            color: #fff;
            font-family: 'DM Sans', system-ui, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }
          .wrap {
            width: 100%;
            max-width: 400px;
            padding: 48px 40px;
            background: #111;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 8px;
            box-shadow: 0 24px 64px rgba(0,0,0,0.6);
          }
          .logo {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 32px;
          }
          .logo svg { width: 36px; height: 36px; }
          .logo span { font-size: 1.1rem; font-weight: 600; letter-spacing: -0.01em; }
          h1 { font-size: 1.5rem; font-weight: 700; margin-bottom: 6px; }
          .sub { color: #666; font-size: 0.88rem; margin-bottom: 28px; }
          label { display: block; font-size: 0.82rem; font-weight: 500; color: #aaa; margin-bottom: 8px; letter-spacing: 0.03em; text-transform: uppercase; }
          input {
            width: 100%;
            padding: 13px 16px;
            background: #1a1a1a;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 6px;
            color: #fff;
            font-size: 1rem;
            font-family: monospace;
            letter-spacing: 0.05em;
            transition: border-color 0.2s;
            margin-bottom: 20px;
          }
          input:focus { outline: none; border-color: rgba(255,255,255,0.35); }
          button {
            width: 100%;
            padding: 13px;
            background: #fff;
            color: #0A0A0A;
            border: none;
            border-radius: 6px;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s, transform 0.1s;
          }
          button:hover { background: #e0e0e0; }
          button:active { transform: scale(0.99); }
          .error {
            margin-bottom: 16px;
            padding: 12px 14px;
            background: rgba(239,68,68,0.12);
            border: 1px solid rgba(239,68,68,0.3);
            border-radius: 6px;
            color: #f87171;
            font-size: 0.88rem;
          }
          .lock-icon { display: flex; justify-content: center; margin-bottom: 24px; }
          .lock-icon svg { width: 40px; height: 40px; opacity: 0.3; }
        `}</style>
      </head>
      <body>
        <div className="wrap">
          <div className="logo">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="50" cy="50" r="50" fill="#FFFFFF" fillOpacity="0.08"/>
              <circle cx="31.2" cy="31.2" r="9.4" fill="#FFFFFF"/>
              <circle cx="31.2" cy="50" r="9.4" fill="#FFFFFF"/>
              <circle cx="31.2" cy="68.8" r="9.4" fill="#FFFFFF"/>
              <circle cx="50" cy="68.8" r="9.4" fill="#FFFFFF"/>
              <circle cx="68.8" cy="68.8" r="9.4" fill="#FFFFFF"/>
            </svg>
            <span>RemoteVakil</span>
          </div>

          <div className="lock-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>

          <h1>Admin Access</h1>
          <p className="sub">This area is restricted. Enter your passphrase to continue.</p>

          {hasError && (
            <div className="error">
              ✕ &nbsp;Incorrect passphrase. Please try again.
            </div>
          )}

          <form action={studioLogin}>
            <input type="hidden" name="from" value={from} />
            <label htmlFor="secret">Passphrase</label>
            <input
              type="password"
              id="secret"
              name="secret"
              placeholder="Enter passphrase"
              autoComplete="current-password"
              autoFocus
              required
            />
            <button type="submit">Access Studio →</button>
          </form>
        </div>
      </body>
    </html>
  )
}
