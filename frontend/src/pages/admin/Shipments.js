
// //1
// import { useEffect, useState } from "react";
// import API from "../../api";
// import AdminNavbar from "../../components/AdminNavbar";

// function Shipments() {
//   const [shipments, setShipments] = useState([]);
//   const [staff, setStaff] = useState([]);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [sortOrder, setSortOrder] = useState("Newest");
//   const [currentPage, setCurrentPage] = useState(1);
//   const shipmentsPerPage = 10;

//   // Load Shipments and Staff
//   const loadData = async () => {
//     try {
//       const s = await API.get("/admin/shipments");
//       const st = await API.get("/admin/staff");
//       setShipments(s.data);
//       setStaff(st.data);
//     } catch {
//       alert("Error loading shipments");
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   // Assign staff
//   const assignStaff = async (shipmentId, staffId) => {
//     if (!staffId) return;
//     await API.post("/admin/assign", { shipmentId, staffId });
//     loadData();
//   };

//   // Mark as delivered
//   const markDelivered = async (id) => {
//     await API.put(`/admin/shipment/${id}`, { status: "Delivered" });
//     loadData();
//   };

//   // Delete shipment
//   const deleteShipment = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this shipment?")) return;
//     await API.delete(`/admin/shipment/${id}`);
//     loadData();
//   };

//   // Filtered & Sorted Shipments
//   const filtered = shipments
//     .filter(s => s.trackingId.toLowerCase().includes(search.toLowerCase()))
//     .filter(s => statusFilter === "All" ? true : s.status === statusFilter)
//     .sort((a, b) => sortOrder === "Newest" 
//       ? new Date(b.createdAt) - new Date(a.createdAt)
//       : new Date(a.createdAt) - new Date(b.createdAt)
//     );

//   // Pagination
//   const indexOfLast = currentPage * shipmentsPerPage;
//   const indexOfFirst = indexOfLast - shipmentsPerPage;
//   const currentShipments = filtered.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filtered.length / shipmentsPerPage);

//   const badgeStyle = status => ({
//     padding: "5px 10px",
//     borderRadius: 5,
//     color: "white",
//     backgroundColor: status === "Delivered" ? "green" : status === "Picked" ? "#3b82f6" : "orange"
//   });

//   const tableStyle = { width: "100%", borderCollapse: "collapse", marginTop: 20 };
//   const thtdStyle = { border: "1px solid #ddd", padding: 10, textAlign: "left" };

//   return (
//     <div>
//       <AdminNavbar />
//       <div style={{ padding: 20 }}>
//         <h2>Shipments</h2>

//         {/* Controls */}
//         <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 10 }}>
//           <input
//             placeholder="Search by Tracking ID..."
//             value={search}
//             onChange={e => setSearch(e.target.value)}
//             style={{ padding: 8, width: "250px" }}
//           />
//           <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: 8 }}>
//             <option value="All">All Status</option>
//             <option value="Pending">Pending</option>
//             <option value="Picked">Picked</option>
//             <option value="Delivered">Delivered</option>
//           </select>
//           <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} style={{ padding: 8 }}>
//             <option value="Newest">Newest First</option>
//             <option value="Oldest">Oldest First</option>
//           </select>
//         </div>

//         {/* Shipments Table */}
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thtdStyle}>Tracking ID</th>
//               <th style={thtdStyle}>Customer</th>
//               <th style={thtdStyle}>Status</th>
//               <th style={thtdStyle}>Assigned Staff</th>
//               <th style={thtdStyle}>Date</th>
//               <th style={thtdStyle}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentShipments.map(s => (
//               <tr key={s._id}>
//                 <td style={thtdStyle}>{s.trackingId}</td>
//                 <td style={thtdStyle}>{s.customerId?.name || "-"} ({s.customerId?.email || "-"})</td>
//                 <td style={thtdStyle}><span style={badgeStyle(s.status)}>{s.status}</span></td>
//                 <td style={thtdStyle}>{s.assignedStaff?.name || "❌ Not Assigned"}</td>
//                 <td style={thtdStyle}>{new Date(s.createdAt).toLocaleDateString()}</td>
//                 <td style={thtdStyle}>
//                   <select
//                     disabled={s.assignedStaff}
//                     onChange={e => assignStaff(s._id, e.target.value)}
//                   >
//                     <option value="">Assign Staff</option>
//                     {staff.map(st => <option key={st._id} value={st._id}>{st.name}</option>)}
//                   </select>
//                   <button
//                     style={{ marginLeft: 5, backgroundColor: "green", color: "white", padding: "5px 10px" }}
//                     onClick={() => markDelivered(s._id)}
//                   >
//                     Delivered
//                   </button>
//                   <button
//                     style={{ marginLeft: 5, backgroundColor: "red", color: "white", padding: "5px 10px" }}
//                     onClick={() => deleteShipment(s._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//             <button
//               key={page}
//               onClick={() => setCurrentPage(page)}
//               style={{
//                 padding: "5px 10px",
//                 backgroundColor: currentPage === page ? "#3b82f6" : "#f3f4f6",
//                 color: currentPage === page ? "white" : "black",
//                 border: "none",
//                 borderRadius: 5,
//                 cursor: "pointer"
//               }}
//             >
//               {page}
//             </button>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Shipments;











