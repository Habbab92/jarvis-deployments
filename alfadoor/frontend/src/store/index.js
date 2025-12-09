import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Alfadoor Product Catalog
const PRODUCT_CATALOG = {
  wpcDoors: {
    name: 'WPC Doors',
    category: 'doors',
    variants: [
      { id: 'wpc-standard', name: 'Standard WPC Door', basePrice: 450, unit: 'piece' },
      { id: 'wpc-premium', name: 'Premium WPC Door', basePrice: 650, unit: 'piece' },
      { id: 'wpc-fire-rated', name: 'Fire Rated WPC Door', basePrice: 850, unit: 'piece' },
    ]
  },
  pvcDoors: {
    name: 'PVC Doors',
    category: 'doors',
    variants: [
      { id: 'pvc-bathroom', name: 'PVC Bathroom Door', basePrice: 280, unit: 'piece' },
      { id: 'pvc-folding', name: 'PVC Folding Door', basePrice: 350, unit: 'piece' },
      { id: 'pvc-sliding', name: 'PVC Sliding Door', basePrice: 420, unit: 'piece' },
    ]
  },
  doorFrames: {
    name: 'Door Frames',
    category: 'frames',
    variants: [
      { id: 'frame-wpc', name: 'WPC Door Frame', basePrice: 120, unit: 'piece' },
      { id: 'frame-pvc', name: 'PVC Door Frame', basePrice: 85, unit: 'piece' },
      { id: 'frame-aluminum', name: 'Aluminum Frame', basePrice: 180, unit: 'piece' },
    ]
  },
  accessories: {
    name: 'Accessories',
    category: 'accessories',
    variants: [
      { id: 'handle-standard', name: 'Standard Handle Set', basePrice: 45, unit: 'set' },
      { id: 'handle-premium', name: 'Premium Handle Set', basePrice: 95, unit: 'set' },
      { id: 'hinges', name: 'Heavy Duty Hinges (pair)', basePrice: 25, unit: 'pair' },
      { id: 'lock-standard', name: 'Standard Lock', basePrice: 55, unit: 'piece' },
      { id: 'lock-smart', name: 'Smart Lock', basePrice: 280, unit: 'piece' },
    ]
  },
  panels: {
    name: 'WPC Panels',
    category: 'panels',
    variants: [
      { id: 'panel-interior', name: 'Interior Wall Panel', basePrice: 35, unit: 'sqm' },
      { id: 'panel-exterior', name: 'Exterior Cladding', basePrice: 55, unit: 'sqm' },
      { id: 'panel-ceiling', name: 'Ceiling Panel', basePrice: 42, unit: 'sqm' },
    ]
  }
};

// Mock Data
const generateMockCustomers = () => [
  { id: 'C001', name: 'Al-Rajhi Construction', type: 'contractor', region: 'Riyadh', totalOrders: 156, totalRevenue: 2450000, lastOrder: '2025-12-01', status: 'active', creditLimit: 500000, outstandingBalance: 125000 },
  { id: 'C002', name: 'Saudi Building Materials Co.', type: 'distributor', region: 'Jeddah', totalOrders: 89, totalRevenue: 1850000, lastOrder: '2025-12-05', status: 'active', creditLimit: 750000, outstandingBalance: 280000 },
  { id: 'C003', name: 'Gulf Interiors LLC', type: 'retailer', region: 'Dammam', totalOrders: 234, totalRevenue: 980000, lastOrder: '2025-12-08', status: 'active', creditLimit: 200000, outstandingBalance: 45000 },
  { id: 'C004', name: 'Modern Homes Development', type: 'contractor', region: 'Riyadh', totalOrders: 67, totalRevenue: 1250000, lastOrder: '2025-11-28', status: 'active', creditLimit: 400000, outstandingBalance: 180000 },
  { id: 'C005', name: 'Eastern Province Builders', type: 'contractor', region: 'Dammam', totalOrders: 45, totalRevenue: 780000, lastOrder: '2025-11-15', status: 'inactive', creditLimit: 300000, outstandingBalance: 0 },
  { id: 'C006', name: 'Riyadh Door Center', type: 'retailer', region: 'Riyadh', totalOrders: 312, totalRevenue: 650000, lastOrder: '2025-12-07', status: 'active', creditLimit: 150000, outstandingBalance: 32000 },
  { id: 'C007', name: 'Medina Construction Group', type: 'contractor', region: 'Medina', totalOrders: 28, totalRevenue: 420000, lastOrder: '2025-10-20', status: 'active', creditLimit: 250000, outstandingBalance: 95000 },
  { id: 'C008', name: 'Jeddah Wholesale Doors', type: 'distributor', region: 'Jeddah', totalOrders: 178, totalRevenue: 2100000, lastOrder: '2025-12-06', status: 'active', creditLimit: 600000, outstandingBalance: 210000 },
];

