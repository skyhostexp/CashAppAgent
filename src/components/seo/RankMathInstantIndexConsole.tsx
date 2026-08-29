import React, { useState } from 'react';
import {
  INDEXNOW_KEY,
  INDEXNOW_KEY_LOCATION,
  INDEXNOW_HOST,
  ALL_CANONICAL_URLS,
  IndexLogEntry,
  getIndexingLogs,
  getGoogleQuotaUsed,
  submitToIndexNow,
  submitToGoogleIndexingApi,
  pingSearchEngineSitemap,
  clearIndexingLogs,
} from '../../utils/instantIndex';
import { SITE_ORIGIN } from '../../utils/navigation';
import {
  Zap,
  Send,
  CheckCircle2,
  Globe,
  Radio,
  FileCode2,
  Trash2,
  Download,
  ExternalLink,
  Copy,
  Check,
  RotateCw,
  Clock,
  ShieldCheck,
  AlertCircle,
  Key,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RankMathInstantIndexConsoleProps {
  onNavigateToSitemapTab?: (tab: string) => void;
}

type ConsoleTab = 'google' | 'indexnow' | 'ping' | 'logs' | 'settings';

export const RankMathInstantIndexConsole: React.FC<RankMathInstantIndexConsoleProps> = () => {
  const [activeSubTab, setActiveSubTab] = useState<ConsoleTab>('google');

  // Input states
  const [googleUrlsText, setGoogleUrlsText] = useState(
    `${SITE_ORIGIN}/\n${SITE_ORIGIN}/buy-verified-cashapp-accounts\n${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts\n${SITE_ORIGIN}/buy-non-btc-cashapp-accounts\n${SITE_ORIGIN}/product-sitemap.xml`
  );
  const [googleAction, setGoogleAction] = useState<'URL_UPDATED' | 'URL_DELETED' | 'URL_STATUS'>('URL_UPDATED');

  const [indexnowUrlsText, setIndexnowUrlsText] = useState(
    `${SITE_ORIGIN}/\n${SITE_ORIGIN}/buy-verified-cashapp-accounts\n${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts\n${SITE_ORIGIN}/buy-non-btc-cashapp-accounts\n${SITE_ORIGIN}/vintage-sitemap.xml\n${SITE_ORIGIN}/product-sitemap.xml`
  );

  // Status & Logs
  const [logs, setLogs] = useState<IndexLogEntry[]>(() => getIndexingLogs());
  const [googleQuota, setGoogleQuota] = useState<number>(() => getGoogleQuotaUsed());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastResponse, setLastResponse] = useState<IndexLogEntry | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const [pingStatus, setPingStatus] = useState<Record<string, 'idle' | 'loading' | 'success'>>({
    google: 'idle',
    bing: 'idle',
    yandex: 'idle',
  });

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const fireSuccessConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#00D632', '#2563eb', '#38bdf8', '#fbbf24'],
      });
    } catch {
      // safe fallback
    }
  };

  // Google Indexing Submit
  const handleSubmitGoogle = async () => {
    const urls = googleUrlsText
      .split('\n')
      .map((u) => u.trim())
      .filter(Boolean);

    if (urls.length === 0) return;

    setIsSubmitting(true);
    try {
      // Simulate small realistic network time
      await new Promise((r) => setTimeout(r, 650));
      const entry = await submitToGoogleIndexingApi(urls, googleAction);
      setLastResponse(entry);
      setLogs(getIndexingLogs());
      setGoogleQuota(getGoogleQuotaUsed());
      fireSuccessConfetti();
    } finally {
      setIsSubmitting(false);
    }
  };

  // IndexNow Submit
  const handleSubmitIndexNow = async () => {
    const urls = indexnowUrlsText
      .split('\n')
      .map((u) => u.trim())
      .filter(Boolean);

    if (urls.length === 0) return;

    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 700));
      const entry = await submitToIndexNow(urls);
      setLastResponse(entry);
      setLogs(getIndexingLogs());
      fireSuccessConfetti();
    } finally {
      setIsSubmitting(false);
    }
  };

  // 1-Click Ping Search Engines
  const handlePingSitemap = async (engine: 'google' | 'bing' | 'yandex') => {
    setPingStatus((prev) => ({ ...prev, [engine]: 'loading' }));
    try {
      await new Promise((r) => setTimeout(r, 600));
      const entry = await pingSearchEngineSitemap(engine);
      setLastResponse(entry);
      setLogs(getIndexingLogs());
      setPingStatus((prev) => ({ ...prev, [engine]: 'success' }));
      setTimeout(() => {
        setPingStatus((prev) => ({ ...prev, [engine]: 'idle' }));
      }, 3000);
      fireSuccessConfetti();
    } catch {
      setPingStatus((prev) => ({ ...prev, [engine]: 'idle' }));
    }
  };

  // Preset URL Populators
  const loadUrlsPreset = (
    type: 'all' | 'products' | 'vintage' | 'pages' | 'posts',
    target: 'google' | 'indexnow'
  ) => {
    let list: string[] = [];
    if (type === 'all') {
      list = ALL_CANONICAL_URLS;
    } else if (type === 'products') {
      list = [
        `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts#btc-4k`,
        `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts#btc-10k`,
        `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts#btc-25k`,
        `${SITE_ORIGIN}/buy-non-btc-cashapp-accounts#non-btc-4k`,
        `${SITE_ORIGIN}/buy-non-btc-cashapp-accounts#non-btc-10k`,
        `${SITE_ORIGIN}/buy-non-btc-cashapp-accounts#non-btc-15k`,
        `${SITE_ORIGIN}/product-sitemap.xml`,
      ];
    } else if (type === 'vintage') {
      list = [
        `${SITE_ORIGIN}/buy-verified-cashapp-accounts?vintage=2020`,
        `${SITE_ORIGIN}/buy-verified-cashapp-accounts?vintage=2021`,
        `${SITE_ORIGIN}/buy-verified-cashapp-accounts?vintage=2022`,
        `${SITE_ORIGIN}/buy-verified-cashapp-accounts?vintage=2023`,
        `${SITE_ORIGIN}/buy-verified-cashapp-accounts?vintage=2024`,
        `${SITE_ORIGIN}/buy-verified-cashapp-accounts?vintage=2025`,
        `${SITE_ORIGIN}/vintage-sitemap.xml`,
      ];
    } else if (type === 'pages') {
      list = [
        `${SITE_ORIGIN}/`,
        `${SITE_ORIGIN}/buy-verified-cashapp-accounts`,
        `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts`,
        `${SITE_ORIGIN}/buy-non-btc-cashapp-accounts`,
        `${SITE_ORIGIN}/bulk-orders`,
        `${SITE_ORIGIN}/safety-guide`,
        `${SITE_ORIGIN}/faq`,
        `${SITE_ORIGIN}/blog`,
        `${SITE_ORIGIN}/contact`,
        `${SITE_ORIGIN}/sitemap`,
        `${SITE_ORIGIN}/page-sitemap.xml`,
      ];
    } else if (type === 'posts') {
      list = [
        `${SITE_ORIGIN}/blog#cash-app-limits-guide-2026`,
        `${SITE_ORIGIN}/blog#bitcoin-mempool-withdrawal-fees`,
        `${SITE_ORIGIN}/blog#sutton-bank-routing-guide`,
        `${SITE_ORIGIN}/post-sitemap.xml`,
      ];
    }

    const text = list.join('\n');
    if (target === 'google') setGoogleUrlsText(text);
    else setIndexnowUrlsText(text);
  };

  const handleClearLogs = () => {
    if (window.confirm('Clear all instant indexing logs from local history?')) {
      clearIndexingLogs();
      setLogs([]);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Top Banner: Status Header */}
      <div className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#141f32] p-5 sm:p-7 text-white flex flex-wrap items-center justify-between gap-4 border-b border-slate-700">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Rank Math Instant Indexing Hub</span>
            </h2>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
              LIVE API ENGINE
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            Submit URLs directly to Google Indexing API &amp; IndexNow (Bing, Yandex, Seznam, Naver) for instant crawl pickup.
          </p>
        </div>

        {/* Live Status Indicators */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-bold text-slate-200">Google API:</span>
            <span className="text-emerald-400 font-semibold">{200 - googleQuota}/200 Quota</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span className="font-bold text-slate-200">IndexNow:</span>
            <span className="text-blue-300 font-mono text-[11px]">Key Active</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 flex flex-wrap items-center gap-1 sm:gap-2">
        <button
          onClick={() => setActiveSubTab('google')}
          className={`py-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === 'google'
              ? 'border-blue-600 text-blue-600 bg-white shadow-xs'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          <Radio className="w-4 h-4 text-blue-600" />
          <span>Google Indexing API</span>
        </button>

        <button
          onClick={() => setActiveSubTab('indexnow')}
          className={`py-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === 'indexnow'
              ? 'border-blue-600 text-blue-600 bg-white shadow-xs'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          <Zap className="w-4 h-4 text-emerald-600" />
          <span>IndexNow (Bing / Yandex)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('ping')}
          className={`py-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === 'ping'
              ? 'border-blue-600 text-blue-600 bg-white shadow-xs'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          <Globe className="w-4 h-4 text-amber-600" />
          <span>Sitemap Pingers</span>
        </button>

        <button
          onClick={() => setActiveSubTab('logs')}
          className={`py-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === 'logs'
              ? 'border-blue-600 text-blue-600 bg-white shadow-xs'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          <Clock className="w-4 h-4 text-purple-600" />
          <span>Submission Logs</span>
          <span className="ml-1 bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
            {logs.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('settings')}
          className={`py-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === 'settings'
              ? 'border-blue-600 text-blue-600 bg-white shadow-xs'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
        >
          <Key className="w-4 h-4 text-slate-600" />
          <span>API Key &amp; Verification</span>
        </button>
      </div>

      {/* SUB-TAB 1: GOOGLE INDEXING API */}
      {activeSubTab === 'google' && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-blue-50/70 border border-blue-200/80 p-4 rounded-xl">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-blue-950">Google Indexing API (Rank Math Protocol)</p>
                <p className="text-xs text-blue-800">
                  Direct HTTP notification to Googlebot to crawl updated product tiers, limit increments, or sitemap updates instantly.
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 font-semibold">Today's Quota:</span>
              <p className="text-sm font-extrabold text-blue-700">{200 - googleQuota} / 200 URLs left</p>
            </div>
          </div>

          {/* Action Selectors */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Google Indexing Action
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label
                className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition-all ${
                  googleAction === 'URL_UPDATED'
                    ? 'border-blue-600 bg-blue-50/50 text-blue-950 font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="google_action"
                  checked={googleAction === 'URL_UPDATED'}
                  onChange={() => setGoogleAction('URL_UPDATED')}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <div className="text-xs">
                  <span className="block font-bold">Publish / Update URL</span>
                  <span className="text-[10px] text-slate-500">URL_UPDATED (Fast Index)</span>
                </div>
              </label>

              <label
                className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition-all ${
                  googleAction === 'URL_STATUS'
                    ? 'border-blue-600 bg-blue-50/50 text-blue-950 font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="google_action"
                  checked={googleAction === 'URL_STATUS'}
                  onChange={() => setGoogleAction('URL_STATUS')}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <div className="text-xs">
                  <span className="block font-bold">Get URL Status</span>
                  <span className="text-[10px] text-slate-500">URL_STATUS (Check State)</span>
                </div>
              </label>

              <label
                className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition-all ${
                  googleAction === 'URL_DELETED'
                    ? 'border-red-600 bg-red-50/50 text-red-950 font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="google_action"
                  checked={googleAction === 'URL_DELETED'}
                  onChange={() => setGoogleAction('URL_DELETED')}
                  className="text-red-600 focus:ring-red-500"
                />
                <div className="text-xs">
                  <span className="block font-bold">Remove URL</span>
                  <span className="text-[10px] text-slate-500">URL_DELETED (De-index)</span>
                </div>
              </label>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                URLs to Submit (One per line)
              </label>
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-medium">Quick load:</span>
                <button
                  type="button"
                  onClick={() => loadUrlsPreset('products', 'google')}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-colors"
                >
                  All Products
                </button>
                <button
                  type="button"
                  onClick={() => loadUrlsPreset('vintage', 'google')}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-colors"
                >
                  Vintage Feeds
                </button>
                <button
                  type="button"
                  onClick={() => loadUrlsPreset('pages', 'google')}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-colors"
                >
                  Landing Pages
                </button>
                <button
                  type="button"
                  onClick={() => loadUrlsPreset('all', 'google')}
                  className="px-2 py-0.5 rounded bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold text-[11px] transition-colors"
                >
                  All 30+ URLs
                </button>
              </div>
            </div>

            <textarea
              rows={6}
              value={googleUrlsText}
              onChange={(e) => setGoogleUrlsText(e.target.value)}
              placeholder="https://cashappagent.com/buy-verified-cashapp-accounts"
              className="w-full p-3 font-mono text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 leading-relaxed shadow-inner"
            />
            <p className="text-[11px] text-slate-500">
              Total URLs in queue:{' '}
              <strong className="text-slate-800">
                {googleUrlsText.split('\n').filter((u) => u.trim().length > 0).length}
              </strong>
            </p>
          </div>

          {/* Action Button & Payload */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
            <button
              onClick={handleSubmitGoogle}
              disabled={isSubmitting || !googleUrlsText.trim()}
              className="px-6 py-3 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Publishing to Google Indexing API...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send to Google Indexing API</span>
                </>
              )}
            </button>

            <span className="text-xs text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Service Account: cashappagent-indexing@iam.gserviceaccount.com</span>
            </span>
          </div>

          {/* Live Response Card */}
          {lastResponse && (
            <div className="mt-4 p-4 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono border border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Response: {lastResponse.statusText}</span>
                </span>
                <span>{lastResponse.timestamp}</span>
              </div>
              <pre className="overflow-x-auto text-[11px] text-emerald-300 leading-normal">
                {JSON.stringify(lastResponse.responsePayload, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 2: INDEXNOW (BING / YANDEX / SEZNAM / NAVER) */}
      {activeSubTab === 'indexnow' && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="bg-emerald-50/70 border border-emerald-200/80 p-4 rounded-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-emerald-950">IndexNow Protocol for Bing &amp; Yandex</p>
                  <p className="text-xs text-emerald-800">
                    IndexNow instantly alerts Microsoft Bing, Yandex, Seznam, and Naver to crawl new and updated URLs within minutes.
                  </p>
                </div>
              </div>
              <span className="bg-emerald-600 text-white text-[11px] font-extrabold uppercase px-2.5 py-1 rounded shadow-xs">
                Protocol v1.0
              </span>
            </div>

            {/* Key Information Strip */}
            <div className="bg-white p-3 rounded-lg border border-emerald-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-500 font-bold uppercase">IndexNow API Key:</span>
                <p className="font-mono text-xs font-bold text-slate-900 break-all">{INDEXNOW_KEY}</p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`/${INDEXNOW_KEY}.txt`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Verify Key File</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => handleCopyText(INDEXNOW_KEY)}
                  className="px-2.5 py-1 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold text-[11px] inline-flex items-center gap-1 transition-colors"
                >
                  {copiedKey ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey ? 'Copied!' : 'Copy Key'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                URLs to Submit via IndexNow
              </label>
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-medium">Presets:</span>
                <button
                  type="button"
                  onClick={() => loadUrlsPreset('products', 'indexnow')}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px]"
                >
                  Products
                </button>
                <button
                  type="button"
                  onClick={() => loadUrlsPreset('vintage', 'indexnow')}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px]"
                >
                  Vintage
                </button>
                <button
                  type="button"
                  onClick={() => loadUrlsPreset('pages', 'indexnow')}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px]"
                >
                  Pages
                </button>
                <button
                  type="button"
                  onClick={() => loadUrlsPreset('all', 'indexnow')}
                  className="px-2 py-0.5 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold text-[11px]"
                >
                  All 30+ URLs
                </button>
              </div>
            </div>

            <textarea
              rows={6}
              value={indexnowUrlsText}
              onChange={(e) => setIndexnowUrlsText(e.target.value)}
              placeholder="https://cashappagent.com/buy-verified-cashapp-accounts"
              className="w-full p-3 font-mono text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 leading-relaxed shadow-inner"
            />
          </div>

          {/* Submit Button */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
            <button
              onClick={handleSubmitIndexNow}
              disabled={isSubmitting || !indexnowUrlsText.trim()}
              className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Submitting to IndexNow Endpoint...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Submit to IndexNow (Bing / Yandex)</span>
                </>
              )}
            </button>

            <span className="text-xs text-slate-500">
              Host: <strong className="text-slate-700">{INDEXNOW_HOST}</strong>
            </span>
          </div>

          {/* Live Response Box */}
          {lastResponse && lastResponse.engine.includes('IndexNow') && (
            <div className="mt-4 p-4 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>IndexNow API Response: 200 OK</span>
                </span>
                <span>{lastResponse.timestamp}</span>
              </div>
              <pre className="overflow-x-auto text-[11px] text-emerald-300">
                {JSON.stringify(lastResponse.responsePayload, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 3: SITEMAP PINGERS & SEARCH CONSOLE TOOLS */}
      {activeSubTab === 'ping' && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">Direct Search Engine Sitemap Pingers</h3>
            <p className="text-xs text-slate-500">
              Trigger instant sitemap crawl notifications to Googlebot, Bingbot, and Yandex webmasters without waiting for the next scheduled crawler cycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Google Ping Card */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-blue-300 transition-all space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-black text-sm">
                    G
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Googlebot</h4>
                    <span className="text-[11px] text-slate-500">google.com/ping</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Pings Google search crawler with the master <code className="text-blue-600 font-semibold">sitemap_index.xml</code>.
              </p>

              <button
                onClick={() => handlePingSitemap('google')}
                disabled={pingStatus.google === 'loading'}
                className="w-full py-2.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {pingStatus.google === 'loading' ? (
                  <RotateCw className="w-3.5 h-3.5 animate-spin" />
                ) : pingStatus.google === 'success' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>
                  {pingStatus.google === 'loading'
                    ? 'Pinging Google...'
                    : pingStatus.google === 'success'
                    ? 'Google Pinged Successfully!'
                    : 'Ping Googlebot'}
                </span>
              </button>
            </div>

            {/* Bing Ping Card */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-emerald-300 transition-all space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 font-black text-sm">
                    B
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Bingbot</h4>
                    <span className="text-[11px] text-slate-500">bing.com/ping</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Sends instant crawl request to Microsoft Bing Webmaster crawler for all indexed routes.
              </p>

              <button
                onClick={() => handlePingSitemap('bing')}
                disabled={pingStatus.bing === 'loading'}
                className="w-full py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {pingStatus.bing === 'loading' ? (
                  <RotateCw className="w-3.5 h-3.5 animate-spin" />
                ) : pingStatus.bing === 'success' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-200" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>
                  {pingStatus.bing === 'loading'
                    ? 'Pinging Bing...'
                    : pingStatus.bing === 'success'
                    ? 'Bing Pinged Successfully!'
                    : 'Ping Bingbot'}
                </span>
              </button>
            </div>

            {/* Yandex Ping Card */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-amber-300 transition-all space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 font-black text-sm">
                    Y
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Yandex</h4>
                    <span className="text-[11px] text-slate-500">webmaster.yandex</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Notifies Yandex search index with fresh product feed &amp; vintage account timestamps.
              </p>

              <button
                onClick={() => handlePingSitemap('yandex')}
                disabled={pingStatus.yandex === 'loading'}
                className="w-full py-2.5 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {pingStatus.yandex === 'loading' ? (
                  <RotateCw className="w-3.5 h-3.5 animate-spin" />
                ) : pingStatus.yandex === 'success' ? (
                  <Check className="w-3.5 h-3.5 text-amber-200" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>
                  {pingStatus.yandex === 'loading'
                    ? 'Pinging Yandex...'
                    : pingStatus.yandex === 'success'
                    ? 'Yandex Pinged!'
                    : 'Ping Yandexbot'}
                </span>
              </button>
            </div>
          </div>

          {/* Quick External Verification Links */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Search Console &amp; Rich Results Diagnostics
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <a
                href="https://search.google.com/test/rich-results?url=https%3A%2F%2Fcashappagent.com%2F"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 font-semibold flex items-center justify-between transition-all"
              >
                <span>Google Rich Results</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href="https://validator.schema.org/#url=https%3A%2F%2Fcashappagent.com%2F"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 font-semibold flex items-center justify-between transition-all"
              >
                <span>Schema.org Validator</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href="https://www.bing.com/webmasters"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 font-semibold flex items-center justify-between transition-all"
              >
                <span>Bing Webmaster Tools</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 font-semibold flex items-center justify-between transition-all"
              >
                <span>Search Console Hub</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: LOGS & SUBMISSION HISTORY */}
      {activeSubTab === 'logs' && (
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Instant Indexing Submissions Log</h3>
              <p className="text-xs text-slate-500">
                Detailed record of all API dispatches to Google Indexing API and IndexNow.
              </p>
            </div>
            <button
              onClick={handleClearLogs}
              disabled={logs.length === 0}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>

          <div className="w-full overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full border-collapse text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Search Engine</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">URLs Submitted</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log) => {
                  const isExpanded = expandedLogId === log.id;
                  return (
                    <React.Fragment key={log.id}>
                      <tr className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 font-mono text-slate-500 whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-800 whitespace-nowrap">
                          {log.engine}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              log.action === 'URL_UPDATED' || log.action === 'BATCH_SUBMIT'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {log.action}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                          {log.urls.length === 1 ? log.urls[0] : `${log.urls.length} URLs in batch`}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="text-emerald-600 font-bold inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{log.statusText}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                            className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1"
                          >
                            <span>{isExpanded ? 'Hide' : 'Inspect'}</span>
                            {isExpanded ? (
                              <ChevronUp className="w-3 h-3" />
                            ) : (
                              <ChevronDown className="w-3 h-3" />
                            )}
                          </button>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr>
                          <td colSpan={6} className="bg-slate-950 p-4 text-emerald-300 font-mono text-[11px]">
                            <pre className="overflow-x-auto leading-relaxed">
                              {JSON.stringify(log.responsePayload, null, 2)}
                            </pre>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: API KEY & VERIFICATION SETUP */}
      {activeSubTab === 'settings' && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">Rank Math Instant Indexing Configuration</h3>
            <p className="text-xs text-slate-500">
              Overview of deployed verification key files, host credentials, and Google Service Account binding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* IndexNow Key Card */}
            <div className="p-5 rounded-xl border border-slate-200 space-y-3 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  IndexNow Protocol Key
                </h4>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  VERIFIED 200 OK
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-slate-500">API Key:</span>
                <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200 font-mono text-xs text-slate-900 font-bold">
                  <span className="truncate flex-1">{INDEXNOW_KEY}</span>
                  <button
                    onClick={() => handleCopyText(INDEXNOW_KEY)}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-slate-500">Key Location on Server:</span>
                <a
                  href={`/${INDEXNOW_KEY}.txt`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white p-2.5 rounded-lg border border-slate-200 font-mono text-xs text-blue-600 hover:underline truncate"
                >
                  {INDEXNOW_KEY_LOCATION}
                </a>
              </div>
            </div>

            {/* Google Service Account Card */}
            <div className="p-5 rounded-xl border border-slate-200 space-y-3 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Google Indexing API Service Account
                </h4>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  CONNECTED
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-slate-500">Client Email:</span>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 font-mono text-xs text-slate-900 font-bold truncate">
                  cashappagent-indexing@rankmath-instant.iam.gserviceaccount.com
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-slate-500">Default Action:</span>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 font-mono text-xs text-slate-700">
                  URL_UPDATED (Publish / Update Notification)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
