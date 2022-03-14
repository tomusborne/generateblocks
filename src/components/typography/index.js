/**
 * Internal dependencies
 */
import './editor.scss';
import googleFonts from './google-fonts.json';
import NumberControl from '../number-control';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { moreVertical, check, plus } from '@wordpress/icons';
import {
	BaseControl,
	SelectControl,
	ToggleControl,
	TextControl,
	DropdownMenu,
	MenuGroup,
	MenuItem,
} from '@wordpress/components';

export default function TypographyComponent( props ) {
	const {
		setAttributes,
		attributes,
		options = [],
		deviceType,
	} = props;

	const {
		fontFamily,
		fontFamilyFallback,
		googleFont,
		googleFontVariants,
		fontWeight,
		textTransform,
	} = attributes;

	const [ selectedOptions, setSelectedOptions ] = useState( [] );
	const [ availableOptions, setAvailableOptions ] = useState( options );

	useEffect( () => {
		// Appearance and font family options don't have device values.
		if ( 'Desktop' !== deviceType ) {
			setAvailableOptions( availableOptions.filter(
				( option ) =>
					'appearance' !== option &&
					'fontFamily' !== option
			) );
		}
	}, [] );

	useEffect( () => {
		const newSelectedOptions = [];

		if ( 2 === availableOptions.length ) {
			// If there's only 2, always show them.
			newSelectedOptions.push( availableOptions[ 0 ], availableOptions[ 1 ] );
		} else if ( availableOptions.length > 0 ) {
			// Make the first option selected by default.
			newSelectedOptions.push( availableOptions[ 0 ] );

			// Select other options if they have a value.
			availableOptions.forEach( ( option, index ) => {
				if ( index > 0 ) {
					if ( 'appearance' === option && ( fontWeight || textTransform ) ) {
						newSelectedOptions.push( option );
					} else if ( attributes[ option ] ) {
						newSelectedOptions.push( option );
					}
				}
			} );
		}

		setSelectedOptions( [ ...selectedOptions, ...newSelectedOptions ] );
	}, [ availableOptions, deviceType ] );

	const fonts = [
		{ value: '', label: __( 'Select font', 'generateblocks' ) },
		{ value: 'Arial', label: 'Arial' },
		{ value: 'Helvetica', label: 'Helvetica' },
		{ value: 'Times New Roman', label: 'Times New Roman' },
		{ value: 'Georgia', label: 'Georgia' },
	];

	Object.keys( googleFonts ).slice( 0, 20 ).forEach( ( k ) => {
		fonts.push(
			{ value: k, label: k }
		);
	} );

	let weight = [
		{ value: '', 		label: __( 'Default', 'generateblocks' ) },
		{ value: 'normal', 	label: __( 'Normal', 'generateblocks' ) },
		{ value: 'bold', 	label: __( 'Bold', 'generateblocks' ) },
		{ value: '100', 	label: '100' },
		{ value: '200', 	label: '200' },
		{ value: '300', 	label: '300' },
		{ value: '400', 	label: '400' },
		{ value: '500', 	label: '500' },
		{ value: '600', 	label: '600' },
		{ value: '700', 	label: '700' },
		{ value: '800', 	label: '800' },
		{ value: '900', 	label: '900' },
	];

	const transform = [
		{ value: '', 			label: __( 'Default', 'generateblocks' ) },
		{ value: 'uppercase', 	label: __( 'Uppercase', 'generateblocks' ) },
		{ value: 'lowercase', 	label: __( 'Lowercase', 'generateblocks' ) },
		{ value: 'capitalize', 	label: __( 'Capitalize', 'generateblocks' ) },
		{ value: 'initial', 	label: __( 'Normal', 'generateblocks' ) },
	];

	if ( typeof googleFonts[ fontFamily ] !== 'undefined' && typeof googleFonts[ fontFamily ].weight !== 'undefined' ) {
		weight = [
			{ value: '', label: __( 'Default', 'generateblocks' ) },
			{ value: 'normal', label: __( 'Normal', 'generateblocks' ) },
			{ value: 'bold', label: __( 'Bold', 'generateblocks' ) },
		];

		googleFonts[ fontFamily ].weight.filter( function( k ) {
			const hasLetters = k.match( /[a-z]/g );
			const hasNumbers = k.match( /[0-9]/g );

			if ( ( hasLetters && hasNumbers ) || 'italic' === k || 'regular' === k ) {
				return false;
			}

			return true;
		} ).forEach( ( k ) => {
			weight.push(
				{ value: k, label: k }
			);
		} );
	}

	const onFontChange = ( value ) => {
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
	};

	const onFontShortcut = ( value ) => {
		setAttributes( { fontFamily: value } );
		onFontChange( value );
	};

	const optionNames = {
		appearance: __( 'Appearance', 'generateblocks' ),
		fontSize: __( 'Font Size', 'generateblocks' ),
		fontFamily: __( 'Font Family', 'generateblocks' ),
		lineHeight: __( 'Line Height', 'generateblocks' ),
		letterSpacing: __( 'Letter Spacing', 'generateblocks' ),
	};

	return (
		<div className="gblocks-typography-component">
			{ availableOptions.length > 1 &&
				<DropdownMenu
					icon={ selectedOptions.length > 1
						? moreVertical
						: plus
					}
					label={ selectedOptions.length > 1
						? __( 'Toggle Options', 'generateblocks' )
						: __( 'Add Options', 'generateblocks' )
					}
					toggleProps={ {
						className: 'gblocks-typography-component__toggle',
					} }
				>
					{ ( { onClose } ) => (
						<Fragment>
							<MenuGroup>
								{ availableOptions.map( ( option, index ) =>
									<MenuItem
										key={ index }
										disabled={ index === 0 }
										icon={ selectedOptions.includes( option ) ? check : null }
										onClick={ () => {
											if ( selectedOptions.includes( option ) ) {
												setSelectedOptions( selectedOptions.filter( ( panel ) => panel !== option ) );
											} else {
												setSelectedOptions( [ ...selectedOptions, option ] );
											}

											onClose();
										} }
									>
										{ optionNames[ option ] }
									</MenuItem>
								) }
							</MenuGroup>
						</Fragment>
					) }
				</DropdownMenu>
			}

			{ availableOptions.includes( 'appearance' ) && selectedOptions.includes( 'appearance' ) &&
				<BaseControl className="gblocks-typography-component__appearance">
					<SelectControl
						label={ __( 'Weight', 'generateblocks' ) }
						value={ fontWeight }
						options={ weight }
						onChange={ ( value ) => {
							setAttributes( {
								fontWeight: value,
							} );
						} }
					/>

					<SelectControl
						label={ __( 'Transform', 'generateblocks' ) }
						value={ textTransform }
						options={ transform }
						onChange={ ( value ) => {
							setAttributes( {
								textTransform: value,
							} );
						} }
					/>
				</BaseControl>
			}

			{ availableOptions.includes( 'fontSize' ) && selectedOptions.includes( 'fontSize' ) &&
				<NumberControl
					{ ...props }
					label={ __( 'Font Size', 'generateblocks' ) }
					attributeName="fontSize"
					units={ [ 'px', 'em', '%' ] }
					device={ deviceType }
					presets={
						[
							{
								unit: 'px',
								data: [ 13, 17, 25, 35 ],
							},
						]
					}
					min="1"
				/>
			}

			{ availableOptions.includes( 'lineHeight' ) && selectedOptions.includes( 'lineHeight' ) &&
				<NumberControl
					{ ...props }
					label={ __( 'Line Height', 'generateblocks' ) }
					attributeName="lineHeight"
					units={ [ 'px', 'em', '%' ] }
					device={ deviceType }
					presets={
						[
							{
								unit: 'em',
								data: [
									{
										label: __( 'Small', 'generateblocks' ),
										value: 0.8,
									},
									{
										label: __( 'Medium', 'generateblocks' ),
										value: 1,
									},
									{
										label: __( 'Large', 'generateblocks' ),
										value: 1.5,
									},
								],
							},
						]
					}
					min="0"
					step={ .1 }
				/>
			}

			{ availableOptions.includes( 'letterSpacing' ) && selectedOptions.includes( 'letterSpacing' ) &&
				<NumberControl
					{ ...props }
					label={ __( 'Letter Spacing', 'generateblocks' ) }
					attributeName="letterSpacing"
					unit="em"
					units={ [ 'em' ] }
					device={ deviceType }
					presets={
						[
							{
								unit: 'em',
								data: [
									{
										label: __( 'Small', 'generateblocks' ),
										value: -0.02,
									},
									{
										label: __( 'Medium', 'generateblocks' ),
										value: 0.02,
									},
									{
										label: __( 'Large', 'generateblocks' ),
										value: 0.05,
									},
								],
							},
						]
					}
					min={ -1 }
					step={ .01 }
				/>
			}

			{ availableOptions.includes( 'fontFamily' ) && selectedOptions.includes( 'fontFamily' ) &&
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
			}
		</div>
	);
}
