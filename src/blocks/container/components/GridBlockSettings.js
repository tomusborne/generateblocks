import { useState } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { BaseControl, Button, TextControl } from '@wordpress/components';
import { useDeviceAttributes } from '../../../hooks';
import { GridColumnSelector } from '../../../extend/inspector-control/controls/layout/components/GridColumnSelector';
import FlexControl from '../../../components/flex-control';
import UnitControl from '../../../components/unit-control';
import getResponsivePlaceholder from '../../../utils/get-responsive-placeholder';
import getDeviceType from '../../../utils/get-device-type';
import getIcon from '../../../utils/get-icon';

function GridBlockSettings( content, props ) {
	const { attributes, setAttributes } = props;
	const { variantRole } = attributes;
	const [ deviceAttributes, setDeviceAttributes ] = useDeviceAttributes( attributes, setAttributes );
	const [ showGridTemplateColumns, setShowGridTemplateColumns ] = useState( false );

	if ( 'grid' !== variantRole ) {
		return content;
	}

	const device = getDeviceType();

	return (
		<>
			<BaseControl
				label={ __( 'Grid Template Columns', 'generateblocks' ) }
				id="grid-template-columns"
			>
				<div className="gb-grid-control__grid-template-columns-rows">
					<TextControl
						id="grid-template-columns"
						value={ deviceAttributes.gridTemplateColumns }
						onChange={ ( value ) => setDeviceAttributes( { gridTemplateColumns: value } ) }
					/>
					<Button
						size="small"
						onClick={ () => setShowGridTemplateColumns( ! showGridTemplateColumns ) }
						icon={ getIcon( 'css-grid' ) }
						isPressed={ showGridTemplateColumns }
						label={ __( 'Choose a preset', 'generateblocks-pro' ) }
						showTooltip
					/>
				</div>

				{ !! showGridTemplateColumns && (
					<GridColumnSelector
						value={ deviceAttributes.gridTemplateColumns }
						onClick={ ( value ) => {
							setDeviceAttributes( { gridTemplateColumns: value } );
						} }
					/>
				) }
			</BaseControl>

			<FlexControl>
				<UnitControl
					label={ __( 'Column Gap', 'generateblocks' ) }
					id="gblocks-column-gap"
					value={ deviceAttributes.columnGap }
					placeholder={ getResponsivePlaceholder( 'columnGap', attributes, device ) }
					onChange={ ( value ) => setDeviceAttributes( { columnGap: value } ) }
				/>

				<UnitControl
					label={ __( 'Row Gap', 'generateblocks' ) }
					id="gblocks-row-gap"
					value={ deviceAttributes.rowGap }
					placeholder={ getResponsivePlaceholder( 'rowGap', attributes, device ) }
					onChange={ ( value ) => setDeviceAttributes( { rowGap: value } ) }
				/>
			</FlexControl>

			{ content }
		</>
	);
}

addFilter(
	'generateblocks.editor.settingsPanel',
	'generateblocks/grid/containerSettingsPanel',
	GridBlockSettings
);
