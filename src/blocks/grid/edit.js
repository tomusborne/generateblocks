import wasBlockJustInserted from '../../utils/was-block-just-inserted';
import isBlockVersionLessThan from '../../utils/check-block-version';
import hasNumericValue from '../../utils/has-numeric-value';
import { useDispatch, useSelect } from '@wordpress/data';
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
import withUniqueId from '../../hoc/withUniqueId';
import { compose } from '@wordpress/compose';
import { useDeviceType, useInnerBlocksCount } from '../../hooks';

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
		if ( ! attributes.isDynamic ) {
			setAttributes( { isDynamic: true } );
		}

		// Set our old defaults as static values.
		// @since 1.4.0.
		if ( ! wasBlockJustInserted( attributes ) && isBlockVersionLessThan( attributes.blockVersion, 2 ) ) {
			const legacyDefaults = generateBlocksLegacyDefaults.v_1_4_0.gridContainer;

			const newAttrs = {};

			const hasGlobalStyle = attributes.useGlobalStyle && attributes.globalStyleId;

			if ( ! hasGlobalStyle && ! hasNumericValue( attributes.horizontalGap ) ) {
				newAttrs.horizontalGap = legacyDefaults.horizontalGap;
			}

			if ( Object.keys( newAttrs ).length > 0 ) {
				setAttributes( newAttrs );
			}
		}

		if ( isBlockVersionLessThan( attributes.blockVersion, 2 ) ) {
			setAttributes( { blockVersion: 2 } );
		}
	}, [] );

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

export default compose( withUniqueId )( GridEdit );
