// import { useEffect, useState } from "react";
// import API from "../../api";
// import "../../index.css";

// function AdminDashboard() {
//   const [shipments, setShipments] = useState([]);
//   const [staff, setStaff] = useState([]);
//   const [report, setReport] = useState({});
//   const [customers, setCustomers] = useState([]);

//   const [newStaff, setNewStaff] = useState({
//     name: "",
//     email: "",
//     password: ""
//   });

//   useEffect(() => {
//     load();
//   }, []);

//   const load = async () => {
//     try {
//       const s = await API.get("/admin/shipments");
//       const st = await API.get("/admin/staff");
//       const r = await API.get("/admin/reports");
//       const c = await API.get("/admin/customers");

//       setShipments(s.data);
//       setStaff(st.data);
//       setReport(r.data);
//       setCustomers(c.data);
//     } catch (err) {
//       alert("Error loading data");
//     }
//   };

//   // ✅ Assign Staff
//   const assign = async (shipmentId, staffId) => {
//     if (!staffId) return;
//     try {
//       await API.post("/admin/assign", { shipmentId, staffId });
//       load();
//     } catch (err) {
//       alert("Assignment failed");
//     }
//   };

//   // ✅ Add Staff
//   const addStaffHandler = async () => {
//     if (!newStaff.name || !newStaff.email || !newStaff.password) {
//       alert("All fields required");
//       return;
//     }

//     try {
//       await API.post("/admin/staff", newStaff);
//       alert("Staff Added ✅");
//       setNewStaff({ name: "", email: "", password: "" });
//       load();
//     } catch (err) {
//       alert("Failed to add staff");
//     }
//   };

//   const updateStatus = async (id) => {
//   try {
//     await API.put(`/admin/shipment/${id}`, { status: "Delivered" });
//     alert("Marked Delivered ✅");
//     load();
//   } catch (err) {
//     alert("Failed to update status");
//   }
// };
//   // ✅ Delete Shipment
//   const deleteShipment = async (id) => {
//     try {
//       await API.delete(`/admin/shipment/${id}`);
//       alert("Deleted ✅");
//       load();
//     } catch (err) {
//       alert("Delete failed");
//     }
//   };

//   return (
//     <div>
//       <h2 style={{ padding: 20 }}>Admin Dashboard</h2>

//       {/* 📊 Reports */}
//       <div className="card">
//         <h3>📊 Reports</h3>
//         <p>Total: {report.total}</p>
//         <p>Delivered: {report.delivered}</p>
//         <p>Pending: {report.pending}</p>
//       </div>

//       {/* ➕ Add Staff */}
//       <div className="card">
//         <h3>➕ Add Staff</h3>

//         <input
//           placeholder="Name"
//           value={newStaff.name}
//           onChange={(e) =>
//             setNewStaff({ ...newStaff, name: e.target.value })
//           }
//         />

//         <input
//           placeholder="Email"
//           value={newStaff.email}
//           onChange={(e) =>
//             setNewStaff({ ...newStaff, email: e.target.value })
//           }
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={newStaff.password}
//           onChange={(e) =>
//             setNewStaff({ ...newStaff, password: e.target.value })
//           }
//         />

//         <button onClick={addStaffHandler}>Add Staff</button>
//       </div>

//       {/* 📦 Shipments */}
//       {shipments.map((s) => (
//         <div key={s._id} className="card">
//           <p><b>ID:</b> {s.trackingId}</p>
//           <p><b>Status:</b> {s.status}</p>

//           <p>
//             <b>Assigned:</b>{" "}
//             {s.assignedStaff ? s.assignedStaff.name : "❌ Not Assigned"}
//           </p>

//           <select
//             disabled={s.assignedStaff}
//             onChange={(e) => assign(s._id, e.target.value)}
//           >
//             <option value="">Select Staff</option>
//             {staff.map((st) => (
//               <option key={st._id} value={st._id}>
//                 {st.name}
//               </option>
//             ))}
//           </select>

//           {/* ✅ Mark Delivered */}
//     <button
//   disabled={s.status === "Delivered"}
//   style={{ backgroundColor: "green", marginTop: 10 }}
//   onClick={() => updateStatus(s._id)}
// >
//   Mark Delivered
// </button>

//           {/* ❌ Delete Button */}
//           <button
//             style={{ backgroundColor: "red", marginTop: 10 }}
//             onClick={() => deleteShipment(s._id)}
//           >
//             Delete
//           </button>
//         </div>
//       ))}

//       {/* 👤 Customers */}
//       <div className="card">
//         <h3>👤 Customers</h3>
//         {customers.length === 0 && <p>No customers</p>}

