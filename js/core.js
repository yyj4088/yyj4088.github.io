(function() {
    var img, margin;
    var m1 = new Hammer( $( ".b1 img" )[ 0 ]);
    var m2 = new Hammer( $( ".b2 img" )[ 0 ]);
    var m3 = new Hammer( $( ".b3 img" )[ 0 ]);
    m1.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    m2.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    m3.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    m1.on( "panstart", function( e ) {  
      img = $( ".b1 img" );
      margin = parseInt( img.css( "margin-left" ), 10 );
    } );
    m1.on( "pan", function( e ) {
    console.log( "pan" );
      var delta = margin + e.deltaX;
      console.log( delta );
      if ( delta >= 0 && delta <= 120 ) {
         img.css( {
        "margin-left": margin + e.deltaX
      } ); 
      }
    } );
    m2.on( "panstart", function( e ) {  
      img = $( ".b2 img" );
      margin = parseInt( img.css( "margin-left" ), 10 );
    } );
    m2.on( "pan", function( e ) {
    console.log( "pan" );
      var delta = margin + e.deltaX;
      console.log( delta );
      if ( delta >= -100 && delta <= 0 ) {
         img.css( {
        "margin-left": margin + e.deltaX
      } ); 
      }
    } );
    m3.on( "panstart", function( e ) {  
      img = $( ".b3 img" );
      margin = parseInt( img.css( "margin-left" ), 10 );
    } );
    m3.on( "pan", function( e ) {
    console.log( "pan" );
      var delta = margin + e.deltaX;
      console.log( delta );
      if ( delta >= 0 && delta <= 120 ) {
         img.css( {
        "margin-left": margin + e.deltaX
      } ); 
      }
    } );
  })();