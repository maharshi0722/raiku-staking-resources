"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, ChevronDown, Coins } from "lucide-react";

/* ---------------------------------------------------------
   DATA
--------------------------------------------------------- */

const STAKE_OPTIONS = [
  {
    id: "liquid",
    tag: "Liquid",
    title: "rkuSOL -Liquid Staking",
    apy: "5.50",
    desc: "Deposit SOL and receive rkuSOL instantly. Stays liquid across the Solana DeFi ecosystem while it earns in the background.",
    points: ["Instant liquid token", "Usable across DeFi", "No unstaking wait"],
    cta: "Deposit SOL",
    href: "https://stake.raiku.com/",
  },
  {
    id: "native",
    tag: "Native",
    title: "Native Validator Staking",
    apy: "5.77",
    desc: "Delegate straight to the Raiku validator client. Higher yield from AOT / JIT transaction processing, with a short unbonding window.",
    points: ["Higher base yield", "Runs the Raiku client", "2–3 day unstake"],
    cta: "Deposit SOL",
    href: "https://stake.raiku.com/",
  },
];

const PLATFORMS = [
  {
    id: "exponent",
    name: "Exponent",
    logo: "/logo3.jpg",
    role: "Yield Trading & Liquidity",
    desc: "Split rkuSOL into PT / YT to fix a rate or lever up on yield, or provide liquidity.",
    meta: "earn rewards",
    accent: true,
    wide: true,
    links: [
      {
        label: "Trade Yield",
        href: "https://app.exponent.finance/en/market/farm/rkusol-31OCT26",
      },
      {
        label: "Provide Liquidity",
        href: "https://app.exponent.finance/en/liquidity/pool/rkusol-31OCT26",
      },
    ],
  },
  {
    id: "sanctum",
    name: "Sanctum",
    logo: "/logo2.jpg",
    role: "LST Infrastructure",
    desc: "Mint, trade and manage rkuSOL through Sanctum's liquid staking router.",
    meta: "Swap & Mint rkuSOL",
    href: "https://app.sanctum.so/stake/rkuSOL",
    cta: "Open Sanctum",
  },
  {
    id: "loopscale",
    name: "Loopscale",
    logo: "/logo4.png",
    role: "Leveraged Yield",
    desc: "Loop rkuSOL up to 10× to amplify staking yield against your collateral.",
    meta: "Up to 10× Leverage",
    href: "https://app.loopscale.com/loops/rkusol-sol",
    cta: "Open Loopscale",
  },
];

const ROLES = [
  {
    min: "3",
    label: "Gated Access",
    detail: "Unlocks selected community channels.",
  },
  {
    min: "10",
    label: "Premium Role",
    detail: "Premium community privileges.",
  },
  {
    min: "100",
    label: "Top Tier",
    detail: "Highest community status.",
  },
];

const FAQS = [
  {
    q: "When will Raiku Mainnet launch?",
    a: "Mainnet is on the roadmap for Q4.",
  },
  {
    q: "What assets can I stake right now?",
    a: "Only SOL, through either Native Staking or Liquid Staking (rkuSOL).",
  },
  {
    q: "Is there a lock-up period?",
    a: "No. Native staking follows Solana's usual 2–3 day undelegation window when you unstake. Liquid staking (rkuSOL) stays freely tradable -exit any time.",
  },
  {
    q: "How are points calculated?",
    a: "In real time, based on amount and duration: 1 SOL staked = 1 point per day. There are no streak bonuses or multipliers.",
  },
  {
    q: "Do longer staking periods earn bonus multipliers?",
    a: "No -points scale only with the amount staked, not how long you've held.",
  },
  {
    q: "What do the community roles require?",
    a: "≥3 rkuSOL for gated channels, ≥10 rkuSOL for the premium role, ≥100 rkuSOL for the top-tier role.",
  },
  {
    q: "Will I lose my role if I unstake below the threshold?",
    a: "Yes, the role is removed -but your accumulated points stay exactly where they were.",
  },
  {
    q: "Can a role be restored?",
    a: "Yes. Meet the threshold again and the role returns, with points continuing from where they left off.",
  },
  {
    q: "Are points eligible for a future airdrop?",
    a: "Points currently track on-chain activity only. No reward or incentive program has been announced.",
  },
  {
    q: "Do I lose points if I unstake?",
    a: "No. Points are preserved while unstaked -you simply stop earning new ones until you stake again.",
  },
  {
    q: "Where do staking rewards come from?",
    a: "Base Solana validator rewards, capital efficiency from liquid staking, and -going forward -Raiku validator and network revenue as usage grows.",
  },
  {
    q: "What do the roles actually unlock?",
    a: "Exclusive community groups, private WeChat access, Discord recognition, priority at offline events, and eligibility for future ecosystem campaigns.",
  },
  {
    q: "Where do I check my points or leaderboard rank?",
    a: "The community Discord bot -use /rkusol leaderboard or /rkusol card.",
  },
];