//         {customers.map((c) => (
//           <p key={c._id}>
//             {c.name} ({c.email})
//           </p>
//         ))}
//       </div>
//     </div>
    
//   );
// }

// export default AdminDashboard;








//1(main)

// import AdminNavbar from "../../components/AdminNavbar";
// import { useEffect, useState } from "react";
// import API from "../../api";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const [report, setReport] = useState({});
//   const navigate = useNavigate();

//   const loadReports = async () => {
//     try {
//       const res = await API.get("/admin/reports");
//       setReport(res.data);
//     } catch {
//       alert("Error loading reports");
//     }
//   };

//   useEffect(() => {
//     loadReports();
//   }, []);

//   const cardStyle = { 
//     padding: 20, 
//     borderRadius: 10, 
//     backgroundColor: "#fff", 
//     boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//     cursor: "pointer",
//     width: "200px",
//     textAlign: "center"
//   };

//   return (
//     <div>
//       <AdminNavbar />
//       <div style={{ padding: 20 }}>
//         <h2>Admin Dashboard</h2>
//         <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 20 }}>
//           <div style={cardStyle} onClick={() => navigate("/admin/shipments")}>
//             <h3>Total Shipments</h3>
//             <p style={{ fontSize: 24 }}>{report.total || 0}</p>
//           </div>
//           <div style={cardStyle} onClick={() => navigate("/admin/shipments")}>
//             <h3>Delivered</h3>
//             <p style={{ fontSize: 24, color: "green" }}>{report.delivered || 0}</p>
//           </div>
//           <div style={cardStyle} onClick={() => navigate("/admin/shipments")}>
//             <h3>Pending</h3>
//             <p style={{ fontSize: 24, color: "orange" }}>{report.pending || 0}</p>
//           </div>
//           <div style={cardStyle} onClick={() => navigate("/admin/staff")}>
//             <h3>Manage Staff</h3>
//             <p style={{ fontSize: 24 }}>➕</p>
//           </div>
//           <div style={cardStyle} onClick={() => navigate("/admin/customers")}>
//             <h3>Customers</h3>
//             <p style={{ fontSize: 24 }}>👤</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;







































//2


// import AdminNavbar from "../../components/AdminNavbar";
// import { useEffect, useState } from "react";
// import API from "../../api";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const [report, setReport] = useState({});
//   const navigate = useNavigate();

//   const loadReports = async () => {
//     try {
//       const res = await API.get("/admin/reports");
//       setReport(res.data);
//     } catch {
//       alert("Error loading reports");
//     }
//   };

//   useEffect(() => {
//     loadReports();
//   }, []);

//   const percent = (val) => {
//     if (!report.total) return 0;
//     return Math.round((val / report.total) * 100);
//   };

//   return (
//     <div style={{ background: "#f1f5f9", minHeight: "100vh" }}>
//       <AdminNavbar />

//       <div style={{ padding: 25 }}>
//         <h2 style={{ marginBottom: 20 }}>📊 Dashboard</h2>

//         {/* 🔥 MODERN CARDS */}
//         <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          
//           <Card 
//             title="Total Shipments" 
//             value={report.total || 0} 
//             onClick={() => navigate("/admin/shipments")}
//             gradient="linear-gradient(135deg,#3b82f6,#6366f1)"
//           />

//           <Card 
//             title="Delivered" 
//             value={report.delivered || 0} 
//             onClick={() => navigate("/admin/shipments")}
//             gradient="linear-gradient(135deg,#10b981,#059669)"
//           />

//           <Card 
//             title="Pending" 
//             value={report.pending || 0} 
//             onClick={() => navigate("/admin/shipments")}
//             gradient="linear-gradient(135deg,#f59e0b,#d97706)"
//           />

//           <Card 
//             title="Add Staff" 
//             value="➕" 
//             onClick={() => navigate("/admin/staff")}
//             gradient="linear-gradient(135deg,#6366f1,#4f46e5)"
//           />

//           <Card 
//             title="Customers" 
//             value="👤" 
//             onClick={() => navigate("/admin/customers")}
//             gradient="linear-gradient(135deg,#ec4899,#db2777)"
//           />
//         </div>

//         {/* 🔥 GRAPH + ACTIVITY */}
//         <div style={{ display: "flex", gap: 20, marginTop: 40, flexWrap: "wrap" }}>

//           {/* GRAPH */}
//           <div style={box}>
//             <h3>📈 Shipment Overview</h3>

