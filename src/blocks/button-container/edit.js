import { Fragment, useEffect } from '@wordpress/element';
import BlockControls from './components/BlockControls';
import InspectorControls from './components/InspectorControls';
import InspectorAdvancedControls from '../grid/components/InspectorAdvancedControls';
import ComponentCSS from './components/ComponentCSS';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import BlockAppender from './components/BlockAppender';
import { useDeviceType } from '../../hooks';
import classnames from 'classnames';
import { applyFilters } from '@wordpress/hooks';
import { compose } from '@wordpress/compose';
import { withButtonContainerLegacyMigration, withUniqueId } from '../../hoc';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import RootElement from '../../components/root-element';

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

	const [ deviceType, setDeviceType ] = useDeviceType( 'Desktop' );

	const { insertBlocks } = useDispatch( 'core/block-editor' );
	const { getBlocksByClientId } = useSelect( ( select ) => select( 'core/block-editor' ), [] );

	useEffect( () => {
		const thisBlock = getBlocksByClientId( clientId )[ 0 ];

		if ( thisBlock ) {
			const childBlocks = thisBlock.innerBlocks;

			if ( 0 === childBlocks.length ) {
				insertBlocks(
					createBlock( 'generateblocks/button', generateBlocksStyling.button ),
					undefined,
					clientId
				);
			}
		}
	}, [] );

	useEffect( () => {
		if ( context[ 'generateblocks/gridId' ] ) {
			setAttributes( { isPagination: true } );
		}
	}, [ context[ 'generateblocks/gridId' ] ] );

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

			<InspectorControls
				{ ...props }
				deviceType={ deviceType }
				setDeviceType={ setDeviceType }
				state={ { deviceType } }
				blockDefaults={ generateBlocksDefaults.buttonContainer }
			/>

			<InspectorAdvancedControls anchor={ anchor } setAttributes={ setAttributes } />

			<ComponentCSS { ...props } deviceType={ deviceType } />

			<RootElement name={ name } clientId={ clientId }>
				<div { ...blockProps }>
					<InnerBlocks
						allowedBlocks={ [ 'generateblocks/button' ] }
						renderAppender={ () => (
							<BlockAppender clientId={ clientId } innerBlockStyles={ generateBlocksStyling.button } />
						) }
					/>
				</div>
			</RootElement>
		</Fragment>
	);
};

export default compose(
	withUniqueId,
	withButtonContainerLegacyMigration
)( ButtonContainerEdit );
