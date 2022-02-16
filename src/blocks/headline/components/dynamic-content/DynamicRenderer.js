import HeadlineContentRenderer from '../HeadlineContentRenderer';
import ButtonContentRenderer from '../../../button/components/ButtonContentRenderer';
import filterAttributes from '../../../../utils/filter-attributes';
import dynamicContentAttributes from './attributes';
import applyContext from './utils/applyContext';
import { RichText } from '@wordpress/block-editor';
import useDynamicContent from './hooks/useDynamicContent';
import { compose } from '@wordpress/compose';
import withContentLink from './hoc/withContentLink';
import withPreviewContent from './hoc/withPreviewContent';

export default function DynamicRenderer( props ) {
	const {
		name,
		attributes,
		context,
	} = props;

	const dynamicAttributes = filterAttributes( attributes, Object.keys( dynamicContentAttributes ) );
	const attributesWithContext = applyContext( context, dynamicAttributes );
	const content = useDynamicContent( attributesWithContext );

	const ContentRenderer = 'generateblocks/headline' === name
		? compose( withContentLink )( HeadlineContentRenderer )
		: compose( withPreviewContent )( ButtonContentRenderer );

	const textClassName = 'generateblocks/headline' === name
		? 'gb-headline-text'
		: 'gb-button-text';

	const innerContentProps = {
		value: !! attributes.contentType ? content : attributes.content,
		tagName: ( attributes.hasIcon && attributes.icon ? 'span' : undefined ),
		className: ( attributes.hasIcon && attributes.icon ? textClassName : undefined ),
	};

	const newProps = Object.assign( {}, props, {
		InnerContent: !! attributes.contentType ? RichText.Content : RichText,
		innerContentProps,
	} );

	return (
		<ContentRenderer { ...newProps } />
	);
}