/* ---------------------------------------------------------
   SMALL PIECES
--------------------------------------------------------- */

function RadarRing({ size = 120, children }) {
  return (
    <div className="radar" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="radar-ring">
        <circle cx="50" cy="50" r="47" className="ring ring-outer" />
        <circle cx="50" cy="50" r="36" className="ring ring-mid" />
        <circle cx="50" cy="50" r="25" className="ring ring-inner" />
      </svg>
      <div className="radar-content">{children}</div>
    </div>
  );
}

function XIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LogoMark({ size = 34 }) {
  return (
    <svg
      viewBox="0 0 100 60"
      width={size}
      height={size * 0.6}
      className="logo-mark"
    >
      <polygon points="8,6 46,6 58,18 46,30 8,30" className="mark-fill" />
      <polygon
        points="18,30 44,30 58,44 32,44"
        className="mark-fill mark-fill-dim"
      />
    </svg>
  );
}

// Deterministic, readable letter-mark badge used for each ecosystem
// partner -renders instantly (no external image asset to fail to load)
// and is legible at small sizes on every device.
function PartnerBadge({ name, logo }) {
  const initials = name.slice(0, 2).toUpperCase();
  return (
    <div className="eco-badge" aria-label={`${name} logo`}>
      {logo ? <img src={logo} alt={`${name} logo`} /> : initials}
    </div>
  );
}

/* ---------------------------------------------------------
   MAIN COMPONENT
--------------------------------------------------------- */

