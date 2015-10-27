"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('ember-computed-property-bug/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'ember-computed-property-bug/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('ember-computed-property-bug/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'ember-computed-property-bug/config/environment'], function (exports, AppVersionComponent, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = AppVersionComponent['default'].extend({
    version: version,
    name: name
  });

});
define('ember-computed-property-bug/controllers/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    basket: null,

    emberVersion: Ember['default'].computed({
      get: function get() {
        return Ember['default'].VERSION;
      }
    }),

    hasBug: Ember['default'].computed('emberVersion', {
      get: function get() {
        return this.get('emberVersion') === '2.1.0';
      }
    }),

    actions: {
      refresh: function refresh() {
        this.get('basket').notifyPropertyChange('fruits.length');
      }
    }
  });

});
define('ember-computed-property-bug/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('ember-computed-property-bug/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('ember-computed-property-bug/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ember-computed-property-bug/config/environment'], function (exports, initializerFactory, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = {
    name: 'App Version',
    initialize: initializerFactory['default'](name, version)
  };

});
define('ember-computed-property-bug/initializers/export-application-global', ['exports', 'ember', 'ember-computed-property-bug/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('ember-computed-property-bug/models/basket', ['exports', 'ember-data', 'ember'], function (exports, DS, Ember) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    fruits: DS['default'].hasMany('fruit'),
    fruitList: Ember['default'].computed('fruits.length', 'fruits.@each.name', {
      get: function get() {
        return this.get('fruits').map(function (fruit) {
          return fruit.get('name');
        }).join(', ');
      }
    })
  });

});
define('ember-computed-property-bug/models/fruit', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    basket: DS['default'].belongsTo('basket'),
    name: DS['default'].attr('string')
  });

});
define('ember-computed-property-bug/router', ['exports', 'ember', 'ember-computed-property-bug/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {});

  exports['default'] = Router;

});
define('ember-computed-property-bug/routes/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var FRUITS = ['apple', 'orange', 'banana', 'grape', 'watermelon'];

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return this.store.createRecord('basket', {
        fruits: []
      });
    },

    setupController: function setupController(ctrl, model) {
      ctrl.set('basket', model);
    },

    afterModel: function afterModel(model) {
      var _this = this;

      var fruits = model.get('fruits'),
          fruitObj = undefined;

      FRUITS.forEach(function (fruit) {
        fruitObj = _this.store.createRecord('fruit', {
          name: fruit
        });
        fruits.pushObject(fruitObj);
      });

      Ember['default'].run.later(function () {
        //setting the last object name
        fruits.get('firstObject').set('name', 'grapefruit');
        fruitObj.set('name', 'kiwi');
      }, 300);
    }
  });

});
define('ember-computed-property-bug/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 0
            }
          },
          "moduleName": "ember-computed-property-bug/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          var el2 = dom.createTextNode("See the bug? Hit Refresh");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [
          ["element","action",["refresh"],[],["loc",[null,[5,10],[5,30]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "topLevel": false,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 7
          }
        },
        "moduleName": "ember-computed-property-bug/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        dom.setAttribute(el1,"id","title");
        var el2 = dom.createTextNode("Fruits (Ember VERSION ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(")");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\"");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\"\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),1,1);
        morphs[1] = dom.createMorphAt(fragment,2,2,contextualElement);
        morphs[2] = dom.createMorphAt(fragment,4,4,contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["content","emberVersion",["loc",[null,[1,37],[1,53]]]],
        ["content","basket.fruitList",["loc",[null,[2,1],[2,21]]]],
        ["block","if",[["get","hasBug",["loc",[null,[4,6],[4,12]]]]],[],0,null,["loc",[null,[4,0],[6,7]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('ember-computed-property-bug/tests/app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('app.js should pass jshint', function(assert) { 
    assert.ok(true, 'app.js should pass jshint.'); 
  });

});
define('ember-computed-property-bug/tests/controllers/application.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/application.js should pass jshint', function(assert) { 
    assert.ok(true, 'controllers/application.js should pass jshint.'); 
  });

});
define('ember-computed-property-bug/tests/helpers/resolver', ['exports', 'ember/resolver', 'ember-computed-property-bug/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('ember-computed-property-bug/tests/helpers/resolver.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/resolver.js should pass jshint', function(assert) { 
    assert.ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('ember-computed-property-bug/tests/helpers/start-app', ['exports', 'ember', 'ember-computed-property-bug/app', 'ember-computed-property-bug/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('ember-computed-property-bug/tests/helpers/start-app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/start-app.js should pass jshint', function(assert) { 
    assert.ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('ember-computed-property-bug/tests/models/basket.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/basket.js should pass jshint', function(assert) { 
    assert.ok(true, 'models/basket.js should pass jshint.'); 
  });

});
define('ember-computed-property-bug/tests/models/fruit.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/fruit.js should pass jshint', function(assert) { 
    assert.ok(true, 'models/fruit.js should pass jshint.'); 
  });

});
define('ember-computed-property-bug/tests/router.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('router.js should pass jshint', function(assert) { 
    assert.ok(true, 'router.js should pass jshint.'); 
  });

});
define('ember-computed-property-bug/tests/routes/application.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/application.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/application.js should pass jshint.'); 
  });

});
define('ember-computed-property-bug/tests/test-helper', ['ember-computed-property-bug/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('ember-computed-property-bug/tests/test-helper.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('test-helper.js should pass jshint', function(assert) { 
    assert.ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('ember-computed-property-bug/tests/unit/controllers/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
define('ember-computed-property-bug/tests/unit/controllers/application-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers');
  QUnit.test('unit/controllers/application-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/controllers/application-test.js should pass jshint.'); 
  });

});
define('ember-computed-property-bug/tests/unit/models/basket-test', ['ember-qunit', 'ember'], function (ember_qunit, Ember) {

  'use strict';

  ember_qunit.moduleForModel('basket', 'Unit | Model | basket', {
    // Specify the other units that are required for this test.
    needs: ['model:fruit']
  });

  ember_qunit.test('it returns list', function (assert) {
    var store = this.store();
    var model = this.subject({
      fruits: []
    });
    var fruits = model.get('fruits');
    var fruit2 = null;

    Ember['default'].run(function () {
      fruit2 = store.createRecord('fruit', {
        name: 'orange'
      });
    });

    Ember['default'].run(function () {
      fruits.pushObject(store.createRecord('fruit', {
        name: 'apple'
      }));

      fruits.pushObject(fruit2);
    });

    assert.equal(model.get('fruitList'), "apple, orange");

    Ember['default'].run(function () {
      fruit2.set('name', 'banana');
    });

    assert.equal(model.get('fruitList'), "apple, banana");
  });

});
define('ember-computed-property-bug/tests/unit/models/basket-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/basket-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/models/basket-test.js should pass jshint.'); 
  });

});
define('ember-computed-property-bug/tests/unit/routes/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:application', 'Unit | Route | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('ember-computed-property-bug/tests/unit/routes/application-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/application-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/application-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('ember-computed-property-bug/config/environment', ['ember'], function(Ember) {
  var prefix = 'ember-computed-property-bug';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("ember-computed-property-bug/tests/test-helper");
} else {
  require("ember-computed-property-bug/app")["default"].create({"name":"ember-computed-property-bug","version":"0.0.0+3dc14646"});
}

/* jshint ignore:end */
//# sourceMappingURL=ember-computed-property-bug.map