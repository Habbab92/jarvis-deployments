import { useState, useEffect, Component } from 'react';
import useStore from './store';

// Error Boundary Component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
          <div className="bg-slate-800 rounded-lg p-8 max-w-lg text-center border border-red-500/30">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
              <span className="text-red-500 text-2xl">!</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-slate-400 mb-4">An unexpected error occurred.</p>
            <pre className="text-left bg-black/30 rounded p-3 mb-4 text-xs text-red-400 overflow-auto max-h-32">
              {this.state.error?.message || 'Unknown error'}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
            >
              Reload App
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Icons
const Icons = {
  Dashboard: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  Factory: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  Quote: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Inventory: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  Customers: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Leads: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  Menu: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Close: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Bell: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  Plus: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Trash: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Warning: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  TrendUp: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  TrendDown: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
    </svg>
  ),
  Settings: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Refresh: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  Search: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Quality: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

// Navigation items
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Icons.Dashboard },
  { id: 'factory', label: 'Factory Operations', icon: Icons.Factory },
  { id: 'quality', label: 'Quality Control', icon: Icons.Quality },
  { id: 'quotes', label: 'Quote Generator', icon: Icons.Quote },
  { id: 'inventory', label: 'Inventory', icon: Icons.Inventory },
  { id: 'customers', label: 'Customers', icon: Icons.Customers },
  { id: 'leads', label: 'Sales Pipeline', icon: Icons.Leads },
];

// Sidebar Component
function Sidebar({ currentPage, setCurrentPage, isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-slate-800 border-r border-slate-700 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Alfadoor</h1>
              <p className="text-slate-400 text-xs">Operations Platform</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-slate-400 hover:text-white"
          >
            <Icons.Close />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                currentPage === item.id
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <item.icon />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-700/50">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-sm font-medium">AF</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">Admin User</p>
              <p className="text-slate-400 text-xs truncate">Operations Manager</p>
            </div>
          </div>
          <p className="mt-3 text-center text-slate-500 text-xs">
            Powered by Facilis.ai
          </p>
        </div>
      </aside>
    </>
  );
}

// Header Component
function Header({ onMenuClick }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg"
        >
          <Icons.Menu />
        </button>

        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-700 rounded-lg px-3 py-2 w-64">
          <Icons.Search />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-white placeholder-slate-400 text-sm w-full focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg">
          <Icons.Bell />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Settings */}
        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg">
          <Icons.Settings />
        </button>
      </div>
    </header>
  );
}

