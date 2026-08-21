// import "../../index.css";

// function CustomerDashboard() {
//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Customer Dashboard</h2>

//       {/* <div className="card">
//         <h3>📦 Book your courier easily</h3>
//         <p>Use Book section to send parcels</p>
//       </div> */}

//       <div className="card" onClick={() => window.location.href='/book'} style={{cursor:'pointer'}}>
//   <h3>📦 Book your courier easily</h3>
//   <p>Use Book section to send parcels</p>
// </div>

//       <div className="card">
//         <h3>🔍 Track shipment</h3>
//         <p>Enter tracking ID to track parcel</p>
//       </div>
//     </div>
//   );
// }

// export default CustomerDashboard;






// import "../../index.css";

// function CustomerDashboard() {
//   const cardStyle = {
//     cursor: "pointer",
//     padding: "20px",
//     borderRadius: "12px",
//     backgroundColor: "#ffffff",
//     boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//     transition: "transform 0.2s, box-shadow 0.2s",
//   };

//   const cardHover = (e) => {
//     e.currentTarget.style.transform = "scale(1.05)";
//     e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
//   };

//   const cardLeave = (e) => {
//     e.currentTarget.style.transform = "scale(1)";
//     e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
//   };

//   return (
//     <div
//       style={{
//         padding: 30,
//         fontFamily: "Arial, sans-serif",
//         maxWidth: 900,
//         margin: "0 auto",
//       }}
//     >
//       <h2 style={{ marginBottom: 30, textAlign: "center" }}>
//         👋 Welcome, Customer!
//       </h2>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//           gap: 20,
//         }}
//       >
//         {/* Book Courier */}
//         <div
//           style={cardStyle}
//           onClick={() => (window.location.href = "/book")}
//           onMouseEnter={cardHover}
//           onMouseLeave={cardLeave}
//         >
//           <h3 style={{ marginBottom: 10 }}>📦 Book a Courier</h3>
//           <p style={{ color: "#555" }}>Send parcels easily in few steps</p>
//         </div>

//         {/* Shipment History */}
//         <div
//           style={cardStyle}
//           onClick={() => (window.location.href = "/history")}
//           onMouseEnter={cardHover}
//           onMouseLeave={cardLeave}
//         >
//           <h3 style={{ marginBottom: 10 }}>📜 Shipment History</h3>
//           <p style={{ color: "#555" }}>Check all your past shipments</p>
//         </div>

//         {/* Track Shipment */}
//         <div
//           style={cardStyle}
//           onClick={() => (window.location.href = "/track")}
//           onMouseEnter={cardHover}
//           onMouseLeave={cardLeave}
//         >
//           <h3 style={{ marginBottom: 10 }}>🔍 Track Shipment</h3>
//           <p style={{ color: "#555" }}>Track by your tracking ID</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CustomerDashboard;






// import { useState } from "react";
// import "../../index.css";

// function CustomerDashboard() {
//   const [hovered, setHovered] = useState(null);

//   const cards = [
//     {
//       title: "📦 Book a Courier",
//       desc: "Send parcels easily in a few steps",
//       link: "/book",
//       bg: "linear-gradient(135deg, #6366f1, #a855f7)",
//     },
//     {
//       title: "📜 Shipment History",
//       desc: "Check all your past shipments",
//       link: "/history",
//       bg: "linear-gradient(135deg, #34d399, #3b82f6)",
//     },
//     {
//       title: "🔍 Track Shipment",
//       desc: "Track your shipment by ID",
//       link: "/track",
//       bg: "linear-gradient(135deg, #f472b6, #f43f5e)",
//     },
//   ];

//   return (
//     <div
//       style={{
//         padding: 40,
//         minHeight: "100vh",
//         fontFamily: "Arial, sans-serif",
//         background: "#f3f4f6",
//       }}
//     >
//       <h2
//         style={{
//           textAlign: "center",
//           fontSize: 32,
//           fontWeight: "bold",
//           marginBottom: 40,
//           color: "#111827",
//         }}
//       >
//         👋 Welcome, Customer!
//       </h2>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//           gap: 30,
//         }}
//       >
//         {cards.map((c, idx) => (
//           <div
//             key={idx}
//             onClick={() => (window.location.href = c.link)}
//             onMouseEnter={() => setHovered(idx)}
//             onMouseLeave={() => setHovered(null)}
//             style={{
//               background: c.bg,
//               borderRadius: 20,
//               padding: 25,
//               cursor: "pointer",
//               color: "white",
//               boxShadow:
//                 hovered === idx
//                   ? "0 15px 30px rgba(0,0,0,0.3)"
//                   : "0 8px 20px rgba(0,0,0,0.2)",
//               transform: hovered === idx ? "scale(1.05)" : "scale(1)",
//               transition: "all 0.3s ease",
//             }}
//           >
//             <h3 style={{ fontSize: 22, fontWeight: "bold", marginBottom: 12 }}>
//               {c.title}
//             </h3>
//             <p style={{ fontSize: 16, color: "rgba(255,255,255,0.9)" }}>
//               {c.desc}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CustomerDashboard;














