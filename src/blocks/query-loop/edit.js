import InspectorControls from './components/InspectorControls';
import BlockControls from './components/BlockControls';
import filterAttributes from '../../utils/filter-attributes';
import queryLoopAttributes from './attributes';
import {
	BlockContextProvider,
	InnerBlocks,
	useBlockProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import LayoutSelector from './components/LayoutSelector';
import { useSelect } from '@wordpress/data';

export default function QueryLoopEdit( props ) {
	const {
		attributes,
		clientId,
		setAttributes,
	} = props;

	const blockProps = useBlockProps();

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( blockEditorStore ).getBlocks( clientId ).length,
		[ clientId ]
	);

	return (
		<>
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
