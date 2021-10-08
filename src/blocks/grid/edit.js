import { useDispatch } from '@wordpress/data';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import LayoutSelector, { getColumnsFromLayout } from './components/LayoutSelector';
import { createBlock } from '@wordpress/blocks';
import BlockControls from './components/BlockControls';
import InspectorControls from './components/InspectorControls';
import InspectorAdvancedControls from './components/InspectorAdvancedControls';
import MainCSS from './css/main';
import ComponentCSS from './components/ComponentCSS';
import classnames from 'classnames';
import { applyFilters } from '@wordpress/hooks';
import { compose } from '@wordpress/compose';
import { useDeviceType, useInnerBlocksCount } from '../../hooks';
import { withUniqueId, withGridLegacyMigration } from '../../hoc';

const GridEdit = ( props ) => {
	const {
		clientId,
		attributes,
		setAttributes,
	} = props;

	const [ selectedLayout, setSelectedLayout ] = useState( false );
	const [ deviceType, setDeviceType ] = useDeviceType( 'Desktop' );
	const innerBlocksCount = useInnerBlocksCount( clientId );

	const { insertBlocks } = useDispatch( 'core/block-editor' );

	useEffect( () => {
		setAttributes( {
			columns: innerBlocksCount,
		} );
	}, [ innerBlocksCount ] );

	useEffect( () => {
		if ( selectedLayout ) {
			const columnsData = getColumnsFromLayout( selectedLayout, attributes.uniqueId );

			columnsData.forEach( ( colAttrs ) => {
				insertBlocks(
					createBlock( 'generateblocks/container', colAttrs ),
					undefined,
					props.clientId,
					false
				);
			} );

			setAttributes( {
				columns: columnsData.length,
			} );

			setSelectedLayout( false );
		}
	}, [ selectedLayout, attributes.uniqueId, props.clientId ] );

	let htmlAttributes = {
		className: classnames( {
			'gb-grid-wrapper': true,
			[ `gb-grid-wrapper-${ attributes.uniqueId }` ]: true,
			[ `${ attributes.className }` ]: undefined !== attributes.className,
		} ),
		id: attributes.anchor ? attributes.anchor : null,
	};

	htmlAttributes = applyFilters( 'generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/grid', attributes );

	return (
		<Fragment>
			{ ( attributes.columns > 0 || selectedLayout ) &&
			<BlockControls uniqueId={ attributes.uniqueId } clientId={ props.clientId } />
			}

			<InspectorControls
				{ ...props }
				state={ { selectedLayout, deviceType } }
				deviceType={ deviceType }
				setDeviceType={ setDeviceType }
				blockDefaults={ generateBlocksDefaults.gridContainer }
			/>

			<InspectorAdvancedControls
				anchor={ attributes.anchor }
				setAttributes={ setAttributes }
			/>

			<MainCSS { ...props } />

			<ComponentCSS { ...props } deviceType={ deviceType } />

			<div { ...htmlAttributes }>
				{ attributes.columns || selectedLayout
					? <InnerBlocks allowedBlocks={ [ 'generateblocks/container' ] } renderAppender={ false } />
					: <LayoutSelector uniqueId={ attributes.uniqueId } onClick={ setSelectedLayout } />
				}
			</div>
		</Fragment>
	);
};

export default compose(
	withUniqueId,
	withGridLegacyMigration,
)( GridEdit );
