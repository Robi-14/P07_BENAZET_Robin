'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class commentaires extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.commentaires.belongsTo(models.User, {foreignKey:{
        allowNull: false,
        name:'userId'
      },
      onDelete: 'cascade',

        
      })
      models.commentaires.belongsTo(models.Message, {foreignKey:{
        allowNull: false,
        name:'messageId'
      },
      onDelete: 'cascade',

        
      })


    }
  };
  commentaires.init({
    messageId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'commentaires',
  });
  return commentaires;
};