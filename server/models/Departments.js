
module.exports = (sequelize, DataTypes) => {
    const Departments = sequelize.define("Departments", {
        departmentTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        alias: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Departments.associate = (models) => {

        Departments.belongsTo(models.Regions, {
            foreignKey: 'RegionId',
            onDelete: "cascade",
        });

        Departments.hasMany(models.Numbers, {
            foreignKey: 'DepartmentId',
            onDelete: "cascade",
        });
    };
  
    return Departments;
};
