( function( $ ) {
	var moduleLoader = false;
	var host = 'http://localhost/bepower24';
	$( window ).load( function() {
		$( '.listingDropDown .toggle' ).click( function() {
			$( this ).parent().toggleClass( 'active' );
		} );
		$( '.listingDropDown .options dd a' ).click( function() {
			$selected = $( this );
			var option = $selected.parents( 'dl' ).find( 'dt' ).eq( $selected.attr( 'href' ).substr( 1 ) ).text();
			var value = $selected.html();
			var options = {};
			$selected.parents( '.listingDropDown' ).removeClass( 'active' );
			$selected.parents( '.options' ).find( 'dd' ).removeClass( 'selected' );
			$selected.parent().addClass( 'selected' );
			$( '.listingDropDown' ).each( function( index ) {
				options[$( this ).attr( 'id' )] = $( this ).find( 'dd.selected' ).attr( 'data-order' );
			} );
			$( '.blockOptions .additional' ).each( function( index ) {
				options[$( this ).attr( 'name' )] = $( this ).val();
			} );
			$selected.parents( '.listingDropDown' ).find( '.label' ).html( option + ': <strong>' + value + '</strong><span class="arrow"></span>' );
			$selected.parents( '.block' ).find( '.search input' ).val( '' );
			
			$.ajax( {
				type: "POST",
				url: host + "/load.php?op=" + moduleOptionsUrl + "&w=moduleOptions",
				data: options,
				dataType: "html",
				beforeSend: function() {
					$selected.parents( '.block' ).find( '.content' ).prepend( '<div class="loader"></div> ');
				},
				success: function( data ) {
					$selected.parents( '.block' ).find( '.preload' ).html( data );
				}
			} );
			
			return false;
		} );
		$( '.block .search input' )
			.on( 'focus blur', function() {
				var elem = $( this );
				var toggle = $( this ).parents( '.search' );
				setTimeout( function() {
					toggle.toggleClass( 'active', elem.is( ':focus' ) );
				}, 0 );
			} )
			.keyup( function() {
				var options = {};
				$selected = $( this );
				$( '.blockOptions .additional' ).each( function( index ) {
					options[$( this ).attr( 'name' )] = $( this ).val();
				} );
				options['fraza'] = $selected.val();;
				$.ajax( {
					type: "POST",
					url: host + "/load.php?op=" + moduleOptionsUrl + "&w=search",
					data: options,
					dataType: "html",
					beforeSend: function() {
						if ( !moduleLoader )
						{
							$selected.parents( '.block' ).find( '.content' ).prepend( '<div class="loader"></div> ');
							moduleLoader = true;
						}
					},
					success: function( data ) {
						$selected.parents( '.block' ).find( '.preload' ).html( data );
						moduleLoader = false;
					}
				} );
			} );
		$( '.block .search .icon' ).click( function() {
			var options = {};
			$selected = $( this );
			$( '.blockOptions .additional' ).each( function( index ) {
				options[$( this ).attr( 'name' )] = $( this ).val();
			} );
			options['fraza'] = $selected.prev().val();
			$.ajax( {
				type: "POST",
				url: host + "/load.php?op=" + moduleOptionsUrl + "&w=search",
				data: options,
				dataType: "html",
				beforeSend: function() {
					if ( !moduleLoader )
					{
						$selected.parents( '.block' ).find( '.content' ).prepend( '<div class="loader"></div> ');
						moduleLoader = true;
					}
				},
				success: function( data ) {
					$selected.parents( '.block' ).find( '.preload' ).html( data );
					moduleLoader = false;
				}
			} );
		} );
	} );
} )( jQuery );