// import { useState } from "react";
// import "../../index.css";
// // import bgImage from "../../assets/c1.webp";
// // import bgImage from "../../assets/c2.png";
// import bgImage from "../../assets/c8.jpg";

// function CustomerDashboard() {
//   const [hovered, setHovered] = useState(null);

//   const cards = [
//     {
//       title: "📦 Book a Courier",
//       desc: "Send parcels easily in a few steps",
//       link: "/book",
//       bg: "linear-gradient(135deg, #6366f1, #a855f7)",
//     },
//     {
//       title: "📜 Shipment History",
//       desc: "Check all your past shipments",
//       link: "/history",
//       bg: "linear-gradient(135deg, #34d399, #3b82f6)",
//     },
//     {
//       title: "🔍 Track Shipment",
//       desc: "Track your shipment by ID",
//       link: "/track",
//       bg: "linear-gradient(135deg, #f472b6, #f43f5e)",
//     },
//   ];

//   return (
//     <div
//       style={{
//         padding: 40,
//         minHeight: "100vh",
//         fontFamily: "Arial, sans-serif",
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//           gap: 30,
//         }}
//       >
//         {cards.map((c, idx) => (
//           <div
//             key={idx}
//             onClick={() => (window.location.href = c.link)}
//             onMouseEnter={() => setHovered(idx)}
//             onMouseLeave={() => setHovered(null)}
//             style={{
//               background: c.bg,
//               borderRadius: 20,
//               padding: 25,
//               cursor: "pointer",
//               color: "white",
//               boxShadow:
//                 hovered === idx
//                   ? "0 15px 30px rgba(0,0,0,0.3)"
//                   : "0 8px 20px rgba(0,0,0,0.2)",
//               transform: hovered === idx ? "scale(1.05)" : "scale(1)",
//               transition: "all 0.3s ease",
//             }}
//           >
//             <h3 style={{ fontSize: 22, fontWeight: "bold", marginBottom: 12 }}>
//               {c.title}
//             </h3>
//             <p style={{ fontSize: 16, color: "rgba(255,255,255,0.9)" }}>
//               {c.desc}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CustomerDashboard;


import { useState } from "react";
import "../../index.css";
import bgImage from "../../assets/c8.jpg";

function CustomerDashboard() {
  const [hovered, setHovered] = useState(null);

  const cards = [
    {
      title: "📦 Book a Courier",
      desc: "Send parcels easily in a few steps",
      link: "/book",
      bg: "linear-gradient(135deg, #6366f1, #a855f7)",
    },
    {
      title: "📜 Shipment History",
      desc: "Check all your past shipments",
      link: "/history",
      bg: "linear-gradient(135deg, #34d399, #3b82f6)",
    },
    {
      title: "🔍 Track Shipment",
      desc: "Track your shipment by ID",
      link: "/track",
      bg: "linear-gradient(135deg, #f472b6, #f43f5e)",
    },
  ];

  return (
    <div
      style={{
        padding: 40,
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 30,
        }}
      >
        {cards.map((c, idx) => (
          <div
            key={idx}
            onClick={() => (window.location.href = c.link)}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: c.bg,
              borderRadius: 20,
              padding: 25,
              cursor: "pointer",
              color: "white",
              boxShadow:
                hovered === idx
                  ? "0 15px 30px rgba(0,0,0,0.3)"
                  : "0 8px 20px rgba(0,0,0,0.2)",
              transform: hovered === idx ? "scale(1.05)" : "scale(1)",
              transition: "all 0.3s ease",
            }}
          >
            <h3 style={{ fontSize: 22, fontWeight: "bold", marginBottom: 12 }}>
              {c.title}
            </h3>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.9)" }}>
              {c.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerDashboard;