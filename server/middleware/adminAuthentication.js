const asyncHandler = require("express-async-handler");
const { getUser, notAuthorizedMessage } = require("./helpers/user.js");

const protectAdmin = asyncHandler(async (req, res, next) => {
  const { status, response } = await getUser(req);

  if (status === 200) {
    if (response.role == "admin") {
      req.user = response;
      next();
    } else {
      res.status(status, response);
    }
  }
});

module.exports = protectAdmin;
