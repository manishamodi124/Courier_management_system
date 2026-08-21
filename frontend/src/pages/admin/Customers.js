
// //1
// import { useEffect, useState } from "react";
// import API from "../../api";
// import AdminNavbar from "../../components/AdminNavbar";

// function Customers() {
//   const [customers, setCustomers] = useState([]);

//   const loadCustomers = async () => {
//     try {
//       const res = await API.get("/admin/customers");
//       setCustomers(res.data);
//     } catch { alert("Error loading customers"); }
//   };

//   useEffect(() => { loadCustomers(); }, []);

//   const deleteCustomer = async id => {
//     if (!window.confirm("Delete this customer?")) return;
//     await API.delete(`/admin/customer/${id}`);
//     loadCustomers();
//   };

//   const tableStyle = { width: "100%", borderCollapse: "collapse", marginTop: 20 };
//   const thtdStyle = { border: "1px solid #ddd", padding: 10, textAlign: "left" };

//   return (
//     <div>
//       <AdminNavbar />
//       <div style={{ padding: 20 }}>
//         <h2>Customer Management</h2>
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thtdStyle}>Name</th>
//               <th style={thtdStyle}>Email</th>
//               <th style={thtdStyle}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {customers.map(c => (
//               <tr key={c._id}>
//                 <td style={thtdStyle}>{c.name}</td>
//                 <td style={thtdStyle}>{c.email}</td>
//                 <td style={thtdStyle}>
//                   <button style={{ backgroundColor: "red", color: "white", padding: "5px 10px" }} onClick={() => deleteCustomer(c._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Customers;







//2

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../../api";
// import { 
//   ArrowLeft, Search, Trash2, User, Mail, 
//   Users, ChevronLeft, ChevronRight 
// } from "lucide-react";

// function Customers() {
//   const [customers, setCustomers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const customersPerPage = 8; // Ek page par 8 customers
//   const navigate = useNavigate();

//   const loadCustomers = async () => {
//     try {
//       const res = await API.get("/admin/customers");
//       setCustomers(res.data);
//     } catch { 
//       alert("Error loading customers"); 
//     }
//   };

//   useEffect(() => { loadCustomers(); }, []);

//   const deleteCustomer = async id => {
//     if (!window.confirm("Are you sure you want to DELETE this customer?")) return;
//     try {
//       await API.delete(`/admin/customer/${id}`);
//       loadCustomers();
//     } catch {
//       alert("Failed to delete customer");
//     }
//   };

//   // --- SEARCH & PAGINATION LOGIC ---
//   const filtered = customers.filter(c => 
//     c.name.toLowerCase().includes(search.toLowerCase()) || 
//     c.email.toLowerCase().includes(search.toLowerCase())
//   );

//   const indexOfLast = currentPage * customersPerPage;
//   const indexOfFirst = indexOfLast - customersPerPage;
//   const currentCustomers = filtered.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filtered.length / customersPerPage);

//   return (
//     <div style={containerStyle}>
//       <div style={contentWrapper}>
        
//         {/* --- HEADER --- */}
//         <div style={headerSection}>
//           <button onClick={() => navigate("/admin/dashboard")} style={backBtn}>
//             <ArrowLeft size={18} /> Back to Dashboard
//           </button>
//           <div style={titleRow}>
//             <div>
//               <h1 style={titleStyle}>Customer Management</h1>
//               <p style={subTitleStyle}>View and manage all registered users.</p>
//             </div>
//             <div style={statBadge}>
//               <Users size={18} /> {filtered.length} Total
//             </div>
//           </div>
//         </div>

//         {/* --- SEARCH --- */}
//         <div style={searchCard}>
//           <div style={searchWrapper}>
//             <Search size={18} color="#94a3b8" />
//             <input
//               placeholder="Search by name or email..."
//               value={search}
//               onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
//               style={searchInput}
//             />
//           </div>
//         </div>

