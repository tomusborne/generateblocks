import { Fragment, useEffect, useState } from '@wordpress/element';
import BlockControls from './components/BlockControls';
import InspectorAdvancedControls from '../grid/components/InspectorAdvancedControls';
import ComponentCSS from './components/ComponentCSS';
import { InnerBlocks, useBlockProps, BlockContextProvider } from '@wordpress/block-editor';
import { useInnerBlocksCount } from '../../hooks';
import classnames from 'classnames';
import { applyFilters } from '@wordpress/hooks';
import { compose } from '@wordpress/compose';
import { withButtonContainerLegacyMigration, withDeviceType, withUniqueId } from '../../hoc';
import { useDispatch } from '@wordpress/data';
import RootElement from '../../components/root-element';
import { withBlockContext } from '../../block-context';
import GenerateBlocksInspectorControls from '../../extend/inspector-control';
import getDeviceType from '../../utils/get-device-type';

const ButtonContainerEdit = ( props ) => {
	const {
		attributes,
		setAttributes,
		clientId,
		name,
		context,
	} = props;

	const {
		uniqueId,
		className,
		anchor,
	} = attributes;

	const [ buttonCount, setButtonCount ] = useState( 0 );
	const deviceType = getDeviceType();
	const innerBlocksCount = useInnerBlocksCount( clientId );

	const { removeBlock } = useDispatch( 'core/block-editor' );

	useEffect( () => {
		// If we've removed all of our buttons, remove the container.
		if ( 1 === buttonCount && 0 === innerBlocksCount ) {
			removeBlock( clientId );
		}

		setButtonCount( innerBlocksCount );
	}, [ innerBlocksCount ] );

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

	const blockProps = useBlockProps( htmlAttributes );

	return (
		<Fragment>
			<BlockControls
				{ ...props }
				deviceType={ deviceType }
			/>

			<GenerateBlocksInspectorControls
				attributes={ attributes }
				setAttributes={ setAttributes }
			>
				{ applyFilters( 'generateblocks.editor.settingsPanel', undefined, { ...props, device: deviceType } ) }
			</GenerateBlocksInspectorControls>

			<InspectorAdvancedControls anchor={ anchor } setAttributes={ setAttributes } />

			<ComponentCSS { ...props } deviceType={ deviceType } />

			<RootElement name={ name } clientId={ clientId }>
				<div { ...blockProps }>
					<BlockContextProvider value={ { 'generateblocks/query': context[ 'generateblocks/query' ] } }>
						<InnerBlocks
							allowedBlocks={ [ 'generateblocks/button' ] }
							renderAppender={ false }
							template={ [
								[ 'generateblocks/button', generateBlocksStyling.button ],
							] }
						/>
					</BlockContextProvider>
				</div>
			</RootElement>
		</Fragment>
	);
};

export default compose(
	withDeviceType,
	withBlockContext,
	withUniqueId,
	withButtonContainerLegacyMigration
)( ButtonContainerEdit );