// //2
// import { useEffect, useState } from "react";
// import API from "../../api";
// import { useNavigate } from "react-router-dom";
// import { 
//   ArrowLeft, Search, Filter, Trash2, 
//   CheckCircle, UserPlus, Package, Calendar, 
//   User, ChevronLeft, ChevronRight 
// } from "lucide-react";

// function Shipments() {
//   const [shipments, setShipments] = useState([]);
//   const [staff, setStaff] = useState([]);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [sortOrder, setSortOrder] = useState("Newest");
//   const [currentPage, setCurrentPage] = useState(1);
//   const shipmentsPerPage = 10;
//   const navigate = useNavigate();

//   const loadData = async () => {
//     try {
//       const s = await API.get("/admin/shipments");
//       const st = await API.get("/admin/staff");
//       setShipments(s.data);
//       setStaff(st.data);
//     } catch {
//       alert("Error loading shipments");
//     }
//   };

//   useEffect(() => { loadData(); }, []);

//   const assignStaff = async (shipmentId, staffId) => {
//     if (!staffId) return;
//     await API.post("/admin/assign", { shipmentId, staffId });
//     loadData();
//   };

//   const markDelivered = async (id) => {
//     await API.put(`/admin/shipment/${id}`, { status: "Delivered" });
//     loadData();
//   };

//   const deleteShipment = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     await API.delete(`/admin/shipment/${id}`);
//     loadData();
//   };

//   const filtered = shipments
//     .filter(s => s.trackingId.toLowerCase().includes(search.toLowerCase()))
//     .filter(s => statusFilter === "All" ? true : s.status === statusFilter)
//     .sort((a, b) => sortOrder === "Newest" 
//       ? new Date(b.createdAt) - new Date(a.createdAt)
//       : new Date(a.createdAt) - new Date(b.createdAt)
//     );

//   const indexOfLast = currentPage * shipmentsPerPage;
//   const indexOfFirst = indexOfLast - shipmentsPerPage;
//   const currentShipments = filtered.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filtered.length / shipmentsPerPage);

//   return (
//     <div style={containerStyle}>
//       <div style={contentWrapper}>
        
//         {/* --- HEADER SECTION --- */}
//         <div style={headerSection}>
//           <button onClick={() => navigate("/admin/dashboard")} style={backBtn}>
//             <ArrowLeft size={18} /> Back to Dashboard
//           </button>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "15px" }}>
//             <div>
//               <h1 style={titleStyle}>Shipment Management</h1>
//               <p style={subTitleStyle}>Track, assign, and manage all active parcels.</p>
//             </div>
//             <div style={countBadge}>{filtered.length} Total Parcels</div>
//           </div>
//         </div>

//         {/* --- CONTROLS BOX --- */}
//         <div style={filterCard}>
//           <div style={searchWrapper}>
//             <Search size={18} color="#94a3b8" />
//             <input
//               placeholder="Search by Tracking ID..."
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//               style={searchInput}
//             />
//           </div>
//           <div style={dropdownGroup}>
//             <div style={selectContainer}>
//               <Filter size={14} color="#64748b" />
//               <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={selectStyle}>
//                 <option value="All">All Status</option>
//                 <option value="Pending">Pending</option>
//                 <option value="Picked">Picked</option>
//                 <option value="Delivered">Delivered</option>
//               </select>
//             </div>
//             <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} style={selectStyle}>
//               <option value="Newest">Newest First</option>
//               <option value="Oldest">Oldest First</option>
//             </select>
//           </div>
//         </div>

