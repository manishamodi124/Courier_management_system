// import { useState } from "react";
// import API from "../api";

// function Login() {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     role: "customer"
//   });

//   const handleLogin = async () => {
//     try {
//       const res = await API.post(`/${form.role}/login`, form);
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", form.role);
//       localStorage.setItem("id", res.data.user._id);
//       window.location.href = "/";
//     } catch (err) {
//       alert(err.response?.data || "Login failed");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
//       <h2>Login</h2>
//       <select value={form.role} onChange={(e) => setForm({...form, role: e.target.value})}>
//         <option value="customer">Customer</option>
//         <option value="staff">Staff</option>
//         <option value="admin">Admin</option>
//       </select>
//       <input
//         placeholder="Email"
//         value={form.email}
//         onChange={(e) => setForm({...form, email: e.target.value})}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={form.password}
//         onChange={(e) => setForm({...form, password: e.target.value})}
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }

// export default Login;








// import { useState } from "react";
// import API from "../api";

// function Login() {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     role: "customer"
//   });

//  const handleLogin = async () => {
//   try {
//     const res = await API.post(`/${form.role}/login`, form);

//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("role", form.role);

//     if (form.role === "customer") {
//       localStorage.setItem("id", res.data.user._id);
//       window.location.href = "/";
//     }

//     else if (form.role === "staff") {
//       localStorage.setItem("id", res.data.staff._id);
//       window.location.href = "/staff";
//     }

//     else if (form.role === "admin") {
//       // localStorage.setItem("id", res.data.admin._id);
//       localStorage.setItem("id", res.data.user._id);
//       window.location.href = "/admin";
//     }

//   } catch (err) {
//     alert(err.response?.data || "Login failed");
//   }
// };
//   return (
//     <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
//       <h2>Login</h2>
//       <select value={form.role} onChange={(e) => setForm({...form, role: e.target.value})}>
//         <option value="customer">Customer</option>
//         <option value="staff">Staff</option>
//         <option value="admin">Admin</option>
//       </select>
//       <input placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}/>
//       <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})}/>
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }

// export default Login;














// import { useState } from "react";
// import API from "../api";

// function Login() {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     role: "customer"
//   });

//   const handleLogin = async () => {
//     try {
//       // backend login API call
//       const res = await API.post(`/${form.role}/login`, form);

//       // save token + role + user info in localStorage
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", form.role);

//       // staff/admin/customer user info
//       const userData = res.data.staff || res.data.user || res.data.admin;
//       localStorage.setItem("user", JSON.stringify(userData));
//       localStorage.setItem("id", userData._id);

//       // redirect based on role
//       if (form.role === "customer") {
//         window.location.href = "/";
//       } else if (form.role === "staff") {
//         window.location.href = "/staff";
//       } else if (form.role === "admin") {
//         window.location.href = "/admin/dashboard";
//       }

//     } catch (err) {
//       alert(err.response?.data || "Login failed");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
//       <h2>Login</h2>

//       {/* Role select */}
//       <select
//         value={form.role}
//         onChange={(e) => setForm({ ...form, role: e.target.value })}
//         style={{ width: "100%", marginBottom: 10, padding: 8 }}
//       >
//         <option value="customer">Customer</option>
//         <option value="staff">Staff</option>
//         <option value="admin">Admin</option>
//       </select>

//       {/* Email input */}
//       <input
//         type="email"
//         placeholder="Email"
//         value={form.email}
//         onChange={(e) => setForm({ ...form, email: e.target.value })}
//         style={{ width: "100%", marginBottom: 10, padding: 8 }}
//       />

//       {/* Password input */}
//       <input
//         type="password"
//         placeholder="Password"
//         value={form.password}
//         onChange={(e) => setForm({ ...form, password: e.target.value })}
//         style={{ width: "100%", marginBottom: 10, padding: 8 }}
//       />

