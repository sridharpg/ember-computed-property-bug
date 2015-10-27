import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  fruits: DS.hasMany('fruit'),
  fruitList: Ember.computed('fruits.length', 'fruits.@each.name', {
  	get: function() {
      return this.get('fruits').map((fruit) => {
        return fruit.get('name');
      }).join(', ');
  	}
  })
});
