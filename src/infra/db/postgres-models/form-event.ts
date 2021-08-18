
export default (sequelize, _DataTypes) => {
  const FormEvent = sequelize.define('formEvent',
    {
      timestamps: false,
      tableName: 'forms',
    },
  );

  FormEvent.associate = (models) => {
    models.Form.belongsToMany(models.Event, {
      as: 'events',
      through: FormEvent,
      foreignKey: 'eventid',
      otherKey: 'id',
    });
    models.Event.belongsToMany(models.Form, {
      as: 'forms',
      through: FormEvent,
      foreignKey: 'id',
      otherKey: 'eventid',
    });
  };

  return FormEvent;
};