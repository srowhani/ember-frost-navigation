import Ember from 'ember'
const {
  Controller,
  Logger: {
    log
  },
  inject: {
    service
  },
  get,
  set
} = Ember
// BEGIN-SNIPPET controller
export default Controller.extend({
  count: 0,
  frostNavigation: service(),
  notifier: service(),
  _notify (type, message) {
    get(this, 'notifier').addNotification({
      message,
      type,
      autoClear: true,
      clearDuration: 1200
    })
  },
  init () {
    this._super(...arguments)
    let customRouteObject = Ember.Object.extend({}).create({
      description: 'custom route',
      icon: 'application',
      pack: 'frost-nav',
      name: 'Custom Route',
      route: 'demo.test',
      routeModels: ['id0'],
      routeQueryParams: {count: 0}
    })
    set(this, 'customRouteObject', customRouteObject)
    let columns = [
      [
        {
          title: 'Custom Column',
          routes: [
            customRouteObject
          ]
        }
      ]
    ]
    get(this, 'frostNavigation.categories').push({
      name: 'Custom Category',
      columns
    })
  },
  actions: {
    myAction (item) {
      this._notify(
        'success',
        `Item '${item.action}' fired`
      )
      log(item)
    },
    incrementCount () {
      let count = get(this, 'count') + 1

      set(this, 'count', count)

      set(this, 'customRouteObject.routeModels', [`id${count}`])
      set(this, 'customRouteObject.routeQueryParams', {count})
    }
  }
})
// END-SNIPPET
