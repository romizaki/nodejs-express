const jwt = require("jsonwebtoken");

class JwtRepository {
  static generateToken(payload, expiresIn = '5m') {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn }, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }
}

module.exports = JwtRepository;
