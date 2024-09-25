import { Modal, Button, Tooltip } from '@wordpress/components';
import { useState, createInterpolateElement } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { __ } from '@wordpress/i18n';
import getIcon from '../../utils/get-icon';
import '../editor.scss';
import { DynamicTagSelect } from './DynamicTagSelect';
import { closeSmall } from '@wordpress/icons';

export function DynamicTagModal( { onInsert, renderToggle, tooltip, tagName, selectedText, value, foundTags, onRemove } ) {
	const [ isOpen, setOpen ] = useState( false );
	const [ tagToEdit, setTagToEdit ] = useState( null );

	// Use getEntityRecord to get the current post from the block editor

	const currentPost = useSelect( ( select ) => {
		const { getCurrentPost } = select( editorStore );

		return getCurrentPost ? getCurrentPost() : null;
	} );

	function onToggle() {
		setOpen( ! isOpen );
	}

	function Toggle() {
		if ( renderToggle ) {
			return renderToggle( { isOpen, onToggle } );
		}

		const button = <Button
			onClick={ onToggle }
			aria-expanded={ isOpen }
			icon={ getIcon( 'database' ) }
			label={ __( 'Dynamic tags', 'generateblocks' ) }
			size="compact"
		/>;

		return (
			<>
				{ !! tooltip
					? <Tooltip text={ tooltip }>{ button }</Tooltip>
					: button
				}
			</>
		);
	}

	function CreateNew() {
		return (
			<Button
				onClick={ () => setTagToEdit( '' ) }
				variant="link"
				className="gb-dynamic-tag-modal__create-new"
			>
				{ __( 'insert a new one', 'generateblocks' ) }
			</Button>
		);
	}

	const foundTagsDescription = createInterpolateElement(
		__( 'Choose an existing dynamic tag to edit, or <CreateNew />.' ),
		{
			CreateNew: <CreateNew />,
		}
	);

	return (
		<>
			<Toggle />

			{ isOpen && (
				<Modal
					title={ __( 'Dynamic Tags', 'generateblocks' ) }
					onRequestClose={ () => {
						setTagToEdit( null );
						onToggle();
					} }
					className="gb-dynamic-tag-modal"
					size="medium"
				>
					<div className="gb-dynamic-tag-modal__content">
						{ !! foundTags.length && null === tagToEdit && ! selectedText ? (
							<>
								<p style={ { margin: 0 } }>{ foundTagsDescription }</p>
								<ul className="gb-dynamic-tag-modal__found-tags">
									{ foundTags.map( ( tag ) => (
										<li key={ tag }>
											<Button
												onClick={ () => setTagToEdit( tag ) }
												className="gb-dynamic-tag-modal__tag"
												variant="link"
											>
												{ tag }
											</Button>

											<Button
												onClick={ () => {
													onRemove( tag );
													onToggle();
												} }
												size="small"
												icon={ closeSmall }
												label={ __( 'Remove tag from content', 'generateblocks' ) }
												showTooltip
											/>
										</li>
									) ) }
								</ul>
							</>
						) : (
							<DynamicTagSelect
								onInsert={ ( newValue ) => {
									onInsert( newValue, { tagToReplace: tagToEdit } );
									setTagToEdit( null );
									onToggle();
								} }
								tagName={ tagName }
								value={ value }
								selectedText={ tagToEdit || selectedText }
								tagToReplace={ tagToEdit }
								currentPost={ currentPost }
							/>
						) }
					</div>
				</Modal>
			) }
		</>
	);
}
