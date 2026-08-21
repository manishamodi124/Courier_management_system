// import { useEffect, useState } from "react";
// import API from "../../api";
// import "../../index.css";

// function StaffDashboard() {
//   const [deliveries, setDeliveries] = useState([]);
//   const [summary, setSummary] = useState({ total: 0, pending: 0, delivered: 0 });

//   // const staff = JSON.parse(localStorage.getItem("user")); // Logged in staff info
// useEffect(() => {
//   loadData();
// }, []);

//   const loadData = async () => {
//     try {
//       // 1️⃣ Get today's assigned deliveries
//       // const res = await API.get(`/staff/assigned/${staff._id}`);
//       const res = await API.get(`/staff/assigned`);
//       const data = res.data;

//       setDeliveries(data);

//       // 2️⃣ Calculate summary
//       const total = data.length;
//       const delivered = data.filter(d => d.status === "Delivered").length;
//       const pending = total - delivered;
//       setSummary({ total, pending, delivered });

//     } catch (err) {
//       console.error(err);
//       alert("Failed to load deliveries");
//     }
//   };

//   const updateStatus = async (id, nextStatus) => {
//     try {
//       await API.put(`/staff/status/${id}`, { status: nextStatus });
//       loadData(); // reload after update
//     } catch (err) {
//       alert(err.response?.data?.message || "Status update failed");
//     }
//   };

//   const nextStatusMap = {
//     Booked: ["Picked"],
//     Picked: ["In Transit"],
//     "In Transit": ["Delivered"],
//     Delivered: []
//   };

//   const statusColor = {
//     Booked: "#facc15",      // Yellow
//     Picked: "#3b82f6",      // Blue
//     "In Transit": "#f97316", // Orange
//     Delivered: "#16a34a"    // Green
//   };

//   const logout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   return (
//     <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      
//       {/* Header */}
//       <div style={{
//         display: "flex", justifyContent: "space-between",
//         alignItems: "center", marginBottom: 20
//       }}>
//         <h2>🚚 Courier Staff Dashboard</h2>
//         <button
//           onClick={logout}
//           style={{
//             backgroundColor: "#ef4444",
//             color: "#fff",
//             border: "none",
//             padding: "8px 15px",
//             borderRadius: 5,
//             cursor: "pointer"
//           }}
//         >
//           Logout
//         </button>
//       </div>

//       {/* Daily Summary */}
//       <div style={{
//         display: "flex", gap: 20, marginBottom: 30, flexWrap: "wrap"
//       }}>
//         <div style={{
//           flex: 1,
//           minWidth: 150,
//           padding: 15,
//           borderRadius: 8,
//           backgroundColor: "#f0f0f0",
//           textAlign: "center"
//         }}>
//           <h3>Total Deliveries</h3>
//           <p style={{ fontSize: 20, fontWeight: "bold" }}>{summary.total}</p>
//         </div>
//         <div style={{
//           flex: 1,
//           minWidth: 150,
//           padding: 15,
//           borderRadius: 8,
//           backgroundColor: "#fef3c7", // Yellow
//           textAlign: "center"
//         }}>
//           <h3>Pending</h3>
//           <p style={{ fontSize: 20, fontWeight: "bold" }}>{summary.pending}</p>
//         </div>
//         <div style={{
//           flex: 1,
//           minWidth: 150,
//           padding: 15,
//           borderRadius: 8,
//           backgroundColor: "#dcfce7", // Green
//           textAlign: "center"
//         }}>
//           <h3>Delivered</h3>
//           <p style={{ fontSize: 20, fontWeight: "bold" }}>{summary.delivered}</p>
//         </div>
//       </div>

//       {/* Assigned Deliveries */}
//       <h3 style={{ marginBottom: 10 }}>📦 Today's Deliveries</h3>
//       {deliveries.length === 0 && <p>No Work Assigned ✅</p>}

//       {deliveries.map(d => {
//         const nextStatuses = nextStatusMap[d.status] || [];
//         return (
//           <div key={d._id} style={{
//             padding: 15,
//             marginBottom: 15,
//             border: "1px solid #ccc",
//             borderLeft: `5px solid ${statusColor[d.status]}`,
//             borderRadius: 8,
//             backgroundColor: "#fafafa"
//           }}>
//             <p><b>Tracking ID:</b> {d.trackingId}</p>
//             <p><b>Customer:</b> {d.customerId?.name || "N/A"}</p>
//             <p><b>Address:</b> {d.address}</p>
//             <p><b>Status:</b> <span style={{ color: statusColor[d.status], fontWeight: "bold" }}>{d.status}</span></p>

