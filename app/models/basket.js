import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  fruits: DS.hasMany('fruit')
});
