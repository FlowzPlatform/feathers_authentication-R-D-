// Initializes the `users` service on path `/users`
const createService = require('./users.class.js');
const hooks = require('./users.hooks');
const filters = require('./users.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'users',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/users', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('users');

  function processGoogleProfile(hook) {
    console.log("hook",hook)
  // As an example extract the user email
  // if (hook.data.google) {
  //   hook.data.email = hook.data.github.profile.emails[0].value
  // }
  return Promise.resolve(hook)
}

  service.hooks({
     before: {
       create: [processGoogleProfile],
       update: [processGoogleProfile]
  }
  });

  if (service.filter) {
    service.filter(filters);
  }
};
