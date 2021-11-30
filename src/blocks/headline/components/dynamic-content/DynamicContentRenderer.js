import { RichText } from '@wordpress/block-editor';
import useDynamicContent from './hooks/useDynamicContent';
import filterAttributes from '../../../../utils/filter-attributes';
import dynamicContentAttributes from './attributes';

export default ( props ) => {
	const {
		attributes,
		context,
	} = props;

	const dynamicContent = useDynamicContent(
		context,
		filterAttributes( attributes, Object.keys( dynamicContentAttributes ) )
	);

	return (
		<RichText.Content
			value={ dynamicContent }
			tagName={ attributes.hasIcon && attributes.icon ? 'span' : undefined }
			className={ attributes.hasIcon && attributes.icon ? 'gb-headline-text' : undefined }
		/>
	);
};
