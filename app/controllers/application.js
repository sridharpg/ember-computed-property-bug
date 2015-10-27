import Ember from 'ember';

export default Ember.Controller.extend({
  basket: null,

  emberVersion: Ember.computed({
  	get: function() {
      return Ember.VERSION;
  	}
  }),

  fruitList: Ember.computed('basket.fruits.length', 'basket.fruits.@each.name', {
    get: function() {
      return this.get('basket.fruits').map((fruit) => {
        return fruit.get('name');
      }).join(', ');
    }
  }),

  hasBug: Ember.computed('emberVersion', {
  	get: function() {
      return this.get('emberVersion') === '2.1.0';
  	}
  }),

  actions: {
    refresh: function () {
      this.notifyPropertyChange('basket.fruits.length');
    }
  }
});
