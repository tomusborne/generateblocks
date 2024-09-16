import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export function Edit() {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps( blockProps );

	return (
		<>
			<div { ...innerBlocksProps } />
		</>
	);
}
