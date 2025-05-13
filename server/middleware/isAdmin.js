export const isAdmin = (request, response, next) => {
  const user = request.user; // Assuming user is populated by previous auth middleware

  if (!user || user.role?.toLowerCase() !== 'admin') {
    return response.status(403).json({
      success: false,
      message: 'Access denied. Admins only.',
    });
  }

  next();
};
