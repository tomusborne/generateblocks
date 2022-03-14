/**
 * External dependencies
 */
import classnames from 'classnames';
import { __, sprintf } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
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

		labels.top = __( 'Top Left', 'generateblocks' );
		labels.right = __( 'Top Right', 'generateblocks' );
		labels.bottom = __( 'Bottom Right', 'generateblocks' );
		labels.left = __( 'Bottom Left', 'generateblocks' );
	}

	if ( 'Desktop' !== device ) {
		attributeNames.top += device;
		attributeNames.right += device;
		attributeNames.bottom += device;
		attributeNames.left += device;
	}

	const [ selectedSides, setSelectedSides ] = useState( [] );
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
				<span className="components-gblocks-dimensions-control-sides-wrapper">
					<span className="components-gblocks-dimensions-control-sides-wrapper__box">
						<span
							className={ classnames(
								'components-gblocks-dimensions-control-sides-wrapper__side',
								{
									'is-selected': selectedSides.includes( attributeNames.top ) || !! attributes[ attributeNames.sync ],
								}
							) }
						/>
						<span
							className={ classnames(
								'components-gblocks-dimensions-control-sides-wrapper__side',
								{
									'is-selected': selectedSides.includes( attributeNames.right ) || !! attributes[ attributeNames.sync ],
								}
							) }
						/>
						<span
							className={ classnames(
								'components-gblocks-dimensions-control-sides-wrapper__side',
								{
									'is-selected': selectedSides.includes( attributeNames.bottom ) || !! attributes[ attributeNames.sync ],
								}
							) }
						/>
						<span
							className={ classnames(
								'components-gblocks-dimensions-control-sides-wrapper__side',
								{
									'is-selected': selectedSides.includes( attributeNames.left ) || !! attributes[ attributeNames.sync ],
								}
							) }
						/>
					</span>
				</span>

				<Tooltip text={ labels.top }>
					<div>
						<input
							className="components-gblocks-dimensions-control__number"
							placeholder={ getResponsivePlaceholder( attributeNames.top, attributes, device, '' ) }
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
							onFocus={ () => setSelectedSides( [
								...selectedSides,
								attributeNames.top,
								'borderRadius' === type ? attributeNames.left : null,
							] ) }
							onBlur={ () => setSelectedSides( [] ) }
							/* translators: Dimension label (padding, margin, border) */
							aria-label={ sprintf( __( '%s Top', 'generateblocks' ), label ) }
							value={ attributes[ attributeNames.top ] || '' }
							min={ 'margin' !== type ? 0 : undefined }
						/>
					</div>
				</Tooltip>

				<Tooltip text={ labels.right }>
					<div>
						<input
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
							onFocus={ () => setSelectedSides( [
								...selectedSides,
								attributeNames.right,
								'borderRadius' === type ? attributeNames.top : null,
							] ) }
							onBlur={ () => setSelectedSides( [] ) }
							/* translators: Dimension label (padding, margin, border) */
							aria-label={ sprintf( __( '%s Right', 'generateblocks' ), label ) }
							value={ attributes[ attributeNames.right ] || '' }
							min={ 'margin' !== type ? 0 : undefined }
						/>
					</div>
				</Tooltip>

				<Tooltip text={ labels.bottom }>
					<div>
						<input
							className="components-gblocks-dimensions-control__number"
							placeholder={ getResponsivePlaceholder( attributeNames.bottom, attributes, device, '' ) }
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
							onFocus={ () => setSelectedSides( [
								...selectedSides,
								attributeNames.bottom,
								'borderRadius' === type ? attributeNames.right : null,
							] ) }
							onBlur={ () => setSelectedSides( [] ) }
							/* translators: Dimension label (padding, margin, border) */
							aria-label={ sprintf( __( '%s Bottom', 'generateblocks' ), label ) }
							value={ attributes[ attributeNames.bottom ] || '' }
							min={ 'margin' !== type ? 0 : undefined }
						/>
					</div>
				</Tooltip>

				<Tooltip text={ labels.left }>
					<div>
						<input
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
							onFocus={ () => setSelectedSides( [
								...selectedSides,
								attributeNames.left,
								'borderRadius' === type ? attributeNames.bottom : null,
							] ) }
							onBlur={ () => setSelectedSides( [] ) }
							/* translators: Dimension label (padding, margin, border) */
							aria-label={ sprintf( __( '%s Left', 'generateblocks' ), label ) }
							value={ attributes[ attributeNames.left ] || '' }
							min={ 'margin' !== type ? 0 : undefined }
						/>
					</div>
				</Tooltip>

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
