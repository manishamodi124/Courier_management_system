// import { useState } from "react";
// import API from "../api";

// function Track() {
//   const [id, setId] = useState("");
//   const [data, setData] = useState(null);

//  const track = async () => {
//   try {
//     const res = await API.get(`/shipment/track/${id}`);
//     setData(res.data);
//   } catch (err) {
//     alert(err.response?.data || "Tracking failed");
//     setData(null);
//   }
// };

//   return (
//     <div className="card">

//       <input onChange={(e)=>setId(e.target.value)} placeholder="Tracking ID"/>
//       <button onClick={track}>Track</button>

//       {data && (
//         <div>
//           <h3>Status: {data.status}</h3>
//         </div>
//       )}

//     </div>
//   );
// }

// export default Track;















// import { useState } from "react";
// import API from "../api";

// function Track() {

//   const [id, setId] = useState("");
//   const [data, setData] = useState(null);
//   const [error, setError] = useState("");

//   const track = async () => {
//     try {

//       if (!id) {
//         alert("Enter Tracking ID");
//         return;
//       }

//       // ✅ API CALL
//       const res = await API.get(`/shipment/track/${id.trim()}`);

//       setData(res.data);
//       setError("");

//     } catch (err) {

//       const msg =
//         err.response?.data?.message ||
//         err.response?.data ||
//         "Tracking failed";

//       setError(msg);
//       setData(null);
//     }
//   };

//   return (
//     <div style={{
//       maxWidth: 400,
//       margin: "40px auto",
//       padding: 20,
//       boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//       borderRadius: 10
//     }}>

//       <h2>📦 Track Shipment</h2>

//       <input
//         value={id}
//         onChange={(e) => setId(e.target.value)}
//         placeholder="Enter Tracking ID"
//         style={{ width: "100%", padding: 10, marginBottom: 10 }}
//       />

//       <button
//         onClick={track}
//         style={{
//           width: "100%",
//           padding: 10,
//           backgroundColor: "#2563eb",
//           color: "#fff",
//           border: "none",
//           borderRadius: 5
//         }}
//       >
//         Track
//       </button>

//       {/* ERROR */}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* DATA */}
//       {data && (
//         <div style={{
//           marginTop: 15,
//           padding: 15,
//           border: "1px solid #ccc"
//         }}>
//           <p><b>Tracking ID:</b> {data.trackingId}</p>
//           <p><b>Status:</b> {data.status}</p>
//           <p><b>Receiver:</b> {data.receiverName}</p>
//           <p><b>Pickup:</b> {data.pickupAddress}</p>
//           <p><b>Delivery:</b> {data.deliveryAddress}</p>
//         </div>
//       )}

//     </div>
//   );
// }

// export default Track;














import { useState } from "react";
import API from "../api";

function Track() {

  const [id, setId] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  // ✅ status color
  const getColor = (status) => {
    if (status === "Delivered") return "green";
    if (status === "In Transit") return "orange";
    if (status === "Picked") return "blue";
    return "gray";
  };

  // ✅ timeline steps
  const steps = ["Booked", "Picked", "In Transit", "Delivered"];

  const track = async () => {
    try {

      if (!id) {
        alert("Enter Tracking ID");
        return;
      }

      const res = await API.get(`/shipment/track/${id.trim()}`);

      setData(res.data);
      setError("");

    } catch (err) {

      const msg =
        err.response?.data?.message ||
        err.response?.data ||
        "Tracking failed";

      setError(msg);
      setData(null);
    }
  };

  return (
    <div style={{
      maxWidth: 450,
      margin: "40px auto",
      padding: 20,
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      borderRadius: 10,
      fontFamily: "Arial"
    }}>

      <h2 style={{ textAlign: "center" }}>📦 Track Shipment</h2>

      {/* INPUT */}
      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Enter Tracking ID"
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
          border: "1px solid #ccc"
        }}
      />

      <button
        onClick={track}
        style={{
          width: "100%",
          padding: 10,
          backgroundColor: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: 5,
          cursor: "pointer"
        }}
      >
        Track
      </button>

      {/* ERROR */}
      {error && (
        <p style={{ color: "red", marginTop: 10 }}>{error}</p>
      )}

      {/* DATA */}
      {data && (
        <div style={{
          marginTop: 20,
          padding: 15,
          border: "1px solid #ddd",
          borderRadius: 8
        }}>

          <p><b>Tracking ID:</b> {data.trackingId}</p>

          <p style={{ color: getColor(data.status), fontWeight: "bold" }}>
            Status: {data.status}
          </p>

          <p><b>Receiver:</b> {data.receiverName}</p>
          <p><b>Pickup:</b> {data.pickupAddress}</p>
          <p><b>Delivery:</b> {data.deliveryAddress}</p>

          <p>
            <b>Delivery Date:</b>{" "}
            {data.deliveryDate
              ? new Date(data.deliveryDate).toLocaleString()
              : "Pending"}
          </p>

          {/* ✅ TIMELINE */}
          <div style={{ marginTop: 20 }}>
            <h4>Status Timeline</h4>

            {steps.map((step, index) => {
              const isActive = steps.indexOf(data.status) >= index;

              return (
                <div key={step} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                  
                  <div style={{
                    width: 15,
                    height: 15,
                    borderRadius: "50%",
                    backgroundColor: isActive ? "green" : "#ccc",
                    marginRight: 10
                  }} />

                  <span style={{
                    color: isActive ? "black" : "#aaa",
                    fontWeight: isActive ? "bold" : "normal"
                  }}>
                    {step}
                  </span>

                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}

export default Track;