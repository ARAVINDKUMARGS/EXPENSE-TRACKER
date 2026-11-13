/**
 * ==============================================================================
 * TrackFlow - Modern Expense Tracker & Financial Dashboard
 * Pure Vanilla JavaScript (ES6+) - Fully Modular, Zero Framework Dependencies
 * ==============================================================================
 */

'use strict';

// ------------------------------------------------------------------------------
// CONSTANTS & CONFIGURATION
// ------------------------------------------------------------------------------

const STORAGE_KEY = 'trackflow_expenses_v1';

// Category Definitions with theme colors and SVG/icon representations
const CATEGORIES = {
  'Food & Dining': {
    color: '#f97316',
    bgColor: '#fff7ed',
    badgeClass: 'badge-cat-food',
    icon: '🍔'
  },
  'Transportation': {
    color: '#0284c7',
    bgColor: '#f0f9ff',
    badgeClass: 'badge-cat-transport',
    icon: '🚗'
  },
  'Housing & Rent': {
    color: '#6366f1',
    bgColor: '#eef2ff',
    badgeClass: 'badge-cat-housing',
    icon: '🏠'
  },
  'Utilities & Bills': {
    color: '#0891b2',
    bgColor: '#ecfeff',
    badgeClass: 'badge-cat-utilities',
    icon: '⚡'
  },
  'Entertainment': {
    color: '#9333ea',
    bgColor: '#faf5ff',
    badgeClass: 'badge-cat-entertainment',
    icon: '🎬'
  },
  'Health & Medical': {
    color: '#e11d48',
    bgColor: '#fff1f2',
    badgeClass: 'badge-cat-health',
    icon: '🩺'
  },
  'Shopping': {
    color: '#ec4899',
    bgColor: '#fdf2f8',
    badgeClass: 'badge-cat-shopping',
    icon: '🛍️'
  },
  'Travel': {
    color: '#0d9488',
    bgColor: '#f0fdfa',
    badgeClass: 'badge-cat-travel',
    icon: '✈️'
  },
  'Education': {
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
    badgeClass: 'badge-cat-education',
    icon: '📚'
  },
  'Personal & Other': {
    color: '#64748b',
    bgColor: '#f8fafc',
    badgeClass: 'badge-cat-other',
    icon: '💼'
  }
};

// Initial Realistic Sample Data (for demonstration)
const SAMPLE_EXPENSES = [
  {
    id: 'exp_17101',
    title: 'Whole Foods Market',
    amount: 142.80,
    category: 'Food & Dining',
    date: '2026-11-12',
    description: 'Weekly organic groceries, produce, and almond milk',
    createdAt: '2026-11-12T10:15:00.000Z'
  },
  {
    id: 'exp_17102',
    title: 'Metro Monthly Transit Pass',
    amount: 95.00,
    category: 'Transportation',
    date: '2026-11-11',
    description: 'Subway & regional bus unlimited monthly pass',
    createdAt: '2026-11-11T09:00:00.000Z'
  },
  {
    id: 'exp_17103',
    title: 'High-speed Fiber Internet',
    amount: 69.99,
    category: 'Utilities & Bills',
    date: '2026-11-09',
    description: 'Monthly 1Gbps symmetrical internet service',
    createdAt: '2026-11-09T14:30:00.000Z'
  },
  {
    id: 'exp_17104',
    title: 'Downtown Apartment Rent',
    amount: 1450.00,
    category: 'Housing & Rent',
    date: '2026-11-01',
    description: 'Monthly residential lease payment for 1BR loft',
    createdAt: '2026-11-01T08:00:00.000Z'
  },
  {
    id: 'exp_17105',
    title: 'Nordstrom Autumn Jacket',
    amount: 189.50,
    category: 'Shopping',
    date: '2026-11-05',
    description: 'Water-resistant windbreaker and accessories',
    createdAt: '2026-11-05T16:45:00.000Z'
  },
  {
    id: 'exp_17106',
    title: 'Cinema & Dinner Date',
    amount: 78.40,
    category: 'Entertainment',
    date: '2026-11-07',
    description: 'IMAX movie tickets and artisanal ramen dinner',
    createdAt: '2026-11-07T21:10:00.000Z'
  },
  {
    id: 'exp_17107',
    title: 'Dental Checkup & Cleaning',
    amount: 120.00,
    category: 'Health & Medical',
    date: '2026-10-28',
    description: 'Biannual preventive dental exam and fluoride treatment',
    createdAt: '2026-10-28T11:00:00.000Z'
  },
  {
    id: 'exp_17108',
    title: 'Weekend Mountain Getaway AirBnB',
    amount: 320.00,
    category: 'Travel',
    date: '2026-10-20',
    description: 'Two nights cabin rental in Blue Ridge',
    createdAt: '2026-10-20T13:20:00.000Z'
  },
  {
    id: 'exp_17109',
    title: 'Online Cloud Architecture Course',
    amount: 89.00,
    category: 'Education',
    date: '2026-10-15',
    description: 'Advanced Cloud Certification masterclass lifetime access',
    createdAt: '2026-10-15T18:00:00.000Z'
  },
  {
    id: 'exp_17110',
    title: 'Electric & Heating Utility',
    amount: 114.30,
    category: 'Utilities & Bills',
    date: '2026-10-08',
    description: 'October municipal power and heating bill',
    createdAt: '2026-10-08T15:00:00.000Z'
  },
  {
    id: 'exp_17111',
    title: 'Blue Bottle Coffee & Pastry',
    amount: 14.75,
    category: 'Food & Dining',
    date: '2026-11-13',
    description: 'Cold brew and almond croissant with team',
    createdAt: '2026-11-13T08:30:00.000Z'
  },
  {
    id: 'exp_17112',
    title: 'Gym Membership & Recovery Pass',
    amount: 65.00,
    category: 'Health & Medical',
    date: '2026-10-02',
    description: 'Monthly fitness center and sauna access',
    createdAt: '2026-10-02T09:15:00.000Z'
  }
];

// ------------------------------------------------------------------------------
// APPLICATION STATE
// ------------------------------------------------------------------------------

const state = {
  expenses: [],
  currentView: 'dashboard',
  filters: {
    search: '',
    category: 'all',
    datePreset: 'all',
    startDate: '',
    endDate: '',
    sortBy: 'date-desc'
  },
  activeModalExpenseId: null,
  deleteTargetExpenseId: null
};

// ------------------------------------------------------------------------------
// DOM ELEMENT REFERENCES
// ------------------------------------------------------------------------------

