import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('basket', 'Unit | Model | basket', {
  // Specify the other units that are required for this test.
  needs: ['model:fruit']
});

test('it returns list', function(assert) {
  let store = this.store();
  let model = this.subject({
    fruits: []
  });
  let fruits = model.get('fruits');
  let fruit2 = null;

  Ember.run(function() {
    fruit2 = store.createRecord('fruit', {
      name: 'orange'
    });
  });

  Ember.run(function() {
    fruits.pushObject(
      store.createRecord('fruit', {
        name: 'apple'
      })
    );

    fruits.pushObject(fruit2);
  });

  assert.equal(model.get('fruitList'), "apple, orange");

  Ember.run(function() {
    fruit2.set('name', 'banana');
  });

  assert.equal(model.get('fruitList'), "apple, banana");
});
