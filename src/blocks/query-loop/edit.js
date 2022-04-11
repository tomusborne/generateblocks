import InspectorControls from './components/InspectorControls';
import filterAttributes from '../../utils/filter-attributes';
import queryLoopAttributes from './attributes';
import {
	BlockContextProvider,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { Tooltip, Button } from '@wordpress/components';
import { Icon, plus } from '@wordpress/icons';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { useInnerBlocksCount } from '../../hooks';
import LayoutSelector from './components/LayoutSelector';

const DEFAULT_BUTTON_ATTRIBUTES = {
	hasUrl: false,
	backgroundColor: '#0366d6',
	textColor: '#ffffff',
	backgroundColorHover: '#222222',
	textColorHover: '#ffffff',
	paddingTop: '15',
	paddingRight: '20',
	paddingBottom: '15',
	paddingLeft: '20',
	isDynamicContent: true,
	isPagination: true,
};

const PAGINATION_TEMPLATE = [
	'generateblocks/button-container', {
		isPagination: true,
	},
	[
		[
			'generateblocks/button',
			Object.assign( {}, DEFAULT_BUTTON_ATTRIBUTES, {
				text: __( 'Previous page', 'generateblocks' ),
				dynamicLinkType: 'pagination-prev',
			} ),
		],
		[
			'generateblocks/button',
			Object.assign( {}, DEFAULT_BUTTON_ATTRIBUTES, {
				text: __( '1 2 … 10', 'generateblocks' ),
				contentType: 'pagination-numbers',
			} ),
		],
		[
			'generateblocks/button',
			Object.assign( {}, DEFAULT_BUTTON_ATTRIBUTES, {
				text: __( 'Next page', 'generateblocks' ),
				dynamicLinkType: 'pagination-next',
			} ),
		],
	],
];

export default function QueryLoopEdit( props ) {
	const {
		attributes,
		clientId,
		setAttributes,
	} = props;

	const {
		getClientIdsOfDescendants,
		getBlock,
		getBlockParents,
	} = useSelect( ( select ) => select( 'core/block-editor' ), [] );
	const { insertBlocks } = useDispatch( 'core/block-editor' );

	const hasBlock = ( blockName, blocks ) => {
		return blocks.some( ( child ) => {
			const block = getBlock( child );

			if ( blockName === block.name ) {
				return true;
			}

			return false;
		} );
	};

	const blockProps = useBlockProps();
	const innerBlocksCount = useInnerBlocksCount( clientId );

	return (
		<>
			<div { ...blockProps }>
				{ 0 === innerBlocksCount
					? <LayoutSelector clientId={ clientId } />
					: <>
						<InspectorControls
							attributes={ filterAttributes( attributes, Object.keys( queryLoopAttributes ) ) }
							setAttributes={ setAttributes }
							clientId={ clientId }
						/>

						<BlockContextProvider value={ { 'generateblocks/query': attributes.query } }>
							<InnerBlocks
								renderAppender={ () => {
									const childBlocks = getClientIdsOfDescendants( [ clientId ] );

									if ( childBlocks ) {
										const directChildren = childBlocks.filter( ( child ) => {
											const parentId = getBlockParents( child, true )[ 0 ];
											const parent = getBlock( parentId );

											if ( 'generateblocks/query-loop' === parent.name ) {
												return true;
											}

											return false;
										} );

										const hasPagination = hasBlock( 'generateblocks/button-container', directChildren );

										if ( ! hasPagination ) {
											return <Tooltip text={ __( 'Add Pagination', 'generateblocks' ) }>
												<Button
													className="block-editor-button-block-appender gblocks-query-block-appender"
													onClick={ () => {
														insertBlocks( createBlocksFromInnerBlocksTemplate( [ PAGINATION_TEMPLATE ] ), undefined, clientId );
													} }
												>
													<Icon icon={ plus } />
												</Button>
											</Tooltip>;
										}
									}

									return false;
								} }
							/>
						</BlockContextProvider>
					</>
				}
			</div>
		</>
	);
}
