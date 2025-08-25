import { __ } from '@wordpress/i18n';
import { SelectControl, TextControl, Flex, FlexBlock } from '@wordpress/components';
import { useEffect, useState, useMemo, useCallback } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs, isURL } from '@wordpress/url';
import { applyFilters } from '@wordpress/hooks';
import { debounce } from '@wordpress/compose';

import { OpenPanel } from '@edge22/components';
import { UnitControl } from '@edge22/styles-builder';

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
	htmlAttributes,
	context,
} ) {
	const {
		linkHtmlAttributes,
		mediaId,
		tagName,
	} = attributes;

	const {
		atRule,
	} = useBlockStyles();
	const [ imageData, setImageData ] = useState( null );
	const [ hasResolved, setHasResolved ] = useState( false );

	const debouncedOnStyleChange = useCallback(
		debounce( ( property, value, atRuleValue ) => {
			onStyleChange( property, value, atRuleValue );
		}, 250 ),
		[ onStyleChange ]
	);

	useEffect( () => {
		if ( ! isURL( htmlAttributes?.src ) ) {
			setImageData( null );
			setHasResolved( true );
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
				setImageData( null );
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

		if ( ! hasResolved ) {
			return [ { label: __( 'Loading sizes…', 'generateblocks' ), value: '' } ];
		}

		if ( ! imageSizes.length ) {
			return [ { label: __( 'No sizes available', 'generateblocks' ), value: '' } ];
		}

		const options = imageSizes.map( ( imageSize ) => {
			return {
				label: imageSize.charAt( 0 ).toUpperCase() + imageSize.slice( 1 ),
				value: imageSize,
			};
		} );

		options.unshift( { label: __( 'Full', 'generateblocks-pro' ), value: '' } );

		return options;
	}, [ imageData?.sizes, hasResolved ] );

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
		getStyleValue,
		onStyleChange,
	};

	return (
		<ApplyFilters
			name="generateblocks.editor.blockControls"
			blockName={ name }
			getStyleValue={ getStyleValue }
			onStyleChange={ onStyleChange }
			currentAtRule={ atRule }
			attributes={ attributes }
			setAttributes={ setAttributes }
		>
			<OpenPanel
				{ ...panelProps }
				panelId="settings"
			>
				{ '' === atRule && (
					<>
						<ImageUpload
							context={ context }
							value={ htmlAttributes?.src ?? '' }
							onInsert={ ( value ) => {
								const newHtmlAttributes = {
									...htmlAttributes,
									src: value,
								};

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

								setAttributes( {
									htmlAttributes: newHtmlAttributes,
									mediaId: 0,
								} );
							} }
							sizeSlug={ imageSizeValue }
						/>

						<URLControls
							setAttributes={ setAttributes }
							htmlAttributes={ linkHtmlAttributes }
							attributesName="linkHtmlAttributes"
							context={ context }
							tagName={ tagName }
						/>

						{ applyFilters(
							'generateblocks.blockSettings.afterImageUrlControls',
							null,
							panelProps
						) }

						<SelectControl
							label={ __( 'Size', 'generateblocks' ) }
							options={ sizes }
							value={ imageSizeValue }
							disabled={ ! hasResolved || ( hasResolved && ! imageData?.sizes ) }
							onChange={ ( value ) => {
								if ( '' === value ) {
									setAttributes( {
										htmlAttributes: {
											...htmlAttributes,
											src: imageData?.full_url ?? '',
											width: imageData?.width ?? '',
											height: imageData?.height ?? '',
										},
									} );

									return;
								}

								setAttributes( {
									htmlAttributes: {
										...htmlAttributes,
										src: imageData?.sizes[ value ]?.url ?? '',
										width: imageData?.sizes[ value ]?.width ?? '',
										height: imageData?.sizes[ value ]?.height ?? '',
									},
								} );
							} }
						/>
					</>
				) }

				<Flex>
					<FlexBlock>
						<UnitControl
							id="width"
							label={ __( 'Width', 'generateblocks' ) }
							value={ getStyleValue( 'width', atRule ) }
							onChange={ ( value ) => debouncedOnStyleChange( 'width', value, atRule ) }
						/>
					</FlexBlock>

					<FlexBlock>
						<UnitControl
							id="height"
							label={ __( 'Height', 'generateblocks' ) }
							value={ getStyleValue( 'height', atRule ) }
							onChange={ ( value ) => debouncedOnStyleChange( 'height', value, atRule ) }
						/>
					</FlexBlock>
				</Flex>

				{ '' === atRule && (
					<TextControl
						label={ __( 'Alt text', 'generateblocks' ) }
						value={ htmlAttributes?.alt ?? '' }
						onChange={ ( value ) => {
							setAttributes( {
								htmlAttributes: {
									...htmlAttributes,
									alt: value,
								},
							} );
						} }
					/>
				) }
			</OpenPanel>

			<DynamicTagsOnboarder />
		</ApplyFilters>
	);
}