const generateMockInventory = () => [
  { id: 'INV001', productId: 'wpc-standard', name: 'Standard WPC Door', category: 'doors', inStock: 450, reserved: 85, minStock: 100, maxStock: 600, reorderPoint: 150, unitCost: 320, location: 'Warehouse A' },
  { id: 'INV002', productId: 'wpc-premium', name: 'Premium WPC Door', category: 'doors', inStock: 180, reserved: 45, minStock: 50, maxStock: 300, reorderPoint: 80, unitCost: 480, location: 'Warehouse A' },
  { id: 'INV003', productId: 'wpc-fire-rated', name: 'Fire Rated WPC Door', category: 'doors', inStock: 65, reserved: 20, minStock: 30, maxStock: 150, reorderPoint: 45, unitCost: 620, location: 'Warehouse B' },
  { id: 'INV004', productId: 'pvc-bathroom', name: 'PVC Bathroom Door', category: 'doors', inStock: 320, reserved: 60, minStock: 80, maxStock: 500, reorderPoint: 120, unitCost: 180, location: 'Warehouse A' },
  { id: 'INV005', productId: 'pvc-folding', name: 'PVC Folding Door', category: 'doors', inStock: 95, reserved: 15, minStock: 40, maxStock: 200, reorderPoint: 60, unitCost: 240, location: 'Warehouse B' },
  { id: 'INV006', productId: 'frame-wpc', name: 'WPC Door Frame', category: 'frames', inStock: 520, reserved: 110, minStock: 150, maxStock: 800, reorderPoint: 200, unitCost: 75, location: 'Warehouse A' },
  { id: 'INV007', productId: 'frame-pvc', name: 'PVC Door Frame', category: 'frames', inStock: 380, reserved: 70, minStock: 100, maxStock: 600, reorderPoint: 150, unitCost: 52, location: 'Warehouse A' },
  { id: 'INV008', productId: 'handle-premium', name: 'Premium Handle Set', category: 'accessories', inStock: 245, reserved: 30, minStock: 80, maxStock: 400, reorderPoint: 100, unitCost: 62, location: 'Warehouse C' },
  { id: 'INV009', productId: 'panel-interior', name: 'Interior Wall Panel', category: 'panels', inStock: 1200, reserved: 350, minStock: 500, maxStock: 2000, reorderPoint: 600, unitCost: 22, location: 'Warehouse B' },
  { id: 'INV010', productId: 'panel-exterior', name: 'Exterior Cladding', category: 'panels', inStock: 45, reserved: 20, minStock: 200, maxStock: 1000, reorderPoint: 300, unitCost: 38, location: 'Warehouse B' },
];

