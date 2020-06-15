class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
  }

  init() {
    this.view.addUserEvent.attach(this.addUser.bind(this));
    this.view.sortUsersEvent.attach(this.sortUsers.bind(this));
  }

  addUser(sender, data) {
    this.model.addUser(data);
  }

  sortUsers(sender) {
    this.model.sortUsers();
  }
}
