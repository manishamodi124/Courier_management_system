// import { useState } from "react";
// import API from "../api"; // यह आपका axios instance है

// function Register() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: ""
//   });

//   const handleRegister = async () => {
//     try {
//       // ✅ Validation
//       if (!form.name || !form.email || !form.password) {
//         alert("All fields are required");
//         return;
//       }

//       // ✅ POST request to backend
//       const res = await API.post("/customer/register", form);

//       alert(`Registered successfully! Your ID: ${res.data._id}`);
//       // ✅ Form reset
//       setForm({ name: "", email: "", password: "" });

//     } catch (err) {
//       console.error(err);
//       // Backend error message show karo
//       alert(err.response?.data || "Registration failed");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "auto", padding: 20, boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
//       <h2 style={{ textAlign: "center", marginBottom: 20 }}>Register</h2>

//       <input
//         placeholder="Name"
//         value={form.name}
//         onChange={(e) => setForm({ ...form, name: e.target.value })}
//         style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #ccc" }}
//       />

//       <input
//         placeholder="Email"
//         value={form.email}
//         onChange={(e) => setForm({ ...form, email: e.target.value })}
//         style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #ccc" }}
//       />

//       <input
//         placeholder="Password"
//         type="password"
//         value={form.password}
//         onChange={(e) => setForm({ ...form, password: e.target.value })}
//         style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #ccc" }}
//       />

//       <button
//         onClick={handleRegister}
//         style={{ width: "100%", padding: 10, borderRadius: 6, backgroundColor: "#0d6efd", color: "#fff", fontWeight: "bold", cursor: "pointer" }}
//       >
//         Register
//       </button>
//     </div>
//   );
// }

// export default Register;











// import { useState } from "react";
// import API from "../api";

// function Register() {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });

//   const handleRegister = async () => {
//     if (!form.name || !form.email || !form.password) {
//       alert("All fields are required");
//       return;
//     }
//     try {
//       const res = await API.post("/customer/register", form);
//       alert(`Registered successfully! Your ID: ${res.data._id}`);
//       setForm({ name: "", email: "", password: "" });
//       window.location.href = "/login"; // registration ke baad login page
//     } catch (err) {
//       const msg = err.response?.data?.message || err.response?.data || err.message;
//       alert(msg);
//     }
//   };

//   // ==== Card & Input Style ====
//   const cardStyle = {
//     maxWidth: 400,
//     margin: "50px auto",
//     padding: 30,
//     borderRadius: 12,
//     boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//     backgroundColor: "#fff",
//     fontFamily: "Arial, sans-serif",
//   };
//   const inputStyle = { width: "100%", padding: 12, marginBottom: 15, borderRadius: 6, border: "1px solid #ccc" };
//   const buttonStyle = { width: "100%", padding: 12, borderRadius: 6, border: "none", backgroundColor: "#0d6efd", color: "#fff", cursor: "pointer", fontWeight: "bold" };
//   const linkStyle = { color: "#007bff", cursor: "pointer", textAlign: "center", display: "block", marginTop: 15, fontSize: 14 };

//   return (
//     <div style={cardStyle}>
//       <h2 style={{ textAlign: "center", marginBottom: 25 }}>Register</h2>

//       <input
//         placeholder="Name"
//         value={form.name}
//         onChange={(e) => setForm({ ...form, name: e.target.value })}
//         style={inputStyle}
//       />
//       <input
//         type="email"
//         placeholder="Email"
//         value={form.email}
//         onChange={(e) => setForm({ ...form, email: e.target.value })}
//         style={inputStyle}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={form.password}
//         onChange={(e) => setForm({ ...form, password: e.target.value })}
//         style={inputStyle}
//       />

//       <button onClick={handleRegister} style={buttonStyle}>Register</button>

//       <p style={{ textAlign: "center", marginTop: 20, fontSize: 14 }}>
//         Already have an account?{" "}
//         <span style={linkStyle} onClick={() => window.location.href = "/login"}>Login</span>
//       </p>
//     </div>
//   );
// }

// export default Register;















// id (black)

// import { useState } from "react";
// import API from "../api"; // axios instance

// function Register() {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });

//   const handleRegister = async () => {
//     // ✅ Validation
//     if (!form.name || !form.email || !form.password) {
//       alert("All fields are required");
//       return;
//     }

//     try {
//       // ✅ POST request
//       const res = await API.post("/customer/register", form);
//       console.log("Backend response:", res.data); // debug

//       // ✅ Safe ID extraction
//       const userId = res.data._id || res.data.user?._id;

//       // ✅ Alert message
//       alert(
//         `Registered successfully! ${
//           userId ? "Your ID: " + userId : res.data.message || "Success!"
//         }`
//       );

//       // ✅ Reset form
//       setForm({ name: "", email: "", password: "" });

