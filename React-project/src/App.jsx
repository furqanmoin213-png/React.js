import { useState, useContext, createContext, useEffect } from "react";

// ─── AUTH CONTEXT ────────────────────────────────────────────────────────────
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const DEMO_USERS = {
  "admin@sacp.edu":   { id:1, name:"Dr. Ayesha Khan",   email:"admin@sacp.edu",   role:"admin",   dept:"Administration", password:"admin123" },
  "faculty@sacp.edu": { id:2, name:"Prof. Usman Tariq", email:"faculty@sacp.edu", role:"faculty", dept:"Computer Science", password:"faculty123" },
  "student@sacp.edu": { id:3, name:"Talha Ahmad",       email:"student@sacp.edu", role:"student", dept:"Computer Science", password:"student123" },
};

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const STUDENTS = [
  { id:1, name:"Talha Ahmad",     roll:"115491", dept:"Computer Science", semester:7, attendance:62, email:"talha@sacp.edu",   status:"warning" },
  { id:2, name:"Muhammad Raza",   roll:"115367", dept:"Computer Science", semester:7, attendance:88, email:"raza@sacp.edu",    status:"good" },
  { id:3, name:"Sara Malik",      roll:"115312", dept:"Mathematics",      semester:5, attendance:45, email:"sara@sacp.edu",    status:"critical" },
  { id:4, name:"Ahmed Hassan",    roll:"115290", dept:"Physics",          semester:3, attendance:91, email:"ahmed@sacp.edu",   status:"good" },
  { id:5, name:"Fatima Zara",     roll:"115445", dept:"Computer Science", semester:7, attendance:55, email:"fatima@sacp.edu",  status:"warning" },
  { id:6, name:"Bilal Chaudhry", roll:"115388", dept:"Mathematics",      semester:5, attendance:78, email:"bilal@sacp.edu",   status:"good" },
];

const TEMPLATES = [
  { id:1, name:"Attendance Warning",    category:"Academic",  subject:"Attendance Warning - Action Required", body:"Dear {student_name},\n\nYour attendance in {course_name} has dropped to {attendance}%, which is below the required 75%. Please ensure regular attendance to avoid de-registration.\n\nRegards,\n{faculty_name}" },
  { id:2, name:"Exam Schedule",         category:"Exam",      subject:"Upcoming Exam Schedule - {semester}", body:"Dear {student_name},\n\nYour final exams are scheduled as follows:\n\nDate: {exam_date}\nVenue: {venue}\nTime: {time}\n\nBest of luck!\nExamination Department" },
  { id:3, name:"Assignment Reminder",   category:"Academic",  subject:"Assignment Deadline Reminder", body:"Dear {student_name},\n\nThis is a reminder that your assignment for {course_name} is due on {deadline}.\n\nPlease submit on time to avoid penalties.\n\nRegards,\n{faculty_name}" },
  { id:4, name:"Fee Reminder",          category:"Finance",   subject:"Fee Payment Reminder", body:"Dear {student_name},\n\nYour semester fee of Rs. {amount} is due on {due_date}. Please clear your dues to avoid late charges.\n\nAccounts Department" },
  { id:5, name:"Result Announcement",   category:"Academic",  subject:"Result Announced - {semester}", body:"Dear {student_name},\n\nYour result for {semester} has been announced. You can view it on the student portal.\n\nCongratulations on your performance!\n\nAcademic Affairs" },
];

const CAMPAIGNS = [
  { id:1, name:"Mid-Term Attendance Drive",  status:"sent",      sent:342, opened:298, date:"2024-03-15", target:"All Students" },
  { id:2, name:"Final Exam Schedule",        status:"sent",      sent:890, opened:876, date:"2024-04-01", target:"All Students" },
  { id:3, name:"Fee Submission Reminder",    status:"scheduled", sent:0,   opened:0,   date:"2024-04-20", target:"CS Department" },
  { id:4, name:"Scholarship Applications",   status:"draft",     sent:0,   opened:0,   date:"-",          target:"Final Year" },
];

const MESSAGES = [
  { id:1, from:"Prof. Usman Tariq", subject:"Assignment Deadline Extended", time:"10:30 AM", read:false, tag:"faculty" },
  { id:2, from:"Admin Office",      subject:"Exam Hall Ticket Available",    time:"Yesterday", read:true,  tag:"admin" },
  { id:3, from:"Dr. Ayesha Khan",   subject:"Important: Attendance Meeting", time:"Mon",       read:true,  tag:"admin" },
  { id:4, from:"Accounts Dept",     subject:"Fee Challan Generated",         time:"Sun",       read:false, tag:"finance" },
];

const NOTIFICATIONS = [
  { id:1, text:"Attendance warning sent to 24 students", time:"2 min ago",  type:"warning" },
  { id:2, text:"Campaign 'Mid-Term Drive' completed",    time:"1 hour ago", type:"success" },
  { id:3, text:"New message from Prof. Usman",           time:"3 hours ago",type:"info" },
  { id:4, text:"System backup completed",                time:"Yesterday",  type:"success" },
];

const AUTOMATION_RULES = [
  { id:1, name:"Low Attendance Alert",    trigger:"Attendance < 75%", action:"Send Warning Email", status:true,  triggered:24 },
  { id:2, name:"Assignment Due Reminder", trigger:"3 days before deadline", action:"Send Reminder",     status:true,  triggered:156 },
  { id:3, name:"Exam Schedule Notify",    trigger:"7 days before exam",     action:"Send Schedule",     status:false, triggered:0 },
  { id:4, name:"Fee Due Alert",           trigger:"5 days before due date",  action:"Send Fee Reminder", status:true,  triggered:89 },
];

const EMAILS = [
  { id:1, subject:"Question about assignment submission", from:"Talha Ahmad",   category:"important", time:"10:30 AM" },
  { id:2, subject:"Win a free iPhone!!!",                 from:"unknown@spam",  category:"spam",      time:"9:15 AM" },
  { id:3, subject:"Attendance query for last week",       from:"Sara Malik",    category:"important", time:"Yesterday" },
  { id:4, subject:"Congratulations! You won $1000",       from:"noreply@fake",  category:"spam",      time:"Yesterday" },
  { id:5, subject:"Request for leave application",        from:"Ahmed Hassan",  category:"important", time:"Mon" },
];

