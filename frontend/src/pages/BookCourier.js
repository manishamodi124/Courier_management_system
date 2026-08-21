









// import { useState } from "react";
// import API from "../api";
// import MapPicker from "../components/MapPicker";

// function BookCourier() {

//   const [pickup, setPickup] = useState({ lat: null, lng: null });
//   const [delivery, setDelivery] = useState({ lat: null, lng: null });

//   const [form, setForm] = useState({
//     pickupAddress: "",
//     deliveryAddress: "",
//     receiverName: "",
//     receiverPhone: "",
//     weight: ""
//   });

//   const submit = async () => {
//     try {
//       const customerId = localStorage.getItem("id");

//       console.log("DATA:", { ...form, pickup, delivery, customerId });

//       if (
//         !customerId ||
//         !form.pickupAddress ||
//         !form.deliveryAddress ||
//         !form.receiverName ||
//         !form.receiverPhone ||
//         !form.weight ||
//         !pickup.lat ||
//         !delivery.lat
//       ) {
//         alert("All fields are required");
//         return;
//       }

//       const res = await API.post("/shipment/book", {
//         ...form,
//         customerId,
//         pickupLocation: pickup,
//         deliveryLocation: delivery
//       });

//       alert("✅ Booking Success\nTracking ID: " + res.data.trackingId);

//       // reset
//       setForm({
//         pickupAddress: "",
//         deliveryAddress: "",
//         receiverName: "",
//         receiverPhone: "",
//         weight: ""
//       });
//       setPickup({ lat: null, lng: null });
//       setDelivery({ lat: null, lng: null });

//     } catch (err) {
//       console.log(err);
//       alert(err.response?.data || "Booking failed");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "auto" }}>
//       <h2>Book Courier</h2>

//       <input
//         placeholder="Pickup Address"
//         value={form.pickupAddress}
//         onChange={(e) =>
//           setForm({ ...form, pickupAddress: e.target.value })
//         }
//       />
//       <MapPicker setLocation={setPickup} />

//       <input
//         placeholder="Delivery Address"
//         value={form.deliveryAddress}
//         onChange={(e) =>
//           setForm({ ...form, deliveryAddress: e.target.value })
//         }
//       />
//       <MapPicker setLocation={setDelivery} />

//       <input
//         placeholder="Receiver Name"
//         value={form.receiverName}
//         onChange={(e) =>
//           setForm({ ...form, receiverName: e.target.value })
//         }
//       />

//       <input
//         placeholder="Receiver Phone"
//         value={form.receiverPhone}
//         onChange={(e) =>
//           setForm({ ...form, receiverPhone: e.target.value })
//         }
//       />

//       <input
//         type="number"
//         placeholder="Weight"
//         value={form.weight}
//         onChange={(e) =>
//           setForm({ ...form, weight: e.target.value })
//         }
//       />

//       <button onClick={submit}>Submit</button>
//     </div>
//   );
// }

// export default BookCourier;














// import { useState } from "react";
// import API from "../api";
// import MapPicker from "../components/MapPicker";

// function BookCourier() {

//   const [pickup, setPickup] = useState({ lat: null, lng: null });
//   const [delivery, setDelivery] = useState({ lat: null, lng: null });

//   const [form, setForm] = useState({
//     pickupAddress: "",
//     deliveryAddress: "",
//     receiverName: "",
//     receiverPhone: "",
//     weight: ""
//   });

//   // ✅ Distance calculation
//   const getDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371;
//     const dLat = (lat2 - lat1) * Math.PI / 180;
//     const dLon = (lon2 - lon1) * Math.PI / 180;

//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(lat1 * Math.PI / 180) *
//       Math.cos(lat2 * Math.PI / 180) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);

//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   };

//   const submit = async () => {
//     try {
//       const customerId = localStorage.getItem("id");

//       if (
//         !customerId ||
//         !form.pickupAddress ||
//         !form.deliveryAddress ||
//         !form.receiverName ||
//         !form.receiverPhone ||
//         !form.weight ||
//         !pickup.lat ||
//         !delivery.lat
//       ) {
//         alert("All fields are required");
//         return;
//       }

//       const res = await API.post("/shipment/book", {
//         ...form,
//         customerId,
//         pickupLocation: pickup,
//         deliveryLocation: delivery
//       });

//       const distance = getDistance(
//         pickup.lat,
//         pickup.lng,
//         delivery.lat,
//         delivery.lng
//       );

//       alert(
//         `✅ Booking Success\nTracking ID: ${res.data.trackingId}\nDistance: ${distance.toFixed(2)} km`
//       );