const dom = {
  // Navigation & Views
  sidebar: document.getElementById('app-sidebar'),
  sidebarBackdrop: document.getElementById('sidebar-backdrop'),
  mobileMenuBtn: document.getElementById('mobile-menu-btn'),
  sidebarCloseBtn: document.getElementById('sidebar-close-btn'),
  navLinks: document.querySelectorAll('.nav-link[data-view]'),
  contentViews: document.querySelectorAll('.content-view'),
  pageTitle: document.getElementById('page-title'),
  pageSubtitle: document.getElementById('page-subtitle'),
  currentDateDisplay: document.getElementById('current-date-display'),
  navTxBadge: document.getElementById('nav-tx-badge'),

  // Quick Action Buttons
  sidebarAddBtn: document.getElementById('sidebar-add-btn'),
  topbarAddBtn: document.getElementById('topbar-add-btn'),
  tableAddBtn: document.getElementById('table-add-btn'),
  emptyStateAddBtn: document.getElementById('empty-state-add-btn'),
  sidebarExportBtn: document.getElementById('sidebar-export-btn'),
  tableExportCsvBtn: document.getElementById('table-export-csv-btn'),
  sidebarSampleDataBtn: document.getElementById('sidebar-sample-data-btn'),

  // Dashboard Metrics
  metricTotalAmount: document.getElementById('metric-total-amount'),
  metricTotalSub: document.getElementById('metric-total-sub'),
  metricTxCount: document.getElementById('metric-tx-count'),
  metricCountSub: document.getElementById('metric-count-sub'),
  metricHighestAmount: document.getElementById('metric-highest-amount'),
  metricHighestTitle: document.getElementById('metric-highest-title'),
  metricAverageAmount: document.getElementById('metric-average-amount'),
  metricAvgSub: document.getElementById('metric-avg-sub'),

  // Dashboard Charts & Lists
  categoryDonutCanvas: document.getElementById('categoryDonutCanvas'),
  donutCenterAmount: document.getElementById('donut-center-amount'),
  categoryDonutLegend: document.getElementById('category-donut-legend'),
  monthlyBarCanvas: document.getElementById('monthlyBarCanvas'),
  recentTransactionsList: document.getElementById('recent-transactions-list'),
  categoryProgressList: document.getElementById('category-progress-list'),

  // Transactions View Controls
  filterSearch: document.getElementById('filter-search'),
  searchClearBtn: document.getElementById('search-clear-btn'),
  filterCategory: document.getElementById('filter-category'),
  filterDatePreset: document.getElementById('filter-date-preset'),
  filterSortBy: document.getElementById('filter-sort-by'),
  customDateRow: document.getElementById('custom-date-row'),
  filterStartDate: document.getElementById('filter-start-date'),
  filterEndDate: document.getElementById('filter-end-date'),
  applyCustomDatesBtn: document.getElementById('apply-custom-dates-btn'),
  resetFiltersBtn: document.getElementById('reset-filters-btn'),
  filteredStatsPill: document.getElementById('filtered-stats-pill'),
  filteredSumPill: document.getElementById('filtered-sum-pill'),
  emptyStateResetBtn: document.getElementById('empty-state-reset-btn'),

  // Transactions Table
  transactionsTable: document.getElementById('transactions-table'),
  transactionsTableBody: document.getElementById('transactions-table-body'),
  tableEmptyState: document.getElementById('table-empty-state'),
  tableRecordsSummary: document.getElementById('table-records-summary'),

  // Analytics View
  analyticsCategoryTbody: document.getElementById('analytics-category-tbody'),
  analyticsMonthlyTbody: document.getElementById('analytics-monthly-tbody'),
  analyticsInsightsContainer: document.getElementById('analytics-insights-container'),
  backupExportCsvBtn: document.getElementById('backup-export-csv-btn'),
  backupLoadSamplesBtn: document.getElementById('backup-load-samples-btn'),
  backupClearDataBtn: document.getElementById('backup-clear-data-btn'),

  // Modal: Add / Edit Expense
  expenseModal: document.getElementById('expense-modal'),
  expenseForm: document.getElementById('expense-form'),
  modalFormTitle: document.getElementById('modal-form-title'),
  modalFormSubtitle: document.getElementById('modal-form-subtitle'),
  modalCloseBtn: document.getElementById('modal-close-btn'),
  modalCancelBtn: document.getElementById('modal-cancel-btn'),
  submitBtnText: document.getElementById('submit-btn-text'),
  formExpenseId: document.getElementById('form-expense-id'),
  formTitle: document.getElementById('form-title'),
  formAmount: document.getElementById('form-amount'),
  formCategory: document.getElementById('form-category'),
  formDate: document.getElementById('form-date'),
  formDescription: document.getElementById('form-description'),
  charCounter: document.getElementById('char-counter'),
  titleError: document.getElementById('title-error'),
  amountError: document.getElementById('amount-error'),
  categoryError: document.getElementById('category-error'),
  dateError: document.getElementById('date-error'),

  // Modal: View Details Receipt
  viewDetailsModal: document.getElementById('view-details-modal'),
  viewDetailsCloseBtn: document.getElementById('view-details-close-btn'),
  receiptAmount: document.getElementById('receipt-amount'),
  receiptTitle: document.getElementById('receipt-title'),
  receiptCategoryBadgeWrap: document.getElementById('receipt-category-badge-wrap'),
  receiptDate: document.getElementById('receipt-date'),
  receiptCategory: document.getElementById('receipt-category'),
  receiptId: document.getElementById('receipt-id'),
  receiptNotes: document.getElementById('receipt-notes'),
  receiptDeleteBtn: document.getElementById('receipt-delete-btn'),
  receiptEditBtn: document.getElementById('receipt-edit-btn'),
  receiptDoneBtn: document.getElementById('receipt-done-btn'),

  // Modal: Delete Confirmation
  deleteModal: document.getElementById('delete-modal'),
  deleteTargetTitle: document.getElementById('delete-target-title'),
  deleteCancelBtn: document.getElementById('delete-cancel-btn'),
  deleteConfirmBtn: document.getElementById('delete-confirm-btn'),

  // Toast Container
  toastContainer: document.getElementById('toast-container')
};

// ------------------------------------------------------------------------------
// UTILITY HELPERS
// ------------------------------------------------------------------------------

/**
 * Format numeric value to standard currency string ($X,XXX.XX)
 */
function formatCurrency(amount) {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
}

/**
 * Format ISO date string (YYYY-MM-DD) to friendly human readable date
 */
function formatDate(dateStr, formatStyle = 'medium') {
  if (!dateStr) return 'N/A';
  // Parse date components safely to prevent timezone shift
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const d = new Date(year, month, day);

  if (isNaN(d.getTime())) return dateStr;

  if (formatStyle === 'short') {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  if (formatStyle === 'monthYear') {
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/**
 * Generate a unique transaction ID
 */
function generateId() {
  return 'exp_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7);
}

/**
 * Get category configuration object safely
 */
function getCategoryMeta(categoryName) {
  return CATEGORIES[categoryName] || {
    color: '#64748b',
    bgColor: '#f8fafc',
    badgeClass: 'badge-cat-other',
    icon: '🏷️'
  };
}

/**
 * Get HTML string for Category Badge
 */
function renderCategoryBadge(categoryName) {
  const meta = getCategoryMeta(categoryName);
  return `
    <span class="badge ${meta.badgeClass}">
      <span>${meta.icon}</span>
      <span>${escapeHTML(categoryName)}</span>
    </span>
  `;
}

/**
 * Escape HTML to prevent XSS injection
 */
function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Get Today's date formatted as YYYY-MM-DD for date inputs
 */
function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// ------------------------------------------------------------------------------
// PERSISTENCE (LOCAL STORAGE)
// ------------------------------------------------------------------------------

/**
 * Save current state expenses to browser LocalStorage
 */
function saveToLocalStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.expenses));
  } catch (error) {
    console.error('Failed to save expenses to LocalStorage:', error);
    showToast('Failed to save data to local storage. Storage might be full.', 'danger');
  }
}

