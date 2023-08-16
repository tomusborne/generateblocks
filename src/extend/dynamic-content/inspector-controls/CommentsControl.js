import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function CommentsControl( props ) {
	const {
		isActive,
		noCommentsText,
		singleCommentText,
		multipleCommentsText,
		setAttributes,
	} = props;

	return (
		<>
			{ isActive &&
				<>
					<TextControl
						className="no-comments-text-input"
						label={ __( 'No comments text', 'generateblocks' ) }
						value={ noCommentsText }
						onChange={ ( value ) => setAttributes( { noCommentsText: value } ) }
					/>

					<TextControl
						className="single-comment-text-input"
						label={ __( 'Single comment text', 'generateblocks' ) }
						value={ singleCommentText }
						onChange={ ( value ) => setAttributes( { singleCommentText: value } ) }
					/>

					<TextControl
						className="multiple-comments-text-input"
						label={ __( 'Multiple comments text', 'generateblocks' ) }
						value={ multipleCommentsText }
						onChange={ ( value ) => setAttributes( { multipleCommentsText: value } ) }
					/>
				</>
			}
		</>
	);
}