//       // reset
//       setForm({
//         pickupAddress: "",
//         deliveryAddress: "",
//         receiverName: "",
//         receiverPhone: "",
//         weight: ""
//       });
//       setPickup({ lat: null, lng: null });
//       setDelivery({ lat: null, lng: null });

//     } catch (err) {
//       console.log(err);
//       alert(err.response?.data || "Booking failed");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
//       <h2>📦 Book Courier</h2>

//       <p style={{ color: "gray" }}>
//         👉 Map पर click करके location select करो
//       </p>

//       {/* Pickup */}
//       <input
//         placeholder="Pickup Address"
//         value={form.pickupAddress}
//         onChange={(e) =>
//           setForm({ ...form, pickupAddress: e.target.value })
//         }
//         style={{ width: "100%", padding: 10, marginBottom: 10 }}
//       />

//       <MapPicker setLocation={setPickup} />

//       {/* ✅ Show pickup location */}
//       {pickup.lat && (
//         <p>📍 Pickup: {pickup.lat.toFixed(4)}, {pickup.lng.toFixed(4)}</p>
//       )}

//       {/* Delivery */}
//       <input
//         placeholder="Delivery Address"
//         value={form.deliveryAddress}
//         onChange={(e) =>
//           setForm({ ...form, deliveryAddress: e.target.value })
//         }
//         style={{ width: "100%", padding: 10, margin: "10px 0" }}
//       />

//       <MapPicker setLocation={setDelivery} />

//       {/* ✅ Show delivery location */}
//       {delivery.lat && (
//         <p>📍 Delivery: {delivery.lat.toFixed(4)}, {delivery.lng.toFixed(4)}</p>
//       )}

//       {/* ✅ Show distance */}
//       {pickup.lat && delivery.lat && (
//         <p>
//           📏 Distance:{" "}
//           {getDistance(
//             pickup.lat,
//             pickup.lng,
//             delivery.lat,
//             delivery.lng
//           ).toFixed(2)} km
//         </p>
//       )}

//       {/* Receiver */}
//       <input
//         placeholder="Receiver Name"
//         value={form.receiverName}
//         onChange={(e) =>
//           setForm({ ...form, receiverName: e.target.value })
//         }
//         style={{ width: "100%", padding: 10, marginBottom: 10 }}
//       />

//       <input
//         placeholder="Receiver Phone"
//         value={form.receiverPhone}
//         onChange={(e) =>
//           setForm({ ...form, receiverPhone: e.target.value })
//         }
//         style={{ width: "100%", padding: 10, marginBottom: 10 }}
//       />

//       <input
//         type="number"
//         placeholder="Weight (kg)"
//         value={form.weight}
//         onChange={(e) =>
//           setForm({ ...form, weight: e.target.value })
//         }
//         style={{ width: "100%", padding: 10, marginBottom: 10 }}
//       />

//       <button
//         onClick={submit}
//         style={{
//           width: "100%",
//           padding: 12,
//           backgroundColor: "#1D4ED8",
//           color: "#fff",
//           border: "none",
//           borderRadius: 5,
//           cursor: "pointer"
//         }}
//       >
//         Submit
//       </button>
//     </div>
//   );
// }

// export default BookCourier;












// import { useState } from "react";
// import API from "../api";


// function BookCourier() {

//   const [form, setForm] = useState({
//     pickupAddress: "",
//     deliveryAddress: "",
//     receiverName: "",
//     receiverPhone: "",
//     weight: ""
//   });

//   const submit = async () => {
//     try {
//       const customerId = localStorage.getItem("id");

//       if (
//         !customerId ||
//         !form.pickupAddress ||
//         !form.deliveryAddress ||
//         !form.receiverName ||
//         !form.receiverPhone ||
//         !form.weight
//       ) {
//         alert("All fields are required");
//         return;
//       }

//       if (form.receiverPhone.length !== 10) {
//         alert("Phone must be 10 digits");
//         return;
//       }

//       // ✅ IMPORTANT: dummy locations भेज रहे हैं (backend satisfy करने के लिए)
//       const res = await API.post("/shipment/book", {
//         ...form,
//         customerId,
//         pickupLocation: { lat: 21.1702, lng: 72.8311 },   // Surat default
//         deliveryLocation: { lat: 21.1702, lng: 72.8311 }
//       });

//       alert("✅ Booking Success\nTracking ID: " + res.data.trackingId);

//       setForm({
//         pickupAddress: "",
//         deliveryAddress: "",
//         receiverName: "",
//         receiverPhone: "",
//         weight: ""
//       });

//     } catch (err) {
//       console.log(err);
//       alert(err.response?.data || "Booking failed");
//     }
//   };

