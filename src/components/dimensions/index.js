/**
 * External dependencies
 */
import { __, _x, sprintf } from '@wordpress/i18n';
import { BaseControl, Button, Tooltip } from '@wordpress/components';
import { link, linkOff } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import './editor.scss';
import UnitPicker from '../unit-picker';
import getResponsivePlaceholder from '../../utils/get-responsive-placeholder';

export default function Dimensions( props ) {
	const {
		setAttributes,
		attributes,
		label = __( 'Padding', 'generateblocks' ),
		type = 'padding',
		labelTop = __( 'Top', 'generateblocks' ),
		labelRight = __( 'Right', 'generateblocks' ),
		labelBottom = __( 'Bottom', 'generateblocks' ),
		labelLeft = __( 'Left', 'generateblocks' ),
		device,
		units,
		computedStyles = {},
	} = props;

	const attributeNames = {
		top: type + 'Top',
		right: type + 'Right',
		bottom: type + 'Bottom',
		left: type + 'Left',
		unit: type + 'Unit',
		sync: type + 'SyncUnits',
	};

	const labels = {
		top: labelTop,
		right: labelRight,
		bottom: labelBottom,
		left: labelLeft,
	};

	if ( 'borderRadius' === type ) {
		attributeNames.top = 'borderRadiusTopLeft';
		attributeNames.right = 'borderRadiusTopRight';
		attributeNames.bottom = 'borderRadiusBottomRight';
		attributeNames.left = 'borderRadiusBottomLeft';

		labels.top = _x( 'T-Left', 'short for Top Left', 'generateblocks' );
		labels.right = _x( 'T-Right', 'short for Top Right', 'generateblocks' );
		labels.bottom = _x( 'B-Right', 'short for Bottom Right', 'generateblocks' );
		labels.left = _x( 'B-Left', 'short for Bottom Left', 'generateblocks' );
	}

	if ( 'Desktop' !== device ) {
		attributeNames.top += device;
		attributeNames.right += device;
		attributeNames.bottom += device;
		attributeNames.left += device;
	}

	const onChangeTop = ( value ) => setAttributes( { [ attributeNames.top ]: value } );
	const onChangeRight = ( value ) => setAttributes( { [ attributeNames.right ]: value } );
	const onChangeBottom = ( value ) => setAttributes( { [ attributeNames.bottom ]: value } );
	const onChangeLeft = ( value ) => setAttributes( { [ attributeNames.left ]: value } );
	const onChangeUnits = ( value ) => setAttributes( { [ [ attributeNames.unit ] ]: value } );
	const onChangeAll = ( value ) => setAttributes( {
		[ attributeNames.top ]: value,
		[ attributeNames.right ]: value,
		[ attributeNames.bottom ]: value,
		[ attributeNames.left ]: value,
	} );

	const syncUnits = ( value ) => {
		const numbers = [
			attributes[ attributeNames.top ],
			attributes[ attributeNames.right ],
			attributes[ attributeNames.bottom ],
			attributes[ attributeNames.left ],
		].filter( ( number ) => '' !== number );

		if ( numbers.length === 0 ) {
			setAttributes( {
				[ value ]: ! attributes[ value ],
			} );

			return;
		}

		const syncValue = Math.max.apply( null, numbers ).toString();

		setAttributes( {
			[ value ]: ! attributes[ value ],
			[ attributeNames.top ]: syncValue,
			[ attributeNames.right ]: syncValue,
			[ attributeNames.bottom ]: syncValue,
			[ attributeNames.left ]: syncValue,
		} );
	};

	return (
		<BaseControl className="components-gblocks-dimensions-control">
			<UnitPicker
				label={ label }
				value={ 'undefined' !== typeof attributes[ attributeNames.unit ] ? attributes[ attributeNames.unit ] : 'px' }
				units={ units }
				onClick={ ( value ) => onChangeUnits( value ) }
			/>

			<div className="components-gblocks-dimensions-control__inputs">
				<div>
					<input
						id={ attributeNames.top }
						className="components-gblocks-dimensions-control__number"
						placeholder={ getResponsivePlaceholder(
							attributeNames.top,
							attributes,
							device,
							'margin' === type && 'px' === attributes.marginUnit
								? computedStyles.marginTop
								: ''
						) }
						type="number"
						onChange={ ( event ) => {
							let value = event.target.value;

							if ( 'margin' !== type ) {
								// No negative values allowed here.
								value = value.toString().replace( /-/g, '' );
							}

							if ( attributes[ attributeNames.sync ] ) {
								onChangeAll( value );
							} else {
								onChangeTop( value );
							}
						} }
						/* translators: Dimension label (padding, margin, border) */
						aria-label={ sprintf( __( '%s Top', 'generateblocks' ), label ) }
						value={ attributes[ attributeNames.top ] || '' }
						min={ 'margin' !== type ? 0 : undefined }
					/>

					<label htmlFor={ attributeNames.top } className="gblocks-dimensions-control__label">{ labels.top }</label>
				</div>

				<div>
					<input
						id={ attributeNames.right }
						className="components-gblocks-dimensions-control__number"
						placeholder={ getResponsivePlaceholder( attributeNames.right, attributes, device, '' ) }
						type="number"
						onChange={ ( event ) => {
							let value = event.target.value;

							if ( 'margin' !== type ) {
								// No negative values allowed here.
								value = value.toString().replace( /-/g, '' );
							}

							if ( attributes[ attributeNames.sync ] ) {
								onChangeAll( value );
							} else {
								onChangeRight( value );
							}
						} }
						/* translators: Dimension label (padding, margin, border) */
						aria-label={ sprintf( __( '%s Right', 'generateblocks' ), label ) }
						value={ attributes[ attributeNames.right ] || '' }
						min={ 'margin' !== type ? 0 : undefined }
					/>

					<label htmlFor={ attributeNames.right } className="gblocks-dimensions-control__label">{ labels.right }</label>
				</div>

				<div>
					<input
						id={ attributeNames.bottom }
						className="components-gblocks-dimensions-control__number"
						placeholder={ getResponsivePlaceholder(
							attributeNames.bottom,
							attributes,
							device,
							'margin' === type && 'px' === attributes.marginUnit
								? computedStyles.marginBottom
								: ''
						) }
						type="number"
						onChange={ ( event ) => {
							let value = event.target.value;

							if ( 'margin' !== type ) {
								// No negative values allowed here.
								value = value.toString().replace( /-/g, '' );
							}

							if ( attributes[ attributeNames.sync ] ) {
								onChangeAll( value );
							} else {
								onChangeBottom( value );
							}
						} }
						/* translators: Dimension label (padding, margin, border) */
						aria-label={ sprintf( __( '%s Bottom', 'generateblocks' ), label ) }
						value={ attributes[ attributeNames.bottom ] || '' }
						min={ 'margin' !== type ? 0 : undefined }
					/>

					<label htmlFor={ attributeNames.bottom } className="gblocks-dimensions-control__label">{ labels.bottom }</label>
				</div>

				<div>
					<input
						id={ attributeNames.left }
						className="components-gblocks-dimensions-control__number"
						placeholder={ getResponsivePlaceholder( attributeNames.left, attributes, device, '' ) }
						type="number"
						onChange={ ( event ) => {
							let value = event.target.value;

							if ( 'margin' !== type ) {
								// No negative values allowed here.
								value = value.toString().replace( /-/g, '' );
							}

							if ( attributes[ attributeNames.sync ] ) {
								onChangeAll( value );
							} else {
								onChangeLeft( value );
							}
						} }
						/* translators: Dimension label (padding, margin, border) */
						aria-label={ sprintf( __( '%s Left', 'generateblocks' ), label ) }
						value={ attributes[ attributeNames.left ] || '' }
						min={ 'margin' !== type ? 0 : undefined }
					/>

					<label htmlFor={ attributeNames.left } className="gblocks-dimensions-control__label">{ labels.left }</label>
				</div>

				<Tooltip text={ !! attributes[ attributeNames.sync ] ? __( 'Unlink Sides', 'generateblocks' ) : __( 'Link Sides', 'generateblocks' ) } >
					<Button
						className="components-gblocks-dimensions-control_sync"
						aria-label={ !! attributes[ attributeNames.sync ] ? __( 'Unlink Sides', 'generateblocks' ) : __( 'Link Sides', 'generateblocks' ) }
						isPrimary={ attributes[ attributeNames.sync ] ? attributes[ attributeNames.sync ] : false }
						aria-pressed={ attributes[ attributeNames.sync ] ? attributes[ attributeNames.sync ] : false }
						onClick={ () => syncUnits( attributeNames.sync ) }
						isSmall
					>
						{ !! attributes[ attributeNames.sync ] ? link : linkOff }
					</Button>
				</Tooltip>
			</div>
		</BaseControl>
	);
}
