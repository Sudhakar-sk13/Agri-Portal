const jwt_decode = require("jwt-decode");
function verifyToken(token) {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let tokenConvert = token;
  if (!tokenConvert) return "Unauthorize user";
  try {
    const decoded = jwt_decode(tokenConvert, jwtSecretKey);
    let exprieTime = decoded.exp;
    var dateNow = new Date();
    let time = dateNow.getTime() / 1000;
    if (exprieTime > time) {
      return 0;
    } else {
      // return "Token is not vaild";
      return 0;
    }
  } catch (e) {
    return 0;
  }
}
module.exports = verifyToken;
