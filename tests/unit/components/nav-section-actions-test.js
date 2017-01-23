import { expect } from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'

describeComponent(
  'nav-section-actions',
  'NavSectionActionsComponent',
  {
    // Specify the other units that are required for this test
    needs: ['component:frost-icon', 'helper:hook'],
    unit: true
  },
  function () {
    it('renders', function () {
      // creates the component instance
      let component = this.subject()
      // renders the component on the page
      component.set('goBack', function () {})
      this.render()
      expect(component).to.be.ok
      expect(this.$()).to.have.length(1)
    })
  }
)
