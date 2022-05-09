module.exports = (sequelize, DataTypes) => {
    const Numbers = sequelize.define("Numbers", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        visible: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1,
        },
    });

    Numbers.associate = (models) => {
        
        Numbers.belongsTo(models.Regions, {
            foreignKey: 'RegionId',
            onDelete: "cascade",
        });

        Numbers.belongsTo(models.Departments, {
            foreignKey: 'DepartmentId',
            onDelete: "cascade",
        });
    };
 
    return Numbers;
};