const Sequelize = require('sequelize');

class BoardGroup extends Sequelize.Model {
  static initiate(sequelize) {
    BoardGroup.init(
      {
        boardGroupId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        boardId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        collaborator: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        permission: {
          type: Sequelize.ENUM('write', 'readonly'),
          allowNull: false,
          defaultValue: 'readonly',
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'BoardGroup',
        tableName: 'boardgroups',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.BoardGroup.belongsTo(db.User, {
      foreignKey: 'collaborator',
      targetKey: 'userId',
    });
    db.BoardGroup.belongsTo(db.Board, {
      foreignKey: 'boardId',
      sourceKey: 'boardId',
    });
  }
}

module.exports = BoardGroup;
