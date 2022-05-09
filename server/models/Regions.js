module.exports = (sequelize, DataTypes) => {
    const Regions = sequelize.define("Regions", {
        regionTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Regions.associate = (models) => {

        Regions.hasMany(models.Departments, {
            foreignKey: 'RegionId',
            onDelete: "cascade",
        });

        Regions.hasMany(models.Numbers, {
            foreignKey: 'RegionId',
            onDelete: "cascade",
        });
    };

    return Regions;
};