//             {[
//               { label: "Delivered", value: percent(report.delivered || 0), color: "#10b981" },
//               { label: "Pending", value: percent(report.pending || 0), color: "#f59e0b" },
//             ].map((item, i) => (
//               <div key={i} style={{ marginTop: 20 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between" }}>
//                   <span>{item.label}</span>
//                   <span>{item.value}%</span>
//                 </div>

//                 <div style={progressBg}>
//                   <div
//                     style={{
//                       width: item.value + "%",
//                       height: "100%",
//                       background: item.color,
//                       borderRadius: 10,
//                     }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* ACTIVITY */}
//           <div style={box}>
//             <h3>📌 Recent Activity</h3>

//             <ul style={{ marginTop: 15, lineHeight: 2 }}>
//               <li>✔ Shipment Delivered</li>
//               <li>📦 New Booking Added</li>
//               <li>🚚 Out for Delivery</li>
//               <li>⏳ Pending Shipment</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* 🔥 CARD COMPONENT */
// const Card = ({ title, value, gradient, onClick }) => (
//   <div
//     onClick={onClick}
//     style={{
//       flex: "1",
//       minWidth: "200px",
//       padding: 20,
//       borderRadius: 16,
//       color: "#fff",
//       background: gradient,
//       cursor: "pointer",
//       boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
//       transition: "0.3s",
//     }}
//     onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
//     onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
//   >
//     <h4>{title}</h4>
//     <h2>{value}</h2>
//   </div>
// );

// /* 🔥 BOX STYLE */
// const box = {
//   flex: 1,
//   minWidth: "300px",
//   background: "#fff",
//   padding: 20,
//   borderRadius: 16,
//   boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
// };

// /* 🔥 PROGRESS BAR */
// const progressBg = {
//   height: 10,
//   background: "#e5e7eb",
//   borderRadius: 10,
//   overflow: "hidden",
//   marginTop: 5,
// };

// export default Dashboard;













//3

// import AdminNavbar from "../../components/AdminNavbar";
// import { useEffect, useState } from "react";
// import API from "../../api";
// import { useNavigate } from "react-router-dom";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// const Dashboard = () => {
//   const [shipments, setShipments] = useState([]);
//   const [staff, setStaff] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const s = await API.get("/admin/shipments");
//       const st = await API.get("/admin/staff");
//       const c = await API.get("/admin/customers");

//       setShipments(s.data);
//       setStaff(st.data);
//       setCustomers(c.data);
//     } catch {
//       alert("Error loading dashboard");
//     }
//   };

//   // 🔥 REAL LOGIC
//   const total = shipments.length;

//   const delivered = shipments.filter(s => s.status === "Delivered").length;

//   const pending = shipments.filter(s => s.status === "Pending").length;

//   const transit = shipments.filter(s => s.status === "In Transit").length;

//   const picked = shipments.filter(s => s.status === "Picked").length;

//   // 📊 PIE DATA
//   const pieData = [
//     { name: "Delivered", value: delivered },
//     { name: "Pending", value: pending },
//     { name: "In Transit", value: transit },
//     { name: "Picked", value: picked }
//   ];

//   const COLORS = ["#16a34a", "#f59e0b", "#3b82f6", "#8b5cf6"];

//   // 🔥 CARD
//   const Card = ({ title, value, color, onClick }) => (
//     <div
//       onClick={onClick}
//       style={{
//         flex: 1,
//         padding: 20,
//         borderRadius: 12,
//         background: color,
//         color: "#fff",
//         cursor: "pointer",
//         textAlign: "center",
//         boxShadow: "0 6px 15px rgba(0,0,0,0.1)"
//       }}
//     >
//       <h4>{title}</h4>
//       <h2>{value}</h2>
//     </div>
//   );

//   return (
//     <div style={{ background: "#f4f6f9", minHeight: "100vh" }}>
//       <AdminNavbar />

//       <div style={{ padding: 20 }}>
//         <h2>🚀 Dashboard</h2>

//         {/* 🔥 TOP CARDS */}
//         <div style={{ display: "flex", gap: 20 }}>
//           <Card title="Total Shipments" value={total} color="#ff4081" onClick={() => navigate("/admin/shipments")} />
//           <Card title="Delivered" value={delivered} color="#16a34a" onClick={() => navigate("/admin/shipments")} />
//           <Card title="Pending" value={pending} color="#f59e0b" onClick={() => navigate("/admin/shipments")} />
//         </div>

//         {/* ACTION */}
//         <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
//           <Card title="Staff" value={staff.length} color="#3b82f6" onClick={() => navigate("/admin/staff")} />
//           <Card title="Customers" value={customers.length} color="#8b5cf6" onClick={() => navigate("/admin/customers")} />
//         </div>

