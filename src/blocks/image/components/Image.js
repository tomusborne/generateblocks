import { InnerBlocks, BlockContextProvider } from '@wordpress/block-editor';
import AnchorTag from './AnchorTag';

export default function Image( props ) {
	const {
		src,
		alt,
		title,
		className,
		anchorAttributes,
		width,
		height,
		imageRef,
		setLoadedNaturalSize,
		dynamicImage,
		isDynamicContent,
		mediaId,
	} = props;

	return (
		<>
			<AnchorTag { ...anchorAttributes }>
				<img
					width={ width }
					height={ height }
					src={ src }
					alt={ alt }
					title={ title }
					className={ className }
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
				'generateblocks/dynamicImage': dynamicImage,
				'generateblocks/mediaId': ! isDynamicContent ? mediaId : false,
			} }>
				<InnerBlocks
					allowedBlocks={ [ 'generateblocks/headline' ] }
					renderAppender={ false }
				/>
			</BlockContextProvider>
		</>
	);
}
