import { BaseControl, SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Fragment, useMemo } from '@wordpress/element';
import googleFonts from '../../../../../components/typography/google-fonts.json';
import typographyOptions from '../options';

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
				fontFamilyOptions.push( { value: k, label: k } );
			} );

		return fontFamilyOptions;
	}, [] );

	function onFontChange( value ) {
		if ( 'other' === value ) {
			value = '';
		}

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

	const onFontShortcut = ( value ) => {
		setAttributes( { fontFamily: value } );
		onFontChange( value );
	};

	return (
		<>
			<BaseControl className="gblocks-typography-component__font-family">
				<SelectControl
					label={ __( 'Font Family', 'generateblocks' ) }
					options={ fonts }
					onChange={ onFontShortcut }
				/>

				<div className="gblocks-typography-component__font-family-input">
					<TextControl
						value={ fontFamily }
						placeholder={ __( 'Enter font name', 'generateblocks' ) }
						onChange={ ( nextFontFamily ) => onFontChange( nextFontFamily ) }
					/>

					{ ( !! fontFamilyFallback || !! googleFont ) &&
						<TextControl
							value={ fontFamilyFallback }
							placeholder={ __( 'sans-serif', 'generateblocks' ) }
							onChange={ ( value ) => {
								setAttributes( {
									fontFamilyFallback: value,
								} );
							} }
						/>
					}
				</div>
			</BaseControl>

			{ '' !== fontFamily &&
				<Fragment>
					<ToggleControl
						label={ __( 'Use Google Fonts API', 'generateblocks' ) }
						checked={ !! googleFont }
						onChange={ ( value ) => {
							setAttributes( {
								googleFont: value,
							} );

							if ( value ) {
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
						<TextControl
							label={ __( 'Variants', 'generateblocks' ) }
							value={ googleFontVariants }
							placeholder={ __( '300, 400, 400i', 'generateblocks' ) }
							onChange={ ( value ) => {
								setAttributes( {
									googleFontVariants: value,
								} );
							} }
						/>
					}
				</Fragment>
			}
		</>
	);
}
