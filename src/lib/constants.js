// ─── Design tokens ────────────────────────────────────────────────────────────

export const SF =
  "-apple-system,'SF Pro Display','SF Pro Text',BlinkMacSystemFont,'Segoe UI',sans-serif"
export const ACCENT = '#4F46E5'
export const DESKTOP_BREAKPOINT = 768

// ─── Departments ──────────────────────────────────────────────────────────────

export const DEPTS = [
  { id: 'marketing',  label: 'Marketing',           short: 'Mktg',    emoji: '📣', color: '#F97316', light: '#FFF7ED', dark: '#EA580C' },
  { id: 'rh',         label: 'Ressources Humaines', short: 'RH',      emoji: '👥', color: '#7C3AED', light: '#F5F3FF', dark: '#6D28D9' },
  { id: 'consulting', label: 'Consulting',          short: 'Conseil', emoji: '🧠', color: '#0EA5E9', light: '#F0F9FF', dark: '#0284C7' },
  { id: 'it',         label: 'IT & Systèmes',       short: 'IT',      emoji: '💻', color: '#6366F1', light: '#EEF2FF', dark: '#4F46E5' },
  { id: 'finance',    label: 'Finance',             short: 'Finance', emoji: '📊', color: '#10B981', light: '#ECFDF5', dark: '#059669' },
  { id: 'legal',      label: 'Juridique',           short: 'Juridiq', emoji: '⚖️', color: '#F59E0B', light: '#FFFBEB', dark: '#D97706' },
]

// ─── Team / owners ────────────────────────────────────────────────────────────

export const OWNERS = [
  { id: 'romain',  name: 'Romain Villar',  initials: 'RV', color: '#6366F1' },
  { id: 'thomas',  name: 'Thomas Leroy',   initials: 'TL', color: '#0EA5E9' },
  { id: 'sophie',  name: 'Sophie Martin',  initials: 'SM', color: '#F97316' },
  { id: 'julien',  name: 'Julien Bernard', initials: 'JB', color: '#7C3AED' },
  { id: 'claire',  name: 'Claire Simon',   initials: 'CS', color: '#10B981' },
  { id: 'antoine', name: 'Antoine Morel',  initials: 'AM', color: '#F59E0B' },
  { id: 'laura',   name: 'Laura Petit',    initials: 'LP', color: '#EF4444' },
]

// ─── Status config ────────────────────────────────────────────────────────────

export const STATUS_CFG = {
  running: { label: 'En cours',   color: '#10B981', bg: '#DCFCE7', pulse: true  },
  waiting: { label: 'En attente', color: '#F59E0B', bg: '#FEF3C7', pulse: false },
  idle:    { label: 'Inactif',    color: '#94A3B8', bg: '#F8FAFC', pulse: false },
  error:   { label: 'Erreur',     color: '#EF4444', bg: '#FEF2F2', pulse: false },
}

// ─── Fil priority config ──────────────────────────────────────────────────────

export const PRIO = {
  urgent: { label: 'Urgent',    color: '#EF4444', bg: '#FEF2F2', border: '#FECACA', order: 0, action: 'Ouvrir'  },
  action: { label: 'À valider', color: '#F97316', bg: '#FFF7ED', border: '#FED7AA', order: 1, action: 'Valider' },
  review: { label: 'À relire',  color: '#0EA5E9', bg: '#EFF6FF', border: '#BFDBFE', order: 2, action: 'Ouvrir'  },
  info:   { label: 'Info',      color: '#8B5CF6', bg: '#F5F3FF', border: '#DDD6FE', order: 3, action: 'Voir'    },
}

// ─── File extension colors ────────────────────────────────────────────────────

export const EXT_COLOR = {
  pptx: '#F97316',
  docx: '#0EA5E9',
  xlsx: '#10B981',
  html: '#7C3AED',
  md:   '#6B7280',
  pdf:  '#EF4444',
}

// ─── Agent emoji map ──────────────────────────────────────────────────────────

export const AVATAR_MAP = {
  'Marketing Agent':           '📣',
  'Market Intelligence Agent': '📡',
  'Content Agent':             '✍️',
  'Campaign Monitor':          '📡',
  'RH Agent':                  '👥',
  'Recruitment Agent':         '🎯',
  'HR Reporter':               '📈',
  'Consulting Assistant':      '🧠',
  'Intel Watcher':             '👁',
  'Proposal Writer':           '📝',
  'Meeting Prep':              '🤝',
  'IT Monitor':                '🖥',
  'Security Scanner':          '🔒',
  'Finance Agent':             '💰',
  'Invoice Agent':             '🧾',
  'Budget Tracker':            '📊',
  'Contract Reviewer':         '⚖️',
}

export const agentEmoji = (name) => AVATAR_MAP[name] || '🤖'