//             {/* Next Actions */}
//             {nextStatuses.length === 0 ? (
//               <p style={{ color: "#16a34a", fontWeight: "bold" }}>✅ Delivered</p>
//             ) : (
//               nextStatuses.map(status => (
//                 <button
//                   key={status}
//                   onClick={() => updateStatus(d._id, status)}
//                   style={{
//                     marginRight: 10,
//                     padding: "5px 12px",
//                     borderRadius: 5,
//                     border: "none",
//                     cursor: "pointer",
//                     backgroundColor: "#3b82f6",
//                     color: "#fff"
//                   }}
//                 >
//                   {status}
//                 </button>
//               ))
//             )}
//           </div>
//         );
//       })}

//     </div>
//   );
// }

// export default StaffDashboard;








// import { useEffect, useState } from "react";
// import API from "../../api";

// function StaffDashboard() {
//   const [shipments, setShipments] = useState([]);
//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!user?._id) return;
//     const load = async () => {
//       const res = await API.get("/shipment/staff", { headers: { Authorization: `Bearer ${token}` } });
//       setShipments(res.data);
//     };
//     load();
//   }, [user, token]);

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Staff Dashboard</h2>
//       {shipments.length === 0 && <p>No shipments assigned</p>}
//       {shipments.map(s => (
//         <div key={s._id} style={{ border: "1px solid #ddd", padding: 15, marginBottom: 10 }}>
//           <p>Tracking ID: {s.trackingId}</p>
//           <p>Status: {s.status}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default StaffDashboard;













// import { useEffect, useState } from "react";
// import API from "../../api";
// import "../../index.css";

// function StaffDashboard() {
//   const [deliveries, setDeliveries] = useState([]);
//   const [summary, setSummary] = useState({ total: 0, pending: 0, delivered: 0 });
//   const [loading, setLoading] = useState(false);
//   const [confirmInput, setConfirmInput] = useState({}); // Track confirmation per delivery

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("/staff/assigned"); // Fetch all assigned deliveries
//       const data = res.data;
//       setDeliveries(data);

//       // Calculate summary
//       const total = data.length;
//       const delivered = data.filter(d => d.status === "Delivered").length;
//       const pending = total - delivered;
//       setSummary({ total, pending, delivered });
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load deliveries");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (id, nextStatus, confirmation = "") => {
//     try {
//       await API.put(`/staff/status/${id}`, { status: nextStatus, confirmation });
//       loadData();
//       setConfirmInput(prev => ({ ...prev, [id]: "" })); // Clear input after update
//     } catch (err) {
//       alert(err.response?.data?.message || "Status update failed");
//     }
//   };

//   const nextStatusMap = {
//     Booked: ["Picked"],
//     Picked: ["In Transit"],
//     "In Transit": ["Delivered"],
//     Delivered: []
//   };

//   const statusColor = {
//     Booked: "#facc15",
//     Picked: "#3b82f6",
//     "In Transit": "#f97316",
//     Delivered: "#16a34a"
//   };

//   const logout = () => {
//     if (window.confirm("Are you sure you want to logout?")) {
//       localStorage.clear();
//       window.location.href = "/login";
//     }
//   };

//   return (
//     <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
//       {/* Header */}
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//         <h2>🚚 Courier Staff Dashboard</h2>
//         <button
//           onClick={logout}
//           style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "8px 15px", borderRadius: 5, cursor: "pointer" }}
//         >
//           Logout
//         </button>
//       </div>

//       {/* Daily Summary */}
//       <div style={{ display: "flex", gap: 20, marginBottom: 30, flexWrap: "wrap" }}>
//         <div style={{ flex: 1, minWidth: 150, padding: 15, borderRadius: 8, backgroundColor: "#f0f0f0", textAlign: "center" }}>
//           <h3>Total Deliveries</h3>
//           <p style={{ fontSize: 20, fontWeight: "bold" }}>{summary.total}</p>
//         </div>
//         <div style={{ flex: 1, minWidth: 150, padding: 15, borderRadius: 8, backgroundColor: "#fef3c7", textAlign: "center" }}>
//           <h3>Pending</h3>
//           <p style={{ fontSize: 20, fontWeight: "bold" }}>{summary.pending}</p>
//         </div>
//         <div style={{ flex: 1, minWidth: 150, padding: 15, borderRadius: 8, backgroundColor: "#dcfce7", textAlign: "center" }}>
//           <h3>Delivered</h3>
//           <p style={{ fontSize: 20, fontWeight: "bold" }}>{summary.delivered}</p>
//         </div>
//       </div>

//       {/* Assigned Deliveries */}
//       <h3 style={{ marginBottom: 10 }}>📦 Today's Deliveries</h3>
//       {loading && <p>Loading deliveries...</p>}
//       {!loading && deliveries.length === 0 && <p>No Work Assigned ✅</p>}

//       {deliveries.map(d => {
//         const nextStatuses = nextStatusMap[d.status] || [];
//         return (
//           <div key={d._id} style={{
//             padding: 15,
//             marginBottom: 15,
//             border: "1px solid #ccc",
//             borderLeft: `5px solid ${statusColor[d.status]}`,
//             borderRadius: 8,
//             backgroundColor: "#fafafa"
//           }}>
//             <p><b>Tracking ID:</b> {d.trackingId}</p>
//             <p><b>Customer:</b> {d.customerId?.name || "N/A"}</p>
//             <p><b>Address:</b> {d.customerId?.address || "N/A"}</p>
//             <p><b>Status:</b> <span style={{ color: statusColor[d.status], fontWeight: "bold" }}>{d.status}</span></p>
//             {d.confirmation && <p style={{ color: "#16a34a", fontStyle: "italic" }}>✅ Confirmation: {d.confirmation}</p>}

//             {/* Next Actions */}
//             {nextStatuses.length === 0 ? (
//               <p style={{ color: "#16a34a", fontWeight: "bold" }}>✅ Delivered</p>
//             ) : (
//               nextStatuses.map(status => (
//                 <div key={status} style={{ marginTop: 5 }}>
//                   {status === "Delivered" && (
//                     <input
//                       type="text"
//                       placeholder="Add confirmation note"
//                       value={confirmInput[d._id] || ""}
//                       onChange={e => setConfirmInput(prev => ({ ...prev, [d._id]: e.target.value }))}
//                       style={{ marginRight: 10, padding: "5px", borderRadius: 5, border: "1px solid #ccc" }}
//                     />
//                   )}
//                   <button
//                     onClick={() => updateStatus(d._id, status, confirmInput[d._id] || "")}
//                     style={{
//                       marginRight: 10,
//                       padding: "5px 12px",
//                       borderRadius: 5,
//                       border: "none",
//                       cursor: "pointer",
//                       backgroundColor: "#3b82f6",
//                       color: "#fff"
//                     }}
//                   >
//                     {status}
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default StaffDashboard;










// import { useEffect, useState } from "react";
// import API from "../../api"; // tumhara axios instance
// import "../../index.css";

// function StaffDashboard() {
//   const [deliveries, setDeliveries] = useState([]);
//   const [summary, setSummary] = useState({ total: 0, pending: 0, delivered: 0 });
//   const [loading, setLoading] = useState(false);
//   const [confirmInput, setConfirmInput] = useState({}); // Delivered ke liye note

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("/staff/assigned"); // all assigned shipments
//       const data = res.data;
//       setDeliveries(data);

//       // Summary calculate
//       const total = data.length;
//       const delivered = data.filter(d => d.status === "Delivered").length;
//       const pending = total - delivered;
//       setSummary({ total, pending, delivered });
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load deliveries");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (id, nextStatus, confirmation = "") => {
//     try {
//       await API.put(`/staff/status/${id}`, { status: nextStatus, confirmation });
//       loadData(); // reload after update
//       setConfirmInput(prev => ({ ...prev, [id]: "" }));
//     } catch (err) {
//       alert(err.response?.data?.message || "Status update failed");
//     }
//   };

//   const nextStatusMap = {
//     Booked: ["Picked"],
//     Picked: ["In Transit"],
//     "In Transit": ["Delivered"],
//     Delivered: []
//   };

//   const statusColor = {
//     Booked: "#facc15",
//     Picked: "#3b82f6",
//     "In Transit": "#f97316",
//     Delivered: "#16a34a"
//   };

//   const logout = () => {
//     if (window.confirm("Are you sure you want to logout?")) {
//       localStorage.clear();
//       window.location.href = "/login";
//     }
//   };