//       <button
//         onClick={handleLogin}
//         style={{
//           width: "100%",
//           padding: 10,
//           backgroundColor: "#007bff",
//           color: "#fff",
//           border: "none",
//           cursor: "pointer"
//         }}
//       >
//         Login
//       </button>
//     </div>
//   );
// }

// export default Login;





import { useState } from "react";
import API from "../api";
import "../index.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "", role: "customer" });
  const [forgotStep, setForgotStep] = useState(0); // 0=login,1=email,2=reset
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ==== Login Handler ====
  const handleLogin = async () => {
    if (!form.email || !form.password) return alert("Fill all fields");
    try {
      const res = await API.post(`/${form.role}/login`, form);
      const userData = res.data.staff || res.data.user || res.data.admin;

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", form.role);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("id", userData._id);

      if (form.role === "customer") window.location.href = "/";
      else if (form.role === "staff") window.location.href = "/staff";
      else if (form.role === "admin") window.location.href = "/admin/dashboard";
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || err.message;
      alert(msg);
    }
  };

  const handleForgotEmail = async () => {
    if (!resetEmail) return alert("Enter your email");
    try {
      await API.post("/auth/forgot-password", { email: resetEmail });
      alert("Email verified! Set your new password now.");
      setForgotStep(2);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || err.message;
      alert(msg);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) return alert("Fill all fields");
    if (newPassword !== confirmPassword) return alert("Passwords do not match");
    try {
      await API.post("/auth/reset-password", { email: resetEmail, newPassword });
      alert("Password updated successfully! Login now.");
      setForgotStep(0);
      setNewPassword("");
      setConfirmPassword("");
      setResetEmail("");
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || err.message;
      alert(msg);
    }
  };

  // ==== Card Style ====
  const cardStyle = {
    maxWidth: 400,
    margin: "50px auto",
    padding: 30,
    borderRadius: 12,
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    fontFamily: "Arial, sans-serif",
  };

  const inputStyle = { width: "100%", padding: 10, marginBottom: 12, borderRadius: 6, border: "1px solid #ccc" };
  const buttonStyle = { width: "100%", padding: 12, borderRadius: 6, border: "none", backgroundColor: "#007bff", color: "#fff", cursor: "pointer", fontWeight: "bold" };
  const linkStyle = { color: "#007bff", cursor: "pointer", textAlign: "center", display: "block", marginTop: 15, fontSize: 14 };

  return (
    <div style={cardStyle}>
      {forgotStep === 0 && (
        <>
          <h2 style={{ textAlign: "center", marginBottom: 20 }}>Login</h2>

          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} style={inputStyle}>
            <option value="customer">Customer</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>

          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
          <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={inputStyle} />

          <button onClick={handleLogin} style={buttonStyle}>Login</button>
          <span style={linkStyle} onClick={() => setForgotStep(1)}>Forgot Password?</span>

          <p style={{ textAlign: "center", marginTop: 20, fontSize: 14 }}>
            Don't have an account? <span style={{ color: "#007bff", cursor: "pointer" }} onClick={() => window.location.href = "/register"}>Register</span>
          </p>
        </>
      )}

      {forgotStep === 1 && (
        <>
          <h2 style={{ textAlign: "center", marginBottom: 20 }}>Forgot Password</h2>
          <input type="email" placeholder="Enter your registered email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} style={inputStyle} />
          <button onClick={handleForgotEmail} style={buttonStyle}>Verify Email</button>
          <span style={linkStyle} onClick={() => setForgotStep(0)}>Back to Login</span>
        </>
      )}

      {forgotStep === 2 && (
        <>
          <h2 style={{ textAlign: "center", marginBottom: 20 }}>Reset Password</h2>
          <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={inputStyle} />
          <input type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={inputStyle} />
          <button onClick={handleResetPassword} style={buttonStyle}>Set New Password</button>
          <span style={linkStyle} onClick={() => setForgotStep(0)}>Back to Login</span>
        </>
      )}
    </div>
  );
}

export default Login;