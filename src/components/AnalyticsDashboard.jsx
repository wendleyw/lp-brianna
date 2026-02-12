import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Globe,
  LayoutDashboard,
  Monitor,
  MousePointerClick,
  Receipt,
  Search,
  Smartphone,
  Users,
} from 'lucide-react'
import './AnalyticsDashboard.css'

const metrics = [
  { label: 'Total Visitors', value: '71,088', delta: '+14.2%', trend: 'up', icon: Users },
  { label: 'Active Users', value: '8,114', delta: '+5.3%', trend: 'up', icon: Activity },
  { label: 'Sessions', value: '9,600', delta: '+7.8%', trend: 'up', icon: BarChart3 },
  { label: 'Bounce Rate', value: '38.3%', delta: '-2.4%', trend: 'down', icon: MousePointerClick },
  { label: 'Avg Session', value: '3m 05s', delta: '+0.8%', trend: 'up', icon: Monitor },
  { label: 'Conversion', value: '2.28%', delta: '+0.6%', trend: 'up', icon: Receipt },
  { label: 'Revenue', value: '$39,805', delta: '+12.1%', trend: 'up', icon: Globe },
]

const trafficSeries = [48, 50, 54, 67, 73, 65, 46, 40, 38, 37, 44, 70]
const benchmarkSeries = [44, 42, 39, 34, 31, 29, 34, 42, 46, 48, 51, 55]

const liveVisitors = [
  { visitor: 'Anonymous', location: 'Berlin, DE', device: 'Chrome / Tablet', page: '/pricing', source: 'linkedin / paid', time: '1m 25s' },
  { visitor: 'Anonymous', location: 'Tokyo, JP', device: 'Safari / Mobile', page: '/dashboard', source: 'newsletter', time: '3m 13s' },
  { visitor: 'Anonymous', location: 'London, UK', device: 'Chrome / Mobile', page: '/features', source: 'google / cpc', time: '55s' },
  { visitor: 'Anonymous', location: 'Austin, US', device: 'Chrome / Desktop', page: '/integrations', source: 'direct', time: '2m 58s' },
  { visitor: 'Anonymous', location: 'New York, US', device: 'Firefox / Desktop', page: '/signup', source: 'linkedin / paid', time: '1m 49s' },
  { visitor: 'Anonymous', location: 'Berlin, DE', device: 'Safari / Desktop', page: '/dashboard', source: 'google / cpc', time: '4m 10s' },
]

const topPages = [
  { label: '/features', value: 990 },
  { label: '/pricing', value: 613 },
  { label: '/blog/ai-attribution', value: 632 },
  { label: '/signup', value: 132 },
]

const topReferrers = [
  { label: 'google', value: 2_829 },
  { label: 'linkedin', value: 891 },
  { label: 'newsletter', value: 711 },
  { label: 'direct', value: 190 },
]

const topCampaigns = [
  { label: 'launch_rt_2026', value: 182 },
  { label: 'retarget_google_adv', value: 63 },
  { label: 'summer_airdrop_wave', value: 16 },
]

const devices = [
  { label: 'Desktop', value: 66, icon: Monitor },
  { label: 'Mobile', value: 24, icon: Smartphone },
  { label: 'Tablet', value: 10, icon: LayoutDashboard },
]

const chartHeight = 180
const chartWidth = 860
const maxValue = Math.max(...trafficSeries, ...benchmarkSeries)
const minValue = Math.min(...trafficSeries, ...benchmarkSeries)
const range = maxValue - minValue

const toPoints = (series) =>
  series
    .map((value, index) => {
      const x = (index / (series.length - 1)) * chartWidth
      const y = chartHeight - ((value - minValue) / range) * chartHeight
      return `${x},${y}`
    })
    .join(' ')

const trafficPoints = toPoints(trafficSeries)
const benchmarkPoints = toPoints(benchmarkSeries)

