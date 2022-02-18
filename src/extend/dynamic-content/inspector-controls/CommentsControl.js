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
						label={ __( 'No comments text', 'generateblocks' ) }
						value={ noCommentsText }
						onChange={ ( value ) => setAttributes( { noCommentsText: value } ) }
					/>

					<TextControl
						label={ __( 'Single comment text', 'generateblocks' ) }
						value={ singleCommentText }
						onChange={ ( value ) => setAttributes( { singleCommentText: value } ) }
					/>

					<TextControl
						label={ __( 'Multiple comments text', 'generateblocks' ) }
						value={ multipleCommentsText }
						onChange={ ( value ) => setAttributes( { multipleCommentsText: value } ) }
					/>
				</>
			}
		</>
	);
}
