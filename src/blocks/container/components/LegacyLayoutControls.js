import {
	SelectControl,
	TextControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import UnitPicker from '../../../components/unit-picker';
import sizingValue from '../../../utils/sizingValue';

export default ( props ) => {
	const {
		attributes,
		setAttributes,
		deviceType,
		blockDefaults,
	} = props;

	const {
		isGrid,
		outerContainer,
		innerContainer,
		containerWidth,
		align,
		useInnerContainer,
		sizing,
		verticalAlignment,
		verticalAlignmentTablet,
		verticalAlignmentMobile,
	} = attributes;

	if ( ! useInnerContainer ) {
		return null;
	}

	return (
		<>
			{ ! isGrid && (
				<>
					{ 'Desktop' === deviceType &&
						<Fragment>
							<SelectControl
								label={ __( 'Container', 'generateblocks' ) }
								value={ outerContainer }
								options={ [
									{ label: __( 'Full width', 'generateblocks' ), value: 'full' },
									{ label: __( 'Contained width', 'generateblocks' ), value: 'contained' },
								] }
								onChange={ ( value ) => {
									setAttributes( {
										outerContainer: value,
									} );

									if ( 'contained' === value && 'full' === align ) {
										setAttributes( {
											align: '',
										} );
									}
								} }
							/>

							{ 'full' === outerContainer &&
								<SelectControl
									label={ __( 'Inner Container', 'generateblocks' ) }
									value={ innerContainer }
									options={ [
										{ label: __( 'Full width', 'generateblocks' ), value: 'full' },
										{ label: __( 'Contained width', 'generateblocks' ), value: 'contained' },
									] }
									onChange={ ( value ) => {
										setAttributes( {
											innerContainer: value,
										} );
									} }
								/>
							}

							{ ( 'contained' === outerContainer || 'contained' === innerContainer ) &&
								<Fragment>
									<UnitPicker
										label={
											'full' === outerContainer &&
											'contained' === innerContainer
												? __( 'Inner Container Width', 'generateblocks' )
												: __( 'Container Width', 'generateblocks' )
										}
										value={ 'px' }
										units={ [ 'px' ] }
										onClick={ () => {
											return false;
										} }
									/>

									<TextControl
										type={ 'number' }
										className="gblocks-container-width"
										value={ parseFloat( containerWidth ) || '' }
										placeholder={ blockDefaults.containerWidth }
										onChange={ ( value ) => {
											setAttributes( {
												containerWidth: '' !== value ? parseFloat( value ) : undefined,
											} );
										} }
									/>
								</Fragment>
							}
						</Fragment>
					}
				</>
			) }

			{ 'Desktop' === deviceType &&
				<>
					{ ( !! isGrid || sizingValue( 'minHeight', sizing ) ) &&
						<>
							<SelectControl
								label={ __( 'Vertical Alignment', 'generateblocks' ) }
								help={ __( 'Align grid item content. Does not apply if vertical alignment is set in the grid.', 'generateblocks' ) }
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
						</>
					}
				</>
			}

			{ 'Tablet' === deviceType && ( !! isGrid || sizingValue( 'minHeight', sizing ) || sizingValue( 'minHeightTablet', sizing ) ) &&
				<SelectControl
					label={ __( 'Vertical Alignment', 'generateblocks' ) }
					help={ __( 'Align grid item content. Does not apply if vertical alignment is set in the grid.', 'generateblocks' ) }
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
			}

			{ 'Mobile' === deviceType && ( !! isGrid || sizingValue( 'minHeight', sizing ) || sizingValue( 'minHeightTablet', sizing ) || sizingValue( 'minHeightMobile', sizing ) ) &&
				<SelectControl
					label={ __( 'Vertical Alignment', 'generateblocks' ) }
					help={ __( 'Align grid item content. Does not apply if vertical alignment is set in the grid.', 'generateblocks' ) }
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
			}

			{ applyFilters( 'generateblocks.editor.controls', '', 'containerLayout', props ) }
		</>
	);
};
