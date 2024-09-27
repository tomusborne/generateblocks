import { useMemo } from '@wordpress/element';

export function useBlockClassAttributes( styles, attributes ) {
	const {
		className = '',
		uniqueId = '',
		globalClasses = [],
	} = attributes;

	const classAttributes = useMemo( () => {
		return {
			className,
			styles,
			uniqueId,
			globalClasses,
		};
	}, [ className, styles, uniqueId, styles, globalClasses ] );

	return classAttributes;
}
