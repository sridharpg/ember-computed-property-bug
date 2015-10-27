import Ember from 'ember';

export default Ember.Controller.extend({
  basket: null,

  emberVersion: Ember.computed({
  	get: function() {
      return Ember.VERSION;
  	}
  }),

  hasBug: Ember.computed('emberVersion', {
  	get: function() {
      return this.get('emberVersion') === '2.1.0';
  	}
  }),

  actions: {
    refresh: function () {
      this.get('basket').notifyPropertyChange('fruits.length');
    }
  }
});
