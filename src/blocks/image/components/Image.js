import { InnerBlocks, BlockContextProvider } from '@wordpress/block-editor';
import AnchorTag from './AnchorTag';
import classnames from 'classnames';
import { applyFilters } from '@wordpress/hooks';

export default function Image( props ) {
	const {
		src,
		alt,
		title,
		anchorAttributes,
		imageRef,
		setLoadedNaturalSize,
		attributes,
	} = props;

	const {
		uniqueId,
		anchor,
		mediaId,
		dynamicImage,
		isDynamicContent,
		className,
		width,
		height,
	} = attributes;

	const htmlAttributes = applyFilters(
		'generateblocks.frontend.htmlAttributes',
		{
			className: classnames( {
				'gb-image': true,
				[ `gb-image-${ uniqueId }` ]: true,
				[ `${ className }` ]: undefined !== className,
			} ),
			id: anchor ? anchor : null,
			width,
			height,
			src,
			alt,
			title,
		},
		'generateblocks/image',
		attributes
	);

	/* eslint-disable jsx-a11y/alt-text */
	// The alt tag below is added via htmlAttributes.

	return (
		<>
			<AnchorTag { ...anchorAttributes }>
				<img
					{ ...htmlAttributes }
					ref={ imageRef }
					onLoad={ ( event ) => {
						setLoadedNaturalSize( {
							loadedNaturalWidth: event.target?.naturalWidth,
							loadedNaturalHeight: event.target?.naturalHeight,
						} );
					} }
				/>
			</AnchorTag>

			<BlockContextProvider value={ {
				'generateblocks/dynamicImage': isDynamicContent ? parseInt( dynamicImage ) : false,
				'generateblocks/mediaId': ! isDynamicContent ? mediaId : false,
			} }>
				<InnerBlocks
					allowedBlocks={ [ 'generateblocks/headline' ] }
					renderAppender={ false }
				/>
			</BlockContextProvider>
		</>
	);

	/* eslint-enable jsx-a11y/alt-text */
}
