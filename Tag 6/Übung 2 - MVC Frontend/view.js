class View {
  constructor(model) {
    this.model = model;
    this.addUserEvent = new MVCEvent(this);
    this.sortUsersEvent = new MVCEvent(this);

    this.model.addUserEvent.attach(
      function (sender, data) {
        this.buildList();
      }.bind(this),
    );

    this.model.sortUsersEvent.attach(
      function (sender, data) {
        this.buildList();
      }.bind(this),
    );

    this.init();
  }

  init() {
    this.getElements().setupHandlers().enable();
  }

  getElements() {
    this.$username = $('#username');
    this.$btn_add = $('#btn_add');
    this.$btn_sort = $('#btn_sort');
    this.$userlist = $('ul#userliste');
    return this;
  }

  setupHandlers() {
    this.addUserButtonHandler = this.addUserButton.bind(this);
    this.sortUsersButtonHandler = this.sortUsersButton.bind(this);
    return this;
  }

  enable() {
    this.$btn_add.on('click', this.addUserButtonHandler);
    this.$btn_sort.on('click', this.sortUsersButtonHandler);
  }

  addUserButton() {
    this.addUserEvent.notify(this.$username.val());
  }

  sortUsersButton() {
    this.sortUsersEvent.notify();
  }

  buildList() {
    this.$userlist.empty();
    let allusers = this.model.getUsers();
    for (let i in allusers) {
      $('<li>').appendTo(this.$userlist).html(allusers[i]);
    }
  }
}
