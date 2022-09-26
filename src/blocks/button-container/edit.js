import { Fragment, useEffect, useState } from '@wordpress/element';
import BlockControls from './components/BlockControls';
import InspectorAdvancedControls from '../grid/components/InspectorAdvancedControls';
import ComponentCSS from './components/ComponentCSS';
import { InnerBlocks, useBlockProps, BlockContextProvider } from '@wordpress/block-editor';
import { useDeviceType, useInnerBlocksCount } from '../../hooks';
import classnames from 'classnames';
import { applyFilters } from '@wordpress/hooks';
import { compose } from '@wordpress/compose';
import { withButtonContainerLegacyMigration, withUniqueId } from '../../hoc';
import { useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import RootElement from '../../components/root-element';
import { withBlockContext } from '../../block-context';
import GenerateBlocksInspectorControls from "../../extend/inspector-control";

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
	const [ deviceType ] = useDeviceType( 'Desktop' );
	const innerBlocksCount = useInnerBlocksCount( clientId );

	const { insertBlocks, removeBlock } = useDispatch( 'core/block-editor' );

	useEffect( () => {
		// Add a button when the container is inserted.
		if ( 0 === innerBlocksCount ) {
			insertBlocks(
				createBlock( 'generateblocks/button', generateBlocksStyling.button ),
				undefined,
				clientId
			);
		}

		setButtonCount( innerBlocksCount );
	}, [] );

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
				attributes={ attributes }
				setAttributes={ setAttributes }
				clientId={ clientId }
				deviceType={ deviceType }
			/>

			<GenerateBlocksInspectorControls attributes={ attributes } setAttributes={ setAttributes } />

			<InspectorAdvancedControls anchor={ anchor } setAttributes={ setAttributes } />

			<ComponentCSS { ...props } deviceType={ deviceType } />

			<RootElement name={ name } clientId={ clientId }>
				<div { ...blockProps }>
					<BlockContextProvider value={ { 'generateblocks/query': context[ 'generateblocks/query' ] } }>
						<InnerBlocks
							allowedBlocks={ [ 'generateblocks/button' ] }
							renderAppender={ false }
						/>
					</BlockContextProvider>
				</div>
			</RootElement>
		</Fragment>
	);
};

export default compose(
	withBlockContext,
	withUniqueId,
	withButtonContainerLegacyMigration
)( ButtonContainerEdit );
