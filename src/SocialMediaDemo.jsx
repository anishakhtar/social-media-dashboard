import React, { useState } from 'react';
import { FiArrowLeft, FiTrendingUp, FiTrendingDown, FiHeart, FiMessageSquare, FiRepeat, FiEye, FiUsers, FiCalendar } from 'react-icons/fi';

const platforms = [
  { id: 'instagram', name: 'Instagram', color: '#e1306c', icon: '📸' },
  { id: 'twitter', name: 'Twitter', color: '#1da1f2', icon: '🐦' },
  { id: 'linkedin', name: 'LinkedIn', color: '#0a66c2', icon: '💼' },
  { id: 'facebook', name: 'Facebook', color: '#1877f2', icon: '👍' },
];

const generateTrend = (days, base, variance) =>
  Array.from({ length: days }, (_, i) => Math.round(base + Math.sin(i * 0.3) * variance + (Math.random() - 0.5) * variance * 0.5));

const SocialMediaDemo = ({ onBack }) => {
  const [period, setPeriod] = useState('30d');
  const [activePlatform, setActivePlatform] = useState('all');
  const periods = { '7d': 7, '30d': 30, '90d': 90 };

  const days = periods[period];
  const followerTrend = generateTrend(days, 12500, 800);

  const overview = {
    totalFollowers: '12,847',
    followersChange: '+12.3%',
    followersUp: true,
    engagementRate: '4.8%',
    engagementChange: '+0.6%',
    engagementUp: true,
    postsPublished: '486',
    postsChange: '+8.2%',
    postsUp: true,
    totalImpressions: '847.3K',
    impressionsChange: '-2.1%',
    impressionsUp: false,
  };

  const platformData = [
    { id: 'instagram', followers: '5,240', growth: '+15.2%', up: true, engagement: '5.1%', posts: 168, color: '#e1306c' },
    { id: 'twitter', followers: '3,870', growth: '+8.7%', up: true, engagement: '3.4%', posts: 142, color: '#1da1f2' },
    { id: 'linkedin', followers: '2,410', growth: '+21.4%', up: true, engagement: '6.2%', posts: 89, color: '#0a66c2' },
    { id: 'facebook', followers: '1,327', growth: '-3.8%', up: false, engagement: '2.8%', posts: 87, color: '#1877f2' },
  ];

  const recentPosts = [
    { id: 1, platform: 'instagram', content: 'New product launch! 🚀 Excited to share what we\'ve been working on...', image: 'https://picsum.photos/seed/launch/600/400', likes: 842, comments: 64, shares: 28, time: '2h ago', type: 'image' },
    { id: 2, platform: 'twitter', content: 'Our latest blog post is live! Check out the top 10 trends in 2026...', image: null, likes: 315, comments: 42, shares: 156, time: '4h ago', type: 'text' },
    { id: 3, platform: 'linkedin', content: 'Thrilled to announce that we\'ve reached 10,000 customers worldwide! Thank you for your trust and support.', image: 'https://picsum.photos/seed/milestone/600/300', likes: 1204, comments: 89, shares: 67, time: '6h ago', type: 'image' },
    { id: 4, platform: 'instagram', content: 'Behind the scenes of our latest photoshoot 📸', image: 'https://picsum.photos/seed/bts/600/600', likes: 567, comments: 38, shares: 12, time: '8h ago', type: 'carousel' },
    { id: 5, platform: 'twitter', content: 'What feature would you like to see next? We\'re planning the Q3 roadmap and want your input!', image: null, likes: 203, comments: 94, shares: 34, time: '12h ago', type: 'poll' },
    { id: 6, platform: 'linkedin', content: 'We\'re hiring! Looking for a Senior Full Stack Developer to join our remote team...', image: 'https://picsum.photos/seed/hiring/600/200', likes: 445, comments: 22, shares: 178, time: '1d ago', type: 'image' },
  ];

  const filteredPosts = activePlatform === 'all'
    ? recentPosts
    : recentPosts.filter((p) => p.platform === activePlatform);

  const maxFollowers = Math.max(...followerTrend);
  const minFollowers = Math.min(...followerTrend);
  const range = maxFollowers - minFollowers || 1;
  const chartW = 600;
  const chartH = 180;
  const points = followerTrend.map((v, i) => {
    const x = (i / (followerTrend.length - 1)) * chartW;
    const y = chartH - ((v - minFollowers) / range) * (chartH - 20) - 10;
    return `${x},${y}`;
  }).join(' ');

  const platformIcons = { instagram: '📸', twitter: '🐦', linkedin: '💼', facebook: '👍' };

  return (
    <section className="social-demo">
      <div className="container">
        <div className="demo-header">
          <button className="btn-back" onClick={onBack}>
            <FiArrowLeft size={20} /> Back to Portfolio
          </button>
          <h2 className="section-title">Social Media Dashboard Demo</h2>
          <p className="section-subtitle">Real-time analytics and engagement tracking across platforms</p>
        </div>

        <div className="social-period-bar">
          {['7d', '30d', '90d'].map((p) => (
            <button key={p} className={`period-btn ${period === p ? 'active' : ''}`} onClick={() => setPeriod(p)}>
              <FiCalendar size={14} /> {p}
            </button>
          ))}
        </div>

        <div className="social-overview">
          <div className="overview-card">
            <div className="overview-icon"><FiUsers size={22} /></div>
            <div className="overview-info">
              <span className="overview-label">Total Followers</span>
              <span className="overview-value">{overview.totalFollowers}</span>
              <span className={`overview-change ${overview.followersUp ? 'up' : 'down'}`}>
                {overview.followersUp ? <FiTrendingUp size={14} /> : <FiTrendingDown size={14} />}
                {overview.followersChange}
              </span>
            </div>
          </div>
          <div className="overview-card">
            <div className="overview-icon"><FiHeart size={22} /></div>
            <div className="overview-info">
              <span className="overview-label">Engagement Rate</span>
              <span className="overview-value">{overview.engagementRate}</span>
              <span className={`overview-change ${overview.engagementUp ? 'up' : 'down'}`}>
                {overview.engagementUp ? <FiTrendingUp size={14} /> : <FiTrendingDown size={14} />}
                {overview.engagementChange}
              </span>
            </div>
          </div>
          <div className="overview-card">
            <div className="overview-icon"><FiEye size={22} /></div>
            <div className="overview-info">
              <span className="overview-label">Total Impressions</span>
              <span className="overview-value">{overview.totalImpressions}</span>
              <span className={`overview-change ${overview.impressionsUp ? 'up' : 'down'}`}>
                {overview.impressionsUp ? <FiTrendingUp size={14} /> : <FiTrendingDown size={14} />}
                {overview.impressionsChange}
              </span>
            </div>
          </div>
          <div className="overview-card">
            <div className="overview-icon"><FiMessageSquare size={22} /></div>
            <div className="overview-info">
              <span className="overview-label">Posts Published</span>
              <span className="overview-value">{overview.postsPublished}</span>
              <span className={`overview-change ${overview.postsUp ? 'up' : 'down'}`}>
                {overview.postsUp ? <FiTrendingUp size={14} /> : <FiTrendingDown size={14} />}
                {overview.postsChange}
              </span>
            </div>
          </div>
        </div>

        <div className="social-two-col">
          <div className="social-platforms">
            <h3>Platforms Overview</h3>
            <div className="platform-cards">
              {platformData.map((p) => (
                <div key={p.id} className={`platform-card ${activePlatform === p.id ? 'active' : ''}`} onClick={() => setActivePlatform(activePlatform === p.id ? 'all' : p.id)}>
                  <div className="platform-header">
                    <span className="platform-icon">{platformIcons[p.id]}</span>
                    <span className="platform-name">{p.name}</span>
                  </div>
                  <div className="platform-stats">
                    <span className="platform-followers">{p.followers}</span>
                    <span className={`platform-growth ${p.up ? 'up' : 'down'}`}>{p.growth}</span>
                  </div>
                  <div className="platform-meta">
                    <span>Eng: {p.engagement}</span>
                    <span>{p.posts} posts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="social-chart-card">
            <h3>Follower Growth</h3>
            <div className="chart-container">
              <svg viewBox={`0 0 ${chartW} ${chartH + 30}`} className="follower-chart">
                {followerTrend.map((v, i) => {
                  if (i === 0) return null;
                  const x1 = ((i - 1) / (followerTrend.length - 1)) * chartW;
                  const y1 = chartH - ((followerTrend[i - 1] - minFollowers) / range) * (chartH - 20) - 10;
                  const x2 = (i / (followerTrend.length - 1)) * chartW;
                  const y2 = chartH - ((v - minFollowers) / range) * (chartH - 20) - 10;
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-primary)" strokeWidth="2" />;
                })}
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                </linearGradient>
                <path d={`M0,${chartH + 10} L${points} L${chartW},${chartH + 10} Z`} fill="url(#areaGrad)" />
              </svg>
              <div className="chart-labels">
                <span>{minFollowers.toLocaleString()}</span>
                <span>{maxFollowers.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="social-posts">
          <div className="posts-header">
            <h3>Recent Posts</h3>
            <div className="post-platform-filters">
              {['all', ...platforms.map((p) => p.id)].map((id) => (
                <button key={id} className={`post-filter-btn ${activePlatform === id ? 'active' : ''}`} onClick={() => setActivePlatform(id)}>
                  {id === 'all' ? 'All' : platformIcons[id]}
                </button>
              ))}
            </div>
          </div>
          <div className="posts-feed">
            {filteredPosts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-platform-tag" style={{ background: platforms.find((p) => p.id === post.platform)?.color }}>
                  {platformIcons[post.platform]} {platforms.find((p) => p.id === post.platform)?.name}
                </div>
                {post.image && (
                  <div className="post-image-wrap">
                    <img src={post.image} alt="" />
                    {post.type === 'carousel' && <span className="post-type-badge">📷 Carousel</span>}
                  </div>
                )}
                <div className="post-content">
                  <p>{post.content}</p>
                  <div className="post-meta">
                    <span className="post-time">{post.time}</span>
                    {post.type === 'poll' && <span className="post-type-badge">📊 Poll</span>}
                  </div>
                  <div className="post-engagement">
                    <span><FiHeart size={14} /> {post.likes.toLocaleString()}</span>
                    <span><FiMessageSquare size={14} /> {post.comments}</span>
                    <span><FiRepeat size={14} /> {post.shares}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaDemo;

