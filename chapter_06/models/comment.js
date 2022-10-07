const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        comment: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        create_at: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: sequelize.NOW,
        },
      },
      {
        // 모델에 대한 설정
        sequelize,
        timestamps: false, // true라면 createdAt, updatedAt 둘 다 넣어줌
        modelName: "Comment",
        tableName: "comments", // 직접 지정하지 않으면 modelName을 전부 소문자로 만들어서 복수형으로 만들어서 테이블명을 만들어줌
        paranoid: false, //  true면 deleted_at까지 만들어줌
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Comment.belongsTo(db.User, {
      foreignKey: "commenter",
      targetKey: "id",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  }
};
