import React, { useState } from 'react';
import { BLOG_POSTS, BlogPost } from '../../data/blogPosts';
import { 
  BookOpen, 
  ArrowLeft, 
  Clock, 
  Calendar, 
  User, 
  Tag, 
  Search, 
  ArrowRight, 
  Share2, 
  Sparkles, 
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { SITE_ORIGIN } from '../../utils/navigation';

interface BlogPageProps {
  onNavigateHome: () => void;
  onExploreAccounts: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  onNavigateHome,
  onExploreAccounts
}) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const categories = ['All', 'Guides', 'Bitcoin', 'Limits', 'Security'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleShare = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${SITE_ORIGIN}/blog#${post.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedSlug(post.slug);
      setTimeout(() => setCopiedSlug(null), 2500);
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={selectedPost ? () => setSelectedPost(null) : onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#00D632] transition-colors bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{selectedPost ? 'Back to All Articles' : 'Back to Home'}</span>
        </button>
        
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <span className="hidden sm:inline">URL:</span>
          <span className="text-[#00D632] bg-[#00D632]/10 px-2 py-0.5 rounded-lg border border-[#00D632]/20">
            {SITE_ORIGIN}/blog{selectedPost ? `#${selectedPost.slug}` : ''}
          </span>
        </div>
      </div>

      {/* If an article is clicked and selected -> Full Reader View */}
      {selectedPost ? (
        <article className="space-y-8 animate-in fade-in duration-300">
          {/* Article Header Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1810] via-[#09130c] to-[#070e0a] border border-emerald-500/30 p-8 sm:p-12 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-xs font-black text-[#00D632]">
                {selectedPost.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                {selectedPost.readTime}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                {selectedPost.publishDate}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif] leading-tight">
              {selectedPost.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-[#00D632] font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{selectedPost.author}</div>
                  <div className="text-[11px] text-slate-400">Verified Technical Editorial</div>
                </div>
              </div>

              <button
                onClick={(e) => handleShare(selectedPost, e)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition-all cursor-pointer"
              >
                {copiedSlug === selectedPost.slug ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#00D632]" />
                    <span className="text-[#00D632]">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-slate-400" />
                    <span>Share Article</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Article Markdown-like Body Content */}
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-slate-800 text-slate-300 leading-relaxed space-y-6 text-sm sm:text-base">
            <div className="prose prose-invert max-w-none space-y-4">
              <p className="text-lg text-emerald-300/90 font-medium leading-relaxed italic border-l-2 border-[#00D632] pl-4">
                {selectedPost.excerpt}
              </p>

              {selectedPost.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-xl sm:text-2xl font-bold text-white pt-4 pb-2 border-b border-slate-800 font-['Outfit',sans-serif] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00D632]" />
                      <span>{paragraph.replace('### ', '')}</span>
                    </h3>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n- ').map(i => i.replace(/^- /, ''));
                  return (
                    <ul key={idx} className="space-y-2 pl-2">
                      {items.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-2.5 text-slate-300 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-[#00D632] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={idx} className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Tags */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-slate-500" />
              {selectedPost.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg bg-black/40 border border-slate-800 text-xs font-medium text-slate-400"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-emerald-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-bold text-white">Need a Verified Cash App Account?</h3>
              <p className="text-xs text-slate-400">
                Get pre-warmed accounts with Sutton Bank routing and optional Bitcoin on-chain clearance.
              </p>
            </div>
            <button
              onClick={onExploreAccounts}
              className="px-6 py-3 rounded-xl bg-[#00D632] text-black font-bold text-xs hover:bg-[#00FF50] shadow-[0_0_20px_rgba(0,214,50,0.3)] transition-all whitespace-nowrap cursor-pointer"
            >
              Explore Live Stock
            </button>
          </div>
        </article>
      ) : (
        /* Blog Catalog Grid View */
        <div className="space-y-8">
          {/* Main Hero Header */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1810] via-[#09130c] to-[#070e0a] border border-emerald-500/20 p-8 sm:p-12 shadow-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-black text-[#00D632]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>OFFICIAL INSIGHTS &bull; https://cashappagent.com/blog</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
              CashappAgent <span className="text-[#00D632]">Knowledge Hub &amp; Blog</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Technical blueprints, limit guides, Bitcoin on-chain clearance breakdowns, and account warm-up safety protocols curated by our compliance specialists.
            </p>
          </div>

          {/* Search and Category Filter Bar */}
          <div className="bg-slate-900/90 border border-slate-800 p-4 sm:p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Field */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles, limits, bitcoin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-slate-700/80 focus:border-[#00D632] rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#00D632] text-black shadow-[0_0_15px_rgba(0,214,50,0.3)]'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group p-6 sm:p-8 rounded-3xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-emerald-950/30 flex flex-col justify-between space-y-4 cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-[11px] font-black text-[#00D632]">
                      {post.category}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white group-hover:text-[#00D632] transition-colors leading-snug font-['Outfit',sans-serif]">
                    {post.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.publishDate}</span>
                  </div>

                  <div className="flex items-center gap-1.5 font-bold text-[#00D632] group-hover:translate-x-1 transition-transform">
                    <span>Read Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
