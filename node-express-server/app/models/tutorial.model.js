module.exports = (sequelize, Sequelize) => {
  const Itinerary = sequelize.define("itinerary", {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT, 
      allowNull: true
    },
    published: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });

  return Itinerary;
};