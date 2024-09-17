import { __ } from '@wordpress/i18n';
import { SelectControl, TextControl, Flex, FlexBlock } from '@wordpress/components';
import { useEffect, useState, useMemo } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs, isURL } from '@wordpress/url';
import { applyFilters } from '@wordpress/hooks';

import { OpenPanel } from '@edge22/components';

import {
	ApplyFilters,
	ImageUpload,
	URLControls,
	DynamicTagsOnboarder,
} from '@components/index.js';
import { useBlockStyles } from '@hooks/useBlockStyles';

async function getImageByUrl( url ) {
	const image = await apiFetch( {
		path: addQueryArgs( `/generateblocks/v1/get-attachment-by-url`, {
			url,
		} ),
		method: 'GET',
	} );

	if ( image.success ) {
		return image.response;
	}

	return null;
}

export function BlockSettings( {
	getStyleValue,
	onStyleChange,
	name,
	attributes,
	setAttributes,
	onSelectImage,
} ) {
	const {
		htmlAttributes,
		linkHtmlAttributes,
		mediaId,
	} = attributes;

	const {
		currentAtRule,
	} = useBlockStyles();
	const [ imageData, setImageData ] = useState( null );
	const [ hasResolved, setHasResolved ] = useState( false );

	useEffect( () => {
		if ( ! isURL( htmlAttributes?.src ) ) {
			return;
		}

		( async function() {
			try {
				const image = await getImageByUrl( htmlAttributes?.src );

				if ( image ) {
					setImageData( image );
				}

				setHasResolved( true );
			} catch ( error ) {
				console.info( 'Error fetching image:', error ); // eslint-disable-line no-console
				setHasResolved( true );
			}
		}() );
	}, [ htmlAttributes?.src ] );

	useEffect( () => {
		const id = imageData?.id;

		if ( hasResolved && id !== mediaId ) {
			setAttributes( {
				mediaId: id ?? 0,
			} );
		}
	}, [ imageData?.id ] );

	const sizes = useMemo( () => {
		const imageSizes = imageData?.sizes
			? Object.keys( imageData?.sizes )
			: [];

		if ( ! imageSizes.length ) {
			return [];
		}

		const options = imageSizes.map( ( imageSize ) => {
			return {
				label: imageSize.charAt( 0 ).toUpperCase() + imageSize.slice( 1 ),
				value: imageSize,
			};
		} );

		options.unshift( { label: __( 'Full', 'generateblocks-pro' ), value: '' } );

		return options;
	}, [ imageData?.sizes ] );

	const imageSizeValue = useMemo( () => {
		const imageSizes = imageData?.sizes
			? Object.keys( imageData?.sizes )
			: [];

		if ( ! imageSizes.length ) {
			return '';
		}

		// Get the key by using the value (htmlAttributes?.src) in the imageData?.sizes array
		const key = imageSizes.find( ( sizeKey ) => imageData?.sizes[ sizeKey ]?.url === htmlAttributes?.src );

		if ( ! key ) {
			return '';
		}

		return key;
	}, [ htmlAttributes?.src, imageData?.sizes ] );

	const panelProps = {
		name,
		attributes,
		setAttributes,
	};

	return (
		<ApplyFilters
			name="generateblocks.editor.blockControls"
			blockName={ name }
			getStyleValue={ getStyleValue }
			onStyleChange={ onStyleChange }
			currentAtRule={ currentAtRule }
			attributes={ attributes }
			setAttributes={ setAttributes }
		>
			<OpenPanel
				{ ...panelProps }
				title={ __( 'Settings', 'generateblocks' ) }
				shouldRender={ '' === currentAtRule }
				panelId="settings"
			>
				<ImageUpload
					value={ htmlAttributes?.src }
					onInsert={ ( value ) => {
						const newHtmlAttributes = {
							...htmlAttributes,
							src: value,
						};

						if ( newHtmlAttributes?.[ 'data-media-id' ] ) {
							delete newHtmlAttributes[ 'data-media-id' ];
						}

						setAttributes( {
							htmlAttributes: newHtmlAttributes,
						} );
					} }
					onSelectImage={ onSelectImage }
					allowDynamicTags={ true }
					onInsertDynamicTag={ ( value ) => {
						const newHtmlAttributes = {
							...htmlAttributes,
							src: value,
						};
						const featuredImageIdTag = value.startsWith( '{featured_image_url' )
							? value.replace( '{featured_image_url', '{featured_image_id' )
							: null;

						if ( featuredImageIdTag ) {
							newHtmlAttributes[ 'data-media-id' ] = featuredImageIdTag;
						}

						setAttributes( {
							htmlAttributes: newHtmlAttributes,
							mediaId: 0,
						} );
					} }
				/>

				<URLControls
					setAttributes={ setAttributes }
					htmlAttributes={ linkHtmlAttributes }
					attributesName="linkHtmlAttributes"
				/>

				{ applyFilters(
					'generateblocks.blockSettings.afterImageUrlControls',
					null,
					panelProps
				) }

				{ !! sizes?.length && (
					<SelectControl
						label={ __( 'Size', 'generateblocks' ) }
						options={ sizes }
						value={ imageSizeValue }
						onChange={ ( value ) => {
							if ( '' === value ) {
								setAttributes( {
									htmlAttributes: {
										...htmlAttributes,
										src: imageData?.full_url,
										width: imageData?.width,
										height: imageData?.height,
									},
								} );

								return;
							}

							setAttributes( {
								htmlAttributes: {
									...htmlAttributes,
									src: imageData?.sizes[ value ]?.url,
									width: imageData?.sizes[ value ]?.width,
									height: imageData?.sizes[ value ]?.height,
								},
							} );
						} }
					/>
				) }

				<Flex>
					<FlexBlock>
						<TextControl
							label={ __( 'Width', 'generateblocks' ) }
							value={ htmlAttributes?.width }
							onChange={ ( value ) => {
								setAttributes( {
									htmlAttributes: {
										...htmlAttributes,
										width: value,
									},
								} );
							} }
						/>
					</FlexBlock>

					<FlexBlock>
						<TextControl
							label={ __( 'Height', 'generateblocks' ) }
							value={ htmlAttributes?.height }
							onChange={ ( value ) => {
								setAttributes( {
									htmlAttributes: {
										...htmlAttributes,
										height: value,
									},
								} );
							} }
						/>
					</FlexBlock>
				</Flex>

				<TextControl
					label={ __( 'Alt text', 'generateblocks' ) }
					value={ htmlAttributes?.alt }
					onChange={ ( value ) => {
						setAttributes( {
							htmlAttributes: {
								...htmlAttributes,
								alt: value,
							},
						} );
					} }
				/>
			</OpenPanel>

			<DynamicTagsOnboarder />
		</ApplyFilters>
	);
}
