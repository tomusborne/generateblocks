import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import AnchorTag from './AnchorTag';

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
		anchorAttributes,
	} = props;

	return (
		<>
			<AnchorTag { ...anchorAttributes }>
				<img
					src={ src }
					alt={ alt }
					title={ title }
					className={ className }
				/>
			</AnchorTag>

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