//       // ✅ Redirect to login
//       window.location.href = "/login";
//     } catch (err) {
//       const msg = err.response?.data?.message || err.response?.data || err.message;
//       alert(msg);
//     }
//   };

//   // ==== Styling ====
//   const cardStyle = {
//     maxWidth: 400,
//     margin: "50px auto",
//     padding: 30,
//     borderRadius: 12,
//     boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//     backgroundColor: "#fff",
//     fontFamily: "Arial, sans-serif",
//   };
//   const inputStyle = {
//     width: "100%",
//     padding: 12,
//     marginBottom: 15,
//     borderRadius: 6,
//     border: "1px solid #ccc",
//   };
//   const buttonStyle = {
//     width: "100%",
//     padding: 12,
//     borderRadius: 6,
//     border: "none",
//     backgroundColor: "#0d6efd",
//     color: "#fff",
//     cursor: "pointer",
//     fontWeight: "bold",
//   };
//   const linkStyle = {
//     color: "#007bff",
//     cursor: "pointer",
//     textAlign: "center",
//     display: "block",
//     marginTop: 15,
//     fontSize: 14,
//   };

//   return (
//     <div style={cardStyle}>
//       <h2 style={{ textAlign: "center", marginBottom: 25 }}>Register</h2>

//       <input
//         placeholder="Name"
//         value={form.name}
//         onChange={(e) => setForm({ ...form, name: e.target.value })}
//         style={inputStyle}
//       />

//       <input
//         type="email"
//         placeholder="Email"
//         value={form.email}
//         onChange={(e) => setForm({ ...form, email: e.target.value })}
//         style={inputStyle}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={form.password}
//         onChange={(e) => setForm({ ...form, password: e.target.value })}
//         style={inputStyle}
//       />

//       <button onClick={handleRegister} style={buttonStyle}>
//         Register
//       </button>

//       <p style={{ textAlign: "center", marginTop: 20, fontSize: 14 }}>
//         Already have an account?{" "}
//         <span style={linkStyle} onClick={() => (window.location.href = "/login")}>
//           Login
//         </span>
//       </p>
//     </div>
//   );
// }

// export default Register;














// ID (GREEN)
import { useState } from "react";
import API from "../api";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "", show: false });

  const showMessage = (text, type = "success", duration = 3000) => {
    setMessage({ text, type, show: true });
    setTimeout(() => setMessage({ ...message, show: false }), duration);
  };

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      showMessage("All fields are required", "error");
      return;
    }

    try {
      const res = await API.post("/customer/register", form);
      const userId = res.data._id || res.data.user?._id;
      showMessage(
        `✅ Registered successfully! ${userId ? "Your ID: " + userId : ""}`,
        "success"
      );
      setForm({ name: "", email: "", password: "" });

      // Optional redirect after 2s
      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || err.message;
      showMessage(msg, "error");
    }
  };

  // ==== Styles ====
  const cardStyle = {
    maxWidth: 400,
    margin: "50px auto",
    padding: 35,
    borderRadius: 12,
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    backgroundColor: "#fff",
    fontFamily: "Arial, sans-serif",
    position: "relative",
  };
  const inputStyle = {
    width: "100%",
    padding: 14,
    marginBottom: 20,
    borderRadius: 8,
    border: "1px solid #aaa",
    fontSize: 15,
  };
  const buttonStyle = {
    width: "100%",
    padding: 14,
    borderRadius: 8,
    border: "none",
    backgroundColor: "#0d6efd",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    transition: "0.2s",
  };
  const buttonHover = (e) => (e.target.style.backgroundColor = "#0b5ed7");
  const buttonLeave = (e) => (e.target.style.backgroundColor = "#0d6efd");
  const linkStyle = { color: "#0d6efd", cursor: "pointer", display: "block", textAlign: "center", marginTop: 18, fontSize: 14 };

  const messageStyle = {
    position: "fixed",
    top: message.show ? "20px" : "-80px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: message.type === "success" ? "#198754" : "#dc3545",
    color: "#fff",
    padding: "14px 22px",
    borderRadius: 10,
    boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    transition: "top 0.4s ease",
    zIndex: 9999,
    minWidth: 280,
  };

  return (
    <>
      {message.show && <div style={messageStyle}>{message.text}</div>}

      <div style={cardStyle}>
        <h2 style={{ textAlign: "center", marginBottom: 30, color: "#333" }}>Register</h2>

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={inputStyle}
        />

        <button
          onClick={handleRegister}
          style={buttonStyle}
          onMouseEnter={buttonHover}
          onMouseLeave={buttonLeave}
        >
          Register
        </button>

        <p style={{ textAlign: "center", marginTop: 22, fontSize: 14, color: "#555" }}>
          Already have an account?{" "}
          <span style={linkStyle} onClick={() => (window.location.href = "/login")}>
            Login
          </span>
        </p>
      </div>
    </>
  );
}

export default Register;