




import { useEffect, useState } from "react";
import API from "../api";

function History() {
  const [shipments, setShipments] = useState([]);
  const [error, setError] = useState("");

  const customerId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get(`/shipment/history/${customerId}`);
        setShipments(res.data);
        setError("");
      } catch (err) {
        const msg =
          err.response?.data?.message ||
          err.response?.data ||
          "Error loading history";

        setError(msg);
      }
    };
    load();
  }, [customerId]);

  const downloadPDF = async (shipment) => {
    try {
      if (!token) {
        alert("Please login first!");
        return;
      }

      const res = await fetch(`http://localhost:5000/api/shipment/download/${shipment._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error("Download failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `shipment_${shipment.trackingId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "20px auto", padding: 20 }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>📜 Shipment History</h2>

      {/* ERROR */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {shipments.length === 0 && !error && <p>No shipments found</p>}

      {shipments.map((s) => (
        <div
          key={s._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 15,
            marginBottom: 15,
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >
          <div>
            <p><b>Tracking ID:</b> {s.trackingId}</p>

            <p>
              <b>Status:</b>{" "}
              <span style={{
                color:
                  s.status === "Delivered" ? "green" :
                  s.status === "In Transit" ? "orange" :
                  s.status === "Picked" ? "blue" : "black"
              }}>
                {s.status}
              </span>
            </p>

            {/* <p><b>Delivery Date:</b> {s.deliveryDate || "Pending"}</p> */}
            <p>
  <b>Delivery Date:</b>{" "}
  {s.deliveryDate
    ? new Date(s.deliveryDate).toLocaleDateString()
    : "Pending"}
</p>
          </div>

          <button
            onClick={() => downloadPDF(s)}
            style={{
              padding: "8px 12px",
              backgroundColor: "#1D4ED8",
              color: "#fff",
              border: "none",
              borderRadius: 5,
              cursor: "pointer"
            }}
          >
            Download PDF
          </button>
        </div>
      ))}
    </div>
  );
}

export default History;










// import { useEffect, useState } from "react";
// import API from "../api";

// function History() {
//   const [shipments, setShipments] = useState([]);
//   const [error, setError] = useState("");

//   const customerId = localStorage.getItem("id");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const res = await API.get(`/shipment/history/${customerId}`);
//         setShipments(res.data);
//         setError("");
//       } catch (err) {
//         const msg =
//           err.response?.data?.message ||
//           err.response?.data ||
//           "Error loading history";
//         setError(msg);
//       }
//     };
//     load();
//   }, [customerId]);

//   const downloadPDF = async (shipment) => {
//     try {
//       if (!token) {
//         alert("Please login first!");
//         return;
//       }

//       const res = await fetch(
//         `http://localhost:5000/api/shipment/download/${shipment._id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (!res.ok) throw new Error("Download failed");

//       const blob = await res.blob();
//       const url = window.URL.createObjectURL(blob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `shipment_${shipment.trackingId}.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const getStatusColor = (status) => {
//     if (status === "Delivered") return "#16a34a"; // green
//     if (status === "In Transit") return "#f97316"; // orange
//     if (status === "Picked") return "#3b82f6"; // blue
//     return "#000";
//   };

//   return (
//     <div
//       style={{
//         maxWidth: 900,
//         margin: "30px auto",
//         padding: 20,
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       <h2 style={{ textAlign: "center", marginBottom: 25 }}>📜 Shipment History</h2>

//       {error && (
//         <p
//           style={{
//             color: "#ef4444",
//             fontWeight: "bold",
//             textAlign: "center",
//             marginBottom: 15,
//           }}
//         >
//           {error}
//         </p>
//       )}
//       {!error && shipments.length === 0 && <p style={{ textAlign: "center" }}>No shipments found</p>}

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//           gap: 20,
//         }}
//       >
//         {shipments.map((s) => (
//           <div
//             key={s._id}
//             style={{
//               backgroundColor: "#fff",
//               borderRadius: 12,
//               boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
//               padding: 20,
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//               transition: "transform 0.2s, box-shadow 0.2s",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = "scale(1.03)";
//               e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = "scale(1)";
//               e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.08)";
//             }}
//           >
//             <div style={{ marginBottom: 15 }}>
//               <p><b>Tracking ID:</b> {s.trackingId}</p>
//               <p>
//                 <b>Status:</b>{" "}
//                 <span style={{ color: getStatusColor(s.status), fontWeight: "bold" }}>
//                   {s.status}
//                 </span>
//               </p>
//               <p>
//                 <b>Delivery Date:</b>{" "}
//                 {s.deliveryDate ? new Date(s.deliveryDate).toLocaleDateString() : "Pending"}
//               </p>
//             </div>

//             <button
//               onClick={() => downloadPDF(s)}
//               style={{
//                 padding: "10px 16px",
//                 backgroundColor: "#3b82f6",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: 8,
//                 cursor: "pointer",
//                 fontWeight: "bold",
//                 transition: "background 0.3s, transform 0.2s",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = "#2563eb";
//                 e.currentTarget.style.transform = "scale(1.05)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = "#3b82f6";
//                 e.currentTarget.style.transform = "scale(1)";
//               }}
//             >
//               Download PDF
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default History;


