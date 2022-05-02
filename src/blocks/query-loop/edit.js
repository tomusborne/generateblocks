import InspectorControls from './components/InspectorControls';
import BlockControls from './components/BlockControls';
import filterAttributes from '../../utils/filter-attributes';
import queryLoopAttributes from './attributes';
import {
	BlockContextProvider,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import { useInnerBlocksCount } from '../../hooks';
import LayoutSelector from './components/LayoutSelector';

export default function QueryLoopEdit( props ) {
	const {
		attributes,
		clientId,
		setAttributes,
	} = props;

	const blockProps = useBlockProps();
	const innerBlocksCount = useInnerBlocksCount( clientId );

	return (
		<>
			<div { ...blockProps }>
				{ 0 === innerBlocksCount
					? <LayoutSelector clientId={ clientId } />
					: <>
						<BlockControls clientId={ clientId } />

						<InspectorControls
							attributes={ filterAttributes( attributes, Object.keys( queryLoopAttributes ) ) }
							setAttributes={ setAttributes }
							clientId={ clientId }
						/>

						<BlockContextProvider value={ { 'generateblocks/query': attributes.query } }>
							<InnerBlocks
								renderAppender={ false }
							/>
						</BlockContextProvider>
					</>
				}
			</div>
		</>
	);
}