/**
 * Load expenses from LocalStorage, or initialize with Sample Data
 */
function loadFromLocalStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        state.expenses = parsed;
        return;
      }
    }
    // Seed initial sample data if storage is empty
    state.expenses = [...SAMPLE_EXPENSES];
    saveToLocalStorage();
  } catch (error) {
    console.warn('LocalStorage read error, initializing with sample data:', error);
    state.expenses = [...SAMPLE_EXPENSES];
  }
}

// ------------------------------------------------------------------------------
// CORE CALCULATIONS & AGGREGATIONS
// ------------------------------------------------------------------------------

/**
 * Calculate primary summary metrics (Total, Count, Highest, Average)
 */
function calculateMetrics(list = state.expenses) {
  const count = list.length;
  if (count === 0) {
    return {
      total: 0,
      count: 0,
      highest: 0,
      highestItem: null,
      average: 0
    };
  }

  let total = 0;
  let highest = -Infinity;
  let highestItem = null;

  for (const item of list) {
    const amt = Number(item.amount) || 0;
    total += amt;
    if (amt > highest) {
      highest = amt;
      highestItem = item;
    }
  }

  const average = total / count;

  return {
    total,
    count,
    highest: highest > -Infinity ? highest : 0,
    highestItem,
    average
  };
}

/**
 * Calculate totals grouped by Category
 */
function calculateCategoryBreakdown(list = state.expenses) {
  const totalSpend = list.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const breakdown = {};

  // Initialize breakdown for known categories
  for (const cat of Object.keys(CATEGORIES)) {
    breakdown[cat] = {
      name: cat,
      total: 0,
      count: 0,
      percentage: 0
    };
  }

  for (const item of list) {
    const cat = item.category || 'Personal & Other';
    if (!breakdown[cat]) {
      breakdown[cat] = { name: cat, total: 0, count: 0, percentage: 0 };
    }
    const amt = Number(item.amount) || 0;
    breakdown[cat].total += amt;
    breakdown[cat].count += 1;
  }

  // Calculate percentages and sort descending by total spend
  const result = Object.values(breakdown)
    .filter(cat => cat.count > 0)
    .map(cat => {
      cat.percentage = totalSpend > 0 ? (cat.total / totalSpend) * 100 : 0;
      return cat;
    })
    .sort((a, b) => b.total - a.total);

  return {
    categories: result,
    overallTotal: totalSpend
  };
}

/**
 * Calculate monthly expenditure summaries (grouped by YYYY-MM)
 */
function calculateMonthlyBreakdown(list = state.expenses) {
  const monthsMap = {};

  for (const item of list) {
    if (!item.date) continue;
    const key = item.date.substring(0, 7); // 'YYYY-MM'
    if (!monthsMap[key]) {
      monthsMap[key] = {
        key,
        total: 0,
        count: 0,
        highestItem: null,
        highestAmt: 0,
        expenses: []
      };
    }
    const amt = Number(item.amount) || 0;
    monthsMap[key].total += amt;
    monthsMap[key].count += 1;
    monthsMap[key].expenses.push(item);
    if (amt > monthsMap[key].highestAmt) {
      monthsMap[key].highestAmt = amt;
      monthsMap[key].highestItem = item;
    }
  }

  // Sort months chronologically
  const sortedKeys = Object.keys(monthsMap).sort();
  return sortedKeys.map(key => {
    const m = monthsMap[key];
    const [yearStr, monthStr] = key.split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    const daysInMonth = new Date(year, month, 0).getDate();
    return {
      key,
      label: formatDate(`${key}-01`, 'monthYear'),
      total: m.total,
      count: m.count,
      dailyAverage: daysInMonth > 0 ? m.total / daysInMonth : 0,
      highestItem: m.highestItem
    };
  });
}

// ------------------------------------------------------------------------------
// FILTERING & SORTING ENGINE
// ------------------------------------------------------------------------------

/**
 * Evaluates whether an expense falls within the specified date preset
 */
function isDateInPreset(dateStr, preset, customStart, customEnd) {
  if (preset === 'all') return true;
  if (!dateStr) return false;

  const [year, month, day] = dateStr.split('-').map(num => parseInt(num, 10));
  const expDate = new Date(year, month - 1, day);
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  if (preset === 'today') {
    return (
      expDate.getFullYear() === currentYear &&
      expDate.getMonth() === currentMonth &&
      expDate.getDate() === now.getDate()
    );
  }

  if (preset === 'this-week') {
    // Within the last 7 calendar days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);
    return expDate >= sevenDaysAgo && expDate <= now;
  }

  if (preset === 'this-month') {
    return expDate.getFullYear() === currentYear && expDate.getMonth() === currentMonth;
  }

  if (preset === 'last-month') {
    const lastMonthDate = new Date(currentYear, currentMonth - 1, 1);
    const lastMonthYear = lastMonthDate.getFullYear();
    const lastMonthNum = lastMonthDate.getMonth();
    return expDate.getFullYear() === lastMonthYear && expDate.getMonth() === lastMonthNum;
  }

  if (preset === 'this-year') {
    return expDate.getFullYear() === currentYear;
  }

  if (preset === 'custom') {
    if (customStart && dateStr < customStart) return false;
    if (customEnd && dateStr > customEnd) return false;
    return true;
  }

  return true;
}

/**
 * Filter and sort expenses according to active filter criteria
 */
function getFilteredAndSortedExpenses() {
  const { search, category, datePreset, startDate, endDate, sortBy } = state.filters;
  const searchLower = (search || '').trim().toLowerCase();

  // 1. Filter
  let filtered = state.expenses.filter(item => {
    // Search keyword query
    if (searchLower) {
      const matchTitle = (item.title || '').toLowerCase().includes(searchLower);
      const matchCategory = (item.category || '').toLowerCase().includes(searchLower);
      const matchDesc = (item.description || '').toLowerCase().includes(searchLower);
      const matchAmount = String(item.amount || '').includes(searchLower);
      if (!matchTitle && !matchCategory && !matchDesc && !matchAmount) {
        return false;
      }
    }

    // Category filter
    if (category !== 'all' && item.category !== category) {
      return false;
    }

    // Date preset / range filter
    if (!isDateInPreset(item.date, datePreset, startDate, endDate)) {
      return false;
    }

    return true;
  });

  // 2. Sort
  filtered.sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return (b.date || '').localeCompare(a.date || '') || (b.id || '').localeCompare(a.id || '');
      case 'date-asc':
        return (a.date || '').localeCompare(b.date || '') || (a.id || '').localeCompare(b.id || '');
      case 'amount-desc':
        return (Number(b.amount) || 0) - (Number(a.amount) || 0);
      case 'amount-asc':
        return (Number(a.amount) || 0) - (Number(b.amount) || 0);
      case 'title-asc':
        return (a.title || '').localeCompare(b.title || '', undefined, { sensitivity: 'base' });
      case 'title-desc':
        return (b.title || '').localeCompare(a.title || '', undefined, { sensitivity: 'base' });
      default:
        return 0;
    }
  });

  return filtered;
}

