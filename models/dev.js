module.exports = function(sequelize, DataTypes) {
    var Dev = sequelize.define("Dev", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      rate: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
  
      offered_skills: {
        type: DataTypes.STRING,
        allowNull: false
      },
  
      portfolio_links: {
        type: DataTypes.STRING
      }
    });
  
    Dev.associate = function(models) {
      Dev.belongsTo(models.Project, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Dev;
  };