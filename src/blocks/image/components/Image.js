import { InnerBlocks, BlockContextProvider } from '@wordpress/block-editor';
import AnchorTag from './AnchorTag';
import classnames from 'classnames';
import { applyFilters } from '@wordpress/hooks';
import { Spinner } from '@wordpress/components';

export default function Image( props ) {
	const {
		src,
		alt,
		title,
		anchorAttributes,
		imageRef,
		setLoadedNaturalSize,
		naturalWidth,
		naturalHeight,
		attributes,
		temporaryURL,
	} = props;

	const {
		uniqueId,
		anchor,
		mediaId,
		dynamicImage,
		useDynamicData,
		className,
		align,
	} = attributes;

	const htmlAttributes = applyFilters(
		'generateblocks.frontend.htmlAttributes',
		{
			className: classnames( {
				'gb-image': true,
				[ `gb-image-${ uniqueId }` ]: true,
				[ `${ className }` ]: undefined !== className,
				[ `align${ align }` ]: '' !== align,
			} ),
			id: anchor ? anchor : null,
			width: naturalWidth,
			height: naturalHeight,
			src: temporaryURL || src,
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

				{ temporaryURL && <Spinner /> }
			</AnchorTag>

			<BlockContextProvider value={ {
				'generateblocks/dynamicImage': useDynamicData ? parseInt( dynamicImage ) : false,
				'generateblocks/mediaId': ! useDynamicData ? mediaId : false,
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
