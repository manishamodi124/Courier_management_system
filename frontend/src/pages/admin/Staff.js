//1
// import { useEffect, useState } from "react";
// import API from "../../api";
// import AdminNavbar from "../../components/AdminNavbar";

// function Staff() {
//   const [staff, setStaff] = useState([]);
//   const [newStaff, setNewStaff] = useState({ name: "", email: "", password: "" });

//   const loadStaff = async () => {
//     try {
//       const res = await API.get("/admin/staff");
//       setStaff(res.data);
//     } catch { alert("Error loading staff"); }
//   };

//   useEffect(() => { loadStaff(); }, []);

//   const addStaff = async () => {
//     if (!newStaff.name || !newStaff.email || !newStaff.password) return alert("All fields required");
//     await API.post("/admin/staff", newStaff);
//     setNewStaff({ name: "", email: "", password: "" });
//     loadStaff();
//   };

//   const deleteStaff = async id => {
//     if (!window.confirm("Delete this staff?")) return;
//     await API.delete(`/admin/staff/${id}`);
//     loadStaff();
//   };

//   const tableStyle = { width: "100%", borderCollapse: "collapse", marginTop: 20 };
//   const thtdStyle = { border: "1px solid #ddd", padding: 10, textAlign: "left" };

//   return (
//     <div>
//       <AdminNavbar />
//       <div style={{ padding: 20 }}>
//         <h2>Staff Management</h2>

//         <div style={{ marginBottom: 20 }}>
//           <input placeholder="Name" value={newStaff.name} onChange={e => setNewStaff({ ...newStaff, name: e.target.value })} />
//           <input placeholder="Email" value={newStaff.email} onChange={e => setNewStaff({ ...newStaff, email: e.target.value })} />
//           <input type="password" placeholder="Password" value={newStaff.password} onChange={e => setNewStaff({ ...newStaff, password: e.target.value })} />
//           <button onClick={addStaff} style={{ marginLeft: 5, padding: "5px 10px", backgroundColor: "#3b82f6", color: "white" }}>Add Staff</button>
//         </div>

//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thtdStyle}>Name</th>
//               <th style={thtdStyle}>Email</th>
//               <th style={thtdStyle}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {staff.map(s => (
//               <tr key={s._id}>
//                 <td style={thtdStyle}>{s.name}</td>
//                 <td style={thtdStyle}>{s.email}</td>
//                 <td style={thtdStyle}>
//                   <button style={{ backgroundColor: "red", color: "white", padding: "5px 10px" }} onClick={() => deleteStaff(s._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//       </div>
//     </div>
//   );
// }

// export default Staff;




//2
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../../api";
// import { 
//   ArrowLeft, UserPlus, Trash2, User, Mail, 
//   Lock, Users, ShieldCheck, Search
// } from "lucide-react";

