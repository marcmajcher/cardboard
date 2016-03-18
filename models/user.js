function User(profile) {
  this.provider = profile.provider;
  this.remoteId = profile.id;
  this.fullName = profile.displayName;
  this.firstName = profile.givenName;
  this.LastName = profile.familyName;
  this.email = profile.emails[0].value;
}

User.prototype.save = function() {

};

module.exports = User;