//         {/* --- TABLE SECTION --- */}
//         <div style={tableWrapper}>
//           <table style={{ width: "100%", borderCollapse: "collapse" }}>
//             <thead>
//               <tr style={theadStyle}>
//                 <th style={thStyle}>Tracking ID</th>
//                 <th style={thStyle}>Customer Details</th>
//                 <th style={thStyle}>Current Status</th>
//                 <th style={thStyle}>Assigned Agent</th>
//                 <th style={thStyle}>Created On</th>
//                 <th style={{ ...thStyle, textAlign: "right" }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentShipments.map(s => (
//                 <tr key={s._id} style={trStyle}>
//                   <td style={tdStyle}>
//                     <div style={trackingIdBox}>#{s.trackingId}</div>
//                   </td>
//                   <td style={tdStyle}>
//                     <div style={{ fontWeight: "600", color: "#1e293b" }}>{s.customerId?.name || "Guest"}</div>
//                     <div style={{ fontSize: "12px", color: "#64748b" }}>{s.customerId?.email}</div>
//                   </td>
//                   <td style={tdStyle}>
//                     <StatusBadge status={s.status} />
//                   </td>
//                   <td style={tdStyle}>
//                     {s.assignedStaff ? (
//                       <div style={staffBadge}>
//                         <User size={12} /> {s.assignedStaff.name}
//                       </div>
//                     ) : (
//                       <div style={unassignedBadge}>Not Assigned</div>
//                     )}
//                   </td>
//                   <td style={tdStyle}>
//                     <div style={dateBox}><Calendar size={14} /> {new Date(s.createdAt).toLocaleDateString()}</div>
//                   </td>
//                   <td style={{ ...tdStyle, textAlign: "right" }}>
//                     <div style={actionGroup}>
//                       {!s.assignedStaff && (
//                         <select
//                           onChange={e => assignStaff(s._id, e.target.value)}
//                           style={inlineSelect}
//                         >
//                           <option value="">Assign Staff</option>
//                           {staff.map(st => <option key={st._id} value={st._id}>{st.name}</option>)}
//                         </select>
//                       )}
//                       <button onClick={() => markDelivered(s._id)} style={btnDelivered} title="Mark Delivered">
//                         <CheckCircle size={18} />
//                       </button>
//                       <button onClick={() => deleteShipment(s._id)} style={btnDelete} title="Delete">
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* --- PAGINATION --- */}
//         {totalPages > 1 && (
//           <div style={paginationWrapper}>
//             <button 
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage(prev => prev - 1)}
//               style={pageArrowBtn}
//             ><ChevronLeft size={18}/></button>
            
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//               <button
//                 key={page}
//                 onClick={() => setCurrentPage(page)}
//                 style={page === currentPage ? activePageBtn : pageBtn}
//               >
//                 {page}
//               </button>
//             ))}

//             <button 
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage(prev => prev + 1)}
//               style={pageArrowBtn}
//             ><ChevronRight size={18}/></button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // --- MODERN STATUS BADGE COMPONENT ---
// const StatusBadge = ({ status }) => {
//   const colors = {
//     Delivered: { bg: "#dcfce7", text: "#166534" },
//     Picked: { bg: "#dbeafe", text: "#1e40af" },
//     Pending: { bg: "#fef3c7", text: "#92400e" }
//   };
//   const current = colors[status] || colors.Pending;
//   return (
//     <span style={{ 
//       backgroundColor: current.bg, color: current.text, 
//       padding: "6px 14px", borderRadius: "20px", fontSize: "12px", 
//       fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px"
//     }}>
//       {status}
//     </span>
//   );
// };

// // --- STYLES OBJECTS ---
// const containerStyle = { backgroundColor: "#f1f5f9", minHeight: "100vh", fontFamily: "'Inter', sans-serif" };
// const contentWrapper = { maxWidth: "1300px", margin: "0 auto", padding: "40px 20px" };
// const headerSection = { marginBottom: "30px" };
// const backBtn = { border: "none", background: "none", color: "#3b82f6", cursor: "pointer", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px", padding: 0 };
// const titleStyle = { margin: 0, fontSize: "28px", fontWeight: "800", color: "#0f172a" };
// const subTitleStyle = { margin: "5px 0 0", color: "#64748b", fontSize: "14px" };
// const countBadge = { backgroundColor: "#fff", padding: "8px 16px", borderRadius: "10px", fontWeight: "700", color: "#3b82f6", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" };

// const filterCard = { backgroundColor: "#fff", padding: "15px 25px", borderRadius: "16px", display: "flex", justifyContent: "space-between", marginBottom: "25px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" };
// const searchWrapper = { display: "flex", alignItems: "center", gap: "12px", backgroundColor: "#f8fafc", padding: "8px 16px", borderRadius: "10px", flex: 0.6 };
// const searchInput = { border: "none", background: "none", outline: "none", width: "100%", fontSize: "14px", fontWeight: "500" };
// const dropdownGroup = { display: "flex", gap: "12px" };
// const selectContainer = { display: "flex", alignItems: "center", gap: "8px", border: "1px solid #e2e8f0", padding: "0 12px", borderRadius: "10px" };
// const selectStyle = { border: "none", outline: "none", padding: "10px 0", fontSize: "14px", fontWeight: "600", color: "#1e293b", cursor: "pointer", backgroundColor: "transparent" };

