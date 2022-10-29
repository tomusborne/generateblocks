import { BaseControl, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Fragment, useMemo } from '@wordpress/element';
import googleFonts from '../../../../../components/typography/google-fonts.json';
import typographyOptions from '../options';
import AdvancedSelect from '../../../../../components/advanced-select';

export default function FontFamily( { attributes, setAttributes } ) {
	const {
		fontFamily,
		fontFamilyFallback,
		googleFont,
		googleFontVariants,
	} = attributes;

	const fonts = useMemo( () => {
		const fontFamilyOptions = typographyOptions.fontFamily;

		Object
			.keys( googleFonts )
			.slice( 0, 20 )
			.forEach( ( k ) => {
				const fontExists = Object.keys( fontFamilyOptions ).some( ( font ) => {
					return fontFamilyOptions[ font ]?.value === k;
				} );

				if ( ! fontExists ) {
					fontFamilyOptions.push( { value: k, label: k } );
				}
			} );

		return fontFamilyOptions;
	}, [] );

	function onFontChange( value ) {
		setAttributes( { fontFamily: value } );

		if ( typeof googleFonts[ value ] !== 'undefined' ) {
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

	const value = !! fontFamily ? { value: fontFamily, label: fontFamily } : '';

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

			{ '' !== fontFamily &&
				<Fragment>
					<ToggleControl
						label={ __( 'Use Google Fonts API', 'generateblocks' ) }
						checked={ !! googleFont }
						onChange={ ( newGoogleFontValue ) => {
							setAttributes( {
								googleFont: newGoogleFontValue,
							} );

							if ( newGoogleFontValue ) {
								if ( typeof googleFonts[ fontFamily ] !== 'undefined' ) {
									setAttributes( {
										fontFamilyFallback: googleFonts[ fontFamily ].fallback,
										googleFontVariants: googleFonts[ fontFamily ].weight.join( ', ' ),
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
