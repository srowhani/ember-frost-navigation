import Ember from 'ember'
const {
  Service,
  inject: {
    service
  },
  get
} = Ember
export default Service.extend({
  posts: null,
  session: service('active-session'),
  init () {
    this._super(...arguments)

    this.posts = [
      {
        id: '1',
        title: 'Welcome to My Blog',
        author: 'dgeb',
        body: `
          <p>I hear blogging is the latest thing so I'm going to give this a go.</p>
          <p>Please leave some comments below.</p>
        `,
        comments: [
          {
            id: '101',
            author: 'rwjblue',
            comment: 'Good luck!'
          }
        ]
      },
      {
        id: '2',
        title: 'Closing this Thing Down',
        author: 'dgeb',
        body: `
          <p>Well, it's been a good run folks.</p>
          <p>Thanks for the memories.</p>
        `,
        comments: [
          {
            id: '102',
            author: 'rwjblue',
            comment: 'Too bad!'
          }
        ]
      }
    ]
  },
  add (title, body) {
    get(this, 'posts').push({
      id: this.posts.length,
      author: get(this, 'session.user'),
      title,
      body,
      comments: []
    })
  }
})