// const tableWrapper = { backgroundColor: "#fff", borderRadius: "18px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.04)" };
// const theadStyle = { backgroundColor: "#f8fafc", borderBottom: "2px solid #f1f5f9" };
// const thStyle = { padding: "18px 20px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px" };
// const tdStyle = { padding: "20px", fontSize: "14px", color: "#334155" };
// const trStyle = { borderBottom: "1px solid #f1f5f9", transition: "0.2s" };

// const trackingIdBox = { backgroundColor: "#f1f5f9", padding: "5px 10px", borderRadius: "6px", fontWeight: "700", color: "#475569", display: "inline-block", fontSize: "13px" };
// const staffBadge = { display: "flex", alignItems: "center", gap: "6px", color: "#334155", fontWeight: "600" };
// const unassignedBadge = { color: "#ef4444", fontSize: "12px", fontWeight: "700" };
// const dateBox = { display: "flex", alignItems: "center", gap: "6px", color: "#94a3b8", fontSize: "13px" };

// const actionGroup = { display: "flex", justifyContent: "flex-end", gap: "10px", alignItems: "center" };
// const inlineSelect = { padding: "6px 10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "12px", fontWeight: "600" };
// const btnDelivered = { background: "#dcfce7", color: "#16a34a", border: "none", padding: "8px", borderRadius: "10px", cursor: "pointer", display: "flex" };
// const btnDelete = { background: "#fee2e2", color: "#dc2626", border: "none", padding: "8px", borderRadius: "10px", cursor: "pointer", display: "flex" };

// const paginationWrapper = { marginTop: "30px", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" };
// const pageBtn = { width: "38px", height: "38px", border: "1px solid #e2e8f0", backgroundColor: "#fff", cursor: "pointer", borderRadius: "10px", fontWeight: "600", color: "#64748b" };
// const activePageBtn = { ...pageBtn, backgroundColor: "#3b82f6", color: "#fff", borderColor: "#3b82f6" };
// const pageArrowBtn = { ...pageBtn, display: "flex", alignItems: "center", justifyContent: "center" };

// export default Shipments;






//3
// import { useEffect, useState } from "react";
// import API from "../../api";
// import { useNavigate } from "react-router-dom";
// import { 
//   ArrowLeft, Search, Filter, Trash2, 
//   CheckCircle, User, Calendar, ChevronLeft, ChevronRight 
// } from "lucide-react";

// function Shipments() {
//   const [shipments, setShipments] = useState([]);
//   const [staff, setStaff] = useState([]);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [sortOrder, setSortOrder] = useState("Newest");
//   const [currentPage, setCurrentPage] = useState(1);
//   const shipmentsPerPage = 10;
//   const navigate = useNavigate();

//   // Load Shipments and Staff
//   const loadData = async () => {
//     try {
//       const s = await API.get("/admin/shipments");
//       const st = await API.get("/admin/staff");
//       setShipments(s.data);
//       setStaff(st.data);
//     } catch {
//       alert("Error loading shipments");
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   // Assign staff logic
//   const assignStaff = async (shipmentId, staffId) => {
//     if (!staffId) return;
//     try {
//       await API.post("/admin/assign", { shipmentId, staffId });
//       loadData();
//     } catch (err) {
//       alert("Assignment failed");
//     }
//   };

//   // Mark as delivered logic
//   const markDelivered = async (id) => {
//     try {
//       await API.put(`/admin/shipment/${id}`, { status: "Delivered" });
//       loadData();
//     } catch (err) {
//       alert("Status update failed");
//     }
//   };

//   // Delete shipment logic
//   const deleteShipment = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this shipment?")) return;
//     try {
//       await API.delete(`/admin/shipment/${id}`);
//       loadData();
//     } catch (err) {
//       alert("Delete failed");
//     }
//   };

//   // --- FILTER & SORT LOGIC (Fixed for Case-Sensitivity) ---
//   const filtered = shipments
//     .filter(s => s.trackingId.toLowerCase().includes(search.toLowerCase()))
//     .filter(s => {
//       if (statusFilter === "All") return true;
//       // Case-insensitive matching for status
//       return s.status.toLowerCase() === statusFilter.toLowerCase();
//     })
//     .sort((a, b) => sortOrder === "Newest" 
//       ? new Date(b.createdAt) - new Date(a.createdAt)
//       : new Date(a.createdAt) - new Date(b.createdAt)
//     );