//         {/* MAIN */}
//         <div style={{ display: "flex", gap: 20, marginTop: 30 }}>

//           {/* ✅ STATUS TABLE (REAL) */}
//           <div style={{ flex: 1, background: "#fff", padding: 20, borderRadius: 10 }}>
//             <h3>Status Overview</h3>

//             <table style={{ width: "100%", marginTop: 10 }}>
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Status</th>
//                   <th>Count</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {[
//                   ["Delivered", delivered],
//                   ["Pending", pending],
//                   ["In Transit", transit],
//                   ["Picked", picked],
//                   ["Total", total]
//                 ].map((item, i) => (
//                   <tr key={i}>
//                     <td>{i + 1}</td>
//                     <td>{item[0]}</td>
//                     <td>{item[1]}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* ✅ REAL PIE CHART */}
//           <div style={{ flex: 1, background: "#fff", padding: 20, borderRadius: 10 }}>
//             <h3>Shipment Distribution</h3>

//             <PieChart width={320} height={300}>
//               <Pie
//                 data={pieData}
//                 dataKey="value"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={100}
//                 label
//               >
//                 {pieData.map((entry, index) => (
//                   <Cell key={index} fill={COLORS[index]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;











//4
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../../api";
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

// const Dashboard = () => {
//   const [report, setReport] = useState({
//     total: 0, delivered: 0, pending: 0,
//     accepted: 0, collected: 0, shipped: 0, intransit: 0, outfordelivery: 0
//   });
//   const navigate = useNavigate();

//   const loadReports = async () => {
//     try {
//       const res = await API.get("/admin/reports");
//       setReport(res.data);
//     } catch {
//       console.log("Error loading reports");
//     }
//   };

//   useEffect(() => { loadReports(); }, []);

//   const statusData = [
//     { name: "Accepted", value: report.accepted || 10, color: "#3b82f6" },
//     { name: "Collected", value: report.collected || 15, color: "#ef4444" },
//     { name: "Shipped", value: report.shipped || 20, color: "#f59e0b" },
//     { name: "In-Transit", value: report.intransit || 25, color: "#22c55e" },
//     { name: "Delivered", value: report.delivered || 30, color: "#a855f7" },
//   ];

//   return (
//     <div style={{ backgroundColor: "#f3f4f6", minHeight: "100vh", fontFamily: "sans-serif" }}>
      
//       {/* 1. HORIZONTAL MENU (As per your Image) */}
//       <div style={{ backgroundColor: "#fff", padding: "15px 30px", boxShadow: "0 2px 5px rgba(0,0,0,0.05)", display: "flex", gap: "15px" }}>
//         <button style={activeMenuBtn} onClick={() => navigate("/admin/dashboard")}>Dashboard</button>
//         <button style={menuBtn} onClick={() => navigate("/admin/shipments")}>Shipments</button>
//         <button style={menuBtn} onClick={() => navigate("/admin/staff")}>Staff</button>
//         <button style={menuBtn} onClick={() => navigate("/admin/customers")}>Customers</button>
//       </div>

//       <div style={{ padding: "30px" }}>
//         {/* 2. TOP HORIZONTAL CARDS */}
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "25px", marginBottom: "30px" }}>
//           <StatCard color="#f43f5e" title="Total Shipments" count={report.total || 0} />
//           <StatCard color="#22c55e" title="Total Delivered" count={report.delivered || 0} />
//           <StatCard color="#06b6d4" title="Total Pending" count={report.pending || 0} />
//         </div>

//         {/* 3. TABLE & GRAPH SIDE-BY-SIDE */}
//         <div style={{ display: "flex", gap: "25px", flexWrap: "wrap" }}>
          
//           {/* Table Box */}
//           <div style={panelStyle}>
//             <h4 style={{ marginBottom: "20px" }}>Parcel Status Summary</h4>
//             <table style={{ width: "100%", borderCollapse: "collapse" }}>
//               <thead>
//                 <tr style={{ borderBottom: "2px solid #f3f4f6", textAlign: "left" }}>
//                   <th style={thStyle}>Status</th>
//                   <th style={thStyle}>Count</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {statusData.map((item, i) => (
//                   <tr key={i} style={{ borderBottom: "1px solid #f9fafb" }}>
//                     <td style={tdStyle}>{item.name}</td>
//                     <td style={tdStyle}><strong>{item.value}</strong></td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Graph Box */}
//           <div style={{ ...panelStyle, flex: 0.8, textAlign: "center" }}>
//             <h4 style={{ marginBottom: "20px" }}>Daily Activities</h4>
//             <div style={{ height: "300px" }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
//                     {statusData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// // --- STYLES ---
// const menuBtn = {
//   padding: "10px 25px", borderRadius: "25px", border: "none", backgroundColor: "#f1f5f9",
//   color: "#475569", cursor: "pointer", fontWeight: "600", transition: "0.3s"
// };

