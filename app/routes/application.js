import Ember from 'ember';

const FRUITS = ['apple', 'orange', 'banana', 'grape', 'watermelon'];

export default Ember.Route.extend({
  model: function () {
    return this.store.createRecord('basket', {
      fruits: []
    });
  },

  setupController: function (ctrl, model) {
    ctrl.set('basket', model);
  },

  afterModel: function (model) {
    let fruits = model.get('fruits'),
      fruitObj;

    FRUITS.forEach((fruit) => {
      fruitObj = this.store.createRecord('fruit', {
        name: fruit
      });
      fruits.pushObject(fruitObj);
    });

    Ember.run.later(function() {
      //setting the last object name
      fruits.get('firstObject').set('name', 'grapefruit');
      fruitObj.set('name', 'kiwi');
    }, 300);
  }
});
