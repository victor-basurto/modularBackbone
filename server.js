var express = require( 'express' ),
	bodyParser = require( 'body-parser' ),
	port = 3000,
	app = express();

// set public directory
app.use( express.static( __dirname + '/app' ) );
app.use( bodyParser.json() );

// display route
app.get( '/', function( req, res ) {
	res.render( 'index' );
});

// set port
app.listen( port, function() {
	console.log( 'app running on port: ' + port );
});