// const activeMenuBtn = {
//   ...menuBtn, backgroundColor: "#3b82f6", color: "#fff", boxShadow: "0 4px 6px rgba(59, 130, 246, 0.3)"
// };

// const StatCard = ({ color, title, count }) => (
//   <div style={{ backgroundColor: color, color: "#fff", padding: "30px", borderRadius: "15px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
//     <div style={{ fontSize: "14px", opacity: 0.9 }}>{title}</div>
//     <div style={{ fontSize: "36px", fontWeight: "bold", marginTop: "10px" }}>{count}</div>
//   </div>
// );

// const panelStyle = {
//   flex: 1.2, backgroundColor: "#fff", padding: "25px", borderRadius: "15px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
// };

// const thStyle = { padding: "12px", color: "#64748b", fontSize: "13px", textTransform: "uppercase" };
// const tdStyle = { padding: "15px 12px", color: "#1e293b", fontSize: "15px" };

// export default Dashboard;








//5

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../../api";
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
// import { Users, UserPlus, Package, Truck, LayoutDashboard, Users2 } from "lucide-react";

// const Dashboard = () => {
//   // --- EXACT SAME LOGIC AS YOUR ORIGINAL CODE ---
//   const [report, setReport] = useState({});
//   const navigate = useNavigate();

//   const loadReports = async () => {
//     try {
//       const res = await API.get("/admin/reports");
//       setReport(res.data); // This will have .total, .delivered, .pending
//     } catch {
//       alert("Error loading reports");
//     }
//   };

//   useEffect(() => {
//     loadReports();
//   }, []);

//   // --- DATA MAPPING (Using only your real fields) ---
//   const statusData = [
//     { name: "Delivered", value: report.delivered || 0, color: "#22c55e" },
//     { name: "Pending", value: report.pending || 0, color: "#f59e0b" },
//   ];

//   return (
//     <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "sans-serif" }}>
      
//       {/* 1. HORIZONTAL NAV (Blue Pills Design) */}
//       <div style={{ backgroundColor: "#fff", padding: "12px 30px", display: "flex", gap: "12px", borderBottom: "1px solid #e2e8f0" }}>
//         <div style={activePill} onClick={() => navigate("/admin/dashboard")}>Dashboard</div>
//         <div style={pill} onClick={() => navigate("/admin/shipments")}>Shipments</div>
//         <div style={pill} onClick={() => navigate("/admin/staff")}>Staff</div>
//         <div style={pill} onClick={() => navigate("/admin/customers")}>Customers</div>
//       </div>

//       <div style={{ padding: "30px" }}>
        
//         {/* 2. TOP STATS (Using your real report fields) */}
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "30px" }}>
//           <StatCard color="#f43f5e" title="Total Shipments" count={report.total || 0} icon={<Package size={28}/>} />
//           <StatCard color="#22c55e" title="Delivered" count={report.delivered || 0} icon={<Truck size={28}/>} />
//           <StatCard color="#06b6d4" title="Pending" count={report.pending || 0} icon={<Users size={28}/>} />
//         </div>

//         {/* 3. MANAGE STAFF & CUSTOMERS (Horizontal Action Boxes) */}
//         <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
//           <div style={actionCard} onClick={() => navigate("/admin/staff")}>
//             <div style={iconCircle}><UserPlus color="#3b82f6" /></div>
//             <div>
//               <h4 style={{margin:0}}>Manage Staff</h4>
//               <small style={{color:'#64748b'}}>Add/Edit Staff Members</small>
//             </div>
//           </div>
//           <div style={actionCard} onClick={() => navigate("/admin/customers")}>
//             <div style={iconCircle}><Users2 color="#8b5cf6" /></div>
//             <div>
//               <h4 style={{margin:0}}>Customers</h4>
//               <small style={{color:'#64748b'}}>View Customer Database</small>
//             </div>
//           </div>
//         </div>

//         {/* 4. PARCEL SUMMARY & GRAPH */}
//         <div style={{ display: "flex", gap: "25px", flexWrap: "wrap" }}>
          
