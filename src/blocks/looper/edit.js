import {
	BlockContextProvider,
	useBlockProps,
	store as blockEditorStore,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

import filterAttributes from '@utils/filter-attributes';
import InspectorControls from './components/InspectorControls';
import BlockControls from './components/BlockControls';
import queryLoopAttributes from './attributes';
import LayoutSelector from './components/LayoutSelector';

export default function LoopEdit( props ) {
	const {
		attributes,
		clientId,
		setAttributes,
	} = props;

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps();

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( blockEditorStore ).getBlocks( clientId ).length,
		[ clientId ]
	);

	return (
		<div { ...blockProps }>
			{ ! hasInnerBlocks
				? <LayoutSelector clientId={ clientId } />
				: <>
					<BlockControls clientId={ clientId } />

					<InspectorControls
						attributes={ filterAttributes( attributes, Object.keys( queryLoopAttributes ) ) }
						setAttributes={ setAttributes }
						clientId={ clientId }
					/>

					<BlockContextProvider value={ { 'generateblocks/query': attributes.query } }>
						{ innerBlocksProps.children }
					</BlockContextProvider>
				</>
			}
		</div>
	);
}