//   // Pagination Logic
//   const indexOfLast = currentPage * shipmentsPerPage;
//   const indexOfFirst = indexOfLast - shipmentsPerPage;
//   const currentShipments = filtered.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filtered.length / shipmentsPerPage);

//   return (
//     <div style={containerStyle}>
//       <div style={contentWrapper}>
        
//         {/* --- HEADER --- */}
//         <div style={headerSection}>
//           <button onClick={() => navigate("/admin/dashboard")} style={backBtn}>
//             <ArrowLeft size={18} /> Back to Dashboard
//           </button>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "15px" }}>
//             <div>
//               <h1 style={titleStyle}>Shipments Portal</h1>
//               <p style={subTitleStyle}>Manage and monitor all parcel movements.</p>
//             </div>
//             <div style={countBadge}>{filtered.length} Shipments found</div>
//           </div>
//         </div>

//         {/* --- CONTROLS / FILTERS --- */}
//         <div style={filterCard}>
//           <div style={searchWrapper}>
//             <Search size={18} color="#94a3b8" />
//             <input
//               placeholder="Search Tracking ID..."
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//               style={searchInput}
//             />
//           </div>
//           <div style={dropdownGroup}>
//             <div style={selectContainer}>
//               <Filter size={14} color="#64748b" />
//               <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={selectStyle}>
//                 <option value="All">All Status</option>
//                 <option value="Pending">Pending</option>
//                 <option value="Picked">Picked</option>
//                 <option value="Delivered">Delivered</option>
//               </select>
//             </div>
//             <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} style={selectStyle}>
//               <option value="Newest">Newest First</option>
//               <option value="Oldest">Oldest First</option>
//             </select>
//           </div>
//         </div>

