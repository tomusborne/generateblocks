import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

export function Edit( props ) {
	const {
		attributes,
		setAttributes,
	} = props;

	const {
		tagName,
	} = attributes;

	useEffect( () => {
		if ( ! tagName ) {
			setAttributes( { tagName: 'div' } );
		}
	}, [ tagName ] );

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps( blockProps );
	const TagName = tagName || 'div';

	return (
		<>
			<TagName { ...innerBlocksProps } />
		</>
	);
}
