import { expect } from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'

describeComponent(
  'nav-action',
  'NavActionComponent',
  {
    // Specify the other units that are required for this test
    needs: ['component:frost-icon', 'helper:eq'],
    unit: true
  },
  function () {
    it('renders', function () {
      // creates the component instance
      let component = this.subject()
      // renders the component on the page
      this.render()
      expect(component).to.be.ok
      expect(component.getDefaultProps).to.be.a('array')
      expect(this.$()).to.have.length(1)
    })
  }
)
