import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import NumberControl from '../../../components/number-control';

export default ( props ) => {
	const {
		attributes,
		state,
		deviceType,
		setAttributes,
	} = props;

	const {
		verticalAlignment,
		verticalAlignmentTablet,
		verticalAlignmentMobile,
		horizontalAlignment,
		horizontalAlignmentTablet,
		horizontalAlignmentMobile,
	} = attributes;

	return (
		<>
			<NumberControl
				{ ...props }
				label={ __( 'Horizontal Gap', 'generateblocks' ) }
				attributeName="horizontalGap"
				unit="px"
				units={ [ 'px' ] }
				device={ deviceType }
				presets={
					[
						{
							unit: 'px',
							data: [ 20, 40, 60, 80 ],
						},
					]
				}
			/>

			<NumberControl
				{ ...props }
				label={ __( 'Vertical Gap', 'generateblocks' ) }
				attributeName="verticalGap"
				unit="px"
				units={ [ 'px' ] }
				device={ deviceType }
				presets={
					[
						{
							unit: 'px',
							data: [ 20, 40, 60, 80 ],
						},
					]
				}
			/>

			{ 'Desktop' === deviceType && (
				<Fragment>
					<SelectControl
						label={ __( 'Vertical Alignment', 'generateblocks' ) }
						value={ verticalAlignment }
						options={ [
							{ label: __( 'Default', 'generateblocks' ), value: '' },
							{ label: __( 'Top', 'generateblocks' ), value: 'flex-start' },
							{ label: __( 'Center', 'generateblocks' ), value: 'center' },
							{ label: __( 'Bottom', 'generateblocks' ), value: 'flex-end' },
						] }
						onChange={ ( value ) => {
							setAttributes( {
								verticalAlignment: value,
							} );
						} }
					/>

					<SelectControl
						label={ __( 'Horizontal Alignment', 'generateblocks' ) }
						value={ horizontalAlignment }
						options={ [
							{ label: __( 'Default', 'generateblocks' ), value: '' },
							{ label: __( 'Left', 'generateblocks' ), value: 'flex-start' },
							{ label: __( 'Center', 'generateblocks' ), value: 'center' },
							{ label: __( 'Right', 'generateblocks' ), value: 'flex-end' },
						] }
						onChange={ ( value ) => {
							setAttributes( {
								horizontalAlignment: value,
							} );
						} }
					/>
				</Fragment>
			) }

			{ 'Tablet' === deviceType && (
				<Fragment>
					<SelectControl
						label={ __( 'Vertical Alignment', 'generateblocks' ) }
						help={ __( 'Align grid items. Removes same height columns and overrides grid item content alignment.', 'generateblocks' ) }
						value={ verticalAlignmentTablet }
						options={ [
							{ label: __( 'Inherit', 'generateblocks' ), value: 'inherit' },
							{ label: __( 'Default', 'generateblocks' ), value: '' },
							{ label: __( 'Top', 'generateblocks' ), value: 'flex-start' },
							{ label: __( 'Center', 'generateblocks' ), value: 'center' },
							{ label: __( 'Bottom', 'generateblocks' ), value: 'flex-end' },
						] }
						onChange={ ( value ) => {
							setAttributes( {
								verticalAlignmentTablet: value,
							} );
						} }
					/>

					<SelectControl
						label={ __( 'Horizontal Alignment', 'generateblocks' ) }
						value={ horizontalAlignmentTablet }
						options={ [
							{ label: __( 'Inherit', 'generateblocks' ), value: 'inherit' },
							{ label: __( 'Default', 'generateblocks' ), value: '' },
							{ label: __( 'Left', 'generateblocks' ), value: 'flex-start' },
							{ label: __( 'Center', 'generateblocks' ), value: 'center' },
							{ label: __( 'Right', 'generateblocks' ), value: 'flex-end' },
						] }
						onChange={ ( value ) => {
							setAttributes( {
								horizontalAlignmentTablet: value,
							} );
						} }
					/>
				</Fragment>
			) }

			{ 'Mobile' === deviceType && (
				<Fragment>
					<SelectControl
						label={ __( 'Vertical Alignment', 'generateblocks' ) }
						help={ __( 'Align grid items. Removes same height columns and overrides grid item content alignment.', 'generateblocks' ) }
						value={ verticalAlignmentMobile }
						options={ [
							{ label: __( 'Inherit', 'generateblocks' ), value: 'inherit' },
							{ label: __( 'Default', 'generateblocks' ), value: '' },
							{ label: __( 'Top', 'generateblocks' ), value: 'flex-start' },
							{ label: __( 'Center', 'generateblocks' ), value: 'center' },
							{ label: __( 'Bottom', 'generateblocks' ), value: 'flex-end' },
						] }
						onChange={ ( value ) => {
							setAttributes( {
								verticalAlignmentMobile: value,
							} );
						} }
					/>

					<SelectControl
						label={ __( 'Horizontal Alignment', 'generateblocks' ) }
						value={ horizontalAlignmentMobile }
						options={ [
							{ label: __( 'Inherit', 'generateblocks' ), value: 'inherit' },
							{ label: __( 'Default', 'generateblocks' ), value: '' },
							{ label: __( 'Left', 'generateblocks' ), value: 'flex-start' },
							{ label: __( 'Center', 'generateblocks' ), value: 'center' },
							{ label: __( 'Right', 'generateblocks' ), value: 'flex-end' },
						] }
						onChange={ ( value ) => {
							setAttributes( {
								horizontalAlignmentMobile: value,
							} );
						} }
					/>
				</Fragment>
			) }

			{ applyFilters( 'generateblocks.editor.controls', '', 'gridLayout', props, state ) }
		</>
	);
};
