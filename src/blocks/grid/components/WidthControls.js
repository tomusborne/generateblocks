import { Fragment } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { BaseControl, ButtonGroup, Button } from '@wordpress/components';
import getAttribute from '../../../utils/get-attribute';
import getDeviceType from '../../../utils/get-device-type';

function GridItemSettings( content, props ) {
	const { attributes, setAttributes, name } = props;
	const { isGrid, sizing } = attributes;

	if ( 'generateblocks/container' !== name || ! isGrid ) {
		return content;
	}

	const device = getDeviceType();

	function getValue( attributeName ) {
		return sizing && sizing[ getAttribute( attributeName, { attributes, deviceType: device }, true ) ]
			? sizing[ getAttribute( attributeName, { attributes, deviceType: device }, true ) ]
			: '';
	}

	const widths = [
		{ value: '25%', label: '25' },
		{ value: '33.33%', label: '33' },
		{ value: '50%', label: '50' },
		{ value: '66.66%', label: '66' },
		{ value: '75%', label: '75' },
		{ value: '100%', label: '100' },
	];

	return (
		<>
			<BaseControl
				id="gridItemWidth"
				label={ __( 'Grid Item Width (%)', 'generateblocks' ) }
				help={ __( 'More values can be set in the Sizing panel.', 'generateblocks' ) }
			>
				<ButtonGroup id="gridItemWidth" className="gblocks-flex-button-group">
					{
						Object.values( widths ).map( ( width, index ) => {
							return (
								<Fragment key={ 'gridItemWidth' + index }>
									<Button
										isPrimary={ width.value === getValue( 'width' ) }
										onClick={ () => setAttributes( { sizing: { ...sizing, [ getAttribute( 'width', { attributes, deviceType: device }, true ) ]: width.value } } ) }
									>
										{ width.label }
									</Button>
								</Fragment>
							);
						} )
					}
				</ButtonGroup>
			</BaseControl>

			{ content }
		</>
	);
}

addFilter(
	'generateblocks.editor.settingsPanel',
	'generateblocks/grid/gridItemSettings',
	GridItemSettings
);