//   return (
//     <div style={{
//       maxWidth: 500,
//       margin: "40px auto",
//       padding: 25,
//       borderRadius: 10,
//       boxShadow: "0 0 10px rgba(0,0,0,0.1)"
//     }}>
//       <h2 style={{ textAlign: "center" }}>📦 Book Courier</h2>

//       <input
//         placeholder="Pickup Address"
//         value={form.pickupAddress}
//         onChange={(e) =>
//           setForm({ ...form, pickupAddress: e.target.value })
//         }
//         style={{ width: "100%", padding: 10, marginBottom: 10 }}
//       />

//       <input
//         placeholder="Delivery Address"
//         value={form.deliveryAddress}
//         onChange={(e) =>
//           setForm({ ...form, deliveryAddress: e.target.value })
//         }
//         style={{ width: "100%", padding: 10, marginBottom: 10 }}
//       />

//       <input
//         placeholder="Receiver Name"
//         value={form.receiverName}
//         onChange={(e) =>
//           setForm({ ...form, receiverName: e.target.value })
//         }
//         style={{ width: "100%", padding: 10, marginBottom: 10 }}
//       />

//       <input
//         placeholder="Receiver Phone"
//         value={form.receiverPhone}
//         onChange={(e) =>
//           setForm({ ...form, receiverPhone: e.target.value })
//         }
//         style={{ width: "100%", padding: 10, marginBottom: 10 }}
//       />

//       <input
//         type="number"
//         placeholder="Weight (kg)"
//         value={form.weight}
//         onChange={(e) =>
//           setForm({ ...form, weight: e.target.value })
//         }
//         style={{ width: "100%", padding: 10, marginBottom: 15 }}
//       />

//       <button
//         onClick={submit}
//         style={{
//           width: "100%",
//           padding: 12,
//           backgroundColor: "#1D4ED8",
//           color: "#fff",
//           border: "none",
//           borderRadius: 5,
//           cursor: "pointer"
//         }}
//       >
//         Submit
//       </button>
//     </div>
//   );
// }

// export default BookCourier;






// import { useState } from "react";
// import API from "../api";

// function BookCourier() {
//   const [form, setForm] = useState({
//     pickupAddress: "",
//     deliveryAddress: "",
//     receiverName: "",
//     receiverPhone: "",
//     weight: ""
//   });

//   const submit = async () => {
//     try {
//       const customerId = localStorage.getItem("id");

//       if (
//         !customerId ||
//         !form.pickupAddress ||
//         !form.deliveryAddress ||
//         !form.receiverName ||
//         !form.receiverPhone ||
//         !form.weight
//       ) {
//         alert("All fields are required");
//         return;
//       }

//       if (form.receiverPhone.length !== 10) {
//         alert("Phone must be 10 digits");
//         return;
//       }

//       const res = await API.post("/shipment/book", {
//         ...form,
//         customerId,
//         pickupLocation: { lat: 21.1702, lng: 72.8311 }, // Surat default
//         deliveryLocation: { lat: 21.1702, lng: 72.8311 }
//       });

//       alert("✅ Booking Success\nTracking ID: " + res.data.trackingId);

//       setForm({
//         pickupAddress: "",
//         deliveryAddress: "",
//         receiverName: "",
//         receiverPhone: "",
//         weight: ""
//       });
//     } catch (err) {
//       console.log(err);
//       alert(err.response?.data || "Booking failed");
//     }
//   };

//   const inputStyle = {
//     width: "100%",
//     padding: 12,
//     marginBottom: 12,
//     borderRadius: 6,
//     border: "1px solid #ccc",
//     outline: "none",
//     transition: "border 0.2s, box-shadow 0.2s"
//   };

//   const handleFocus = (e) => {
//     e.target.style.border = "1px solid #3b82f6";
//     e.target.style.boxShadow = "0 0 5px rgba(59,130,246,0.3)";
//   };

//   const handleBlur = (e) => {
//     e.target.style.border = "1px solid #ccc";
//     e.target.style.boxShadow = "none";
//   };

//   return (
//     <div style={{
//       maxWidth: 500,
//       margin: "50px auto",
//       padding: 25,
//       borderRadius: 12,
//       boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//       backgroundColor: "#fff",
//       fontFamily: "Arial, sans-serif"
//     }}>
//       <h2 style={{ textAlign: "center", marginBottom: 25 }}>📦 Book Courier</h2>

//       <input
//         placeholder="Pickup Address"
//         value={form.pickupAddress}
//         onChange={(e) => setForm({ ...form, pickupAddress: e.target.value })}
//         style={inputStyle}
//         onFocus={handleFocus}
//         onBlur={handleBlur}
//       />