//           <div style={panelBox}>
//             <h3 style={{fontSize:'16px', marginBottom:'20px'}}>Parcel Status Summary</h3>
//             <table style={{ width: "100%", borderCollapse: "collapse" }}>
//               <thead>
//                 <tr style={{ borderBottom: "2px solid #f1f5f9", textAlign: 'left' }}>
//                   <th style={thStyle}>Status</th>
//                   <th style={thStyle}>Count</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td style={tdStyle}>Total Shipments</td>
//                   <td style={tdStyle}><b>{report.total || 0}</b></td>
//                 </tr>
//                 <tr>
//                   <td style={tdStyle}>Successfully Delivered</td>
//                   <td style={{...tdStyle, color: 'green'}}><b>{report.delivered || 0}</b></td>
//                 </tr>
//                 <tr>
//                   <td style={tdStyle}>Pending / Shipped</td>
//                   <td style={{...tdStyle, color: 'orange'}}><b>{report.pending || 0}</b></td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//           <div style={{ ...panelBox, flex: 0.8, textAlign: "center" }}>
//             <h3 style={{fontSize:'16px', marginBottom:'20px'}}>Activity Graph</h3>
//             <div style={{ height: "250px" }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
//                     {statusData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// // --- STYLING (Simple & Clean) ---
// const pill = { padding: "10px 22px", borderRadius: "25px", backgroundColor: "#f1f5f9", color: "#475569", cursor: "pointer", fontSize: "14px", fontWeight: "600" };
// const activePill = { ...pill, backgroundColor: "#3b82f6", color: "#fff" };

// const StatCard = ({ color, title, count, icon }) => (
//   <div style={{ backgroundColor: color, color: "#fff", padding: "25px", borderRadius: "15px", display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
//     <div><p style={{margin:0, opacity:0.9, fontSize:'14px'}}>{title}</p><h2 style={{margin:'5px 0 0', fontSize:'32px'}}>{count}</h2></div>
//     <div style={{backgroundColor:'rgba(255,255,255,0.2)', padding:'12px', borderRadius:'12px'}}>{icon}</div>
//   </div>
// );

// const actionCard = { flex: 1, backgroundColor: "#fff", padding: "20px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "15px", cursor: "pointer", border: "1px solid #e2e8f0" };
// const iconCircle = { backgroundColor: "#f1f5f9", padding: "10px", borderRadius: "50%" };
// const panelBox = { flex: 1, backgroundColor: "#fff", padding: "25px", borderRadius: "15px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e2e8f0" };
// const thStyle = { padding: "12px", color: "#64748b", fontSize: "12px" };
// const tdStyle = { padding: "14px 12px", color: "#334155", fontSize: "15px" };

// export default Dashboard;





//6
// import { useEffect, useState } from "react";
// import API from "../../api";
// import { useNavigate } from "react-router-dom";
// import { LayoutDashboard, Truck, CheckCircle, Clock, Users2, UserPlus, Package, ArrowLeft } from "lucide-react";
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

// const Dashboard = () => {
//   const [report, setReport] = useState({});
//   const navigate = useNavigate();

//   const loadReports = async () => {
//     try {
//       const res = await API.get("/admin/reports");
//       setReport(res.data);
//     } catch { console.error("Error loading reports"); }
//   };

//   useEffect(() => { loadReports(); }, []);

//   const graphData = [
//     { name: "Delivered", value: report.delivered || 0, color: "#10b981" },
//     { name: "Pending", value: report.pending || 0, color: "#f59e0b" },
//   ];

//   return (
//     <div style={{ backgroundColor: "#f3f4f6", minHeight: "100vh", fontFamily: "sans-serif" }}>
      
//       {/* --- TOP HEADER NAVIGATION --- */}
//       <div style={navStyle}>
//         <div style={{ fontWeight: "bold", fontSize: "20px", color: "#3b82f6" }}>COURIER ADMIN</div>
//         <div style={{ display: "flex", gap: "10px" }}>
//           <button style={activePill}>Dashboard</button>
//           <button style={pill} onClick={() => navigate("/admin/shipments")}>Shipments</button>
//           <button style={pill} onClick={() => navigate("/admin/staff")}>Staff</button>
//           <button style={pill} onClick={() => navigate("/admin/customers")}>Customers</button>
//         </div>
//       </div>

//       <div style={{ padding: "30px 50px" }}>
//         {/* STATS ROW */}
//         <div style={statsGrid}>
//           <StatCard color="#3b82f6" title="Total Shipments" count={report.total || 0} icon={<Package size={24}/>} />
//           <StatCard color="#10b981" title="Delivered" count={report.delivered || 0} icon={<CheckCircle size={24}/>} />
//           <StatCard color="#f59e0b" title="Pending" count={report.pending || 0} icon={<Clock size={24}/>} />
//         </div>