//   return (
//     <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
//       {/* Header */}
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//         <h2>🚚 Staff Dashboard</h2>
//         <button
//           onClick={logout}
//           style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "8px 15px", borderRadius: 5, cursor: "pointer" }}
//         >
//           Logout
//         </button>
//       </div>

//       {/* Summary */}
//       <div style={{ display: "flex", gap: 20, marginBottom: 30, flexWrap: "wrap" }}>
//         <div style={{ flex: 1, minWidth: 150, padding: 15, borderRadius: 8, backgroundColor: "#f0f0f0", textAlign: "center" }}>
//           <h3>Total Deliveries</h3>
//           <p style={{ fontSize: 20, fontWeight: "bold" }}>{summary.total}</p>
//         </div>
//         <div style={{ flex: 1, minWidth: 150, padding: 15, borderRadius: 8, backgroundColor: "#fef3c7", textAlign: "center" }}>
//           <h3>Pending</h3>
//           <p style={{ fontSize: 20, fontWeight: "bold" }}>{summary.pending}</p>
//         </div>
//         <div style={{ flex: 1, minWidth: 150, padding: 15, borderRadius: 8, backgroundColor: "#dcfce7", textAlign: "center" }}>
//           <h3>Delivered</h3>
//           <p style={{ fontSize: 20, fontWeight: "bold" }}>{summary.delivered}</p>
//         </div>
//       </div>

//       {/* Assigned Deliveries */}
//       <h3 style={{ marginBottom: 10 }}>📦 Today's Deliveries</h3>
//       {loading && <p>Loading deliveries...</p>}
//       {!loading && deliveries.length === 0 && <p>No Work Assigned ✅</p>}

//       {deliveries.map(d => {
//         const nextStatuses = nextStatusMap[d.status] || [];
//         return (
//           <div key={d._id} style={{
//             padding: 15,
//             marginBottom: 15,
//             border: "1px solid #ccc",
//             borderLeft: `5px solid ${statusColor[d.status]}`,
//             borderRadius: 8,
//             backgroundColor: "#fafafa"
//           }}>
//             <p><b>Tracking ID:</b> {d.trackingId}</p>
//             <p><b>Receiver Name:</b> {d.receiverName || "N/A"}</p>
//             <p><b>Delivery Address:</b> {d.deliveryAddress || "N/A"}</p>
            
//             <p><b>Status:</b> <span style={{ color: statusColor[d.status], fontWeight: "bold" }}>{d.status}</span></p>
//             {d.confirmation && <p style={{ color: "#16a34a", fontStyle: "italic" }}>✅ Confirmation: {d.confirmation}</p>}

//             {/* Next Actions */}
//             {nextStatuses.length === 0 ? (
//               <p style={{ color: "#16a34a", fontWeight: "bold" }}>✅ Delivered</p>
//             ) : (
//               nextStatuses.map(status => (
//                 <div key={status} style={{ marginTop: 5 }}>
//                   {status === "Delivered" && (
//                     <input
//                       type="text"
//                       placeholder="Add confirmation note"
//                       value={confirmInput[d._id] || ""}
//                       onChange={e => setConfirmInput(prev => ({ ...prev, [d._id]: e.target.value }))}
//                       style={{ marginRight: 10, padding: "5px", borderRadius: 5, border: "1px solid #ccc" }}
//                     />
//                   )}
//                   <button
//                     onClick={() => updateStatus(d._id, status, confirmInput[d._id] || "")}
//                     style={{
//                       marginRight: 10,
//                       padding: "5px 12px",
//                       borderRadius: 5,
//                       border: "none",
//                       cursor: "pointer",
//                       backgroundColor: "#3b82f6",
//                       color: "#fff"
//                     }}
//                   >
//                     {status}
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default StaffDashboard;






import { useEffect, useState } from "react";
import API from "../../api";
import "../../index.css";

