module.exports = function (sequelize, DataTypes) {
    var Guest = sequelize.define("Guest", {
        email: DataTypes.STRING
    });
    return Guest;
};