export default function RaikuStakeHub() {
  const [openFaq, setOpenFaq] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="raiku-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .raiku-root {
          --bg: #08090a;
          --bg-soft: #0c0e0b;
          --surface: #12140f;
          --surface-2: #191c14;
          --border: #23271b;
          --border-soft: #1a1d15;
          --text: #edf2e4;
          --text-dim: #8d9683;
          --text-faint: #5b6353;
          --accent: #c7ff3e;
          --accent-dim: #97cc1f;
          --accent-glow: rgba(199,255,62,0.28);
          --radius: 14px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
        }
        .raiku-root * { box-sizing: border-box; }
        .raiku-root h1, .raiku-root h2, .raiku-root h3, .raiku-root h4 {
          font-family: 'Space Grotesk', sans-serif;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .raiku-root .mono { font-family: 'JetBrains Mono', monospace; }
        .raiku-root a { color: inherit; text-decoration: none; }
        .raiku-root button { font-family: inherit; cursor: pointer; }

        .wrap { max-width: 1180px; margin: 0 auto; padding: 0 24px; }

        /* ---------- NAV ---------- */
        .nav {
          position: sticky; top: 0; z-index: 50;
          display: grid; grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 12px;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 18px 24px;
          background: rgba(8,9,10,0.7);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid transparent;
          transition: border-color .25s ease, background .25s ease;
        }
        .nav.scrolled { border-color: var(--border-soft); background: rgba(8,9,10,0.92); }
        .nav-left { justify-self: start; }
        .nav-center { display: flex; align-items: center; justify-content: center; justify-self: center; }
        .nav-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 20px;
          letter-spacing: 0.08em;
          color: var(--text);
          text-transform: uppercase;
        }
        .brand-logo-image {
          height: 34px;
          width: auto;
          object-fit: contain;
          display: block;
        }
        .nav-right { display: flex; justify-content: flex-end; align-items: center; gap: 14px; justify-self: end; }
        .icon-btn {
          display: flex; align-items: center; justify-content: center;
          width: 34px; height: 34px; border-radius: 9px;
          border: 1px solid var(--border); color: var(--text-dim);
          background: var(--surface); transition: all .2s ease;
        }
        .icon-btn:hover { color: var(--accent); border-color: var(--accent-glow); }
        .btn-launch {
          border: 1px solid var(--accent); background: var(--accent); color: #0a0b06;
          font-size: 13.5px; font-weight: 600; padding: 8px 16px; border-radius: 9px;
          display: none;
        }
        .nav-title-mobile { display: none; }
        @media (min-width: 640px) { .btn-launch { display: inline-flex; } }

        /* ---------- HERO ---------- */
        .hero {
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--border-soft);
          background: var(--bg);
        }
        /* Designed gradient + grid backdrop replaces the old photo hero
           (which failed to render reliably). Fully CSS-based so it never
           depends on an external/embedded image asset, and stays crisp
           at any viewport size. */
        .hero-bg {
          position: absolute; inset: 0;
          background:
            radial-gradient(60% 55% at 78% 8%, rgba(199,255,62,0.16), transparent 60%),
            radial-gradient(45% 40% at 8% 92%, rgba(199,255,62,0.08), transparent 65%),
            linear-gradient(180deg, #0b0d09 0%, #08090a 60%);
        }
        .hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(199,255,62,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(199,255,62,0.06) 1px, transparent 1px);
          background-size: 44px 44px;
          -webkit-mask-image: radial-gradient(70% 60% at 50% 20%, #000 0%, transparent 80%);
          mask-image: radial-gradient(70% 60% at 50% 20%, #000 0%, transparent 80%);
        }
        .hero-fade {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(8,9,10,0) 0%, var(--bg) 96%);
        }
        .hero-inner {
          position: relative; z-index: 2;
          padding: 96px 24px 64px;
          display: flex; flex-direction: column; align-items: center;
          text-align: center;
          min-height: 660px;
        }
        .eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 12.5px; color: var(--accent);
          border: 1px solid var(--accent-glow); background: rgba(199,255,62,0.06);
          padding: 6px 14px; border-radius: 100px; margin-bottom: 26px;
          font-family: 'JetBrains Mono', monospace; letter-spacing: 0.03em;
        }
        .eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }

        .hero h1 {
          font-size: clamp(40px, 6vw, 68px);
          font-weight: 700; line-height: 1.04;
          max-width: 760px;
          color: var(--text);
        }
        .hero h1 em { color: var(--accent); font-style: normal; }
        .hero p.lead {
          margin-top: 20px; max-width: 560px;
          color: var(--text-dim); font-size: 17.5px; line-height: 1.7;
        }
        .hero-visual {
          position: absolute;
          top: 36%;
          left: 50%;
          transform: translate(-50%, -10%);
          width: min(90vw, 760px);
          max-width: 100%;
          opacity: 0.16;
          pointer-events: none;
          z-index: 1;
        }
        .hero-visual img {
          width: 100%;
          height: auto;
          display: block;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.25));
        }
        @media (max-width: 760px) {
          .hero-visual {
            top: 38%;
            width: min(92vw, 520px);
            opacity: 0.11;
          }
        }
        @media (max-width: 520px) {
          .hero-visual {
            top: 42%;
            transform: translate(-50%, -15%);
            width: min(96vw, 400px);
            opacity: 0.09;
          }
        }
        .partner-strip {
          margin-top: 22px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
        }
        .partner-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 120px;
          padding: 10px 14px;
          border: 1px solid var(--border);
          border-radius: 999px;
          background: rgba(12,14,11,0.8);
          backdrop-filter: blur(6px);
        }
        .partner-pill img {
          width: 100px;
          height: 34px;
          object-fit: contain;
          display: block;
        }
        .hero-ctas { display: flex; gap: 12px; margin-top: 34px; flex-wrap: wrap; justify-content: center; }
        .btn-primary, .btn-ghost {
          font-size: 14.5px; font-weight: 600; padding: 13px 24px; border-radius: 10px;
          display: inline-flex; align-items: center; gap: 8px;
          transition: transform .15s ease, box-shadow .2s ease, border-color .2s ease;
        }
        .btn-primary { background: var(--accent); color: #0a0b06; border: 1px solid var(--accent); }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px var(--accent-glow); }
        .btn-ghost { background: transparent; color: var(--text); border: 1px solid var(--border); }
        .btn-ghost:hover { border-color: var(--text-dim); }

        .hero-stats {
          position: relative; z-index: 2;
          display: grid; grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid var(--border-soft);
          background: rgba(12,14,11,0.6); backdrop-filter: blur(6px);
        }
        .hero-stat {
          padding: 22px 18px; text-align: center;
          border-right: 1px solid var(--border-soft);
        }
        .hero-stat:last-child { border-right: none; }
        .hero-stat .num { font-family: 'JetBrains Mono', monospace; font-size: 22px; font-weight: 500; color: var(--accent); }
        .hero-stat .lbl { font-size: 11.5px; color: var(--text-faint); margin-top: 4px; text-transform: uppercase; letter-spacing: 0.06em; }

        @media (max-width: 700px) {
          .hero-stats { grid-template-columns: repeat(2, 1fr); }
          .hero-stat:nth-child(2) { border-right: none; }
        }

        /* ---------- SECTIONS ---------- */
        section.block { padding: 88px 0; border-bottom: 1px solid var(--border-soft); }
        .section-head { max-width: 620px; margin-bottom: 46px; }
        .section-kicker {
          font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--accent);
          text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px; display: block;
        }
        .section-head h2 { font-size: clamp(28px, 3.6vw, 40px); font-weight: 600; }
        .section-head p { color: var(--text-dim); margin-top: 12px; font-size: 16.5px; line-height: 1.65; }

        /* ---------- STAKE CARDS ---------- */
        .stake-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 800px) { .stake-grid { grid-template-columns: 1fr; } }

        .stake-card {
          border: 1px solid var(--border); border-radius: var(--radius);
          background: linear-gradient(180deg, var(--surface), var(--bg-soft));
          padding: 30px; position: relative; overflow: hidden;
          transition: border-color .2s ease;
        }
        .stake-card:hover { border-color: var(--border-soft); }
        .stake-card.featured { border-color: rgba(199,255,62,0.35); }
        .stake-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
        .stake-tag {
          font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--accent);
          border: 1px solid var(--accent-glow); padding: 4px 10px; border-radius: 100px;
          text-transform: uppercase; letter-spacing: 0.05em;
        }
        .stake-card h3 { font-size: 20px; margin-top: 16px; font-weight: 600; }
        .stake-card .desc { color: var(--text-dim); font-size: 14.5px; margin-top: 10px; line-height: 1.6; }
        .stake-points { list-style: none; padding: 0; margin: 20px 0 0; display: flex; flex-direction: column; gap: 8px; }
        .stake-points li { font-size: 13.5px; color: var(--text-dim); display: flex; align-items: center; gap: 9px; }
        .stake-points li::before { content: ''; width: 5px; height: 5px; background: var(--accent-dim); border-radius: 50%; flex: none; }

        .radar { position: relative; display: flex; align-items: center; justify-content: center; flex: none; }
        .radar-ring { position: absolute; inset: 0; animation: spin 26s linear infinite; }
        .raiku-root .ring { fill: none; stroke: var(--border); stroke-width: 0.6; }
        .raiku-root .ring-mid { stroke: var(--accent-glow); stroke-dasharray: 3 4; }
        .raiku-root .ring-inner { stroke: var(--accent); stroke-opacity: 0.5; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .radar-content { position: relative; z-index: 2; text-align: center; }
        .radar-content .apy-num { font-family: 'JetBrains Mono', monospace; font-size: 24px; color: var(--accent); font-weight: 500; }
        .radar-content .apy-lbl { font-size: 10px; color: var(--text-faint); text-transform: uppercase; letter-spacing: 0.06em; margin-top: 2px; }

        .stake-mid { display: flex; align-items: center; justify-content: space-between; margin-top: 22px; gap: 16px; }

        .stake-cta {
          margin-top: 24px; width: 100%; justify-content: center;
        }

        /* ---------- ECOSYSTEM GRID ---------- */
        /* Exponent renders as a full-width feature row (spans both
           columns); Sanctum and Loopscale sit side by side beneath it. */
        .eco-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
        .eco-card.wide { grid-column: 1 / -1; }
        .eco-card.wide .eco-actions { flex-wrap: nowrap; }
        @media (max-width: 760px) {
          .eco-grid { grid-template-columns: 1fr; }
          .eco-card.wide .eco-actions { flex-wrap: wrap; }
        }

        .eco-card {
          border: 1px solid var(--border); border-radius: var(--radius);
          padding: 26px; background: var(--surface);
          display: flex; flex-direction: column; gap: 16px;
          transition: transform .18s ease, border-color .18s ease;
        }
        .eco-card:hover { transform: translateY(-2px); border-color: var(--border-soft); }
        .eco-card.accent { border-color: rgba(199,255,62,0.3); background: linear-gradient(180deg, rgba(199,255,62,0.05), var(--surface) 55%); }
        .eco-head { display: flex; align-items: center; gap: 12px; }
        .eco-badge {
          width: 56px; height: 56px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          background: var(--surface-2); border: 1px solid var(--border);
          font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 15px;
          color: var(--accent); letter-spacing: 0.02em;
          flex: none;
          overflow: hidden;
        }
        .eco-badge img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .eco-titles h4 { font-size: 16.5px; font-weight: 600; }
        .eco-titles span { font-size: 12px; color: var(--text-faint); }
        .eco-card p.desc { color: var(--text-dim); font-size: 14px; line-height: 1.6; flex: 1; }
        .eco-meta {
          font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--accent-dim);
        }
        .eco-actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 4px; }
        .eco-link {
          font-size: 13px; font-weight: 600; color: var(--text);
          border: 1px solid var(--border); padding: 9px 14px; border-radius: 9px;
          display: inline-flex; align-items: center; gap: 6px;
          transition: border-color .2s ease, color .2s ease;
        }
        .eco-link:hover { border-color: var(--accent); color: var(--accent); }

        /* ---------- ROLES ---------- */
        .roles-wrap { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        @media (max-width: 760px) { .roles-wrap { grid-template-columns: 1fr; } }
        .role-card { border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; background: var(--surface); }
        .role-min { font-family: 'JetBrains Mono', monospace; color: var(--accent); font-size: 26px; font-weight: 500; }
        .role-min span { font-size: 13px; color: var(--text-faint); margin-left: 6px; }
        .role-card h4 { margin-top: 10px; font-size: 15.5px; font-weight: 600; }
        .role-card p { color: var(--text-dim); font-size: 13.5px; margin-top: 6px; line-height: 1.55; }

        .points-note {
          margin-top: 24px; display: flex; align-items: center; gap: 14px;
          border: 1px dashed var(--border); border-radius: 12px; padding: 16px 20px;
          color: var(--text-dim); font-size: 13.5px;
        }
        .points-note .mono { color: var(--accent); }

        /* ---------- FAQ ---------- */
        .faq-list { display: flex; flex-direction: column; gap: 10px; }
        .faq-item { border: 1px solid var(--border); border-radius: 12px; background: var(--surface); overflow: hidden; }
        .faq-q {
          width: 100%; background: none; border: none; color: var(--text);
          display: flex; justify-content: space-between; align-items: center;
          padding: 18px 20px; font-size: 15px; font-weight: 500; text-align: left;
        }
        .faq-q svg { color: var(--text-faint); transition: transform .25s ease; flex: none; }
        .faq-item.open .faq-q svg { transform: rotate(180deg); color: var(--accent); }
        .faq-a { max-height: 0; overflow: hidden; transition: max-height .3s ease; }
        .faq-item.open .faq-a { max-height: 220px; }
        .faq-a-inner { padding: 0 20px 20px; color: var(--text-dim); font-size: 14px; line-height: 1.65; }

        /* ---------- FOOTER ---------- */
        footer { padding: 56px 0 32px; }
        .footer-top { display: flex; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
        .footer-brand { max-width: 280px; }
        .footer-brand-row { display: flex; align-items: center; gap: 10px; }
        .footer-brand-row span { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 16px; }
        .footer-brand p { color: var(--text-faint); font-size: 13px; margin-top: 12px; line-height: 1.6; }
        .footer-cols { display: flex; gap: 56px; flex-wrap: wrap; }
        .footer-col h5 { font-size: 12px; color: var(--text-faint); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 14px; font-weight: 500; }
        .footer-col a, .footer-col span.static {
          display: block; font-size: 13.5px; color: var(--text-dim); margin-bottom: 10px;
        }
        .footer-col a:hover { color: var(--accent); }
        .footer-bottom {
          margin-top: 48px; padding-top: 24px; border-top: 1px solid var(--border-soft);
          display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;
        }
        .footer-bottom .copy { font-size: 12.5px; color: var(--text-faint); }
        .footer-social { display: flex; gap: 10px; }

        @media (max-width: 640px) {
          .nav { grid-template-columns: auto 1fr auto; padding: 14px 16px; }
          .nav-left, .nav-right { min-width: 0; }
          .nav-center { padding: 0 10px; }
          .nav-title { font-size: 16px; }
          .nav-title-mobile { display: inline-block; }
          .nav-title:not(.nav-title-mobile) { display: none; }
          .icon-btn { display: none; }
          .btn-launch { display: none; }
          .nav-right { gap: 10px; }
          .nav-links { display: none; }
          .wrap { padding: 0 18px; }
          section.block { padding: 60px 0; }
          .hero-inner { padding: 64px 18px 48px; }
        }
      `}</style>

      {/* ---------------- NAV ---------------- */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-left">
          <img
            src="/Logo%20Green%20RGB.png"
            alt="Raiku logo"
            className="brand-logo-image"
          />
        </div>
        <div className="nav-center">
          <span className="nav-title">Raiku Staking Hub</span>
        </div>
        <div className="nav-right">
          <span className="nav-title nav-title-mobile">Raiku Staking Hub</span>
          <a
            className="icon-btn"
            href="https://x.com/raikucom"
            target="_blank"
            rel="noreferrer"
            aria-label="Raiku on X"
          >
            <XIcon />
          </a>
          <a
            className="btn-launch"
            href="https://stake.raiku.com/"
            target="_blank"
            rel="noreferrer"
          >
            Launch App
          </a>
        </div>
      </nav>

      {/* ---------------- HERO ---------------- */}
      <header className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-fade" />
        <div className="hero-inner">
          <h1>
            Stake Solana. <em>Earn</em> the Raiku way.
          </h1>
          <p className="lead">
            rkuSOL allocates your SOL across validators running the Raiku
            client. They earn more from Ahead-of-Time and Just-In-Time
            transactions and pass the extra yield straight to stakers.
          </p>
          <div className="hero-visual" aria-label="Raiku brand showcase">
            <img src="/hero.png" alt="Raiku hero illustration" />
          </div>
          <div className="partner-strip" aria-label="Partner logos">
            <div className="partner-pill">
              <img src="/logo1.png" alt="Partner logo 1" />
            </div>
            <div className="partner-pill">
              <img src="/logo2.jpg" alt="Partner logo 2" />
            </div>
            <div className="partner-pill">
              <img src="/logo3.jpg" alt="Partner logo 3" />
            </div>
            <div className="partner-pill">
              <img src="/logo4.png" alt="Partner logo 4" />
            </div>
          </div>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => scrollTo("stake")}>
              Start staking <ArrowUpRight size={16} />
            </button>
            <button className="btn-ghost" onClick={() => scrollTo("ecosystem")}>
              Explore the ecosystem
            </button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="num">5.50%</div>
            <div className="lbl">Liquid APY</div>
          </div>
          <div className="hero-stat">
            <div className="num">5.77%</div>
            <div className="lbl">Native APY</div>
          </div>
          <div className="hero-stat">
            <div className="num">1/day</div>
            <div className="lbl">Point per SOL</div>
          </div>
          <div className="hero-stat">
            <div className="num">3</div>
            <div className="lbl">Places to stake</div>
          </div>
        </div>
      </header>

      {/* ---------------- STAKE ---------------- */}
      <section className="block" id="stake">
        <div className="wrap">
          <div className="section-head">
            <span className="section-kicker">01 -Stake</span>
            <h2>Two ways to stake SOL</h2>
            <p>
              Both routes earn the same underlying validator rewards. Pick
              liquidity, or pick yield.
            </p>
          </div>

          <div className="stake-grid">
            {STAKE_OPTIONS.map((opt) => (
              <div
                className={`stake-card ${opt.id === "native" ? "featured" : ""}`}
                key={opt.id}
              >
                <div className="stake-top">
                  <div>
                    <span className="stake-tag">{opt.tag}</span>
                    <h3>{opt.title}</h3>
                  </div>
                  <RadarRing size={92}>
                    <div className="apy-num">{opt.apy}%</div>
                    <div className="apy-lbl">APY</div>
                  </RadarRing>
                </div>
                <p className="desc">{opt.desc}</p>
                <ul className="stake-points">
                  {opt.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <a
                  className="btn-primary stake-cta"
                  href={opt.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {opt.cta} <ArrowUpRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- ECOSYSTEM ---------------- */}
      <section className="block" id="ecosystem">
        <div className="wrap">
          <div className="section-head">
            <span className="section-kicker">02 -Ecosystem</span>
            <h2>Put rkuSOL to work</h2>
            <p>
              Once you're holding rkuSOL, three integrated protocols let you
              route it toward more yield, leverage, or liquidity -without ever
              leaving your stake idle.
            </p>
          </div>

          <div className="eco-grid">
            {PLATFORMS.map((p) => (
              <div
                className={`eco-card ${p.accent ? "accent" : ""} ${p.wide ? "wide" : ""}`}
                key={p.id}
              >
                <div className="eco-head">
                  <PartnerBadge name={p.name} logo={p.logo} />
                  <div className="eco-titles">
                    <h4>{p.name}</h4>
                    <span>{p.role}</span>
                  </div>
                </div>
                <p className="desc">{p.desc}</p>
                <div className="eco-meta">{p.meta}</div>
                <div className="eco-actions">
                  {p.links ? (
                    p.links.map((l) => (
                      <a
                        className="eco-link"
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        key={l.label}
                      >
                        {l.label} <ArrowUpRight size={14} />
                      </a>
                    ))
                  ) : (
                    <a
                      className="eco-link"
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {p.cta} <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- ROLES / POINTS ---------------- */}
      <section className="block" id="roles">
        <div className="wrap">
          <div className="section-head">
            <span className="section-kicker">03 -Community</span>
            <h2>Points &amp; community roles</h2>
            <p>
              Every staked SOL earns points daily. Hold enough rkuSOL and unlock
              a role tier.
            </p>
          </div>

          <div className="roles-wrap">
            {ROLES.map((r) => (
              <div className="role-card" key={r.min}>
                <div className="role-min">
                  {r.min}
                  <span>rkuSOL min.</span>
                </div>
                <h4>{r.label}</h4>
                <p>{r.detail}</p>
              </div>
            ))}
          </div>

          <div className="points-note">
            <Coins size={18} color="var(--accent)" />
            <div>
              Base rule:{" "}
              <span className="mono">1 SOL staked = 1 point / day</span>, no
              streak bonus. Unstaking pauses accrual but never erases points —
              check your rank anytime with{" "}
              <span className="mono">/rkusol leaderboard</span> in Discord.
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="block" id="faq" style={{ borderBottom: "none" }}>
        <div className="wrap">
          <div className="section-head">
            <span className="section-kicker">04 -FAQ</span>
            <h2>Common questions</h2>
          </div>

          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div
                className={`faq-item ${openFaq === i ? "open" : ""}`}
                key={f.q}
              >
                <button
                  className="faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  {f.q}
                  <ChevronDown size={18} />
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer>
        <div className="wrap">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-brand-row">
                <img
                  src="/Logo%20Green%20RGB.png"
                  alt="Raiku logo"
                  className="brand-logo-image"
                />
               
              </div>
              <p>
                Liquid and native staking for Solana, built around validators
                running the Raiku Ahead-of-Time and Just-In-Time client.
              </p>
            </div>

            <div className="footer-cols">
              <div className="footer-col">
                <h5>Stake</h5>
                <a
                  href="https://stake.raiku.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Liquid &amp; Native
                </a>
                <a
                  href="https://app.exponent.finance/en/market/farm/rkusol-31OCT26"
                  target="_blank"
                  rel="noreferrer"
                >
                  Exponent
                </a>
                <a
                  href="https://app.sanctum.so/stake/rkuSOL?raiku_click_id=c16d32a7-cf8c-456d-a167-a443070df354"
                  target="_blank"
                  rel="noreferrer"
                >
                  Sanctum
                </a>
                <a
                  href="https://app.loopscale.com/loops/rkusol-sol"
                  target="_blank"
                  rel="noreferrer"
                >
                  Loopscale
                </a>
              </div>
              <div className="footer-col">
                <h5>Community</h5>
                <span className="static">Points &amp; roles</span>
                <span className="static">Leaderboard -Discord</span>
                <a
                  href="https://x.com/raikucom"
                  target="_blank"
                  rel="noreferrer"
                >
                  X / Twitter
                </a>
              </div>
              <div className="footer-col">
                <h5>Network</h5>
                <span className="static">Mainnet -Q4</span>
                <span className="static">Asset support -SOL</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span className="copy">
              © {new Date().getFullYear()} Raiku. Staking involves risk -do your
              own research.
            </span>
            <div className="footer-social">
              <a
                className="icon-btn"
                href="https://x.com/raikucom"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
              >
                <XIcon />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
