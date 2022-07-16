
function getOn(fake, action) {
  return fake.on.mock.calls.find(function(args) {
    return args[0] === action
  })[1];
}

module.exports = {
  getOn
}
