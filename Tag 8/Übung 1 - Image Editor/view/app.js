const { ipcRenderer } = require( 'electron' );

$( '#menu' ).dialog();

$( '#openfile' ).on( 'click', function(e) {
    e.preventDefault();
    ipcRenderer.send( 'openfile' );
})

$( '#savefile' ).on( 'click', function(e) {
    e.preventDefault();
    ipcRenderer.send( 'savefile', $('canvas').get(0).toDataURL()  );
})


ipcRenderer.on( 'filestoopen', (event,files) => {
    console.log( 'file?', files[0] );

    // lade Image
    var img = new Image();
    img.src = files[0];
    img.onload = function() {

        var canvas =  $('<canvas>')
            .attr( {
                width: img.width,
                height: img.height
            }  )  
            .css({width:'100%',height:'auto'});

        $( '<div>' )
        .append( 
            canvas
        )
        .appendTo( 'body' )
        .dialog({
            width:500
        });
    
        var ctx = canvas.get(0).getContext('2d');

        ctx.scale( -1,1 );
        ctx.drawImage( img, -img.width , 0);
        ctx.scale( -1,1 );    
    
    }


  
})