const generateMockLeads = () => [
  { id: 'L001', company: 'New Horizons Real Estate', contact: 'Ahmed Al-Faisal', email: 'ahmed@newhorizons.sa', phone: '+966 50 123 4567', source: 'Website', status: 'qualified', value: 350000, probability: 75, nextAction: 'Send proposal', nextActionDate: '2025-12-10', createdAt: '2025-11-15' },
  { id: 'L002', company: 'Makkah Development Corp', contact: 'Khalid Ibrahim', email: 'k.ibrahim@mdc.sa', phone: '+966 55 234 5678', source: 'Referral', status: 'proposal', value: 580000, probability: 60, nextAction: 'Follow up call', nextActionDate: '2025-12-11', createdAt: '2025-11-20' },
  { id: 'L003', company: 'Vision 2030 Contractors', contact: 'Mohammed Al-Rashid', email: 'm.rashid@v2030.sa', phone: '+966 54 345 6789', source: 'Trade Show', status: 'new', value: 125000, probability: 30, nextAction: 'Initial meeting', nextActionDate: '2025-12-12', createdAt: '2025-12-01' },
  { id: 'L004', company: 'Tabuk Construction LLC', contact: 'Faisal Hassan', email: 'faisal@tabukcon.sa', phone: '+966 56 456 7890', source: 'Cold Call', status: 'negotiation', value: 420000, probability: 85, nextAction: 'Contract review', nextActionDate: '2025-12-09', createdAt: '2025-10-28' },
  { id: 'L005', company: 'Al-Khobar Interiors', contact: 'Sara Al-Mutairi', email: 'sara@alkhobar-int.sa', phone: '+966 50 567 8901', source: 'Website', status: 'qualified', value: 95000, probability: 50, nextAction: 'Product demo', nextActionDate: '2025-12-13', createdAt: '2025-12-03' },
  { id: 'L006', company: 'Royal Palace Supplies', contact: 'Omar Bin Saleh', email: 'omar@royalpalace.sa', phone: '+966 55 678 9012', source: 'Referral', status: 'proposal', value: 890000, probability: 70, nextAction: 'Price negotiation', nextActionDate: '2025-12-10', createdAt: '2025-11-10' },
];

const generateMockQuotes = () => [
  { id: 'Q2025-001', customerId: 'C001', customerName: 'Al-Rajhi Construction', items: 12, total: 185000, status: 'accepted', validUntil: '2025-12-15', createdAt: '2025-11-28', margin: 32 },
  { id: 'Q2025-002', customerId: 'C002', customerName: 'Saudi Building Materials Co.', items: 8, total: 92000, status: 'pending', validUntil: '2025-12-20', createdAt: '2025-12-01', margin: 28 },
  { id: 'Q2025-003', customerId: 'C003', customerName: 'Gulf Interiors LLC', items: 25, total: 45000, status: 'pending', validUntil: '2025-12-18', createdAt: '2025-12-05', margin: 35 },
  { id: 'Q2025-004', customerId: 'C006', customerName: 'Riyadh Door Center', items: 45, total: 78000, status: 'accepted', validUntil: '2025-12-12', createdAt: '2025-11-25', margin: 30 },
  { id: 'Q2025-005', customerId: 'C008', customerName: 'Jeddah Wholesale Doors', items: 6, total: 320000, status: 'revision', validUntil: '2025-12-22', createdAt: '2025-12-06', margin: 25 },
];

const generateMockOrders = () => [
  { id: 'ORD-2025-0156', customerId: 'C001', customerName: 'Al-Rajhi Construction', total: 185000, status: 'processing', orderDate: '2025-12-01', deliveryDate: '2025-12-15', items: 12 },
  { id: 'ORD-2025-0155', customerId: 'C006', customerName: 'Riyadh Door Center', total: 78000, status: 'shipped', orderDate: '2025-11-28', deliveryDate: '2025-12-08', items: 45 },
  { id: 'ORD-2025-0154', customerId: 'C002', customerName: 'Saudi Building Materials Co.', total: 245000, status: 'delivered', orderDate: '2025-11-20', deliveryDate: '2025-12-02', items: 18 },
  { id: 'ORD-2025-0153', customerId: 'C008', customerName: 'Jeddah Wholesale Doors', total: 156000, status: 'processing', orderDate: '2025-12-05', deliveryDate: '2025-12-18', items: 22 },
  { id: 'ORD-2025-0152', customerId: 'C003', customerName: 'Gulf Interiors LLC', total: 42000, status: 'delivered', orderDate: '2025-11-15', deliveryDate: '2025-11-28', items: 35 },
];

