import { useEffect, useRef, useState, useLayoutEffect } from '@wordpress/element';

function allImagesLoaded( images, callback ) {
	Promise.all( Array.from( images ).map( ( img ) => {
		if ( img.complete ) {
			return Promise.resolve( img.naturalHeight !== 0 );
		}

		return new Promise( ( resolve ) => {
			img.addEventListener( 'load', () => resolve( true ) );
			img.addEventListener( 'error', () => resolve( false ) );
		} );
	} ) ).then( ( results ) => {
		if ( results.every( ( res ) => res ) ) {
			callback();
		}
	} );
}

export default function Pattern( props ) {
	const {
		id,
		width = 0,
		preview,
		setActivePattern = () => false,
		isLoading,
		patternHover,
	} = props;
	const iframeRef = useRef();
	const [ height, setHeight ] = useState( 0 );
	const [ injectContent, setInjectContent ] = useState( false );
	const viewport = width;
	const iframe = 1280;

	useEffect( () => {
		const document = iframeRef.current.contentWindow.document;
		document.body.innerHTML = preview;
		document.head.innerHTML += '<style id="block-active"></style>';
		document.body.style.background = 'transparent';

		if ( document.images.length > 0 ) {
			allImagesLoaded( document.images, () => {
				setHeight( document.body.scrollHeight );
			} );
		} else {
			setHeight( document.body.scrollHeight );
		}
	}, [ injectContent ] );

	useLayoutEffect( () => {
		const document = iframeRef.current.contentWindow.document;

		if ( document && document.querySelector && document.querySelector( '#block-active' ) ) {
			document.querySelector( '#block-active' ).innerHTML = ! patternHover
				? ''
				: `.gb-pattern-block.${ patternHover } {outline: 5px #349ad8 dashed;outline-offset: -5px;}`;
		}
	}, [ patternHover ] );

	const viewportHeight = Math.round( height * ( viewport / iframe ) );
	const wrapperStyle = isLoading ? { opacity: 0 } : {};

	return (
		<>
			<div
				role="presentation"
				style={ wrapperStyle }
				onClick={ () => setActivePattern( id ) }
				onKeyDown={ () => setActivePattern( id ) }
			>
				<div
					style={ {
						width: `${ viewport }px`,
						height: `${ viewportHeight }px`,
					} }
				>
					<div
						style={ {
							height: height + 'px',
							width: `${ ( ( iframe / viewport ) * 100 ) }%`,
							transformOrigin: '0 0',
							transform: `scale( ${ viewport / iframe } )`,
						} }
					>
						<iframe
							id={ id }
							onLoad={ () => setInjectContent( true ) }
							title="id"
							src={ generateBlocksInfo.siteUrl }
							ref={ iframeRef }
							loading="lazy"
							style={ {
								height: height + 'px',
								border: '0',
								pointerEvents: 'none',
								width: `${ iframe }px`,
							} }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
