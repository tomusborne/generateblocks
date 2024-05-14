import { Spinner } from '@wordpress/components';
import { useEffect, useRef, useState, useLayoutEffect } from '@wordpress/element';
import imagesLoaded from 'imagesloaded';
import { useLibrary } from './library-provider';

export default function Pattern( { pattern, isLoading, isActive = false, globalStyleCSS } ) {
	const {
		id,
		preview,
		label,
		scripts = [],
	} = pattern;
	const iframeRef = useRef();
	const elementRef = useRef();
	const [ height, setHeight ] = useState( 0 );
	const [ injectContent, setInjectContent ] = useState( false );
	const [ editorColors, setEditorColors ] = useState( {} );
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ patternWidth, setPatternWidth ] = useState( 0 );
	const [ isResizing, setIsResizing ] = useState( false );
	const { previewIframeWidth } = useLibrary();
	const patternHeight = 350;
	const viewport = patternWidth;
	const iframe = 1280;
	const editorStylesWrapper = document?.querySelector( '.editor-styles-wrapper' );

	/**
	 * Debounce our resizing event.
	 * This is used to re-calculate the pattern width.
	 */
	useEffect( () => {
		let resizeTimer;

		const handleResize = () => {
			setIsResizing( true );
			clearTimeout( resizeTimer );

			resizeTimer = setTimeout( () => {
				setIsResizing( false );
			}, 500 );
		};

		window.addEventListener( 'resize', handleResize );

		return () => {
			window.removeEventListener( 'resize', handleResize );
		};
	}, [] );

	/**
	 * Set the width of our patterns.
	 */
	useEffect( () => {
		if ( elementRef.current?.clientWidth && ! isResizing ) {
			setPatternWidth( elementRef.current?.clientWidth );
		}
	}, [ elementRef.current?.clientWidth, isResizing ] );

	/**
	 * Insert our pattern preview into the empty iframe.
	 */
	useEffect( () => {
		if ( ! injectContent ) {
			return;
		}

		const document = iframeRef.current.contentWindow.document;

		scripts.forEach( ( script ) => {
			const scriptElement = document.createElement( 'script' );
			scriptElement.defer = true;
			scriptElement.src = script;
			document.head.appendChild( scriptElement );
		} );

		document.body.innerHTML = preview;
		document.head.innerHTML += '<style id="block-active"></style>';
		document.head.innerHTML += '<style id="pattern-styles"></style>';

		const globalStyleElement = document.createElement( 'style' );
		globalStyleElement.innerHTML = globalStyleCSS;

		const firstStyleElement = document.querySelector( 'head style' );
		document.head.insertBefore( globalStyleElement, firstStyleElement );

		imagesLoaded( document.body, () => {
			setHeight( document.body.scrollHeight );
			setIsLoaded( true );
		} );
	}, [ injectContent ] );

	/**
	 * Store our editor background and text color.
	 */
	useEffect( () => {
		if ( ! editorStylesWrapper ) {
			return;
		}

		const styles = getComputedStyle( editorStylesWrapper );

		if ( styles ) {
			setEditorColors( { background: styles.backgroundColor, text: styles.color } );
		}
	}, [ editorStylesWrapper?.style ] );

	/**
	 * Mimic our editor styles in the pattern preview.
	 * This allows our patterns to have the same background/text colors as the editor.
	 */
	useLayoutEffect( () => {
		const document = iframeRef.current?.contentWindow?.document;

		if ( document && document.querySelector && document.querySelector( '#pattern-styles' ) ) {
			document.querySelector( '#pattern-styles' ).innerHTML = `body{background-color:${ editorColors?.background };color:${ editorColors?.text };}`;
		}
	}, [ editorColors, height ] );

	/**
	 * Set the height of the preview iframe.
	 */
	useEffect( () => {
		if ( ! isActive ) {
			return;
		}

		const document = iframeRef?.current?.contentWindow?.document;

		imagesLoaded( document?.body, () => {
			setHeight( document?.body?.scrollHeight );
		} );
	}, [ previewIframeWidth ] );

	/**
	 * Add padding and center the pattern if it's not full width.
	 */
	useEffect( () => {
		const iframeDocument = iframeRef.current.contentWindow.document;
		const iframeBody = iframeDocument.body;

		if ( ! iframeBody ) {
			return;
		}

		const elements = Array.from( iframeBody.querySelectorAll( '*' ) );

		const firstVisibleElement = elements?.find( ( element ) => {
			const { display } = getComputedStyle( element );
			return display !== 'none';
		} );

		if ( firstVisibleElement ) {
			const parentWidth = firstVisibleElement.parentElement.clientWidth;
			const isFullWidth = firstVisibleElement.offsetWidth === parentWidth;

			if ( ! isFullWidth ) {
				iframeBody.style.padding = '100px';
				firstVisibleElement.style.marginLeft = 'auto';
				firstVisibleElement.style.marginRight = 'auto';
			}
		}
	}, [ patternWidth, injectContent ] );

	const viewportHeight = Math.round( height * ( viewport / iframe ) );

	const wrapperStyle = {
		opacity: isLoading ? 0 : 1,
		height: patternHeight + 'px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: ( viewportHeight + 40 ) < patternHeight ? 'center' : '',
	};

	const sandbox = [
		'allow-same-origin',
	];

	if ( isActive ) {
		sandbox.push( 'allow-scripts' );
	}

	return (
		<div
			className="gb-pattern-frame"
			style={ isActive ? {
				backgroundColor: 'none',
				padding: 0,
			} : {} }
		>
			<div
				ref={ elementRef }
				className="gb-pattern"
				style={ ! isActive ? wrapperStyle : { minHeight: '200px' } }
			>
				{ ! isLoaded && <Spinner /> }
				<div
					style={ ! isActive ? {
						width: `${ viewport }px`,
						height: `${ viewportHeight }px`,
					} : {} }
				>
					<div
						style={ ! isActive ? {
							height: height + 'px',
							width: `${ ( ( iframe / viewport ) * 100 ) }%`,
							transformOrigin: '0 0',
							transform: `scale( ${ viewport / iframe } )`,
						} : {} }
					>
						<iframe
							id={ id }
							onLoad={ () => {
								setInjectContent( true );

								const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;

								iframeDoc.addEventListener( 'click', ( event ) => {
									const clickedElement = event.target;

									if ( 'A' === clickedElement.tagName ) {
										const href = clickedElement.getAttribute( 'href' );

										if ( href && ! href.startsWith( '#' ) ) {
											event.preventDefault();
											event.stopPropagation();
										}
									}

									// Reset our height when we click anything in our preview.
									// This accounts for height changes from accordions etc...
									if ( isActive ) {
										setHeight( iframeDoc.body.scrollHeight );
									}
								} );
							} }
							title={ label }
							src={ generateBlocksPatternLibrary.patternPreviewUrl }
							ref={ iframeRef }
							style={ {
								height: height + 'px',
								border: '0',
								pointerEvents: ! isActive ? 'none' : '',
								width: isActive ? previewIframeWidth : `${ iframe }px`,
								opacity: ! isLoaded ? 0 : 1,
								display: ( isActive && '100%' !== previewIframeWidth ) ? 'block' : '',
								margin: isActive && '100%' !== previewIframeWidth ? '0 auto' : '',
							} }
							tabIndex="-1"
							loading="lazy"
							sandbox={ sandbox.join( ' ' ) }
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
