class View {
    constructor( model ) {
        this.model = model;    
        this.addUserEvent = new MVCEvent( this );

        this.model.addUserEvent.attach( function(sender, data ) {
            this.buildList();
        }.bind(this) );

        this.init();

    }

    init() {
        this.getElements().setupHandlers().enable();
    }

    getElements() {
        this.$username = $( '#username' );
        this.$btn_add = $( '#btn_add' );        
        this.$userlist = $( 'ul#userliste' );
        return this;
    }

    setupHandlers() {
        this.addUserButtonHandler = this.addUserButton.bind(this);
        return this;
    }

    enable() {
        this.$btn_add.on( 'click', this.addUserButtonHandler );
    }

    addUserButton() {
        this.addUserEvent.notify( this.$username.val() );
    }


    buildList() {
        this.$userlist.empty();
        let allusers = this.model.getUsers();
        for ( let i in allusers ) {
            $( '<li>' )
                .appendTo( this.$userlist )
                .html( allusers[i] );
        }
    }

}