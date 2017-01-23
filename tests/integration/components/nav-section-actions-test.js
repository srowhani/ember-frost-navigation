import { expect } from 'chai'
import sinon from 'sinon'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'nav-section-actions',
  'Integration: NavSectionActionsComponent',
  {
    integration: true
  },
  function () {
    it('renders', function () {
      this.render(hbs`{{nav-section-actions goBack=(action (mut showActions) false)}}`)
      expect(this.$()).to.have.length(1)
    })
    it('goes back on click', function () {
      let spy = sinon.spy()
      this.set('goBack', spy)
      this.render(hbs`{{nav-section-actions goBack=goBack}}`)
      this.$('.nav-section-header').click()
      expect(spy.called).to.be.true
    })
  }
)
