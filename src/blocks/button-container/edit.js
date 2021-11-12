import { Fragment } from '@wordpress/element';
import BlockControls from './components/BlockControls';
import InspectorControls from './components/InspectorControls';
import InspectorAdvancedControls from '../grid/components/InspectorAdvancedControls';
import ComponentCSS from './components/ComponentCSS';
import { InnerBlocks } from '@wordpress/block-editor';
import BlockAppender from './components/BlockAppender';
import { useDeviceType } from '../../hooks';
import classnames from 'classnames';
import { applyFilters } from '@wordpress/hooks';
import { compose } from '@wordpress/compose';
import { withButtonContainerLegacyMigration, withUniqueId } from '../../hoc';

const ButtonContainerEdit = ( props ) => {
	const {
		attributes,
		setAttributes,
		clientId,
	} = props;

	const {
		uniqueId,
		className,
		anchor,
	} = attributes;

	const [ deviceType, setDeviceType ] = useDeviceType( 'Desktop' );

	let htmlAttributes = {
		className: classnames( {
			'gb-button-wrapper': true,
			[ `gb-button-wrapper-${ uniqueId }` ]: true,
			[ `${ className }` ]: undefined !== className,
		} ),
		id: anchor ? anchor : null,
	};

	htmlAttributes = applyFilters(
		'generateblocks.frontend.htmlAttributes',
		htmlAttributes,
		'generateblocks/button-container',
		attributes
	);

	return (
		<Fragment>

			<BlockControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				clientId={ clientId }
				deviceType={ deviceType }
			/>

			<InspectorControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				deviceType={ deviceType }
				setDeviceType={ setDeviceType }
				state={ { deviceType } }
				blockDefaults={ generateBlocksDefaults.buttonContainer }
			/>

			<InspectorAdvancedControls anchor={ anchor } setAttributes={ setAttributes } />

			<ComponentCSS { ...props } deviceType={ deviceType } />

			<div { ...htmlAttributes }>
				<InnerBlocks
					allowedBlocks={ [ 'generateblocks/button' ] }
					renderAppender={ () => (
						<BlockAppender clientId={ clientId } innerBlockStyles={ generateBlocksStyling.button } />
					) }
				/>
			</div>
		</Fragment>
	);
};

export default compose(
	withUniqueId,
	withButtonContainerLegacyMigration
)( ButtonContainerEdit );
