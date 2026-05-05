// scope: "generic" = always accessible · "project" = per-project only

export const ALL_SOURCES = [
  { id: 'f1', name: 'Microsoft SharePoint', icon: '📁', status: 'ok',    type: 'Connecteur', scope: 'generic', desc: 'Documents et fichiers iQo'            },
  { id: 'f2', name: 'Google Drive',         icon: '📁', status: 'ok',    type: 'Connecteur', scope: 'generic', desc: 'Drive partagé iQo'                     },
  { id: 'f3', name: 'Microsoft OneDrive',   icon: '📁', status: 'ok',    type: 'Connecteur', scope: 'project', desc: 'Espace projet client'                  },
  { id: 'f4', name: 'Confluence',           icon: '📄', status: 'warn',  type: 'Connecteur', scope: 'project', desc: 'Wiki et documentation projet'          },
  { id: 'f5', name: 'Salesforce',           icon: '☁️', status: 'ok',    type: 'Connecteur', scope: 'project', desc: 'CRM et données client'                 },
  { id: 'f6', name: 'HubSpot',             icon: '🔶', status: 'error', type: 'Connecteur', scope: 'project', desc: 'Marketing automation'                  },
  { id: 'f7', name: 'Données internes iQo', icon: '🗄️', status: 'ok',  type: 'Interne',    scope: 'generic', desc: 'Base de connaissances et templates iQo' },
]
