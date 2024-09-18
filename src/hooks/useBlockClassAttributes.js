import { useMemo } from '@wordpress/element';

export function useBlockClassAttributes( attributes ) {
	const {
		className = '',
		styles = {},
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
