import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { LinkBlockToolbar } from '@components/link-block-toolbar';

const withButtonLinkToolbar = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const {
			name,
			attributes,
			setAttributes,
			context,
		} = props;

		const {
			tagName,
			htmlAttributes,
		} = attributes;

		if ( 'generateblocks/text' !== name || tagName !== 'a' ) {
			return <BlockEdit { ...props } />;
		}

		return (
			<>
				<BlockEdit { ...props } />

				<LinkBlockToolbar
					setAttributes={ setAttributes }
					htmlAttributes={ htmlAttributes }
					tagName={ tagName }
					context={ context }
				/>
			</>
		);
	};
}, 'withButtonLinkToolbar' );

addFilter(
	'editor.BlockEdit',
	'generateblocks/blockControls/buttonLinkToolbar',
	withButtonLinkToolbar,
	100
);
