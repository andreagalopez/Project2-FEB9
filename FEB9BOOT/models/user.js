const bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    });

  User.associate = (models) => {

    User.hasMany(models.Events, {
      onDelete: "cascade"
    });
  };    

  User.prototype.login = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  return User;
};
