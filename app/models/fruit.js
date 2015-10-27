import DS from 'ember-data';

export default DS.Model.extend({
  basket: DS.belongsTo('basket'),
  name: DS.attr('string')
});
