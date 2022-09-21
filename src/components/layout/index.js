import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import getIcon from '../../utils/get-icon';
import LayoutControl from './LayoutControl';

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

	const componentProps = {
		setAttributes,
		attributes,
		deviceType,
	};

	return (
		<>
			<PanelBody
				title={ __( 'Layout', 'generateblocks' ) }
				icon={ getIcon( 'layout' ) }
				className="gblocks-panel-label"
			>
				<LayoutControl
					{ ...componentProps }
					label={ __( 'Display', 'generateblocks' ) }
					attributeName="display"
					options={ [
						{ label: __( 'Default', 'generateblocks' ), value: '' },
						{ label: 'block', value: 'block' },
						{ label: 'inline-block', value: 'inline-block' },
						{ label: 'flex', value: 'flex' },
						{ label: 'inline-flex', value: 'inline-flex' },
						{ label: 'inline', value: 'inline' },
						{ label: 'none', value: 'none' },
					] }
				/>

				{ isFlexItem() &&
					<>
						<LayoutControl
							{ ...componentProps }
							label={ __( 'Flex Direction', 'generateblocks' ) }
							attributeName="flexDirection"
							options={ [
								{ label: __( 'Default', 'generateblocks' ), value: '' },
								{ label: __( 'Row', 'generateblocks' ), value: 'row' },
								{ label: __( 'Column', 'generateblocks' ), value: 'column' },
								{ label: __( 'Row (reverse)', 'generateblocks' ), value: 'row-reverse' },
								{ label: __( 'Column (reverse)', 'generateblocks' ), value: 'column-reverse' },
							] }
						/>

						<LayoutControl
							{ ...componentProps }
							label={ __( 'Flex Wrap', 'generateblocks' ) }
							attributeName="flexWrap"
							options={ [
								{ label: __( 'Default', 'generateblocks' ), value: '' },
								{ label: __( 'No Wrap', 'generateblocks' ), value: 'nowrap' },
								{ label: __( 'Wrap', 'generateblocks' ), value: 'wrap' },
								{ label: __( 'Wrap (reverse)', 'generateblocks' ), value: 'wrap-reverse' },
							] }
						/>

						<LayoutControl
							{ ...componentProps }
							label={ __( 'Align Items', 'generateblocks' ) }
							attributeName="alignItems"
							options={ [
								{ label: __( 'Default', 'generateblocks' ), value: '' },
								{ label: __( 'Center', 'generateblocks' ), value: 'center' },
								{ label: __( 'Start', 'generateblocks' ), value: 'flex-start' },
								{ label: __( 'End', 'generateblocks' ), value: 'flex-end' },
								{ label: __( 'Stretch', 'generateblocks' ), value: 'stretch' },
							] }
						/>

						<LayoutControl
							{ ...componentProps }
							label={ __( 'Justify Content', 'generateblocks' ) }
							attributeName="justifyContent"
							options={ [
								{ label: __( 'Default', 'generateblocks' ), value: '' },
								{ label: __( 'Center', 'generateblocks' ), value: 'center' },
								{ label: __( 'Start', 'generateblocks' ), value: 'flex-start' },
								{ label: __( 'End', 'generateblocks' ), value: 'flex-end' },
								{ label: __( 'Space Between', 'generateblocks' ), value: 'space-between' },
								{ label: __( 'Space Around', 'generateblocks' ), value: 'space-around' },
							] }
						/>
					</>
				}
			</PanelBody>
		</>
	);
};
