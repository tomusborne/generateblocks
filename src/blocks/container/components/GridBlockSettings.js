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
						icon={ () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><rect x="32" y="56" width="192" height="144" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><line x1="96" y1="56" x2="96" y2="200" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><line x1="160" y1="56" x2="160" y2="200" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><line x1="32" y1="104" x2="224" y2="104" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><line x1="32" y1="152" x2="224" y2="152" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /></svg> }
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
