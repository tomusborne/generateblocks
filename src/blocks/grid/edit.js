import { useDispatch } from '@wordpress/data';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import GridLayoutSelector, { getColumnsFromLayout } from './components/LayoutSelector';
import { createBlock } from '@wordpress/blocks';
import BlockControls from './components/BlockControls';
import InspectorControls from './components/InspectorControls';
import InspectorAdvancedControls from './components/InspectorAdvancedControls';
import ComponentCSS from './components/ComponentCSS';
import classnames from 'classnames';
import { applyFilters } from '@wordpress/hooks';
import { compose } from '@wordpress/compose';
import { useInnerBlocksCount } from '../../hooks';
import { withUniqueId, withGridLegacyMigration, withDeviceType } from '../../hoc';
import withQueryLoop from '../query-loop/hoc/withQueryLoop';
import { withBlockContext } from '../../block-context';
import GenerateBlocksInspectorControls from '../../extend/inspector-control';
import './components/WidthControls';
import getDeviceType from '../../utils/get-device-type';

const GridEdit = ( props ) => {
	const {
		clientId,
		attributes,
		setAttributes,
		InnerBlocksRenderer = InnerBlocks,
		LayoutSelector = GridLayoutSelector,
		defaultLayout = false,
		templateLock = false,
		context,
	} = props;

	const [ selectedLayout, setSelectedLayout ] = useState( false );
	const deviceType = getDeviceType();
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
			'gb-post-template': !! attributes.isQueryLoop,
			[ `gb-post-template-${ attributes.uniqueId }` ]: !! attributes.isQueryLoop,
		} ),
		id: attributes.anchor ? attributes.anchor : null,
	};

	htmlAttributes = applyFilters( 'generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/grid', attributes );

	const blockProps = useBlockProps( htmlAttributes );

	return (
		<Fragment>
			{ ( ! attributes.isQueryLoop && ( attributes.columns > 0 || selectedLayout ) ) &&
				<BlockControls uniqueId={ attributes.uniqueId } clientId={ props.clientId } />
			}

			<GenerateBlocksInspectorControls
				attributes={ attributes }
				setAttributes={ setAttributes }
			>
				{ applyFilters( 'generateblocks.editor.settingsPanel', undefined, { ...props, device: deviceType } ) }

				<InspectorControls
					attributes={ attributes }
					setAttributes={ setAttributes }
					deviceType={ deviceType }
				/>
			</GenerateBlocksInspectorControls>

			<InspectorAdvancedControls
				anchor={ attributes.anchor }
				setAttributes={ setAttributes }
			/>

			<ComponentCSS { ...props } deviceType={ deviceType } />

			<div { ...blockProps }>
				{ ( attributes.isQueryLoop || attributes.columns > 0 || selectedLayout )
					? (
						<InnerBlocksRenderer
							templateLock={ templateLock }
							allowedBlocks={ [ 'generateblocks/container' ] }
							renderAppender={ false }
							clientId={ clientId }
							uniqueId={ attributes.uniqueId }
							attributes={ attributes }
							context={ context }
						/>
					)
					: (
						<LayoutSelector
							uniqueId={ attributes.uniqueId }
							onClick={ setSelectedLayout }
							isDisabled={ attributes?.isBlockPreview }
						/>
					)
				}
			</div>
		</Fragment>
	);
};

export default compose(
	withDeviceType,
	withBlockContext,
	withQueryLoop,
	withUniqueId,
	withGridLegacyMigration,
)( GridEdit );
