// const jwt = require("jsonwebtoken");

// exports.auth = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader)
//     return res.status(401).json({ message: "No token provided" });

//   const token = authHeader.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Invalid token" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // {id, role}
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// // Role check
// exports.authorize = (...roles) => (req, res, next) => {
//   if (!roles.includes(req.user.role))
//     return res.status(403).json({ message: "Access denied" });
//   next();
// };






// const jwt = require("jsonwebtoken");

// exports.auth = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).json("No token provided");

//   const token = authHeader.split(" ")[1]; // Bearer <token>
//   if (!token) return res.status(401).json("Invalid token");

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // {id, role}
//     next();
//   } catch (err) {
//     res.status(401).json("Invalid token");
//   }
// };

// exports.authorize = (...roles) => (req, res, next) => {
//   if (!roles.includes(req.user.role)) return res.status(403).json("Access denied");
//   next();
// };











const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json("No token provided");

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json("Invalid token");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json("Invalid token");
  }
};

exports.authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.status(403).json("Access denied");
  next();
};