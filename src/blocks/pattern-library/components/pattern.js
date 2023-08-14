import { Spinner } from '@wordpress/components';
import { useEffect, useRef, useState, useLayoutEffect } from '@wordpress/element';
import imagesLoaded from 'imagesloaded';

export default function Pattern( props ) {
	const {
		id,
		width = 0,
		preview,
		setActivePattern = () => false,
		isLoading,
		patternHover,
		activePatternId,
	} = props;
	const iframeRef = useRef();
	const elementRef = useRef();
	const [ height, setHeight ] = useState( 0 );
	const [ injectContent, setInjectContent ] = useState( false );
	const [ editorColors, setEditorColors ] = useState( {} );
	const [ isVisible, setIsVisible ] = useState( false );
	const [ isLoaded, setIsLoaded ] = useState( false );
	const viewport = width;
	const iframe = 1280;
	const editorStylesWrapper = document?.querySelector( '.editor-styles-wrapper' );

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

	useLayoutEffect( () => {
		const document = iframeRef.current?.contentWindow?.document;

		if ( document && document.querySelector && document.querySelector( '#block-active' ) ) {
			document.querySelector( '#block-active' ).innerHTML = ! patternHover || 'fullPattern' === patternHover
				? ''
				: `.gb-pattern-block:not(.${ patternHover }) {display: none}`;

			imagesLoaded( document.body, () => {
				setHeight( document.body.scrollHeight );
			} );
		}
	}, [ patternHover ] );

	const viewportHeight = Math.round( height * ( viewport / iframe ) );

	const wrapperStyle = {
		opacity: isLoading ? 0 : 1,
		height: ! height ? '200px' : '',
	};

	return (
		<>
			<div
				ref={ elementRef }
				className="gb-pattern"
				role="presentation"
				style={ wrapperStyle }
				onClick={ () => setActivePattern( id ) }
				onKeyDown={ () => setActivePattern( id ) }
			>
				{ ! isLoaded && <Spinner /> }
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
								} );
							} }
							title="id"
							src={ generateBlocksInfo.patternPreviewUrl }
							ref={ iframeRef }
							style={ {
								height: height + 'px',
								border: '0',
								pointerEvents: ! activePatternId ? 'none' : '',
								width: `${ iframe }px`,
								opacity: ! isLoaded ? 0 : 1,
							} }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
