module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Branch', {
        name: {
            type: DataTypes.STRING(255)
        },
        size: {
            type: DataTypes.STRING(2)
        },
    }, {
        tableName: 'Branch'
    });
    return model;
}