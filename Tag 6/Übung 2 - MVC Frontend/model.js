class Model {
    constructor() {
        this.users = [];
        this.addUserEvent = new MVCEvent(this);
    }

    getUsers() {
        return this.users;
    }

    addUser( username ) {
        this.users.push( username );
        this.addUserEvent.notify();
    }
}