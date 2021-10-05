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

const GridEdit = ( props ) => {
	const {
		attributes,
		setAttributes,
	} = props;

	const {
		__experimentalSetPreviewDeviceType: setPreviewDeviceType = () => {},
	} = useDispatch( 'core/edit-post' );

	const previewDeviceType = useSelect( ( select ) => {
		const editPost = select( 'core/edit-post' );

		return editPost.__experimentalGetPreviewDeviceType ? editPost.__experimentalGetPreviewDeviceType() : false;
	}, [] );

	const { insertBlocks } = useDispatch( 'core/block-editor' );

	const getBlocksByClientId = useSelect( ( select ) => {
		return select( 'core/block-editor' ).getBlocksByClientId;
	} );

	const [ selectedLayout, setSelectedLayout ] = useState( false );
	const [ selectedDevice, setSelectedDevice ] = useState( previewDeviceType || 'Desktop' );

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
		} else {
			const parentBlock = getBlocksByClientId( props.clientId )[ 0 ];

			if ( parentBlock ) {
				setAttributes( {
					columns: parentBlock.innerBlocks.length,
				} );
			}
		}
	}, [ selectedLayout, attributes.uniqueId, props.clientId ] );

	useEffect( () => {
		if ( generateBlocksInfo.syncResponsivePreviews ) {
			setPreviewDeviceType( selectedDevice );
		}
	}, [ selectedDevice ] );

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
				state={ { selectedLayout, selectedDevice } }
				deviceType={ selectedDevice }
				setDeviceType={ setSelectedDevice }
				blockDefaults={ generateBlocksDefaults.gridContainer }
			/>

			<InspectorAdvancedControls
				anchor={ attributes.anchor }
				setAttributes={ setAttributes }
			/>

			<MainCSS { ...props } />

			<ComponentCSS { ...props } deviceType={ selectedDevice } />

			<div { ...htmlAttributes }>
				{ attributes.columns || selectedLayout
					? <InnerBlocks allowedBlocks={ [ 'generateblocks/container' ] } renderAppender={ false } />
					: <LayoutSelector uniqueId={ attributes.uniqueId } onClick={ setSelectedLayout } />
				}
			</div>
		</Fragment>
	);
};

export default GridEdit;
