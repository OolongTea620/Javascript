const passport = require("passport");
const User = require("../models/user");
const local = require("./localStrategy");
const kakao = require("./localStrategy");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ["id", "nick"],
          as: "Followers",
        },
        {
          model: User,
          attributes: ["id,", "nick"],
          as: "Followings",
        },
      ],
    })
      .then((user) => done(null, user)) // req.user, req.isAuthenticated() (로그인 시  true 나옴)
      .catch((err) => done(err));
  });

  local();
  kakao();
};