function AnalyticsDashboard() {
  return (
    <div className="dashboard2026">
      <div className="dashboard2026__glow dashboard2026__glow--top" />
      <div className="dashboard2026__glow dashboard2026__glow--bottom" />

      <div className="dashboard2026__shell container">
        <aside className="dashboard2026__sidebar">
          <div className="dashboard2026__brand">
            <span className="dashboard2026__brand-title">Analytics</span>
            <span className="dashboard2026__brand-subtitle">Control Center</span>
          </div>

          <nav className="dashboard2026__nav">
            <a className="dashboard2026__nav-item dashboard2026__nav-item--active" href="#overview">
              <LayoutDashboard size={16} />
              Overview
            </a>
            <a className="dashboard2026__nav-item" href="#live-visitors">
              <Users size={16} />
              Live Visitors
            </a>
            <a className="dashboard2026__nav-item" href="#traffic">
              <BarChart3 size={16} />
              Traffic
            </a>
            <a className="dashboard2026__nav-item" href="#acquisition">
              <Search size={16} />
              Acquisition
            </a>
          </nav>

          <a className="dashboard2026__back-link" href="/">
            Back to Site
          </a>
        </aside>

        <main className="dashboard2026__main">
          <header className="dashboard2026__header" id="overview">
            <div>
              <p className="dashboard2026__eyebrow">Performance Overview</p>
              <h1 className="dashboard2026__title">Growth Dashboard</h1>
            </div>
            <div className="dashboard2026__header-meta">
              <span className="dashboard2026__status-dot" />
              Last update: 6:26 PM
            </div>
          </header>

          <section className="dashboard2026__metrics">
            {metrics.map(({ label, value, delta, trend, icon: Icon }) => (
              <article className="dashboard2026__metric-card card" key={label}>
                <div className="dashboard2026__metric-icon">
                  <Icon size={16} />
                </div>
                <p className="dashboard2026__metric-label">{label}</p>
                <p className="dashboard2026__metric-value">{value}</p>
                <p className={`dashboard2026__metric-delta dashboard2026__metric-delta--${trend}`}>
                  {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {delta} vs previous period
                </p>
              </article>
            ))}
          </section>

          <section className="dashboard2026__surface" id="traffic">
            <div className="dashboard2026__surface-header">
              <div>
                <p className="dashboard2026__surface-label">Traffic Overview</p>
                <h2 className="dashboard2026__surface-title">Visitors vs Benchmark</h2>
              </div>
              <div className="dashboard2026__chart-legend">
                <span>
                  <i className="dashboard2026__legend dashboard2026__legend--accent" />
                  Visitors
                </span>
                <span>
                  <i className="dashboard2026__legend dashboard2026__legend--muted" />
                  Benchmark
                </span>
              </div>
            </div>

            <div className="dashboard2026__chart-wrap">
              <svg className="dashboard2026__chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="trafficFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(249, 69, 45, 0.38)" />
                    <stop offset="100%" stopColor="rgba(249, 69, 45, 0)" />
                  </linearGradient>
                </defs>
                <polyline className="dashboard2026__chart-line dashboard2026__chart-line--muted" points={benchmarkPoints} />
                <polygon
                  className="dashboard2026__chart-area"
                  points={`0,${chartHeight} ${trafficPoints} ${chartWidth},${chartHeight}`}
                />
                <polyline className="dashboard2026__chart-line dashboard2026__chart-line--accent" points={trafficPoints} />
              </svg>
            </div>
          </section>

          <section className="dashboard2026__content-grid">
            <article className="dashboard2026__surface" id="live-visitors">
              <div className="dashboard2026__surface-header">
                <div>
                  <p className="dashboard2026__surface-label">Recent Activity</p>
                  <h2 className="dashboard2026__surface-title">Live Visitors</h2>
                </div>
              </div>

              <div className="dashboard2026__table-wrap">
                <table className="dashboard2026__table">
                  <thead>
                    <tr>
                      <th>Visitor</th>
                      <th>Location</th>
                      <th>Device</th>
                      <th>Current Page</th>
                      <th>Source</th>
                      <th>Time on Page</th>
                    </tr>
                  </thead>
                  <tbody>
                    {liveVisitors.map((item) => (
                      <tr key={`${item.location}-${item.page}-${item.time}`}>
                        <td>{item.visitor}</td>
                        <td>{item.location}</td>
                        <td>{item.device}</td>
                        <td>{item.page}</td>
                        <td>{item.source}</td>
                        <td>{item.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <div className="dashboard2026__stack" id="acquisition">
              <article className="dashboard2026__surface">
                <div className="dashboard2026__surface-header">
                  <h3 className="dashboard2026__surface-title dashboard2026__surface-title--small">Top Pages</h3>
                </div>
                <ul className="dashboard2026__rank-list">
                  {topPages.map((item) => (
                    <li key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="dashboard2026__surface">
                <div className="dashboard2026__surface-header">
                  <h3 className="dashboard2026__surface-title dashboard2026__surface-title--small">Top Referrers</h3>
                </div>
                <ul className="dashboard2026__rank-list">
                  {topReferrers.map((item) => (
                    <li key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="dashboard2026__surface">
                <div className="dashboard2026__surface-header">
                  <h3 className="dashboard2026__surface-title dashboard2026__surface-title--small">Top Campaigns</h3>
                </div>
                <ul className="dashboard2026__rank-list">
                  {topCampaigns.map((item) => (
                    <li key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="dashboard2026__surface">
                <div className="dashboard2026__surface-header">
                  <h3 className="dashboard2026__surface-title dashboard2026__surface-title--small">Device Distribution</h3>
                </div>
                <ul className="dashboard2026__device-list">
                  {devices.map(({ label, value, icon: Icon }) => (
                    <li key={label}>
                      <div>
                        <Icon size={14} />
                        <span>{label}</span>
                      </div>
                      <strong>{value}%</strong>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default AnalyticsDashboard
