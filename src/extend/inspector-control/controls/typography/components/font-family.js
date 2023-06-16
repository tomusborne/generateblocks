import { BaseControl, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Fragment, useMemo } from '@wordpress/element';
import googleFonts from '../google-fonts.json';
import typographyOptions from '../options';
import AdvancedSelect from '../../../../../components/advanced-select';

export default function FontFamily( { attributes, setAttributes } ) {
	const {
		typography,
		fontFamilyFallback,
		googleFont,
		googleFontVariants,
	} = attributes;

	const fonts = useMemo( () => {
		const fontFamilyOptions = typographyOptions.fontFamily;
		const googleFontFamilyOptions = {
			label: __( 'Google Fonts', 'generateblocks' ),
			options: [],
		};

		if ( ! generateBlocksInfo.disableGoogleFonts ) {
			Object
				.keys( googleFonts )
				.forEach( ( k ) => {
					const fontExists = Object.keys( googleFontFamilyOptions.options ).some( ( font ) => {
						return googleFontFamilyOptions.options[ font ]?.value === k;
					} );

					if ( ! fontExists ) {
						googleFontFamilyOptions.options.push( { value: k, label: k } );
					}
				} );
		}

		if ( googleFontFamilyOptions.options.length ) {
			fontFamilyOptions.push( googleFontFamilyOptions );
		}

		return fontFamilyOptions;
	}, [] );

	function onFontChange( value ) {
		setAttributes( {
			typography: {
				fontFamily: value,
			},
		} );

		if ( ! generateBlocksInfo.disableGoogleFonts && typeof googleFonts[ value ] !== 'undefined' ) {
			setAttributes( {
				googleFont: true,
				fontFamilyFallback: googleFonts[ value ].fallback,
				googleFontVariants: googleFonts[ value ].weight.join( ', ' ),
			} );
		} else {
			setAttributes( {
				googleFont: false,
				fontFamilyFallback: '',
				googleFontVariants: '',
			} );
		}
	}

	const value = !! typography.fontFamily ? { value: typography.fontFamily, label: typography.fontFamily } : '';

	return (
		<>
			<BaseControl
				label={ __( 'Font Family', 'generateblocks' ) }
				id="gblocks-font-family"
				className="gblocks-font-family"
			>
				<AdvancedSelect
					placeholder={ __( 'Choose or add font name', 'generateblocks' ) }
					options={ fonts }
					value={ value }
					isSearchable
					isCreatable
					isClearable
					formatCreateLabel={ ( input ) => ( `Add "${ input }"` ) }
					onChange={ ( option ) => onFontChange( option?.value || '' ) }
				/>
			</BaseControl>

			{ !! typography.fontFamily && ! generateBlocksInfo.disableGoogleFonts &&
				<Fragment>
					<ToggleControl
						label={ __( 'Use Google Fonts API', 'generateblocks' ) }
						checked={ !! googleFont }
						onChange={ ( newGoogleFontValue ) => {
							setAttributes( {
								googleFont: newGoogleFontValue,
							} );

							if ( newGoogleFontValue ) {
								if ( typeof googleFonts[ typography.fontFamily ] !== 'undefined' ) {
									setAttributes( {
										fontFamilyFallback: googleFonts[ typography.fontFamily ].fallback,
										googleFontVariants: googleFonts[ typography.fontFamily ].weight.join( ', ' ),
									} );
								}
							}
						} }
					/>

					{ !! googleFont &&
						<>
							<TextControl
								label={ __( 'Font fallback', 'generateblocks' ) }
								value={ fontFamilyFallback }
								placeholder={ __( 'sans-serif', 'generateblocks' ) }
								onChange={ ( newFallback ) => {
									setAttributes( {
										fontFamilyFallback: newFallback,
									} );
								} }
							/>

							<TextControl
								label={ __( 'Variants', 'generateblocks' ) }
								value={ googleFontVariants }
								placeholder={ __( '300, 400, 400i', 'generateblocks' ) }
								onChange={ ( newVariantsValue ) => {
									setAttributes( {
										googleFontVariants: newVariantsValue,
									} );
								} }
							/>
						</>
					}
				</Fragment>
			}
		</>
	);
}
