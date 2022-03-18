import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function Image( props ) {
	const {
		src,
		alt,
		title,
		caption,
		className,
		isDynamic,
		setAttributes,
		isSelected,
	} = props;

	return (
		<>
			<img
				src={ src }
				alt={ alt }
				title={ title }
				className={ className }
			/>

			{ ! isDynamic &&
				(
					!! caption ||
					isSelected
				) &&
				<RichText
					tagName="figcaption"
					aria-label={ __( 'Image caption text' ) }
					placeholder={ __( 'Add caption' ) }
					value={ caption }
					onChange={ ( value ) =>
						setAttributes( { caption: value } )
					}
					inlineToolbar
				/>
			}

			{ !! isDynamic && !! caption &&
				<figcaption>{ caption }</figcaption>
			}
		</>
	);
}