//         {/* QUICK ACCESS ACTIONS (Staff & Customers) */}
//         <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
//           <div style={actionCard} onClick={() => navigate("/admin/staff")}>
//              <div style={iconBox}><UserPlus color="#3b82f6"/></div>
//              <div><b>Manage Staff</b><br/><small>Add or remove team</small></div>
//           </div>
//           <div style={actionCard} onClick={() => navigate("/admin/customers")}>
//              <div style={iconBox}><Users2 color="#8b5cf6"/></div>
//              <div><b>Customer Database</b><br/><small>View all clients</small></div>
//           </div>
//         </div>

//         {/* DATA PANELS */}
//         <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "25px" }}>
//           <div style={panel}>
//             <h4 style={{marginTop:0}}>Status Summary</h4>
//             <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                <tr style={trStyle}><td>Total Orders</td><td><b>{report.total || 0}</b></td></tr>
//                <tr style={trStyle}><td style={{color:'green'}}>Delivered</td><td><b>{report.delivered || 0}</b></td></tr>
//                <tr style={trStyle}><td style={{color:'orange'}}>Pending</td><td><b>{report.pending || 0}</b></td></tr>
//             </table>
//           </div>
//           <div style={panel}>
//             <h4 style={{marginTop:0, textAlign:'center'}}>Shipment Graph</h4>
//             <div style={{ height: "250px" }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie data={graphData} dataKey="value" cx="50%" cy="50%" outerRadius={70} innerRadius={50}>
//                     {graphData.map((e, i) => <Cell key={i} fill={e.color} />)}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- SHARED STYLES ---
// const navStyle = { backgroundColor: "#fff", padding: "15px 50px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" };
// const pill = { padding: "8px 20px", borderRadius: "20px", border: "none", backgroundColor: "#f1f5f9", cursor: "pointer", fontWeight: "600", color: "#64748b" };
// const activePill = { ...pill, backgroundColor: "#3b82f6", color: "#fff" };
// const statsGrid = { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "25px", marginBottom: "30px" };
// const StatCard = ({ color, title, count, icon }) => (
//   <div style={{ backgroundColor: color, color: "#fff", padding: "25px", borderRadius: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//     <div><small>{title}</small><h2 style={{margin:0}}>{count}</h2></div>
//     {icon}
//   </div>
// );
// const actionCard = { flex: 1, backgroundColor: "#fff", padding: "20px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "15px", cursor: "pointer", border: "1px solid #e5e7eb" };
// const iconBox = { backgroundColor: "#f8fafc", padding: "10px", borderRadius: "10px" };
// const panel = { backgroundColor: "#fff", padding: "25px", borderRadius: "15px", border: "1px solid #e5e7eb" };
// const trStyle = { borderBottom: "1px solid #f3f4f6", height: "50px" };

// export default Dashboard;






//7
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Users, UserPlus, Package, Truck, LayoutDashboard, Users2, Clock, CheckCircle } from "lucide-react";

