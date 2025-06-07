import jwt from "jsonwebtoken";

export const authenticateToken = (request, response, next) => {
  const authHeader = request.headers["authorization"];
  // console.log(request.headers,'token');
  const token = authHeader && authHeader.replace(/^"(.*)"$/, "$1");

  // if (!token) {
  //     return response.status(401).json({ error: 'Token is missing' });
  // }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      if (error.name === "TokenExpiredError") {
        return response.status(401).json({ error: "Token has expired" });
      }
      return response.status(403).json({ error: "Invalid token" });
    }

    // If token verification is successful, attach the user object to the request
    request.user = user;
    // console.log("Authenticated user ID:", user._id);
    next();
  });
};

export const protectRoute = async (req, res, next) => {
  if (!req.auth.userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized - you must be logged in" });
  }
  next();
};
