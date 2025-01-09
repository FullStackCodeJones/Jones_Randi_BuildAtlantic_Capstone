const jwt = require("jsonwebtoken");

//The Middleware To Verify Token

function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; //This Extracts The Token From Authorization Header
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No Token Provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //Verifies the token
    req.user = decoded; // Attach the decoded user data to the request
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or Expired Token." });
  }
}

// Middleware To Check The Admins Role

function authorizeAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access Denied. Build Atlantic Admins Only." });
  }
  next();
}

module.exports = { authenticateToken, authorizeAdmin };

//In the solution, the authenticateToken function extracts the token from the Authorization header and verifies its validity using jwt.verify. If the token is valid, it attaches the decoded user data to the request using req.user. The authorizeAdmin function checks if the user has the admin role before allowing access to the requested route.
