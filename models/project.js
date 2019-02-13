module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define("Project", {
    client_name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    project_name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    project_description: {
      type: DataTypes.STRING,
      allowNull: false
    },

    start_budget: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    remain_budget: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    project_length: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    desired_skills: {
      type: DataTypes.STRING,
      allowNull: false
    },
    project_complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });
  Project.associate = function(models) {
    Project.hasMany(models.Dev, {
      onDelete: "cascade"
    });
  };
  return Project;
};