// KPI Card Component
function KPICard({ title, value, change, changeType, icon: Icon, color }) {
  const colorClasses = {
    emerald: 'from-emerald-500 to-teal-600',
    blue: 'from-blue-500 to-indigo-600',
    purple: 'from-purple-500 to-pink-600',
    orange: 'from-orange-500 to-amber-600',
    red: 'from-red-500 to-rose-600',
  };

  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {change && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${changeType === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
              {changeType === 'up' ? <Icons.TrendUp /> : <Icons.TrendDown />}
              <span>{change}</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center`}>
          {Icon && <Icon />}
        </div>
      </div>
    </div>
  );
}

// Simple Bar Chart Component
function BarChart({ data, title }) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-300">{item.label}</span>
              <span className="text-white font-medium">{item.value.toLocaleString()}</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Dashboard Page
function DashboardPage() {
  const { kpis, customers, orders, leads, inventory } = useStore();

  const revenueByRegion = [
    { label: 'Riyadh', value: 4350000 },
    { label: 'Jeddah', value: 3950000 },
    { label: 'Dammam', value: 1760000 },
    { label: 'Medina', value: 420000 },
  ];

  const productSales = [
    { label: 'WPC Standard Door', value: 2450 },
    { label: 'WPC Premium Door', value: 1280 },
    { label: 'PVC Bathroom Door', value: 1850 },
    { label: 'Interior Panels', value: 3200 },
    { label: 'Door Frames', value: 2100 },
  ];

  const lowStockItems = inventory.filter(i => i.inStock <= i.reorderPoint);
  const pendingOrdersCount = orders.filter(o => o.status === 'processing').length;
  const activeLeadsCount = leads.filter(l => l.status !== 'closed' && l.status !== 'lost').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">Welcome back! Here's your business overview.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span>Last updated: {new Date().toLocaleString()}</span>
          <button className="p-1 hover:text-white">
            <Icons.Refresh />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Monthly Revenue"
          value={`SAR ${(kpis.monthlyRevenue / 1000000).toFixed(2)}M`}
          change="+12.5% vs last month"
          changeType="up"
          color="emerald"
          icon={() => <span className="text-white text-xl">$</span>}
        />
        <KPICard
          title="Quote Conversion"
          value={`${Math.round((kpis.quotesConverted / kpis.quotesGenerated) * 100)}%`}
          change="+5.2% vs last month"
          changeType="up"
          color="blue"
          icon={Icons.Quote}
        />
        <KPICard
          title="Active Leads"
          value={activeLeadsCount}
          change="+3 new this week"
          changeType="up"
          color="purple"
          icon={Icons.Leads}
        />
        <KPICard
          title="Pending Orders"
          value={pendingOrdersCount}
          change="2 ready to ship"
          changeType="up"
          color="orange"
          icon={Icons.Inventory}
        />
      </div>

      {/* Revenue Progress */}
      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Monthly Revenue Target</h3>
          <span className="text-emerald-400 font-medium">
            {Math.round((kpis.monthlyRevenue / kpis.monthlyTarget) * 100)}%
          </span>
        </div>
        <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
            style={{ width: `${(kpis.monthlyRevenue / kpis.monthlyTarget) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-slate-400">Current: SAR {kpis.monthlyRevenue.toLocaleString()}</span>
          <span className="text-slate-400">Target: SAR {kpis.monthlyTarget.toLocaleString()}</span>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart data={revenueByRegion} title="Revenue by Region (SAR)" />
        <BarChart data={productSales} title="Top Products (Units Sold)" />
      </div>

      {/* Alerts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alerts */}
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Icons.Warning />
            Low Stock Alerts
          </h3>
          {lowStockItems.length > 0 ? (
            <div className="space-y-3">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{item.name}</p>
                    <p className="text-slate-400 text-sm">
                      Stock: {item.inStock} | Reorder Point: {item.reorderPoint}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
                    Low Stock
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-center py-4">All inventory levels are healthy</p>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <h3 className="text-white font-semibold mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div>
                  <p className="text-white font-medium">{order.id}</p>
                  <p className="text-slate-400 text-sm">{order.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">SAR {order.total.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                    order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <h3 className="text-white font-semibold mb-4">Top Customers</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-slate-400 text-sm border-b border-slate-700">
                <th className="pb-3 pr-4">Customer</th>
                <th className="pb-3 pr-4">Type</th>
                <th className="pb-3 pr-4">Region</th>
                <th className="pb-3 pr-4">Total Orders</th>
                <th className="pb-3 pr-4">Revenue</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {customers.slice(0, 5).map((customer) => (
                <tr key={customer.id} className="border-b border-slate-700/50">
                  <td className="py-3 pr-4">
                    <p className="text-white font-medium">{customer.name}</p>
                    <p className="text-slate-400 text-xs">{customer.id}</p>
                  </td>
                  <td className="py-3 pr-4 text-slate-300 capitalize">{customer.type}</td>
                  <td className="py-3 pr-4 text-slate-300">{customer.region}</td>
                  <td className="py-3 pr-4 text-slate-300">{customer.totalOrders}</td>
                  <td className="py-3 pr-4 text-white font-medium">SAR {customer.totalRevenue.toLocaleString()}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      customer.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-500/20 text-slate-400'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Factory Operations Page
function FactoryPage() {
  const [selectedLine, setSelectedLine] = useState(null);

  // Synthetic factory data
  const productionLines = [
    {
      id: 'LINE-1',
      name: 'WPC Door Extrusion Line',
      status: 'running',
      efficiency: 87,
      output: 156,
      target: 180,
      temperature: 185,
      targetTemp: 180,
      pressure: 42,
      targetPressure: 45,
      speed: 12.5,
      targetSpeed: 14,
      operator: 'Mohammed Al-Harbi',
      lastMaintenance: '2025-11-28',
      nextMaintenance: '2025-12-28',
      defectRate: 2.3,
      bottleneck: 'Cooling system capacity',
      bottleneckSeverity: 'medium',
    },
    {
      id: 'LINE-2',
      name: 'PVC Door Production Line',
      status: 'running',
      efficiency: 92,
      output: 210,
      target: 220,
      temperature: 165,
      targetTemp: 160,
      pressure: 38,
      targetPressure: 40,
      speed: 15.2,
      targetSpeed: 15,
      operator: 'Ahmed Al-Qahtani',
      lastMaintenance: '2025-12-01',
      nextMaintenance: '2025-12-31',
      defectRate: 1.8,
      bottleneck: null,
      bottleneckSeverity: null,
    },
    {
      id: 'LINE-3',
      name: 'Frame Assembly Line',
      status: 'maintenance',
      efficiency: 0,
      output: 0,
      target: 300,
      temperature: 0,
      targetTemp: 0,
      pressure: 0,
      targetPressure: 0,
      speed: 0,
      targetSpeed: 18,
      operator: 'Khalid Ibrahim',
      lastMaintenance: '2025-12-09',
      nextMaintenance: '2025-01-09',
      defectRate: 0,
      bottleneck: 'Scheduled maintenance',
      bottleneckSeverity: 'info',
    },
    {
      id: 'LINE-4',
      name: 'Panel Lamination Line',
      status: 'running',
      efficiency: 78,
      output: 890,
      target: 1200,
      temperature: 145,
      targetTemp: 150,
      pressure: 55,
      targetPressure: 50,
      speed: 8.5,
      targetSpeed: 11,
      operator: 'Faisal Al-Rashid',
      lastMaintenance: '2025-11-15',
      nextMaintenance: '2025-12-15',
      defectRate: 4.2,
      bottleneck: 'Raw material feeding inconsistency',
      bottleneckSeverity: 'high',
    },
    {
      id: 'LINE-5',
      name: 'Quality Finishing Line',
      status: 'idle',
      efficiency: 0,
      output: 0,
      target: 250,
      temperature: 0,
      targetTemp: 0,
      pressure: 0,
      targetPressure: 0,
      speed: 0,
      targetSpeed: 10,
      operator: 'Omar Al-Zahrani',
      lastMaintenance: '2025-12-05',
      nextMaintenance: '2026-01-05',
      defectRate: 0,
      bottleneck: 'Waiting for upstream production',
      bottleneckSeverity: 'low',
    },
  ];

  const machineAlerts = [
    { id: 1, type: 'critical', machine: 'LINE-4', message: 'High defect rate detected (4.2%)', time: '10 mins ago' },
    { id: 2, type: 'warning', machine: 'LINE-1', message: 'Temperature 5°C above target', time: '25 mins ago' },
    { id: 3, type: 'warning', machine: 'LINE-4', message: 'Pressure exceeds optimal range', time: '45 mins ago' },
    { id: 4, type: 'info', machine: 'LINE-3', message: 'Scheduled maintenance in progress', time: '2 hours ago' },
  ];

  const bottleneckAnalysis = [
    {
      issue: 'Cooling System Capacity (LINE-1)',
      impact: 'Reducing throughput by 15%',
      rootCause: 'Chiller unit undersized for current production volume',
      recommendation: 'Upgrade cooling system or add secondary chiller',
      priority: 'medium',
      estimatedCost: 45000,
      estimatedGain: 85000,
    },
    {
      issue: 'Raw Material Feeding (LINE-4)',
      impact: 'Causing 4.2% defect rate, 25% efficiency loss',
      rootCause: 'Inconsistent granule size from supplier batch #2024-1156',
      recommendation: 'Implement incoming material QC, contact supplier',
      priority: 'high',
      estimatedCost: 5000,
      estimatedGain: 120000,
    },
    {
      issue: 'Production Scheduling Gap',
      impact: 'LINE-5 idle waiting for upstream',
      rootCause: 'Batch timing mismatch between LINE-2 and LINE-5',
      recommendation: 'Implement kanban system, reduce batch sizes',
      priority: 'low',
      estimatedCost: 2000,
      estimatedGain: 35000,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return 'bg-emerald-500';
      case 'maintenance': return 'bg-amber-500';
      case 'idle': return 'bg-slate-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-500/10';
      case 'medium': return 'border-amber-500 bg-amber-500/10';
      case 'low': return 'border-blue-500 bg-blue-500/10';
      default: return 'border-slate-500 bg-slate-500/10';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-amber-500/20 text-amber-400';
      case 'low': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Factory Operations</h1>
          <p className="text-slate-400 mt-1">Real-time production monitoring and bottleneck analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Live Monitoring
          </span>
        </div>
      </div>

      {/* Overall Factory Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Overall Efficiency"
          value="83.5%"
          change="+2.1% vs yesterday"
          changeType="up"
          color="emerald"
        />
        <KPICard
          title="Today's Output"
          value="1,256 units"
          change="-5% vs target"
          changeType="down"
          color="blue"
        />
        <KPICard
          title="Average Defect Rate"
          value="2.1%"
          change="-0.3% vs last week"
          changeType="up"
          color="purple"
        />
        <KPICard
          title="Active Lines"
          value="3/5"
          change="1 in maintenance"
          changeType="up"
          color="orange"
        />
      </div>

      {/* Machine Alerts */}
      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Icons.Warning />
          Machine Alerts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {machineAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-start gap-3 p-3 rounded-lg border ${
                alert.type === 'critical' ? 'border-red-500/30 bg-red-500/10' :
                alert.type === 'warning' ? 'border-amber-500/30 bg-amber-500/10' :
                'border-blue-500/30 bg-blue-500/10'
              }`}
            >
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                alert.type === 'critical' ? 'bg-red-500/30 text-red-400' :
                alert.type === 'warning' ? 'bg-amber-500/30 text-amber-400' :
                'bg-blue-500/30 text-blue-400'
              }`}>
                {alert.type.toUpperCase()}
              </span>
              <div className="flex-1">
                <p className="text-white text-sm">{alert.message}</p>
                <p className="text-slate-400 text-xs mt-1">{alert.machine} · {alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Production Lines */}
      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <h3 className="text-white font-semibold mb-4">Production Lines</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {productionLines.map((line) => (
            <div
              key={line.id}
              onClick={() => setSelectedLine(selectedLine === line.id ? null : line.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedLine === line.id
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${getStatusColor(line.status)}`} />
                  <span className="text-white font-medium">{line.id}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-xs ${
                  line.status === 'running' ? 'bg-emerald-500/20 text-emerald-400' :
                  line.status === 'maintenance' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-slate-500/20 text-slate-400'
                }`}>
                  {line.status}
                </span>
              </div>

              <p className="text-slate-300 text-sm mb-3">{line.name}</p>

              {line.status === 'running' && (
                <>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Efficiency</span>
                      <span className={line.efficiency >= 90 ? 'text-emerald-400' : line.efficiency >= 80 ? 'text-amber-400' : 'text-red-400'}>
                        {line.efficiency}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          line.efficiency >= 90 ? 'bg-emerald-500' : line.efficiency >= 80 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${line.efficiency}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-600/50 rounded p-2">
                      <p className="text-slate-400">Output</p>
                      <p className="text-white font-medium">{line.output}/{line.target}</p>
                    </div>
                    <div className="bg-slate-600/50 rounded p-2">
                      <p className="text-slate-400">Defect Rate</p>
                      <p className={`font-medium ${line.defectRate > 3 ? 'text-red-400' : 'text-emerald-400'}`}>
                        {line.defectRate}%
                      </p>
                    </div>
                  </div>

                  {line.bottleneck && (
                    <div className={`mt-3 p-2 rounded border ${getSeverityColor(line.bottleneckSeverity)}`}>
                      <p className="text-xs text-slate-300">
                        <span className="font-medium">Bottleneck:</span> {line.bottleneck}
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Expanded Details */}
              {selectedLine === line.id && line.status === 'running' && (
                <div className="mt-4 pt-4 border-t border-slate-600 space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-slate-400">Temp</p>
                      <p className={`font-medium ${Math.abs(line.temperature - line.targetTemp) > 5 ? 'text-amber-400' : 'text-white'}`}>
                        {line.temperature}°C
                      </p>
                      <p className="text-slate-500">Target: {line.targetTemp}°C</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Pressure</p>
                      <p className={`font-medium ${Math.abs(line.pressure - line.targetPressure) > 5 ? 'text-amber-400' : 'text-white'}`}>
                        {line.pressure} bar
                      </p>
                      <p className="text-slate-500">Target: {line.targetPressure} bar</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Speed</p>
                      <p className={`font-medium ${line.speed < line.targetSpeed * 0.9 ? 'text-amber-400' : 'text-white'}`}>
                        {line.speed} m/min
                      </p>
                      <p className="text-slate-500">Target: {line.targetSpeed} m/min</p>
                    </div>
                  </div>
                  <div className="text-xs">
                    <p className="text-slate-400">Operator: <span className="text-white">{line.operator}</span></p>
                    <p className="text-slate-400">Next Maintenance: <span className="text-white">{line.nextMaintenance}</span></p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottleneck Analysis - AI Insights */}
      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm">
              AI
            </span>
            Bottleneck Analysis & Recommendations
          </h3>
          <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded">Powered by Facilis.ai</span>
        </div>

        <div className="space-y-4">
          {bottleneckAnalysis.map((item, index) => (
            <div key={index} className={`p-4 rounded-lg border ${getSeverityColor(item.priority)}`}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getPriorityBadge(item.priority)}`}>
                      {item.priority.toUpperCase()} PRIORITY
                    </span>
                  </div>
                  <h4 className="text-white font-medium">{item.issue}</h4>
                </div>
                <div className="text-right text-xs">
                  <p className="text-slate-400">Est. ROI</p>
                  <p className="text-emerald-400 font-medium">
                    +SAR {(item.estimatedGain - item.estimatedCost).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-slate-400 text-xs mb-1">Impact</p>
                  <p className="text-red-400">{item.impact}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-1">Root Cause</p>
                  <p className="text-slate-300">{item.rootCause}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-1">Recommendation</p>
                  <p className="text-emerald-400">{item.recommendation}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-600/50 text-xs">
                <span className="text-slate-400">
                  Implementation Cost: <span className="text-white">SAR {item.estimatedCost.toLocaleString()}</span>
                </span>
                <span className="text-slate-400">
                  Expected Gain: <span className="text-emerald-400">SAR {item.estimatedGain.toLocaleString()}/month</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Quality Control Page
function QualityPage() {
  const qualityMetrics = {
    overallPassRate: 97.8,
    inspectedToday: 1256,
    defectsFound: 28,
    defectRate: 2.2,
    topDefects: [
      { type: 'Surface scratches', count: 12, percentage: 42.9 },
      { type: 'Dimensional variance', count: 8, percentage: 28.6 },
      { type: 'Color inconsistency', count: 5, percentage: 17.9 },
      { type: 'Edge defects', count: 3, percentage: 10.7 },
    ],
  };

  const qualityBatches = [
    { id: 'BATCH-2025-1208-A', product: 'WPC Standard Door', quantity: 150, passed: 147, failed: 3, status: 'approved', time: '08:30' },
    { id: 'BATCH-2025-1208-B', product: 'PVC Bathroom Door', quantity: 200, passed: 196, failed: 4, status: 'approved', time: '10:15' },
    { id: 'BATCH-2025-1208-C', product: 'Interior Wall Panel', quantity: 500, passed: 488, failed: 12, status: 'review', time: '12:00' },
    { id: 'BATCH-2025-1208-D', product: 'WPC Premium Door', quantity: 80, passed: 79, failed: 1, status: 'approved', time: '14:30' },
    { id: 'BATCH-2025-1208-E', product: 'Door Frames', quantity: 250, passed: 242, failed: 8, status: 'review', time: '16:00' },
  ];

  const qualityTrend = [
    { day: 'Mon', rate: 98.2 },
    { day: 'Tue', rate: 97.5 },
    { day: 'Wed', rate: 98.1 },
    { day: 'Thu', rate: 97.8 },
    { day: 'Fri', rate: 96.9 },
    { day: 'Sat', rate: 97.8 },
    { day: 'Today', rate: 97.8 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Quality Control</h1>
        <p className="text-slate-400 mt-1">Monitor product quality and defect analysis</p>
      </div>

      {/* Quality KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Pass Rate"
          value={`${qualityMetrics.overallPassRate}%`}
          change="+0.3% vs yesterday"
          changeType="up"
          color="emerald"
        />
        <KPICard
          title="Inspected Today"
          value={qualityMetrics.inspectedToday.toLocaleString()}
          change="On track"
          changeType="up"
          color="blue"
        />
        <KPICard
          title="Defects Found"
          value={qualityMetrics.defectsFound}
          change="-5 vs yesterday"
          changeType="up"
          color="red"
        />
        <KPICard
          title="Defect Rate"
          value={`${qualityMetrics.defectRate}%`}
          change="-0.2% vs last week"
          changeType="up"
          color="purple"
        />
      </div>

      {/* Quality Trend */}
      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <h3 className="text-white font-semibold mb-4">Weekly Quality Trend</h3>
        <div className="flex items-end gap-4 h-40">
          {qualityTrend.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-slate-700 rounded-t relative" style={{ height: '120px' }}>
                <div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t transition-all duration-500"
                  style={{ height: `${(day.rate - 95) * 20}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-2">{day.day}</p>
              <p className="text-xs text-white font-medium">{day.rate}%</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Defects */}
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <h3 className="text-white font-semibold mb-4">Top Defect Types</h3>
          <div className="space-y-3">
            {qualityMetrics.topDefects.map((defect, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">{defect.type}</span>
                  <span className="text-white font-medium">{defect.count} ({defect.percentage}%)</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full"
                    style={{ width: `${defect.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inspections */}
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <h3 className="text-white font-semibold mb-4">Today's Batch Inspections</h3>
          <div className="space-y-3">
            {qualityBatches.map((batch) => (
              <div key={batch.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div>
                  <p className="text-white font-medium text-sm">{batch.id}</p>
                  <p className="text-slate-400 text-xs">{batch.product}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">
                    <span className="text-emerald-400">{batch.passed}</span>
                    <span className="text-slate-400">/</span>
                    <span className="text-red-400">{batch.failed}</span>
                    <span className="text-slate-400 text-xs ml-1">of {batch.quantity}</span>
                  </p>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    batch.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {batch.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Quote Generator Page
function QuotesPage() {
  const {
    productCatalog,
    customers,
    quotes,
    currentQuote,
    setCurrentQuoteCustomer,
    addQuoteItem,
    removeQuoteItem,
    updateQuoteItem,
    setQuoteDiscount,
    setQuoteNotes,
    saveQuote,
    clearCurrentQuote,
    addNotification,
  } = useStore();

  const [selectedCategory, setSelectedCategory] = useState('wpcDoors');
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);

  const handleAddItem = (product) => {
    addQuoteItem({
      productId: product.id,
      name: product.name,
      price: product.basePrice,
      quantity: 1,
      unit: product.unit,
    });
  };

  const handleSaveQuote = () => {
    const saved = saveQuote();
    if (saved) {
      addNotification({
        type: 'success',
        message: `Quote ${saved.id} created successfully`,
      });
      setShowQuoteBuilder(false);
    }
  };

  const subtotal = currentQuote.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = subtotal * (currentQuote.discount / 100);
  const total = subtotal - discountAmount;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Quote Generator</h1>
          <p className="text-slate-400 mt-1">Create and manage customer quotations</p>
        </div>
        <button
          onClick={() => {
            clearCurrentQuote();
            setShowQuoteBuilder(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
        >
          <Icons.Plus />
          <span>New Quote</span>
        </button>
      </div>

      {/* Quote Builder Modal */}
      {showQuoteBuilder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h2 className="text-lg font-semibold text-white">Create New Quote</h2>
              <button
                onClick={() => setShowQuoteBuilder(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <Icons.Close />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {/* Customer Selection */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">Select Customer</label>
                <select
                  value={currentQuote.customerId}
                  onChange={(e) => {
                    const customer = customers.find(c => c.id === e.target.value);
                    setCurrentQuoteCustomer(e.target.value, customer?.name || '');
                  }}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                >
                  <option value="">Select a customer...</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name} ({customer.region})
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Selection */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">Add Products</label>
                <div className="flex gap-2 mb-3 flex-wrap">
                  {Object.keys(productCatalog).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                        selectedCategory === key
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {productCatalog[key].name}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {productCatalog[selectedCategory]?.variants.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleAddItem(product)}
                      className="flex items-center justify-between p-3 bg-slate-700/50 border border-slate-600 rounded-lg hover:border-emerald-500 transition-colors text-left"
                    >
                      <div>
                        <p className="text-white text-sm font-medium">{product.name}</p>
                        <p className="text-slate-400 text-xs">SAR {product.basePrice}/{product.unit}</p>
                      </div>
                      <Icons.Plus />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quote Items */}
              {currentQuote.items.length > 0 && (
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Quote Items</label>
                  <div className="space-y-2">
                    {currentQuote.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">{item.name}</p>
                          <p className="text-slate-400 text-xs">SAR {item.price}/{item.unit}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuoteItem(item.id, { quantity: parseInt(e.target.value) || 1 })}
                            className="w-20 bg-slate-600 border border-slate-500 rounded px-2 py-1 text-white text-sm text-center"
                          />
                          <span className="text-white font-medium w-24 text-right">
                            SAR {(item.price * item.quantity).toLocaleString()}
                          </span>
                          <button
                            onClick={() => removeQuoteItem(item.id)}
                            className="p-1 text-red-400 hover:text-red-300"
                          >
                            <Icons.Trash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Discount and Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Discount (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={currentQuote.discount}
                    onChange={(e) => setQuoteDiscount(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Notes</label>
                  <input
                    type="text"
                    value={currentQuote.notes}
                    onChange={(e) => setQuoteNotes(e.target.value)}
                    placeholder="Optional notes..."
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-700 bg-slate-800/80">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-slate-400 text-sm">
                    Subtotal: <span className="text-white">SAR {subtotal.toLocaleString()}</span>
                  </p>
                  {currentQuote.discount > 0 && (
                    <p className="text-slate-400 text-sm">
                      Discount ({currentQuote.discount}%): <span className="text-red-400">-SAR {discountAmount.toLocaleString()}</span>
                    </p>
                  )}
                  <p className="text-white font-semibold text-lg">
                    Total: SAR {total.toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowQuoteBuilder(false)}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveQuote}
                    disabled={!currentQuote.customerId || currentQuote.items.length === 0}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                  >
                    Save Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Existing Quotes */}
      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <h3 className="text-white font-semibold mb-4">Recent Quotes</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-slate-400 text-sm border-b border-slate-700">
                <th className="pb-3 pr-4">Quote ID</th>
                <th className="pb-3 pr-4">Customer</th>
                <th className="pb-3 pr-4">Items</th>
                <th className="pb-3 pr-4">Total</th>
                <th className="pb-3 pr-4">Margin</th>
                <th className="pb-3 pr-4">Valid Until</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {quotes.map((quote) => (
                <tr key={quote.id} className="border-b border-slate-700/50">
                  <td className="py-3 pr-4 text-white font-medium">{quote.id}</td>
                  <td className="py-3 pr-4 text-slate-300">{quote.customerName}</td>
                  <td className="py-3 pr-4 text-slate-300">{quote.items}</td>
                  <td className="py-3 pr-4 text-white font-medium">SAR {quote.total.toLocaleString()}</td>
                  <td className="py-3 pr-4 text-emerald-400">{quote.margin}%</td>
                  <td className="py-3 pr-4 text-slate-300">{quote.validUntil}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      quote.status === 'accepted' ? 'bg-emerald-500/20 text-emerald-400' :
                      quote.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                      quote.status === 'revision' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {quote.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Inventory Page
function InventoryPage() {
  const { inventory, updateInventoryStock } = useStore();
  const [filter, setFilter] = useState('all');

  const filteredInventory = inventory.filter((item) => {
    if (filter === 'low') return item.inStock <= item.reorderPoint;
    if (filter === 'healthy') return item.inStock > item.reorderPoint;
    return true;
  });

  const totalValue = inventory.reduce((sum, item) => sum + (item.inStock * item.unitCost), 0);
  const lowStockCount = inventory.filter(i => i.inStock <= i.reorderPoint).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Inventory Management</h1>
          <p className="text-slate-400 mt-1">Track stock levels and manage reorders</p>
        </div>
      </div>

      {/* Inventory KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Inventory Value"
          value={`SAR ${(totalValue / 1000000).toFixed(2)}M`}
          color="emerald"
        />
        <KPICard
          title="Total SKUs"
          value={inventory.length}
          color="blue"
        />
        <KPICard
          title="Low Stock Items"
          value={lowStockCount}
          color="red"
        />
        <KPICard
          title="Reserved Stock"
          value={inventory.reduce((sum, i) => sum + i.reserved, 0).toLocaleString()}
          color="purple"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {['all', 'low', 'healthy'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {f === 'all' ? 'All Items' : f === 'low' ? 'Low Stock' : 'Healthy Stock'}
          </button>
        ))}
      </div>

      {/* Inventory Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr className="text-left text-slate-400 text-sm">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">In Stock</th>
                <th className="px-4 py-3">Reserved</th>
                <th className="px-4 py-3">Available</th>
                <th className="px-4 py-3">Reorder Point</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredInventory.map((item) => {
                const available = item.inStock - item.reserved;
                const isLow = item.inStock <= item.reorderPoint;

                return (
                  <tr key={item.id} className="border-t border-slate-700/50">
                    <td className="px-4 py-3">
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-slate-400 text-xs">{item.id}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-300 capitalize">{item.category}</td>
                    <td className="px-4 py-3 text-white font-medium">{item.inStock}</td>
                    <td className="px-4 py-3 text-amber-400">{item.reserved}</td>
                    <td className="px-4 py-3 text-emerald-400">{available}</td>
                    <td className="px-4 py-3 text-slate-300">{item.reorderPoint}</td>
                    <td className="px-4 py-3 text-slate-300">{item.location}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        isLow ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {isLow ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Customers Page
function CustomersPage() {
  const { customers } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Customers</h1>
          <p className="text-slate-400 mt-1">Manage your customer relationships</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
          <Icons.Plus />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-slate-700 rounded-lg px-3 py-2 w-full max-w-md">
        <Icons.Search />
        <input
          type="text"
          placeholder="Search customers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent text-white placeholder-slate-400 text-sm w-full focus:outline-none"
        />
      </div>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-slate-600 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold">{customer.name}</h3>
                <p className="text-slate-400 text-sm">{customer.id}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                customer.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-500/20 text-slate-400'
              }`}>
                {customer.status}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Type:</span>
                <span className="text-white capitalize">{customer.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Region:</span>
                <span className="text-white">{customer.region}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Orders:</span>
                <span className="text-white">{customer.totalOrders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Revenue:</span>
                <span className="text-emerald-400 font-medium">SAR {customer.totalRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Outstanding:</span>
                <span className={customer.outstandingBalance > 0 ? 'text-amber-400' : 'text-slate-300'}>
                  SAR {customer.outstandingBalance.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-700">
              <p className="text-xs text-slate-400">
                Last Order: {customer.lastOrder}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Leads Pipeline Page
function LeadsPage() {
  const { leads, updateLeadStatus } = useStore();

  const stages = [
    { id: 'new', label: 'New', color: 'bg-slate-500' },
    { id: 'qualified', label: 'Qualified', color: 'bg-blue-500' },
    { id: 'proposal', label: 'Proposal', color: 'bg-purple-500' },
    { id: 'negotiation', label: 'Negotiation', color: 'bg-amber-500' },
    { id: 'won', label: 'Won', color: 'bg-emerald-500' },
  ];

  const getLeadsByStage = (stageId) => leads.filter(l => l.status === stageId);

  const totalPipelineValue = leads.reduce((sum, l) => {
    if (l.status !== 'won' && l.status !== 'lost') {
      return sum + (l.value * (l.probability / 100));
    }
    return sum;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Sales Pipeline</h1>
          <p className="text-slate-400 mt-1">Track and manage your sales opportunities</p>
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-sm">Weighted Pipeline Value</p>
          <p className="text-2xl font-bold text-emerald-400">SAR {totalPipelineValue.toLocaleString()}</p>
        </div>
      </div>

      {/* Pipeline Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stages.map((stage) => {
          const stageLeads = getLeadsByStage(stage.id);
          const stageValue = stageLeads.reduce((sum, l) => sum + l.value, 0);

          return (
            <div key={stage.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${stage.color}`} />
                  <span className="text-white font-medium">{stage.label}</span>
                </div>
                <span className="text-slate-400 text-sm">{stageLeads.length}</span>
              </div>

              <p className="text-slate-400 text-xs mb-4">
                Total: SAR {stageValue.toLocaleString()}
              </p>

              <div className="space-y-3">
                {stageLeads.map((lead) => (
                  <div key={lead.id} className="bg-slate-700/50 rounded-lg p-3 border border-slate-600 hover:border-slate-500 transition-colors cursor-pointer">
                    <p className="text-white font-medium text-sm">{lead.company}</p>
                    <p className="text-slate-400 text-xs">{lead.contact}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-emerald-400 text-sm font-medium">
                        SAR {(lead.value / 1000).toFixed(0)}K
                      </span>
                      <span className="text-slate-400 text-xs">{lead.probability}%</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">{lead.nextAction}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Main App Content
function AppContent() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <DashboardPage />;
      case 'factory': return <FactoryPage />;
      case 'quality': return <QualityPage />;
      case 'quotes': return <QuotesPage />;
      case 'inventory': return <InventoryPage />;
      case 'customers': return <CustomersPage />;
      case 'leads': return <LeadsPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 lg:p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

// Root App Component with Error Boundary
function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;
