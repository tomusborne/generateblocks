import PanelArea from '../../../components/panel-area';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';
import getIcon from '../../../utils/get-icon';
import { applyFilters } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
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
		isQueryLoop,
	} = attributes;

	return (
		<InspectorControls>
			<PanelArea
				{ ...props }
				title={ __( 'Layout', 'generateblocks' ) }
				initialOpen={ ! isQueryLoop }
				icon={ getIcon( 'layout' ) }
				className={ 'gblocks-panel-label' }
				id={ 'gridLayout' }
				state={ state }
			>
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
							help={ __( 'Align grid items. Removes same height columns and overrides grid item content alignment.', 'generateblocks' ) }
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
			</PanelArea>
		</InspectorControls>
	);
};
