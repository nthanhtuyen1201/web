module.exports = (roles = []) => {
  return (req, res, next) => {
    const user = req.headers["x-user"] ? JSON.parse(req.headers["x-user"]) : null;
    if (!user || (roles.length && !roles.includes(user.role))) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    next();
  };
};
