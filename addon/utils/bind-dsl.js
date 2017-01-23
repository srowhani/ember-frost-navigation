import Asserts from './asserts'
import Ember from 'ember'

const {
  RouterDSL,
  assert
} = Ember

const {
  CATEGORY,
  COLUMN,
  SECTION,
  APP,
  ROUTE,
  ENGINE,
  ACTION,
  ACTION_CONFIG,
  LINK
} = Asserts

export default {
  init (navigation) {
    let argify = function () {
      let r = {}
      let args = [].slice.call(arguments)
      args.forEach(e => {
        r[typeof e] = e
      })
      return r
    }
    let proto = RouterDSL.prototype
    let obj = {}

    /**
     * Initializes the navigation bar
     * @parent RouterDSL
     * @param {string} config.dialogClass class to apply to liquid-modal
     * @param {object} config.actions actions to pass up to liquid-modal
     * @param {array} config.model predefined model to be rendered
     */
    proto.nav = function () {
      let args = argify(...arguments)
      let self = this
      ;(function (name, config = {}, callback = function () {}) {
        if (config.model) {
          config.model.forEach(function (e) {
            navigation._registerCategory(e)
          })
        }
        let parent = {
          type: 'nav',
          name,
          config
        }
        callback.call({
          category: obj.category.bind({
            top: parent,
            parent,
            DSL: self
          })
        })
      })(args.string, args.object, args.function)
    }
    /**
     * Category as a navigation bar entry
     * @parent {type:nav}
     * @param {string} config.icon icon
     * @param {string} config.pack icon pack
     * @param {array} config.model predefined category model
     */
    obj.category = function () {
      let args = argify(...arguments)
      let self = this
      assert(CATEGORY, self.parent.type === 'nav')
      ;(function (name, config = {}, callback = function () {}) {
        let category = navigation._registerCategory({
          name,
          icon: config.icon,
          pack: config.pack || 'frost',
          columns: config.model || [],
          isVisible: config.isVisible !== false
        })
        callback.call({
          column: obj.column.bind({
            top: self.top,
            parent: {
              type: 'category',
              name,
              config
            },
            element: category,
            DSL: self.DSL
          })
        })
      })(args.string, args.object, args.function)
    }
    /**
     * Creates a column viewable within a category
     * @parent {type:category}
     * @param {string} config.color color
     * @param {array} config.routes predefined routes array
     * @param {array} config.actions predefined actions array
     */
    obj.column = function () {
      let args = argify(...arguments)
      let self = this
      assert(COLUMN, self.parent.type === 'category')
      ;(function (name, config = {}, callback = function () {}) {
        if (self.element) {
          let c
          self.element.columns.push(c = [
            {
              title: name,
              color: config.color || '#009eef',
              routes: config.routes || [],
              actions: config.actions || [],
              isVisible: config.isVisible !== false
            }
          ])
          let o = {
            top: self.top,
            parent: {
              type: 'column',
              name,
              config
            },
            element: c,
            DSL: self.DSL
          }
          callback.call({
            section: obj.section.bind(o),
            app: obj.app.bind(o),
            engine: obj.engine.bind(o),
            action: obj.action.bind(o),
            link: obj.link.bind(o)
          })
        }
      })(args.string, args.object, args.function)
    }
    /**
     * Creates a section under within a category
     * @parent {type:category}
     * @param {string} config.color color
     * @param {array} config.routes predefined routes array
     * @param {array} config.actions predefined actions array
     */
    obj.section = function () {
      let args = argify(...arguments)
      let self = this
      assert(SECTION, self.parent.type === 'column')
      ;(function (name, config = {}, callback = function () {}) {
        let c
        self.element.push(c = {
          title: name,
          color: config.color || '#009eef',
          routes: config.routes || [],
          actions: config.actions || [],
          isVisible: config.isVisible !== false
        })
        let o = {
          top: self.top,
          parent: {
            type: 'section',
            name,
            config
          },
          element: c,
          DSL: self.DSL
        }
        callback.call({
          app: obj.app.bind(o),
          action: obj.action.bind(o),
          engine: obj.engine.bind(o),
          link: obj.link.bind(o)
        })
      })(args.string, args.object, args.function)
    }
    /**
     * Creates a routable route instance
     * @parent {type:[column, section]}
     * @param {string} config.description description
     * @param {string} config.icon icon
     * @param {string} config.pack icon pack
     * @param {string} config.route route to navigate to
     */
    obj.app = function () {
      let args = argify(...arguments)
      let self = this
      assert(APP, self.parent.type === 'section' || self.parent.type === 'column')
      ;(function (name, config = {}, callback = function () {}) {
        assert(ROUTE, config.route)

        let e = self.parent.type === 'section' ? self.element.routes : self.element[0].routes
        e.push({
          name,
          description: config.description,
          icon: config.icon,
          pack: config.pack || 'frost',
          route: config.route,
          routeQueryParams: config.routeQueryParams,
          routeModels: config.routeModels,
          isVisible: config.isVisible !== false
        })
        callback.call({
          parent: {
            type: 'app',
            name,
            config
          }
        })
      })(args.string, args.object, args.function)
    }
    /**
     * Creates a routable engine instance
     * @parent {type:[column, section]}
     * @param {string} config.package package name for engine
     * @param {string} config.route route name for nav entry
     * @param {string} config.description description
     * @param {string} config.icon icon
     * @param {string} config.pack icon pack
     */
    obj.engine = function () {
      let args = argify(...arguments)
      let self = this
      assert(ENGINE, self.parent.type === 'section' || self.parent.type === 'column')
      ;(function (name, config = {}, callback = function () {}) {
        assert(ROUTE, config.route)
        config.as = config.as || config.route
        let e = self.parent.type === 'section' ? self.element.routes : self.element[0].routes
        e.push({
          name,
          description: config.description,
          icon: config.icon,
          pack: config.pack || 'frost',
          route: config.route,
          routeQueryParams: config.routeQueryParams,
          routeModels: config.routeModels,
          isVisible: config.isVisible !== false
        })
        callback.call({
          parent: {
            type: 'app',
            name,
            config
          }
        })
      })(args.string, args.object, args.function)
    }
    /**
     * Creates a menu item that serves as an action,
     * without performing a transition
     * @parent {type:[column, section]}
     * @param {string} config.description description
     * @param {string} config.icon icon
     * @param {string} config.pack icon pack
     * @param {string} config.action key for action on controller
     * @param {boolean} config.dismiss flag to dismiss modal after click
     */
    // FIXME: refactor to reduce complexity
    /* eslint complexity: [2, 6] */
    obj.action = function () {
      let args = argify(...arguments)
      let self = this
      let type = self.parent.type
      assert(ACTION, type === 'section' || type === 'column')
      ;(function (name, config = {}, callback = function () {}) {
        assert(ACTION_CONFIG, config.action)
        let e
        if (config.inline) {
          e = self.parent.type === 'section' ? self.element.routes : self.element[0].routes
        } else {
          e = self.parent.type === 'section' ? self.element.actions : self.element[0].actions
        }
        e.push({
          name,
          description: config.description,
          icon: config.icon,
          pack: config.pack || 'frost',
          action: config.action,
          dismiss: config.dismiss || true,
          isVisible: config.isVisible !== false
        })
        callback.call({
          parent: {
            type: 'action',
            name,
            config
          }
        })
      })(args.string, args.object, args.function)
    }
    /**
     * Creates a link accessible from frost-navigation
     * @parent {type:[column, section]}
     * @param {string} config.description description
     * @param {string} config.icon icon
     * @param {string} config.pack icon pack
     * @param {string} config.route navigate to route without registering on DSL
     * @param {string} config.url url to set href to
     * @param {boolean} config.tabbed flag to open in new tab
     */
    obj.link = function () {
      let args = argify(...arguments)
      let self = this
      assert(LINK, self.parent.type === 'section' || self.parent.type === 'column')
      ;(function (name, config = {}, callback = function () {}) {
        let e = self.parent.type === 'section' ? self.element.routes : self.element[0].routes
        e.push({
          name,
          description: config.description,
          icon: config.icon,
          pack: config.pack || 'frost',
          route: config.route,
          url: config.url || name,
          tabbed: config.tabbed || false,
          isVisible: config.isVisible !== false
        })
        callback.call({
          parent: {
            name,
            config
          }
        })
      })(args.string, args.object, args.function)
    }
  }
}
