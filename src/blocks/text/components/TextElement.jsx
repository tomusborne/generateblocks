import { Icon } from './Icon.jsx';

export function TextElement( { icon, iconLocation, tagName, blockProps, children } ) {
	if ( ! icon ) {
		return children;
	}

	const TagName = tagName;

	return (
		<>
			<TagName { ...blockProps }>
				{ 'before' === iconLocation && ( <Icon icon={ icon } /> ) }
				{ children }
				{ 'after' === iconLocation && ( <Icon icon={ icon } /> ) }
			</TagName>
		</>
	);
}
