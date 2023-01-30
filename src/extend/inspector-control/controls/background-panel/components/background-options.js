import BackgroundColorOverlay from './background-color-overlay';
import ImageSize from './image-size';
import Selector from './selector';
import ImageOpacity from './image-opacity';

export default function BackgroundOptions( { attributes, setAttributes } ) {
	const {
		bgImage,
		bgOptions,
		bgImageSize,
		useDynamicData,
		dynamicContentType,
		innerZindex,
		useInnerContainer,
		position,
		overflowX,
		overflowY,
	} = attributes;

	return (
		<>
			{ !! bgOptions.overlay ? (
				<BackgroundColorOverlay
					checked={ !! bgOptions.overlay }
					onChange={ ( nextOverlay ) => {
						setAttributes( {
							bgOptions: {
								...bgOptions,
								overlay: nextOverlay,
							},
						} );
					} }
				/>
			) : (
				<>
					{ ( ( bgImage && bgImage.id ) || ( useDynamicData && '' !== dynamicContentType ) ) &&
						<ImageSize
							value={ bgImageSize }
							onChange={ ( value ) => setAttributes( { bgImageSize: value } ) }
						/>
					}

					<Selector
						value={ bgOptions.selector }
						position={ position }
						useInnerContainer={ useInnerContainer }
						onChange={ ( value ) => {
							setAttributes( { bgOptions: { ...bgOptions, selector: value } } );

							if ( useInnerContainer && 'pseudo-element' === value && ! innerZindex && 0 !== innerZindex ) {
								setAttributes( { innerZindex: 1 } );
							}

							if ( ! useInnerContainer && 'pseudo-element' === value ) {
								setAttributes( {
									position: ! position ? 'relative' : position,
									overflowX: ! overflowX ? 'hidden' : overflowX,
									overflowY: ! overflowY ? 'hidden' : overflowY,
								} );
							}
						} }
					/>

					<ImageOpacity
						value={ bgOptions.opacity }
						isPseudoElement={ 'pseudo-element' === bgOptions.selector }
						onChange={ ( value ) => {
							setAttributes( {
								bgOptions: { ...bgOptions, opacity: value, selector: 'pseudo-element' },
							} );

							if ( useInnerContainer && ! innerZindex && 0 !== innerZindex ) {
								setAttributes( { innerZindex: 1 } );
							}

							if ( ! useInnerContainer ) {
								setAttributes( {
									position: ! position ? 'relative' : position,
									overflowX: ! overflowX ? 'hidden' : overflowX,
									overflowY: ! overflowY ? 'hidden' : overflowY,
								} );
							}
						} }
					/>
				</>
			) }
		</>
	);
}
