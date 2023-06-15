module.exports = (error, req, res, next) => {
  let message = "Internal Server Error";
  let status = 500;

  switch (error.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = error.errors[0].message;
      break;

    case "Invalid Email/Password":
      status = 401;
      message = "Invalid Email/Password";
      break;
    case "Email is required":
      status = 400;
      message = "Email is required";
      break;
    case "Password is required":
      status = 400;
      message = "Password is required";
      break;
    case "Unauthenticated":
    case "JsonWebTokenError":
      status = 401;
      message = "Unauthenticated";
      break;
    case "Task Not Found":
      status = 404;
      message = "Task Not Found";
      break;
    default:
      message = "Internal Server Error";
      status = 500;
      break;
  }
  res.status(status).json({ message: message });
};
