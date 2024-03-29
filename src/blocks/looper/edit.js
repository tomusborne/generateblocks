import {
	BlockContextProvider,
	useBlockProps,
	store as blockEditorStore,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

import InspectorControls from './components/InspectorControls';
import BlockControls from './components/BlockControls';
import filterAttributes from '../../utils/filter-attributes';
import queryLoopAttributes from './attributes';
import LayoutSelector from './components/LayoutSelector';
import InspectorAdvancedControls from './components/InspectorAdvancedControls';

export default function LoopEdit( props ) {
	const {
		attributes,
		clientId,
		setAttributes,
	} = props;

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps( blockProps );

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( blockEditorStore ).getBlocks( clientId ).length,
		[ clientId ]
	);

	return (
		<>
			<div { ...innerBlocksProps }>
				{ ! hasInnerBlocks
					? <LayoutSelector clientId={ clientId } />
					: <>
						<BlockControls clientId={ clientId } />

						<InspectorControls
							attributes={ filterAttributes( attributes, Object.keys( queryLoopAttributes ) ) }
							setAttributes={ setAttributes }
							clientId={ clientId }
						/>

						<InspectorAdvancedControls
							blockLabel={ attributes.blockLabel }
							setAttributes={ setAttributes }
						/>

						<BlockContextProvider value={ { 'generateblocks/query': attributes.query } }>
							{ innerBlocksProps.children }
						</BlockContextProvider>
					</>
				}
			</div>
		</>
	);
}