// Staff Dashboard
function StaffDashboard() {
  const [deliveries, setDeliveries] = useState([]);
  const [summary, setSummary] = useState({ total: 0, pending: 0, delivered: 0 });
  const [loading, setLoading] = useState(false);
  const [confirmInput, setConfirmInput] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await API.get("/staff/assigned");
      const data = res.data;
      setDeliveries(data);

      const total = data.length;
      const delivered = data.filter(d => d.status === "Delivered").length;
      const pending = total - delivered;
      setSummary({ total, pending, delivered });
    } catch (err) {
      console.error(err);
      alert("Failed to load deliveries");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, nextStatus, confirmation = "") => {
    try {
      await API.put(`/staff/status/${id}`, { status: nextStatus, confirmation });
      loadData();
      setConfirmInput(prev => ({ ...prev, [id]: "" }));
    } catch (err) {
      alert(err.response?.data?.message || "Status update failed");
    }
  };

  const nextStatusMap = {
    Booked: ["Picked"],
    Picked: ["In Transit"],
    "In Transit": ["Delivered"],
    Delivered: []
  };

  const statusColor = {
    Booked: "#facc15",
    Picked: "#3b82f6",
    "In Transit": "#f97316",
    Delivered: "#16a34a"
  };

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      window.location.href = "/login";
    }
  };

  const cardStyle = {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    transition: "all 0.2s ease-in-out",
    cursor: "pointer"
  };

  return (
    <div style={{ padding: 25, fontFamily: "Arial, sans-serif", maxWidth: 1000, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 25 }}>
        <h2>🚚 Staff Dashboard</h2>
        <button
          onClick={logout}
          style={{
            backgroundColor: "#ef4444",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: 5,
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Logout
        </button>
      </div>

      {/* Summary */}
      <div style={{ display: "flex", gap: 20, marginBottom: 30, flexWrap: "wrap" }}>
        {["Total Deliveries", "Pending", "Delivered"].map((title, index) => {
          const value = summary[title.split(" ")[0].toLowerCase()];
          const bg = title === "Pending" ? "#fef3c7" : title === "Delivered" ? "#dcfce7" : "#f0f0f0";
          return (
            <div
              key={index}
              style={{
                flex: 1,
                minWidth: 150,
                padding: 15,
                borderRadius: 10,
                backgroundColor: bg,
                textAlign: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                fontWeight: "bold"
              }}
            >
              <h3 style={{ marginBottom: 5 }}>{title}</h3>
              <p style={{ fontSize: 22 }}>{value}</p>
            </div>
          );
        })}
      </div>

      {/* Deliveries */}
      <h3 style={{ marginBottom: 15 }}>📦 Today's Deliveries</h3>
      {loading && <p>Loading deliveries...</p>}
      {!loading && deliveries.length === 0 && <p>No Work Assigned ✅</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 15 }}>
        {deliveries.map(d => {
          const nextStatuses = nextStatusMap[d.status] || [];
          return (
            <div
              key={d._id}
              style={{ ...cardStyle, borderLeft: `5px solid ${statusColor[d.status]}` }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.08)"; }}
            >
              <p><b>Tracking ID:</b> {d.trackingId}</p>
              <p><b>Receiver:</b> {d.receiverName || "N/A"}</p>
              <p><b>Address:</b> {d.deliveryAddress || "N/A"}</p>
              <p><b>Status:</b> <span style={{ color: statusColor[d.status], fontWeight: "bold" }}>{d.status}</span></p>
              {d.confirmation && <p style={{ color: "#16a34a", fontStyle: "italic" }}>✅ Confirmation: {d.confirmation}</p>}

              {nextStatuses.length === 0 ? (
                <p style={{ color: "#16a34a", fontWeight: "bold" }}>✅ Delivered</p>
              ) : (
                nextStatuses.map(status => (
                  <div key={status} style={{ marginTop: 8 }}>
                    {status === "Delivered" && (
                      <input
                        type="text"
                        placeholder="Add confirmation note"
                        value={confirmInput[d._id] || ""}
                        onChange={e => setConfirmInput(prev => ({ ...prev, [d._id]: e.target.value }))}
                        style={{
                          marginRight: 10,
                          padding: "6px",
                          borderRadius: 5,
                          border: "1px solid #ccc",
                          width: "70%"
                        }}
                      />
                    )}
                    <button
                      onClick={() => updateStatus(d._id, status, confirmInput[d._id] || "")}
                      style={{
                        marginTop: status === "Delivered" ? 5 : 0,
                        padding: "6px 14px",
                        borderRadius: 5,
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: "#3b82f6",
                        color: "#fff",
                        fontWeight: "bold",
                        transition: "background 0.3s"
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = "#2563eb"}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = "#3b82f6"}
                    >
                      {status}
                    </button>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StaffDashboard;