// ------------------------------------------------------------------------------
// CANVAS CHARTS (VANILLA JAVASCRIPT RENDERING)
// ------------------------------------------------------------------------------

/**
 * Helper to prepare High-DPI canvas context for razor-sharp rendering on Retina screens
 */
function setupHiDPICanvas(canvas, cssWidth, cssHeight) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = cssWidth * dpr;
  canvas.height = cssHeight * dpr;
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return { ctx, width: cssWidth, height: cssHeight };
}

/**
 * Render Category Donut Chart on HTML5 Canvas
 */
function renderCategoryDonutChart() {
  const canvas = dom.categoryDonutCanvas;
  if (!canvas) return;

  const { ctx, width, height } = setupHiDPICanvas(canvas, 200, 200);
  ctx.clearRect(0, 0, width, height);

  const { categories, overallTotal } = calculateCategoryBreakdown();

  // Update center total
  dom.donutCenterAmount.textContent = formatCurrency(overallTotal);

  const centerX = width / 2;
  const centerY = height / 2;
  const outerRadius = 86;
  const innerRadius = 58;

  // Empty state if no data
  if (categories.length === 0 || overallTotal === 0) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
    ctx.arc(centerX, centerY, innerRadius, 2 * Math.PI, 0, true);
    ctx.fillStyle = '#e2e8f0';
    ctx.fill();

    dom.categoryDonutLegend.innerHTML = `
      <div class="text-center text-muted text-sm py-4">No expense data to chart</div>
    `;
    return;
  }

  // Draw Donut Slices
  let startAngle = -Math.PI / 2; // Start from 12 o'clock

  categories.forEach(cat => {
    const sliceAngle = (cat.total / overallTotal) * (2 * Math.PI);
    const endAngle = startAngle + sliceAngle;
    const meta = getCategoryMeta(cat.name);

    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
    ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = meta.color;
    ctx.fill();

    // Subtle slice border
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    startAngle = endAngle;
  });

  // Render Interactive / Informative Legend
  dom.categoryDonutLegend.innerHTML = categories.map(cat => {
    const meta = getCategoryMeta(cat.name);
    return `
      <div class="legend-item" title="${escapeHTML(cat.name)}: ${formatCurrency(cat.total)}">
        <div class="legend-left truncate">
          <span class="legend-dot" style="background-color: ${meta.color}"></span>
          <span class="legend-name truncate">${escapeHTML(cat.name)}</span>
        </div>
        <div class="legend-right">
          <span class="legend-percent">${cat.percentage.toFixed(1)}%</span>
          <span class="legend-amount">${formatCurrency(cat.total)}</span>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Render Monthly Spending Bar Chart on HTML5 Canvas
 */
function renderMonthlyBarChart() {
  const canvas = dom.monthlyBarCanvas;
  if (!canvas) return;

  const rect = canvas.parentElement.getBoundingClientRect();
  const chartWidth = Math.max(260, rect.width > 0 ? Math.floor(rect.width) : 560);
  const chartHeight = 240;

  const { ctx, width, height } = setupHiDPICanvas(canvas, chartWidth, chartHeight);
  ctx.clearRect(0, 0, width, height);

  const monthlyData = calculateMonthlyBreakdown();

  if (monthlyData.length === 0) {
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px Plus Jakarta Sans, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('No historical monthly records available', width / 2, height / 2);
    return;
  }

  // Use the last 6 months for clear visualization
  const displayMonths = monthlyData.slice(-6);
  const maxTotal = Math.max(...displayMonths.map(m => m.total), 100);

  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 40;
  const usableWidth = width - paddingLeft - paddingRight;
  const usableHeight = height - paddingTop - paddingBottom;

  // Draw Horizontal Gridlines & Y-Axis Scale
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#f1f5f9';
  ctx.fillStyle = '#94a3b8';
  ctx.font = '11px JetBrains Mono, monospace';
  ctx.textAlign = 'right';

  const gridSteps = 4;
  for (let i = 0; i <= gridSteps; i++) {
    const yVal = (maxTotal / gridSteps) * i;
    const yPos = height - paddingBottom - (yVal / maxTotal) * usableHeight;

    ctx.beginPath();
    ctx.moveTo(paddingLeft, yPos);
    ctx.lineTo(width - paddingRight, yPos);
    ctx.stroke();

    ctx.fillText(yVal >= 1000 ? `$${(yVal / 1000).toFixed(1)}k` : `$${Math.round(yVal)}`, paddingLeft - 8, yPos + 4);
  }

  // Draw Bars
  const barCount = displayMonths.length;
  const slotWidth = usableWidth / barCount;
  const barWidth = Math.min(48, Math.max(22, slotWidth * 0.55));

  displayMonths.forEach((item, index) => {
    const barHeight = (item.total / maxTotal) * usableHeight;
    const xCenter = paddingLeft + slotWidth * index + slotWidth / 2;
    const xPos = xCenter - barWidth / 2;
    const yPos = height - paddingBottom - barHeight;

    // Gradient fill for bars
    const gradient = ctx.createLinearGradient(0, yPos, 0, height - paddingBottom);
    gradient.addColorStop(0, '#4f46e5');
    gradient.addColorStop(1, '#818cf8');

    // Rounded rectangle path on top
    const radius = 6;
    ctx.beginPath();
    ctx.moveTo(xPos, height - paddingBottom);
    ctx.lineTo(xPos, yPos + radius);
    ctx.quadraticCurveTo(xPos, yPos, xPos + radius, yPos);
    ctx.lineTo(xPos + barWidth - radius, yPos);
    ctx.quadraticCurveTo(xPos + barWidth, yPos, xPos + barWidth, yPos + radius);
    ctx.lineTo(xPos + barWidth, height - paddingBottom);
    ctx.closePath();

    ctx.fillStyle = gradient;
    ctx.fill();

    // Value label above bar
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 11px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(
      item.total >= 1000 ? `$${(item.total / 1000).toFixed(1)}k` : `$${Math.round(item.total)}`,
      xCenter,
      Math.max(16, yPos - 6)
    );

    // Month label on X-axis
    ctx.fillStyle = '#64748b';
    ctx.font = '600 12px Plus Jakarta Sans, sans-serif';
    ctx.fillText(item.label, xCenter, height - paddingBottom + 20);
  });
}

// ------------------------------------------------------------------------------
// UI RENDERING CONTROLLERS
// ------------------------------------------------------------------------------

/**
 * Render all components on the Dashboard View
 */
function renderDashboardView() {
  const metrics = calculateMetrics();

  // 1. Metric Cards
  dom.metricTotalAmount.textContent = formatCurrency(metrics.total);
  dom.metricTxCount.textContent = metrics.count.toLocaleString();
  dom.metricHighestAmount.textContent = formatCurrency(metrics.highest);
  dom.metricHighestTitle.textContent = metrics.highestItem ? metrics.highestItem.title : 'None recorded';
  dom.metricAverageAmount.textContent = formatCurrency(metrics.average);

  // Subtitle updates
  dom.metricTotalSub.textContent = `${metrics.count} total items`;
  dom.metricCountSub.textContent = metrics.count === 1 ? '1 record saved' : `${metrics.count} records saved`;
  dom.metricAvgSub.textContent = metrics.count > 0 ? 'Per transaction avg' : 'No entries yet';

  // 2. Charts
  renderCategoryDonutChart();
  renderMonthlyBarChart();

  // 3. Recent Transactions (Top 5 most recent)
  const recentSorted = [...state.expenses].sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 5);

  if (recentSorted.length === 0) {
    dom.recentTransactionsList.innerHTML = `
      <div class="empty-state-container p-4">
        <p class="text-muted text-sm">No recent transactions recorded yet.</p>
      </div>
    `;
  } else {
    dom.recentTransactionsList.innerHTML = recentSorted.map(item => {
      const meta = getCategoryMeta(item.category);
      return `
        <div class="recent-item">
          <div class="recent-item-left">
            <div class="recent-cat-icon" style="background-color: ${meta.bgColor}; color: ${meta.color};">
              ${meta.icon}
            </div>
            <div class="recent-details">
              <span class="recent-title truncate" title="${escapeHTML(item.title)}">${escapeHTML(item.title)}</span>
              <span class="recent-meta">
                <span>${formatDate(item.date)}</span>
                <span>•</span>
                <span>${escapeHTML(item.category)}</span>
              </span>
            </div>
          </div>
          <div class="recent-item-right">
            <span class="recent-amount">${formatCurrency(item.amount)}</span>
            <div class="action-btn-group">
              <button class="table-action-btn view-btn" data-action="view" data-id="${item.id}" title="View Receipt">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
              <button class="table-action-btn edit-btn" data-action="edit" data-id="${item.id}" title="Edit Expense">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
              <button class="table-action-btn delete-btn" data-action="delete" data-id="${item.id}" title="Delete Expense">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // 4. Top Category Progress Breakdown
  const { categories } = calculateCategoryBreakdown();
  if (categories.length === 0) {
    dom.categoryProgressList.innerHTML = `
      <p class="text-muted text-sm text-center py-4">No categories recorded yet.</p>
    `;
  } else {
    dom.categoryProgressList.innerHTML = categories.slice(0, 5).map(cat => {
      const meta = getCategoryMeta(cat.name);
      return `
        <div class="progress-item">
          <div class="progress-header">
            <div class="progress-title-wrap">
              <span class="progress-dot" style="background-color: ${meta.color}"></span>
              <span class="progress-name">${escapeHTML(cat.name)}</span>
            </div>
            <div class="progress-stats">
              <span class="progress-amt">${formatCurrency(cat.total)}</span>
              <span class="progress-pct">(${cat.percentage.toFixed(1)}%)</span>
            </div>
          </div>
          <div class="progress-track">
            <div class="progress-bar-fill" style="width: ${cat.percentage.toFixed(1)}%; background-color: ${meta.color};"></div>
          </div>
        </div>
      `;
    }).join('');
  }
}

/**
 * Render all components on the Transactions Table View
 */
function renderTransactionsView() {
  const filtered = getFilteredAndSortedExpenses();
  const totalInState = state.expenses.length;
  const filteredCount = filtered.length;
  const filteredSum = filtered.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  // Status Pills
  dom.filteredStatsPill.textContent = `Showing ${filteredCount} of ${totalInState} transactions`;
  dom.filteredSumPill.textContent = `Total: ${formatCurrency(filteredSum)}`;
  dom.tableRecordsSummary.textContent = `${filteredCount} transactions displayed`;

  // Empty State vs Table Body
  if (filteredCount === 0) {
    dom.transactionsTable.classList.add('hidden');
    dom.tableEmptyState.classList.remove('hidden');
  } else {
    dom.transactionsTable.classList.remove('hidden');
    dom.tableEmptyState.classList.add('hidden');

    dom.transactionsTableBody.innerHTML = filtered.map(item => {
      return `
        <tr data-id="${item.id}">
          <td class="td-title">
            <div class="table-row-title">
              <span class="title-main">${escapeHTML(item.title)}</span>
              ${item.description ? `<span class="title-desc truncate" title="${escapeHTML(item.description)}">${escapeHTML(item.description)}</span>` : ''}
            </div>
          </td>
          <td class="td-category">
            ${renderCategoryBadge(item.category)}
          </td>
          <td class="td-date font-mono text-sm">
            ${formatDate(item.date)}
          </td>
          <td class="td-amount text-right">
            <span class="table-amount">${formatCurrency(item.amount)}</span>
          </td>
          <td class="td-actions text-center">
            <div class="action-btn-group">
              <button class="table-action-btn" data-action="view" data-id="${item.id}" title="View Receipt">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
              <button class="table-action-btn" data-action="edit" data-id="${item.id}" title="Edit Expense">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
              <button class="table-action-btn delete-btn" data-action="delete" data-id="${item.id}" title="Delete Expense">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }
}

/**
 * Render all tables and metrics on the Analytics View
 */
function renderAnalyticsView() {
  const { categories, overallTotal } = calculateCategoryBreakdown();
  const monthlyData = calculateMonthlyBreakdown();
  const metrics = calculateMetrics();

  // 1. Detailed Category Table
  if (categories.length === 0) {
    dom.analyticsCategoryTbody.innerHTML = `
      <tr><td colspan="5" class="text-center text-muted py-4">No categories recorded</td></tr>
    `;
  } else {
    dom.analyticsCategoryTbody.innerHTML = categories.map(cat => {
      const avg = cat.count > 0 ? cat.total / cat.count : 0;
      return `
        <tr>
          <td>
            <div class="flex items-center gap-2">
              ${renderCategoryBadge(cat.name)}
            </div>
          </td>
          <td class="text-center font-mono">${cat.count}</td>
          <td class="text-right font-mono font-bold">${formatCurrency(cat.total)}</td>
          <td class="text-right font-mono text-muted">${cat.percentage.toFixed(1)}%</td>
          <td class="text-right font-mono">${formatCurrency(avg)}</td>
        </tr>
      `;
    }).join('');
  }

  // 2. Historical Monthly Table
  if (monthlyData.length === 0) {
    dom.analyticsMonthlyTbody.innerHTML = `
      <tr><td colspan="5" class="text-center text-muted py-4">No monthly records available</td></tr>
    `;
  } else {
    dom.analyticsMonthlyTbody.innerHTML = [...monthlyData].reverse().map(m => {
      return `
        <tr>
          <td class="font-bold">${m.label}</td>
          <td class="text-center font-mono">${m.count}</td>
          <td class="text-right font-mono font-bold">${formatCurrency(m.total)}</td>
          <td class="text-right font-mono">${formatCurrency(m.dailyAverage)} / day</td>
          <td class="text-right">
            ${m.highestItem ? `<span class="truncate" title="${escapeHTML(m.highestItem.title)}: ${formatCurrency(m.highestItem.amount)}">${escapeHTML(m.highestItem.title)} (${formatCurrency(m.highestItem.amount)})</span>` : '--'}
          </td>
        </tr>
      `;
    }).join('');
  }

  // 3. Automated Financial Health Insights
  const topCategory = categories[0];
  const insights = [];

  if (metrics.count > 0) {
    if (topCategory) {
      insights.push({
        title: 'Primary Spending Category',
        text: `Your largest expenditure is in <strong>${escapeHTML(topCategory.name)}</strong>, accounting for <strong>${topCategory.percentage.toFixed(1)}%</strong> (${formatCurrency(topCategory.total)}) of your overall budget.`,
        iconBg: '#eff6ff',
        iconColor: '#3b82f6',
        iconSvg: '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>'
      });
    }

    if (metrics.highestItem) {
      insights.push({
        title: 'Peak Expense Recorded',
        text: `The single largest outflow is <strong>"${escapeHTML(metrics.highestItem.title)}"</strong> at <strong>${formatCurrency(metrics.highestItem.amount)}</strong> on ${formatDate(metrics.highestItem.date)}.`,
        iconBg: '#fff1f2',
        iconColor: '#e11d48',
        iconSvg: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>'
      });
    }

    insights.push({
      title: 'Average Ticket Size',
      text: `Across all ${metrics.count} tracked transactions, you spend an average of <strong>${formatCurrency(metrics.average)}</strong> per purchase.`,
      iconBg: '#ecfdf5',
      iconColor: '#10b981',
      iconSvg: '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline>'
    });
  } else {
    insights.push({
      title: 'No Data Yet',
      text: 'Add your first transaction or reload sample data to generate automated spending insights.',
      iconBg: '#f1f5f9',
      iconColor: '#64748b',
      iconSvg: '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'
    });
  }

  dom.analyticsInsightsContainer.innerHTML = insights.map(item => `
    <div class="insight-card">
      <div class="insight-icon" style="background-color: ${item.iconBg}; color: ${item.iconColor};">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          ${item.iconSvg}
        </svg>
      </div>
      <div class="insight-content">
        <span class="insight-title">${item.title}</span>
        <span class="insight-text">${item.text}</span>
      </div>
    </div>
  `).join('');
}

/**
 * Universal refresh for whatever view is active
 */
function refreshUI() {
  // Update sidebar counter pill
  if (dom.navTxBadge) {
    dom.navTxBadge.textContent = state.expenses.length;
  }

  switch (state.currentView) {
    case 'dashboard':
      renderDashboardView();
      break;
    case 'transactions':
      renderTransactionsView();
      break;
    case 'analytics':
      renderAnalyticsView();
      break;
    default:
      renderDashboardView();
  }
}

// ------------------------------------------------------------------------------
// NAVIGATION & VIEW SWITCHING
// ------------------------------------------------------------------------------

function switchView(viewName) {
  state.currentView = viewName;

  // Update navigation items active state
  dom.navLinks.forEach(link => {
    if (link.dataset.view === viewName) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Switch view containers
  dom.contentViews.forEach(view => {
    if (view.id === `view-${viewName}`) {
      view.classList.add('active');
    } else {
      view.classList.remove('active');
    }
  });

  // Update Topbar Titles
  const titles = {
    dashboard: { title: 'Dashboard Overview', subtitle: 'Track, analyze, and optimize your personal spending' },
    transactions: { title: 'Transactions Ledger', subtitle: 'Search, filter, edit and manage recorded expenses' },
    analytics: { title: 'Analytics & Financial Reports', subtitle: 'Examine categories, trends, and automated financial insights' }
  };

  const meta = titles[viewName] || titles.dashboard;
  dom.pageTitle.textContent = meta.title;
  dom.pageSubtitle.textContent = meta.subtitle;

  // Close mobile sidebar if open
  closeMobileSidebar();

  // Render fresh state
  refreshUI();
}

function openMobileSidebar() {
  dom.sidebar.classList.add('sidebar-open');
  dom.sidebarBackdrop.classList.add('active');
}

function closeMobileSidebar() {
  dom.sidebar.classList.remove('sidebar-open');
  dom.sidebarBackdrop.classList.remove('active');
}

// ------------------------------------------------------------------------------
// TOAST NOTIFICATIONS
// ------------------------------------------------------------------------------

/**
 * Displays modern non-blocking toast notifications
 */
function showToast(message, type = 'success', duration = 3500) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icons = {
    success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    danger: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
    warning: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
    info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
  };

  toast.innerHTML = `
    <div class="toast-content">
      <div class="toast-icon">${icons[type] || icons.info}</div>
      <span class="toast-msg">${escapeHTML(message)}</span>
    </div>
    <button class="toast-close" aria-label="Dismiss">&times;</button>
  `;

  dom.toastContainer.appendChild(toast);

  const dismissToast = () => {
    toast.classList.add('toast-hide');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 200);
  };

  toast.querySelector('.toast-close').addEventListener('click', dismissToast);

  setTimeout(dismissToast, duration);
}

// ------------------------------------------------------------------------------
// MODAL CONTROLLERS & FORM VALIDATION
// ------------------------------------------------------------------------------

/**
 * Clear form errors
 */
function clearFormErrors() {
  dom.titleError.textContent = '';
  dom.amountError.textContent = '';
  dom.categoryError.textContent = '';
  dom.dateError.textContent = '';

  dom.formTitle.classList.remove('is-invalid');
  dom.formAmount.classList.remove('is-invalid');
  dom.formCategory.classList.remove('is-invalid');
  dom.formDate.classList.remove('is-invalid');
}

/**
 * Open Add/Edit Modal
 */
function openExpenseModal(expenseToEdit = null) {
  clearFormErrors();
  dom.expenseForm.reset();

  if (expenseToEdit) {
    // Edit Mode
    state.activeModalExpenseId = expenseToEdit.id;
    dom.modalFormTitle.textContent = 'Edit Expense';
    dom.modalFormSubtitle.textContent = 'Update transaction details below';
    dom.submitBtnText.textContent = 'Update Expense';

    dom.formExpenseId.value = expenseToEdit.id;
    dom.formTitle.value = expenseToEdit.title || '';
    dom.formAmount.value = Number(expenseToEdit.amount) || '';
    dom.formCategory.value = expenseToEdit.category || '';
    dom.formDate.value = expenseToEdit.date || getTodayDateString();
    dom.formDescription.value = expenseToEdit.description || '';
  } else {
    // Create Mode
    state.activeModalExpenseId = null;
    dom.modalFormTitle.textContent = 'Add New Expense';
    dom.modalFormSubtitle.textContent = 'Enter transaction details below';
    dom.submitBtnText.textContent = 'Save Expense';

    dom.formExpenseId.value = '';
    dom.formDate.value = getTodayDateString();
  }

  // Update char count
  dom.charCounter.textContent = `${dom.formDescription.value.length} / 500`;

  dom.expenseModal.classList.remove('hidden');
  setTimeout(() => dom.formTitle.focus(), 50);
}

function closeExpenseModal() {
  dom.expenseModal.classList.add('hidden');
  clearFormErrors();
}

/**
 * Open Receipt View Details Modal
 */
function openViewDetailsModal(expenseId) {
  const expense = state.expenses.find(e => e.id === expenseId);
  if (!expense) return;

  state.activeModalExpenseId = expense.id;

  dom.receiptAmount.textContent = (Number(expense.amount) || 0).toFixed(2);
  dom.receiptTitle.textContent = expense.title;
  dom.receiptCategoryBadgeWrap.innerHTML = renderCategoryBadge(expense.category);
  dom.receiptCategory.textContent = expense.category;
  dom.receiptDate.textContent = formatDate(expense.date);
  dom.receiptId.textContent = expense.id;
  dom.receiptNotes.textContent = expense.description && expense.description.trim() ? expense.description : 'No additional notes provided.';

  dom.viewDetailsModal.classList.remove('hidden');
}

function closeViewDetailsModal() {
  dom.viewDetailsModal.classList.add('hidden');
}

/**
 * Open Delete Confirmation Modal
 */
function openDeleteModal(expenseId) {
  const expense = state.expenses.find(e => e.id === expenseId);
  if (!expense) return;

  state.deleteTargetExpenseId = expense.id;
  dom.deleteTargetTitle.textContent = `"${expense.title}" (${formatCurrency(expense.amount)})`;
  dom.deleteModal.classList.remove('hidden');
}

function closeDeleteModal() {
  dom.deleteModal.classList.add('hidden');
  state.deleteTargetExpenseId = null;
}

/**
 * Form Submission Handler (Handles both Create and Update)
 */
function handleExpenseFormSubmit(e) {
  e.preventDefault();
  clearFormErrors();

  const title = dom.formTitle.value.trim();
  const amountVal = dom.formAmount.value.trim();
  const category = dom.formCategory.value;
  const date = dom.formDate.value;
  const description = dom.formDescription.value.trim();

  let hasError = false;

  // Validation: Title
  if (!title) {
    dom.titleError.textContent = 'Please enter an expense title.';
    dom.formTitle.classList.add('is-invalid');
    hasError = true;
  } else if (title.length < 2) {
    dom.titleError.textContent = 'Title must be at least 2 characters.';
    dom.formTitle.classList.add('is-invalid');
    hasError = true;
  }

  // Validation: Amount
  const amount = parseFloat(amountVal);
  if (!amountVal || isNaN(amount) || amount <= 0) {
    dom.amountError.textContent = 'Enter a valid amount greater than $0.00.';
    dom.formAmount.classList.add('is-invalid');
    hasError = true;
  }

  // Validation: Category
  if (!category) {
    dom.categoryError.textContent = 'Please select an expense category.';
    dom.formCategory.classList.add('is-invalid');
    hasError = true;
  }

  // Validation: Date
  if (!date) {
    dom.dateError.textContent = 'Please choose a transaction date.';
    dom.formDate.classList.add('is-invalid');
    hasError = true;
  }

  if (hasError) return;

  const editingId = dom.formExpenseId.value;

  if (editingId) {
    // Update existing
    const index = state.expenses.findIndex(item => item.id === editingId);
    if (index !== -1) {
      state.expenses[index] = {
        ...state.expenses[index],
        title,
        amount,
        category,
        date,
        description,
        updatedAt: new Date().toISOString()
      };
      saveToLocalStorage();
      closeExpenseModal();
      refreshUI();
      showToast('Expense updated successfully!', 'success');
    }
  } else {
    // Create new
    const newExpense = {
      id: generateId(),
      title,
      amount,
      category,
      date,
      description,
      createdAt: new Date().toISOString()
    };
    state.expenses.unshift(newExpense);
    saveToLocalStorage();
    closeExpenseModal();
    refreshUI();
    showToast('New expense recorded!', 'success');
  }
}

/**
 * Delete confirmed action
 */
function handleConfirmDelete() {
  const idToDelete = state.deleteTargetExpenseId;
  if (!idToDelete) return;

  const target = state.expenses.find(e => e.id === idToDelete);
  const targetTitle = target ? target.title : 'Expense';

  state.expenses = state.expenses.filter(e => e.id !== idToDelete);
  saveToLocalStorage();

  closeDeleteModal();
  closeViewDetailsModal();
  refreshUI();
  showToast(`Deleted "${targetTitle}"`, 'danger');
}

// ------------------------------------------------------------------------------
// EXPORT TO CSV FEATURE
// ------------------------------------------------------------------------------

/**
 * Generate and download CSV file containing current or filtered expenses
 */
function exportExpensesToCSV() {
  const expensesToExport = getFilteredAndSortedExpenses();

  if (expensesToExport.length === 0) {
    showToast('No expenses to export!', 'warning');
    return;
  }

  const headers = ['Transaction ID', 'Title', 'Category', 'Amount', 'Date', 'Description', 'Created At'];

  const rows = expensesToExport.map(item => {
    return [
      item.id,
      `"${(item.title || '').replace(/"/g, '""')}"`,
      `"${(item.category || '').replace(/"/g, '""')}"`,
      (Number(item.amount) || 0).toFixed(2),
      item.date || '',
      `"${(item.description || '').replace(/"/g, '""')}"`,
      item.createdAt || ''
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  const dateStr = getTodayDateString();
  link.setAttribute('href', url);
  link.setAttribute('download', `TrackFlow_Expenses_${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast(`Exported ${expensesToExport.length} transactions to CSV`, 'info');
}

// ------------------------------------------------------------------------------
// EVENT LISTENERS SETUP
// ------------------------------------------------------------------------------

function setupEventListeners() {
  // Navigation Links
  dom.navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const view = link.dataset.view;
      if (view) switchView(view);
    });
  });

  // Mobile Menu & Backdrop
  dom.mobileMenuBtn.addEventListener('click', openMobileSidebar);
  dom.sidebarCloseBtn.addEventListener('click', closeMobileSidebar);
  dom.sidebarBackdrop.addEventListener('click', closeMobileSidebar);

  // Link to Transactions from Dashboard
  document.querySelectorAll('[data-view-target]').forEach(el => {
    el.addEventListener('click', () => {
      const target = el.dataset.viewTarget;
      if (target) switchView(target);
    });
  });

  // Add Expense Buttons
  const openAddModal = () => openExpenseModal(null);
  dom.sidebarAddBtn.addEventListener('click', openAddModal);
  dom.topbarAddBtn.addEventListener('click', openAddModal);
  dom.tableAddBtn.addEventListener('click', openAddModal);
  dom.emptyStateAddBtn.addEventListener('click', openAddModal);

  // Modal Close & Cancel
  dom.modalCloseBtn.addEventListener('click', closeExpenseModal);
  dom.modalCancelBtn.addEventListener('click', closeExpenseModal);
  dom.expenseModal.addEventListener('click', e => {
    if (e.target === dom.expenseModal) closeExpenseModal();
  });

  // Form Submit
  dom.expenseForm.addEventListener('submit', handleExpenseFormSubmit);

  // Character counter for textarea
  dom.formDescription.addEventListener('input', () => {
    dom.charCounter.textContent = `${dom.formDescription.value.length} / 500`;
  });

  // Receipt Modal Controls
  dom.viewDetailsCloseBtn.addEventListener('click', closeViewDetailsModal);
  dom.receiptDoneBtn.addEventListener('click', closeViewDetailsModal);
  dom.viewDetailsModal.addEventListener('click', e => {
    if (e.target === dom.viewDetailsModal) closeViewDetailsModal();
  });

  dom.receiptEditBtn.addEventListener('click', () => {
    const expense = state.expenses.find(e => e.id === state.activeModalExpenseId);
    if (expense) {
      closeViewDetailsModal();
      openExpenseModal(expense);
    }
  });

  dom.receiptDeleteBtn.addEventListener('click', () => {
    const expense = state.expenses.find(e => e.id === state.activeModalExpenseId);
    if (expense) {
      openDeleteModal(expense.id);
    }
  });

  // Delete Modal Controls
  dom.deleteCancelBtn.addEventListener('click', closeDeleteModal);
  dom.deleteConfirmBtn.addEventListener('click', handleConfirmDelete);
  dom.deleteModal.addEventListener('click', e => {
    if (e.target === dom.deleteModal) closeDeleteModal();
  });

  // Global ESC Key closes open modals
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (!dom.expenseModal.classList.contains('hidden')) closeExpenseModal();
      if (!dom.viewDetailsModal.classList.contains('hidden')) closeViewDetailsModal();
      if (!dom.deleteModal.classList.contains('hidden')) closeDeleteModal();
    }
  });

  // Delegated Table & List Action Buttons (View, Edit, Delete)
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const action = btn.dataset.action;
    const id = btn.dataset.id;
    if (!id) return;

    if (action === 'view') {
      openViewDetailsModal(id);
    } else if (action === 'edit') {
      const expense = state.expenses.find(item => item.id === id);
      if (expense) openExpenseModal(expense);
    } else if (action === 'delete') {
      openDeleteModal(id);
    }
  });

  // Filter & Search Controls
  dom.filterSearch.addEventListener('input', () => {
    state.filters.search = dom.filterSearch.value;
    if (dom.filterSearch.value.trim().length > 0) {
      dom.searchClearBtn.classList.remove('hidden');
    } else {
      dom.searchClearBtn.classList.add('hidden');
    }
    renderTransactionsView();
  });

  dom.searchClearBtn.addEventListener('click', () => {
    dom.filterSearch.value = '';
    state.filters.search = '';
    dom.searchClearBtn.classList.add('hidden');
    dom.filterSearch.focus();
    renderTransactionsView();
  });

  dom.filterCategory.addEventListener('change', () => {
    state.filters.category = dom.filterCategory.value;
    renderTransactionsView();
  });

  dom.filterDatePreset.addEventListener('change', () => {
    state.filters.datePreset = dom.filterDatePreset.value;
    if (dom.filterDatePreset.value === 'custom') {
      dom.customDateRow.classList.remove('hidden');
    } else {
      dom.customDateRow.classList.add('hidden');
      renderTransactionsView();
    }
  });

  const handleCustomDateChange = () => {
    state.filters.startDate = dom.filterStartDate.value;
    state.filters.endDate = dom.filterEndDate.value;
    renderTransactionsView();
  };

  dom.filterStartDate.addEventListener('change', handleCustomDateChange);
  dom.filterEndDate.addEventListener('change', handleCustomDateChange);
  dom.applyCustomDatesBtn.addEventListener('click', handleCustomDateChange);

  dom.filterSortBy.addEventListener('change', () => {
    state.filters.sortBy = dom.filterSortBy.value;
    renderTransactionsView();
  });

  // Reset Filters Buttons
  const resetFilters = () => {
    state.filters = {
      search: '',
      category: 'all',
      datePreset: 'all',
      startDate: '',
      endDate: '',
      sortBy: 'date-desc'
    };
    dom.filterSearch.value = '';
    dom.searchClearBtn.classList.add('hidden');
    dom.filterCategory.value = 'all';
    dom.filterDatePreset.value = 'all';
    dom.customDateRow.classList.add('hidden');
    dom.filterStartDate.value = '';
    dom.filterEndDate.value = '';
    dom.filterSortBy.value = 'date-desc';

    renderTransactionsView();
    showToast('Filters have been reset', 'info');
  };

  dom.resetFiltersBtn.addEventListener('click', resetFilters);
  dom.emptyStateResetBtn.addEventListener('click', resetFilters);

  // CSV Export Buttons
  dom.sidebarExportBtn.addEventListener('click', exportExpensesToCSV);
  dom.tableExportCsvBtn.addEventListener('click', exportExpensesToCSV);
  dom.backupExportCsvBtn.addEventListener('click', exportExpensesToCSV);

  // Sample Data Reload
  const reloadSampleData = () => {
    state.expenses = [...SAMPLE_EXPENSES];
    saveToLocalStorage();
    refreshUI();
    showToast('Sample demo data reloaded!', 'success');
  };

  dom.sidebarSampleDataBtn.addEventListener('click', reloadSampleData);
  dom.backupLoadSamplesBtn.addEventListener('click', reloadSampleData);

  // Clear All Data
  dom.backupClearDataBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all expenses from LocalStorage?')) {
      state.expenses = [];
      saveToLocalStorage();
      refreshUI();
      showToast('All transaction records cleared', 'warning');
    }
  });

  // Responsive Chart Redraw on Window Resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (state.currentView === 'dashboard') {
        renderMonthlyBarChart();
      }
    }, 150);
  });
}

// ------------------------------------------------------------------------------
// INITIALIZATION
// ------------------------------------------------------------------------------

function init() {
  // Format and show current date in topbar
  const today = new Date();
  dom.currentDateDisplay.textContent = today.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Load existing data or initialize with sample records
  loadFromLocalStorage();

  // Setup event handlers
  setupEventListeners();

  // Set default view
  switchView('dashboard');
}

// Run when DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
