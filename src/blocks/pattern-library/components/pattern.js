import { Spinner } from '@wordpress/components';
import { useEffect, useRef, useState, useLayoutEffect } from '@wordpress/element';
import imagesLoaded from 'imagesloaded';
import { useLibrary } from './library-provider';

export default function Pattern( props ) {
	const {
		id,
		preview,
		isLoading,
		activePatternId,
		patternHeight,
	} = props;
	const iframeRef = useRef();
	const elementRef = useRef();
	const [ height, setHeight ] = useState( 0 );
	const [ injectContent, setInjectContent ] = useState( false );
	const [ editorColors, setEditorColors ] = useState( {} );
	const [ isVisible, setIsVisible ] = useState( !! activePatternId );
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ patternWidth, setPatternWidth ] = useState( 0 );
	const { previewIframeWidth } = useLibrary();
	const viewport = patternWidth;
	const iframe = 1280;
	const editorStylesWrapper = document?.querySelector( '.editor-styles-wrapper' );

	useEffect( () => {
		if ( elementRef.current?.clientWidth ) {
			setPatternWidth( elementRef.current?.clientWidth );
		}
	}, [ elementRef.current?.clientWidth ] );

	useEffect( () => {
		const options = {
			root: null, // Use the viewport as the root
			rootMargin: '0px', // No margin
			threshold: 0.01, // 1% visibility threshold
		};

		const callback = ( entries ) => {
			entries.forEach( ( entry ) => {
				if ( entry.isIntersecting ) {
					setIsVisible( true );
					observer.disconnect(); // Disconnect the observer once it's done its job
				}
			} );
		};

		const observer = new IntersectionObserver( callback, options );

		if ( elementRef.current ) {
			observer.observe( elementRef.current );
		}

		return () => {
			if ( observer ) {
				observer.disconnect(); // Disconnect the observer on unmount
			}
		};
	}, [] );

	useEffect( () => {
		if ( ! isVisible || ! injectContent ) {
			return;
		}

		const document = iframeRef.current.contentWindow.document;
		const scripts = props?.scripts ?? [];

		scripts.forEach( ( script ) => {
			const scriptElement = document.createElement( 'script' );
			scriptElement.defer = true;
			scriptElement.src = script;
			document.head.appendChild( scriptElement );
		} );

		document.body.innerHTML = preview;
		document.head.innerHTML += '<style id="block-active"></style>';
		document.head.innerHTML += '<style id="pattern-styles"></style>';

		imagesLoaded( document.body, () => {
			setHeight( document.body.scrollHeight );
			setIsLoaded( true );
		} );
	}, [ injectContent, isVisible ] );

	useEffect( () => {
		if ( ! editorStylesWrapper ) {
			return;
		}

		const styles = getComputedStyle( editorStylesWrapper );

		if ( styles ) {
			setEditorColors( { background: styles.backgroundColor, text: styles.color } );
		}
	}, [ editorStylesWrapper?.style ] );

	useLayoutEffect( () => {
		const document = iframeRef.current?.contentWindow?.document;

		if ( document && document.querySelector && document.querySelector( '#pattern-styles' ) ) {
			document.querySelector( '#pattern-styles' ).innerHTML = `body{background-color:${ editorColors?.background };color:${ editorColors?.text };}`;
		}
	}, [ editorColors, height ] );

	useEffect( () => {
		if ( ! activePatternId ) {
			return;
		}

		const document = iframeRef?.current?.contentWindow?.document;

		imagesLoaded( document?.body, () => {
			setHeight( document?.body?.scrollHeight );
		} );
	}, [ previewIframeWidth ] );

	const viewportHeight = Math.round( height * ( viewport / iframe ) );

	const wrapperStyle = {
		opacity: isLoading ? 0 : 1,
		height: patternHeight + 'px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: ( viewportHeight + 40 ) < patternHeight ? 'center' : '',
	};

	return (
		<div
			className="gb-pattern-frame"
			style={ activePatternId ? {
				backgroundColor: 'none',
				padding: 0,
			} : {} }
		>
			<div
				ref={ elementRef }
				className="gb-pattern"
				style={ ! activePatternId ? wrapperStyle : { minHeight: '200px' } }
			>
				{ !! isVisible && ! isLoaded && <Spinner /> }
				<div
					style={ ! activePatternId ? {
						width: `${ viewport }px`,
						height: `${ viewportHeight }px`,
					} : {} }
				>
					<div
						style={ ! activePatternId ? {
							height: height + 'px',
							width: `${ ( ( iframe / viewport ) * 100 ) }%`,
							transformOrigin: '0 0',
							transform: `scale( ${ viewport / iframe } )`,
						} : {} }
					>
						<iframe
							id={ id }
							onLoad={ () => {
								if ( isVisible ) {
									setInjectContent( true );
								}

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
								} );
							} }
							title="id"
							src={ isVisible ? generateBlocksInfo.patternPreviewUrl : '' }
							ref={ iframeRef }
							style={ {
								height: height + 'px',
								border: '0',
								pointerEvents: ! activePatternId ? 'none' : '',
								width: activePatternId ? previewIframeWidth : `${ iframe }px`,
								opacity: ! isLoaded ? 0 : 1,
								display: activePatternId && '100%' !== previewIframeWidth ? 'block' : '',
								margin: activePatternId && '100%' !== previewIframeWidth ? '0 auto' : '',
							} }
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
