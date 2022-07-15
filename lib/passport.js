const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { User } = require("../models");

const { JWT_SECRET } = process.env;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};
passport.use(
  new JwtStrategy(options, async (payload, done) => {
    User.findByPk(payload.id)
      .then((user) => done(null, user))
      .catch((err) => done(err, null));
  })
);
module.exports = passport;