const useStore = create(
  persist(
    (set, get) => ({
      // UI State
      sidebarOpen: true,
      theme: 'dark',
      notifications: [],

      // Data
      customers: generateMockCustomers(),
      inventory: generateMockInventory(),
      leads: generateMockLeads(),
      quotes: generateMockQuotes(),
      orders: generateMockOrders(),
      productCatalog: PRODUCT_CATALOG,

      // Current quote being edited
      currentQuote: {
        customerId: '',
        customerName: '',
        items: [],
        discount: 0,
        notes: '',
        validDays: 14,
      },

      // Dashboard KPIs
      kpis: {
        monthlyRevenue: 2850000,
        monthlyTarget: 3500000,
        quotesGenerated: 48,
        quotesConverted: 32,
        avgQuoteValue: 125000,
        inventoryValue: 4250000,
        lowStockItems: 2,
        pendingOrders: 8,
        activeLeads: 12,
        leadsThisMonth: 6,
      },

      // Actions
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      setTheme: (theme) => set({ theme }),

      addNotification: (notification) => set((state) => ({
        notifications: [...state.notifications, { id: Date.now(), ...notification }]
      })),

      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),

      // Quote Actions
      setCurrentQuoteCustomer: (customerId, customerName) => set((state) => ({
        currentQuote: { ...state.currentQuote, customerId, customerName }
      })),

      addQuoteItem: (item) => set((state) => ({
        currentQuote: {
          ...state.currentQuote,
          items: [...state.currentQuote.items, { ...item, id: Date.now() }]
        }
      })),

      removeQuoteItem: (itemId) => set((state) => ({
        currentQuote: {
          ...state.currentQuote,
          items: state.currentQuote.items.filter(i => i.id !== itemId)
        }
      })),

      updateQuoteItem: (itemId, updates) => set((state) => ({
        currentQuote: {
          ...state.currentQuote,
          items: state.currentQuote.items.map(i =>
            i.id === itemId ? { ...i, ...updates } : i
          )
        }
      })),

      setQuoteDiscount: (discount) => set((state) => ({
        currentQuote: { ...state.currentQuote, discount }
      })),

      setQuoteNotes: (notes) => set((state) => ({
        currentQuote: { ...state.currentQuote, notes }
      })),

      clearCurrentQuote: () => set({
        currentQuote: {
          customerId: '',
          customerName: '',
          items: [],
          discount: 0,
          notes: '',
          validDays: 14,
        }
      }),

      saveQuote: () => {
        const state = get();
        const quote = state.currentQuote;
        if (!quote.customerId || quote.items.length === 0) return null;

        const subtotal = quote.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discountAmount = subtotal * (quote.discount / 100);
        const total = subtotal - discountAmount;

        const newQuote = {
          id: `Q2025-${String(state.quotes.length + 6).padStart(3, '0')}`,
          customerId: quote.customerId,
          customerName: quote.customerName,
          items: quote.items.length,
          total,
          status: 'pending',
          validUntil: new Date(Date.now() + quote.validDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          createdAt: new Date().toISOString().split('T')[0],
          margin: 28,
          lineItems: quote.items,
          discount: quote.discount,
          notes: quote.notes,
        };

        set((state) => ({
          quotes: [newQuote, ...state.quotes],
          currentQuote: {
            customerId: '',
            customerName: '',
            items: [],
            discount: 0,
            notes: '',
            validDays: 14,
          }
        }));

        return newQuote;
      },

      // Lead Actions
      updateLeadStatus: (leadId, status) => set((state) => ({
        leads: state.leads.map(l => l.id === leadId ? { ...l, status } : l)
      })),

      addLead: (lead) => set((state) => ({
        leads: [{ ...lead, id: `L${String(state.leads.length + 7).padStart(3, '0')}`, createdAt: new Date().toISOString().split('T')[0] }, ...state.leads]
      })),

      // Inventory Actions
      updateInventoryStock: (inventoryId, adjustment) => set((state) => ({
        inventory: state.inventory.map(i =>
          i.id === inventoryId ? { ...i, inStock: Math.max(0, i.inStock + adjustment) } : i
        )
      })),

      // Customer Actions
      addCustomer: (customer) => set((state) => ({
        customers: [{ ...customer, id: `C${String(state.customers.length + 9).padStart(3, '0')}` }, ...state.customers]
      })),

      updateCustomer: (customerId, updates) => set((state) => ({
        customers: state.customers.map(c => c.id === customerId ? { ...c, ...updates } : c)
      })),
    }),
    {
      name: 'alfadoor-ops-storage',
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);

export default useStore;
export { PRODUCT_CATALOG };