// function Staff() {
//   const [staff, setStaff] = useState([]);
//   const [newStaff, setNewStaff] = useState({ name: "", email: "", password: "" });
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   const loadStaff = async () => {
//     try {
//       const res = await API.get("/admin/staff");
//       setStaff(res.data);
//     } catch { alert("Error loading staff"); }
//   };

//   useEffect(() => { loadStaff(); }, []);

//   const addStaff = async () => {
//     if (!newStaff.name || !newStaff.email || !newStaff.password) return alert("All fields are mandatory");
//     try {
//       await API.post("/admin/staff", newStaff);
//       setNewStaff({ name: "", email: "", password: "" });
//       loadStaff();
//     } catch { alert("Error adding staff"); }
//   };

//   const deleteStaff = async id => {
//     if (!window.confirm("Remove this staff member?")) return;
//     try {
//       await API.delete(`/admin/staff/${id}`);
//       loadStaff();
//     } catch { alert("Delete failed"); }
//   };

//   const filteredStaff = staff.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

//   return (
//     <div style={mainContainer}>
//       {/* --- TOP NAV --- */}
//       <div style={topNav}>
//         <button onClick={() => navigate("/admin/dashboard")} style={backLink}>
//           <ArrowLeft size={20} /> Dashboard
//         </button>
//         <div style={headerText}>
//           <h2 style={{margin:0, color:'#1e293b'}}>Team Management</h2>
//           <span style={staffCount}>{staff.length} Members</span>
//         </div>
//       </div>

//       <div style={splitLayout}>
        
//         {/* --- LEFT: ADD STAFF FORM (Modern Look) --- */}
//         <div style={formSidebar}>
//           <div style={formHeader}>
//             <div style={iconBox}><UserPlus color="#fff" /></div>
//             <h3>Register Staff</h3>
//             <p>Create a new account for your delivery agent or admin.</p>
//           </div>
          
//           <div style={fieldGroup}>
//             <label style={labelStyle}>Full Name</label>
//             <div style={inputWrap}>
//               <User size={18} color="#94a3b8" />
//               <input style={cleanInput} placeholder="e.g. Rahul Sharma" value={newStaff.name} onChange={e => setNewStaff({ ...newStaff, name: e.target.value })} />
//             </div>
//           </div>

//           <div style={fieldGroup}>
//             <label style={labelStyle}>Email Address</label>
//             <div style={inputWrap}>
//               <Mail size={18} color="#94a3b8" />
//               <input style={cleanInput} placeholder="rahul@company.com" value={newStaff.email} onChange={e => setNewStaff({ ...newStaff, email: e.target.value })} />
//             </div>
//           </div>

//           <div style={fieldGroup}>
//             <label style={labelStyle}>Access Password</label>
//             <div style={inputWrap}>
//               <Lock size={18} color="#94a3b8" />
//               <input type="password" style={cleanInput} placeholder="••••••••" value={newStaff.password} onChange={e => setNewStaff({ ...newStaff, password: e.target.value })} />
//             </div>
//           </div>

//           <button onClick={addStaff} style={primaryBtn}>Create Account</button>
//         </div>

//         {/* --- RIGHT: STAFF LIST --- */}
//         <div style={listSection}>
//           <div style={listControls}>
//             <div style={searchBox}>
//               <Search size={18} color="#64748b" />
//               <input style={searchInp} placeholder="Search staff by name..." onChange={(e) => setSearchTerm(e.target.value)} />
//             </div>
//           </div>

//           <div style={gridDisplay}>
//             {filteredStaff.map(s => (
//               <div key={s._id} style={staffCard}>
//                 <div style={cardTop}>
//                   <div style={initials}>{s.name.charAt(0)}</div>
//                   <div style={statusTag}><ShieldCheck size={12} /> Active</div>
//                 </div>
//                 <h4 style={staffName}>{s.name}</h4>
//                 <p style={staffEmail}>{s.email}</p>
//                 <button onClick={() => deleteStaff(s._id)} style={dangerBtn}>
//                   <Trash2 size={14} /> Remove Member
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// // --- STYLING (Fresh Theme) ---
// const mainContainer = { backgroundColor: "#f1f5f9", minHeight: "100vh", padding: "20px 40px" };
// const topNav = { display: "flex", alignItems: "center", gap: "30px", marginBottom: "30px", borderBottom: "1px solid #e2e8f0", paddingBottom: "15px" };
// const backLink = { background: "none", border: "none", color: "#6366f1", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" };
// const headerText = { display: "flex", alignItems: "center", gap: "15px" };
// const staffCount = { backgroundColor: "#6366f1", color: "#fff", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "700" };

// const splitLayout = { display: "grid", gridTemplateColumns: "350px 1fr", gap: "30px" };

// // Form Sidebar Styles
// const formSidebar = { backgroundColor: "#fff", padding: "30px", borderRadius: "24px", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)", height: "fit-content" };
// const formHeader = { marginBottom: "25px", textAlign: "center" };
// const iconBox = { background: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)", width: "50px", height: "50px", borderRadius: "15px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 15px" };
// const labelStyle = { display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "8px" };
// const fieldGroup = { marginBottom: "20px" };
// const inputWrap = { display: "flex", alignItems: "center", gap: "10px", border: "1.5px solid #e2e8f0", padding: "12px", borderRadius: "12px", transition: "0.3s" };
// const cleanInput = { border: "none", outline: "none", width: "100%", fontSize: "14px", fontWeight: "500" };
// const primaryBtn = { width: "100%", padding: "14px", border: "none", borderRadius: "12px", backgroundColor: "#1e293b", color: "#fff", fontWeight: "700", cursor: "pointer", marginTop: "10px" };

// // List Section Styles
// const listSection = { display: "flex", flexDirection: "column", gap: "20px" };
// const listControls = { backgroundColor: "#fff", padding: "15px 25px", borderRadius: "20px", display: "flex", justifyContent: "space-between" };
// const searchBox = { display: "flex", alignItems: "center", gap: "10px", flex: 1 };
// const searchInp = { border: "none", outline: "none", width: "100%", fontSize: "15px" };

// const gridDisplay = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" };
// const staffCard = { backgroundColor: "#fff", padding: "20px", borderRadius: "20px", border: "1px solid #e2e8f0", transition: "0.2s" };
// const cardTop = { display: "flex", justifyContent: "space-between", marginBottom: "15px" };
// const initials = { width: "40px", height: "40px", backgroundColor: "#f1f5f9", color: "#6366f1", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800" };
// const statusTag = { fontSize: "10px", fontWeight: "700", color: "#10b981", backgroundColor: "#dcfce7", padding: "4px 8px", borderRadius: "6px", display: "flex", alignItems: "center", gap: "4px" };
// const staffName = { margin: "0 0 5px 0", fontSize: "16px", color: "#1e293b" };
// const staffEmail = { margin: "0 0 20px 0", fontSize: "13px", color: "#64748b" };
// const dangerBtn = { width: "100%", padding: "8px", border: "1.5px solid #fee2e2", borderRadius: "10px", backgroundColor: "transparent", color: "#ef4444", fontWeight: "700", cursor: "pointer", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" };

// export default Staff;





// //3
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../../api";

// function Staff() {
//   const [staff, setStaff] = useState([]);
//   const [newStaff, setNewStaff] = useState({ name: "", email: "", password: "" });
//   const navigate = useNavigate();

//   const loadStaff = async () => {
//     try {
//       const res = await API.get("/admin/staff");
//       setStaff(res.data);
//     } catch { alert("Error loading staff"); }
//   };

//   useEffect(() => { loadStaff(); }, []);

//   const addStaff = async () => {
//     if (!newStaff.name || !newStaff.email || !newStaff.password) return alert("Fill all fields");
//     await API.post("/admin/staff", newStaff);
//     setNewStaff({ name: "", email: "", password: "" });
//     loadStaff();
//   };

//   const deleteStaff = async id => {
//     if (window.confirm("Delete this staff?")) {
//       await API.delete(`/admin/staff/${id}`);
//       loadStaff();
//     }
//   };

//   return (
//     <div style={{ padding: "30px", fontFamily: "sans-serif", backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
      
//       {/* Back Button */}
//       <button onClick={() => navigate("/admin/dashboard")} style={backBtn}>← Back to Dashboard</button>

//       <h2 style={{ color: "#333" }}>Staff Management</h2>

//       {/* SIMPLE ADD FORM */}
//       <div style={formContainer}>
//         <input style={inputStyle} placeholder="Name" value={newStaff.name} onChange={e => setNewStaff({ ...newStaff, name: e.target.value })} />
//         <input style={inputStyle} placeholder="Email" value={newStaff.email} onChange={e => setNewStaff({ ...newStaff, email: e.target.value })} />
//         <input style={inputStyle} type="password" placeholder="Password" value={newStaff.password} onChange={e => setNewStaff({ ...newStaff, password: e.target.value })} />
//         <button onClick={addStaff} style={addBtnStyle}>+ Add Staff Member</button>
//       </div>

//       {/* SIMPLE TABLE */}
//       <table style={tableStyle}>
//         <thead>
//           <tr style={{ backgroundColor: "#3b82f6", color: "white" }}>
//             <th style={thtdStyle}>Staff Name</th>
//             <th style={thtdStyle}>Email</th>
//             <th style={{ ...thtdStyle, textAlign: "center" }}>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {staff.map(s => (
//             <tr key={s._id} style={{ borderBottom: "1px solid #ddd", backgroundColor: "white" }}>
//               <td style={thtdStyle}>{s.name}</td>
//               <td style={thtdStyle}>{s.email}</td>
//               <td style={{ ...thtdStyle, textAlign: "center" }}>
//                 <button style={deleteBtnStyle} onClick={() => deleteStaff(s._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// // --- EASY CSS (Simple Objects) ---
// const backBtn = { marginBottom: "20px", cursor: "pointer", border: "none", background: "none", color: "#3b82f6", fontWeight: "bold" };
// const formContainer = { display: "flex", gap: "10px", marginBottom: "30px", backgroundColor: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" };
// const inputStyle = { padding: "10px", border: "1px solid #ddd", borderRadius: "5px", flex: 1 };
// const addBtnStyle = { padding: "10px 20px", backgroundColor: "#10b981", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" };
// const tableStyle = { width: "100%", borderCollapse: "collapse", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" };
// const thtdStyle = { padding: "12px", textAlign: "left", border: "1px solid #eee" };
// const deleteBtnStyle = { backgroundColor: "#ef4444", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" };

// export default Staff;










//4
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import "./Staff.css"; // External CSS

function Staff() {
  const [staff, setStaff] = useState([]);
  const [newStaff, setNewStaff] = useState({ name: "", email: "", password: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Load staff
  const loadStaff = async () => {
    try {
      const res = await API.get("/admin/staff");
      setStaff(res.data);
    } catch {
      alert("Error loading staff");
    }
  };

  useEffect(() => { loadStaff(); }, []);

  // Add staff
  const addStaff = async () => {
    if (!newStaff.name || !newStaff.email || !newStaff.password) return alert("All fields required");
    try {
      await API.post("/admin/staff", newStaff);
      setNewStaff({ name: "", email: "", password: "" });
      loadStaff();
    } catch {
      alert("Failed to add staff");
    }
  };

  // Delete staff
  const deleteStaff = async (id) => {
    if (window.confirm("Are you sure to delete this staff?")) {
      try {
        await API.delete(`/admin/staff/${id}`);
        loadStaff();
      } catch {
        alert("Failed to delete staff");
      }
    }
  };

  // Filtered staff
  const filteredStaff = staff.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="staff-container">
      <div className="staff-header">
        <button className="back-btn" onClick={() => navigate("/admin/dashboard")}>← Dashboard</button>
        <h2>Staff Management</h2>
        <span className="staff-count">{staff.length} Members</span>
      </div>

      <div className="staff-top">
        {/* Add Staff Form */}
        <div className="staff-form">
          <h3>Add New Staff</h3>
          <input placeholder="Name" value={newStaff.name} onChange={e => setNewStaff({ ...newStaff, name: e.target.value })} />
          <input placeholder="Email" value={newStaff.email} onChange={e => setNewStaff({ ...newStaff, email: e.target.value })} />
          <input type="password" placeholder="Password" value={newStaff.password} onChange={e => setNewStaff({ ...newStaff, password: e.target.value })} />
          <button onClick={addStaff} className="add-btn">+ Add Staff</button>
        </div>

        {/* Search Box */}
        <div className="staff-search">
          <input placeholder="Search by name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
      </div>

      {/* Staff Cards */}
      <div className="staff-cards">
        {filteredStaff.length === 0 && <p>No staff found.</p>}
        {filteredStaff.map(s => (
          <div className="staff-card" key={s._id}>
            <div className="staff-initial">{s.name.charAt(0)}</div>
            <h4>{s.name}</h4>
            <p>{s.email}</p>
            <button className="delete-btn" onClick={() => deleteStaff(s._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Staff;