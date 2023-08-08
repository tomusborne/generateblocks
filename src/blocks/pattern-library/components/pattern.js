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
	} = props;
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

		imagesLoaded( document.body, () => {
			setHeight( document.body.scrollHeight );
		} );
	}, [ injectContent ] );

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
							src={ generateBlocksInfo.patternPreviewUrl }
							ref={ iframeRef }
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
