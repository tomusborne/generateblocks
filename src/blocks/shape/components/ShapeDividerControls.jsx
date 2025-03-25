import { useMemo } from '@wordpress/element';
import { SelectControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { useBlockStyles } from '@hooks/useBlockStyles';

function splitSpaces( value ) {
	return value.split( /\s+(?![^()]*\))/ );
}

export function ShapeDividerControls( { getStyleValue, onStyleChange } ) {
	const {
		atRule,
	} = useBlockStyles();
	const currentPosition = getStyleValue( 'position', atRule );
	const currentTopValue = getStyleValue( 'top', atRule );
	const currentBottomValue = getStyleValue( 'bottom', atRule );
	const currentTransformsValue = getStyleValue( 'transform', atRule );
	const locationValue = useMemo( () => {
		if ( 'absolute' !== currentPosition ) {
			return '';
		}

		if ( '0' === currentTopValue && '' === currentBottomValue ) {
			return 'top';
		}

		if ( '0' === currentBottomValue && '' === currentTopValue ) {
			return 'bottom';
		}

		return '';
	}, [ currentPosition, currentTopValue, currentBottomValue ] );
	const flippedHorizontallyValue = useMemo( () => {
		if ( ! currentTransformsValue ) {
			return false;
		}

		const existingTransforms = currentTransformsValue ? splitSpaces( currentTransformsValue ) : [];
		const scaleValue = existingTransforms.find( ( transform ) => transform.startsWith( 'scale' ) ) ?? '';

		if ( 'top' === locationValue ) {
			return scaleValue.includes( '-1, -1' );
		}

		return scaleValue.includes( '-1, 1' );
	}, [ currentTransformsValue, locationValue ] );

	if ( ! locationValue ) {
		return null;
	}

	return (
		<>
			<SelectControl
				label={ __( 'Location', 'generateblocks' ) }
				value={ locationValue }
				options={ [
					{ label: __( 'Top', 'generateblocks' ), value: 'top' },
					{ label: __( 'Bottom', 'generateblocks' ), value: 'bottom' },
				] }
				onChange={ ( value ) => {
					const newValues = {};
					const existingTransformsValue = getStyleValue( 'transform', atRule );
					const existingTransforms = existingTransformsValue ? splitSpaces( existingTransformsValue ) : [];
					const scaleValue = existingTransforms.find( ( transform ) => transform.startsWith( 'scale' ) );
					let newScaleValue = 'top' === value ? 'scale(1, -1)' : '';

					if ( flippedHorizontallyValue ) {
						if ( 'top' === value ) {
							newScaleValue = 'scale(-1, -1)';
						} else {
							newScaleValue = 'scale(-1, 1)';
						}
					}

					if ( 'top' === value ) {
						newValues.top = '0';
						newValues.bottom = '';
					} else {
						newValues.top = '';
						newValues.bottom = '0';
					}

					if ( scaleValue ) {
						newValues.transform = existingTransformsValue.replace( scaleValue, newScaleValue ).trim();
					} else {
						newValues.transform = existingTransformsValue ? `${ existingTransformsValue } ${ newScaleValue }` : newScaleValue;
						newValues.transform = newValues.transform.trim();
					}

					onStyleChange( newValues, atRule );
				} }
			/>

			<ToggleControl
				label={ __( 'Flip Horizontal', 'generateblocks' ) }
				checked={ flippedHorizontallyValue }
				onChange={ ( value ) => {
					const newValues = {};
					const existingTransformsValue = getStyleValue( 'transform', atRule );
					const existingTransforms = existingTransformsValue ? splitSpaces( existingTransformsValue ) : [];
					const scaleValue = existingTransforms.find( ( transform ) => transform.startsWith( 'scale' ) );
					let newScaleValue = value ? 'scale(-1, 1)' : '';

					if ( 'top' === locationValue ) {
						if ( value ) {
							newScaleValue = 'scale(-1, -1)';
						} else {
							newScaleValue = 'scale(1, -1)';
						}
					}

					if ( scaleValue ) {
						newValues.transform = existingTransformsValue.replace( scaleValue, newScaleValue ).trim();
					} else {
						newValues.transform = existingTransformsValue ? `${ existingTransformsValue } ${ newScaleValue }` : newScaleValue;
						newValues.transform = newValues.transform.trim();
					}

					onStyleChange( newValues, atRule );
				} }
			/>
		</>
	);
}