//         {/* --- SHIPMENTS TABLE --- */}
//         <div style={tableWrapper}>
//           <table style={{ width: "100%", borderCollapse: "collapse" }}>
//             <thead>
//               <tr style={theadStyle}>
//                 <th style={thStyle}>Tracking ID</th>
//                 <th style={thStyle}>Customer</th>
//                 <th style={thStyle}>Status</th>
//                 <th style={thStyle}>Assigned Staff</th>
//                 <th style={thStyle}>Date</th>
//                 <th style={{ ...thStyle, textAlign: "right" }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentShipments.length > 0 ? currentShipments.map(s => (
//                 <tr key={s._id} style={trStyle}>
//                   <td style={tdStyle}>
//                     <div style={trackingIdBox}>{s.trackingId}</div>
//                   </td>
//                   <td style={tdStyle}>
//                     <div style={{ fontWeight: "600", color: "#1e293b" }}>{s.customerId?.name || "Guest"}</div>
//                     <div style={{ fontSize: "12px", color: "#64748b" }}>{s.customerId?.email || "N/A"}</div>
//                   </td>
//                   <td style={tdStyle}>
//                     <StatusBadge status={s.status} />
//                   </td>
//                   <td style={tdStyle}>
//                     {s.assignedStaff ? (
//                       <div style={staffBadge}>
//                         <User size={12} /> {s.assignedStaff.name}
//                       </div>
//                     ) : (
//                       <div style={unassignedBadge}>❌ Not Assigned</div>
//                     )}
//                   </td>
//                   <td style={tdStyle}>
//                     <div style={dateBox}><Calendar size={14} /> {new Date(s.createdAt).toLocaleDateString()}</div>
//                   </td>
//                   <td style={{ ...tdStyle, textAlign: "right" }}>
//                     <div style={actionGroup}>
//                       {!s.assignedStaff && (
//                         <select
//                           onChange={e => assignStaff(s._id, e.target.value)}
//                           style={inlineSelect}
//                         >
//                           <option value="">Assign</option>
//                           {staff.map(st => <option key={st._id} value={st._id}>{st.name}</option>)}
//                         </select>
//                       )}
//                       <button onClick={() => markDelivered(s._id)} style={btnDelivered} title="Mark Delivered">
//                         <CheckCircle size={18} />
//                       </button>
//                       <button onClick={() => deleteShipment(s._id)} style={btnDelete} title="Delete">
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               )) : (
//                 <tr><td colSpan="6" style={{padding: '40px', textAlign: 'center', color: '#94a3b8'}}>No shipments found matching your search.</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* --- PAGINATION --- */}
//         {totalPages > 1 && (
//           <div style={paginationWrapper}>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//               <button
//                 key={page}
//                 onClick={() => setCurrentPage(page)}
//                 style={page === currentPage ? activePageBtn : pageBtn}
//               >
//                 {page}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // --- SUB-COMPONENT: STATUS BADGE ---
// const StatusBadge = ({ status }) => {
//   const colors = {
//     delivered: { bg: "#dcfce7", text: "#166534" },
//     picked: { bg: "#dbeafe", text: "#1e40af" },
//     pending: { bg: "#fef3c7", text: "#92400e" }
//   };
//   const current = colors[status.toLowerCase()] || colors.pending;
//   return (
//     <span style={{ 
//       backgroundColor: current.bg, color: current.text, 
//       padding: "6px 14px", borderRadius: "20px", fontSize: "12px", 
//       fontWeight: "700", textTransform: "uppercase"
//     }}>
//       {status}
//     </span>
//   );
// };

// // --- STYLING OBJECTS ---
// const containerStyle = { backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "inherit" };
// const contentWrapper = { maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" };
// const headerSection = { marginBottom: "30px" };
// const backBtn = { border: "none", background: "none", color: "#3b82f6", cursor: "pointer", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px", padding: 0 };
// const titleStyle = { margin: 0, fontSize: "28px", fontWeight: "800", color: "#1e293b" };
// const subTitleStyle = { margin: "5px 0 0", color: "#64748b", fontSize: "14px" };
// const countBadge = { backgroundColor: "#fff", padding: "8px 16px", borderRadius: "10px", fontWeight: "700", color: "#3b82f6", border: "1px solid #e2e8f0" };

// const filterCard = { backgroundColor: "#fff", padding: "15px 20px", borderRadius: "12px", display: "flex", justifyContent: "space-between", marginBottom: "20px", border: "1px solid #e2e8f0" };
// const searchWrapper = { display: "flex", alignItems: "center", gap: "12px", backgroundColor: "#f1f5f9", padding: "8px 16px", borderRadius: "8px", flex: 0.5 };
// const searchInput = { border: "none", background: "none", outline: "none", width: "100%", fontSize: "14px" };
// const dropdownGroup = { display: "flex", gap: "10px" };
// const selectContainer = { display: "flex", alignItems: "center", gap: "8px", border: "1px solid #e2e8f0", padding: "0 12px", borderRadius: "8px" };
// const selectStyle = { border: "none", outline: "none", padding: "10px 0", fontSize: "14px", fontWeight: "600", cursor: "pointer", backgroundColor: "transparent" };

// const tableWrapper = { backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" };
// const theadStyle = { backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" };
// const thStyle = { padding: "15px 20px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" };
// const tdStyle = { padding: "18px 20px", fontSize: "14px", color: "#334155" };
// const trStyle = { borderBottom: "1px solid #f1f5f9" };

// const trackingIdBox = { backgroundColor: "#eff6ff", padding: "4px 10px", borderRadius: "6px", fontWeight: "700", color: "#1e40af", display: "inline-block", fontSize: "13px" };
// const staffBadge = { display: "flex", alignItems: "center", gap: "6px", color: "#334155", fontWeight: "600" };
// const unassignedBadge = { color: "#ef4444", fontSize: "12px", fontWeight: "600" };
// const dateBox = { display: "flex", alignItems: "center", gap: "6px", color: "#94a3b8", fontSize: "13px" };

// const actionGroup = { display: "flex", justifyContent: "flex-end", gap: "8px" };
// const inlineSelect = { padding: "5px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px" };
// const btnDelivered = { background: "#dcfce7", color: "#16a34a", border: "none", padding: "8px", borderRadius: "8px", cursor: "pointer" };
// const btnDelete = { background: "#fee2e2", color: "#dc2626", border: "none", padding: "8px", borderRadius: "8px", cursor: "pointer" };

// const paginationWrapper = { marginTop: "25px", display: "flex", justifyContent: "center", gap: "8px" };
// const pageBtn = { padding: "8px 16px", border: "1px solid #e2e8f0", backgroundColor: "#fff", cursor: "pointer", borderRadius: "8px", fontWeight: "600" };
// const activePageBtn = { ...pageBtn, backgroundColor: "#3b82f6", color: "#fff", borderColor: "#3b82f6" };

// export default Shipments;








//4
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../../api";
// import { ArrowLeft, Search, Filter, Trash2, CheckCircle, User, Calendar } from "lucide-react";
// import "./Shipments.css";

// export default function Shipments() {
//   const [shipments, setShipments] = useState([]);
//   const [staff, setStaff] = useState([]);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [sortOrder, setSortOrder] = useState("Newest");
//   const [currentPage, setCurrentPage] = useState(1);
//   const shipmentsPerPage = 10;
//   const navigate = useNavigate();

//   useEffect(() => { loadData(); }, []);

//   const loadData = async () => {
//     try {
//       const s = await API.get("/admin/shipments");
//       const st = await API.get("/admin/staff");
//       setShipments(s.data);
//       setStaff(st.data);
//     } catch {
//       alert("Error loading data");
//     }
//   };

//   const assignStaff = async (shipmentId, staffId) => {
//     if (!staffId) return;
//     try { await API.post("/admin/assign", { shipmentId, staffId }); loadData(); }
//     catch { alert("Assignment failed"); }
//   };

//   const markDelivered = async (id) => {
//     try { await API.put(`/admin/shipment/${id}`, { status: "Delivered" }); loadData(); }
//     catch { alert("Status update failed"); }
//   };

//   const deleteShipment = async (id) => {
//     if (!window.confirm("Delete this shipment?")) return;
//     try { await API.delete(`/admin/shipment/${id}`); loadData(); }
//     catch { alert("Delete failed"); }
//   };

//   // --- FILTER + SORT
//   const filtered = shipments
//     .filter(s => s.trackingId.toLowerCase().includes(search.toLowerCase()))
//     .filter(s => statusFilter === "All" || s.status.toLowerCase() === statusFilter.toLowerCase())
//     .sort((a,b) => sortOrder==="Newest" ? new Date(b.createdAt)-new Date(a.createdAt) : new Date(a.createdAt)-new Date(b.createdAt));

//   const indexOfLast = currentPage * shipmentsPerPage;
//   const indexOfFirst = indexOfLast - shipmentsPerPage;
//   const currentShipments = filtered.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filtered.length / shipmentsPerPage);

//   return (
//     <div className="shipments-container">
//       {/* HEADER */}
//       <div className="shipments-header">
//         <button className="back-btn" onClick={()=>navigate("/admin/dashboard")}>
//           <ArrowLeft size={18}/> Dashboard
//         </button>
//         <h1>Shipments Portal <span className="count-badge">{filtered.length}</span></h1>
//         <p>Manage and monitor all parcel movements.</p>
//       </div>

//       {/* FILTERS */}
//       <div className="filters">
//         <div className="search-box">
//           <Search size={18} color="#94a3b8"/>
//           <input placeholder="Search Tracking ID..." value={search} onChange={e=>setSearch(e.target.value)}/>
//         </div>
//         <div className="filter-dropdowns">
//           <div className="select-container">
//             <Filter size={14} color="#64748b"/>
//             <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
//               <option>All</option>
//               <option>Pending</option>
//               <option>Picked</option>
//               <option>Delivered</option>
//             </select>
//           </div>
//           <select value={sortOrder} onChange={e=>setSortOrder(e.target.value)}>
//             <option>Newest</option>
//             <option>Oldest</option>
//           </select>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="table-wrapper">
//         <table>
//           <thead>
//             <tr>
//               <th>Tracking ID</th>
//               <th>Customer</th>
//               <th>Status</th>
//               <th>Assigned Staff</th>
//               <th>Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentShipments.length>0 ? currentShipments.map(s=>(
//               <tr key={s._id}>
//                 <td><span className="tracking">{s.trackingId}</span></td>
//                 <td>
//                   <div className="customer-info">
//                     <strong>{s.customerId?.name||"Guest"}</strong>
//                     <div>{s.customerId?.email||"N/A"}</div>
//                   </div>
//                 </td>
//                 <td><StatusBadge status={s.status}/></td>
//                 <td>{s.assignedStaff ? <div className="staff-badge"><User size={12}/> {s.assignedStaff.name}</div> : <div className="unassigned">❌ Not Assigned</div>}</td>
//                 <td><div className="date"><Calendar size={14}/> {new Date(s.createdAt).toLocaleDateString()}</div></td>
//                 <td className="actions">
//                   {!s.assignedStaff && <select onChange={e=>assignStaff(s._id,e.target.value)}>
//                     <option value="">Assign</option>
//                     {staff.map(st=><option key={st._id} value={st._id}>{st.name}</option>)}
//                   </select>}
//                   <button className="btn-delivered" onClick={()=>markDelivered(s._id)}><CheckCircle size={18}/></button>
//                   <button className="btn-delete" onClick={()=>deleteShipment(s._id)}><Trash2 size={18}/></button>
//                 </td>
//               </tr>
//             )) : <tr><td colSpan="6" className="no-data">No shipments found.</td></tr>}
//           </tbody>
//         </table>
//       </div>

//       {/* PAGINATION */}
//       {totalPages>1 && (
//         <div className="pagination">
//           {Array.from({length:totalPages},(_,i)=>i+1).map(page=>(
//             <button key={page} className={page===currentPage?"active":""} onClick={()=>setCurrentPage(page)}>{page}</button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // STATUS BADGE
// const StatusBadge = ({status}) => {
//   const colors = {delivered:{bg:"#dcfce7",text:"#166534"},picked:{bg:"#dbeafe",text:"#1e40af"},pending:{bg:"#fef3c7",text:"#92400e"}};
//   const current = colors[status.toLowerCase()]||colors.pending;
//   return <span className="status-badge" style={{backgroundColor:current.bg,color:current.text}}>{status}</span>;
// };










//5
import { useEffect, useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Filter, Trash2, CheckCircle, User, Calendar } from "lucide-react";
import "./Shipments.css";

export default function Shipments() {
  const [shipments, setShipments] = useState([]);
  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const shipmentsPerPage = 8;
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const s = await API.get("/admin/shipments");
      const st = await API.get("/admin/staff");
      setShipments(s.data);
      setStaff(st.data);
    } catch {
      alert("Error loading shipments");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const assignStaff = async (shipmentId, staffId) => {
    if (!staffId) return;
    try {
      await API.post("/admin/assign", { shipmentId, staffId });
      loadData();
    } catch {
      alert("Assignment failed");
    }
  };

  // const markDelivered = async (id) => {
  //   try {
  //     await API.put(`/admin/shipment/${id}`, { status: "Delivered" });
  //     loadData();
  //   } catch {
  //     alert("Status update failed");
  //   }
  // };

  const markDelivered = async (id) => {
  try {
    // पहले In Transit करो
    await API.put(`/shipment/${id}`, { status: "In Transit" });

    // फिर Delivered करो
    await API.put(`/shipment/${id}`, { status: "Delivered" });

    loadData();
  } catch {
    alert("Status update failed");
  }
};
  const deleteShipment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this shipment?")) return;
    try {
      await API.delete(`/admin/shipment/${id}`);
      loadData();
    } catch {
      alert("Delete failed");
    }
  };

  const filtered = shipments
    .filter(s => s.trackingId.toLowerCase().includes(search.toLowerCase()))
    .filter(s => statusFilter === "All" || s.status.toLowerCase() === statusFilter.toLowerCase())
    .sort((a, b) => sortOrder === "Newest" ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt));

  const indexOfLast = currentPage * shipmentsPerPage;
  const indexOfFirst = indexOfLast - shipmentsPerPage;
  const currentShipments = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / shipmentsPerPage);

  return (
    <div className="shipments-container">
      <div className="shipments-header">
        <button className="back-btn" onClick={() => navigate("/admin/dashboard")}>
          <ArrowLeft size={18} /> Back
        </button>
        <h1>Shipments Portal</h1>
        <p>Total Shipments: <span className="badge">{filtered.length}</span></p>
      </div>

      {/* FILTERS */}
      <div className="filters">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search Tracking ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="dropdowns">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Picked">Picked</option>
            <option value="Delivered">Delivered</option>
          </select>
          <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Staff</th>
              <th>Date</th>
              <th className="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentShipments.length > 0 ? currentShipments.map(s => (
              <tr key={s._id}>
                <td><span className="tracking">{s.trackingId}</span></td>
                <td>
                  <div className="cust-name">{s.customerId?.name || "Guest"}</div>
                  <div className="cust-email">{s.customerId?.email || "N/A"}</div>
                </td>
                <td><StatusBadge status={s.status} /></td>
                <td>{s.assignedStaff ? <span className="staff"><User size={12} /> {s.assignedStaff.name}</span> : <span className="unassigned">❌ Not Assigned</span>}</td>
                <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                <td className="actions">
                  {!s.assignedStaff &&
                    <select onChange={e => assignStaff(s._id, e.target.value)}>
                      <option value="">Assign</option>
                      {staff.map(st => <option key={st._id} value={st._id}>{st.name}</option>)}
                    </select>
                  }
                  <button className="delivered-btn" onClick={() => markDelivered(s._id)}><CheckCircle size={18} /></button>
                  <button className="delete-btn" onClick={() => deleteShipment(s._id)}><Trash2 size={18} /></button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="6" className="no-data">No shipments found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 &&
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={page === currentPage ? "active" : ""}
            >{page}</button>
          ))}
        </div>
      }
    </div>
  );
}

const StatusBadge = ({ status }) => {
  const colors = {
    delivered: { bg: "#dcfce7", text: "#166534" },
    picked: { bg: "#dbeafe", text: "#1e40af" },
    pending: { bg: "#fef3c7", text: "#92400e" }
  };
  const current = colors[status.toLowerCase()] || colors.pending;
  return <span className="status-badge" style={{ backgroundColor: current.bg, color: current.text }}>{status}</span>;
};