//         {/* --- TABLE --- */}
//         <div style={tableContainer}>
//           <table style={{ width: "100%", borderCollapse: "collapse" }}>
//             <thead>
//               <tr style={theadStyle}>
//                 <th style={thStyle}>Customer Name</th>
//                 <th style={thStyle}>Email Address</th>
//                 <th style={{ ...thStyle, textAlign: "right" }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentCustomers.map(c => (
//                 <tr key={c._id} style={trStyle}>
//                   <td style={tdStyle}>
//                     <div style={nameGroup}>
//                       <div style={avatarStyle}>{c.name.charAt(0).toUpperCase()}</div>
//                       <span style={{ fontWeight: "600" }}>{c.name}</span>
//                     </div>
//                   </td>
//                   <td style={tdStyle}>
//                     <div style={emailGroup}><Mail size={14} /> {c.email}</div>
//                   </td>
//                   <td style={{ ...tdStyle, textAlign: "right" }}>
//                     {/* Yahan Action Button ko Clear kiya hai */}
//                     <button onClick={() => deleteCustomer(c._id)} style={deleteBtn}>
//                       <Trash2 size={16} /> 
//                       <span>Delete User</span>
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* --- PAGINATION UI --- */}
//         {totalPages > 1 && (
//           <div style={paginationWrapper}>
//             <button 
//               disabled={currentPage === 1} 
//               onClick={() => setCurrentPage(prev => prev - 1)}
//               style={pageArrow}
//             >
//               <ChevronLeft size={20} />
//             </button>
            
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
//               style={pageArrow}
//             >
//               <ChevronRight size={20} />
//             </button>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// // --- STYLES ---
// const containerStyle = { backgroundColor: "#f8fafc", minHeight: "100vh", paddingBottom: "40px" };
// const contentWrapper = { maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" };
// const headerSection = { marginBottom: "30px" };
// const backBtn = { border: "none", background: "none", color: "#3b82f6", cursor: "pointer", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px", marginBottom: "15px" };
// const titleRow = { display: "flex", justifyContent: "space-between", alignItems: "center" };
// const titleStyle = { margin: 0, fontSize: "26px", fontWeight: "800", color: "#1e293b" };
// const subTitleStyle = { margin: 0, color: "#64748b", fontSize: "14px" };
// const statBadge = { backgroundColor: "#fff", border: "1px solid #e2e8f0", padding: "8px 16px", borderRadius: "10px", display: "flex", alignItems: "center", gap: "10px", fontWeight: "700", color: "#3b82f6" };

// const searchCard = { backgroundColor: "#fff", padding: "12px", borderRadius: "12px", marginBottom: "20px", border: "1px solid #e2e8f0" };
// const searchWrapper = { display: "flex", alignItems: "center", gap: "12px", backgroundColor: "#f1f5f9", padding: "10px 15px", borderRadius: "10px" };
// const searchInput = { border: "none", background: "none", outline: "none", width: "100%", fontSize: "14px" };

// const tableContainer = { backgroundColor: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" };
// const theadStyle = { backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" };
// const thStyle = { padding: "16px 20px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" };
// const tdStyle = { padding: "18px 20px", fontSize: "14px", color: "#334155" };
// const trStyle = { borderBottom: "1px solid #f1f5f9" };

// const nameGroup = { display: "flex", alignItems: "center", gap: "12px" };
// const avatarStyle = { width: "32px", height: "32px", backgroundColor: "#eff6ff", color: "#3b82f6", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700" };
// const emailGroup = { display: "flex", alignItems: "center", gap: "8px", color: "#64748b" };

// const deleteBtn = { 
//   display: "flex", alignItems: "center", gap: "6px",
//   backgroundColor: "#fee2e2", color: "#dc2626", border: "none", 
//   padding: "8px 14px", borderRadius: "8px", cursor: "pointer", 
//   fontWeight: "700", fontSize: "12px", transition: "0.2s" 
// };

// const paginationWrapper = { marginTop: "30px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" };
// const pageBtn = { padding: "8px 15px", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#fff", cursor: "pointer", fontWeight: "600", color: "#64748b" };
// const activePageBtn = { ...pageBtn, backgroundColor: "#3b82f6", color: "#fff", borderColor: "#3b82f6" };
// const pageArrow = { ...pageBtn, padding: "6px 10px", display: "flex", alignItems: "center" };

// export default Customers;






//3


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import { ArrowLeft, Trash2, Mail, Users } from "lucide-react";
import "./Customers.css";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 8;
  const navigate = useNavigate();

  // --- Load Customers ---
  const loadCustomers = async () => {
    try {
      const res = await API.get("/admin/customers");
      setCustomers(res.data);
    } catch {
      alert("Error loading customers");
    }
  };

  useEffect(() => { loadCustomers(); }, []);

  // --- Delete Customer ---
  const deleteCustomer = async (id) => {
    if (!window.confirm("Delete this customer?")) return;
    try {
      await API.delete(`/admin/customer/${id}`);
      loadCustomers();
    } catch {
      alert("Delete failed");
    }
  };

  // --- Filter & Pagination ---
  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * customersPerPage;
  const indexOfFirst = indexOfLast - customersPerPage;
  const currentCustomers = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / customersPerPage);

  return (
    <div className="customer-container">
      {/* Header */}
      <div className="customer-header">
        <button className="back-btn" onClick={() => navigate("/admin/dashboard")}>
          <ArrowLeft size={18} /> Dashboard
        </button>
        <h1>Customer Management <span className="customer-count">{filtered.length}</span></h1>
      </div>

      {/* Search */}
      <div className="search-wrapper">
        <input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
        />
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.length === 0 && <tr><td colSpan="3" className="no-data">No customers found</td></tr>}
            {currentCustomers.map(c => (
              <tr key={c._id}>
                <td>
                  <div className="name-avatar">
                    <div className="avatar">{c.name.charAt(0).toUpperCase()}</div>
                    {c.name}
                  </div>
                </td>
                <td><Mail size={14} /> {c.email}</td>
                <td>
                  <button className="delete-btn" onClick={() => deleteCustomer(c._id)}>
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Prev</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={page === currentPage ? "active" : ""}
              onClick={() => setCurrentPage(page)}
            >{page}</button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
        </div>
      )}
    </div>
  );
}