// ─── ICONS (inline SVG) ───────────────────────────────────────────────────────
const Icon = ({ name, size=18, color="currentColor" }) => {
  const icons = {
    dashboard: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>,
    users:     <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    mail:      <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    template:  <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>,
    campaign:  <><polygon points="22 2 11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    rules:     <><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M4.93 19.07a10 10 0 0 1 0-14.14"/></>,
    analytics: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    chat:      <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>,
    bell:      <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
    logout:    <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    send:      <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    check:     <><polyline points="20 6 9 17 4 12"/></>,
    x:         <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    plus:      <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    ai:        <><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1H1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z"/></>,
    edit:      <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    trash:     <><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></>,
    eye:       <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    warning:   <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
};

// ─── STAT CARD ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, color, icon }) => (
  <div style={{background:"#fff", borderRadius:16, padding:"20px 24px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", display:"flex", alignItems:"center", gap:16}}>
    <div style={{width:52, height:52, borderRadius:14, background:`${color}18`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
      <Icon name={icon} size={24} color={color} />
    </div>
    <div>
      <div style={{fontSize:26, fontWeight:800, color:"#1a1a2e", lineHeight:1}}>{value}</div>
      <div style={{fontSize:13, fontWeight:600, color:"#555", marginTop:4}}>{label}</div>
      {sub && <div style={{fontSize:11, color:"#999", marginTop:2}}>{sub}</div>}
    </div>
  </div>
);

// ─── BADGE ────────────────────────────────────────────────────────────────────
const Badge = ({ text, color }) => {
  const colors = {
    green:  { bg:"#dcfce7", text:"#16a34a" },
    red:    { bg:"#fee2e2", text:"#dc2626" },
    yellow: { bg:"#fef9c3", text:"#ca8a04" },
    blue:   { bg:"#dbeafe", text:"#2563eb" },
    purple: { bg:"#f3e8ff", text:"#7c3aed" },
    gray:   { bg:"#f1f5f9", text:"#64748b" },
  };
  const c = colors[color] || colors.gray;
  return (
    <span style={{background:c.bg, color:c.text, padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:700}}>
      {text}
    </span>
  );
};

// ─── PAGES ────────────────────────────────────────────────────────────────────

// LOGIN PAGE
const LoginPage = ({ onLogin }) => {
  const [email, setEmail]       = useState("admin@sacp.edu");
  const [password, setPassword] = useState("admin123");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [role, setRole]         = useState("admin");

  const demoAccounts = [
    { role:"admin",   email:"admin@sacp.edu",   pass:"admin123",   label:"Admin",   color:"#6366f1" },
    { role:"faculty", email:"faculty@sacp.edu", pass:"faculty123", label:"Faculty", color:"#0ea5e9" },
    { role:"student", email:"student@sacp.edu", pass:"student123", label:"Student", color:"#10b981" },
  ];

  const handleLogin = async () => {
    setError(""); setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const user = DEMO_USERS[email];
    if (user && user.password === password) { onLogin(user); }
    else { setError("Invalid email or password"); }
    setLoading(false);
  };

  return (
    <div style={{minHeight:"100vh", background:"linear-gradient(135deg, #0f0c29, #302b63, #24243e)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Segoe UI', sans-serif", padding:20}}>
      <div style={{width:"100%", maxWidth:440}}>
        {/* Logo */}
        <div style={{textAlign:"center", marginBottom:32}}>
          <div style={{display:"inline-flex", alignItems:"center", justifyContent:"center", width:72, height:72, background:"linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius:20, marginBottom:16, boxShadow:"0 8px 32px rgba(99,102,241,0.4)"}}>
            <span style={{fontSize:28, fontWeight:900, color:"#fff"}}>S</span>
          </div>
          <h1 style={{color:"#fff", fontSize:28, fontWeight:800, margin:0}}>SACP</h1>
          <p style={{color:"#a5b4fc", fontSize:13, margin:"6px 0 0"}}>Smart Academic Communication Platform</p>
          <p style={{color:"#6b7280", fontSize:11, margin:"4px 0 0"}}>FCIT — University of the Punjab, Lahore</p>
        </div>

        {/* Card */}
        <div style={{background:"rgba(255,255,255,0.05)", backdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:24, padding:32}}>
          {/* Demo Role Switcher */}
          <div style={{marginBottom:24}}>
            <p style={{color:"#9ca3af", fontSize:12, marginBottom:10, textAlign:"center"}}>DEMO — Click to switch role</p>
            <div style={{display:"flex", gap:8}}>
              {demoAccounts.map(a => (
                <button key={a.role} onClick={() => { setEmail(a.email); setPassword(a.pass); setRole(a.role); }}
                  style={{flex:1, padding:"8px 4px", borderRadius:10, border:`2px solid ${role===a.role ? a.color : "transparent"}`, background:role===a.role ? `${a.color}22` : "rgba(255,255,255,0.05)", color:role===a.role ? a.color : "#9ca3af", fontSize:12, fontWeight:700, cursor:"pointer", transition:"all 0.2s"}}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div style={{background:"rgba(239,68,68,0.15)", border:"1px solid rgba(239,68,68,0.3)", color:"#fca5a5", padding:"10px 14px", borderRadius:10, fontSize:13, marginBottom:16}}>
              {error}
            </div>
          )}

          <div style={{marginBottom:16}}>
            <label style={{color:"#d1d5db", fontSize:13, fontWeight:600, display:"block", marginBottom:6}}>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)}
              style={{width:"100%", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:10, padding:"11px 14px", color:"#fff", fontSize:14, outline:"none", boxSizing:"border-box"}} />
          </div>

          <div style={{marginBottom:24}}>
            <label style={{color:"#d1d5db", fontSize:13, fontWeight:600, display:"block", marginBottom:6}}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              style={{width:"100%", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:10, padding:"11px 14px", color:"#fff", fontSize:14, outline:"none", boxSizing:"border-box"}} />
          </div>

          <button onClick={handleLogin} disabled={loading}
            style={{width:"100%", background:"linear-gradient(135deg, #6366f1, #8b5cf6)", color:"#fff", border:"none", borderRadius:12, padding:"13px", fontSize:15, fontWeight:700, cursor:"pointer", opacity:loading?0.7:1, transition:"all 0.2s", boxShadow:"0 4px 20px rgba(99,102,241,0.4)"}}>
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </div>
      </div>
    </div>
  );
};

// DASHBOARD PAGE
const DashboardPage = ({ user }) => {
  const stats = user.role === "student"
    ? [
        { label:"Attendance",     value:"62%",  sub:"Below required 75%",  color:"#ef4444", icon:"warning" },
        { label:"Courses",        value:"6",    sub:"This semester",        color:"#6366f1", icon:"template" },
        { label:"Assignments Due",value:"3",    sub:"This week",            color:"#f59e0b", icon:"campaign" },
        { label:"Messages",       value:"4",    sub:"2 unread",             color:"#0ea5e9", icon:"mail" },
      ]
    : user.role === "faculty"
    ? [
        { label:"Total Students", value:"342",  sub:"Across 4 courses",     color:"#6366f1", icon:"users" },
        { label:"Campaigns Sent", value:"12",   sub:"This semester",        color:"#10b981", icon:"campaign" },
        { label:"Pending Emails", value:"8",    sub:"Student queries",      color:"#f59e0b", icon:"mail" },
        { label:"Low Attendance", value:"24",   sub:"Below 75%",            color:"#ef4444", icon:"warning" },
      ]
    : [
        { label:"Total Students", value:"1,247",sub:"Active this semester", color:"#6366f1", icon:"users" },
        { label:"Emails Sent",    value:"4,832",sub:"This month",           color:"#10b981", icon:"mail" },
        { label:"Active Rules",   value:"3",    sub:"Automation running",   color:"#f59e0b", icon:"rules" },
        { label:"Campaigns",      value:"8",    sub:"4 completed, 4 draft", color:"#0ea5e9", icon:"campaign" },
      ];

  return (
    <div>
      <div style={{marginBottom:28}}>
        <h2 style={{fontSize:24, fontWeight:800, color:"#1a1a2e", margin:0}}>
          Welcome back, {user.name.split(" ")[0]} 👋
        </h2>
        <p style={{color:"#6b7280", fontSize:14, margin:"6px 0 0"}}>
          {new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}
        </p>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:16, marginBottom:28}}>
        {stats.map((s,i) => <StatCard key={i} {...s} />)}
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16}}>
        {/* Recent Activity */}
        <div style={{background:"#fff", borderRadius:16, padding:24, boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
          <h3 style={{margin:"0 0 16px", fontSize:16, fontWeight:700, color:"#1a1a2e"}}>Recent Notifications</h3>
          {NOTIFICATIONS.map(n => (
            <div key={n.id} style={{display:"flex", alignItems:"flex-start", gap:12, padding:"10px 0", borderBottom:"1px solid #f3f4f6"}}>
              <div style={{width:8, height:8, borderRadius:"50%", background:n.type==="warning"?"#f59e0b":n.type==="success"?"#10b981":"#6366f1", marginTop:6, flexShrink:0}} />
              <div style={{flex:1}}>
                <p style={{margin:0, fontSize:13, color:"#374151"}}>{n.text}</p>
                <p style={{margin:"2px 0 0", fontSize:11, color:"#9ca3af"}}>{n.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions (Admin/Faculty) or Attendance chart (Student) */}
        {user.role === "student" ? (
          <div style={{background:"#fff", borderRadius:16, padding:24, boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
            <h3 style={{margin:"0 0 16px", fontSize:16, fontWeight:700, color:"#1a1a2e"}}>My Courses</h3>
            {[
              { name:"Data Structures",    attendance:62, color:"#ef4444" },
              { name:"Web Engineering",    attendance:88, color:"#10b981" },
              { name:"Database Systems",   attendance:75, color:"#f59e0b" },
              { name:"Software Engineering",attendance:91, color:"#10b981" },
              { name:"Computer Networks",  attendance:55, color:"#ef4444" },
            ].map((c,i) => (
              <div key={i} style={{marginBottom:12}}>
                <div style={{display:"flex", justifyContent:"space-between", marginBottom:4}}>
                  <span style={{fontSize:13, color:"#374151"}}>{c.name}</span>
                  <span style={{fontSize:12, fontWeight:700, color:c.color}}>{c.attendance}%</span>
                </div>
                <div style={{height:6, background:"#f3f4f6", borderRadius:3}}>
                  <div style={{height:"100%", width:`${c.attendance}%`, background:c.color, borderRadius:3, transition:"width 0.5s"}} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{background:"#fff", borderRadius:16, padding:24, boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
            <h3 style={{margin:"0 0 16px", fontSize:16, fontWeight:700, color:"#1a1a2e"}}>Quick Actions</h3>
            {[
              { label:"Send Attendance Warning", color:"#ef4444", icon:"warning" },
              { label:"Create New Campaign",     color:"#6366f1", icon:"campaign" },
              { label:"View Analytics",          color:"#10b981", icon:"analytics" },
              { label:"Manage Templates",        color:"#f59e0b", icon:"template" },
            ].map((a,i) => (
              <div key={i} style={{display:"flex", alignItems:"center", gap:12, padding:"12px 14px", borderRadius:10, background:"#f9fafb", marginBottom:8, cursor:"pointer"}}>
                <Icon name={a.icon} size={18} color={a.color} />
                <span style={{fontSize:13, fontWeight:600, color:"#374151"}}>{a.label}</span>
                <span style={{marginLeft:"auto", color:"#9ca3af"}}>→</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// STUDENTS PAGE
const StudentsPage = () => {
  const [search, setSearch] = useState("");
  const filtered = STUDENTS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.roll.includes(search) || s.dept.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24}}>
        <div>
          <h2 style={{fontSize:22, fontWeight:800, color:"#1a1a2e", margin:0}}>Student Management</h2>
          <p style={{color:"#6b7280", fontSize:13, margin:"4px 0 0"}}>{STUDENTS.length} students enrolled</p>
        </div>
        <button style={{background:"#6366f1", color:"#fff", border:"none", borderRadius:10, padding:"10px 18px", fontSize:13, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:8}}>
          <Icon name="plus" size={16} color="#fff" /> Add Student
        </button>
      </div>

      <div style={{background:"#fff", borderRadius:16, boxShadow:"0 2px 12px rgba(0,0,0,0.06)", overflow:"hidden"}}>
        <div style={{padding:"16px 20px", borderBottom:"1px solid #f3f4f6"}}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students..."
            style={{width:"100%", border:"1px solid #e5e7eb", borderRadius:8, padding:"9px 14px", fontSize:13, outline:"none", boxSizing:"border-box"}} />
        </div>
        <table style={{width:"100%", borderCollapse:"collapse"}}>
          <thead>
            <tr style={{background:"#f9fafb"}}>
              {["Name","Roll No","Department","Semester","Attendance","Status","Action"].map(h => (
                <th key={h} style={{padding:"12px 16px", textAlign:"left", fontSize:12, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.05em"}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id} style={{borderTop:"1px solid #f3f4f6"}}>
                <td style={{padding:"14px 16px"}}>
                  <div style={{display:"flex", alignItems:"center", gap:10}}>
                    <div style={{width:36, height:36, borderRadius:"50%", background:"#6366f118", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, color:"#6366f1", fontSize:13}}>
                      {s.name.split(" ").map(n=>n[0]).join("")}
                    </div>
                    <div>
                      <p style={{margin:0, fontSize:13, fontWeight:600, color:"#1a1a2e"}}>{s.name}</p>
                      <p style={{margin:0, fontSize:11, color:"#9ca3af"}}>{s.email}</p>
                    </div>
                  </div>
                </td>
                <td style={{padding:"14px 16px", fontSize:13, color:"#374151"}}>{s.roll}</td>
                <td style={{padding:"14px 16px", fontSize:13, color:"#374151"}}>{s.dept}</td>
                <td style={{padding:"14px 16px", fontSize:13, color:"#374151"}}>Sem {s.semester}</td>
                <td style={{padding:"14px 16px"}}>
                  <div style={{display:"flex", alignItems:"center", gap:8}}>
                    <div style={{flex:1, height:6, background:"#f3f4f6", borderRadius:3, maxWidth:60}}>
                      <div style={{height:"100%", width:`${s.attendance}%`, background:s.attendance<60?"#ef4444":s.attendance<75?"#f59e0b":"#10b981", borderRadius:3}} />
                    </div>
                    <span style={{fontSize:12, fontWeight:700, color:s.attendance<60?"#ef4444":s.attendance<75?"#f59e0b":"#10b981"}}>{s.attendance}%</span>
                  </div>
                </td>
                <td style={{padding:"14px 16px"}}>
                  <Badge text={s.status==="good"?"Good":s.status==="warning"?"Warning":"Critical"} color={s.status==="good"?"green":s.status==="warning"?"yellow":"red"} />
                </td>
                <td style={{padding:"14px 16px"}}>
                  <div style={{display:"flex", gap:6}}>
                    <button style={{background:"#6366f110", border:"none", borderRadius:6, padding:"6px 10px", cursor:"pointer", color:"#6366f1", fontSize:12, fontWeight:600}}>
                      <Icon name="mail" size={14} color="#6366f1" />
                    </button>
                    <button style={{background:"#f3f4f6", border:"none", borderRadius:6, padding:"6px 10px", cursor:"pointer"}}>
                      <Icon name="eye" size={14} color="#6b7280" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// TEMPLATES PAGE
const TemplatesPage = () => {
  const [selected, setSelected] = useState(null);
  const [showNew, setShowNew]   = useState(false);

  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24}}>
        <div>
          <h2 style={{fontSize:22, fontWeight:800, color:"#1a1a2e", margin:0}}>Message Templates</h2>
          <p style={{color:"#6b7280", fontSize:13, margin:"4px 0 0"}}>Reusable templates with dynamic placeholders</p>
        </div>
        <button onClick={()=>setShowNew(true)} style={{background:"#6366f1", color:"#fff", border:"none", borderRadius:10, padding:"10px 18px", fontSize:13, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:8}}>
          <Icon name="plus" size={16} color="#fff" /> New Template
        </button>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:16}}>
        {TEMPLATES.map(t => (
          <div key={t.id} onClick={()=>setSelected(t)}
            style={{background:"#fff", borderRadius:14, padding:20, boxShadow:"0 2px 12px rgba(0,0,0,0.06)", cursor:"pointer", border:`2px solid ${selected?.id===t.id?"#6366f1":"transparent"}`, transition:"all 0.2s"}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12}}>
              <h4 style={{margin:0, fontSize:15, fontWeight:700, color:"#1a1a2e"}}>{t.name}</h4>
              <Badge text={t.category} color={t.category==="Academic"?"blue":t.category==="Exam"?"purple":"green"} />
            </div>
            <p style={{margin:"0 0 12px", fontSize:12, color:"#6b7280", fontWeight:600}}>{t.subject}</p>
            <p style={{margin:0, fontSize:12, color:"#9ca3af", lineHeight:1.5, display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden"}}>
              {t.body}
            </p>
            <div style={{display:"flex", gap:8, marginTop:14}}>
              <button style={{background:"#6366f110", border:"none", borderRadius:7, padding:"6px 12px", fontSize:12, fontWeight:600, color:"#6366f1", cursor:"pointer"}}>Use</button>
              <button style={{background:"#f3f4f6", border:"none", borderRadius:7, padding:"6px 12px", fontSize:12, fontWeight:600, color:"#6b7280", cursor:"pointer"}}>Edit</button>
            </div>
          </div>
        ))}
      </div>

      {/* Template Preview Modal */}
      {selected && (
        <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:20}}>
          <div style={{background:"#fff", borderRadius:20, padding:32, maxWidth:520, width:"100%", maxHeight:"80vh", overflow:"auto"}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20}}>
              <h3 style={{margin:0, fontSize:18, fontWeight:800}}>{selected.name}</h3>
              <button onClick={()=>setSelected(null)} style={{background:"#f3f4f6", border:"none", borderRadius:8, padding:8, cursor:"pointer"}}>
                <Icon name="x" size={16} color="#6b7280" />
              </button>
            </div>
            <div style={{background:"#f9fafb", borderRadius:12, padding:16, marginBottom:16}}>
              <p style={{margin:"0 0 4px", fontSize:12, fontWeight:700, color:"#6b7280"}}>SUBJECT</p>
              <p style={{margin:0, fontSize:14, color:"#1a1a2e"}}>{selected.subject}</p>
            </div>
            <div style={{background:"#f9fafb", borderRadius:12, padding:16}}>
              <p style={{margin:"0 0 8px", fontSize:12, fontWeight:700, color:"#6b7280"}}>BODY</p>
              <pre style={{margin:0, fontSize:13, color:"#374151", whiteSpace:"pre-wrap", fontFamily:"inherit", lineHeight:1.7}}>{selected.body}</pre>
            </div>
            <div style={{marginTop:12}}>
              <p style={{fontSize:11, color:"#9ca3af", margin:"0 0 4px"}}>Dynamic placeholders (auto-filled from student records):</p>
              <div style={{display:"flex", flexWrap:"wrap", gap:6}}>
                {["{student_name}","{course_name}","{attendance}","{faculty_name}","{deadline}"].map(p => (
                  <span key={p} style={{background:"#6366f110", color:"#6366f1", padding:"2px 8px", borderRadius:6, fontSize:11, fontWeight:600}}>{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// CAMPAIGNS PAGE
const CampaignsPage = () => {
  const [showNew, setShowNew] = useState(false);
  const [step, setStep]       = useState(1);

  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24}}>
        <div>
          <h2 style={{fontSize:22, fontWeight:800, color:"#1a1a2e", margin:0}}>Campaign Management</h2>
          <p style={{color:"#6b7280", fontSize:13, margin:"4px 0 0"}}>Bulk messaging and scheduled announcements</p>
        </div>
        <button onClick={()=>{setShowNew(true);setStep(1);}} style={{background:"#6366f1", color:"#fff", border:"none", borderRadius:10, padding:"10px 18px", fontSize:13, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:8}}>
          <Icon name="plus" size={16} color="#fff" /> New Campaign
        </button>
      </div>

      <div style={{display:"grid", gap:12}}>
        {CAMPAIGNS.map(c => (
          <div key={c.id} style={{background:"#fff", borderRadius:14, padding:20, boxShadow:"0 2px 12px rgba(0,0,0,0.06)", display:"flex", alignItems:"center", gap:20}}>
            <div style={{width:48, height:48, borderRadius:12, background:c.status==="sent"?"#10b98118":c.status==="scheduled"?"#6366f118":"#f3f4f6", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
              <Icon name="campaign" size={22} color={c.status==="sent"?"#10b981":c.status==="scheduled"?"#6366f1":"#9ca3af"} />
            </div>
            <div style={{flex:1}}>
              <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:4}}>
                <h4 style={{margin:0, fontSize:15, fontWeight:700, color:"#1a1a2e"}}>{c.name}</h4>
                <Badge text={c.status} color={c.status==="sent"?"green":c.status==="scheduled"?"blue":"gray"} />
              </div>
              <p style={{margin:0, fontSize:12, color:"#9ca3af"}}>Target: {c.target} • Date: {c.date}</p>
            </div>
            {c.status === "sent" && (
              <div style={{display:"flex", gap:24, textAlign:"center"}}>
                <div>
                  <p style={{margin:0, fontSize:18, fontWeight:800, color:"#1a1a2e"}}>{c.sent}</p>
                  <p style={{margin:0, fontSize:11, color:"#9ca3af"}}>Sent</p>
                </div>
                <div>
                  <p style={{margin:0, fontSize:18, fontWeight:800, color:"#10b981"}}>{c.opened}</p>
                  <p style={{margin:0, fontSize:11, color:"#9ca3af"}}>Opened</p>
                </div>
                <div>
                  <p style={{margin:0, fontSize:18, fontWeight:800, color:"#6366f1"}}>{Math.round(c.opened/c.sent*100)}%</p>
                  <p style={{margin:0, fontSize:11, color:"#9ca3af"}}>Rate</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Campaign Modal - Multi Step */}
      {showNew && (
        <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:20}}>
          <div style={{background:"#fff", borderRadius:20, padding:32, maxWidth:500, width:"100%"}}>
            {/* Steps */}
            <div style={{display:"flex", gap:8, marginBottom:28}}>
              {["Audience","Template","Schedule"].map((s,i) => (
                <div key={s} style={{flex:1, textAlign:"center"}}>
                  <div style={{height:4, borderRadius:2, background:step>i?"#6366f1":"#f3f4f6", marginBottom:6}} />
                  <span style={{fontSize:11, fontWeight:600, color:step>i?"#6366f1":"#9ca3af"}}>{s}</span>
                </div>
              ))}
            </div>

            {step === 1 && (
              <div>
                <h3 style={{margin:"0 0 20px", fontSize:18, fontWeight:800}}>Select Audience</h3>
                {["All Students","Computer Science","Mathematics","Physics","Final Year Only"].map(a => (
                  <label key={a} style={{display:"flex", alignItems:"center", gap:12, padding:"12px 14px", borderRadius:10, background:"#f9fafb", marginBottom:8, cursor:"pointer"}}>
                    <input type="radio" name="audience" style={{accentColor:"#6366f1"}} />
                    <span style={{fontSize:14, color:"#374151"}}>{a}</span>
                  </label>
                ))}
              </div>
            )}
            {step === 2 && (
              <div>
                <h3 style={{margin:"0 0 20px", fontSize:18, fontWeight:800}}>Choose Template</h3>
                {TEMPLATES.slice(0,4).map(t => (
                  <label key={t.id} style={{display:"flex", alignItems:"center", gap:12, padding:"12px 14px", borderRadius:10, background:"#f9fafb", marginBottom:8, cursor:"pointer"}}>
                    <input type="radio" name="template" style={{accentColor:"#6366f1"}} />
                    <div>
                      <p style={{margin:0, fontSize:13, fontWeight:600}}>{t.name}</p>
                      <p style={{margin:0, fontSize:11, color:"#9ca3af"}}>{t.category}</p>
                    </div>
                  </label>
                ))}
              </div>
            )}
            {step === 3 && (
              <div>
                <h3 style={{margin:"0 0 20px", fontSize:18, fontWeight:800}}>Schedule Campaign</h3>
                <div style={{marginBottom:16}}>
                  <label style={{fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:6}}>Campaign Name</label>
                  <input placeholder="e.g. Mid-Term Reminder" style={{width:"100%", border:"1px solid #e5e7eb", borderRadius:8, padding:"10px 12px", fontSize:13, outline:"none", boxSizing:"border-box"}} />
                </div>
                <div style={{marginBottom:16}}>
                  <label style={{fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:6}}>Send Date & Time</label>
                  <input type="datetime-local" style={{width:"100%", border:"1px solid #e5e7eb", borderRadius:8, padding:"10px 12px", fontSize:13, outline:"none", boxSizing:"border-box"}} />
                </div>
                <div style={{background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:10, padding:14}}>
                  <p style={{margin:0, fontSize:13, color:"#16a34a", fontWeight:600}}>✓ Ready to send to 342 students</p>
                </div>
              </div>
            )}

            <div style={{display:"flex", gap:10, marginTop:24}}>
              <button onClick={()=>setShowNew(false)} style={{flex:1, background:"#f3f4f6", border:"none", borderRadius:10, padding:"11px", fontSize:14, fontWeight:600, cursor:"pointer", color:"#6b7280"}}>
                Cancel
              </button>
              {step < 3
                ? <button onClick={()=>setStep(step+1)} style={{flex:2, background:"#6366f1", border:"none", borderRadius:10, padding:"11px", fontSize:14, fontWeight:700, cursor:"pointer", color:"#fff"}}>
                    Next →
                  </button>
                : <button onClick={()=>setShowNew(false)} style={{flex:2, background:"#10b981", border:"none", borderRadius:10, padding:"11px", fontSize:14, fontWeight:700, cursor:"pointer", color:"#fff"}}>
                    Launch Campaign 🚀
                  </button>
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// AUTOMATION RULES PAGE
const AutomationPage = () => (
  <div>
    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24}}>
      <div>
        <h2 style={{fontSize:22, fontWeight:800, color:"#1a1a2e", margin:0}}>Automation Rules</h2>
        <p style={{color:"#6b7280", fontSize:13, margin:"4px 0 0"}}>Event-based triggers for automated communication</p>
      </div>
      <button style={{background:"#6366f1", color:"#fff", border:"none", borderRadius:10, padding:"10px 18px", fontSize:13, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:8}}>
        <Icon name="plus" size={16} color="#fff" /> New Rule
      </button>
    </div>

    <div style={{display:"grid", gap:14}}>
      {AUTOMATION_RULES.map(r => (
        <div key={r.id} style={{background:"#fff", borderRadius:14, padding:22, boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
          <div style={{display:"flex", alignItems:"center", gap:16}}>
            <div style={{width:48, height:48, borderRadius:12, background:r.status?"#6366f118":"#f3f4f6", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
              <Icon name="rules" size={22} color={r.status?"#6366f1":"#9ca3af"} />
            </div>
            <div style={{flex:1}}>
              <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:6}}>
                <h4 style={{margin:0, fontSize:15, fontWeight:700, color:"#1a1a2e"}}>{r.name}</h4>
                <Badge text={r.status?"Active":"Paused"} color={r.status?"green":"gray"} />
              </div>
              <div style={{display:"flex", gap:20}}>
                <div style={{display:"flex", alignItems:"center", gap:6}}>
                  <span style={{fontSize:11, fontWeight:700, color:"#9ca3af"}}>TRIGGER</span>
                  <span style={{fontSize:12, color:"#374151", background:"#fef9c3", padding:"2px 8px", borderRadius:5}}>{r.trigger}</span>
                </div>
                <span style={{color:"#d1d5db"}}>→</span>
                <div style={{display:"flex", alignItems:"center", gap:6}}>
                  <span style={{fontSize:11, fontWeight:700, color:"#9ca3af"}}>ACTION</span>
                  <span style={{fontSize:12, color:"#374151", background:"#dcfce7", padding:"2px 8px", borderRadius:5}}>{r.action}</span>
                </div>
              </div>
            </div>
            <div style={{textAlign:"center", marginRight:16}}>
              <p style={{margin:0, fontSize:22, fontWeight:800, color:"#1a1a2e"}}>{r.triggered}</p>
              <p style={{margin:0, fontSize:11, color:"#9ca3af"}}>triggered</p>
            </div>
            {/* Toggle */}
            <div style={{width:44, height:24, borderRadius:12, background:r.status?"#6366f1":"#d1d5db", position:"relative", cursor:"pointer", flexShrink:0}}>
              <div style={{width:18, height:18, borderRadius:"50%", background:"#fff", position:"absolute", top:3, left:r.status?23:3, transition:"left 0.2s", boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}} />
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* How it works */}
    <div style={{background:"linear-gradient(135deg, #6366f110, #8b5cf610)", borderRadius:16, padding:24, marginTop:20, border:"1px solid #6366f120"}}>
      <h3 style={{margin:"0 0 12px", fontSize:16, fontWeight:700, color:"#6366f1"}}>⚙️ How Automation Works</h3>
      <p style={{margin:0, fontSize:13, color:"#374151", lineHeight:1.7}}>
        The Rule Engine monitors academic data continuously. When a trigger condition is met (e.g. attendance drops below 75%), it automatically selects the matching template, fills in student-specific placeholders, and sends the message — no manual effort needed. This is implemented using <strong>node-cron</strong> for scheduled checks and <strong>Nodemailer</strong> for delivery.
      </p>
    </div>
  </div>
);

// AI EMAIL CLASSIFICATION PAGE
const AIPage = () => {
  const [classifying, setClassifying] = useState(false);
  const [done, setDone]               = useState(false);

  const classify = async () => {
    setClassifying(true); setDone(false);
    await new Promise(r => setTimeout(r, 2000));
    setClassifying(false); setDone(true);
  };

  return (
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:22, fontWeight:800, color:"#1a1a2e", margin:0}}>AI Email Classification</h2>
        <p style={{color:"#6b7280", fontSize:13, margin:"4px 0 0"}}>ML model classifies incoming emails as Important or Spam</p>
      </div>

      {/* How it works banner */}
      <div style={{background:"linear-gradient(135deg, #1a1a2e, #302b63)", borderRadius:16, padding:24, marginBottom:24, color:"#fff"}}>
        <div style={{display:"flex", alignItems:"center", gap:12, marginBottom:12}}>
          <Icon name="ai" size={28} color="#a5b4fc" />
          <h3 style={{margin:0, fontSize:17, fontWeight:800}}>How the ML Classifier Works</h3>
        </div>
        <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16}}>
          {[
            { step:"1", label:"Collect",    desc:"Incoming emails gathered" },
            { step:"2", label:"Extract",    desc:"Features extracted (keywords, sender, etc.)" },
            { step:"3", label:"Classify",   desc:"ML.NET model predicts Important/Spam" },
            { step:"4", label:"Prioritize", desc:"Important emails shown first" },
          ].map(s => (
            <div key={s.step} style={{textAlign:"center"}}>
              <div style={{width:36, height:36, borderRadius:"50%", background:"#6366f1", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 8px", fontWeight:800, fontSize:14}}>{s.step}</div>
              <p style={{margin:"0 0 4px", fontSize:13, fontWeight:700, color:"#a5b4fc"}}>{s.label}</p>
              <p style={{margin:0, fontSize:11, color:"#9ca3af"}}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:"#fff", borderRadius:16, boxShadow:"0 2px 12px rgba(0,0,0,0.06)", overflow:"hidden"}}>
        <div style={{padding:"16px 20px", borderBottom:"1px solid #f3f4f6", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <h3 style={{margin:0, fontSize:15, fontWeight:700}}>Inbox — AI Classification</h3>
          <button onClick={classify} disabled={classifying}
            style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)", color:"#fff", border:"none", borderRadius:8, padding:"8px 16px", fontSize:13, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:8, opacity:classifying?0.7:1}}>
            <Icon name="ai" size={14} color="#fff" />
            {classifying ? "Classifying..." : "Run AI Classifier"}
          </button>
        </div>

        {EMAILS.map(e => (
          <div key={e.id} style={{display:"flex", alignItems:"center", gap:16, padding:"14px 20px", borderBottom:"1px solid #f9fafb"}}>
            <div style={{width:10, height:10, borderRadius:"50%", background:e.category==="important"?"#10b981":"#ef4444", flexShrink:0}} />
            <div style={{flex:1}}>
              <p style={{margin:0, fontSize:13, fontWeight:600, color:"#1a1a2e"}}>{e.subject}</p>
              <p style={{margin:"2px 0 0", fontSize:11, color:"#9ca3af"}}>From: {e.from} • {e.time}</p>
            </div>
            <Badge text={done || true ? (e.category==="important"?"✓ Important":"✗ Spam") : "Pending"} color={e.category==="important"?"green":"red"} />
          </div>
        ))}
      </div>

      <div style={{background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:12, padding:16, marginTop:16}}>
        <p style={{margin:0, fontSize:13, color:"#16a34a"}}>
          <strong>Model Info:</strong> Trained on 10,000+ emails using Naive Bayes classifier (ML.NET). Accuracy: 94.2%. In the MERN version, this will be a Python microservice using scikit-learn, called via REST API from the Node.js backend.
        </p>
      </div>
    </div>
  );
};

// ANALYTICS PAGE
const AnalyticsPage = () => {
  const months = ["Jan","Feb","Mar","Apr","May","Jun"];
  const sent    = [420, 380, 510, 620, 480, 590];
  const opened  = [380, 340, 470, 580, 430, 550];
  const maxVal  = 700;

  return (
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:22, fontWeight:800, color:"#1a1a2e", margin:0}}>Analytics Dashboard</h2>
        <p style={{color:"#6b7280", fontSize:13, margin:"4px 0 0"}}>Communication performance and engagement tracking</p>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24}}>
        {[
          { label:"Total Sent",    value:"3,000", color:"#6366f1", icon:"mail" },
          { label:"Open Rate",     value:"91.2%", color:"#10b981", icon:"eye" },
          { label:"Campaigns Run", value:"6",     color:"#f59e0b", icon:"campaign" },
          { label:"Avg. Response", value:"2.4h",  color:"#0ea5e9", icon:"chat" },
        ].map((s,i) => <StatCard key={i} {...s} />)}
      </div>

      {/* Bar Chart */}
      <div style={{background:"#fff", borderRadius:16, padding:24, boxShadow:"0 2px 12px rgba(0,0,0,0.06)", marginBottom:20}}>
        <h3 style={{margin:"0 0 20px", fontSize:16, fontWeight:700}}>Monthly Communication Volume</h3>
        <div style={{display:"flex", alignItems:"flex-end", gap:16, height:180}}>
          {months.map((m,i) => (
            <div key={m} style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4}}>
              <div style={{width:"100%", display:"flex", gap:3, alignItems:"flex-end", height:150}}>
                <div style={{flex:1, background:"#6366f1", borderRadius:"4px 4px 0 0", height:`${(sent[i]/maxVal)*150}px`, transition:"height 0.5s"}} />
                <div style={{flex:1, background:"#10b981", borderRadius:"4px 4px 0 0", height:`${(opened[i]/maxVal)*150}px`, transition:"height 0.5s"}} />
              </div>
              <span style={{fontSize:11, color:"#9ca3af"}}>{m}</span>
            </div>
          ))}
        </div>
        <div style={{display:"flex", gap:20, marginTop:12}}>
          <div style={{display:"flex", alignItems:"center", gap:6}}><div style={{width:12, height:12, background:"#6366f1", borderRadius:3}} /><span style={{fontSize:12, color:"#6b7280"}}>Sent</span></div>
          <div style={{display:"flex", alignItems:"center", gap:6}}><div style={{width:12, height:12, background:"#10b981", borderRadius:3}} /><span style={{fontSize:12, color:"#6b7280"}}>Opened</span></div>
        </div>
      </div>

      {/* Department Breakdown */}
      <div style={{background:"#fff", borderRadius:16, padding:24, boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
        <h3 style={{margin:"0 0 16px", fontSize:16, fontWeight:700}}>Attendance by Department</h3>
        {[
          { dept:"Computer Science", pct:78, count:342 },
          { dept:"Mathematics",      pct:65, count:218 },
          { dept:"Physics",          pct:82, count:189 },
          { dept:"Chemistry",        pct:71, count:156 },
        ].map((d,i) => (
          <div key={i} style={{marginBottom:14}}>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom:6}}>
              <span style={{fontSize:13, fontWeight:600, color:"#374151"}}>{d.dept}</span>
              <span style={{fontSize:12, color:"#6b7280"}}>{d.count} students • <strong>{d.pct}%</strong></span>
            </div>
            <div style={{height:8, background:"#f3f4f6", borderRadius:4}}>
              <div style={{height:"100%", width:`${d.pct}%`, background:d.pct>=75?"#10b981":"#f59e0b", borderRadius:4}} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// MESSAGES PAGE
const MessagesPage = ({ user }) => {
  const [activeMsg, setActiveMsg] = useState(null);
  const [compose, setCompose]     = useState(false);
  const [reply, setReply]         = useState("");

  return (
    <div style={{display:"grid", gridTemplateColumns:"300px 1fr", gap:16, height:"calc(100vh - 180px)"}}>
      {/* Inbox List */}
      <div style={{background:"#fff", borderRadius:16, boxShadow:"0 2px 12px rgba(0,0,0,0.06)", overflow:"hidden", display:"flex", flexDirection:"column"}}>
        <div style={{padding:"16px 16px 12px", borderBottom:"1px solid #f3f4f6"}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
            <h3 style={{margin:0, fontSize:15, fontWeight:700}}>Inbox</h3>
            <button onClick={()=>setCompose(true)} style={{background:"#6366f1", border:"none", borderRadius:8, padding:"6px 12px", fontSize:12, fontWeight:700, color:"#fff", cursor:"pointer"}}>+ Compose</button>
          </div>
        </div>
        {MESSAGES.map(m => (
          <div key={m.id} onClick={()=>setActiveMsg(m)}
            style={{padding:"14px 16px", borderBottom:"1px solid #f9fafb", cursor:"pointer", background:activeMsg?.id===m.id?"#f5f3ff":"#fff"}}>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom:4}}>
              <span style={{fontSize:13, fontWeight:m.read?500:700, color:"#1a1a2e"}}>{m.from}</span>
              <span style={{fontSize:11, color:"#9ca3af"}}>{m.time}</span>
            </div>
            <p style={{margin:0, fontSize:12, color:"#6b7280", display:"-webkit-box", WebkitLineClamp:1, WebkitBoxOrient:"vertical", overflow:"hidden"}}>{m.subject}</p>
            {!m.read && <div style={{width:8, height:8, borderRadius:"50%", background:"#6366f1", marginTop:4}} />}
          </div>
        ))}
      </div>

      {/* Message View */}
      <div style={{background:"#fff", borderRadius:16, boxShadow:"0 2px 12px rgba(0,0,0,0.06)", display:"flex", flexDirection:"column", overflow:"hidden"}}>
        {activeMsg ? (
          <>
            <div style={{padding:"20px 24px", borderBottom:"1px solid #f3f4f6"}}>
              <h3 style={{margin:"0 0 8px", fontSize:17, fontWeight:800}}>{activeMsg.subject}</h3>
              <p style={{margin:0, fontSize:12, color:"#9ca3af"}}>From: {activeMsg.from} • {activeMsg.time}</p>
            </div>
            <div style={{flex:1, padding:24, overflowY:"auto"}}>
              <p style={{fontSize:14, color:"#374151", lineHeight:1.8}}>
                Dear {user.name},<br/><br/>
                This is the message body for "{activeMsg.subject}". In the real system, this will display the actual email content from the database.<br/><br/>
                The platform maintains full message history and delivery tracking for all communications.<br/><br/>
                Regards,<br/>{activeMsg.from}
              </p>
            </div>
            <div style={{padding:"16px 24px", borderTop:"1px solid #f3f4f6"}}>
              <div style={{display:"flex", gap:10}}>
                <input value={reply} onChange={e=>setReply(e.target.value)} placeholder="Write a reply..."
                  style={{flex:1, border:"1px solid #e5e7eb", borderRadius:10, padding:"10px 14px", fontSize:13, outline:"none"}} />
                <button style={{background:"#6366f1", border:"none", borderRadius:10, padding:"10px 16px", cursor:"pointer"}}>
                  <Icon name="send" size={16} color="#fff" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div style={{flex:1, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:12, color:"#9ca3af"}}>
            <Icon name="mail" size={48} color="#e5e7eb" />
            <p style={{margin:0, fontSize:14}}>Select a message to view</p>
          </div>
        )}
      </div>

      {/* Compose Modal */}
      {compose && (
        <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:20}}>
          <div style={{background:"#fff", borderRadius:20, padding:32, maxWidth:500, width:"100%"}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20}}>
              <h3 style={{margin:0, fontSize:18, fontWeight:800}}>New Message</h3>
              <button onClick={()=>setCompose(false)} style={{background:"#f3f4f6", border:"none", borderRadius:8, padding:8, cursor:"pointer"}}>
                <Icon name="x" size={16} color="#6b7280" />
              </button>
            </div>
            {["To","Subject"].map(f => (
              <div key={f} style={{marginBottom:14}}>
                <label style={{fontSize:12, fontWeight:700, color:"#6b7280", display:"block", marginBottom:6}}>{f}</label>
                <input style={{width:"100%", border:"1px solid #e5e7eb", borderRadius:8, padding:"9px 12px", fontSize:13, outline:"none", boxSizing:"border-box"}} />
              </div>
            ))}
            <div style={{marginBottom:20}}>
              <label style={{fontSize:12, fontWeight:700, color:"#6b7280", display:"block", marginBottom:6}}>Message</label>
              <textarea rows={5} style={{width:"100%", border:"1px solid #e5e7eb", borderRadius:8, padding:"9px 12px", fontSize:13, outline:"none", resize:"vertical", boxSizing:"border-box"}} />
            </div>
            <button onClick={()=>setCompose(false)} style={{width:"100%", background:"#6366f1", border:"none", borderRadius:10, padding:"12px", fontSize:14, fontWeight:700, color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8}}>
              <Icon name="send" size={16} color="#fff" /> Send Message
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
const Sidebar = ({ active, setActive, user, onLogout }) => {
  const adminNav = [
    { id:"dashboard",  label:"Dashboard",   icon:"dashboard" },
    { id:"students",   label:"Students",    icon:"users" },
    { id:"templates",  label:"Templates",   icon:"template" },
    { id:"campaigns",  label:"Campaigns",   icon:"campaign" },
    { id:"automation", label:"Automation",  icon:"rules" },
    { id:"ai",         label:"AI Classify", icon:"ai" },
    { id:"analytics",  label:"Analytics",   icon:"analytics" },
    { id:"messages",   label:"Messages",    icon:"mail" },
  ];
  const facultyNav = [
    { id:"dashboard",  label:"Dashboard",   icon:"dashboard" },
    { id:"students",   label:"Students",    icon:"users" },
    { id:"templates",  label:"Templates",   icon:"template" },
    { id:"campaigns",  label:"Campaigns",   icon:"campaign" },
    { id:"automation", label:"Automation",  icon:"rules" },
    { id:"ai",         label:"AI Classify", icon:"ai" },
    { id:"messages",   label:"Messages",    icon:"mail" },
  ];
  const studentNav = [
    { id:"dashboard",  label:"Dashboard",   icon:"dashboard" },
    { id:"messages",   label:"Messages",    icon:"mail" },
    { id:"analytics",  label:"My Reports",  icon:"analytics" },
  ];

  const nav = user.role==="admin" ? adminNav : user.role==="faculty" ? facultyNav : studentNav;

  return (
    <div style={{width:230, background:"#1a1a2e", height:"100vh", display:"flex", flexDirection:"column", flexShrink:0, position:"sticky", top:0}}>
      {/* Logo */}
      <div style={{padding:"24px 20px 20px", borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
        <div style={{display:"flex", alignItems:"center", gap:12}}>
          <div style={{width:38, height:38, background:"linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:"#fff", fontSize:16}}>S</div>
          <div>
            <p style={{margin:0, fontSize:14, fontWeight:800, color:"#fff"}}>SACP</p>
            <p style={{margin:0, fontSize:10, color:"#6366f1"}}>Academic Platform</p>
          </div>
        </div>
      </div>

      {/* User */}
      <div style={{padding:"16px 20px", borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
        <div style={{display:"flex", alignItems:"center", gap:10}}>
          <div style={{width:36, height:36, borderRadius:"50%", background:"#6366f1", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, color:"#fff", fontSize:13, flexShrink:0}}>
            {user.name.split(" ").map(n=>n[0]).join("")}
          </div>
          <div>
            <p style={{margin:0, fontSize:12, fontWeight:700, color:"#fff"}}>{user.name}</p>
            <p style={{margin:0, fontSize:10, color:"#9ca3af", textTransform:"capitalize"}}>{user.role} • {user.dept}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{flex:1, padding:"12px 12px", overflowY:"auto"}}>
        {nav.map(item => (
          <button key={item.id} onClick={()=>setActive(item.id)}
            style={{width:"100%", display:"flex", alignItems:"center", gap:12, padding:"10px 12px", borderRadius:10, border:"none", background:active===item.id?"#6366f1":"transparent", color:active===item.id?"#fff":"#9ca3af", cursor:"pointer", marginBottom:4, textAlign:"left", fontSize:13, fontWeight:active===item.id?700:500, transition:"all 0.15s"}}>
            <Icon name={item.icon} size={17} color={active===item.id?"#fff":"#9ca3af"} />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div style={{padding:"16px 12px", borderTop:"1px solid rgba(255,255,255,0.07)"}}>
        <button onClick={onLogout}
          style={{width:"100%", display:"flex", alignItems:"center", gap:12, padding:"10px 12px", borderRadius:10, border:"none", background:"transparent", color:"#9ca3af", cursor:"pointer", fontSize:13, fontWeight:500}}>
          <Icon name="logout" size={17} color="#9ca3af" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user,       setUser]   = useState(null);
  const [activePage, setActivePage] = useState("dashboard");

  const handleLogin  = (u) => { setUser(u); setActivePage("dashboard"); };
  const handleLogout = () => { setUser(null); };

  if (!user) return <LoginPage onLogin={handleLogin} />;

  const renderPage = () => {
    switch(activePage) {
      case "dashboard":  return <DashboardPage user={user} />;
      case "students":   return <StudentsPage />;
      case "templates":  return <TemplatesPage />;
      case "campaigns":  return <CampaignsPage />;
      case "automation": return <AutomationPage />;
      case "ai":         return <AIPage />;
      case "analytics":  return <AnalyticsPage />;
      case "messages":   return <MessagesPage user={user} />;
      default:           return <DashboardPage user={user} />;
    }
  };

  return (
    <div style={{display:"flex", fontFamily:"'Segoe UI', sans-serif", background:"#f8fafc", minHeight:"100vh"}}>
      <Sidebar active={activePage} setActive={setActivePage} user={user} onLogout={handleLogout} />
      <main style={{flex:1, padding:28, overflowY:"auto", maxHeight:"100vh"}}>
        {renderPage()}
      </main>
    </div>
  );
}