//       <input
//         placeholder="Delivery Address"
//         value={form.deliveryAddress}
//         onChange={(e) => setForm({ ...form, deliveryAddress: e.target.value })}
//         style={inputStyle}
//         onFocus={handleFocus}
//         onBlur={handleBlur}
//       />

//       <input
//         placeholder="Receiver Name"
//         value={form.receiverName}
//         onChange={(e) => setForm({ ...form, receiverName: e.target.value })}
//         style={inputStyle}
//         onFocus={handleFocus}
//         onBlur={handleBlur}
//       />

//       <input
//         placeholder="Receiver Phone"
//         value={form.receiverPhone}
//         onChange={(e) => setForm({ ...form, receiverPhone: e.target.value })}
//         style={inputStyle}
//         onFocus={handleFocus}
//         onBlur={handleBlur}
//       />

//       <input
//         type="number"
//         placeholder="Weight (kg)"
//         value={form.weight}
//         onChange={(e) => setForm({ ...form, weight: e.target.value })}
//         style={inputStyle}
//         onFocus={handleFocus}
//         onBlur={handleBlur}
//       />

//       <button
//         onClick={submit}
//         style={{
//           width: "100%",
//           padding: 14,
//           backgroundColor: "#3b82f6",
//           color: "#fff",
//           border: "none",
//           borderRadius: 6,
//           cursor: "pointer",
//           fontWeight: "bold",
//           transition: "background 0.3s"
//         }}
//         onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#2563eb"}
//         onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#3b82f6"}
//       >
//         Submit
//       </button>
//     </div>
//   );
// }

// export default BookCourier;






import { useState } from "react";
import API from "../api";

function BookCourier() {
  const [form, setForm] = useState({
    pickupAddress: "",
    deliveryAddress: "",
    receiverName: "",
    receiverPhone: "",
    weight: ""
  });

  const submit = async () => {
    try {
      const customerId = localStorage.getItem("id");

      if (
        !customerId ||
        !form.pickupAddress ||
        !form.deliveryAddress ||
        !form.receiverName ||
        !form.receiverPhone ||
        !form.weight
      ) {
        alert("All fields are required");
        return;
      }

      if (form.receiverPhone.length !== 10) {
        alert("Phone must be 10 digits");
        return;
      }

      const res = await API.post("/shipment/book", {
        ...form,
        customerId,
        pickupLocation: { lat: 21.1702, lng: 72.8311 }, // Surat default
        deliveryLocation: { lat: 21.1702, lng: 72.8311 }
      });

      alert("✅ Booking Success\nTracking ID: " + res.data.trackingId);

      setForm({
        pickupAddress: "",
        deliveryAddress: "",
        receiverName: "",
        receiverPhone: "",
        weight: ""
      });
    } catch (err) {
      console.log(err);
      alert(err.response?.data || "Booking failed");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
    border: "1px solid #ccc",
    outline: "none",
    transition: "border 0.2s, box-shadow 0.2s"
  };

  const handleFocus = (e) => {
    e.target.style.border = "1px solid #3b82f6";
    e.target.style.boxShadow = "0 0 5px rgba(59,130,246,0.3)";
  };

  const handleBlur = (e) => {
    e.target.style.border = "1px solid #ccc";
    e.target.style.boxShadow = "none";
  };

  return (
    <div style={{
      maxWidth: 500,
      margin: "50px auto",
      padding: 25,
      borderRadius: 12,
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      backgroundColor: "#fff",
      fontFamily: "Arial, sans-serif"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: 25 }}>📦 Book Courier</h2>

      <input
        placeholder="Pickup Address"
        value={form.pickupAddress}
        onChange={(e) => setForm({ ...form, pickupAddress: e.target.value })}
        style={inputStyle}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <input
        placeholder="Delivery Address"
        value={form.deliveryAddress}
        onChange={(e) => setForm({ ...form, deliveryAddress: e.target.value })}
        style={inputStyle}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <input
        placeholder="Receiver Name"
        value={form.receiverName}
        onChange={(e) => setForm({ ...form, receiverName: e.target.value })}
        style={inputStyle}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <input
        placeholder="Receiver Phone"
        value={form.receiverPhone}
        onChange={(e) => setForm({ ...form, receiverPhone: e.target.value })}
        style={inputStyle}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <input
        type="number"
        placeholder="Weight (kg)"
        value={form.weight}
        onChange={(e) => setForm({ ...form, weight: e.target.value })}
        style={inputStyle}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <button
        onClick={submit}
        style={{
          width: "100%",
          padding: 14,
          backgroundColor: "#3b82f6",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          fontWeight: "bold",
          transition: "background 0.3s"
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#2563eb"}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#3b82f6"}
      >
        Submit
      </button>
    </div>
  );
}

export default BookCourier;