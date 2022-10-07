const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

const User = require("../models/user");

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID, //카카오 아이디
        callbackURL: "/auth/kakao/callback", //콜 백
      },
      async (accessToken, refreshToken, profile, done) => {
        // OAUTH2에서 사용
        console.log("kakao profile", profile);
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "kakao" },
          }); // 이미 등록한 가입자인지 확인
          if (exUser) {
            done(null, exUser);
          } else {
            // 미가입자인경우 -> 회원가입 시키기
            const newUser = await User.create({
              email: profile._json && profile._json.kakao_account_email,
              nick: profile.displayName,
              snsId: profile.id,
              provider: "kakao",
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
