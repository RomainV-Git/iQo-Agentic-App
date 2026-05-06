'use client'

import { useState, useRef, useEffect } from "react";

const SF = "-apple-system,'SF Pro Display','SF Pro Text',BlinkMacSystemFont,'Segoe UI',sans-serif";
const ACCENT = "#4F46E5";
const IQO_GREEN = "#6DBE45";
const AVATAR_RV = "data:image/png;base64,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";

// ─── IqoLogo ──────────────────────────────────────────────────────────────────
// Utilise le PNG original dans un container arrondi fond #111827
// variant: "full" | "icon"   size: taille de l'icône en px
function IqoLogo({ variant = "full", size = 32, onDark = false }) {
  const Badge = () => (
    <div style={{ width:size, height:size, borderRadius:Math.round(size*0.28),
                  background:"#111827", display:"flex", alignItems:"center",
                  justifyContent:"center", flexShrink:0, overflow:"hidden" }}>
      <img src="/logo.png" alt="iQo" width={size*0.85} height={size*0.85}
           style={{ display:"block", objectFit:"contain" }}/>
    </div>
  );

  if (variant === "icon") return <Badge />;

  return (
    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
      <Badge />
      <div style={{ display:"flex", flexDirection:"column", lineHeight:1, userSelect:"none" }}>
        <span style={{ fontFamily:SF, fontSize:size*0.5, fontWeight:700,
                       color:onDark?"#fff":"#111827", letterSpacing:"-0.02em" }}>iQo</span>
        <span style={{ fontFamily:SF, fontSize:size*0.33, fontWeight:500,
                       color:onDark?"rgba(255,255,255,0.6)":"#6B7280",
                       letterSpacing:"0.02em", marginTop:2 }}>
          Agentic <span style={{ color:IQO_GREEN, fontWeight:700 }}>AI</span>
        </span>
      </div>
    </div>
  );
}

const AVATAR_MAP = {
  "Marketing Agent":"📣","Market Intelligence Agent":"📡","Content Agent":"✍️","Campaign Monitor":"📡",
  "RH Agent":"👥","Recruitment Agent":"🎯","HR Reporter":"📈",
  "Consulting Assistant":"🧠","Intel Watcher":"👁","Proposal Writer":"📝","Meeting Prep":"🤝",
  "IT Monitor":"🖥","Security Scanner":"🔒",
  "Finance Agent":"💰","Invoice Agent":"🧾","Budget Tracker":"📊",
  "Contract Reviewer":"⚖️",
};
const agentEmoji = n => AVATAR_MAP[n] || "🤖";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const DEPTS = [
  { id:"marketing",  label:"Marketing",           short:"Mktg",    emoji:"📣", color:"#F97316", light:"#FFF7ED", dark:"#EA580C" },
  { id:"rh",         label:"Ressources Humaines", short:"RH",      emoji:"👥", color:"#7C3AED", light:"#F5F3FF", dark:"#6D28D9" },
  { id:"consulting", label:"Consulting",          short:"Conseil", emoji:"🧠", color:"#0EA5E9", light:"#F0F9FF", dark:"#0284C7" },
  { id:"it",         label:"IT & Systèmes",        short:"IT",      emoji:"💻", color:"#6366F1", light:"#EEF2FF", dark:"#4F46E5" },
  { id:"finance",    label:"Finance",             short:"Finance", emoji:"📊", color:"#10B981", light:"#ECFDF5", dark:"#059669" },
  { id:"legal",      label:"Juridique",           short:"Juridiq", emoji:"⚖️", color:"#F59E0B", light:"#FFFBEB", dark:"#D97706" },
];

const OWNERS = [
  { id:"romain",    name:"Romain Villar",   initials:"RP", avatar:"RP", color:"#6366F1" },
  { id:"thomas",   name:"Thomas Leroy",   initials:"TL", avatar:"TL", color:"#0EA5E9" },
  { id:"sophie",   name:"Sophie Martin",  initials:"SM", avatar:"SM", color:"#F97316" },
  { id:"julien",   name:"Julien Bernard", initials:"JB", avatar:"JB", color:"#7C3AED" },
  { id:"claire",   name:"Claire Simon",   initials:"CS", avatar:"CS", color:"#10B981" },
  { id:"antoine",  name:"Antoine Morel",  initials:"AM", avatar:"AM", color:"#F59E0B" },
  { id:"laura",    name:"Laura Petit",    initials:"LP", avatar:"LP", color:"#EF4444"  },
];

const ALL_SOURCES = [
  { id:"f1", name:"Microsoft SharePoint", icon:"📁", status:"ok",   type:"Connecteur", scope:"generic", desc:"Documents et fichiers iQo"          },
  { id:"f2", name:"Microsoft Outlook",    icon:"📧", status:"ok",   type:"Connecteur", scope:"generic", desc:"Emails et calendriers iQo"           },
  { id:"f3", name:"Microsoft Teams",      icon:"💬", status:"ok",   type:"Connecteur", scope:"generic", desc:"Messagerie et réunions iQo"          },
  { id:"f4", name:"iQo CRM",             icon:"🎯", status:"ok",   type:"Interne",    scope:"project", desc:"Gestion de la relation client iQo"   },
  { id:"f5", name:"iQo Finance",          icon:"📊", status:"warn", type:"Interne",    scope:"project", desc:"Pilotage financier et budgets iQo"   },
  { id:"f6", name:"iQo Recrutement",      icon:"👥", status:"ok",   type:"Interne",    scope:"project", desc:"Gestion des candidatures et RH iQo" },
];

const EXT_COLOR = { pptx:"#F97316", docx:"#0EA5E9", xlsx:"#10B981", html:"#7C3AED", md:"#6B7280", pdf:"#EF4444" };

const STATUS_CFG = {
  running:{ label:"En cours",   color:"#10B981", bg:"#DCFCE7", dot:"#10B981", pulse:true  },
  waiting:{ label:"En attente", color:"#F59E0B", bg:"#FEF3C7", dot:"#F59E0B", pulse:false },
  idle:   { label:"Inactif",    color:"#94A3B8", bg:"#F8FAFC", dot:"#94A3B8", pulse:false },
  error:  { label:"Erreur",     color:"#EF4444", bg:"#FEF2F2", dot:"#EF4444", pulse:false },
};

const PRIO = {
  urgent:{ label:"Urgent",    color:"#EF4444", bg:"#FEF2F2", border:"#FECACA", order:0, action:"Ouvrir"   },
  action:{ label:"À valider", color:"#F97316", bg:"#FFF7ED", border:"#FED7AA", order:1, action:"Valider"  },
  review:{ label:"À relire",  color:"#0EA5E9", bg:"#EFF6FF", border:"#BFDBFE", order:2, action:"Ouvrir"   },
  info:  { label:"Info",      color:"#8B5CF6", bg:"#F5F3FF", border:"#DDD6FE", order:3, action:"Voir"     },
};

const INIT_AGENTS = {
  marketing:[
    { id:"mk-1", name:"Marketing Agent",          desc:"Analyse les données marketing et génère des insights.", active:true,  status:"running", dept:"marketing",  trigger:"Manuel",    schedule:"",            lastRun:"Il y a 8 min",  notif:1, progress:75, delivery:["Analyse_campagne_Q4.pdf","Recommandations_Q4.pptx"], files:["f1","f2","f7"], mission:"iQo Interne", owner:"romain",   model:"GPT-4o Enterprise", runs:28, successRate:92, avgTime:"12m 45s" },
    { id:"mk-2", name:"Market Intelligence Agent",desc:"Surveille le marché et détecte les tendances.",         active:true,  status:"running", dept:"marketing",  trigger:"Planifié",  schedule:"Quot. 07:30", lastRun:"Il y a 14 min", notif:0, progress:60, delivery:["Veille concurrentielle.pdf"],                       files:["f2","f7"],      mission:"iQo Interne", owner:"thomas",  model:"GPT-4o Enterprise", runs:45, successRate:96, avgTime:"8m 12s"  },
    { id:"mk-3", name:"Content Agent",            desc:"Produit et optimise des contenus multicanaux.",         active:true,  status:"running", dept:"marketing",  trigger:"Événement", schedule:"",            lastRun:"Il y a 22 min", notif:0, progress:30, delivery:["Content planning Janvier.xlsx"],                    files:["f2","f7"],      mission:"iQo Interne", owner:"sophie",  model:"GPT-4o Enterprise", runs:19, successRate:89, avgTime:"15m 20s" },
    { id:"mk-4", name:"Campaign Monitor",         desc:"Surveille les performances campagnes.",                 active:false, status:"idle",    dept:"marketing",  trigger:"Manuel",    schedule:"",            lastRun:"Hier",          notif:0, progress:0,  delivery:[],                                                  files:["f2"],           mission:"iQo Interne", owner:"sophie",  model:"GPT-4o Enterprise", runs:8,  successRate:88, avgTime:"10m 00s" },
  ],
  rh:[
    { id:"rh-1", name:"RH Agent",                 desc:"Automatise et suit les processus RH.",                  active:true,  status:"waiting", dept:"rh",         trigger:"Planifié",  schedule:"Lun 09:00",   lastRun:"Il y a 30 min", notif:2, progress:0,  delivery:["Plan de formation 2025.pdf"],                       files:["f1","f7"],      mission:"iQo Interne", owner:"julien",  model:"GPT-4o Enterprise", runs:34, successRate:91, avgTime:"9m 30s"  },
    { id:"rh-2", name:"Recruitment Agent",        desc:"Identifie et présélectionne les candidats.",            active:true,  status:"waiting", dept:"rh",         trigger:"Planifié",  schedule:"Mer 10:00",   lastRun:"Il y a 2 h",    notif:1, progress:0,  delivery:[],                                                  files:["f1"],           mission:"iQo Interne", owner:"claire",  model:"GPT-4o Enterprise", runs:22, successRate:85, avgTime:"18m 10s" },
    { id:"rh-3", name:"HR Reporter",              desc:"Génère les dashboards RH hebdomadaires.",               active:false, status:"idle",    dept:"rh",         trigger:"Planifié",  schedule:"Ven 17:00",   lastRun:"Il y a 5 j",    notif:0, progress:0,  delivery:["Rapport RH S18.pptx"],                              files:["f1","f7"],      mission:"iQo Interne", owner:"julien",  model:"GPT-4o",            runs:12, successRate:100,avgTime:"2m 45s"  },
  ],
  consulting:[
    { id:"co-1", name:"Consulting Assistant",     desc:"Assiste les consultants dans leurs missions.",          active:true,  status:"running", dept:"consulting", trigger:"Événement", schedule:"",            lastRun:"Il y a 12 min", notif:1, progress:68, delivery:["Offre Covéa v2.pptx","Dashboard Veille S18.html"],  files:["f1","f2","f7"], mission:"Covéa",       owner:"antoine", model:"GPT-4o Enterprise", runs:41, successRate:94, avgTime:"7m 20s"  },
    { id:"co-2", name:"Intel Watcher",            desc:"Veille technologique et marché.",                       active:true,  status:"running", dept:"consulting", trigger:"Planifié",  schedule:"Quot. 07:30", lastRun:"Il y a 5 min",  notif:0, progress:85, delivery:["Dashboard Veille S18.html"],                       files:["f2","f7"],      mission:"iQo Interne", owner:"antoine", model:"GPT-4o Enterprise", runs:67, successRate:97, avgTime:"5m 15s"  },
    { id:"co-3", name:"Proposal Writer",          desc:"Rédige les réponses à appels d'offres.",                active:false, status:"idle",    dept:"consulting", trigger:"Manuel",    schedule:"",            lastRun:"Il y a 3 j",    notif:0, progress:0,  delivery:[],                                                  files:["f1","f2","f7"], mission:"Holosolis",   owner:"laura",   model:"GPT-4o",            runs:9,  successRate:78, avgTime:"22m 00s" },
    { id:"co-4", name:"Meeting Prep",             desc:"Prépare les briefs avant client.",                      active:true,  status:"idle",    dept:"consulting", trigger:"Événement", schedule:"",            lastRun:"Il y a 2 h",    notif:0, progress:0,  delivery:["Brief Prova 05/05.docx"],                           files:["f1","f3"],      mission:"Prova",       owner:"antoine", model:"GPT-4o",            runs:15, successRate:93, avgTime:"3m 50s"  },
  ],
  it:[
    { id:"it-1", name:"IT Monitor",               desc:"Surveille l'infrastructure et les services.",           active:true,  status:"running", dept:"it",         trigger:"Continu",   schedule:"",            lastRun:"Il y a 1 min",  notif:0, progress:100,delivery:[],                                                  files:["f7"],           mission:"iQo Interne", owner:"thomas",  model:"GPT-4o",            runs:890,successRate:99, avgTime:"0m 30s"  },
    { id:"it-2", name:"Security Scanner",         desc:"Scanne et analyse les vulnérabilités.",                 active:false, status:"error",   dept:"it",         trigger:"Planifié",  schedule:"Quot. 02:00", lastRun:"Il y a 6 h",    notif:1, progress:0,  delivery:[],                                                  files:["f7"],           mission:"iQo Interne", owner:"thomas",  model:"GPT-4o",            runs:30, successRate:70, avgTime:"45m 00s" },
  ],
  finance:[
    { id:"fi-1", name:"Finance Agent",            desc:"Suit la performance financière.",                       active:true,  status:"idle",    dept:"finance",    trigger:"Planifié",  schedule:"1er du mois", lastRun:"Ce matin",      notif:1, progress:0,  delivery:["Budget iQo T2.xlsx"],                               files:["f5","f7"],      mission:"iQo Interne", owner:"laura",   model:"GPT-4o",            runs:18, successRate:94, avgTime:"6m 10s"  },
    { id:"fi-2", name:"Invoice Agent",            desc:"Gère et relance les factures.",                         active:false, status:"idle",    dept:"finance",    trigger:"Manuel",    schedule:"",            lastRun:"Il y a 5 j",    notif:0, progress:0,  delivery:[],                                                  files:["f5"],           mission:"iQo Interne", owner:"laura",   model:"GPT-4o",            runs:7,  successRate:100,avgTime:"4m 20s"  },
    { id:"fi-3", name:"Budget Tracker",           desc:"Suit les enveloppes budgétaires.",                      active:true,  status:"waiting", dept:"finance",    trigger:"Planifié",  schedule:"Lun 08:00",   lastRun:"Il y a 45 min", notif:1, progress:0,  delivery:["Budget_Q2_alerte.pdf"],                             files:["f5","f7"],      mission:"iQo Interne", owner:"laura",   model:"GPT-4o",            runs:12, successRate:92, avgTime:"8m 30s"  },
  ],
  legal:[
    { id:"le-1", name:"Contract Reviewer",        desc:"Analyse les clauses contractuelles.",                   active:true,  status:"waiting", dept:"legal",      trigger:"Événement", schedule:"",            lastRun:"Il y a 1 h",    notif:1, progress:0,  delivery:["Analyse NDA Prova.docx"],                           files:["f3","f7"],      mission:"Prova",       owner:"claire",  model:"GPT-4o",            runs:14, successRate:86, avgTime:"14m 00s" },
  ],
};

const INIT_FIL = [
  { id:"f1", type:"urgent", agent:"Marketing Agent",    dept:"marketing", msg:"Relecture requise",             detail:"Analyse campagne Q4 est prêt pour relecture. Vérifier cohérence des chiffres, messages clés et recommandations finales.", deadline:"Auj. 18:00", time:"Il y a 10 min", file:"Analyse_campagne_Q4.pdf",    mission:"iQo Interne", owner:"romain",   triggeredBy:"Planifié",   context:"Campagne Q4 2024" },
  { id:"f2", type:"urgent", agent:"RH Agent",           dept:"rh",        msg:"Réponse requise",              detail:"Question sur le budget Cloud pour le plan de formation 2025. Validation du responsable requise avant envoi.", deadline:"Auj. 17:00", time:"Il y a 30 min",file:"Plan de formation 2025.pdf",  mission:"iQo Interne", owner:"julien",  triggeredBy:"Manuel",     context:"Budget Formation 2025" },
  { id:"f3", type:"urgent", agent:"Contract Reviewer",  dept:"legal",     msg:"Arbitrage requis",             detail:"Clause 7.3 du NDA Prova contient une ambiguïté sur la durée d'exclusivité. Votre interprétation est nécessaire.", deadline:"Dem. 09:00", time:"Il y a 1 h",   file:"Analyse NDA Prova.docx",     mission:"Prova",       owner:"claire",  triggeredBy:"Événement",  context:"NDA Client Prova" },
  { id:"f4", type:"action", agent:"RH Agent",           dept:"rh",        msg:"Validation requise",           detail:"Plan de formation 2025 préparé selon les objectifs et le budget validés. Merci de le relire et de valider.", deadline:"18 jan. 18:00",time:"Il y a 30 min",file:"Plan de formation 2025.pdf",  mission:"iQo Interne", owner:"julien",  triggeredBy:"Planifié",   context:"Plan Formation 2025" },
  { id:"f5", type:"action", agent:"Consulting Assistant",dept:"consulting",msg:"Validation requise",           detail:"Offre Covéa v2 finalisée. Points clés : architecture cible, roadmap 18 mois, budget indicatif. Validation avant envoi client.", deadline:"Auj. 16:00", time:"Il y a 45 min",file:"Offre Covéa v2.pptx",         mission:"Covéa",       owner:"antoine", triggeredBy:"Manuel",     context:"Offre Covéa" },
  { id:"f6", type:"review", agent:"Market Intelligence Agent",dept:"marketing",msg:"Relecture requise",       detail:"Rapport tendances 2025 disponible. Focus sur IA générative et cloud souverain. 3 recommandations stratégiques à valider.", deadline:"20 jan. 12:00",time:"Il y a 2 h", file:"Rapport tendances 2025.pdf", mission:"iQo Interne", owner:"thomas",  triggeredBy:"Planifié",   context:"Veille Marché" },
  { id:"f7", type:"review", agent:"Finance Agent",      dept:"finance",   msg:"À relire",                     detail:"Dépassement budget prévisionnel Q2 de +4%. Analyse des causes et recommandations incluses. Revue avant présentation CODIR.", deadline:"22 jan. 09:00",time:"Il y a 1 h", file:"Budget_Q2_alerte.pdf",        mission:"iQo Interne", owner:"laura",   triggeredBy:"Automatique",context:"Budget Q2" },
  { id:"f8", type:"info",   agent:"IT Monitor",         dept:"it",        msg:"Information",                  detail:"Pic de charge détecté sur le serveur Make : CPU 87% pendant 12 minutes. Surveillance active. Aucune action requise pour l'instant.", deadline:null,         time:"Il y a 3 h", file:null,                          mission:"iQo Interne", owner:"thomas",  triggeredBy:"Automatique",context:"Infrastructure" },
];

const HISTORY_LOG = [
  { time:"Auj. 09:30", action:"Vous avez validé",     item:"Plan de formation 2025",       agent:"RH Agent",                  type:"action"  },
  { time:"Auj. 08:45", action:"Vous avez répondu",    item:"Question sur budget Cloud",    agent:"Finance Agent",             type:"reply"   },
  { time:"Hier 18:20", action:"Vous avez commenté",   item:"Rapport tendances 2025",       agent:"Market Intelligence Agent", type:"comment" },
  { time:"Hier 16:10", action:"Vous avez lancé",      item:"Veille concurrentielle",       agent:"Intel Watcher",             type:"launch"  },
  { time:"15 jan.",    action:"Vous avez validé",      item:"Onboarding collaborateur",     agent:"RH Agent",                  type:"action"  },
  { time:"15 jan.",    action:"Vous avez commenté",    item:"Budget prévisionnel 2025",     agent:"Finance Agent",             type:"comment" },
];

// ─── ATOMS ────────────────────────────────────────────────────────────────────

function Pulse({ color, size=8 }) {
  return (
    <span style={{ position:"relative", display:"inline-flex", width:size, height:size, flexShrink:0 }}>
      <span style={{ position:"absolute", inset:0, borderRadius:"50%", background:color, opacity:0.3, animation:"ping 2s ease-in-out infinite" }} />
      <span style={{ width:size, height:size, borderRadius:"50%", background:color, display:"block" }} />
    </span>
  );
}

function StatusPill({ status, small=false }) {
  const c = STATUS_CFG[status] || STATUS_CFG.idle;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5, background:c.bg, borderRadius:20, padding:small?"2px 8px":"3px 10px", fontFamily:SF, fontSize:small?10:11, fontWeight:600, color:c.color }}>
      {c.pulse ? <Pulse color={c.color} size={small?5:6} /> : <span style={{ width:small?5:6, height:small?5:6, borderRadius:"50%", background:c.color, flexShrink:0 }} />}
      {c.label}
    </span>
  );
}

function IOSToggle({ on, onToggle, color=ACCENT, scale=1 }) {
  const w=Math.round(44*scale), h=Math.round(26*scale), t=Math.round(22*scale), p=2;
  return (
    <div onClick={e=>{ e.stopPropagation(); onToggle(); }} style={{ width:w, height:h, borderRadius:h, cursor:"pointer", background:on?color:"#D1D5DB", position:"relative", transition:"background 0.2s", flexShrink:0 }}>
      <div style={{ position:"absolute", top:p, left:on?w-t-p:p, width:t, height:t, borderRadius:"50%", background:"#fff", transition:"left 0.2s cubic-bezier(0.4,0,0.2,1)", boxShadow:"0 1px 4px rgba(0,0,0,0.2)" }} />
    </div>
  );
}

function Avatar({ owner, size=28 }) {
  const o = OWNERS.find(x=>x.id===owner) || OWNERS[0];
  return <div style={{ width:size, height:size, borderRadius:"50%", background:o.color+"22", border:`1.5px solid ${o.color}50`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:SF, fontSize:size*0.35, fontWeight:700, color:o.color, flexShrink:0 }}>{o.initials}</div>;
}

function AgentIcon({ name, dept, size=36 }) {
  const d = DEPTS.find(x=>x.id===dept) || DEPTS[0];
  const map = { "Marketing Agent":"📣","Market Intelligence Agent":"📡","Content Agent":"✍️","Campaign Monitor":"📡","RH Agent":"👥","Recruitment Agent":"🎯","HR Reporter":"📈","Consulting Assistant":"🧠","Intel Watcher":"👁","Proposal Writer":"📝","Meeting Prep":"🤝","IT Monitor":"🖥","Security Scanner":"🔒","Finance Agent":"💰","Invoice Agent":"🧾","Budget Tracker":"📊","Contract Reviewer":"⚖️" };
  const emoji = map[name] || "🤖";
  return <div style={{ width:size, height:size, borderRadius:size*0.25, background:d.light, display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.5, flexShrink:0, border:`1px solid ${d.color}20` }}>{emoji}</div>;
}

function ExtBadge({ filename }) {
  const ext = (filename||"").split(".").pop().toLowerCase();
  const c = EXT_COLOR[ext] || "#6B7280";
  return <span style={{ fontSize:9, fontFamily:SF, fontWeight:700, color:c, background:c+"18", borderRadius:4, padding:"2px 5px", textTransform:"uppercase", flexShrink:0 }}>{ext}</span>;
}

function DeptTag({ dept }) {
  const d = DEPTS.find(x=>x.id===dept);
  if(!d) return null;
  return <span style={{ fontFamily:SF, fontSize:10, fontWeight:600, color:d.color, background:d.light, borderRadius:6, padding:"2px 7px", flexShrink:0 }}>{d.short}</span>;
}

function Divider({ indent=0 }) {
  return <div style={{ height:"0.5px", background:"#F3F4F6", marginLeft:indent }} />;
}

function Card({ children, style={}, onClick }) {
  return <div onClick={onClick} style={{ background:"#fff", borderRadius:14, overflow:"hidden", boxShadow:"0 1px 3px rgba(0,0,0,0.06)", ...style }}>{children}</div>;
}

function SectionHeader({ title, action, onAction }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
      <span style={{ fontFamily:SF, fontSize:16, fontWeight:700, color:"#111827", letterSpacing:"-0.02em" }}>{title}</span>
      {action && <button onClick={onAction} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:SF, fontSize:13, color:ACCENT, fontWeight:600, padding:0 }}>{action}</button>}
    </div>
  );
}

function SearchBar({ value, onChange, placeholder="Rechercher…" }) {
  return (
    <div style={{ background:"#F3F4F6", borderRadius:12, padding:"9px 13px", display:"flex", alignItems:"center", gap:8 }}>
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="8.5" r="6.5" stroke="#9CA3AF" strokeWidth="1.8"/><path d="M13.5 13.5L18 18" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round"/></svg>
      <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{ flex:1, border:"none", outline:"none", fontFamily:SF, fontSize:15, color:"#111827", background:"transparent" }} />
      {value && <button onClick={()=>onChange("")} style={{ background:"#9CA3AF", border:"none", borderRadius:"50%", width:16, height:16, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:10, cursor:"pointer", padding:0 }}>×</button>}
    </div>
  );
}

