var starteApp = () => {

    // Canvas FullScreen
    $( '#imagefield' ).attr({
        width:$(window).width(),
        height:$(window).height()
    }).on( 'touchstart', e => {
        paintDot( e.originalEvent.touches[0].clientX, e.originalEvent.touches[0].clientY  );
    });

    var ctx =  $( '#imagefield' ).get(0).getContext( '2d' );

    var paintDot = function(x,y) {
        ctx.fillStyle = 'red';
        ctx.beginPath(); // sonst wird alles zu einer Form und mit Farbe gefüllt
        ctx.arc( x, y, 10, 0, 2*Math.PI );
        ctx.fill();
    }

  



}


if ( APP ) {
    document.addEventListener( 'deviceready', starteApp );
} else {
    // zum Testen ohne PhoneGap
    starteApp();
}



