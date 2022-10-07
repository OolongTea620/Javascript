const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        age: {
          type: Sequelize.TINYINT.UNSIGNED,
          allowNull: false,
        },
        married: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        // 모델에 대한 설정
        sequelize,
        timestamps: false, // true라면 createdAt, updatedAt 둘 다 넣어줌
        underscored: false, // true 라면 created_at false라면 createdAt, foreign key도 snake_case로 만들어줌
        modelName: "User",
        tableName: "users", // 직접 지정하지 않으면 modelName을 전부 소문자로 만들어서 복수형으로 만들어서 테이블명을 만들어줌
        paranoid: false, //  true면 deleted_at까지 만들어줌
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    //comment라는 모델중 commenter라는 컬럼에서 지금 내 모델(User)의 id컬럼을 참조하고 있다.
    db.User.hasMany(db.Comment, { foreignKey: "commenter", sourceKey: "id" });
    //  foreignKey : "외래키 이름", sourceKey : 참조하려는 User테이블의 컬럼 명
  }
};
