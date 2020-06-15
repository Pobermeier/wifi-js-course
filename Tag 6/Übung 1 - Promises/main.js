const express = require( 'express' );
const fs = require( 'fs' );
const bp = require( 'body-parser' );
const app = express();
app.listen( 5006, () => {
    console.log( 'Server gestartet' );
} );

app.use( bp.urlencoded({extended:false} ));
app.use( express.static( 'www') );


app.get( '/daten', (req, res) => {
    fs.readFile( './data/test.json', (err,content) => {
        if ( !err ) {
         res.status(200).end( content );
        }
    })
})

app.post( '/daten', (req, res) => {
    var neuezahl = Number( req.body.zahl ); // Datentyp?
    fs.readFile( './data/test.json', (err,content) => {
        if ( !err ) {
            var zahlen = JSON.parse( content );
            zahlen.daten.push( neuezahl );
            fs.writeFile( './data/test.json', JSON.stringify( zahlen ), (err) => {
                // Callback-HELL
                if ( !err ) {
                    res.status(200).end( 'gespeichert' );
                }
            })
        }
    }) 
   


})