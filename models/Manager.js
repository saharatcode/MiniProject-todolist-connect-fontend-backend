module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Manager', {
        name: {
            type: DataTypes.STRING(255)
        },
        experience: {
            type: DataTypes.INTEGER
        },
    }, {
        tableName: 'managers'
    });
    return model;
}