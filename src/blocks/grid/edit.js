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
import withQueryLoop from './hoc/withQueryLoop';

const GridEdit = ( props ) => {
	const {
		clientId,
		attributes,
		setAttributes,
		InnerBlocksRenderer = InnerBlocks,
		defaultLayout = false,
		templateLock = false,
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
		const layout = defaultLayout || selectedLayout;

		if ( ! attributes.isQueryLoop && layout ) {
			const columnsData = getColumnsFromLayout( layout, attributes.uniqueId );

			columnsData.forEach( ( colAttrs ) => {
				insertBlocks(
					createBlock( 'generateblocks/container', colAttrs ),
					undefined,
					props.clientId,
					false
				);
			} );

			setSelectedLayout( false );
		}
	}, [
		selectedLayout,
		defaultLayout,
		attributes.uniqueId,
		props.clientId,
		attributes.isQueryLoop,
	] );

	let htmlAttributes = {
		className: classnames( {
			'gb-grid-wrapper': true,
			[ `gb-grid-wrapper-${ attributes.uniqueId }` ]: true,
			[ `${ attributes.className }` ]: undefined !== attributes.className,
			'gb-is-query-wrapper': attributes.isQueryLoop,
		} ),
		id: attributes.anchor ? attributes.anchor : null,
	};

	htmlAttributes = applyFilters( 'generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/grid', attributes );

	return (
		<Fragment>
			{ ( ! attributes.isQueryLoop && ( attributes.columns > 0 || selectedLayout ) ) &&
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
				{ ( attributes.isQueryLoop || attributes.columns > 0 || selectedLayout )
					? (
						<InnerBlocksRenderer
							templateLock={ templateLock }
							allowedBlocks={ [ 'generateblocks/container' ] }
							renderAppender={ false }
							clientId={ clientId }
							uniqueId={ attributes.uniqueId }
						/>
					)
					: <LayoutSelector uniqueId={ attributes.uniqueId } onClick={ setSelectedLayout } />
				}
			</div>
		</Fragment>
	);
};

export default compose(
	withQueryLoop,
	withUniqueId,
	withGridLegacyMigration,
)( GridEdit );
