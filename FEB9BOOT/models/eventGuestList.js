module.exports = function (sequelize, DataTypes) {
    const EventGuestList = sequelize.define('EventGuestList', {
        guest_email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        guest_confirm: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    });
    
    EventGuestList.associate = (models) => {
        
        EventGuestList.belongsTo(models.Events, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    
    return EventGuestList;
}
