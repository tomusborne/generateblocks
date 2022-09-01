import {
	SelectControl,
	TextControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import UnitPicker from '../../../components/unit-picker';
import GridItemWidthControl from './GridItemWidthControl';
import FlexControls from './FlexControls';

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
		useLegacyLayout,
	} = attributes;

	if ( ! useLegacyLayout ) {
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

			{ isGrid && (
				<>
					<GridItemWidthControl
						{ ...props }
					/>

					<FlexControls
						{ ...props }
					/>
				</>
			) }
		</>
	);
};
