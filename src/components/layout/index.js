import { SelectControl, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import getAttribute from '../../utils/get-attribute';
import getIcon from '../../utils/get-icon';

export default ( props ) => {
	const {
		setAttributes,
		attributes,
		deviceType,
	} = props;

	const {
		display,
		displayTablet,
		displayMobile,
	} = attributes;

	function isFlexItem() {
		let flexItem = false;

		if ( 'Desktop' === deviceType && display.includes( 'flex' ) ) {
			flexItem = true;
		}

		if ( 'Tablet' === deviceType ) {
			if (
				( displayTablet && displayTablet.includes( 'flex' ) ) ||
				( ! displayTablet && display.includes( 'flex' ) )
			) {
				flexItem = true;
			}
		}

		if ( 'Mobile' === deviceType ) {
			if (
				( displayMobile && displayMobile.includes( 'flex' ) ) ||
				( ! displayMobile && displayTablet && displayTablet.includes( 'flex' ) ) ||
				( ! displayMobile && ! displayTablet && display.includes( 'flex' ) )
			) {
				flexItem = true;
			}
		}

		return flexItem;
	}

	return (
		<>
			<PanelBody
				title={ __( 'Layout', 'generateblocks' ) }
				icon={ getIcon( 'layout' ) }
				className="gblocks-panel-label"
			>
				<SelectControl
					label={ __( 'Display', 'generateblocks' ) }
					value={ getAttribute( 'display', props ) }
					options={ [
						{ label: __( 'Default', 'generateblocks' ), value: '' },
						{ label: 'block', value: 'block' },
						{ label: 'inline-block', value: 'inline-block' },
						{ label: 'flex', value: 'flex' },
						{ label: 'inline-flex', value: 'inline-flex' },
						{ label: 'inline', value: 'inline' },
						{ label: 'none', value: 'none' },
					] }
					onChange={ ( value ) => {
						setAttributes( {
							[ getAttribute( 'display', props, true ) ]: value,
						} );
					} }
				/>

				{ isFlexItem() &&
					<>
						<SelectControl
							label={ __( 'Flex Direction', 'generateblocks' ) }
							value={ getAttribute( 'flexDirection', props ) }
							options={ [
								{ label: __( 'Default', 'generateblocks' ), value: '' },
								{ label: __( 'Row', 'generateblocks' ), value: 'row' },
								{ label: __( 'Column', 'generateblocks' ), value: 'column' },
								{ label: __( 'Row (reverse)', 'generateblocks' ), value: 'row-reverse' },
								{ label: __( 'Column (reverse)', 'generateblocks' ), value: 'column-reverse' },
							] }
							onChange={ ( value ) => {
								setAttributes( {
									[ getAttribute( 'flexDirection', props, true ) ]: value,
								} );
							} }
						/>

						<SelectControl
							label={ __( 'Flex Wrap', 'generateblocks' ) }
							value={ getAttribute( 'flexWrap', props ) }
							options={ [
								{ label: __( 'Default', 'generateblocks' ), value: '' },
								{ label: __( 'No Wrap', 'generateblocks' ), value: 'nowrap' },
								{ label: __( 'Wrap', 'generateblocks' ), value: 'wrap' },
								{ label: __( 'Wrap (reverse)', 'generateblocks' ), value: 'wrap-reverse' },
							] }
							onChange={ ( value ) => {
								setAttributes( {
									[ getAttribute( 'flexWrap', props, true ) ]: value,
								} );
							} }
						/>

						<SelectControl
							label={ __( 'Align Items', 'generateblocks' ) }
							value={ getAttribute( 'alignItems', props ) }
							options={ [
								{ label: __( 'Default', 'generateblocks' ), value: '' },
								{ label: __( 'Center', 'generateblocks' ), value: 'center' },
								{ label: __( 'Start', 'generateblocks' ), value: 'flex-start' },
								{ label: __( 'End', 'generateblocks' ), value: 'flex-end' },
								{ label: __( 'Stretch', 'generateblocks' ), value: 'stretch' },
							] }
							onChange={ ( value ) => {
								setAttributes( {
									[ getAttribute( 'alignItems', props, true ) ]: value,
								} );
							} }
						/>

						<SelectControl
							label={ __( 'Justify Content', 'generateblocks' ) }
							value={ getAttribute( 'justifyContent', props ) }
							options={ [
								{ label: __( 'Default', 'generateblocks' ), value: '' },
								{ label: __( 'Center', 'generateblocks' ), value: 'center' },
								{ label: __( 'Start', 'generateblocks' ), value: 'flex-start' },
								{ label: __( 'End', 'generateblocks' ), value: 'flex-end' },
								{ label: __( 'Space Between', 'generateblocks' ), value: 'space-between' },
								{ label: __( 'Space Around', 'generateblocks' ), value: 'space-around' },
							] }
							onChange={ ( value ) => {
								setAttributes( {
									[ getAttribute( 'justifyContent', props, true ) ]: value,
								} );
							} }
						/>
					</>
				}
			</PanelBody>
		</>
	);
};
