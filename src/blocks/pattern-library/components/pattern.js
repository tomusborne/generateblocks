import { useEffect, useRef, useState, useLayoutEffect } from '@wordpress/element';
import { useLibrary } from './library-provider';

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
	const {
		scrollToPattern,
	} = useLibrary();
	const iframeRef = useRef();
	const firstUpdate = useRef( true );
	const [ height, setHeight ] = useState( 0 );
	const [ injectContent, setInjectContent ] = useState( false );
	const viewport = width;
	const iframe = 1280;

	useEffect( () => {
		if ( firstUpdate.current ) {
			firstUpdate.current = false;
			return;
		}

		const document = iframeRef.current.contentWindow.document;
		document.body.innerHTML = preview;
		document.head.innerHTML += '<style id="block-active"></style>';

		if ( document.images.length > 0 ) {
			allImagesLoaded( document.images, () => {
				setHeight( document.body.scrollHeight );
			} );
		} else {
			setHeight( document.body.scrollHeight );
		}
	}, [ injectContent ] );

	useLayoutEffect( () => {
		const document = iframeRef.current?.contentWindow?.document;

		if ( document && document.querySelector && document.querySelector( '#block-active' ) ) {
			document.querySelector( '#block-active' ).innerHTML = ! patternHover
				? ''
				: `.gb-pattern-block:not(.${ patternHover }) {opacity:0.3}`;
		}
	}, [ patternHover ] );

	useLayoutEffect( () => {
		const document = iframeRef?.current?.contentWindow?.document;

		if ( scrollToPattern && patternHover ) {
			const elementInIframe = document.querySelector( '.' + patternHover );

			if ( elementInIframe ) {
				const modal = iframeRef?.current?.closest( '.components-modal__content' );
				const elementRect = elementInIframe.getBoundingClientRect();
				const modalStyles = window.getComputedStyle( modal );
				const margin = parseFloat( modalStyles.marginTop ) + parseFloat( modalStyles.marginBottom );
				const padding = parseFloat( modalStyles.paddingTop ) + parseFloat( modalStyles.paddingBottom );

				modal.scrollTo(
					{
						top: elementRect.top < ( margin + padding )
							? elementRect.top
							: elementRect.top + margin + padding,
						behavior: 'smooth',
					}
				);
			}
		}
	}, [ scrollToPattern, patternHover ] );

	const viewportHeight = Math.round( height * ( viewport / iframe ) );
	const wrapperStyle = isLoading ? { opacity: 0 } : {};

	return (
		<>
			<div
				className="gb-pattern"
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