const Dashboard = () => {
  const [report, setReport] = useState({});
  const navigate = useNavigate();

  const loadReports = async () => {
    try {
      const res = await API.get("/admin/reports");
      setReport(res.data); 
    } catch {
      alert("Error loading reports");
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  // --- DONUT CHART DATA (Gap/Choodi Style) ---
  const statusData = [
    { name: "Delivered", value: report.delivered || 0, color: "#22c55e" },
    { name: "Pending", value: report.pending || 0, color: "#f59e0b" },
  ];

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "sans-serif" }}>
      
      {/* 1. HORIZONTAL NAV */}
      <div style={{ backgroundColor: "#fff", padding: "12px 30px", display: "flex", gap: "12px", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={activePill} onClick={() => navigate("/admin/dashboard")}>Dashboard</div>
        <div style={pill} onClick={() => navigate("/admin/shipments")}>Shipments</div>
        <div style={pill} onClick={() => navigate("/admin/staff")}>Staff</div>
        <div style={pill} onClick={() => navigate("/admin/customers")}>Customers</div>
      </div>

      <div style={{ padding: "30px" }}>
        
        {/* 2. TOP STATS (Now Clickable as per your real code) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "30px" }}>
          <div onClick={() => navigate("/admin/shipments")} style={{ cursor: "pointer" }}>
            <StatCard color="#f43f5e" title="Total Shipments" count={report.total || 0} icon={<Package size={28}/>} />
          </div>
          <div onClick={() => navigate("/admin/shipments")} style={{ cursor: "pointer" }}>
            <StatCard color="#22c55e" title="Delivered" count={report.delivered || 0} icon={<CheckCircle size={28}/>} />
          </div>
          <div onClick={() => navigate("/admin/shipments")} style={{ cursor: "pointer" }}>
            <StatCard color="#f59e0b" title="Pending" count={report.pending || 0} icon={<Clock size={28}/>} />
          </div>
        </div>

        {/* 3. MANAGE STAFF & CUSTOMERS */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
          <div style={actionCard} onClick={() => navigate("/admin/staff")}>
            <div style={iconCircle}><UserPlus color="#3b82f6" size={20} /></div>
            <div>
              <h4 style={{margin:0, fontSize: "15px"}}>Manage Staff</h4>
              <small style={{color:'#64748b'}}>Add or view staff members</small>
            </div>
          </div>
          <div style={actionCard} onClick={() => navigate("/admin/customers")}>
            <div style={iconCircle}><Users2 color="#8b5cf6" size={20} /></div>
            <div>
              <h4 style={{margin:0, fontSize: "15px"}}>Customers</h4>
              <small style={{color:'#64748b'}}>View customer database</small>
            </div>
          </div>
        </div>

        {/* 4. SUMMARY & DONUT GRAPH */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "25px" }}>
          
          <div style={panelBox}>
            <h3 style={{fontSize:'16px', marginBottom:'20px', color: "#1e293b"}}>Parcel Status Summary</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f1f5f9", textAlign: 'left' }}>
                  <th style={thStyle}>Status Type</th>
                  <th style={{...thStyle, textAlign: 'right'}}>Count</th>
                </tr>
              </thead>
              <tbody>
                <tr style={rowStyle}>
                  <td style={tdStyle}>Total Lifecycle Orders</td>
                  <td style={{...tdStyle, textAlign: 'right'}}><b>{report.total || 0}</b></td>
                </tr>
                <tr style={rowStyle}>
                  <td style={tdStyle}>Successfully Delivered</td>
                  <td style={{...tdStyle, color: '#16a34a', textAlign: 'right'}}><b>{report.delivered || 0}</b></td>
                </tr>
                <tr style={rowStyle}>
                  <td style={tdStyle}>Current Pending</td>
                  <td style={{...tdStyle, color: '#d97706', textAlign: 'right'}}><b>{report.pending || 0}</b></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ ...panelBox, textAlign: "center" }}>
            <h3 style={{fontSize:'16px', marginBottom:'10px', color: "#1e293b"}}>Delivery Performance</h3>
            <div style={{ height: "280px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={statusData} 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%" 
                    innerRadius={60} // Yeh gap/choodi banata hai
                    outerRadius={85} 
                    paddingAngle={8} // Slices ke beech mein gap
                    cornerRadius={6} // Edges round
                    stroke="none"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                  />
                  <Legend verticalAlign="bottom" iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- STYLING ---
const pill = { padding: "10px 22px", borderRadius: "25px", backgroundColor: "#f1f5f9", color: "#475569", cursor: "pointer", fontSize: "14px", fontWeight: "600", transition: "0.2s" };
const activePill = { ...pill, backgroundColor: "#3b82f6", color: "#fff" };

const StatCard = ({ color, title, count, icon }) => (
  <div style={{ backgroundColor: color, color: "#fff", padding: "25px", borderRadius: "15px", display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
    <div>
      <p style={{margin:0, opacity:0.9, fontSize:'13px', fontWeight: '500'}}>{title}</p>
      <h2 style={{margin:'5px 0 0', fontSize:'34px', fontWeight: '800'}}>{count}</h2>
    </div>
    <div style={{backgroundColor:'rgba(255,255,255,0.2)', padding:'12px', borderRadius:'12px'}}>{icon}</div>
  </div>
);

const actionCard = { flex: 1, backgroundColor: "#fff", padding: "18px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "15px", cursor: "pointer", border: "1px solid #e2e8f0", transition: "0.2s" };
const iconCircle = { backgroundColor: "#eff6ff", padding: "12px", borderRadius: "10px", display: "flex", alignItems: "center" };
const panelBox = { backgroundColor: "#fff", padding: "25px", borderRadius: "15px", border: "1px solid #e2e8f0" };
const thStyle = { padding: "12px 10px", color: "#94a3b8", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" };
const tdStyle = { padding: "16px 10px", color: "#334155", fontSize: "15px" };
const rowStyle = { borderBottom: "1px solid #f8fafc" };

export default Dashboard;