function FilterChips({ options, value, onChange, colored=false }) {
  return (
    <div style={{ display:"flex", gap:6, overflowX:"auto", paddingBottom:2 }}>
      {options.map(o=>{
        const active = value===o.id;
        return (
          <button key={o.id} onClick={()=>onChange(o.id)} style={{ fontFamily:SF, fontSize:13, fontWeight:active?700:500, color:active?"#fff":(colored&&o.color?o.color:"#6B7280"), background:active?(colored&&o.color?o.color:ACCENT):(colored&&o.color?o.color+"14":"#F3F4F6"), borderRadius:20, padding:"6px 14px", border:"none", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0, display:"flex", alignItems:"center", gap:5, transition:"all 0.15s" }}>
            {o.label}
            {o.count!=null && <span style={{ background:active?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.08)", borderRadius:20, minWidth:18, height:18, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, padding:"0 4px" }}>{o.count}</span>}
          </button>
        );
      })}
    </div>
  );
}

function PrimaryBtn({ children, onPress, color=ACCENT, disabled, full=true }) {
  return <button onClick={onPress} disabled={disabled} style={{ width:full?"100%":"auto", padding:"13px 20px", borderRadius:12, border:"none", background:disabled?"#E5E7EB":color, color:disabled?"#9CA3AF":"#fff", fontFamily:SF, fontSize:15, fontWeight:600, cursor:disabled?"not-allowed":"pointer", transition:"opacity 0.15s" }}>{children}</button>;
}

function SecBtn({ children, onPress, color=ACCENT, full=true }) {
  return <button onClick={onPress} style={{ width:full?"100%":"auto", padding:"13px 20px", borderRadius:12, border:`1.5px solid ${color}30`, background:`${color}08`, color, fontFamily:SF, fontSize:15, fontWeight:600, cursor:"pointer" }}>{children}</button>;
}

// ─── SPARKLINE ────────────────────────────────────────────────────────────────

function Sparkline({ data, color, w=80, h=28 }) {
  if(!data||data.length<2) return null;
  const min=Math.min(...data), max=Math.max(...data), range=max-min||1;
  const pts = data.map((v,i)=>[i/(data.length-1)*(w-2)+1, h-1-((v-min)/range)*(h-4)-1]);
  const d = pts.map((p,i)=>(i===0?"M":"L")+p[0].toFixed(1)+","+p[1].toFixed(1)).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <path d={d} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ─── DONUT ────────────────────────────────────────────────────────────────────

function Donut({ pct, color, size=44, label="" }) {
  const r=16, c=22, circ=2*Math.PI*r, fill=circ*(pct/100);
  const hue = pct>=80?"#10B981":pct>=60?"#F59E0B":"#EF4444";
  const col = color||hue;
  return (
    <div style={{ position:"relative", width:size, height:size, flexShrink:0 }}>
      <svg width={size} height={size} viewBox="0 0 44 44">
        <circle cx={c} cy={c} r={r} fill="none" stroke="#F3F4F6" strokeWidth="4"/>
        <circle cx={c} cy={c} r={r} fill="none" stroke={col} strokeWidth="4" strokeLinecap="round" strokeDasharray={`${fill} ${circ-fill}`} strokeDashoffset={circ*0.25} transform="rotate(0 22 22)"/>
      </svg>
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontFamily:SF, fontSize:9, fontWeight:700, color:col }}>{pct}%</span>
      </div>
    </div>
  );
}

// ─── ACTION SHEET ─────────────────────────────────────────────────────────────

function ActionSheet({ item, onResolve, onClose }) {
  const [comment, setComment] = useState("");
  const p = PRIO[item.type] || PRIO.info;
  const d = DEPTS.find(x=>x.id===item.dept);

  return (
    <div style={{ position:"absolute", inset:0, zIndex:200, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
      <div onClick={onClose} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.5)", backdropFilter:"blur(6px)" }} />
      <div style={{ position:"relative", background:"#F9FAFB", borderRadius:"22px 22px 0 0", maxHeight:"88vh", overflow:"hidden", display:"flex", flexDirection:"column", zIndex:201, animation:"slideUp 0.25s cubic-bezier(0.4,0,0.2,1)" }}>
        <div style={{ width:36, height:4, borderRadius:2, background:"#D1D5DB", margin:"14px auto 0" }} />

        {/* Header */}
        <div style={{ padding:"14px 20px 0", borderBottom:"0.5px solid #E5E7EB", paddingBottom:14 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4 }}>
            <span style={{ fontFamily:SF, fontSize:11, fontWeight:700, color:p.color, letterSpacing:"0.06em", textTransform:"uppercase", background:p.bg, borderRadius:6, padding:"3px 8px" }}>{p.label}</span>
            {item.deadline && <span style={{ fontFamily:SF, fontSize:11, color:"#6B7280" }}>⏱ {item.deadline}</span>}
          </div>
          <div style={{ fontFamily:SF, fontSize:18, fontWeight:700, color:"#111827", marginTop:8, marginBottom:4 }}>{item.msg}</div>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <AgentIcon name={item.agent} dept={item.dept} size={18} />
            <span style={{ fontFamily:SF, fontSize:13, color:"#6B7280" }}>{item.agent}</span>
            <DeptTag dept={item.dept} />
          </div>
        </div>

        <div style={{ flex:1, overflowY:"auto", padding:"16px 20px" }}>
          {/* Detail */}
          <Card style={{ padding:"14px", marginBottom:14 }}>
            <div style={{ fontFamily:SF, fontSize:11, fontWeight:600, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:"0.04em", marginBottom:8 }}>Résumé de l'agent</div>
            <div style={{ fontFamily:SF, fontSize:14, color:"#374151", lineHeight:1.6 }}>{item.detail}</div>
          </Card>

          {/* File */}
          {item.file && (
            <Card style={{ padding:"12px 14px", marginBottom:14, display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}>
              <ExtBadge filename={item.file} />
              <span style={{ flex:1, fontFamily:SF, fontSize:14, color:"#111827", fontWeight:500 }}>{item.file}</span>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 3v10M5 13l5 5 5-5" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </Card>
          )}

          {/* Context */}
          <Card style={{ padding:"12px 14px", marginBottom:16 }}>
            <div style={{ display:"flex", gap:16 }}>
              {[{ l:"Déclencheur", v:item.triggeredBy }, { l:"Contexte", v:item.context }, { l:"Mission", v:item.mission }].map(r=>(
                <div key={r.l} style={{ flex:1 }}>
                  <div style={{ fontFamily:SF, fontSize:10, color:"#9CA3AF", fontWeight:600, textTransform:"uppercase", marginBottom:2 }}>{r.l}</div>
                  <div style={{ fontFamily:SF, fontSize:12, color:"#374151", fontWeight:500 }}>{r.v}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Comment */}
          <div style={{ marginBottom:16 }}>
            <div style={{ fontFamily:SF, fontSize:12, fontWeight:600, color:"#6B7280", marginBottom:7, textTransform:"uppercase", letterSpacing:"0.04em" }}>Commentaire (optionnel)</div>
            <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="Ajouter un commentaire pour l'agent…" rows={2}
              style={{ width:"100%", background:"#fff", border:"0.5px solid #E5E7EB", borderRadius:10, padding:"10px 12px", fontSize:14, color:"#111827", fontFamily:SF, outline:"none", boxSizing:"border-box", resize:"none" }} />
          </div>

          {/* Actions */}
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {(item.type==="urgent"||item.type==="action") && <>
              <PrimaryBtn onPress={()=>onResolve(item,"validated",comment)} color={ACCENT}>✓ Valider</PrimaryBtn>
              <SecBtn onPress={()=>onResolve(item,"revision",comment)} color="#F59E0B">↺ Demander une révision</SecBtn>
              <SecBtn onPress={()=>onResolve(item,"rejected",comment)} color="#EF4444">✕ Rejeter</SecBtn>
            </>}
            {item.type==="review" && <>
              <PrimaryBtn onPress={()=>onResolve(item,"approved",comment)} color={ACCENT}>✓ Lu et approuvé</PrimaryBtn>
              <SecBtn onPress={()=>onResolve(item,"commented",comment)} color="#6B7280">💬 Commenter seulement</SecBtn>
            </>}
            {item.type==="info" && <PrimaryBtn onPress={()=>onResolve(item,"acknowledged",comment)} color="#8B5CF6">Pris en compte</PrimaryBtn>}
            <button onClick={onClose} style={{ background:"none", border:"none", fontFamily:SF, fontSize:15, color:"#9CA3AF", cursor:"pointer", padding:"8px 0" }}>Plus tard</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── AGENT DETAIL ─────────────────────────────────────────────────────────────

function AgentDetail({ agent, agents, setAgents, onClose }) {
  const d   = DEPTS.find(x=>x.id===agent.dept) || DEPTS[0];
  const cur = Object.values(agents).flat().find(a=>a.id===agent.id) || agent;
  const [tab, setTab] = useState("apercu");
  const [showRun, setShowRun] = useState(false);
  const [runNote, setRunNote] = useState("");
  const owner = OWNERS.find(o=>o.id===cur.owner);

  const toggle = () => setAgents(prev=>{
    const n={};
    Object.keys(prev).forEach(dep=>{ n[dep]=prev[dep].map(a=>a.id===cur.id?{...a,active:!a.active,status:cur.active?"idle":"running"}:a); });
    return n;
  });

  const TABS = ["apercu","règles","connaissances","activités","paramètres"];

  const mockRuns = [
    { date:"16 jan. 09:15", task:"Analyse campagne Q4",    status:"running", progress:75, dur:"—"     },
    { date:"15 jan. 14:32", task:"Veille concurrentielle", status:"running", progress:100,dur:"10m 12s"},
    { date:"15 jan. 09:01", task:"Content planning Janv.", status:"running", progress:100,dur:"8m 45s" },
    { date:"14 jan. 16:40", task:"Rapport tendances 2025", status:"running", progress:100,dur:"15m 22s"},
    { date:"14 jan. 11:30", task:"Benchmark Q4",           status:"error",   progress:0,  dur:"—"     },
  ];

  return (
    <div style={{ position:"absolute", inset:0, zIndex:60, background:"#F9FAFB", display:"flex", flexDirection:"column" }}>
      {/* Nav */}
      <div style={{ padding:"14px 16px 0", background:"#fff", borderBottom:"0.5px solid #E5E7EB" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
          <button onClick={onClose} style={{ display:"flex", alignItems:"center", gap:4, background:"none", border:"none", cursor:"pointer", color:ACCENT, fontFamily:SF, fontSize:15, padding:0 }}>
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none"><path d="M7.5 1L1 7.5l6.5 6.5" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Retour
          </button>
          <div style={{ fontFamily:SF, fontSize:17, fontWeight:600, color:"#111827" }}>{cur.name}</div>
          <StatusPill status={cur.active?"running":cur.status} small />
        </div>
        <div style={{ display:"flex", gap:0, overflowX:"auto" }}>
          {TABS.map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{ fontFamily:SF, fontSize:13, fontWeight:tab===t?600:400, color:tab===t?ACCENT:"#6B7280", background:"none", border:"none", cursor:"pointer", padding:"8px 12px", borderBottom:tab===t?`2px solid ${ACCENT}`:"2px solid transparent", whiteSpace:"nowrap", textTransform:"capitalize", transition:"all 0.15s" }}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>
          ))}
        </div>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"16px 16px 20px" }}>

        {tab==="apercu" && (
          <>
            {/* Hero card */}
            <Card style={{ padding:"16px", marginBottom:12 }}>
              <div style={{ display:"flex", gap:14, marginBottom:14 }}>
                <AgentIcon name={cur.name} dept={cur.dept} size={52} />
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:SF, fontSize:17, fontWeight:700, color:"#111827", marginBottom:2 }}>{cur.name}</div>
                  <div style={{ fontFamily:SF, fontSize:13, color:"#6B7280", lineHeight:1.4 }}>{cur.desc}</div>
                </div>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:12, borderTop:"0.5px solid #F3F4F6" }}>
                <span style={{ fontFamily:SF, fontSize:14, fontWeight:500, color:"#374151" }}>Statut de l'agent</span>
                <IOSToggle on={cur.active} onToggle={toggle} color={d.color} />
              </div>
            </Card>

            {/* Current task */}
            {cur.status==="running" && cur.progress>0 && (
              <Card style={{ padding:"14px", marginBottom:12 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                  <div style={{ fontFamily:SF, fontSize:12, fontWeight:600, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:"0.04em" }}>Tâche en cours</div>
                  <span style={{ fontFamily:SF, fontSize:12, fontWeight:700, color:ACCENT }}>{cur.progress}%</span>
                </div>
                <div style={{ fontFamily:SF, fontSize:14, fontWeight:500, color:"#111827", marginBottom:8 }}>{cur.delivery[0]||"Traitement en cours…"}</div>
                <div style={{ height:6, background:"#F3F4F6", borderRadius:3, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${cur.progress}%`, background:ACCENT, borderRadius:3, transition:"width 0.5s" }} />
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
                  <span style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF" }}>Démarré {cur.lastRun}</span>
                  <span style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF" }}>{cur.triggeredBy||"Planifié"}</span>
                </div>
              </Card>
            )}

            {/* KPIs */}
            <Card style={{ padding:"14px", marginBottom:12 }}>
              <div style={{ fontFamily:SF, fontSize:12, fontWeight:600, color:"#9CA3AF", textTransform:"uppercase", marginBottom:12 }}>Synthèse (7 derniers jours)</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:0 }}>
                {[
                  { v:cur.runs,        l:"Runs",          delta:"+15%", col:"#6366F1" },
                  { v:cur.successRate+"%", l:"Taux succès", delta:"+5%",  col:"#10B981" },
                  { v:cur.avgTime,    l:"Temps moyen",   delta:"-8%",  col:"#F59E0B" },
                ].map((k,i,arr)=>(
                  <div key={k.l} style={{ textAlign:"center", padding:"0 8px", borderRight:i<arr.length-1?"0.5px solid #F3F4F6":"none" }}>
                    <div style={{ fontFamily:SF, fontSize:i===0?26:i===1?22:16, fontWeight:700, color:k.col, letterSpacing:"-0.03em", lineHeight:1 }}>{k.v}</div>
                    <div style={{ fontFamily:SF, fontSize:10, color:"#9CA3AF", marginTop:3 }}>{k.l}</div>
                    <div style={{ fontFamily:SF, fontSize:10, color:"#10B981", marginTop:2, fontWeight:600 }}>{k.delta}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Deliveries */}
            {cur.delivery.length>0 && (
              <Card style={{ marginBottom:12 }}>
                <div style={{ padding:"12px 14px 8px" }}>
                  <div style={{ fontFamily:SF, fontSize:12, fontWeight:600, color:"#9CA3AF", textTransform:"uppercase", marginBottom:10 }}>Derniers livrables</div>
                </div>
                {cur.delivery.map((f,i)=>(
                  <div key={i}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", cursor:"pointer" }}>
                      <ExtBadge filename={f} />
                      <span style={{ flex:1, fontFamily:SF, fontSize:14, color:"#111827" }}>{f}</span>
                      <span style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF" }}>{cur.lastRun}</span>
                    </div>
                    {i<cur.delivery.length-1 && <Divider indent={14} />}
                  </div>
                ))}
                <div style={{ padding:"10px 14px" }}>
                  <button style={{ background:"none", border:"none", cursor:"pointer", fontFamily:SF, fontSize:13, color:ACCENT, fontWeight:600, padding:0 }}>Voir tous les livrables →</button>
                </div>
              </Card>
            )}

            {/* Launch buttons */}
            <div style={{ display:"flex", gap:8, marginBottom:8 }}>
              <button onClick={()=>setShowRun(p=>!p)} style={{ flex:1, background:ACCENT, color:"#fff", border:"none", borderRadius:12, padding:"12px", fontFamily:SF, fontSize:14, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                ▶ Lancer manuellement
              </button>
              <button style={{ flex:1, background:"#fff", color:ACCENT, border:`1.5px solid ${ACCENT}30`, borderRadius:12, padding:"12px", fontFamily:SF, fontSize:14, fontWeight:600, cursor:"pointer" }}>
                Demander un run
              </button>
            </div>
            {showRun && (
              <Card style={{ padding:"14px", marginBottom:8 }}>
                <textarea value={runNote} onChange={e=>setRunNote(e.target.value)} placeholder={`Contexte pour ${cur.name}…`} rows={2}
                  style={{ width:"100%", background:"#F9FAFB", border:"0.5px solid #E5E7EB", borderRadius:10, padding:"10px 12px", fontSize:14, color:"#111827", fontFamily:SF, outline:"none", boxSizing:"border-box", resize:"none" }} />
                <div style={{ display:"flex", gap:8, marginTop:10 }}>
                  <SecBtn onPress={()=>setShowRun(false)} color="#6B7280" full={false}>Annuler</SecBtn>
                  <PrimaryBtn onPress={()=>setShowRun(false)} full={false}>Lancer</PrimaryBtn>
                </div>
              </Card>
            )}
          </>
        )}

        {tab==="activités" && (
          <>
            {/* Run KPIs */}
            <Card style={{ padding:"14px", marginBottom:12 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:0 }}>
                {[{v:cur.runs,l:"Runs (30j)",col:"#6366F1"},{v:cur.successRate+"%",l:"Taux succès",col:"#10B981"},{v:cur.avgTime,l:"Temps moyen",col:"#F59E0B"}].map((k,i,arr)=>(
                  <div key={k.l} style={{ textAlign:"center", padding:"0 8px", borderRight:i<arr.length-1?"0.5px solid #F3F4F6":"none" }}>
                    <div style={{ fontFamily:SF, fontSize:i===0?26:i===1?22:15, fontWeight:700, color:k.col }}>{k.v}</div>
                    <div style={{ fontFamily:SF, fontSize:10, color:"#9CA3AF", marginTop:3 }}>{k.l}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* History table */}
            <Card>
              <div style={{ padding:"12px 14px 6px" }}>
                <div style={{ fontFamily:SF, fontSize:12, fontWeight:600, color:"#9CA3AF", textTransform:"uppercase" }}>Historique des runs</div>
              </div>
              {mockRuns.map((r,i)=>{
                const sc = r.status==="running"?(r.progress===100?{label:"Succès",color:"#10B981"}:{label:"En cours",color:ACCENT}):{label:"Échec",color:"#EF4444"};
                return (
                  <div key={i}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px" }}>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontFamily:SF, fontSize:13, color:"#111827", fontWeight:500 }}>{r.task}</div>
                        <div style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF", marginTop:1 }}>{r.date}</div>
                      </div>
                      <span style={{ fontFamily:SF, fontSize:11, fontWeight:600, color:sc.color, background:sc.color+"14", borderRadius:6, padding:"2px 8px" }}>{sc.label}</span>
                      {r.progress===100 && <div style={{ width:40, height:6, background:"#F3F4F6", borderRadius:3, overflow:"hidden" }}><div style={{ height:"100%", width:`${r.progress}%`, background:sc.color, borderRadius:3 }} /></div>}
                      <span style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF", flexShrink:0, width:48, textAlign:"right" }}>{r.dur}</span>
                    </div>
                    {i<mockRuns.length-1 && <Divider indent={14} />}
                  </div>
                );
              })}
              <div style={{ padding:"10px 14px" }}>
                <button style={{ background:"none", border:"none", cursor:"pointer", fontFamily:SF, fontSize:13, color:ACCENT, fontWeight:600, padding:0 }}>Voir tout l'historique →</button>
              </div>
            </Card>
          </>
        )}

        {tab==="paramètres" && (
          <>
            <Card style={{ marginBottom:12 }}>
              <div style={{ padding:"14px 14px 8px" }}><div style={{ fontFamily:SF, fontSize:12, fontWeight:600, color:"#9CA3AF", textTransform:"uppercase" }}>Informations générales</div></div>
              {[
                { l:"Nom",    v:cur.name   },
                { l:"Mission",v:cur.mission},
                { l:"Modèle", v:cur.model  },
              ].map((r,i,arr)=>(
                <div key={r.l}>
                  <div style={{ display:"flex", justifyContent:"space-between", padding:"11px 14px" }}>
                    <span style={{ fontFamily:SF, fontSize:14, color:"#6B7280" }}>{r.l}</span>
                    <span style={{ fontFamily:SF, fontSize:14, color:"#111827", fontWeight:500 }}>{r.v}</span>
                  </div>
                  {i<arr.length-1 && <Divider indent={14} />}
                </div>
              ))}
            </Card>

            <Card style={{ marginBottom:12 }}>
              <div style={{ padding:"14px 14px 8px" }}><div style={{ fontFamily:SF, fontSize:12, fontWeight:600, color:"#9CA3AF", textTransform:"uppercase" }}>Owner</div></div>
              <div style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 14px" }}>
                <Avatar owner={cur.owner} size={36} />
                <div>
                  <div style={{ fontFamily:SF, fontSize:14, fontWeight:500, color:"#111827" }}>{owner?.name}</div>
                  <div style={{ fontFamily:SF, fontSize:12, color:"#9CA3AF" }}>Consultant Senior</div>
                </div>
              </div>
            </Card>

            <Card style={{ marginBottom:12 }}>
              <div style={{ padding:"14px 14px 8px" }}><div style={{ fontFamily:SF, fontSize:12, fontWeight:600, color:"#9CA3AF", textTransform:"uppercase" }}>Déclencheur</div></div>
              <div style={{ padding:"0 14px 14px" }}>
                <div style={{ background:`${ACCENT}10`, borderRadius:10, padding:"12px 14px", display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                  <span style={{ fontSize:18 }}>{cur.trigger==="Planifié"?"🕐":cur.trigger==="Événement"?"⚡":"👆"}</span>
                  <div>
                    <div style={{ fontFamily:SF, fontSize:14, fontWeight:500, color:"#111827" }}>Manuel et planifié</div>
                    <div style={{ fontFamily:SF, fontSize:12, color:"#6B7280" }}>Lancement manuel et selon un planning défini</div>
                  </div>
                </div>
                {cur.schedule && (
                  <div style={{ display:"flex", justifyContent:"space-between", background:"#F9FAFB", borderRadius:10, padding:"10px 14px" }}>
                    <div>
                      <div style={{ fontFamily:SF, fontSize:12, fontWeight:600, color:"#9CA3AF", marginBottom:2 }}>Schedule</div>
                      <div style={{ fontFamily:SF, fontSize:14, color:"#111827" }}>{cur.schedule}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontFamily:SF, fontSize:12, fontWeight:600, color:"#9CA3AF", marginBottom:2 }}>Prochain run</div>
                      <div style={{ fontFamily:SF, fontSize:14, color:ACCENT, fontWeight:600 }}>Dem. 07:30</div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <Card style={{ marginBottom:12 }}>
              <div style={{ padding:"14px 14px 8px" }}><div style={{ fontFamily:SF, fontSize:12, fontWeight:600, color:"#9CA3AF", textTransform:"uppercase" }}>Permissions & accès</div></div>
              {ALL_SOURCES.filter(s=>cur.files?.includes(s.id)).map((s,i,arr)=>(
                <div key={s.id}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px" }}>
                    <span style={{ fontSize:18 }}>{s.icon}</span>
                    <span style={{ flex:1, fontFamily:SF, fontSize:14, color:"#111827" }}>{s.name}</span>
                    <span style={{ fontFamily:SF, fontSize:11, color:"#10B981", fontWeight:600 }}>Connecté</span>
                  </div>
                  {i<arr.length-1 && <Divider indent={48} />}
                </div>
              ))}
              <div style={{ padding:"8px 14px 14px" }}>
                <button style={{ background:"none", border:"none", cursor:"pointer", fontFamily:SF, fontSize:13, color:ACCENT, fontWeight:600, padding:0 }}>Gérer les accès →</button>
              </div>
            </Card>

            <button style={{ width:"100%", padding:"13px", borderRadius:12, border:"none", background:"#FEF2F2", color:"#EF4444", fontFamily:SF, fontSize:15, fontWeight:600, cursor:"pointer" }}>
              Désactiver l'agent
            </button>
          </>
        )}

        {tab==="règles" && (
          <Card style={{ padding:"14px" }}>
            <div style={{ fontFamily:SF, fontSize:12, fontWeight:600, color:"#9CA3AF", textTransform:"uppercase", marginBottom:12 }}>Règles principales</div>
            {["Respecter la charte de marque iQo","S'appuyer sur des données fiables et à jour","Transparence sur les sources utilisées","Signaler toute anomalie détectée","Ne pas partager de données sensibles client"].map((r,i)=>(
              <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", padding:"8px 0", borderBottom:i<4?"0.5px solid #F9FAFB":"none" }}>
                <span style={{ background:`${ACCENT}14`, color:ACCENT, borderRadius:"50%", width:20, height:20, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:SF, fontSize:11, fontWeight:700, flexShrink:0, marginTop:1 }}>{i+1}</span>
                <span style={{ fontFamily:SF, fontSize:14, color:"#374151", lineHeight:1.5 }}>{r}</span>
              </div>
            ))}
          </Card>
        )}

        {tab==="connaissances" && (
          <>
            {/* Sources génériques */}
            <div style={{ fontFamily:SF, fontSize:12, fontWeight:600, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:"0.04em", marginBottom:8 }}>Sources génériques</div>
            <div style={{ fontFamily:SF, fontSize:12, color:"#6B7280", marginBottom:10, lineHeight:1.4 }}>Toujours accessibles — indépendantes de tout projet.</div>
            <Card style={{ marginBottom:16 }}>
              {ALL_SOURCES.filter(s=>s.scope==="generic").map((s,i,arr)=>{
                const connected = cur.files?.includes(s.id);
                const c=s.status==="ok"?"#10B981":s.status==="warn"?"#F59E0B":"#EF4444";
                return (
                  <div key={s.id}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 14px" }}>
                      <div style={{ width:34, height:34, borderRadius:9, background:connected?"#ECFDF5":"#F3F4F6", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, flexShrink:0 }}>{s.icon}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontFamily:SF, fontSize:14, fontWeight:500, color:"#111827" }}>{s.name}</div>
                        <div style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF" }}>{s.desc}</div>
                      </div>
                      <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
                        <IOSToggle on={connected} onToggle={()=>{}} color="#10B981" scale={0.75} />
                        {connected && <span style={{ fontFamily:SF, fontSize:9, color:c, fontWeight:600 }}>{s.status==="ok"?"●":s.status==="warn"?"⚠":"✕"} {s.status==="ok"?"OK":"Alerte"}</span>}
                      </div>
                    </div>
                    {i<arr.length-1 && <Divider indent={58} />}
                  </div>
                );
              })}
            </Card>

            {/* Sources projet */}
            <div style={{ fontFamily:SF, fontSize:12, fontWeight:600, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:"0.04em", marginBottom:8 }}>Sources projet</div>
            <div style={{ fontFamily:SF, fontSize:12, color:"#6B7280", marginBottom:10, lineHeight:1.4 }}>Accessibles uniquement dans le cadre d'un projet spécifique. L'agent y accède seulement si la source est activée sur le projet.</div>
            <Card style={{ marginBottom:12 }}>
              {ALL_SOURCES.filter(s=>s.scope==="project").map((s,i,arr)=>{
                const connected = cur.files?.includes(s.id);
                const c=s.status==="ok"?"#10B981":s.status==="warn"?"#F59E0B":"#EF4444";
                return (
                  <div key={s.id}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 14px" }}>
                      <div style={{ width:34, height:34, borderRadius:9, background:connected?`${ACCENT}12`:"#F3F4F6", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, flexShrink:0, opacity:connected?1:0.55 }}>{s.icon}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontFamily:SF, fontSize:14, fontWeight:500, color:connected?"#111827":"#9CA3AF" }}>{s.name}</div>
                        <div style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF" }}>{s.desc}</div>
                      </div>
                      <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
                        <IOSToggle on={connected} onToggle={()=>{}} color={ACCENT} scale={0.75} />
                        {connected && <span style={{ fontFamily:SF, fontSize:9, color:c, fontWeight:600 }}>{s.status==="ok"?"●":s.status==="warn"?"⚠":"✕"} {s.status==="ok"?"OK":"Alerte"}</span>}
                        {!connected && <span style={{ fontFamily:SF, fontSize:9, color:"#D1D5DB" }}>Non actif</span>}
                      </div>
                    </div>
                    {i<arr.length-1 && <Divider indent={58} />}
                  </div>
                );
              })}
            </Card>
            <div style={{ background:`${ACCENT}08`, borderRadius:10, padding:"10px 13px", border:`1px solid ${ACCENT}20` }}>
              <div style={{ fontFamily:SF, fontSize:12, color:ACCENT, lineHeight:1.5 }}>
                💡 Les sources projet sont activées depuis la fiche du projet concerné, dans l'onglet <strong>Sources de données</strong>.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── ACCUEIL SCREEN ───────────────────────────────────────────────────────────

function AccueilScreen({ agents, fil, onAgent, onFil, setActiveTab }) {
  const all     = Object.values(agents).flat();
  const pending = fil.filter(f=>!f.resolved);

  // À traiter counts — aligned with our 4 PRIO types
  const counts = {
    urgent: pending.filter(f=>f.type==="urgent").length,
    action: pending.filter(f=>f.type==="action").length,
    review: pending.filter(f=>f.type==="review").length,
    info:   pending.filter(f=>f.type==="info").length,
  };

  // Avancement global = moyenne des progressions projets actifs
  const activeProjects   = INIT_PROJETS.filter(p=>p.status==="running");
  const avgProgress      = Math.round(activeProjects.reduce((s,p)=>s+p.progress,0)/activeProjects.length);
  const prevProgress     = avgProgress - 8; // delta simulé
  const sparkRealized    = [30,38,42,48,51,54,58,62,65,68,70,avgProgress];
  const sparkForecast    = [null,null,null,null,null,null,null,null,null,null,avgProgress,avgProgress+4,avgProgress+7,avgProgress+10];

  // Projets à surveiller = retard ou risque élevé
  const projetsAlerte = INIT_PROJETS.filter(p=>p.travaux.late>2||p.travaux.blocked>0||p.travaux.risk>3);

  // Actions suggérées par l'IA
  const suggestions = [
    { icon:"👥", text:"Relancer 2 agents en attente de réponse depuis +24h", dept:"rh",      action:"Voir les agents"  },
    { icon:"📊", text:"Allouer des ressources supplémentaires sur BPCE - Transfo IA",        dept:"consulting", action:"Voir le projet"   },
    { icon:"⚡", text:"3 connecteurs sources à renouveler avant le 20 mai",                  dept:"it",         action:"Voir les sources" },
  ];

  // Activité récente
  const recentActivity = [
    { agent:"Intel Watcher",    dept:"consulting", msg:"Dashboard Veille S18 généré",         time:"Il y a 10 min" },
    { agent:"Slide Crafter",    dept:"consulting", msg:"Offre Covéa v2 finalisée",            time:"Il y a 30 min" },
    { agent:"Marketing Agent",  dept:"marketing",  msg:"Analyse campagne Q4 prête",           time:"Il y a 45 min" },
    { agent:"RH Agent",         dept:"rh",         msg:"Plan de formation 2025 soumis",       time:"Il y a 1 h"    },
  ];

  // Sparkline with dual series (realized + forecast dashed)
  const SparkDual = ({ w=320, h=40 }) => {
    const realized = [30,38,42,48,51,54,58,62,65,68,70,avgProgress];
    const forecast  = [null,null,null,null,null,null,null,null,null,avgProgress,avgProgress+3,avgProgress+6,avgProgress+9];
    const allVals   = [...realized, ...forecast.filter(Boolean)];
    const min=Math.min(...allVals), max=Math.max(...allVals), range=max-min||1;
    const xStep = (w-4)/(Math.max(realized.length, forecast.length)-1);
    const y = v => h-2-((v-min)/range)*(h-8)-1;
    const realPts  = realized.map((v,i)=>[2+i*xStep, y(v)]);
    const foreLen  = forecast.filter(Boolean).length;
    const foreStart= forecast.findIndex(v=>v!==null);
    const forePts  = forecast.map((v,i)=>v!=null?[2+i*xStep,y(v)]:null).filter(Boolean);
    const dReal = realPts.map((p,i)=>(i===0?"M":"L")+p[0].toFixed(1)+","+p[1].toFixed(1)).join(" ");
    const dFore = forePts.map((p,i)=>(i===0?"M":"L")+p[0].toFixed(1)+","+p[1].toFixed(1)).join(" ");
    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
        <path d={dReal} stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
        <path d={dFore} stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 3" opacity="0.5"/>
        {realPts.slice(-1).map(p=>(
          <circle key="dot" cx={p[0]} cy={p[1]} r="3.5" fill="#fff" opacity="0.9"/>
        ))}
      </svg>
    );
  };

  const hour = 10; // simulated — would be new Date().getHours()
  const greeting = hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir";

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"0 0 20px" }}>

      {/* ── Header avec avatar ── */}
      <div style={{ padding:"14px 16px 12px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          {/* Avatar */}
          <img src={AVATAR_RV} alt="Romain Villar" style={{ width:34, height:34, borderRadius:"50%", objectFit:"cover", flexShrink:0, display:"block" }}/>
          <div style={{ fontFamily:SF, fontSize:18, fontWeight:700, color:"#111827", letterSpacing:"-0.02em" }}>{greeting}, Romain 👋</div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button style={{ width:32, height:32, borderRadius:10, background:"#F3F4F6", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="8.5" r="6.5" stroke="#6B7280" strokeWidth="1.8"/><path d="M13.5 13.5L18 18" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </button>
          <button style={{ position:"relative", width:32, height:32, borderRadius:10, background:"#F3F4F6", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"/></svg>
            {pending.length>0 && <span style={{ position:"absolute", top:4, right:4, width:8, height:8, borderRadius:"50%", background:"#EF4444", border:"2px solid #F3F4F6" }} />}
          </button>
        </div>
      </div>

      <div style={{ padding:"0 16px" }}>

        {/* ── Recommandation du jour ── */}
        <div style={{ background:"linear-gradient(135deg,#4F46E5 0%,#7C3AED 60%,#6366F1 100%)", borderRadius:18, padding:"16px", marginBottom:16, position:"relative", overflow:"hidden" }}>
          {/* Logo watermark top-right */}
          <div style={{ position:"absolute", top:12, right:14, opacity:0.25 }}>
            <IqoLogo variant="icon" size={36} onDark={true} />
          </div>
          <div style={{ fontFamily:SF, fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.6)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>Recommandation du jour</div>
          <div style={{ fontFamily:SF, fontSize:14, fontWeight:600, color:"#fff", lineHeight:1.5, marginBottom:12, paddingRight:32 }}>
            EDF prend du retard sur la revue d'architecture. Relancez le Consulting Assistant pour débloquer.
          </div>
          <button style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.25)", borderRadius:10, padding:"7px 14px", fontFamily:SF, fontSize:13, fontWeight:600, color:"#fff", cursor:"pointer", backdropFilter:"blur(4px)" }}>
            Voir le détail →
          </button>
        </div>

        {/* ── À traiter ── */}
        <div style={{ marginBottom:16 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <span style={{ fontFamily:SF, fontSize:16, fontWeight:700, color:"#111827", letterSpacing:"-0.02em" }}>À traiter</span>
            <button onClick={()=>setActiveTab("fil")} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:SF, fontSize:13, color:ACCENT, fontWeight:600, padding:0 }}>
              Voir tout ({pending.length})
            </button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:8 }}>
            {[
              { key:"urgent", label:"Urgentes",  color:"#EF4444", bg:"#FEF2F2", count:counts.urgent },
              { key:"action", label:"À valider", color:"#F97316", bg:"#FFF7ED", count:counts.action },
              { key:"review", label:"À relire",  color:"#0EA5E9", bg:"#EFF6FF", count:counts.review },
              { key:"info",   label:"Info",      color:"#8B5CF6", bg:"#F5F3FF", count:counts.info   },
            ].map(c=>(
              <button key={c.key} onClick={()=>setActiveTab("fil")} style={{ background:c.bg, borderRadius:12, padding:"10px 6px", border:`1px solid ${c.color}20`, cursor:"pointer", textAlign:"center" }}>
                <div style={{ fontFamily:SF, fontSize:22, fontWeight:700, color:c.color, letterSpacing:"-0.04em", lineHeight:1 }}>{c.count}</div>
                <div style={{ fontFamily:SF, fontSize:10, fontWeight:600, color:c.color, marginTop:3, lineHeight:1.2 }}>{c.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Avancement global ── */}
        <div style={{ marginBottom:16 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <span style={{ fontFamily:SF, fontSize:16, fontWeight:700, color:"#111827", letterSpacing:"-0.02em" }}>Avancement global</span>
            <button onClick={()=>setActiveTab("projets")} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:SF, fontSize:13, color:ACCENT, fontWeight:600, padding:0 }}>Voir le détail</button>
          </div>
          <div style={{ background:"linear-gradient(135deg,#4F46E5 0%,#6366F1 100%)", borderRadius:18, padding:"16px", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:-20, right:-20, width:100, height:100, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }} />
            <div style={{ display:"flex", alignItems:"center", gap:16 }}>
              {/* Donut blanc */}
              <div style={{ position:"relative", width:64, height:64, flexShrink:0 }}>
                <svg width={64} height={64} viewBox="0 0 64 64">
                  <circle cx={32} cy={32} r={22} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="6"/>
                  <circle cx={32} cy={32} r={22} fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round"
                    strokeDasharray={`${2*Math.PI*22*avgProgress/100} ${2*Math.PI*22*(1-avgProgress/100)}`}
                    strokeDashoffset={2*Math.PI*22*0.25} />
                </svg>
                <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontFamily:SF, fontSize:14, fontWeight:700, color:"#fff", lineHeight:1 }}>{avgProgress}%</span>
                </div>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:SF, fontSize:11, color:"rgba(255,255,255,0.65)", marginBottom:6 }}>
                  Avancement moyen des projets actifs
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:10 }}>
                  <span style={{ fontFamily:SF, fontSize:12, fontWeight:700, color:"#A7F3D0", background:"rgba(16,185,129,0.2)", borderRadius:8, padding:"2px 8px" }}>+8% vs hier</span>
                </div>
                {/* Légende sparkline */}
                <div style={{ display:"flex", gap:12 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                    <div style={{ width:12, height:2, background:"rgba(255,255,255,0.9)", borderRadius:1 }} />
                    <span style={{ fontFamily:SF, fontSize:10, color:"rgba(255,255,255,0.65)" }}>Réalisé</span>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                    <div style={{ width:12, height:2, background:"rgba(255,255,255,0.5)", borderRadius:1, backgroundImage:"repeating-linear-gradient(90deg,rgba(255,255,255,0.5) 0,rgba(255,255,255,0.5) 3px,transparent 3px,transparent 6px)" }} />
                    <span style={{ fontFamily:SF, fontSize:10, color:"rgba(255,255,255,0.5)" }}>Prévisionnel</span>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop:12 }}>
              <SparkDual w={328} h={38} />
            </div>
          </div>
        </div>

        {/* ── Projets à surveiller ── */}
        {projetsAlerte.length > 0 && (
          <div style={{ marginBottom:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
              <span style={{ fontFamily:SF, fontSize:16, fontWeight:700, color:"#111827", letterSpacing:"-0.02em" }}>Projets à surveiller</span>
              <button onClick={()=>setActiveTab("projets")} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:SF, fontSize:13, color:ACCENT, fontWeight:600, padding:0 }}>Voir tout</button>
            </div>
            <Card>
              {projetsAlerte.map((p,i)=>{
                const isLate    = p.travaux.late > 2;
                const isRisk    = p.travaux.risk > 2;
                const isBlocked = p.travaux.blocked > 0;
                const badge     = isBlocked ? { label:"Bloqué",    color:"#EF4444", bg:"#FEF2F2" }
                                : isLate    ? { label:"En retard", color:"#F59E0B", bg:"#FEF3C7" }
                                :             { label:"À risque",  color:"#F97316", bg:"#FFF7ED" };
                return (
                  <div key={p.id}>
                    <div style={{ display:"flex", alignItems:"center", gap:11, padding:"12px 14px", cursor:"pointer" }}>
                      <div style={{ width:36, height:36, borderRadius:10, background:p.color+"18", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{p.logo}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontFamily:SF, fontSize:14, fontWeight:600, color:"#111827", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.name}</div>
                        <div style={{ height:4, background:"#F3F4F6", borderRadius:2, marginTop:5, overflow:"hidden" }}>
                          <div style={{ height:"100%", width:`${p.progress}%`, background:`linear-gradient(90deg,${p.color},${p.color}cc)`, borderRadius:2 }} />
                        </div>
                      </div>
                      <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4, flexShrink:0, marginLeft:8 }}>
                        <span style={{ fontFamily:SF, fontSize:11, fontWeight:700, color:badge.color, background:badge.bg, borderRadius:7, padding:"2px 8px" }}>{badge.label}</span>
                        <span style={{ fontFamily:SF, fontSize:12, fontWeight:700, color:"#374151" }}>{p.progress}%</span>
                      </div>
                    </div>
                    {i<projetsAlerte.length-1 && <Divider indent={61} />}
                  </div>
                );
              })}
            </Card>
          </div>
        )}

        {/* ── Actions suggérées ── */}
        <div style={{ marginBottom:16 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <div>
              <span style={{ fontFamily:SF, fontSize:16, fontWeight:700, color:"#111827", letterSpacing:"-0.02em" }}>Actions suggérées</span>
              <span style={{ marginLeft:7, fontFamily:SF, fontSize:10, fontWeight:700, color:ACCENT, background:`${ACCENT}14`, borderRadius:6, padding:"2px 7px", letterSpacing:"0.04em" }}>IA</span>
            </div>
          </div>
          <Card>
            {suggestions.map((s,i)=>{
              const d = DEPTS.find(x=>x.id===s.dept)||DEPTS[0];
              return (
                <div key={i}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 14px", cursor:"pointer" }}>
                    <div style={{ width:36, height:36, borderRadius:10, background:d.light, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{s.icon}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontFamily:SF, fontSize:13, color:"#111827", lineHeight:1.45 }}>{s.text}</div>
                    </div>
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" style={{ flexShrink:0 }}><path d="M1 1l5 5-5 5" stroke="#C7C7CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  {i<suggestions.length-1 && <Divider indent={62} />}
                </div>
              );
            })}
          </Card>
        </div>

        {/* ── Activité récente ── */}
        <div style={{ marginBottom:4 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <span style={{ fontFamily:SF, fontSize:16, fontWeight:700, color:"#111827", letterSpacing:"-0.02em" }}>Activité récente</span>
            <button style={{ background:"none", border:"none", cursor:"pointer", fontFamily:SF, fontSize:13, color:ACCENT, fontWeight:600, padding:0 }}>Voir tout</button>
          </div>
          <Card>
            {recentActivity.map((a,i,arr)=>(
              <div key={i}>
                <div onClick={()=>{ const ag=Object.values(agents).flat().find(x=>x.name===a.agent); if(ag) onAgent(ag); }} style={{ display:"flex", alignItems:"center", gap:11, padding:"11px 14px", cursor:"pointer" }}>
                  <AgentIcon name={a.agent} dept={a.dept} size={34} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontFamily:SF, fontSize:13, fontWeight:500, color:"#111827" }}>{a.agent}</div>
                    <div style={{ fontFamily:SF, fontSize:12, color:"#9CA3AF", marginTop:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.msg}</div>
                  </div>
                  <span style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF", flexShrink:0 }}>{a.time}</span>
                </div>
                {i<arr.length-1 && <Divider indent={59} />}
              </div>
            ))}
          </Card>
        </div>

      </div>
    </div>
  );
}

// ─── AGENTS SCREEN ────────────────────────────────────────────────────────────

function AgentsScreen({ agents, setAgents, onAgent }) {
  const [search, setSearch] = useState("");
  const all = Object.values(agents).flat();
  const toggle = id => setAgents(prev=>{ const n={}; Object.keys(prev).forEach(dep=>{ n[dep]=prev[dep].map(a=>a.id===id?{...a,active:!a.active}:a); }); return n; });

  const filtered = search
    ? all.filter(a=>[a.name,a.desc,(DEPTS.find(d=>d.id===a.dept)||{}).label||""].some(s=>s.toLowerCase().includes(search.toLowerCase())))
    : all;

  const groups = DEPTS.map(d=>({ dept:d, items:filtered.filter(a=>a.dept===d.id) })).filter(g=>g.items.length>0);

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", minHeight:0 }}>
      <div style={{ padding:"16px 16px 0", flexShrink:0 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <div style={{ fontFamily:SF, fontSize:22, fontWeight:700, color:"#111827", letterSpacing:"-0.02em" }}>Agents</div>
          <span style={{ fontFamily:SF, fontSize:13, color:"#9CA3AF" }}>{all.filter(a=>a.active).length} actifs / {all.length}</span>
        </div>
        <div style={{ marginBottom:12 }}>
          <SearchBar value={search} onChange={setSearch} placeholder="Rechercher un agent…" />
        </div>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"4px 16px 20px" }}>
        {groups.map(({ dept: d, items }) => (
          <div key={d.id} style={{ marginBottom:18 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <div style={{ width:26, height:26, borderRadius:8, background:d.light, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>{d.emoji}</div>
              <span style={{ fontFamily:SF, fontSize:13, fontWeight:700, color:d.color }}>{d.label}</span>
              <span style={{ fontFamily:SF, fontSize:12, color:"#C7C7CC" }}>· {items.length}</span>
              <div style={{ flex:1, height:"0.5px", background:"#F3F4F6" }} />
            </div>
            <Card>
              {items.map((a, i) => (
                <div key={a.id}>
                  <div onClick={()=>onAgent(a)} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", cursor:"pointer" }}>
                    <AgentIcon name={a.name} dept={a.dept} size={40} />
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontFamily:SF, fontSize:14, fontWeight:500, color:"#111827" }}>{a.name}</div>
                      <div style={{ fontFamily:SF, fontSize:12, color:"#9CA3AF", marginTop:2, display:"flex", alignItems:"center", gap:5 }}>
                        <StatusPill status={a.active?a.status:"idle"} small />
                        <span style={{ color:"#D1D5DB" }}>·</span>
                        <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:130 }}>{a.desc}</span>
                      </div>
                      {a.status==="running" && a.progress>0 && (
                        <div style={{ height:3, background:"#F3F4F6", borderRadius:2, marginTop:5, overflow:"hidden" }}>
                          <div style={{ height:"100%", width:`${a.progress}%`, background:d.color, borderRadius:2 }} />
                        </div>
                      )}
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6 }}>
                      {a.notif>0 && <span style={{ background:"#EF4444", color:"#fff", fontSize:10, fontFamily:SF, fontWeight:700, borderRadius:20, minWidth:18, height:18, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 4px" }}>{a.notif}</span>}
                      <IOSToggle on={a.active} onToggle={()=>toggle(a.id)} color={d.color} scale={0.8} />
                    </div>
                  </div>
                  {i < items.length-1 && <Divider indent={66} />}
                </div>
              ))}
            </Card>
          </div>
        ))}

        {filtered.length===0 && (
          <div style={{ textAlign:"center", padding:"48px 20px", color:"#9CA3AF", fontFamily:SF, fontSize:14 }}>Aucun agent correspondant</div>
        )}

        <button style={{ width:"100%", padding:"13px", borderRadius:12, border:"1.5px dashed #D1D5DB", background:"transparent", color:ACCENT, fontFamily:SF, fontSize:14, fontWeight:600, cursor:"pointer", marginTop:4 }}>
          + Créer un agent
        </button>
      </div>
    </div>
  );
}

// ─── SERVICES SCREEN ─────────────────────────────────────────────────────────

function ServicesScreen({ agents, onAgent, onDept }) {
  const [search, setSearch] = useState("");
  const depts = DEPTS.filter(d=>!search||d.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", minHeight:0 }}>
      <div style={{ padding:"16px 16px 0", flexShrink:0 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <div>
            <div style={{ fontFamily:SF, fontSize:22, fontWeight:700, color:"#111827", letterSpacing:"-0.02em" }}>Services</div>
            <div style={{ fontFamily:SF, fontSize:13, color:"#9CA3AF" }}>Vue d'ensemble par service</div>
          </div>
          <button style={{ width:34, height:34, borderRadius:10, background:"#F3F4F6", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>+</button>
        </div>
        <div style={{ marginBottom:12 }}><SearchBar value={search} onChange={setSearch} placeholder="Rechercher un service…" /></div>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"4px 16px 100px" }}>
        {depts.map(d=>{
          const list=agents[d.id]||[];
          const run=list.filter(a=>a.status==="running").length;
          const wait=list.filter(a=>a.status==="waiting").length;
          const err=list.filter(a=>a.status==="error").length;
          const pct=list.length>0?Math.round(list.filter(a=>a.active).length/list.length*100):0;
          const health=err>0?"Attention":wait>=2?"À surveiller":"Sain";
          const hc=err>0?"#EF4444":wait>=2?"#F59E0B":"#10B981";
          const spark=[30,45,38,52,48,60,65,58,pct,pct-5,pct+3,pct];

          return (
            <Card key={d.id} onClick={()=>onDept(d.id)} style={{ padding:"16px", marginBottom:12, cursor:"pointer" }}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:14 }}>
                <div style={{ width:44, height:44, borderRadius:13, background:d.light, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{d.emoji}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                    <div>
                      <div style={{ fontFamily:SF, fontSize:16, fontWeight:700, color:"#111827" }}>{d.label}</div>
                      <div style={{ fontFamily:SF, fontSize:12, color:"#9CA3AF", marginTop:1 }}>{list.length} agents</div>
                    </div>
                    <span style={{ fontFamily:SF, fontSize:11, fontWeight:700, color:hc, background:hc+"14", borderRadius:8, padding:"3px 9px" }}>{health}</span>
                  </div>
                </div>
              </div>

              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", gap:16, marginBottom:6 }}>
                    {[{v:run,l:"En cours",c:"#10B981"},{v:wait,l:"En attente",c:"#F59E0B"},{v:err,l:"En erreur",c:"#EF4444"}].map(k=>(
                      <div key={k.l}>
                        <div style={{ fontFamily:SF, fontSize:20, fontWeight:700, color:k.c, letterSpacing:"-0.03em" }}>{k.v}</div>
                        <div style={{ fontFamily:SF, fontSize:10, color:"#9CA3AF" }}>{k.l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ height:4, background:"#F3F4F6", borderRadius:2, overflow:"hidden" }}>
                    <div style={{ display:"flex", height:"100%" }}>
                      <div style={{ width:`${run/list.length*100}%`, background:"#10B981", transition:"width 0.5s" }} />
                      <div style={{ width:`${wait/list.length*100}%`, background:"#F59E0B", transition:"width 0.5s" }} />
                      <div style={{ width:`${err/list.length*100}%`, background:"#EF4444", transition:"width 0.5s" }} />
                    </div>
                  </div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
                  <Donut pct={pct} size={48} />
                  <span style={{ fontFamily:SF, fontSize:9, color:"#9CA3AF" }}>Santé</span>
                </div>
              </div>

              {/* Sparkline */}
              <div style={{ borderTop:"0.5px solid #F9FAFB", paddingTop:10 }}>
                <Sparkline data={spark} color={d.color} w={340} h={28} />
              </div>
            </Card>
          );
        })}
        <button style={{ width:"100%", padding:"13px", borderRadius:12, border:"1.5px dashed #D1D5DB", background:"transparent", color:ACCENT, fontFamily:SF, fontSize:14, fontWeight:600, cursor:"pointer" }}>
          + Ajouter un service
        </button>
      </div>
    </div>
  );
}

// ─── FIL SCREEN ───────────────────────────────────────────────────────────────

function FilScreen({ fil, setFil, onAction }) {
  const [filter, setFilter] = useState("all");
  const pending  = fil.filter(f=>!f.resolved);
  const resolved = fil.filter(f=>f.resolved);

  const counts = {
    all:pending.length,
    urgent:pending.filter(f=>f.type==="urgent").length,
    action:pending.filter(f=>f.type==="action").length,
    review:pending.filter(f=>f.type==="review").length,
    info:pending.filter(f=>f.type==="info").length,
  };
  const options = [
    { id:"all",    label:"Tout",      count:counts.all    },
    { id:"urgent", label:"Urgent",    count:counts.urgent },
    { id:"action", label:"À valider", count:counts.action },
    { id:"review", label:"À relire",  count:counts.review },
    { id:"info",   label:"Info",      count:counts.info   },
  ];

  let shown = filter==="all" ? pending : pending.filter(f=>f.type===filter);
  shown = [...shown].sort((a,b)=>(PRIO[a.type]?.order||9)-(PRIO[b.type]?.order||9));

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", minHeight:0 }}>
      <div style={{ padding:"16px 16px 0", flexShrink:0 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <div>
            <div style={{ fontFamily:SF, fontSize:22, fontWeight:700, color:"#111827", letterSpacing:"-0.02em" }}>Fil</div>
            <div style={{ fontFamily:SF, fontSize:13, color:"#9CA3AF" }}>Vos actions à traiter</div>
          </div>
          <button style={{ width:34, height:34, borderRadius:10, background:"#F3F4F6", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>⚙</button>
        </div>
        <FilterChips options={options} value={filter} onChange={setFilter} colored />
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"12px 16px 20px" }}>
        {shown.length===0 && (
          <div style={{ textAlign:"center", padding:"60px 20px" }}>
            <div style={{ fontSize:48, marginBottom:12 }}>✓</div>
            <div style={{ fontFamily:SF, fontSize:17, fontWeight:600, color:"#111827", marginBottom:6 }}>Tout est traité</div>
            <div style={{ fontFamily:SF, fontSize:14, color:"#9CA3AF" }}>Aucune action en attente</div>
          </div>
        )}

        {/* Group by priority */}
        {(filter==="all" ? Object.keys(PRIO) : [filter]).map(pKey=>{
          const items = shown.filter(f=>f.type===pKey);
          if(!items.length) return null;
          const p=PRIO[pKey];
          return (
            <div key={pKey} style={{ marginBottom:16 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                <span style={{ fontFamily:SF, fontSize:11, fontWeight:700, color:p.color, textTransform:"uppercase", letterSpacing:"0.06em" }}>{p.label}</span>
                <span style={{ background:p.color, color:"#fff", fontSize:10, fontFamily:SF, fontWeight:700, borderRadius:20, minWidth:18, height:18, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 4px" }}>{items.length}</span>
                <div style={{ flex:1, height:"0.5px", background:"#F3F4F6" }} />
              </div>
              <Card>
                {items.map((item,i)=>(
                  <div key={item.id}>
                    <div style={{ display:"flex", gap:0, position:"relative" }}>
                      <div style={{ width:4, background:p.color, flexShrink:0, borderRadius:"4px 0 0 4px" }} />
                      <div style={{ flex:1, padding:"13px 13px" }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
                          <div style={{ flex:1, minWidth:0 }}>
                            {/* Primary: what needs to be done — context + action */}
                            <div style={{ fontFamily:SF, fontSize:14, fontWeight:600, color:"#111827", marginBottom:3, lineHeight:1.35 }}>
                              {item.context} — {item.msg}
                            </div>
                            {/* Secondary: who produced it + service */}
                            <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:5 }}>
                              <AgentIcon name={item.agent} dept={item.dept} size={16} />
                              <span style={{ fontFamily:SF, fontSize:12, color:"#9CA3AF" }}>{item.agent}</span>
                              <DeptTag dept={item.dept} />
                            </div>
                            {/* Detail */}
                            <div style={{ fontFamily:SF, fontSize:13, color:"#6B7280", lineHeight:1.4, marginBottom:6 }}>{item.detail.slice(0,90)}…</div>
                            {item.file && <div style={{ display:"flex", alignItems:"center", gap:5 }}><ExtBadge filename={item.file} /><span style={{ fontFamily:SF, fontSize:12, color:"#6B7280" }}>{item.file}</span></div>}
                          </div>
                          <div style={{ textAlign:"right", flexShrink:0, marginLeft:10 }}>
                            <div style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF" }}>{item.time}</div>
                            {item.deadline && <div style={{ fontFamily:SF, fontSize:10, color:"#EF4444", fontWeight:700, marginTop:2 }}>⏱ {item.deadline}</div>}
                          </div>
                        </div>
                        <div style={{ display:"flex", gap:8 }}>
                          <button onClick={()=>onAction(item)} style={{ flex:1, background:p.color, color:"#fff", border:"none", borderRadius:9, padding:"8px 12px", fontFamily:SF, fontSize:13, fontWeight:700, cursor:"pointer" }}>
                            {p.action} →
                          </button>
                          <button onClick={()=>setFil(prev=>prev.map(f=>f.id===item.id?{...f,resolved:true,action:"later"}:f))} style={{ background:"#F3F4F6", color:"#6B7280", border:"none", borderRadius:9, padding:"8px 12px", fontFamily:SF, fontSize:13, fontWeight:600, cursor:"pointer" }}>
                            Plus tard
                          </button>
                        </div>
                      </div>
                    </div>
                    {i<items.length-1 && <Divider indent={17} />}
                  </div>
                ))}
              </Card>
            </div>
          );
        })}

        {/* Resolved */}
        {resolved.length>0 && filter==="all" && (
          <div style={{ marginTop:8 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <span style={{ fontFamily:SF, fontSize:11, fontWeight:600, color:"#9CA3AF", textTransform:"uppercase" }}>Traités · {resolved.length}</span>
              <div style={{ flex:1, height:"0.5px", background:"#F3F4F6" }} />
            </div>
            <Card>
              {resolved.map((item,i)=>(
                <div key={item.id}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 14px", opacity:0.55 }}>
                    <AgentIcon name={item.agent} dept={item.dept} size={28} />
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontFamily:SF, fontSize:13, color:"#374151", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.msg} — {item.agent}</div>
                    </div>
                    <span style={{ fontFamily:SF, fontSize:11, color:"#10B981", fontWeight:600 }}>✓</span>
                  </div>
                  {i<resolved.length-1 && <Divider indent={52} />}
                </div>
              ))}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ADMIN SCREEN ─────────────────────────────────────────────────────────────

function AdminScreen({ agents, setAgents, onToggleView }) {
  const all    = Object.values(agents).flat();
  const toggle = id => setAgents(prev=>{ const n={}; Object.keys(prev).forEach(dep=>{ n[dep]=prev[dep].map(a=>a.id===id?{...a,active:!a.active}:a); }); return n; });

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", minHeight:0 }}>
      <div style={{ flex:1, overflowY:"auto", padding:"0 16px 20px" }}>

        {/* Page title */}
        <div style={{ padding:"20px 0 6px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ fontFamily:SF, fontSize:28, fontWeight:700, color:"#111827", letterSpacing:"-0.03em" }}>Administration</div>
          {onToggleView && (
            <button onClick={onToggleView} title="Basculer vers la vue desktop" style={{ width:36, height:36, borderRadius:10, background:`${ACCENT}12`, border:`1.5px solid ${ACCENT}30`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="4" width="20" height="14" rx="2" stroke={ACCENT} strokeWidth="1.8"/>
                <path d="M8 20h8M12 18v2" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M7 9h10M7 12h6" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
              </svg>
            </button>
          )}
        </div>

        {/* ── Gestion de l'application ── */}
        <div style={{ marginBottom:24 }}>
          <div style={{ fontFamily:SF, fontSize:13, fontWeight:600, color:"#6B7280", letterSpacing:"0.01em", marginBottom:8, paddingLeft:4 }}>Gestion de l'application</div>
          <Card>
            {[
              { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke={ACCENT} strokeWidth="1.8"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke={ACCENT} strokeWidth="1.8"/></svg>, label:"Paramètres généraux", sub:null, badge:null },
              { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke={ACCENT} strokeWidth="1.8"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round"/></svg>, label:"Utilisateurs & rôles", sub:null, badge:null },
              { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="9" height="14" rx="1.5" stroke={ACCENT} strokeWidth="1.8"/><rect x="13" y="3" width="9" height="18" rx="1.5" stroke={ACCENT} strokeWidth="1.8"/></svg>, label:"Services", sub:null, badge:null },
              { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="7" r="4" stroke={ACCENT} strokeWidth="1.8"/><path d="M2 21c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round"/><path d="M19 8v6M22 11h-6" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round"/></svg>, label:"Agents", sub:`${all.length} agents · ${all.filter(a=>a.active).length} actifs`, badge:null },
              { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="5" rx="9" ry="3" stroke={ACCENT} strokeWidth="1.8"/><path d="M21 12c0 1.657-4.03 3-9 3s-9-1.343-9-3M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round"/></svg>, label:"Sources de données", sub:`${ALL_SOURCES.filter(s=>s.status==="ok").length}/${ALL_SOURCES.length} connectées`, badge:ALL_SOURCES.filter(s=>s.status!=="ok").length>0?{v:ALL_SOURCES.filter(s=>s.status!=="ok").length,c:"#F59E0B"}:null },
              { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, label:"Sécurité & conformité", sub:null, badge:null },
              { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round"/><polyline points="14 2 14 8 20 8" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round"/><line x1="16" y1="13" x2="8" y2="13" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round"/><line x1="16" y1="17" x2="8" y2="17" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round"/><polyline points="10 9 9 9 8 9" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round"/></svg>, label:"Audit logs", sub:null, badge:null },
            ].map((item, i, arr) => (
              <div key={item.label}>
                <div style={{ display:"flex", alignItems:"center", gap:14, padding:"13px 16px", cursor:"pointer" }}>
                  <div style={{ width:32, height:32, borderRadius:8, background:`${ACCENT}12`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    {item.icon}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontFamily:SF, fontSize:15, color:"#111827", fontWeight:400 }}>{item.label}</div>
                    {item.sub && <div style={{ fontFamily:SF, fontSize:12, color:"#9CA3AF", marginTop:1 }}>{item.sub}</div>}
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    {item.badge && (
                      <div style={{ background:item.badge.c, color:"#fff", fontSize:11, fontFamily:SF, fontWeight:700, borderRadius:20, minWidth:20, height:20, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 6px" }}>{item.badge.v}</div>
                    )}
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M1 1l5 5-5 5" stroke="#C7C7CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
                {i < arr.length - 1 && <Divider indent={62} />}
              </div>
            ))}
          </Card>
        </div>

        {/* ── Informations ── */}
        <div style={{ marginBottom:16 }}>
          <div style={{ fontFamily:SF, fontSize:13, fontWeight:600, color:"#6B7280", marginBottom:8, paddingLeft:4 }}>Informations</div>
          <Card>
            {[
              { l:"Version",       v:"1.4.2"       },
              { l:"Environnement", v:"Production"  },
            ].map((r, i, arr) => (
              <div key={r.l}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"13px 16px" }}>
                  <span style={{ fontFamily:SF, fontSize:15, color:"#111827" }}>{r.l}</span>
                  <span style={{ fontFamily:SF, fontSize:14, color:"#9CA3AF" }}>{r.v}</span>
                </div>
                {i < arr.length - 1 && <Divider indent={16} />}
              </div>
            ))}
          </Card>
        </div>

      </div>
    </div>
  );
}

// ─── DEPT DETAIL ──────────────────────────────────────────────────────────────

function DeptDetail({ deptId, agents, setAgents, onAgent, onBack }) {
  const d = DEPTS.find(x=>x.id===deptId);
  const list = agents[deptId]||[];
  const toggle = id => setAgents(prev=>({...prev,[deptId]:prev[deptId].map(a=>a.id===id?{...a,active:!a.active}:a)}));

  return (
    <div style={{ position:"absolute", inset:0, zIndex:50, background:"#F9FAFB", display:"flex", flexDirection:"column" }}>
      <div style={{ padding:"14px 16px 12px", background:"#fff", borderBottom:"0.5px solid #E5E7EB", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <button onClick={onBack} style={{ display:"flex", alignItems:"center", gap:4, background:"none", border:"none", cursor:"pointer", color:ACCENT, fontFamily:SF, fontSize:15, padding:0 }}>
          <svg width="9" height="15" viewBox="0 0 9 15" fill="none"><path d="M7.5 1L1 7.5l6.5 6.5" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Retour
        </button>
        <div style={{ fontFamily:SF, fontSize:17, fontWeight:600, color:"#111827" }}>{d.label}</div>
        <div style={{ fontFamily:SF, fontSize:13, color:"#9CA3AF" }}>{list.filter(a=>a.active).length} actifs</div>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"16px 16px 20px" }}>
        {/* Hero */}
        <div style={{ background:`linear-gradient(135deg,${d.color},${d.dark})`, borderRadius:18, padding:"20px", marginBottom:16, position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-20, right:-20, width:90, height:90, borderRadius:"50%", background:"rgba(255,255,255,0.1)" }} />
          <div style={{ fontSize:36, marginBottom:8 }}>{d.emoji}</div>
          <div style={{ fontFamily:SF, fontSize:20, fontWeight:700, color:"#fff", marginBottom:8 }}>{d.label}</div>
          <div style={{ display:"flex", gap:20 }}>
            {[{v:list.length,l:"Agents"},{v:list.filter(a=>a.active).length,l:"Actifs"},{v:list.filter(a=>a.status==="waiting").length,l:"En attente"}].map(k=>(
              <div key={k.l}><div style={{ fontFamily:SF, fontSize:20, fontWeight:700, color:"#fff" }}>{k.v}</div><div style={{ fontFamily:SF, fontSize:11, color:"rgba(255,255,255,0.75)" }}>{k.l}</div></div>
            ))}
          </div>
        </div>
        <Card>
          {list.map((a,i)=>(
            <div key={a.id}>
              <div onClick={()=>onAgent(a)} style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 14px", cursor:"pointer" }}>
                <AgentIcon name={a.name} dept={deptId} size={40} />
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:SF, fontSize:15, fontWeight:500, color:"#111827" }}>{a.name}</div>
                  <div style={{ fontFamily:SF, fontSize:13, color:"#9CA3AF", display:"flex", alignItems:"center", gap:5, marginTop:2 }}>
                    <StatusPill status={a.status} small />
                    <span>· {a.lastRun}</span>
                  </div>
                  {a.status==="running" && a.progress>0 && (
                    <div style={{ height:3, background:"#F3F4F6", borderRadius:2, marginTop:6, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${a.progress}%`, background:d.color, borderRadius:2 }} />
                    </div>
                  )}
                </div>
                {a.notif>0 && <span style={{ background:"#EF4444", color:"#fff", fontSize:11, fontFamily:SF, fontWeight:700, borderRadius:20, minWidth:18, height:18, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 5px" }}>{a.notif}</span>}
                <IOSToggle on={a.active} onToggle={()=>toggle(a.id)} color={d.color} />
              </div>
              {i<list.length-1 && <Divider indent={66} />}
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── PROJETS DATA ─────────────────────────────────────────────────────────────

const INIT_PROJETS = [
  {
    id:"p1", name:"EDF - Architecture SI", client:"EDF", status:"running",
    color:"#F97316", logo:"⚡", owner:"romain",
    progress:68, travaux:{ total:35, done:24, late:2, risk:3, blocked:1 },
    agents:["co-1","co-2","co-4","mk-2","rh-1"], deadline:"30 juin 2025",
    nextStep:"Revue d'architecture cible", period:"Janv. 2025 – Juin 2025",
    desc:"Accompagnement sur la définition de la cible d'architecture SI et la rationalisation du portefeuille applicatif.",
    sources:["f1","f2","f3","f6"],
    sharepoint_folders:[
      { id:"sp1", name:"EDF / Architecture SI / Livrables", url:"https://iqo.sharepoint.com/sites/edf/archi" },
      { id:"sp2", name:"EDF / Architecture SI / Réunions",  url:"https://iqo.sharepoint.com/sites/edf/meetings" },
    ],
    rapports:[
      { name:"Rapport d'avancement - Mai 2025", date:"15 mai 2025", type:"PDF" },
      { name:"Synthèse des risques",            date:"12 mai 2025", type:"PDF" },
      { name:"Tableau de bord projet",          date:"10 mai 2025", type:"PBI" },
      { name:"Plan d'actions",                  date:"8 mai 2025",  type:"PDF" },
    ],
    activites:[
      { time:"10:30", msg:"Mise à jour avancement", detail:"Avancement global passé à 68%", agent:"co-1", type:"info"   },
      { time:"09:15", msg:"Nouveau travail terminé", detail:"Cartographie applicative",      agent:"co-2", type:"ok"     },
      { time:"Hier",  msg:"Risque identifié",        detail:"Dépendance fournisseur X à surveiller", agent:"co-4", type:"warn"  },
      { time:"Hier",  msg:"Document ajouté",         detail:"Architecture cible v1.2.pdf",  agent:"co-1", type:"info"   },
      { time:"Hier",  msg:"Commentaire client",      detail:"Retour sur l'atelier du 13/05",agent:"romain",type:"comment"},
    ],
    travaux_list:[
      { id:"t1", name:"Cartographie applicative",        agent:"co-1", status:"running", progress:70 },
      { id:"t2", name:"Analyse des flux de données",     agent:"mk-2", status:"running", progress:45 },
      { id:"t3", name:"Cadrage cible architecture",      agent:"co-2", status:"running", progress:60 },
      { id:"t4", name:"Revue sécurité",                  agent:"rh-1", status:"running", progress:30 },
      { id:"t5", name:"Validation principes d'archi",    agent:"co-4", status:"waiting", progress:0  },
      { id:"t6", name:"Atelier métiers",                 agent:"co-2", status:"waiting", progress:0  },
      { id:"t7", name:"Livrables phase 1",               agent:"co-1", status:"done",    progress:100},
      { id:"t8", name:"Kick-off projet",                 agent:"romain",status:"done",   progress:100},
    ],
  },
  {
    id:"p2", name:"BPCE - Transfo IA", client:"BPCE", status:"running",
    color:"#7C3AED", logo:"🏦", owner:"laura",
    progress:52, travaux:{ total:17, done:9, late:1, risk:2, blocked:0 },
    agents:["mk-1","co-1","fi-1","rh-2"], deadline:"15 sept. 2025",
    nextStep:"Atelier gouvernance IA", period:"Mars 2025 – Sept. 2025",
    desc:"Définition de la stratégie IA et accompagnement à la transformation des métiers banque-assurance.",
    sources:["f1","f5","f6"], sharepoint_folders:[],
    rapports:[
      { name:"Cadrage stratégique IA",   date:"10 mai 2025", type:"PDF" },
      { name:"Benchmark LLM entreprise", date:"5 mai 2025",  type:"PDF" },
    ],
    activites:[
      { time:"09:00", msg:"Benchmark complété",  detail:"Comparatif LLM entreprise finalisé", agent:"co-1", type:"ok"   },
      { time:"Hier",  msg:"Atelier planifié",    detail:"Gouvernance IA — 20 mai 09h",        agent:"romain",type:"info" },
    ],
    travaux_list:[
      { id:"t9",  name:"Benchmark LLM",          agent:"co-1", status:"done",    progress:100 },
      { id:"t10", name:"Cartographie use cases", agent:"mk-1", status:"running", progress:65  },
      { id:"t11", name:"Gouvernance IA",         agent:"fi-1", status:"waiting", progress:0   },
    ],
  },
  {
    id:"p3", name:"Crédit Agricole - Transfo Infra", client:"CA", status:"running",
    color:"#10B981", logo:"🌿", owner:"caroline",
    progress:41, travaux:{ total:31, done:13, late:3, risk:4, blocked:2 },
    agents:["it-1","co-3","fi-2","rh-3","co-1","le-1"], deadline:"31 juil. 2025",
    nextStep:"Migration cloud phase 2", period:"Janv. 2025 – Juil. 2025",
    desc:"Migration et modernisation de l'infrastructure SI vers une architecture cloud hybride.",
    sources:["f1","f2","f4","f7"],
    rapports:[
      { name:"État migration cloud", date:"14 mai 2025", type:"PDF" },
    ],
    activites:[
      { time:"Hier", msg:"Risque détecté", detail:"Latence réseau inter-DC", agent:"it-1", type:"warn" },
    ],
    travaux_list:[
      { id:"t12", name:"Audit infrastructure",  agent:"it-1", status:"done",    progress:100 },
      { id:"t13", name:"Migration DNS",         agent:"it-1", status:"running", progress:55  },
      { id:"t14", name:"Sécurisation périmètre",agent:"le-1", status:"waiting", progress:0   },
    ],
  },
  {
    id:"p4", name:"Airbus - Data Platform", client:"Airbus", status:"running",
    color:"#0EA5E9", logo:"✈️", owner:"thomas",
    progress:78, travaux:{ total:11, done:9, late:0, risk:1, blocked:0 },
    agents:["mk-2","co-1","fi-1"], deadline:"15 oct. 2025",
    nextStep:"Recette plateforme", period:"Oct. 2024 – Oct. 2025",
    desc:"Conception et déploiement d'une plateforme data centralisée pour l'ingénierie.",
    sources:["f2","f5","f6"],
    rapports:[],
    activites:[],
    travaux_list:[
      { id:"t15", name:"Modélisation data",  agent:"mk-2", status:"done",    progress:100 },
      { id:"t16", name:"Recette UAT",        agent:"co-1", status:"running", progress:80  },
    ],
  },
  {
    id:"p5", name:"SNCF - Modernisation SI", client:"SNCF", status:"running",
    color:"#EF4444", logo:"🚄", owner:"julien",
    progress:29, travaux:{ total:26, done:8, late:4, risk:5, blocked:3 },
    agents:["co-2","co-3","it-1","rh-1","fi-3"], deadline:"10 août 2025",
    nextStep:"Revue comité pilotage", period:"Fév. 2025 – Août 2025",
    desc:"Modernisation du SI opérationnel SNCF et refonte des systèmes de gestion du trafic.",
    sources:["f1","f3","f7"],
    rapports:[
      { name:"Point d'avancement S18", date:"3 mai 2025", type:"PDF" },
    ],
    activites:[
      { time:"Hier", msg:"Alerte planning", detail:"3 jalons décalés en juin", agent:"co-2", type:"warn" },
    ],
    travaux_list:[
      { id:"t17", name:"Cadrage SI cible",     agent:"co-2", status:"running", progress:40  },
      { id:"t18", name:"Schéma directeur",     agent:"co-3", status:"waiting", progress:0   },
      { id:"t19", name:"Refonte ticketing",    agent:"it-1", status:"running", progress:25  },
    ],
  },
];

// ─── PROJETS SCREEN ───────────────────────────────────────────────────────────

function ProjetsScreen({ agents, onAgent }) {
  const [filter,      setFilter]    = useState("all");
  const [selProj,     setSelProj]   = useState(null);
  const [openChat,    setOpenChat]  = useState(null); // projet id
  const [chatInputs,  setChatInputs]= useState({});   // { [projId]: string }
  const [chatLogs,    setChatLogs]  = useState(() => {
    const init = {};
    INIT_PROJETS.forEach(p => {
      init[p.id] = [
        { id:1, from:"agent", agentId:p.agents[0], agentName:"Agent", text:"Bonjour Romain. Tout avance conformément au plan. Un point d'attention : "+p.nextStep+".", time:"10:30" },
      ];
    });
    return init;
  });

  const allAgents = Object.values(agents).flat();
  const counts = { all:INIT_PROJETS.length, running:INIT_PROJETS.filter(p=>p.status==="running").length, soon:0, done:0 };
  const chips  = [
    { id:"all",  label:"En cours",  count:counts.running },
    { id:"soon", label:"À venir",   count:counts.soon    },
    { id:"done", label:"Terminés",  count:counts.done    },
  ];
  const shown = filter==="all" ? INIT_PROJETS : INIT_PROJETS.filter(p=>p.status===filter);

  const sendMsg = (projId, projAgents) => {
    const txt = (chatInputs[projId]||"").trim();
    if(!txt) return;
    const userMsg = { id:Date.now(), from:"user", text:txt, time:"Maintenant" };
    setChatLogs(prev=>({ ...prev, [projId]:[...prev[projId], userMsg] }));
    setChatInputs(prev=>({ ...prev, [projId]:"" }));
    setTimeout(()=>{
      const respAgent = allAgents.find(a=>projAgents.includes(a.id)) || { name:"Agent", id:"co-1" };
      const d = DEPTS.find(x=>x.id===respAgent.dept)||DEPTS[0];
      setChatLogs(prev=>({ ...prev, [projId]:[...prev[projId], {
        id:Date.now()+1, from:"agent", agentId:respAgent.id, agentName:respAgent.name,
        text:"Bien reçu. Je traite votre demande et vous reviens rapidement.", time:"Maintenant"
      }]}));
    }, 1000);
  };

  if(selProj) return <ProjetDetail projet={selProj} agents={agents} allAgents={allAgents} onBack={()=>setSelProj(null)} onAgent={onAgent} />;

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", minHeight:0 }}>
      <div style={{ padding:"16px 16px 0", flexShrink:0 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <div style={{ fontFamily:SF, fontSize:22, fontWeight:700, color:"#111827", letterSpacing:"-0.02em" }}>Projets</div>
          <div style={{ display:"flex", gap:8 }}>
            <button style={{ width:32, height:32, borderRadius:10, background:"#F3F4F6", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="8.5" r="6.5" stroke="#6B7280" strokeWidth="1.8"/><path d="M13.5 13.5L18 18" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </button>
            <button style={{ width:32, height:32, borderRadius:10, background:ACCENT, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>
        <div style={{ display:"flex", gap:6, marginBottom:4, overflowX:"auto" }}>
          {chips.map(c=>(
            <button key={c.id} onClick={()=>setFilter(c.id)} style={{ fontFamily:SF, fontSize:13, fontWeight:filter===c.id?700:500, color:filter===c.id?"#fff":"#6B7280", background:filter===c.id?ACCENT:"#F3F4F6", borderRadius:20, padding:"5px 14px", border:"none", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0, display:"flex", alignItems:"center", gap:5, transition:"all 0.15s" }}>
              {c.label}
              <span style={{ background:filter===c.id?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.08)", borderRadius:20, minWidth:18, height:18, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, padding:"0 4px" }}>{c.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"12px 16px 20px" }}>
        {shown.map(p => {
          const pAgents   = allAgents.filter(a=>p.agents.includes(a.id));
          const isChatOpen = openChat === p.id;
          const msgs       = chatLogs[p.id]||[];
          const unread     = msgs.filter(m=>m.from==="agent").length;

          return (
            <Card key={p.id} style={{ marginBottom:12, overflow:"visible" }}>
              {/* Main card — clickable to project detail */}
              <div onClick={()=>setSelProj(p)} style={{ padding:"13px 14px", cursor:"pointer" }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:10 }}>
                  <div style={{ width:38, height:38, borderRadius:10, background:p.color+"18", border:`1.5px solid ${p.color}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:19, flexShrink:0 }}>{p.logo}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                      <div style={{ fontFamily:SF, fontSize:14, fontWeight:700, color:"#111827", lineHeight:1.2, flex:1, marginRight:8 }}>{p.name}</div>
                      <span style={{ fontFamily:SF, fontSize:10, fontWeight:600, color:"#10B981", background:"#DCFCE7", borderRadius:6, padding:"2px 7px", flexShrink:0 }}>En cours</span>
                    </div>
                    <div style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF", marginTop:2, display:"flex", gap:6 }}>
                      <span>{pAgents.length} agents</span><span>·</span>
                      <span>{p.travaux.total} travaux</span><span>·</span>
                      <span>{p.deadline}</span>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div style={{ marginBottom:9 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ fontFamily:SF, fontSize:11, color:"#6B7280" }}>Avancement</span>
                    <span style={{ fontFamily:SF, fontSize:11, fontWeight:700, color:p.color }}>{p.progress}%</span>
                  </div>
                  <div style={{ height:4, background:"#F3F4F6", borderRadius:2, overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${p.progress}%`, background:`linear-gradient(90deg,${p.color},${p.color}cc)`, borderRadius:2 }} />
                  </div>
                </div>

                {/* Indicators */}
                <div style={{ display:"flex", gap:0, paddingTop:8, borderTop:"0.5px solid #F9FAFB" }}>
                  {[
                    { v:p.travaux.done+"/"+p.travaux.total, l:"Réalisés",  c:"#374151" },
                    { v:p.travaux.late,    l:"En retard", c:p.travaux.late>0?"#F59E0B":"#9CA3AF" },
                    { v:p.travaux.risk,    l:"À risque",  c:p.travaux.risk>0?"#F97316":"#9CA3AF" },
                    { v:p.travaux.blocked, l:"Bloqués",   c:p.travaux.blocked>0?"#EF4444":"#9CA3AF" },
                  ].map(k=>(
                    <div key={k.l} style={{ flex:1, textAlign:"center" }}>
                      <div style={{ fontFamily:SF, fontSize:14, fontWeight:700, color:k.c, letterSpacing:"-0.02em" }}>{k.v}</div>
                      <div style={{ fontFamily:SF, fontSize:9, color:"#9CA3AF", marginTop:1 }}>{k.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat CTA — prominent, always visible */}
              <div
                onClick={e=>{ e.stopPropagation(); setOpenChat(isChatOpen?null:p.id); }}
                style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"9px 14px", background:isChatOpen?ACCENT:p.color+"12", borderTop:`0.5px solid ${isChatOpen?ACCENT+"40":p.color+"25"}`, cursor:"pointer", transition:"background 0.2s" }}
              >
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke={isChatOpen?"#fff":p.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {/* Agent avatars */}
                  <div style={{ display:"flex" }}>
                    {pAgents.slice(0,3).map((a,i)=>{
                      const d=DEPTS.find(x=>x.id===a.dept)||DEPTS[0];
                      return (
                        <div key={a.id} style={{ width:20, height:20, borderRadius:6, background:isChatOpen?"rgba(255,255,255,0.25)":d.light, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, border:`2px solid ${isChatOpen?ACCENT:p.color+"18"}`, marginLeft:i===0?0:-5, zIndex:3-i }}>
                          {agentEmoji(a.name)}
                        </div>
                      );
                    })}
                    {pAgents.length>3 && <div style={{ width:20, height:20, borderRadius:6, background:"#F3F4F6", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:SF, fontSize:8, color:"#6B7280", border:`2px solid ${isChatOpen?ACCENT+"30":"#E5E7EB"}`, marginLeft:-5 }}>+{pAgents.length-3}</div>}
                  </div>
                  <span style={{ fontFamily:SF, fontSize:12, fontWeight:600, color:isChatOpen?"#fff":p.color }}>
                    {isChatOpen ? "Fermer la conversation" : "Discuter avec l'équipe"}
                  </span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                  {!isChatOpen && msgs.filter(m=>m.from==="agent").length>0 && (
                    <span style={{ background:"#EF4444", color:"#fff", fontSize:9, fontFamily:SF, fontWeight:700, borderRadius:20, padding:"1px 5px" }}>{msgs.filter(m=>m.from==="agent").length}</span>
                  )}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ transform:isChatOpen?"rotate(180deg)":"none", transition:"transform 0.2s" }}><path d="M6 9l6 6 6-6" stroke={isChatOpen?"#fff":p.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>

              {/* Inline chat panel */}
              {isChatOpen && (
                <div style={{ borderTop:`0.5px solid ${ACCENT}20` }}>
                  {/* Messages */}
                  <div style={{ maxHeight:180, overflowY:"auto", padding:"10px 14px", display:"flex", flexDirection:"column", gap:8, background:"#FAFBFF" }}>
                    {msgs.map(m=>{
                      const isUser = m.from==="user";
                      const agent  = pAgents.find(a=>a.id===m.agentId);
                      const d      = agent ? DEPTS.find(x=>x.id===agent.dept)||DEPTS[0] : DEPTS[0];
                      return (
                        <div key={m.id} style={{ display:"flex", flexDirection:"column", alignItems:isUser?"flex-end":"flex-start" }}>
                          {!isUser && <div style={{ fontFamily:SF, fontSize:10, fontWeight:600, color:d.color, marginBottom:3, marginLeft:26 }}>{m.agentName||agent?.name}</div>}
                          <div style={{ display:"flex", alignItems:"flex-end", gap:6, maxWidth:"88%", flexDirection:isUser?"row-reverse":"row" }}>
                            {!isUser && agent && (
                              <div style={{ width:22, height:22, borderRadius:7, background:d.light, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, flexShrink:0 }}>{agentEmoji(agent.name)}</div>
                            )}
                            {isUser && <img src={AVATAR_RV} alt="Romain Villar" style={{ width:20, height:20, borderRadius:"50%", objectFit:"cover", flexShrink:0, display:"block" }}/>}
                            <div style={{ background:isUser?ACCENT:"#fff", color:isUser?"#fff":"#111827", borderRadius:isUser?"12px 12px 3px 12px":"12px 12px 12px 3px", padding:"8px 11px", fontFamily:SF, fontSize:12, lineHeight:1.45, boxShadow:isUser?"none":"0 1px 2px rgba(0,0,0,0.06)", border:isUser?"none":"0.5px solid #E5E7EB" }}>
                              {m.text}
                            </div>
                          </div>
                          <span style={{ fontFamily:SF, fontSize:9, color:"#C7C7CC", marginTop:2, [isUser?"marginRight":"marginLeft"]:28 }}>{m.time}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Suggestions rapides */}
                  <div style={{ display:"flex", gap:5, overflowX:"auto", padding:"0 12px 6px" }}>
                    {["État d'avancement ?","Blocages ?","Prépare un résumé"].map(s=>(
                      <button key={s} onClick={e=>{ e.stopPropagation(); setChatInputs(prev=>({...prev,[p.id]:s})); }} style={{ fontFamily:SF, fontSize:10, color:ACCENT, background:`${ACCENT}10`, border:`1px solid ${ACCENT}25`, borderRadius:20, padding:"4px 10px", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }}>{s}</button>
                    ))}
                  </div>

                  {/* Input */}
                  <div style={{ display:"flex", alignItems:"center", gap:7, padding:"7px 12px 12px", background:"#fff", borderTop:"0.5px solid #F3F4F6" }} onClick={e=>e.stopPropagation()}>
                    <input
                      value={chatInputs[p.id]||""}
                      onChange={e=>setChatInputs(prev=>({...prev,[p.id]:e.target.value}))}
                      onKeyDown={e=>e.key==="Enter"&&(e.preventDefault(),sendMsg(p.id,p.agents))}
                      placeholder="Message à l'équipe projet…"
                      style={{ flex:1, background:"#F3F4F6", border:"none", outline:"none", borderRadius:20, padding:"8px 13px", fontFamily:SF, fontSize:13, color:"#111827" }}
                    />
                    <button
                      onClick={e=>{ e.stopPropagation(); sendMsg(p.id,p.agents); }}
                      disabled={!(chatInputs[p.id]||"").trim()}
                      style={{ width:32, height:32, borderRadius:"50%", background:(chatInputs[p.id]||"").trim()?ACCENT:"#E5E7EB", border:"none", cursor:(chatInputs[p.id]||"").trim()?"pointer":"default", display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.2s", flexShrink:0 }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}

        <button style={{ width:"100%", padding:"13px", borderRadius:12, border:"1.5px dashed #D1D5DB", background:"transparent", color:ACCENT, fontFamily:SF, fontSize:14, fontWeight:600, cursor:"pointer" }}>
          + Nouveau projet
        </button>
      </div>
    </div>
  );
}

// ─── PROJET DETAIL ────────────────────────────────────────────────────────────

function ProjetDetail({ projet: p, agents, allAgents, onBack, onAgent, embedded=false }) {
  const [tab,         setTab]         = useState("overview");
  const [showAffect,  setShowAffect]  = useState(false);
  const [showChat,    setShowChat]    = useState(false);
  const [affectSearch,setAffectSearch]= useState("");
  const [affectFilter,setAffectFilter]= useState("all");
  const [travFilter,  setTravFilter]  = useState("all");
  const [chatInput,   setChatInput]   = useState("");
  const [chatTarget,  setChatTarget]  = useState("all"); // "all" | agent.id
  const [chatMessages,setChatMessages]= useState([
    { id:1, from:"agent", agentId:"co-1", agentName:"Intel Watcher",   text:"Bonjour Romain. J'ai identifié un risque sur la dépendance fournisseur X dans la phase 2. Voulez-vous que je prépare une note d'analyse ?", time:"10:30", read:false },
    { id:2, from:"agent", agentId:"co-2", agentName:"Slide Crafter",   text:"L'offre Covéa v2 est prête. J'attends votre validation avant envoi client. Souhaitez-vous des ajustements sur le volet budgétaire ?", time:"09:45", read:false },
    { id:3, from:"user",                                                 text:"@Slide Crafter — Oui, retravailler la slide 8 sur le ROI. Utilise les chiffres du benchmark Q4.", time:"09:47", read:true  },
    { id:4, from:"agent", agentId:"co-2", agentName:"Slide Crafter",   text:"Compris. Je mets à jour la slide 8 avec les données benchmark Q4 et je vous notifie dès que c'est prêt.", time:"09:48", read:true  },
  ]);
  const chatEndRef = useRef ? useRef(null) : { current:null };

  const pAgents   = allAgents.filter(a=>p.agents.includes(a.id));
  const available = allAgents.filter(a=>!p.agents.includes(a.id));
  const recommended = available.slice(0,3);
  const ownerObj  = OWNERS.find(o=>o.id===p.owner)||OWNERS[0];

  const unreadCount = chatMessages.filter(m=>m.from==="agent"&&!m.read).length;

  const sendMessage = () => {
    if(!chatInput.trim()) return;
    const targetAgent = pAgents.find(a=>a.id===chatTarget);
    const newMsg = { id:Date.now(), from:"user", text:chatInput.trim(), time:"Maintenant", read:true };
    setChatMessages(prev=>[...prev, newMsg]);
    setChatInput("");
    // Simulated agent reply after short delay
    setTimeout(()=>{
      const replyAgent = targetAgent || pAgents[0];
      if(!replyAgent) return;
      setChatMessages(prev=>[...prev, {
        id:Date.now()+1, from:"agent",
        agentId:replyAgent.id, agentName:replyAgent.name,
        text:"Bien reçu. Je traite votre demande et vous reviens rapidement avec les éléments demandés.",
        time:"Maintenant", read:false
      }]);
    }, 1200);
  };

  const TABS = [
    { id:"overview", label:"Vue d'ensemble" },
    { id:"agents",   label:"Agents"         },
    { id:"sources",  label:"Sources"        },
    { id:"travaux",  label:"Travaux"        },
  ];

  const travGroups = [
    { key:"running", label:"En cours",  items: p.travaux_list.filter(t=>t.status==="running") },
    { key:"waiting", label:"En attente",items: p.travaux_list.filter(t=>t.status==="waiting") },
    { key:"done",    label:"Terminés",  items: p.travaux_list.filter(t=>t.status==="done")    },
  ];

  return (
    <div style={{ ...(embedded ? { display:"flex", flexDirection:"column", height:"100%" } : { position:"absolute", inset:0, zIndex:50, background:"#F9FAFB", display:"flex", flexDirection:"column" }) }}>
      {/* Nav bar — tabs only in embedded mode, full header in standalone */}
      <div style={{ background:"#fff", borderBottom:"0.5px solid #E5E7EB", flexShrink:0 }}>
        {!embedded && (
          <div style={{ padding:"14px 16px 0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <button onClick={onBack} style={{ display:"flex", alignItems:"center", gap:4, background:"none", border:"none", cursor:"pointer", color:ACCENT, fontFamily:SF, fontSize:15, padding:0 }}>
              <svg width="9" height="15" viewBox="0 0 9 15" fill="none"><path d="M7.5 1L1 7.5l6.5 6.5" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:28, height:28, borderRadius:8, background:p.color+"18", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>{p.logo}</div>
              <div style={{ fontFamily:SF, fontSize:15, fontWeight:600, color:"#111827" }}>{p.name}</div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontFamily:SF, fontSize:11, fontWeight:600, color:"#10B981", background:"#DCFCE7", borderRadius:8, padding:"2px 8px" }}>En cours</span>
              <button onClick={()=>setShowChat(true)} style={{ position:"relative", width:32, height:32, borderRadius:9, background:`${ACCENT}12`, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {unreadCount>0 && <span style={{ position:"absolute", top:2, right:2, width:8, height:8, borderRadius:"50%", background:"#EF4444", border:"1.5px solid #fff" }} />}
              </button>
            </div>
          </div>
        )}
        {/* Tabs */}
        <div style={{ display:"flex", overflowX:"auto", padding:`${embedded?"8px":"0"} 12px 0` }}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{ fontFamily:SF, fontSize:12, fontWeight:tab===t.id?600:400, color:tab===t.id?ACCENT:"#6B7280", background:"none", border:"none", cursor:"pointer", padding:"10px 8px", borderBottom:tab===t.id?`2px solid ${ACCENT}`:"2px solid transparent", whiteSpace:"nowrap", flexShrink:0, transition:"all 0.15s" }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"14px 16px 20px" }}>

        {/* ── VUE D'ENSEMBLE ── */}
        {tab==="overview" && (
          <>
            {/* Donut + résumé */}
            <Card style={{ padding:"16px", marginBottom:12 }}>
              <div style={{ fontFamily:SF, fontSize:12, fontWeight:600, color:"#9CA3AF", textTransform:"uppercase", marginBottom:14 }}>Avancement du projet</div>
              <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:14 }}>
                <Donut pct={p.progress} color={p.color} size={72} />
                <div style={{ flex:1 }}>
                  {[
                    { l:"Avancement",      v:`${p.progress}%`          },
                    { l:"Travaux réalisés", v:`${p.travaux.done} / ${p.travaux.total}` },
                    { l:"Prochaine étape", v:p.nextStep                },
                    { l:"Échéance",        v:p.deadline                },
                  ].map(r=>(
                    <div key={r.l} style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                      <span style={{ fontFamily:SF, fontSize:12, color:"#9CA3AF" }}>{r.l}</span>
                      <span style={{ fontFamily:SF, fontSize:12, fontWeight:600, color:"#111827", textAlign:"right", maxWidth:140, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{r.v}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Indicateurs clés */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:0, paddingTop:12, borderTop:"0.5px solid #F3F4F6" }}>
                {[
                  { v:`${p.travaux.done}/${p.travaux.total}`, l:"Réalisés",  c:"#111827"  },
                  { v:p.travaux.late,    l:"En retard", c:p.travaux.late>0?"#F59E0B":"#9CA3AF"    },
                  { v:p.travaux.risk,    l:"À risque",  c:p.travaux.risk>0?"#F97316":"#9CA3AF"    },
                  { v:p.travaux.blocked, l:"Bloqués",   c:p.travaux.blocked>0?"#EF4444":"#9CA3AF" },
                ].map((k,i,arr)=>(
                  <div key={k.l} style={{ textAlign:"center", padding:"0 4px", borderRight:i<arr.length-1?"0.5px solid #F3F4F6":"none" }}>
                    <div style={{ fontFamily:SF, fontSize:18, fontWeight:700, color:k.c, letterSpacing:"-0.02em" }}>{k.v}</div>
                    <div style={{ fontFamily:SF, fontSize:9, color:"#9CA3AF", marginTop:2 }}>{k.l}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Résumé */}
            <Card style={{ padding:"14px", marginBottom:12 }}>
              <div style={{ fontFamily:SF, fontSize:12, fontWeight:600, color:"#9CA3AF", textTransform:"uppercase", marginBottom:10 }}>Résumé du projet</div>
              <div style={{ fontFamily:SF, fontSize:13, color:"#374151", lineHeight:1.6, marginBottom:12 }}>{p.desc}</div>
              <Divider />
              <div style={{ paddingTop:10 }}>
                {[
                  { l:"Client",         v:p.client     },
                  { l:"Chef de projet", v:ownerObj.name },
                  { l:"Période",        v:p.period     },
                ].map((r,i,arr)=>(
                  <div key={r.l}>
                    <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 0" }}>
                      <span style={{ fontFamily:SF, fontSize:13, color:"#9CA3AF" }}>{r.l}</span>
                      <span style={{ fontFamily:SF, fontSize:13, fontWeight:500, color:"#111827" }}>{r.v}</span>
                    </div>
                    {i<arr.length-1 && <Divider />}
                  </div>
                ))}
              </div>
            </Card>

            {/* Activités récentes */}
            {p.activites.length>0 && (
              <Card>
                <div style={{ padding:"12px 14px 8px" }}>
                  <div style={{ fontFamily:SF, fontSize:12, fontWeight:600, color:"#9CA3AF", textTransform:"uppercase" }}>Activités récentes</div>
                </div>
                {p.activites.map((a,i)=>{
                  const iconMap = { ok:"✅", warn:"⚠️", info:"ℹ️", comment:"💬" };
                  return (
                    <div key={i}>
                      <div style={{ display:"flex", gap:10, padding:"10px 14px" }}>
                        <span style={{ fontSize:14, flexShrink:0, marginTop:1 }}>{iconMap[a.type]||"•"}</span>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontFamily:SF, fontSize:13, fontWeight:500, color:"#111827" }}>{a.msg}</div>
                          <div style={{ fontFamily:SF, fontSize:12, color:"#9CA3AF" }}>{a.detail}</div>
                        </div>
                        <span style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF", flexShrink:0 }}>{a.time}</span>
                      </div>
                      {i<p.activites.length-1 && <Divider indent={38} />}
                    </div>
                  );
                })}
              </Card>
            )}
          </>
        )}

        {/* ── AGENTS ── */}
        {tab==="agents" && (
          <>
            {/* Stats */}
            <Card style={{ padding:"12px 14px", marginBottom:12 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:0 }}>
                {[
                  { v:pAgents.length,                              l:"Affectés",    c:ACCENT     },
                  { v:allAgents.filter(a=>!p.agents.includes(a.id)&&a.active).length, l:"Disponibles", c:"#10B981"  },
                  { v:3,                                           l:"Recommandés", c:"#F59E0B"  },
                ].map((k,i,arr)=>(
                  <div key={k.l} style={{ textAlign:"center", padding:"0 8px", borderRight:i<arr.length-1?"0.5px solid #F3F4F6":"none" }}>
                    <div style={{ fontFamily:SF, fontSize:24, fontWeight:700, color:k.c }}>{k.v}</div>
                    <div style={{ fontFamily:SF, fontSize:10, color:"#9CA3AF", marginTop:2 }}>{k.l}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Agents affectés */}
            <div style={{ fontFamily:SF, fontSize:12, fontWeight:600, color:"#9CA3AF", textTransform:"uppercase", marginBottom:8 }}>Agents affectés ({pAgents.length})</div>
            <Card style={{ marginBottom:12 }}>
              {pAgents.map((a,i)=>{
                const d=DEPTS.find(x=>x.id===a.dept)||DEPTS[0];
                return (
                  <div key={a.id}>
                    <div onClick={()=>onAgent(a)} style={{ display:"flex", alignItems:"center", gap:11, padding:"11px 14px", cursor:"pointer" }}>
                      <AgentIcon name={a.name} dept={a.dept} size={36} />
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontFamily:SF, fontSize:14, fontWeight:500, color:"#111827" }}>{a.name}</div>
                        <div style={{ fontFamily:SF, fontSize:12, color:"#9CA3AF", display:"flex", alignItems:"center", gap:5, marginTop:1 }}>
                          <StatusPill status={a.status} small />
                        </div>
                      </div>
                      <IOSToggle on={a.active} onToggle={()=>{}} color={d.color} scale={0.8} />
                    </div>
                    {i<pAgents.length-1 && <Divider indent={61} />}
                  </div>
                );
              })}
            </Card>

            {/* Agents disponibles */}
            <div style={{ fontFamily:SF, fontSize:12, fontWeight:600, color:"#9CA3AF", textTransform:"uppercase", marginBottom:8 }}>Agents disponibles ({available.length})</div>
            <Card style={{ marginBottom:12 }}>
              {available.slice(0,4).map((a,i)=>{
                const isRec = i < 3;
                return (
                  <div key={a.id}>
                    <div style={{ display:"flex", alignItems:"center", gap:11, padding:"11px 14px" }}>
                      <AgentIcon name={a.name} dept={a.dept} size={36} />
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontFamily:SF, fontSize:14, fontWeight:500, color:"#111827" }}>{a.name}</div>
                        <div style={{ fontFamily:SF, fontSize:12, color:"#9CA3AF", marginTop:1 }}>{DEPTS.find(d=>d.id===a.dept)?.label}</div>
                        {isRec && <span style={{ fontFamily:SF, fontSize:10, fontWeight:600, color:"#F59E0B", background:"#FEF3C7", borderRadius:6, padding:"1px 6px" }}>Recommandé</span>}
                      </div>
                      <button style={{ background:`${ACCENT}14`, color:ACCENT, border:"none", borderRadius:8, padding:"6px 12px", fontFamily:SF, fontSize:12, fontWeight:600, cursor:"pointer" }}>+ Ajouter</button>
                    </div>
                    {i<Math.min(available.length,4)-1 && <Divider indent={61} />}
                  </div>
                );
              })}
            </Card>

            <button onClick={()=>setShowAffect(true)} style={{ width:"100%", padding:"12px", borderRadius:12, border:`1.5px solid ${ACCENT}`, background:"transparent", color:ACCENT, fontFamily:SF, fontSize:14, fontWeight:600, cursor:"pointer" }}>
              Affecter un agent au projet
            </button>
          </>
        )}

        {/* ── SOURCES ── */}
        {tab==="sources" && (
          <>
            {/* Sources projet actives */}
            <div style={{ fontFamily:SF, fontSize:12, fontWeight:600, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:"0.04em", marginBottom:6 }}>Sources spécifiques au projet</div>
            <div style={{ fontFamily:SF, fontSize:12, color:"#6B7280", marginBottom:10, lineHeight:1.5 }}>Activées uniquement dans le cadre de ce projet. Les agents y accèdent exclusivement ici.</div>
            <Card style={{ marginBottom:16 }}>
              {ALL_SOURCES.filter(s=>s.scope==="project"&&p.sources.includes(s.id)).length === 0
                ? <div style={{ padding:"16px 14px", fontFamily:SF, fontSize:13, color:"#9CA3AF" }}>Aucune source projet connectée</div>
                : ALL_SOURCES.filter(s=>s.scope==="project"&&p.sources.includes(s.id)).map((s,i,arr)=>{
                  const c=s.status==="ok"?"#10B981":s.status==="warn"?"#F59E0B":"#EF4444";
                  return (
                    <div key={s.id}>
                      <div style={{ display:"flex", alignItems:"center", gap:11, padding:"12px 14px" }}>
                        <div style={{ width:36, height:36, borderRadius:10, background:`${ACCENT}12`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{s.icon}</div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontFamily:SF, fontSize:14, fontWeight:500, color:"#111827" }}>{s.name}</div>
                          <div style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF" }}>{s.desc}</div>
                        </div>
                        <span style={{ fontFamily:SF, fontSize:11, fontWeight:600, color:c, background:c+"18", borderRadius:8, padding:"3px 9px" }}>{s.status==="ok"?"Connecté":s.status==="warn"?"Expiration":"Erreur"}</span>
                      </div>
                      {i<arr.length-1 && <Divider indent={61} />}
                    </div>
                  );
                })
              }
            </Card>

            {/* Sources génériques (rappel) */}
            <div style={{ fontFamily:SF, fontSize:12, fontWeight:600, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:"0.04em", marginBottom:6 }}>Sources génériques</div>
            <div style={{ fontFamily:SF, fontSize:12, color:"#6B7280", marginBottom:10, lineHeight:1.5 }}>Toujours disponibles pour les agents — indépendantes de ce projet.</div>
            <Card style={{ marginBottom:16 }}>
              {ALL_SOURCES.filter(s=>s.scope==="generic").map((s,i,arr)=>{
                const c=s.status==="ok"?"#10B981":s.status==="warn"?"#F59E0B":"#EF4444";
                return (
                  <div key={s.id}>
                    <div style={{ display:"flex", alignItems:"center", gap:11, padding:"11px 14px", opacity:0.75 }}>
                      <div style={{ width:36, height:36, borderRadius:10, background:"#F3F4F6", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{s.icon}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontFamily:SF, fontSize:14, fontWeight:500, color:"#374151" }}>{s.name}</div>
                        <div style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF" }}>{s.desc}</div>
                      </div>
                      <span style={{ fontFamily:SF, fontSize:11, fontWeight:600, color:c, background:c+"14", borderRadius:8, padding:"3px 9px" }}>{s.status==="ok"?"Actif":"Alerte"}</span>
                    </div>
                    {i<arr.length-1 && <Divider indent={61} />}
                  </div>
                );
              })}
            </Card>

            {/* Sources projet non connectées */}
            {ALL_SOURCES.filter(s=>s.scope==="project"&&!p.sources.includes(s.id)).length > 0 && (
              <>
                <div style={{ fontFamily:SF, fontSize:12, fontWeight:600, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:"0.04em", marginBottom:8 }}>Sources disponibles à connecter</div>
                <Card style={{ marginBottom:12 }}>
                  {ALL_SOURCES.filter(s=>s.scope==="project"&&!p.sources.includes(s.id)).map((s,i,arr)=>(
                    <div key={s.id}>
                      <div style={{ display:"flex", alignItems:"center", gap:11, padding:"12px 14px" }}>
                        <div style={{ width:36, height:36, borderRadius:10, background:"#F3F4F6", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, opacity:0.5 }}>{s.icon}</div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontFamily:SF, fontSize:14, fontWeight:500, color:"#9CA3AF" }}>{s.name}</div>
                          <div style={{ fontFamily:SF, fontSize:11, color:"#D1D5DB" }}>{s.desc}</div>
                        </div>
                        <button style={{ background:`${ACCENT}14`, color:ACCENT, border:"none", borderRadius:8, padding:"6px 12px", fontFamily:SF, fontSize:12, fontWeight:600, cursor:"pointer" }}>Connecter</button>
                      </div>
                      {i<arr.length-1 && <Divider indent={61} />}
                    </div>
                  ))}
                </Card>
              </>
            )}
          </>
        )}

        {/* ── TRAVAUX ── */}
        {tab==="travaux" && (
          <>
            {/* Filter chips */}
            <div style={{ display:"flex", gap:6, marginBottom:12, overflowX:"auto" }}>
              {[
                { id:"all",     label:"Tous",       count:p.travaux_list.length                                    },
                { id:"running", label:"En cours",   count:p.travaux_list.filter(t=>t.status==="running").length    },
                { id:"waiting", label:"En attente", count:p.travaux_list.filter(t=>t.status==="waiting").length    },
                { id:"done",    label:"Terminés",   count:p.travaux_list.filter(t=>t.status==="done").length       },
              ].map(c=>(
                <button key={c.id} onClick={()=>setTravFilter(c.id)} style={{ fontFamily:SF, fontSize:12, fontWeight:travFilter===c.id?700:500, color:travFilter===c.id?"#fff":"#6B7280", background:travFilter===c.id?ACCENT:"#F3F4F6", borderRadius:20, padding:"5px 12px", border:"none", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0, display:"flex", alignItems:"center", gap:4 }}>
                  {c.label} <span style={{ background:travFilter===c.id?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.08)", borderRadius:20, minWidth:16, height:16, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, padding:"0 3px" }}>{c.count}</span>
                </button>
              ))}
            </div>

            {(travFilter==="all" ? travGroups : travGroups.filter(g=>g.key===travFilter)).map(g=>{
              if(!g.items.length) return null;
              return (
                <div key={g.key} style={{ marginBottom:14 }}>
                  {travFilter==="all" && <div style={{ fontFamily:SF, fontSize:11, fontWeight:700, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:"0.04em", marginBottom:7 }}>{g.label} ({g.items.length})</div>}
                  <Card>
                    {g.items.map((t,i)=>{
                      const sc = STATUS_CFG[t.status]||STATUS_CFG.idle;
                      const agent = allAgents.find(a=>a.id===t.agent)||{name:t.agent,dept:"consulting"};
                      return (
                        <div key={t.id}>
                          <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 14px" }}>
                            <AgentIcon name={agent.name} dept={agent.dept} size={30} />
                            <div style={{ flex:1, minWidth:0 }}>
                              <div style={{ fontFamily:SF, fontSize:13, fontWeight:500, color:"#111827", marginBottom:2 }}>{t.name}</div>
                              <div style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF" }}>{agent.name}</div>
                              {t.status==="running" && (
                                <div style={{ marginTop:5 }}>
                                  <div style={{ height:3, background:"#F3F4F6", borderRadius:2, overflow:"hidden" }}>
                                    <div style={{ height:"100%", width:`${t.progress}%`, background:p.color, borderRadius:2 }} />
                                  </div>
                                </div>
                              )}
                            </div>
                            <div style={{ textAlign:"right", flexShrink:0 }}>
                              {t.status==="running" && <div style={{ fontFamily:SF, fontSize:13, fontWeight:700, color:p.color }}>{t.progress}%</div>}
                              {t.status==="waiting" && <span style={{ fontFamily:SF, fontSize:11, fontWeight:600, color:"#F59E0B", background:"#FEF3C7", borderRadius:6, padding:"2px 7px" }}>En attente</span>}
                              {t.status==="done"    && <span style={{ fontFamily:SF, fontSize:14, color:"#10B981" }}>✓</span>}
                            </div>
                          </div>
                          {i<g.items.length-1 && <Divider indent={54} />}
                        </div>
                      );
                    })}
                  </Card>
                </div>
              );
            })}

            {/* KPI bas de page */}
            <Card style={{ padding:"14px", marginTop:8 }}>
              <div style={{ fontFamily:SF, fontSize:12, fontWeight:600, color:"#9CA3AF", textTransform:"uppercase", marginBottom:10 }}>Indicateurs clés</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:0 }}>
                {[
                  { v:`${p.travaux.done}/${p.travaux.total}`, l:"Réalisés",  c:"#111827"  },
                  { v:p.travaux.late,    l:"En retard", c:p.travaux.late>0?"#F59E0B":"#9CA3AF"    },
                  { v:p.travaux.risk,    l:"À risque",  c:p.travaux.risk>0?"#F97316":"#9CA3AF"    },
                  { v:p.travaux.blocked, l:"Bloqués",   c:p.travaux.blocked>0?"#EF4444":"#9CA3AF" },
                ].map((k,i,arr)=>(
                  <div key={k.l} style={{ textAlign:"center", padding:"0 4px", borderRight:i<arr.length-1?"0.5px solid #F3F4F6":"none" }}>
                    <div style={{ fontFamily:SF, fontSize:18, fontWeight:700, color:k.c }}>{k.v}</div>
                    <div style={{ fontFamily:SF, fontSize:9, color:"#9CA3AF", marginTop:2 }}>{k.l}</div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>

      {/* ── CHAT ÉQUIPE PROJET ── */}
      {showChat && (
        <div style={{ position:"absolute", inset:0, zIndex:70, display:"flex", flexDirection:"column", background:"#F9FAFB" }}>
          {/* Chat header */}
          <div style={{ background:"#fff", borderBottom:"0.5px solid #E5E7EB", padding:"14px 16px", flexShrink:0 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <button onClick={()=>setShowChat(false)} style={{ display:"flex", alignItems:"center", gap:5, background:"none", border:"none", cursor:"pointer", color:ACCENT, fontFamily:SF, fontSize:14, padding:0 }}>
                <svg width="9" height="15" viewBox="0 0 9 15" fill="none"><path d="M7.5 1L1 7.5l6.5 6.5" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Retour
              </button>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontFamily:SF, fontSize:15, fontWeight:600, color:"#111827" }}>Équipe projet</div>
                <div style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF" }}>{pAgents.length} agents · {p.name}</div>
              </div>
              <div style={{ width:52 }} />
            </div>
            {/* Agent selector pills */}
            <div style={{ display:"flex", gap:6, overflowX:"auto" }}>
              <button onClick={()=>setChatTarget("all")} style={{ fontFamily:SF, fontSize:11, fontWeight:chatTarget==="all"?700:500, color:chatTarget==="all"?"#fff":"#6B7280", background:chatTarget==="all"?ACCENT:"#F3F4F6", borderRadius:20, padding:"4px 12px", border:"none", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }}>
                Tous
              </button>
              {pAgents.map(a=>{
                const d = DEPTS.find(x=>x.id===a.dept)||DEPTS[0];
                const active = chatTarget===a.id;
                return (
                  <button key={a.id} onClick={()=>setChatTarget(a.id)} style={{ display:"flex", alignItems:"center", gap:5, fontFamily:SF, fontSize:11, fontWeight:active?700:500, color:active?"#fff":d.color, background:active?d.color:`${d.color}14`, borderRadius:20, padding:"4px 10px", border:"none", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }}>
                    <span style={{ fontSize:12 }}>{agentEmoji(a.name)}</span>
                    {a.name.split(" ")[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex:1, overflowY:"auto", padding:"12px 14px", display:"flex", flexDirection:"column", gap:10 }}>
            {chatMessages
              .filter(m=>chatTarget==="all"||m.from==="user"||(m.from==="agent"&&m.agentId===chatTarget))
              .map(m=>{
                const isUser = m.from==="user";
                const agent  = pAgents.find(a=>a.id===m.agentId);
                const d      = agent ? DEPTS.find(x=>x.id===agent.dept)||DEPTS[0] : DEPTS[0];
                return (
                  <div key={m.id} style={{ display:"flex", flexDirection:"column", alignItems:isUser?"flex-end":"flex-start" }}>
                    {/* Agent label */}
                    {!isUser && (
                      <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:4, marginLeft:38 }}>
                        <span style={{ fontFamily:SF, fontSize:11, fontWeight:600, color:d.color }}>{m.agentName}</span>
                        <span style={{ fontFamily:SF, fontSize:10, color:"#9CA3AF" }}>{m.time}</span>
                      </div>
                    )}
                    <div style={{ display:"flex", alignItems:"flex-end", gap:8, maxWidth:"85%", flexDirection:isUser?"row-reverse":"row" }}>
                      {/* Avatar */}
                      {!isUser && agent && (
                        <div style={{ width:30, height:30, borderRadius:9, background:d.light, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0 }}>
                          {agentEmoji(agent.name)}
                        </div>
                      )}
                      {isUser && (
                        <img src={AVATAR_RV} alt="Romain Villar" style={{ width:26, height:26, borderRadius:"50%", objectFit:"cover", flexShrink:0, display:"block" }}/>
                      )}
                      {/* Bubble */}
                      <div style={{
                        background: isUser ? ACCENT : "#fff",
                        color: isUser ? "#fff" : "#111827",
                        borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                        padding:"10px 13px",
                        fontFamily:SF, fontSize:13, lineHeight:1.5,
                        boxShadow: isUser ? "none" : "0 1px 3px rgba(0,0,0,0.06)",
                        border: isUser ? "none" : "0.5px solid #E5E7EB",
                      }}>
                        {m.text}
                      </div>
                    </div>
                    {isUser && <span style={{ fontFamily:SF, fontSize:10, color:"#9CA3AF", marginTop:3, marginRight:34 }}>{m.time}</span>}
                  </div>
                );
              })
            }
          </div>

          {/* Suggestions rapides */}
          <div style={{ padding:"0 14px 8px", display:"flex", gap:6, overflowX:"auto", flexShrink:0 }}>
            {[
              "Quel est l'état d'avancement ?",
              "Y a-t-il des blocages ?",
              "Prépare un point de situation",
            ].map(s=>(
              <button key={s} onClick={()=>setChatInput(s)} style={{ fontFamily:SF, fontSize:11, color:ACCENT, background:`${ACCENT}10`, border:`1px solid ${ACCENT}25`, borderRadius:20, padding:"5px 11px", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }}>
                {s}
              </button>
            ))}
          </div>

          {/* Input bar */}
          <div style={{ padding:"8px 14px 20px", background:"#fff", borderTop:"0.5px solid #E5E7EB", display:"flex", alignItems:"flex-end", gap:8, flexShrink:0 }}>
            {/* Attachment */}
            <button style={{ width:34, height:34, borderRadius:10, background:"#F3F4F6", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div style={{ flex:1, background:"#F3F4F6", borderRadius:20, padding:"8px 14px", display:"flex", alignItems:"center" }}>
              <input
                value={chatInput}
                onChange={e=>setChatInput(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),sendMessage())}
                placeholder={chatTarget==="all" ? "Message à l'équipe projet…" : `Message à ${pAgents.find(a=>a.id===chatTarget)?.name||"l'agent"}…`}
                style={{ flex:1, border:"none", outline:"none", fontFamily:SF, fontSize:14, color:"#111827", background:"transparent" }}
              />
            </div>
            <button onClick={sendMessage} disabled={!chatInput.trim()} style={{ width:34, height:34, borderRadius:"50%", background:chatInput.trim()?ACCENT:"#E5E7EB", border:"none", cursor:chatInput.trim()?"pointer":"default", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"background 0.2s" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      )}

      {showAffect && (
        <div style={{ position:"absolute", inset:0, zIndex:80, background:"rgba(0,0,0,0.45)", backdropFilter:"blur(4px)", display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
          <div style={{ background:"#F9FAFB", borderRadius:"20px 20px 0 0", maxHeight:"75%", display:"flex", flexDirection:"column" }}>
            <div style={{ padding:"14px 16px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"0.5px solid #E5E7EB" }}>
              <div style={{ fontFamily:SF, fontSize:16, fontWeight:700, color:"#111827" }}>Affecter un agent</div>
              <button onClick={()=>setShowAffect(false)} style={{ background:"#F3F4F6", border:"none", borderRadius:"50%", width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, color:"#6B7280" }}>×</button>
            </div>
            <div style={{ padding:"12px 16px 0" }}>
              <SearchBar value={affectSearch} onChange={setAffectSearch} placeholder="Rechercher un agent…" />
              <div style={{ display:"flex", gap:6, overflowX:"auto", marginBottom:4 }}>
                {[{id:"all",label:"Tous",count:allAgents.length},{id:"rec",label:"Recommandés",count:3},{id:"avail",label:"Disponibles",count:available.length}].map(c=>(
                  <button key={c.id} onClick={()=>setAffectFilter(c.id)} style={{ fontFamily:SF, fontSize:12, fontWeight:affectFilter===c.id?700:500, color:affectFilter===c.id?"#fff":"#6B7280", background:affectFilter===c.id?ACCENT:"#F3F4F6", borderRadius:20, padding:"5px 12px", border:"none", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }}>
                    {c.label} {c.count}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ flex:1, overflowY:"auto", padding:"8px 16px 24px" }}>
              <Card>
                {allAgents.filter(a=>!affectSearch||a.name.toLowerCase().includes(affectSearch.toLowerCase())).slice(0,6).map((a,i,arr)=>{
                  const isRec = recommended.some(r=>r.id===a.id);
                  const inProj = p.agents.includes(a.id);
                  return (
                    <div key={a.id}>
                      <div style={{ display:"flex", alignItems:"center", gap:11, padding:"11px 14px" }}>
                        <AgentIcon name={a.name} dept={a.dept} size={34} />
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontFamily:SF, fontSize:14, fontWeight:500, color:"#111827" }}>{a.name}</div>
                          <div style={{ fontFamily:SF, fontSize:12, color:"#9CA3AF" }}>{DEPTS.find(d=>d.id===a.dept)?.label}</div>
                          {isRec && <span style={{ fontFamily:SF, fontSize:10, fontWeight:600, color:"#F59E0B", background:"#FEF3C7", borderRadius:6, padding:"1px 6px" }}>Recommandé</span>}
                        </div>
                        {inProj
                          ? <span style={{ fontFamily:SF, fontSize:11, color:"#10B981", fontWeight:600 }}>✓ Affecté</span>
                          : <button style={{ background:`${ACCENT}14`, color:ACCENT, border:"none", borderRadius:8, padding:"6px 12px", fontFamily:SF, fontSize:12, fontWeight:600, cursor:"pointer" }}>+ Ajouter</button>
                        }
                      </div>
                      {i<arr.length-1 && <Divider indent={59} />}
                    </div>
                  );
                })}
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── DESKTOP SCREENS ──────────────────────────────────────────────────────────

function DeskAccueil({ agents, fil, setActiveTab, onAgent, onFil }) {
  const all      = Object.values(agents).flat();
  const pending  = fil.filter(f=>!f.resolved);
  const counts   = { urgent:pending.filter(f=>f.type==="urgent").length, action:pending.filter(f=>f.type==="action").length, review:pending.filter(f=>f.type==="review").length, info:pending.filter(f=>f.type==="info").length };
  const avgProg  = Math.round(INIT_PROJETS.reduce((s,p)=>s+p.progress,0)/INIT_PROJETS.length);
  const sparkR   = [28,34,39,44,48,52,55,58,60,63,65,avgProg];
  const sparkF   = [null,null,null,null,null,null,null,null,null,avgProg,avgProg+3,avgProg+6,avgProg+10];

  const SparkMini = ({data,color,w=120,h=32,dashed=false})=>{
    const vals=data.filter(Boolean); if(vals.length<2) return null;
    const min=Math.min(...vals),max=Math.max(...vals),range=max-min||1;
    const pts=data.map((v,i)=>v!=null?[2+(i/(data.length-1))*(w-4),h-2-((v-min)/range)*(h-6)]:null);
    const valid=pts.filter(Boolean);
    const d=valid.map((p,i)=>(i===0?"M":"L")+p[0].toFixed(1)+","+p[1].toFixed(1)).join(" ");
    return <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none"><path d={d} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dashed?"5 3":"none"} opacity={dashed?0.5:1}/></svg>;
  };

  const recentActivity = [
    { time:"Il y a 10 min", agent:"Marketing Agent",     dept:"marketing",  msg:"Mise à jour avancement",       sub:"EDF - Architecture SI" },
    { time:"Il y a 30 min", agent:"Consulting Assistant",dept:"consulting", msg:"Offre Covéa v2 finalisée",     sub:"BPCE - Transfo IA" },
    { time:"Il y a 45 min", agent:"Marketing Agent",     dept:"marketing",  msg:"Analyse campagne Q4 prête",    sub:"Marketing Agent" },
    { time:"Il y a 1 h",    agent:"RH Agent",            dept:"rh",         msg:"Plan de formation 2025 soumis",sub:"RH Agent" },
    { time:"Il y a 2 h",    agent:"Contract Reviewer",   dept:"legal",      msg:"NDA Prova analysé",            sub:"Contract Reviewer" },
  ];

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"28px 32px" }}>
      <div style={{ marginBottom:24 }}>
        <h1 style={{ fontFamily:SF, fontSize:24, fontWeight:700, color:"#111827", margin:"0 0 4px", letterSpacing:"-0.03em" }}>Bonjour Romain 👋</h1>
        <p style={{ fontFamily:SF, fontSize:14, color:"#6B7280", margin:0 }}>Voici votre vue d'ensemble de votre SI Agentique.</p>
      </div>

      {/* KPI row */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 }}>
        {[
          { label:"À traiter",         value:pending.length, sub:`+${counts.urgent} urgentes`, color:"#EF4444", icon:"📋", bg:"#FEF2F2" },
          { label:"Projets en cours",  value:INIT_PROJETS.length, sub:"2 à risque",            color:"#F97316", icon:"📁", bg:"#FFF7ED" },
          { label:"Agents actifs",     value:all.filter(a=>a.active).length, sub:"+12% vs hier",color:"#6366F1", icon:"🤖", bg:"#EEF2FF" },
          { label:"Travaux en cours",  value:all.filter(a=>a.status==="running").length, sub:"+8% vs hier", color:"#10B981", icon:"⚡", bg:"#ECFDF5" },
        ].map(k=>(
          <div key={k.label} style={{ background:"#fff", borderRadius:14, padding:"18px 20px", boxShadow:"0 1px 3px rgba(0,0,0,0.06)", display:"flex", alignItems:"flex-start", gap:14 }}>
            <div style={{ width:44, height:44, borderRadius:12, background:k.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{k.icon}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontFamily:SF, fontSize:28, fontWeight:700, color:k.color, letterSpacing:"-0.04em", lineHeight:1 }}>{k.value}</div>
              <div style={{ fontFamily:SF, fontSize:12, color:"#9CA3AF", marginTop:4 }}>{k.label}</div>
              <div style={{ fontFamily:SF, fontSize:11, color:k.color, fontWeight:600, marginTop:2 }}>{k.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1.3fr 1fr", gap:18, marginBottom:18 }}>
        {/* Avancement global */}
        <div style={{ background:"#fff", borderRadius:14, padding:"20px", boxShadow:"0 1px 3px rgba(0,0,0,0.06)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
            <div>
              <div style={{ fontFamily:SF, fontSize:16, fontWeight:700, color:"#111827" }}>Avancement global des projets</div>
              <div style={{ fontFamily:SF, fontSize:12, color:"#9CA3AF", marginTop:2 }}>30 derniers jours</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontFamily:SF, fontSize:32, fontWeight:700, color:ACCENT, letterSpacing:"-0.04em" }}>{avgProg}%</div>
              <div style={{ fontFamily:SF, fontSize:11, color:"#10B981", fontWeight:600 }}>+8% vs hier</div>
            </div>
          </div>
          {/* Dual sparkline */}
          <div style={{ marginBottom:16, position:"relative" }}>
            <svg width="100%" height="80" viewBox="0 0 480 80" preserveAspectRatio="none" fill="none">
              {/* Y labels */}
              {[100,75,50,25,0].map((v,i)=>(
                <text key={v} x="0" y={4+i*18} fontFamily={SF} fontSize="9" fill="#D1D5DB">{v}%</text>
              ))}
              {/* Realized line */}
              <polyline points={sparkR.map((v,i)=>`${28+i*(452/11)},${70-((v/100)*60)}`).join(" ")} stroke={ACCENT} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              {/* Forecast dashed */}
              <polyline points={sparkF.filter(Boolean).map((v,i)=>`${28+(i+9)*(452/11)},${70-((v/100)*60)}`).join(" ")} stroke={ACCENT} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 3" opacity="0.5"/>
              {/* Current dot */}
              <circle cx={`${28+11*(452/11)}`} cy={`${70-((avgProg/100)*60)}`} r="4" fill={ACCENT}/>
            </svg>
            <div style={{ display:"flex", gap:16, marginTop:6 }}>
              <div style={{ display:"flex", alignItems:"center", gap:5 }}><div style={{ width:16, height:2, background:ACCENT, borderRadius:1 }}/><span style={{ fontFamily:SF, fontSize:11, color:"#6B7280" }}>Réalisé</span></div>
              <div style={{ display:"flex", alignItems:"center", gap:5 }}><div style={{ width:16, height:2, background:ACCENT, borderRadius:1, opacity:0.5, backgroundImage:"repeating-linear-gradient(90deg,#4F46E5 0,#4F46E5 4px,transparent 4px,transparent 8px)" }}/><span style={{ fontFamily:SF, fontSize:11, color:"#6B7280" }}>Prévisionnel</span></div>
            </div>
          </div>
          {/* Projects list */}
          <div>
            {INIT_PROJETS.map((p,i)=>{
              const badge = p.travaux.blocked>0?{l:"Bloqué",c:"#EF4444"} : p.travaux.late>2?{l:`${p.travaux.late} en retard`,c:"#F59E0B"} : p.travaux.risk>2?{l:`${p.travaux.risk} à risque`,c:"#F97316"} : {l:"Sain",c:"#10B981"};
              return (
                <div key={p.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 0", borderTop:i>0?"0.5px solid #F3F4F6":"none" }}>
                  <div style={{ width:24, height:24, borderRadius:7, background:p.color+"18", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, flexShrink:0 }}>{p.logo}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontFamily:SF, fontSize:13, fontWeight:500, color:"#111827", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.name}</div>
                    <div style={{ height:3, background:"#F3F4F6", borderRadius:2, marginTop:4, overflow:"hidden" }}><div style={{ height:"100%", width:`${p.progress}%`, background:p.color, borderRadius:2 }}/></div>
                  </div>
                  <div style={{ fontFamily:SF, fontSize:12, fontWeight:700, color:p.color, width:36, textAlign:"right", flexShrink:0 }}>{p.progress}%</div>
                  <span style={{ fontFamily:SF, fontSize:11, fontWeight:600, color:badge.c, background:badge.c+"14", borderRadius:6, padding:"2px 8px", flexShrink:0, minWidth:80, textAlign:"center" }}>{badge.l}</span>
                </div>
              );
            })}
            <button onClick={()=>setActiveTab("projets")} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:SF, fontSize:13, color:ACCENT, fontWeight:600, padding:"8px 0 0", display:"block" }}>Voir tous les projets →</button>
          </div>
        </div>

        {/* Activité récente */}
        <div style={{ background:"#fff", borderRadius:14, padding:"20px", boxShadow:"0 1px 3px rgba(0,0,0,0.06)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <div style={{ fontFamily:SF, fontSize:16, fontWeight:700, color:"#111827" }}>Activité récente</div>
            <button style={{ background:"none", border:"none", cursor:"pointer", fontFamily:SF, fontSize:13, color:ACCENT, fontWeight:600, padding:0 }}>Voir tout</button>
          </div>
          {recentActivity.map((a,i)=>{
            const d=DEPTS.find(x=>x.id===a.dept)||DEPTS[0];
            return (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 0", borderTop:i>0?"0.5px solid #F3F4F6":"none" }}>
                <div style={{ width:32, height:32, borderRadius:9, background:d.light, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{agentEmoji(a.agent)}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:SF, fontSize:13, fontWeight:500, color:"#111827" }}>{a.msg}</div>
                  <div style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF", marginTop:1 }}>{a.agent}</div>
                </div>
                <span style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF", flexShrink:0 }}>{a.time}</span>
              </div>
            );
          })}
          {/* À traiter compact */}
          <div style={{ marginTop:16, paddingTop:14, borderTop:"0.5px solid #F3F4F6" }}>
            <div style={{ fontFamily:SF, fontSize:13, fontWeight:600, color:"#111827", marginBottom:10 }}>À traiter</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:8 }}>
              {[{k:"urgent",l:"Urgentes",c:"#EF4444",bg:"#FEF2F2"},{k:"action",l:"À valider",c:"#F97316",bg:"#FFF7ED"},{k:"review",l:"À relire",c:"#0EA5E9",bg:"#EFF6FF"},{k:"info",l:"Info",c:"#8B5CF6",bg:"#F5F3FF"}].map(x=>(
                <button key={x.k} onClick={()=>setActiveTab("fil")} style={{ background:x.bg, border:`1px solid ${x.c}18`, borderRadius:10, padding:"8px 6px", cursor:"pointer", textAlign:"center" }}>
                  <div style={{ fontFamily:SF, fontSize:18, fontWeight:700, color:x.c }}>{counts[x.k]}</div>
                  <div style={{ fontFamily:SF, fontSize:10, color:x.c, fontWeight:600, marginTop:2 }}>{x.l}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* IA recommendation banner */}
      <div style={{ background:"linear-gradient(135deg,#4F46E5,#7C3AED 60%,#6366F1)", borderRadius:14, padding:"18px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <IqoLogo variant="icon" size={40} onDark={true} />
          <div>
            <div style={{ fontFamily:SF, fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.65)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:4 }}>Recommandation du jour</div>
            <div style={{ fontFamily:SF, fontSize:15, fontWeight:600, color:"#fff", lineHeight:1.4 }}>EDF Architecture SI prend du retard sur la revue d'architecture. Relancez le Consulting Assistant pour débloquer la prochaine étape.</div>
          </div>
        </div>
        <button style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.3)", borderRadius:10, padding:"9px 18px", fontFamily:SF, fontSize:13, fontWeight:600, color:"#fff", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }}>Voir le détail →</button>
      </div>
    </div>
  );
}

function DeskProjets({ agents, onAgent }) {
  const [search,   setSearch]   = useState("");
  const [selProj,  setSelProj]  = useState(null);
  const [openChat, setOpenChat] = useState(false);
  const [chatInput,  setChatInput]  = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id:1, from:"agent", agentId:"co-1", agentName:"Intel Watcher", text:"Bonjour Romain. Tout avance conformément au plan. Un point d'attention sur la revue d'architecture cible.", time:"10:30" },
  ]);

  const allAgents = Object.values(agents).flat();
  const shown = INIT_PROJETS.filter(p=>!search||p.name.toLowerCase().includes(search.toLowerCase())||p.client.toLowerCase().includes(search.toLowerCase()));

  const sendMsg = (proj) => {
    if(!chatInput.trim()) return;
    const userMsg = { id:Date.now(), from:"user", text:chatInput.trim(), time:"Maintenant" };
    setChatMessages(prev=>[...prev, userMsg]);
    setChatInput("");
    setTimeout(()=>{
      const respAgent = allAgents.find(a=>proj.agents.includes(a.id));
      setChatMessages(prev=>[...prev, { id:Date.now()+1, from:"agent", agentId:respAgent?.id, agentName:respAgent?.name||"Agent", text:"Bien reçu. Je traite votre demande et vous reviens rapidement.", time:"Maintenant" }]);
    }, 1000);
  };

  return (
    <div style={{ flex:1, display:"flex", overflow:"hidden" }}>
      {/* Main list */}
      <div style={{ flex:1, overflowY:"auto", padding:"28px 32px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
          <h1 style={{ fontFamily:SF, fontSize:22, fontWeight:700, color:"#111827", margin:0, letterSpacing:"-0.02em" }}>Projets</h1>
          <button style={{ background:ACCENT, color:"#fff", border:"none", borderRadius:10, padding:"9px 18px", fontFamily:SF, fontSize:13, fontWeight:600, cursor:"pointer" }}>+ Nouveau projet</button>
        </div>
        <div style={{ display:"flex", gap:10, marginBottom:16 }}>
          <div style={{ flex:1, background:"#fff", borderRadius:10, padding:"8px 14px", display:"flex", alignItems:"center", gap:8, border:"0.5px solid #E5E7EB" }}>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="8.5" r="6.5" stroke="#9CA3AF" strokeWidth="1.8"/><path d="M13.5 13.5L18 18" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round"/></svg>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher un projet, un client…" style={{ border:"none", outline:"none", fontFamily:SF, fontSize:13, color:"#111827", background:"transparent", flex:1 }}/>
          </div>
          {["Statut ▾","Client ▾","Responsable ▾"].map(f=>(
            <button key={f} style={{ background:"#fff", border:"0.5px solid #E5E7EB", borderRadius:10, padding:"8px 14px", fontFamily:SF, fontSize:13, color:"#374151", cursor:"pointer", whiteSpace:"nowrap" }}>{f}</button>
          ))}
        </div>
        <div style={{ background:"#fff", borderRadius:14, boxShadow:"0 1px 3px rgba(0,0,0,0.06)", overflow:"hidden" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1.5fr 1fr 1fr 1fr 120px", gap:0, padding:"10px 20px", borderBottom:"0.5px solid #F3F4F6", background:"#F9FAFB" }}>
            {["Projet","Client","Avancement","Statut","Responsable","Échéance",""].map(h=>(
              <div key={h} style={{ fontFamily:SF, fontSize:11, fontWeight:700, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:"0.04em" }}>{h}</div>
            ))}
          </div>
          {shown.map((p,i)=>{
            const badge = p.travaux.blocked>0?{l:"Bloqué",c:"#EF4444",bg:"#FEF2F2"} : p.travaux.late>2?{l:"En retard",c:"#F59E0B",bg:"#FEF3C7"} : p.travaux.risk>3?{l:"À risque",c:"#F97316",bg:"#FFF7ED"} : {l:"Sain",c:"#10B981",bg:"#DCFCE7"};
            const owner = OWNERS.find(o=>o.id===p.owner)||OWNERS[0];
            const isSelected = selProj?.id===p.id;
            const pAgents = allAgents.filter(a=>p.agents.includes(a.id));
            return (
              <div key={p.id} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1.5fr 1fr 1fr 1fr 120px", gap:0, padding:"13px 20px", borderBottom:i<shown.length-1?"0.5px solid #F3F4F6":"none", alignItems:"center", cursor:"pointer", background:isSelected?`${ACCENT}06`:"transparent", transition:"background 0.15s" }}
                onClick={()=>{ setSelProj(isSelected?null:p); setOpenChat(false); setChatMessages([{ id:1, from:"agent", agentId:p.agents[0], agentName:"Agent", text:`Bonjour Romain. Tout avance sur ${p.name}. Prochaine étape : ${p.nextStep}.`, time:"Maintenant" }]); }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  {isSelected && <div style={{ width:3, height:36, background:ACCENT, borderRadius:2, marginLeft:-8, flexShrink:0 }}/>}
                  <div style={{ width:32, height:32, borderRadius:9, background:p.color+"18", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, flexShrink:0 }}>{p.logo}</div>
                  <div>
                    <div style={{ fontFamily:SF, fontSize:13, fontWeight:600, color:isSelected?ACCENT:"#111827" }}>{p.name}</div>
                    <div style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF", marginTop:1 }}>{allAgents.filter(a=>p.agents.includes(a.id)).length} agents · {p.travaux.total} travaux</div>
                  </div>
                </div>
                <div style={{ fontFamily:SF, fontSize:13, color:"#374151" }}>{p.client}</div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ flex:1, height:5, background:"#F3F4F6", borderRadius:3, overflow:"hidden" }}><div style={{ height:"100%", width:`${p.progress}%`, background:p.color, borderRadius:3 }}/></div>
                  <span style={{ fontFamily:SF, fontSize:12, fontWeight:700, color:p.color, flexShrink:0 }}>{p.progress}%</span>
                </div>
                <div><span style={{ fontFamily:SF, fontSize:11, fontWeight:700, color:badge.c, background:badge.bg, borderRadius:7, padding:"3px 9px" }}>{badge.l}</span></div>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <div style={{ width:24, height:24, borderRadius:"50%", background:owner.color+"22", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:SF, fontSize:9, fontWeight:700, color:owner.color }}>{owner.initials}</div>
                  <span style={{ fontFamily:SF, fontSize:12, color:"#374151" }}>{owner.name.split(" ")[0]}</span>
                </div>
                <div style={{ fontFamily:SF, fontSize:12, color:"#6B7280" }}>{p.deadline}</div>
                {/* Chat + detail buttons */}
                <div style={{ display:"flex", gap:6 }} onClick={e=>e.stopPropagation()}>
                  <button onClick={()=>{ if(!isSelected){ setSelProj(p); setChatMessages([{ id:1, from:"agent", agentId:p.agents[0], agentName:"Agent", text:`Bonjour Romain. Tout avance sur ${p.name}. Prochaine étape : ${p.nextStep}.`, time:"Maintenant" }]); } setOpenChat(c=>!c); }}
                    style={{ background:isSelected&&openChat?ACCENT:`${ACCENT}14`, color:isSelected&&openChat?"#fff":ACCENT, border:"none", borderRadius:7, padding:"5px 10px", fontFamily:SF, fontSize:11, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:4 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                    Chat
                  </button>
                  <button onClick={()=>{ setSelProj(isSelected?null:p); setOpenChat(false); }}
                    style={{ background:isSelected&&!openChat?ACCENT:`${ACCENT}14`, color:isSelected&&!openChat?"#fff":ACCENT, border:"none", borderRadius:7, padding:"5px 10px", fontFamily:SF, fontSize:11, fontWeight:600, cursor:"pointer" }}>
                    Détail
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ fontFamily:SF, fontSize:12, color:"#9CA3AF", marginTop:10 }}>1–{shown.length} sur {INIT_PROJETS.length} projets</div>
      </div>

      {/* Side panel — project detail or chat */}
      {selProj && (
        <div style={{ width:400, borderLeft:"0.5px solid #E5E7EB", background:"#fff", display:"flex", flexDirection:"column", flexShrink:0, animation:"slideInRight 0.2s ease" }}>
          {/* Panel header */}
          <div style={{ padding:"20px 20px 0", borderBottom:"0.5px solid #F3F4F6", flexShrink:0 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:32, height:32, borderRadius:9, background:selProj.color+"18", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{selProj.logo}</div>
                <div>
                  <div style={{ fontFamily:SF, fontSize:14, fontWeight:700, color:"#111827" }}>{selProj.name}</div>
                  <div style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF" }}>{selProj.client}</div>
                </div>
              </div>
              <button onClick={()=>setSelProj(null)} style={{ background:"none", border:"none", cursor:"pointer", color:"#9CA3AF", fontSize:20, lineHeight:1 }}>×</button>
            </div>
            {/* Tab toggle */}
            <div style={{ display:"flex", gap:0 }}>
              {["Détail","Chat équipe"].map(t=>{
                const active = (t==="Chat équipe")===openChat;
                return <button key={t} onClick={()=>setOpenChat(t==="Chat équipe")} style={{ fontFamily:SF, fontSize:13, fontWeight:active?600:400, color:active?ACCENT:"#6B7280", background:"none", border:"none", cursor:"pointer", padding:"8px 12px", borderBottom:active?`2px solid ${ACCENT}`:"2px solid transparent" }}>{t}</button>;
              })}
            </div>
          </div>

          {/* Detail tab — full tabbed view matching mobile */}
          {!openChat && (
            <div style={{ flex:1, overflowY:"auto" }}>
              <ProjetDetail
                projet={selProj}
                agents={agents}
                allAgents={Object.values(agents).flat()}
                onBack={()=>setSelProj(null)}
                onAgent={onAgent}
                embedded={true}
              />
            </div>
          )}

          {/* Chat tab */}
          {openChat && (
            <>
              {/* Agent pills */}
              <div style={{ padding:"10px 16px 8px", borderBottom:"0.5px solid #F3F4F6", display:"flex", gap:6, overflowX:"auto", flexShrink:0 }}>
                {Object.values(agents).flat().filter(a=>selProj.agents.includes(a.id)).map(a=>{
                  const d=DEPTS.find(x=>x.id===a.dept)||DEPTS[0];
                  return <span key={a.id} style={{ fontFamily:SF, fontSize:11, fontWeight:600, color:d.color, background:d.light, borderRadius:20, padding:"3px 10px", whiteSpace:"nowrap", flexShrink:0 }}>{agentEmoji(a.name)} {a.name.split(" ")[0]}</span>;
                })}
              </div>
              {/* Messages */}
              <div style={{ flex:1, overflowY:"auto", padding:"12px 16px", display:"flex", flexDirection:"column", gap:10 }}>
                {chatMessages.map(m=>{
                  const isUser=m.from==="user";
                  const agent=Object.values(agents).flat().find(a=>a.id===m.agentId);
                  const d=agent?DEPTS.find(x=>x.id===agent.dept)||DEPTS[0]:DEPTS[0];
                  return (
                    <div key={m.id} style={{ display:"flex", flexDirection:"column", alignItems:isUser?"flex-end":"flex-start" }}>
                      {!isUser && <div style={{ fontFamily:SF, fontSize:10, fontWeight:600, color:d.color, marginBottom:3, marginLeft:32 }}>{m.agentName}</div>}
                      <div style={{ display:"flex", alignItems:"flex-end", gap:7, maxWidth:"88%", flexDirection:isUser?"row-reverse":"row" }}>
                        {!isUser && <div style={{ width:24, height:24, borderRadius:7, background:d.light, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, flexShrink:0 }}>{agentEmoji(agent?.name||"")}</div>}
                        {isUser && <img src={AVATAR_RV} alt="Romain Villar" style={{ width:22, height:22, borderRadius:"50%", objectFit:"cover", flexShrink:0, display:"block" }}/>}
                        <div style={{ background:isUser?ACCENT:"#F3F4F6", color:isUser?"#fff":"#111827", borderRadius:isUser?"12px 12px 3px 12px":"12px 12px 12px 3px", padding:"9px 12px", fontFamily:SF, fontSize:13, lineHeight:1.45 }}>{m.text}</div>
                      </div>
                      <span style={{ fontFamily:SF, fontSize:10, color:"#C7C7CC", marginTop:2, [isUser?"marginRight":"marginLeft"]:30 }}>{m.time}</span>
                    </div>
                  );
                })}
              </div>
              {/* Quick suggestions */}
              <div style={{ padding:"0 12px 6px", display:"flex", gap:6, overflowX:"auto", flexShrink:0 }}>
                {["État d'avancement ?","Blocages ?","Prépare un résumé"].map(s=>(
                  <button key={s} onClick={()=>setChatInput(s)} style={{ fontFamily:SF, fontSize:11, color:ACCENT, background:`${ACCENT}10`, border:`1px solid ${ACCENT}25`, borderRadius:20, padding:"4px 10px", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }}>{s}</button>
                ))}
              </div>
              {/* Input */}
              <div style={{ padding:"8px 12px 16px", borderTop:"0.5px solid #F3F4F6", display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
                <input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMsg(selProj)}
                  placeholder="Message à l'équipe projet…"
                  style={{ flex:1, background:"#F3F4F6", border:"none", outline:"none", borderRadius:20, padding:"8px 14px", fontFamily:SF, fontSize:13, color:"#111827" }}/>
                <button onClick={()=>sendMsg(selProj)} disabled={!chatInput.trim()}
                  style={{ width:34, height:34, borderRadius:"50%", background:chatInput.trim()?ACCENT:"#E5E7EB", border:"none", cursor:chatInput.trim()?"pointer":"default", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"background 0.2s" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function DeskAgents({ agents, setAgents, onAgent }) {
  const [search, setSearch] = useState("");
  const all = Object.values(agents).flat();
  const shown = search ? all.filter(a=>[a.name,a.desc,(DEPTS.find(d=>d.id===a.dept)||{}).label||""].some(s=>s.toLowerCase().includes(search.toLowerCase()))) : all;
  const toggle = id => setAgents(prev=>{ const n={}; Object.keys(prev).forEach(dep=>{ n[dep]=prev[dep].map(a=>a.id===id?{...a,active:!a.active}:a); }); return n; });

  // KPIs
  const activeCount = all.filter(a=>a.active).length;
  const runningCount = all.filter(a=>a.status==="running").length;
  const avgSuccess = Math.round(all.reduce((s,a)=>s+(a.successRate||0),0)/all.length);
  const totalRuns24 = all.reduce((s,a)=>s+(a.runs||0),0);

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"28px 32px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
        <h1 style={{ fontFamily:SF, fontSize:22, fontWeight:700, color:"#111827", margin:0, letterSpacing:"-0.02em" }}>Agents</h1>
        <button style={{ background:ACCENT, color:"#fff", border:"none", borderRadius:10, padding:"9px 18px", fontFamily:SF, fontSize:13, fontWeight:600, cursor:"pointer" }}>+ Créer un agent</button>
      </div>
      {/* KPIs */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:22 }}>
        {[{v:activeCount,l:"Agents actifs",d:"+12% vs hier",c:ACCENT},{v:runningCount,l:"En veille",d:"+2% vs hier",c:"#10B981"},{v:avgSuccess+"%",l:"Taux de succès",d:"+4% vs hier",c:"#F97316"},{v:totalRuns24,l:"Exécutions (24h)",d:"+16% vs hier",c:"#7C3AED"}].map(k=>(
          <div key={k.l} style={{ background:"#fff", borderRadius:12, padding:"16px 18px", boxShadow:"0 1px 3px rgba(0,0,0,0.06)" }}>
            <div style={{ fontFamily:SF, fontSize:28, fontWeight:700, color:k.c, letterSpacing:"-0.04em", lineHeight:1 }}>{k.v}</div>
            <div style={{ fontFamily:SF, fontSize:12, color:"#9CA3AF", marginTop:4 }}>{k.l}</div>
            <div style={{ fontFamily:SF, fontSize:11, color:"#10B981", fontWeight:600, marginTop:2 }}>{k.d}</div>
          </div>
        ))}
      </div>
      {/* Filters + search */}
      <div style={{ display:"flex", gap:10, marginBottom:14 }}>
        <div style={{ flex:1, background:"#fff", borderRadius:10, padding:"8px 14px", display:"flex", alignItems:"center", gap:8, border:"0.5px solid #E5E7EB" }}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="8.5" r="6.5" stroke="#9CA3AF" strokeWidth="1.8"/><path d="M13.5 13.5L18 18" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round"/></svg>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher un agent…" style={{ border:"none", outline:"none", fontFamily:SF, fontSize:13, color:"#111827", background:"transparent", flex:1 }}/>
        </div>
        {["Type ▾","Statut ▾","Service ▾","Plus de filtres ▾"].map(f=>(
          <button key={f} style={{ background:"#fff", border:"0.5px solid #E5E7EB", borderRadius:10, padding:"8px 14px", fontFamily:SF, fontSize:13, color:"#374151", cursor:"pointer", whiteSpace:"nowrap" }}>{f}</button>
        ))}
      </div>
      {/* Table */}
      <div style={{ background:"#fff", borderRadius:14, boxShadow:"0 1px 3px rgba(0,0,0,0.06)", overflow:"hidden" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1fr 80px", gap:0, padding:"10px 20px", borderBottom:"0.5px solid #F3F4F6", background:"#F9FAFB" }}>
          {["Agent","Type","Service","Statut","Exécutions (24h)","Taux de succès","Actif"].map(h=>(
            <div key={h} style={{ fontFamily:SF, fontSize:11, fontWeight:700, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:"0.04em" }}>{h}</div>
          ))}
        </div>
        {shown.map((a,i)=>{
          const d=DEPTS.find(x=>x.id===a.dept)||DEPTS[0];
          const sc=STATUS_CFG[a.active?a.status:"idle"]||STATUS_CFG.idle;
          const owner=OWNERS.find(o=>o.id===a.owner)||OWNERS[0];
          return (
            <div key={a.id} onClick={()=>onAgent(a)} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1fr 80px", gap:0, padding:"11px 20px", borderBottom:i<shown.length-1?"0.5px solid #F3F4F6":"none", alignItems:"center", cursor:"pointer" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <AgentIcon name={a.name} dept={a.dept} size={32}/>
                <div>
                  <div style={{ fontFamily:SF, fontSize:13, fontWeight:500, color:"#111827" }}>{a.name}</div>
                  <div style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF", marginTop:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:160 }}>{a.desc}</div>
                </div>
              </div>
              <div style={{ fontFamily:SF, fontSize:12, color:"#374151" }}>{a.trigger}</div>
              <div><span style={{ fontFamily:SF, fontSize:11, fontWeight:600, color:d.color, background:d.light, borderRadius:6, padding:"2px 8px" }}>{d.short}</span></div>
              <div><span style={{ fontFamily:SF, fontSize:11, fontWeight:600, color:sc.color, background:sc.bg, borderRadius:6, padding:"2px 8px" }}>{sc.label}</span></div>
              <div style={{ fontFamily:SF, fontSize:13, fontWeight:600, color:"#111827" }}>{a.runs||0}</div>
              <div style={{ fontFamily:SF, fontSize:13, fontWeight:600, color:a.successRate>=90?"#10B981":a.successRate>=75?"#F59E0B":"#EF4444" }}>{a.successRate||0}%</div>
              <div onClick={e=>{ e.stopPropagation(); toggle(a.id); }}>
                <IOSToggle on={a.active} onToggle={()=>toggle(a.id)} color={d.color} scale={0.85}/>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ fontFamily:SF, fontSize:12, color:"#9CA3AF", marginTop:10 }}>1–{shown.length} sur {all.length} agents</div>
    </div>
  );
}

function DeskServices({ agents }) {
  const all = Object.values(agents).flat();
  const sparkData = [62,70,75,65,80,82,78,85,88,90,87,92];

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"28px 32px" }}>
      <div style={{ marginBottom:22 }}>
        <h1 style={{ fontFamily:SF, fontSize:22, fontWeight:700, color:"#111827", margin:"0 0 4px", letterSpacing:"-0.02em" }}>Services</h1>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:18 }}>
        {DEPTS.filter(d=>(agents[d.id]||[]).length>0).map(d=>{
          const list=agents[d.id]||[];
          const runs24=list.reduce((s,a)=>s+(a.runs||0),0);
          const avgSuccess=list.length>0?Math.round(list.reduce((s,a)=>s+(a.successRate||0),0)/list.length):0;
          const health=list.some(a=>a.status==="error")?"#EF4444":list.filter(a=>a.status==="waiting").length>1?"#F59E0B":"#10B981";
          return (
            <div key={d.id} style={{ background:"#fff", borderRadius:14, padding:"18px", boxShadow:"0 1px 3px rgba(0,0,0,0.06)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                <div style={{ width:38, height:38, borderRadius:11, background:d.light, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{d.emoji}</div>
                <div>
                  <div style={{ fontFamily:SF, fontSize:14, fontWeight:700, color:"#111827" }}>{d.label}</div>
                  <div style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF" }}>{list.length} agents</div>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:0, marginBottom:12, paddingBottom:12, borderBottom:"0.5px solid #F3F4F6" }}>
                {[{v:list.filter(a=>a.status==="running").length,l:"En cours",c:d.color},{v:list.filter(a=>a.status==="waiting").length,l:"En attente",c:"#F59E0B"},{v:list.filter(a=>a.status==="error").length,l:"En erreur",c:"#EF4444"}].map(k=>(
                  <div key={k.l} style={{ textAlign:"center" }}>
                    <div style={{ fontFamily:SF, fontSize:20, fontWeight:700, color:k.c }}>{k.v}</div>
                    <div style={{ fontFamily:SF, fontSize:10, color:"#9CA3AF", marginTop:2 }}>{k.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF" }}>Exécutions (24h)</div>
                  <div style={{ fontFamily:SF, fontSize:16, fontWeight:700, color:"#111827" }}>{runs24}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF" }}>Taux de succès</div>
                  <div style={{ fontFamily:SF, fontSize:16, fontWeight:700, color:avgSuccess>=90?"#10B981":avgSuccess>=75?"#F59E0B":"#EF4444" }}>{avgSuccess}%</div>
                </div>
              </div>
              {/* Health bar */}
              <div style={{ marginTop:10, height:3, background:"#F3F4F6", borderRadius:2, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${avgSuccess}%`, background:d.color, borderRadius:2 }}/>
              </div>
              <div style={{ display:"flex", justifyContent:"flex-end", marginTop:6 }}>
                <span style={{ fontFamily:SF, fontSize:10, fontWeight:700, color:health, background:health+"14", borderRadius:6, padding:"2px 8px" }}>{health==="#10B981"?"Sain":health==="#F59E0B"?"À surveiller":"Attention"}</span>
              </div>
            </div>
          );
        })}
      </div>
      {/* Performance chart */}
      <div style={{ background:"#fff", borderRadius:14, padding:"20px", boxShadow:"0 1px 3px rgba(0,0,0,0.06)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <div style={{ fontFamily:SF, fontSize:15, fontWeight:700, color:"#111827" }}>Performance globale des services</div>
          <div style={{ display:"flex", gap:14 }}>
            <div style={{ display:"flex", alignItems:"center", gap:5 }}><div style={{ width:12, height:2, background:ACCENT, borderRadius:1 }}/><span style={{ fontFamily:SF, fontSize:11, color:"#6B7280" }}>Exécutions (24h)</span></div>
            <div style={{ display:"flex", alignItems:"center", gap:5 }}><div style={{ width:12, height:2, background:"#10B981", borderRadius:1 }}/><span style={{ fontFamily:SF, fontSize:11, color:"#6B7280" }}>Taux de succès</span></div>
          </div>
        </div>
        <svg width="100%" height="100" viewBox="0 0 800 100" preserveAspectRatio="none" fill="none">
          <polyline points={sparkData.map((v,i)=>`${i*(800/11)},${100-(v/100)*90}`).join(" ")} stroke={ACCENT} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points={sparkData.map((v,i)=>`${i*(800/11)},${100-((v*0.95)/100)*90}`).join(" ")} stroke="#10B981" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 3"/>
        </svg>
      </div>
    </div>
  );
}

function DeskSources() {
  const connOk   = ALL_SOURCES.filter(s=>s.status==="ok").length;
  const connWarn = ALL_SOURCES.filter(s=>s.status==="warn").length;
  const connErr  = ALL_SOURCES.filter(s=>s.status==="error").length;

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"28px 32px" }}>
      <div style={{ marginBottom:22 }}><h1 style={{ fontFamily:SF, fontSize:22, fontWeight:700, color:"#111827", margin:0, letterSpacing:"-0.02em" }}>Sources de données</h1></div>
      {/* KPIs */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:22 }}>
        {[{v:ALL_SOURCES.length,l:"Sources connectées",d:"",c:ACCENT},{v:"2.4 TB",l:"Données traitées (24h)",d:"+18% vs hier",c:"#10B981"},{v:"98%",l:"Qualité moyenne",d:"-2% vs hier",c:"#F97316"},{v:"5 min",l:"Dernière synchronisation",d:"",c:"#7C3AED"}].map(k=>(
          <div key={k.l} style={{ background:"#fff", borderRadius:12, padding:"16px 18px", boxShadow:"0 1px 3px rgba(0,0,0,0.06)" }}>
            <div style={{ fontFamily:SF, fontSize:26, fontWeight:700, color:k.c, letterSpacing:"-0.03em", lineHeight:1 }}>{k.v}</div>
            <div style={{ fontFamily:SF, fontSize:12, color:"#9CA3AF", marginTop:4 }}>{k.l}</div>
            {k.d && <div style={{ fontFamily:SF, fontSize:11, color:"#10B981", fontWeight:600, marginTop:2 }}>{k.d}</div>}
          </div>
        ))}
      </div>
      {/* Search + filters */}
      <div style={{ display:"flex", gap:10, marginBottom:14 }}>
        <div style={{ flex:1, background:"#fff", borderRadius:10, padding:"8px 14px", display:"flex", alignItems:"center", gap:8, border:"0.5px solid #E5E7EB" }}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="8.5" r="6.5" stroke="#9CA3AF" strokeWidth="1.8"/><path d="M13.5 13.5L18 18" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round"/></svg>
          <input placeholder="Rechercher une source…" style={{ border:"none", outline:"none", fontFamily:SF, fontSize:13, color:"#111827", background:"transparent", flex:1 }}/>
        </div>
        {["Type ▾","Statut ▾","Qualité ▾","Plus de filtres ▾"].map(f=>(
          <button key={f} style={{ background:"#fff", border:"0.5px solid #E5E7EB", borderRadius:10, padding:"8px 14px", fontFamily:SF, fontSize:13, color:"#374151", cursor:"pointer", whiteSpace:"nowrap" }}>{f}</button>
        ))}
      </div>
      {/* Table */}
      <div style={{ background:"#fff", borderRadius:14, boxShadow:"0 1px 3px rgba(0,0,0,0.06)", overflow:"hidden" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1fr", gap:0, padding:"10px 20px", borderBottom:"0.5px solid #F3F4F6", background:"#F9FAFB" }}>
          {["Source","Type","Connecteur","Qualité","Statut","Dernière sync"].map(h=>(
            <div key={h} style={{ fontFamily:SF, fontSize:11, fontWeight:700, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:"0.04em" }}>{h}</div>
          ))}
        </div>
        {ALL_SOURCES.map((s,i)=>{
          const c=s.status==="ok"?"#10B981":s.status==="warn"?"#F59E0B":"#EF4444";
          const l=s.status==="ok"?"Connectée":s.status==="warn"?"Expiration proche":"Erreur";
          const q=s.status==="ok"?`${94+i}%`:s.status==="warn"?"87%":"—";
          return (
            <div key={s.id} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1fr", gap:0, padding:"12px 20px", borderBottom:i<ALL_SOURCES.length-1?"0.5px solid #F3F4F6":"none", alignItems:"center" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:32, height:32, borderRadius:9, background:"#F3F4F6", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>{s.icon}</div>
                <div>
                  <div style={{ fontFamily:SF, fontSize:13, fontWeight:500, color:"#111827" }}>{s.name}</div>
                  <div style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF" }}>{s.desc}</div>
                </div>
              </div>
              <div style={{ fontFamily:SF, fontSize:12, color:"#374151" }}>{s.type}</div>
              <div style={{ fontFamily:SF, fontSize:12, color:"#374151" }}>{s.type==="Interne"?"—":s.name.split(" ")[0]}</div>
              <div style={{ fontFamily:SF, fontSize:12, fontWeight:600, color:s.status==="ok"?"#10B981":"#F59E0B" }}>{q}</div>
              <div><span style={{ fontFamily:SF, fontSize:11, fontWeight:700, color:c, background:c+"14", borderRadius:6, padding:"2px 9px" }}>{l}</span></div>
              <div style={{ fontFamily:SF, fontSize:12, color:"#6B7280" }}>Il y a {2+i} min</div>
            </div>
          );
        })}
      </div>
      <div style={{ fontFamily:SF, fontSize:12, color:"#9CA3AF", marginTop:10 }}>1–{ALL_SOURCES.length} sur {ALL_SOURCES.length} sources</div>
    </div>
  );
}

function DeskFil({ fil, setFil, onAction }) {
  const pending  = fil.filter(f=>!f.resolved);
  const resolved = fil.filter(f=>f.resolved);
  const [filter, setFilter] = useState("all");
  const shown = filter==="all" ? [...pending].sort((a,b)=>(PRIO[a.type]?.order||9)-(PRIO[b.type]?.order||9)) : pending.filter(f=>f.type===filter);

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"28px 32px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
        <div>
          <h1 style={{ fontFamily:SF, fontSize:22, fontWeight:700, color:"#111827", margin:"0 0 4px", letterSpacing:"-0.02em" }}>Fil</h1>
          <p style={{ fontFamily:SF, fontSize:13, color:"#6B7280", margin:0 }}>{pending.length} actions en attente de votre traitement</p>
        </div>
        <div style={{ display:"flex", gap:6 }}>
          {[{id:"all",l:"Tout",c:"#111827"},{id:"urgent",l:"Urgent",c:"#EF4444"},{id:"action",l:"À valider",c:"#F97316"},{id:"review",l:"À relire",c:"#0EA5E9"},{id:"info",l:"Info",c:"#8B5CF6"}].map(f=>(
            <button key={f.id} onClick={()=>setFilter(f.id)} style={{ fontFamily:SF, fontSize:12, fontWeight:filter===f.id?700:500, color:filter===f.id?"#fff":f.c, background:filter===f.id?f.c:`${f.c}14`, borderRadius:20, padding:"6px 14px", border:"none", cursor:"pointer" }}>{f.l} {filter===f.id&&pending.filter(x=>f.id==="all"||x.type===f.id).length>0?`(${pending.filter(x=>f.id==="all"||x.type===f.id).length})`:""}</button>
          ))}
        </div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {shown.map(item=>{
          const p=PRIO[item.type]||PRIO.info;
          const d=DEPTS.find(x=>x.id===item.dept)||DEPTS[0];
          return (
            <div key={item.id} style={{ background:"#fff", borderRadius:14, boxShadow:"0 1px 3px rgba(0,0,0,0.06)", overflow:"hidden", display:"flex" }}>
              <div style={{ width:4, background:p.color, flexShrink:0 }}/>
              <div style={{ flex:1, padding:"16px 20px", display:"flex", alignItems:"center", gap:16 }}>
                <AgentIcon name={item.agent} dept={item.dept} size={40}/>
                <div style={{ flex:1, minWidth:0 }}>
                  {/* Primary: context + what to do */}
                  <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:4, flexWrap:"wrap" }}>
                    <span style={{ fontFamily:SF, fontSize:15, fontWeight:700, color:"#111827" }}>
                      {item.context}
                    </span>
                    <span style={{ fontFamily:SF, fontSize:13, color:p.color, fontWeight:600 }}>— {item.msg}</span>
                    <span style={{ fontFamily:SF, fontSize:11, fontWeight:700, color:p.color, background:p.bg, borderRadius:6, padding:"2px 7px" }}>{p.label}</span>
                  </div>
                  {/* Detail */}
                  <div style={{ fontFamily:SF, fontSize:13, color:"#6B7280", lineHeight:1.45, marginBottom:6 }}>{item.detail.slice(0,140)}…</div>
                  {/* Meta: agent, file, deadline */}
                  <div style={{ display:"flex", gap:12, flexWrap:"wrap", alignItems:"center" }}>
                    <span style={{ fontFamily:SF, fontSize:12, color:"#9CA3AF", display:"flex", alignItems:"center", gap:4 }}>
                      <AgentIcon name={item.agent} dept={item.dept} size={14}/>
                      {item.agent}
                    </span>
                    <DeptTag dept={item.dept}/>
                    {item.file && <span style={{ fontFamily:SF, fontSize:12, color:"#9CA3AF" }}>📎 {item.file}</span>}
                    {item.deadline && <span style={{ fontFamily:SF, fontSize:12, color:"#EF4444", fontWeight:600 }}>⏱ {item.deadline}</span>}
                  </div>
                </div>
                <div style={{ display:"flex", gap:8, flexShrink:0 }}>
                  <button onClick={()=>onAction(item)} style={{ background:p.color, color:"#fff", border:"none", borderRadius:9, padding:"8px 16px", fontFamily:SF, fontSize:13, fontWeight:700, cursor:"pointer" }}>{p.action} →</button>
                  <button onClick={()=>setFil(prev=>prev.map(f=>f.id===item.id?{...f,resolved:true,action:"later"}:f))} style={{ background:"#F3F4F6", color:"#6B7280", border:"none", borderRadius:9, padding:"8px 14px", fontFamily:SF, fontSize:13, fontWeight:600, cursor:"pointer" }}>Plus tard</button>
                </div>
              </div>
            </div>
          );
        })}
        {shown.length===0 && (
          <div style={{ background:"#fff", borderRadius:14, padding:"60px", textAlign:"center", boxShadow:"0 1px 3px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize:40, marginBottom:12 }}>✓</div>
            <div style={{ fontFamily:SF, fontSize:17, fontWeight:600, color:"#111827", marginBottom:6 }}>Tout est traité</div>
            <div style={{ fontFamily:SF, fontSize:14, color:"#9CA3AF" }}>Aucune action en attente</div>
          </div>
        )}
      </div>
    </div>
  );
}

function DeskAdmin({ agents, setAgents, onToggleView }) {
  const all = Object.values(agents).flat();
  const toggle = id => setAgents(prev=>{ const n={}; Object.keys(prev).forEach(dep=>{ n[dep]=prev[dep].map(a=>a.id===id?{...a,active:!a.active}:a); }); return n; });

  const MENU_SECTIONS = [
    { title:"Gestion de l'application", items:[
      { icon:"⚙️", label:"Paramètres généraux",  sub:"Nom, langue, fuseau horaire"             },
      { icon:"👥", label:"Utilisateurs & rôles",  sub:`${OWNERS.length} utilisateurs`           },
      { icon:"🏢", label:"Services",              sub:`${DEPTS.length} services configurés`     },
      { icon:"🤖", label:"Agents",               sub:`${all.length} agents · ${all.filter(a=>a.active).length} actifs` },
      { icon:"🔗", label:"Sources de données",   sub:`${ALL_SOURCES.filter(s=>s.status==="ok").length}/${ALL_SOURCES.length} connectées` },
      { icon:"🛡", label:"Sécurité & conformité",sub:"SSO activé"                               },
      { icon:"📋", label:"Audit logs",           sub:"Dernière activité il y a 2 min"           },
    ]},
    { title:"Informations", items:[
      { icon:"ℹ️", label:"Version",              sub:"1.4.2"                                    },
      { icon:"🌐", label:"Environnement",        sub:"Production"                              },
    ]},
  ];

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"28px 32px" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
        <h1 style={{ fontFamily:SF, fontSize:22, fontWeight:700, color:"#111827", margin:0, letterSpacing:"-0.02em" }}>Administration</h1>
        {onToggleView && (
          <button onClick={onToggleView} title="Basculer vers la vue mobile" style={{ width:36, height:36, borderRadius:10, background:`${ACCENT}10`, border:`1.5px solid ${ACCENT}25`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="7" y="2" width="10" height="20" rx="2" stroke={ACCENT} strokeWidth="1.8"/>
              <circle cx="12" cy="18" r="1" fill={ACCENT} opacity="0.6"/>
              <path d="M10 5h4" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
            </svg>
          </button>
        )}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"280px 1fr", gap:20 }}>
        {/* Left menu */}
        <div>
          {MENU_SECTIONS.map(sec=>(
            <div key={sec.title} style={{ marginBottom:20 }}>
              <div style={{ fontFamily:SF, fontSize:11, fontWeight:700, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:8 }}>{sec.title}</div>
              <div style={{ background:"#fff", borderRadius:12, boxShadow:"0 1px 3px rgba(0,0,0,0.06)", overflow:"hidden" }}>
                {sec.items.map((item,i,arr)=>(
                  <div key={item.label}>
                    <div style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 14px", cursor:"pointer" }}>
                      <div style={{ width:30, height:30, borderRadius:8, background:`${ACCENT}12`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>{item.icon}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontFamily:SF, fontSize:13, fontWeight:500, color:"#111827" }}>{item.label}</div>
                        <div style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF" }}>{item.sub}</div>
                      </div>
                      <svg width="6" height="11" viewBox="0 0 6 11" fill="none"><path d="M1 1l4 4.5L1 10" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    {i<arr.length-1 && <div style={{ height:"0.5px", background:"#F3F4F6", marginLeft:56 }}/>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Right — agent catalogue */}
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <div style={{ fontFamily:SF, fontSize:15, fontWeight:700, color:"#111827" }}>Catalogue des agents</div>
            <button style={{ background:ACCENT, color:"#fff", border:"none", borderRadius:9, padding:"7px 16px", fontFamily:SF, fontSize:12, fontWeight:600, cursor:"pointer" }}>+ Ajouter</button>
          </div>
          <div style={{ background:"#fff", borderRadius:12, boxShadow:"0 1px 3px rgba(0,0,0,0.06)", overflow:"hidden" }}>
            <div style={{ display:"grid", gridTemplateColumns:"2fr 1.2fr 0.8fr 0.8fr 0.8fr 60px", gap:0, padding:"9px 16px", background:"#F9FAFB", borderBottom:"0.5px solid #F3F4F6" }}>
              {["Agent","Mission","Owner","Déclencheur","Statut","Actif"].map(h=>(
                <div key={h} style={{ fontFamily:SF, fontSize:10, fontWeight:700, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:"0.04em" }}>{h}</div>
              ))}
            </div>
            {all.map((a,i)=>{
              const d=DEPTS.find(x=>x.id===a.dept)||DEPTS[0];
              const owner=OWNERS.find(o=>o.id===a.owner)||OWNERS[0];
              return (
                <div key={a.id}>
                  <div style={{ display:"grid", gridTemplateColumns:"2fr 1.2fr 0.8fr 0.8fr 0.8fr 60px", gap:0, padding:"9px 16px", alignItems:"center" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <AgentIcon name={a.name} dept={a.dept} size={26}/>
                      <div>
                        <div style={{ fontFamily:SF, fontSize:12, fontWeight:500, color:"#111827", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:140 }}>{a.name}</div>
                        <div style={{ fontFamily:SF, fontSize:10, color:"#9CA3AF" }}>{d.label}</div>
                      </div>
                    </div>
                    <div style={{ fontFamily:SF, fontSize:11, color:"#374151", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.mission}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                      <div style={{ width:18, height:18, borderRadius:"50%", background:owner.color+"22", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:SF, fontSize:7, fontWeight:700, color:owner.color }}>{owner.initials}</div>
                      <span style={{ fontFamily:SF, fontSize:11, color:"#374151", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{owner.name.split(" ")[0]}</span>
                    </div>
                    <div style={{ fontFamily:SF, fontSize:11, color:"#6B7280", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.trigger}</div>
                    <div><span style={{ fontFamily:SF, fontSize:10, fontWeight:600, color:a.active?"#10B981":"#9CA3AF", background:a.active?"#DCFCE7":"#F1F5F9", borderRadius:5, padding:"2px 7px" }}>{a.active?"Actif":"Inactif"}</span></div>
                    <IOSToggle on={a.active} onToggle={()=>toggle(a.id)} color={d.color} scale={0.75}/>
                  </div>
                  {i<all.length-1 && <div style={{ height:"0.5px", background:"#F3F4F6", marginLeft:16 }}/>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DESKTOP LAYOUT ───────────────────────────────────────────────────────────

function DesktopApp({ activeTab, setActiveTab, agents, setAgents, fil, setFil, filPending, filUrgent, actionSheet, setActionSheet, resolve, switchToMobile }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const all = Object.values(agents).flat();

  const NAV_CORE = [
    { id:"accueil",  label:"Dashboard", icon:<svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M3 12L12 3l9 9M5 10v9a1 1 0 001 1h4v-4h4v4h4a1 1 0 001-1v-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { id:"chat",     label:"Chats",      icon:<svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { id:"projets",  label:"Projets",   icon:<svg viewBox="0 0 24 24" fill="none" width="18" height="18"><rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg> },
    { id:"fil",      label:"Fil",       icon:<svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.8"/><path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>, badge: filPending },
  ];
  const NAV_SECONDARY = [
    { id:"agents",   label:"Agents",    icon:<svg viewBox="0 0 24 24" fill="none" width="18" height="18"><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/><path d="M2 21c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M19 8v6M22 11h-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg> },
    { id:"services", label:"Services",  icon:<svg viewBox="0 0 24 24" fill="none" width="18" height="18"><rect x="2" y="7" width="9" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="13" y="3" width="9" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.8"/></svg> },
    { id:"sources",  label:"Sources",   icon:<svg viewBox="0 0 24 24" fill="none" width="18" height="18"><ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="1.8"/><path d="M21 12c0 1.657-4.03 3-9 3s-9-1.343-9-3M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg> },
    { id:"admin",    label:"Admin",     icon:<svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.8"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.8"/></svg> },
  ];

  const NavItem = ({ nav }) => {
    const active = activeTab === nav.id;
    return (
      <button onClick={()=>setActiveTab(nav.id)} style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:sidebarCollapsed?"10px 0":"8px 12px", justifyContent:sidebarCollapsed?"center":"flex-start", background:active?`${ACCENT}10`:"transparent", border:"none", cursor:"pointer", borderRadius:sidebarCollapsed?0:8, margin:sidebarCollapsed?"0":"0 4px", width:sidebarCollapsed?"100%":"calc(100% - 8px)", position:"relative" }}>
        <span style={{ color:active?ACCENT:"#6B7280", flexShrink:0 }}>{nav.icon}</span>
        {!sidebarCollapsed && <span style={{ fontFamily:SF, fontSize:13, fontWeight:active?600:400, color:active?ACCENT:"#374151", whiteSpace:"nowrap", flex:1, textAlign:"left" }}>{nav.label}</span>}
        {nav.badge>0 && <span style={{ background:filUrgent>0?"#EF4444":"#F59E0B", color:"#fff", fontSize:10, fontFamily:SF, fontWeight:700, borderRadius:20, minWidth:18, height:18, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 4px" }}>{nav.badge}</span>}
        {active && <div style={{ position:"absolute", left:0, top:"20%", bottom:"20%", width:3, background:ACCENT, borderRadius:"0 3px 3px 0" }}/>}
      </button>
    );
  };

  const [selAgent, setSelAgent] = useState(null);

  return (
    <div style={{ display:"flex", height:"100vh", background:"#F3F4F6", fontFamily:SF, overflow:"hidden" }}>
      {/* Sidebar */}
      <div style={{ width:sidebarCollapsed?52:168, background:"#fff", borderRight:"0.5px solid #E5E7EB", display:"flex", flexDirection:"column", flexShrink:0, transition:"width 0.2s cubic-bezier(0.4,0,0.2,1)", overflow:"hidden" }}>
        {/* Logo */}
        <div style={{ height:56, display:"flex", alignItems:"center", padding:"0 14px", borderBottom:"0.5px solid #F3F4F6", flexShrink:0 }}>
          {sidebarCollapsed
            ? <IqoLogo variant="icon" size={30} />
            : <IqoLogo variant="full" size={30} />
          }
        </div>
        {/* Nav items */}
        <div style={{ flex:1, overflowY:"auto", padding:"8px 0" }}>
          {/* Core */}
          {!sidebarCollapsed && <div style={{ fontFamily:SF, fontSize:10, fontWeight:700, color:"#C7C7CC", textTransform:"uppercase", letterSpacing:"0.08em", padding:"6px 16px 4px" }}>Espace de travail</div>}
          {NAV_CORE.map(nav=><NavItem key={nav.id} nav={nav}/>)}

          {/* Divider */}
          <div style={{ margin:"10px 12px", height:"0.5px", background:"#F3F4F6" }}/>

          {/* Secondary */}
          {!sidebarCollapsed && <div style={{ fontFamily:SF, fontSize:10, fontWeight:700, color:"#C7C7CC", textTransform:"uppercase", letterSpacing:"0.08em", padding:"2px 16px 4px" }}>Configuration</div>}
          {NAV_SECONDARY.map(nav=><NavItem key={nav.id} nav={nav}/>)}
        </div>
        {/* User profile */}
        <div style={{ borderTop:"0.5px solid #F3F4F6", padding:"12px", display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}>
          <img src={AVATAR_RV} alt="Romain Villar" style={{ width:32, height:32, borderRadius:"50%", objectFit:"cover", flexShrink:0, display:"block" }}/>
          {!sidebarCollapsed && (
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontFamily:SF, fontSize:12, fontWeight:600, color:"#111827", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>Romain Villar</div>
              <div style={{ fontFamily:SF, fontSize:10, color:"#9CA3AF" }}>Associé</div>
            </div>
          )}
          {!sidebarCollapsed && (
            <button onClick={()=>setSidebarCollapsed(true)} style={{ background:"none", border:"none", cursor:"pointer", color:"#9CA3AF", fontSize:14, padding:0 }}>‹</button>
          )}
        </div>
        {sidebarCollapsed && (
          <button onClick={()=>setSidebarCollapsed(false)} style={{ background:"none", border:"none", cursor:"pointer", color:"#9CA3AF", fontSize:14, padding:"8px", borderTop:"0.5px solid #F3F4F6" }}>›</button>
        )}
      </div>

      {/* Main */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        {/* Top bar */}
        <div style={{ height:56, background:"#fff", borderBottom:"0.5px solid #E5E7EB", display:"flex", alignItems:"center", padding:"0 24px", gap:16, flexShrink:0 }}>
          <div style={{ flex:1, background:"#F3F4F6", borderRadius:10, padding:"7px 14px", display:"flex", alignItems:"center", gap:10, maxWidth:480 }}>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="8.5" r="6.5" stroke="#9CA3AF" strokeWidth="1.8"/><path d="M13.5 13.5L18 18" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round"/></svg>
            <input placeholder="Rechercher un projet, un agent, une source…" style={{ border:"none", outline:"none", fontFamily:SF, fontSize:13, color:"#111827", background:"transparent", flex:1 }}/>
            <span style={{ fontFamily:SF, fontSize:11, color:"#C7C7CC", background:"#E5E7EB", borderRadius:5, padding:"2px 6px" }}>⌘ K</span>
          </div>
          <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:10 }}>
            <button style={{ position:"relative", width:34, height:34, borderRadius:9, background:"#F3F4F6", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"/></svg>
              {filPending>0 && <span style={{ position:"absolute", top:5, right:5, width:7, height:7, borderRadius:"50%", background:"#EF4444", border:"1.5px solid #fff" }}/>}
            </button>
            <img src={AVATAR_RV} alt="Romain Villar" style={{ width:32, height:32, borderRadius:"50%", objectFit:"cover", cursor:"pointer", display:"block" }}/>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex:1, display:"flex", overflow:"hidden" }}>
          {activeTab==="accueil"  && <DeskAccueil  agents={agents} fil={fil} setActiveTab={setActiveTab} onAgent={setSelAgent} onFil={setActionSheet}/>}
          {activeTab==="chat"     && <ChatScreen   agents={agents}/>}
          {activeTab==="projets"  && <DeskProjets  agents={agents} onAgent={setSelAgent}/>}
          {activeTab==="agents"   && <DeskAgents   agents={agents} setAgents={setAgents} onAgent={setSelAgent}/>}
          {activeTab==="services" && <DeskServices agents={agents}/>}
          {activeTab==="sources"  && <DeskSources/>}
          {activeTab==="fil"      && <DeskFil fil={fil} setFil={setFil} onAction={setActionSheet}/>}
          {activeTab==="admin"    && <DeskAdmin agents={agents} setAgents={setAgents} onToggleView={switchToMobile}/>}
        </div>
      </div>

      {/* Agent detail panel — slides in from right */}
      {selAgent && (
        <div style={{ position:"fixed", inset:0, zIndex:100, display:"flex", justifyContent:"flex-end" }}>
          <div onClick={()=>setSelAgent(null)} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.3)", backdropFilter:"blur(4px)" }}/>
          <div style={{ position:"relative", width:480, background:"#F9FAFB", overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"-8px 0 32px rgba(0,0,0,0.12)", animation:"slideInRight 0.25s cubic-bezier(0.4,0,0.2,1)" }}>
            <AgentDetail agent={selAgent} agents={agents} setAgents={setAgents} onClose={()=>setSelAgent(null)}/>
          </div>
        </div>
      )}
      {actionSheet && <ActionSheet item={actionSheet} onResolve={resolve} onClose={()=>setActionSheet(null)}/>}
    </div>
  );
}

// ─── CHAT SCREEN ──────────────────────────────────────────────────────────────

const MODELS = [
  { id:"claude-sonnet", label:"Claude Sonnet 4", provider:"Anthropic", badge:"Recommandé", color:"#F97316" },
  { id:"claude-opus",   label:"Claude Opus 4",   provider:"Anthropic", badge:"Puissant",   color:"#7C3AED" },
  { id:"gpt4o",         label:"GPT-4o",          provider:"OpenAI",    badge:"",           color:"#10B981" },
  { id:"dimple",        label:"Dimple",          provider:"iQo / Azure EU", badge:"Données sensibles", color:"#0EA5E9" },
];

const CHAT_HISTORY = {
  "p1": [
    { id:"h1", title:"Analyse architecture EDF", date:"Aujourd'hui", preview:"Quelles sont les principales contraintes de la revue d'archi ?", msgs:[
      { role:"user",      text:"Quelles sont les principales contraintes de la revue d'architecture cible ?" },
      { role:"assistant", text:"D'après les derniers éléments du projet EDF, trois contraintes majeures émergent : (1) la dépendance sur le fournisseur X pour la couche middleware, (2) les délais de validation sécurité (+2 semaines), (3) la disponibilité de l'architecte référent jusqu'au 15 juin." },
      { role:"user",      text:"Comment débloquer la dépendance fournisseur X ?" },
      { role:"assistant", text:"Deux leviers opérationnels : escalader auprès du CPMO pour accélérer la contractualisation, ou identifier un fournisseur alternatif déjà référencé dans le catalogue. Je peux préparer une note de synthèse comparative si vous le souhaitez." },
    ]},
    { id:"h2", title:"Préparation CODIR", date:"Hier", preview:"Synthèse des risques pour le comité de pilotage", msgs:[
      { role:"user",      text:"Prépare une synthèse des risques pour le CODIR de vendredi." },
      { role:"assistant", text:"Voici la synthèse des 4 risques majeurs à présenter au CODIR : ① Planning : 2 jalons décalés de 3 semaines ② Budget : dépassement prévisionnel de +4% ③ Ressources : sous-staffing sur le volet sécurité ④ Technique : dette applicative sur les APIs legacy. Je génère le slide ?" },
    ]},
  ],
  "p2": [
    { id:"h3", title:"Stratégie IA BPCE", date:"Il y a 2 jours", preview:"Use cases prioritaires pour la transformation", msgs:[
      { role:"user",      text:"Quels use cases IA prioriser pour BPCE en phase 1 ?" },
      { role:"assistant", text:"Sur la base du benchmark LLM et des ateliers métiers, je recommande de prioriser : (1) Détection de fraude augmentée — ROI immédiat et fort engagement DSI. (2) Assistant conseiller clientèle — différenciant commercial. (3) Automatisation conformité KYC — quick win réglementaire." },
    ]},
  ],
  "all": [
    { id:"h4", title:"Veille IA entreprise", date:"Aujourd'hui", preview:"Dernières avancées des LLM pour le conseil", msgs:[
      { role:"user",      text:"Quelles sont les dernières avancées des LLM pour le conseil ?" },
      { role:"assistant", text:"Trois tendances majeures en mai 2025 : (1) Les modèles de raisonnement (o3, Sonnet 4) atteignent maintenant la parité expert sur les analyses financières complexes. (2) L'intégration native aux outils métier (CRM, ERP) devient le standard. (3) Les modèles souverains EU progressent (Mistral Large 2)." },
    ]},
  ],
};

function ChatScreen({ agents }) {
  const [selProject,   setSelProject]   = useState("all");
  const [selConv,      setSelConv]      = useState(null);
  const [messages,     setMessages]     = useState([]);
  const [input,        setInput]        = useState("");
  const [selModel,     setSelModel]     = useState("claude-sonnet");
  const [webAccess,    setWebAccess]    = useState(true);
  const [showSettings, setShowSettings] = useState(false); // false | "connectors" | "model"
  const [showHistory,  setShowHistory]  = useState(true);
  const [attachments,  setAttachments]  = useState([]);
  const [selSources,   setSelSources]   = useState(["f1","f2","f3"]);
  const [isTyping,     setIsTyping]     = useState(false);
  const messagesEndRef = useRef(null);

  const model = MODELS.find(m=>m.id===selModel)||MODELS[0];
  const projectHistory = CHAT_HISTORY[selProject]||CHAT_HISTORY["all"];
  const currentProj = INIT_PROJETS.find(p=>p.id===selProject);

  const loadConv = (conv) => { setSelConv(conv); setMessages(conv.msgs); setShowHistory(false); };
  const newConv  = () => { setSelConv(null); setMessages([]); setShowHistory(false); };

  const send = () => {
    if(!input.trim()&&attachments.length===0) return;
    const userMsg = { role:"user", text:input.trim(), attachments:[...attachments] };
    setMessages(prev=>[...prev, userMsg]);
    setInput(""); setAttachments([]); setIsTyping(true);
    setTimeout(()=>{
      setIsTyping(false);
      setMessages(prev=>[...prev, { role:"assistant", text:`Je traite votre demande${currentProj?` dans le contexte du projet **${currentProj.name}**`:""}.${webAccess?" J'ai également accès au web pour enrichir ma réponse.":""} Voici mon analyse…` }]);
    }, 1400);
  };

  const toggleSource = (id) => setSelSources(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);


  return (
    <div style={{ flex:1, display:"flex", overflow:"hidden", background:"#F9FAFB", fontFamily:SF }}>

      {/* ── LEFT PANEL — History + Settings ── */}
      <div style={{ width:260, borderRight:"0.5px solid #E5E7EB", background:"#fff", display:"flex", flexDirection:"column", flexShrink:0, overflow:"hidden" }}>

        {/* Project selector */}
        <div style={{ padding:"16px 14px 12px", borderBottom:"0.5px solid #F3F4F6" }}>
          <div style={{ fontFamily:SF, fontSize:11, fontWeight:700, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:"0.04em", marginBottom:8 }}>Contexte projet</div>
          <select value={selProject} onChange={e=>{ setSelProject(e.target.value); setSelConv(null); setMessages([]); setShowHistory(true); }}
            style={{ width:"100%", background:"#F3F4F6", border:"none", borderRadius:9, padding:"8px 10px", fontFamily:SF, fontSize:13, color:"#111827", cursor:"pointer", outline:"none" }}>
            <option value="all">Tous les projets</option>
            {INIT_PROJETS.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>

        {/* New conversation button */}
        <div style={{ padding:"10px 14px", borderBottom:"0.5px solid #F3F4F6" }}>
          <button onClick={newConv} style={{ width:"100%", background:ACCENT, color:"#fff", border:"none", borderRadius:9, padding:"9px", fontFamily:SF, fontSize:13, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/></svg>
            Nouvelle conversation
          </button>
        </div>

        {/* Conversation history */}
        <div style={{ flex:1, overflowY:"auto" }}>
          <div style={{ padding:"10px 14px 6px" }}>
            <div style={{ fontFamily:SF, fontSize:11, fontWeight:700, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:"0.04em" }}>
              Historique {currentProj?`— ${currentProj.name}`:"— Tous les projets"}
            </div>
          </div>
          {projectHistory.length===0 && (
            <div style={{ padding:"20px 14px", fontFamily:SF, fontSize:13, color:"#9CA3AF", textAlign:"center" }}>Aucune conversation</div>
          )}
          {projectHistory.map(conv=>(
            <div key={conv.id} onClick={()=>loadConv(conv)}
              style={{ padding:"10px 14px", cursor:"pointer", background:selConv?.id===conv.id?`${ACCENT}08`:"transparent", borderLeft:selConv?.id===conv.id?`3px solid ${ACCENT}`:"3px solid transparent", transition:"all 0.15s" }}>
              <div style={{ fontFamily:SF, fontSize:13, fontWeight:500, color:"#111827", marginBottom:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{conv.title}</div>
              <div style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{conv.preview}</div>
              <div style={{ fontFamily:SF, fontSize:10, color:"#C7C7CC", marginTop:3 }}>{conv.date}</div>
            </div>
          ))}
        </div>

        {/* Settings panel (collapsible) */}
        <div style={{ borderTop:"0.5px solid #F3F4F6" }}>
          <button onClick={()=>setShowSettings(p=>p==="panel"?false:"panel")} style={{ width:"100%", padding:"11px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", background:"none", border:"none", cursor:"pointer", fontFamily:SF, fontSize:12, fontWeight:600, color:"#374151" }}>
            <span>⚙ Paramètres</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ transform:showSettings==="panel"?"rotate(180deg)":"none", transition:"transform 0.2s" }}><path d="M6 9l6 6 6-6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          {showSettings==="panel" && (
            <div style={{ padding:"0 14px 14px" }}>
              {/* Model */}
              <div style={{ marginBottom:12 }}>
                <div style={{ fontFamily:SF, fontSize:11, fontWeight:600, color:"#9CA3AF", textTransform:"uppercase", marginBottom:6 }}>Modèle</div>
                {MODELS.map(m=>(
                  <div key={m.id} onClick={()=>setSelModel(m.id)}
                    style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 9px", borderRadius:8, cursor:"pointer", background:selModel===m.id?`${ACCENT}10`:"transparent", marginBottom:2, border:selModel===m.id?`1px solid ${ACCENT}25`:"1px solid transparent" }}>
                    <div style={{ width:8, height:8, borderRadius:"50%", background:m.color, flexShrink:0 }}/>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontFamily:SF, fontSize:12, fontWeight:selModel===m.id?600:400, color:selModel===m.id?ACCENT:"#374151" }}>{m.label}</div>
                      <div style={{ fontFamily:SF, fontSize:10, color:"#9CA3AF" }}>{m.provider}</div>
                    </div>
                    {m.badge && <span style={{ fontFamily:SF, fontSize:9, fontWeight:700, color:m.color, background:m.color+"14", borderRadius:5, padding:"1px 5px", flexShrink:0 }}>{m.badge}</span>}
                  </div>
                ))}
              </div>
              {/* Web access */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                <span style={{ fontFamily:SF, fontSize:12, color:"#374151" }}>🌐 Accès web</span>
                <IOSToggle on={webAccess} onToggle={()=>setWebAccess(p=>!p)} scale={0.7} />
              </div>
              {/* Sources */}
              <div>
                <div style={{ fontFamily:SF, fontSize:11, fontWeight:600, color:"#9CA3AF", textTransform:"uppercase", marginBottom:6 }}>Connecteurs actifs</div>
                {ALL_SOURCES.map(s=>(
                  <div key={s.id} onClick={()=>toggleSource(s.id)}
                    style={{ display:"flex", alignItems:"center", gap:7, padding:"5px 0", cursor:"pointer" }}>
                    <div style={{ width:16, height:16, borderRadius:4, border:`1.5px solid ${selSources.includes(s.id)?ACCENT:"#D1D5DB"}`, background:selSources.includes(s.id)?ACCENT:"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.15s" }}>
                      {selSources.includes(s.id)&&<svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    <span style={{ fontSize:14 }}>{s.icon}</span>
                    <span style={{ fontFamily:SF, fontSize:12, color:"#374151" }}>{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── MAIN CHAT AREA ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

        {/* Chat top bar */}
        <div style={{ height:52, background:"#fff", borderBottom:"0.5px solid #E5E7EB", display:"flex", alignItems:"center", padding:"0 20px", gap:12, flexShrink:0 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:SF, fontSize:14, fontWeight:600, color:"#111827" }}>
              {selConv ? selConv.title : "Nouvelle conversation"}
            </div>
            <div style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF", display:"flex", alignItems:"center", gap:6 }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:model.color }}/>
              {model.label} · {model.provider}
              {webAccess&&<>· <span style={{ color:"#10B981" }}>Web ✓</span></>}
              {selSources.length>0&&<>· {selSources.length} connecteur{selSources.length>1?"s":""}</>}
              {currentProj&&<>· <span style={{ color:currentProj.color }}>📁 {currentProj.name}</span></>}
            </div>
          </div>
          <button onClick={newConv} style={{ background:"#F3F4F6", border:"none", borderRadius:8, padding:"6px 12px", fontFamily:SF, fontSize:12, fontWeight:600, color:"#374151", cursor:"pointer" }}>
            + Nouveau
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex:1, overflowY:"auto", padding:"24px 32px" }}>
          {messages.length===0 && (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:20 }}>
              <div style={{ width:56, height:56, borderRadius:16, background:`${ACCENT}14`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontFamily:SF, fontSize:18, fontWeight:700, color:"#111827", marginBottom:6 }}>Comment puis-je vous aider ?</div>
                <div style={{ fontFamily:SF, fontSize:14, color:"#9CA3AF" }}>
                  {currentProj?`Contexte : ${currentProj.name}`:"Sélectionnez un projet ou posez une question générale"}
                </div>
              </div>
              {/* Quick suggestions */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center", maxWidth:560 }}>
                {(currentProj?[
                  `État d'avancement de ${currentProj.name}`,
                  `Risques identifiés sur ${currentProj.name}`,
                  `Prépare un point de situation`,
                  `Prochaines actions prioritaires`,
                ]:[
                  "Synthèse de la semaine sur tous les projets",
                  "Quels agents sont en attente de validation ?",
                  "Dernières tendances IA pour le conseil",
                  "Prépare un rapport d'activité",
                ]).map(s=>(
                  <button key={s} onClick={()=>{ setInput(s); }}
                    style={{ fontFamily:SF, fontSize:13, color:ACCENT, background:`${ACCENT}10`, border:`1px solid ${ACCENT}25`, borderRadius:20, padding:"7px 14px", cursor:"pointer", textAlign:"left" }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m,i)=>{
            const isUser = m.role==="user";
            return (
              <div key={i} style={{ display:"flex", gap:14, marginBottom:24, flexDirection:isUser?"row-reverse":"row", alignItems:"flex-start" }}>
                {/* Avatar */}
                <div style={{ width:34, height:34, borderRadius:isUser?"50%":10, background:isUser?`linear-gradient(135deg,${ACCENT},#7C3AED)`:`${ACCENT}14`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  {isUser
                    ? <img src={AVATAR_RV} alt="Romain Villar" style={{ width:32, height:32, borderRadius:"50%", objectFit:"cover", flexShrink:0, display:"block" }}/>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round"/></svg>
                  }
                </div>
                <div style={{ flex:1, maxWidth:680 }}>
                  {/* Attachments */}
                  {m.attachments&&m.attachments.length>0&&(
                    <div style={{ display:"flex", gap:6, marginBottom:8, flexDirection:isUser?"row-reverse":"row" }}>
                      {m.attachments.map((a,ai)=>(
                        <div key={ai} style={{ background:"#F3F4F6", borderRadius:8, padding:"5px 10px", fontFamily:SF, fontSize:12, color:"#374151", display:"flex", alignItems:"center", gap:5 }}>
                          📎 {a}
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{ background:isUser?ACCENT:"#fff", color:isUser?"#fff":"#111827", borderRadius:isUser?"16px 16px 4px 16px":"16px 16px 16px 4px", padding:"12px 16px", fontFamily:SF, fontSize:14, lineHeight:1.65, boxShadow:isUser?"none":"0 1px 3px rgba(0,0,0,0.06)", border:isUser?"none":"0.5px solid #E5E7EB", whiteSpace:"pre-wrap" }}>
                    {m.text}
                  </div>
                  {!isUser&&(
                    <div style={{ display:"flex", gap:8, marginTop:6 }}>
                      {["📋 Copier","👍","👎","↺ Régénérer"].map(a=>(
                        <button key={a} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:SF, fontSize:11, color:"#9CA3AF", padding:"2px 4px", borderRadius:5 }}>{a}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {isTyping&&(
            <div style={{ display:"flex", gap:14, marginBottom:24 }}>
              <div style={{ width:34, height:34, borderRadius:10, background:`${ACCENT}14`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
              <div style={{ background:"#fff", borderRadius:"16px 16px 16px 4px", padding:"14px 18px", boxShadow:"0 1px 3px rgba(0,0,0,0.06)", border:"0.5px solid #E5E7EB", display:"flex", gap:5, alignItems:"center" }}>
                {[0,1,2].map(i=>(
                  <div key={i} style={{ width:7, height:7, borderRadius:"50%", background:ACCENT, opacity:0.7, animation:`ping 1.2s ease-in-out ${i*0.2}s infinite` }}/>
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef}/>
        </div>

        {/* Input area */}
        <div style={{ borderTop:"0.5px solid #E5E7EB", background:"#fff", padding:"14px 20px 18px", flexShrink:0 }}>
          {/* Attachments preview */}
          {attachments.length>0&&(
            <div style={{ display:"flex", gap:6, marginBottom:10, flexWrap:"wrap" }}>
              {attachments.map((a,i)=>(
                <div key={i} style={{ background:`${ACCENT}10`, border:`1px solid ${ACCENT}25`, borderRadius:8, padding:"4px 10px", fontFamily:SF, fontSize:12, color:ACCENT, display:"flex", alignItems:"center", gap:6 }}>
                  📎 {a}
                  <button onClick={()=>setAttachments(prev=>prev.filter((_,j)=>j!==i))} style={{ background:"none", border:"none", cursor:"pointer", color:ACCENT, fontSize:14, lineHeight:1, padding:0 }}>×</button>
                </div>
              ))}
            </div>
          )}

          <div style={{ background:"#F3F4F6", borderRadius:14, overflow:"visible", position:"relative" }}>
            {/* Toolbar */}
            <div style={{ display:"flex", alignItems:"center", gap:4, padding:"8px 12px 0", position:"relative", borderRadius:"14px 14px 0 0", overflow:"visible" }}>
              {/* Attach */}
              <button onClick={()=>setAttachments(prev=>[...prev,`Document_${prev.length+1}.pdf`])}
                style={{ width:30, height:30, borderRadius:8, background:"transparent", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#6B7280" }} title="Joindre un fichier">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </button>
              {/* Web toggle */}
              <button onClick={()=>setWebAccess(p=>!p)}
                style={{ padding:"4px 8px", borderRadius:8, background:webAccess?`${ACCENT}14`:"transparent", border:`1px solid ${webAccess?ACCENT+"30":"transparent"}`, cursor:"pointer", fontFamily:SF, fontSize:11, fontWeight:600, color:webAccess?ACCENT:"#9CA3AF", display:"flex", alignItems:"center", gap:4 }}>
                🌐 Web {webAccess?"✓":""}
              </button>
              {/* Connectors dropdown */}
              <div style={{ position:"relative" }}>
                <button onClick={()=>setShowSettings(p=>p==="connectors"?false:"connectors")}
                  style={{ padding:"4px 8px", borderRadius:8, background:`${ACCENT}14`, border:`1px solid ${ACCENT}30`, cursor:"pointer", fontFamily:SF, fontSize:11, fontWeight:600, color:ACCENT }}>
                  🔗 {selSources.length} connecteur{selSources.length>1?"s":""}
                </button>
                {showSettings==="connectors" && (
                  <>
                    <div onClick={()=>setShowSettings(false)} style={{ position:"fixed", inset:0, zIndex:9998 }}/>
                    <div style={{ position:"absolute", bottom:"calc(100% + 8px)", left:0, background:"#fff", borderRadius:12, boxShadow:"0 8px 30px rgba(0,0,0,0.18)", border:"0.5px solid #E5E7EB", padding:"8px", minWidth:220, zIndex:9999 }}>
                      <div style={{ fontFamily:SF, fontSize:11, fontWeight:700, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:"0.04em", padding:"4px 8px 8px" }}>Connecteurs actifs</div>
                      {ALL_SOURCES.map(s=>(
                        <div key={s.id} onClick={()=>toggleSource(s.id)}
                          style={{ display:"flex", alignItems:"center", gap:9, padding:"8px 8px", borderRadius:8, cursor:"pointer", background:selSources.includes(s.id)?`${ACCENT}08`:"transparent" }}>
                          <div style={{ width:18, height:18, borderRadius:4, border:`1.5px solid ${selSources.includes(s.id)?ACCENT:"#D1D5DB"}`, background:selSources.includes(s.id)?ACCENT:"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.15s" }}>
                            {selSources.includes(s.id)&&<svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                          </div>
                          <span style={{ fontSize:16 }}>{s.icon}</span>
                          <div style={{ flex:1 }}>
                            <div style={{ fontFamily:SF, fontSize:13, color:"#111827" }}>{s.name}</div>
                            <div style={{ fontFamily:SF, fontSize:10, color:"#9CA3AF" }}>{s.type}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              {/* Model dropdown */}
              <div style={{ position:"relative", marginLeft:"auto" }}>
                <button onClick={()=>setShowSettings(p=>p==="model"?false:"model")}
                  style={{ padding:"4px 10px", borderRadius:8, background:model.color+"14", border:`1px solid ${model.color}30`, cursor:"pointer", fontFamily:SF, fontSize:11, fontWeight:600, color:model.color, display:"flex", alignItems:"center", gap:5 }}>
                  <div style={{ width:7, height:7, borderRadius:"50%", background:model.color }}/>
                  {model.label}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke={model.color} strokeWidth="2" strokeLinecap="round"/></svg>
                </button>
                {showSettings==="model" && (
                  <>
                    <div onClick={()=>setShowSettings(false)} style={{ position:"fixed", inset:0, zIndex:9998 }}/>
                    <div style={{ position:"absolute", bottom:"calc(100% + 8px)", right:0, background:"#fff", borderRadius:12, boxShadow:"0 8px 30px rgba(0,0,0,0.18)", border:"0.5px solid #E5E7EB", padding:"8px", minWidth:240, zIndex:9999 }}>
                      <div style={{ fontFamily:SF, fontSize:11, fontWeight:700, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:"0.04em", padding:"4px 8px 8px" }}>Modèle</div>
                      {MODELS.map(m=>(
                        <div key={m.id} onClick={()=>{ setSelModel(m.id); setShowSettings(false); }}
                          style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 8px", borderRadius:8, cursor:"pointer", background:selModel===m.id?`${ACCENT}08`:"transparent", border:selModel===m.id?`1px solid ${ACCENT}20`:"1px solid transparent", marginBottom:2 }}>
                          <div style={{ width:10, height:10, borderRadius:"50%", background:m.color, flexShrink:0 }}/>
                          <div style={{ flex:1 }}>
                            <div style={{ fontFamily:SF, fontSize:13, fontWeight:selModel===m.id?600:400, color:selModel===m.id?ACCENT:"#111827" }}>{m.label}</div>
                            <div style={{ fontFamily:SF, fontSize:11, color:"#9CA3AF" }}>{m.provider}</div>
                          </div>
                          {m.badge && <span style={{ fontFamily:SF, fontSize:9, fontWeight:700, color:m.color, background:m.color+"14", borderRadius:5, padding:"2px 6px" }}>{m.badge}</span>}
                          {selModel===m.id && <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* Text input */}
            <textarea value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{ if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); send(); } }}
              placeholder={currentProj?`Posez une question sur ${currentProj.name}…`:"Posez une question ou donnez une instruction…"}
              rows={3}
              style={{ width:"100%", background:"transparent", border:"none", outline:"none", padding:"8px 14px 6px", fontFamily:SF, fontSize:14, color:"#111827", resize:"none", lineHeight:1.55 }}/>
            {/* Send bar */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"6px 12px 10px" }}>
              <span style={{ fontFamily:SF, fontSize:11, color:"#C7C7CC" }}>↵ Entrée pour envoyer · ⇧↵ nouvelle ligne</span>
              <button onClick={send} disabled={!input.trim()&&attachments.length===0}
                style={{ width:36, height:36, borderRadius:"50%", background:(input.trim()||attachments.length>0)?ACCENT:"#E5E7EB", border:"none", cursor:(input.trim()||attachments.length>0)?"pointer":"default", display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.2s" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
          <div style={{ fontFamily:SF, fontSize:11, color:"#C7C7CC", textAlign:"center", marginTop:8 }}>
            iQo Agentic AI peut faire des erreurs. Vérifiez les informations importantes.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeTab,   setActiveTab]   = useState("accueil");
  const [agents,      setAgents]      = useState(INIT_AGENTS);
  const [fil,         setFil]         = useState(INIT_FIL);
  const [selAgent,    setSelAgent]    = useState(null);
  const [selDept,     setSelDept]     = useState(null);
  const [actionSheet, setActionSheet] = useState(null);

  // Default: desktop. Switch to mobile only if screen < 768px.
  // manualOverride: when user clicks the toggle in Admin, freeze the mode.
  const [isDesktop,     setIsDesktop]     = useState(true);
  const [manualOverride, setManualOverride] = useState(false);

  const filPending = fil.filter(f=>!f.resolved).length;
  const filUrgent  = fil.filter(f=>!f.resolved&&f.type==="urgent").length;

  // On mount: switch to mobile if on a small screen (real mobile device).
  useEffect(()=>{
    const check = () => {
      if (!manualOverride) {
        setIsDesktop(window.innerWidth >= 768);
      }
    };
    check(); // run on mount
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [manualOverride]);

  const switchToMobile  = () => { setManualOverride(true);  setIsDesktop(false); };
  const switchToDesktop = () => { setManualOverride(true);  setIsDesktop(true);  };

  const resolve = (item, action, comment) => {
    setFil(prev=>prev.map(f=>f.id===item.id?{...f,resolved:true,action,comment}:f));
    setActionSheet(null);
  };

  // Desktop
  if(isDesktop) {
    return (
      <>
        <style>{`
          @keyframes ping { 75%,100%{ transform:scale(2.2); opacity:0; } }
          @keyframes slideUp { from{ transform:translateY(100%); } to{ transform:translateY(0); } }
          @keyframes slideInRight { from{ transform:translateX(100%); } to{ transform:translateX(0); } }
          ::-webkit-scrollbar { width:4px; height:4px; }
          ::-webkit-scrollbar-track { background:transparent; }
          ::-webkit-scrollbar-thumb { background:#E5E7EB; border-radius:4px; }
          * { box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
          input,textarea,select { font-family:${SF}; }
          input::placeholder,textarea::placeholder { color:#D1D5DB; }
          body { margin:0; }
        `}</style>
        <DesktopApp
          activeTab={activeTab} setActiveTab={setActiveTab}
          agents={agents} setAgents={setAgents}
          fil={fil} setFil={setFil}
          filPending={filPending} filUrgent={filUrgent}
          actionSheet={actionSheet} setActionSheet={setActionSheet}
          resolve={resolve}
          switchToMobile={switchToMobile}
        />
      </>
    );
  }

  // Mobile — iPhone 15 Pro shell
  const NAV = [
    { id:"accueil",  label:"Dashboard", svg:<svg viewBox="0 0 24 24" fill="none" width="22" height="22"><path d="M3 12L12 3l9 9M5 10v9a1 1 0 001 1h4v-4h4v4h4a1 1 0 001-1v-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { id:"chat",     label:"Chats",      svg:<svg viewBox="0 0 24 24" fill="none" width="22" height="22"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { id:"fil",      label:"Fil",       svg:<svg viewBox="0 0 24 24" fill="none" width="22" height="22"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.8"/><path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg> },
    { id:"projets",  label:"Projets",   svg:<svg viewBox="0 0 24 24" fill="none" width="22" height="22"><rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg> },
    { id:"admin",    label:"Admin",     svg:<svg viewBox="0 0 24 24" fill="none" width="22" height="22"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.8"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.8"/></svg> },
  ];

  const W=393, H=852;
  return (
    <div style={{ minHeight:"100vh", background:"#1C1C1E", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px 0" }}>
      <style>{`
        @keyframes ping { 75%,100%{ transform:scale(2.2); opacity:0; } }
        @keyframes slideUp { from{ transform:translateY(100%); } to{ transform:translateY(0); } }
        ::-webkit-scrollbar { display:none; }
        * { box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
        input,textarea,select { font-family:${SF}; }
        input::placeholder,textarea::placeholder { color:#D1D5DB; }
      `}</style>
      <div style={{ width:W, height:H, borderRadius:54, background:"#000", boxShadow:"0 0 0 2px #3A3A3C, 0 0 0 4px #1C1C1E, 0 30px 80px rgba(0,0,0,0.8)", position:"relative", flexShrink:0, overflow:"hidden" }}>
        <div style={{ position:"absolute", left:-3, top:140, width:3, height:36, background:"#3A3A3C", borderRadius:"3px 0 0 3px" }}/>
        <div style={{ position:"absolute", left:-3, top:192, width:3, height:64, background:"#3A3A3C", borderRadius:"3px 0 0 3px" }}/>
        <div style={{ position:"absolute", left:-3, top:272, width:3, height:64, background:"#3A3A3C", borderRadius:"3px 0 0 3px" }}/>
        <div style={{ position:"absolute", right:-3, top:192, width:3, height:88, background:"#3A3A3C", borderRadius:"0 3px 3px 0" }}/>
        <div style={{ position:"absolute", inset:0, background:"#F9FAFB", borderRadius:52, overflow:"hidden", display:"flex", flexDirection:"column" }}>
          {/* Status bar */}
          <div style={{ height:59, background:"#fff", flexShrink:0, display:"flex", alignItems:"flex-end", justifyContent:"space-between", padding:"0 28px 10px", position:"relative", zIndex:25 }}>
            <div style={{ position:"absolute", top:12, left:"50%", transform:"translateX(-50%)", width:120, height:34, background:"#000", borderRadius:20 }}/>
            <span style={{ fontFamily:SF, fontSize:15, fontWeight:600, color:"#111827" }}>9:41</span>
            <div style={{ display:"flex", alignItems:"center", gap:5 }}>
              <svg width="17" height="12" viewBox="0 0 17 12" fill="none"><rect x="0" y="3" width="3" height="9" rx="1" fill="#111827"/><rect x="4.5" y="2" width="3" height="10" rx="1" fill="#111827"/><rect x="9" y="0.5" width="3" height="11.5" rx="1" fill="#111827"/><rect x="13.5" y="0" width="3" height="12" rx="1" fill="#111827" opacity="0.3"/></svg>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="#111827"><path d="M8 2.4C5.6 2.4 3.5 3.4 2 5L0 3C2.1 1.1 4.9 0 8 0s5.9 1.1 8 3l-2 2C12.5 3.4 10.4 2.4 8 2.4zM8 6.8c-1.3 0-2.5.5-3.4 1.3L3 6.5C4.3 5.3 6.1 4.5 8 4.5s3.7.8 5 2l-1.6 1.6C10.5 7.3 9.3 6.8 8 6.8zM8 11.2c-.8 0-1.5-.3-2-.8L8 8l2 2.4c-.5.5-1.2.8-2 .8z"/></svg>
              <div style={{ width:25, height:12, borderRadius:3, border:"1.5px solid #111827", padding:2, display:"flex", alignItems:"center" }}><div style={{ flex:1, background:"#111827", borderRadius:1, height:"100%" }}/></div>
            </div>
          </div>
          <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", position:"relative" }}>
            <div style={{ height:"0.5px", background:"#E5E7EB", flexShrink:0 }}/>
            <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
              {activeTab==="accueil" && <AccueilScreen agents={agents} fil={fil} onAgent={setSelAgent} onFil={setActionSheet} setActiveTab={setActiveTab}/>}
              {activeTab==="chat"    && <ChatScreen    agents={agents}/>}
              {activeTab==="fil"     && <FilScreen fil={fil} setFil={setFil} onAction={setActionSheet}/>}
              {activeTab==="projets" && <ProjetsScreen agents={agents} onAgent={setSelAgent}/>}
              {activeTab==="agents"  && <AgentsScreen agents={agents} setAgents={setAgents} onAgent={setSelAgent}/>}
              {activeTab==="admin"   && <AdminScreen agents={agents} setAgents={setAgents} onToggleView={switchToDesktop}/>}
            </div>
            <div style={{ background:"rgba(255,255,255,0.97)", backdropFilter:"blur(20px) saturate(180%)", borderTop:"0.5px solid #E5E7EB", padding:"8px 0", display:"flex", justifyContent:"space-around", flexShrink:0 }}>
              {NAV.map(nav=>(
                <button key={nav.id} onClick={()=>setActiveTab(nav.id)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:2, padding:"0 10px", position:"relative" }}>
                  {nav.id==="fil" && filPending>0 && <span style={{ position:"absolute", top:-2, right:4, background:filUrgent>0?"#EF4444":"#F59E0B", color:"#fff", fontSize:9, fontFamily:SF, fontWeight:700, borderRadius:20, minWidth:15, height:15, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 3px", border:"1.5px solid #fff" }}>{filPending}</span>}
                  <span style={{ color:activeTab===nav.id?ACCENT:"#9CA3AF", transition:"color 0.15s" }}>{nav.svg}</span>
                  <span style={{ fontFamily:SF, fontSize:10, fontWeight:activeTab===nav.id?600:400, color:activeTab===nav.id?ACCENT:"#9CA3AF" }}>{nav.label}</span>
                </button>
              ))}
            </div>
            <div style={{ height:26, background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <div style={{ width:130, height:5, background:"#111827", borderRadius:3, opacity:0.2 }}/>
            </div>
            {selDept    && <DeptDetail   deptId={selDept} agents={agents} setAgents={setAgents} onAgent={a=>setSelAgent(a)} onBack={()=>setSelDept(null)}/>}
            {selAgent   && <AgentDetail  agent={selAgent} agents={agents} setAgents={setAgents} onClose={()=>setSelAgent(null)}/>}
            {actionSheet && <ActionSheet item={actionSheet} onResolve={resolve} onClose={()=>setActionSheet(null)}/>}
          </div>
        </div>
      </div>
    </div>
  );
}
