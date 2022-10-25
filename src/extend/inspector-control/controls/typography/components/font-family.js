import { BaseControl, DropdownMenu, Notice, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Fragment, useMemo } from '@wordpress/element';
import googleFonts from '../../../../../components/typography/google-fonts.json';
import typographyOptions from '../options';
import FlexControl from '../../../../../components/flex-control';
import { plus } from '@wordpress/icons';

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

	const fontDropdownOptions = [];

	fonts.forEach( ( font ) => {
		fontDropdownOptions.push( {
			title: font.label,
			onClick: () => onFontShortcut( font.value ),
		} );
	} );

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
			<BaseControl
				label={ __( 'Font Family', 'generateblocks' ) }
				id="gblocks-font-family"
				className="gblocks-font-family"
			>
				<DropdownMenu
					label={ __( 'Font shortcuts', 'generateblocks' ) }
					controls={ fontDropdownOptions }
					icon={ plus }
				/>

				<FlexControl>
					<TextControl
						id="gblocks-font-family"
						value={ fontFamily }
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
				</FlexControl>
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

					<Notice
						isDismissible={ false }
						status="warning"
						className="gblocks-font-family-notice"
					>
						{ __( 'Font families should ideally be set globally instead of on a per-block basis.', 'generateblocks' ) }
					</Notice>
				</Fragment>
			}
		</>
	);
}
