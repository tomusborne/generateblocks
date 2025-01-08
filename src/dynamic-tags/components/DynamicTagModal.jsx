import { Modal, Button, Tooltip } from '@wordpress/components';
import { useState, createInterpolateElement, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { __ } from '@wordpress/i18n';
import { closeSmall } from '@wordpress/icons';

import getIcon from '../../utils/get-icon';
import { DynamicTagSelect } from './DynamicTagSelect';
import '../editor.scss';

import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

export function DynamicTagModal( {
	onInsert,
	renderToggle,
	tooltip,
	tagName,
	selectedText,
	value,
	foundTags,
	onRemove,
	context,
} ) {
	const [ isOpen, setOpen ] = useState( false );
	const [ tagToEdit, setTagToEdit ] = useState( null );
	const { currentPost, currentUser } = useSelect( ( select ) => {
		const { getCurrentPost } = select( editorStore );
		const { getCurrentUser } = select( 'core' );

		return {
			currentPost: getCurrentPost ? getCurrentPost() : null,
			currentUser: getCurrentUser ? getCurrentUser() : null,
		};
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

	useEffect( () => {
		if ( ! isOpen ) {
			return;
		}

		const urlPopover = document.querySelector( '.gblocks-button-link-dropdown' ) ?? '';

		if ( urlPopover ) {
			urlPopover.style.zIndex = 0;
		}

		return () => {
			if ( urlPopover ) {
				urlPopover.style.zIndex = '';
			}
		};
	}, [ isOpen ] );

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
						{ !! foundTags && !! foundTags.length && null === tagToEdit && ! selectedText ? (
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
							<QueryClientProvider client={ queryClient }>
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
									currentUser={ currentUser }
									context={ context }
									queryClient={ queryClient }
								/>
							</QueryClientProvider>
						) }
					</div>
				</Modal>
			) }
		</>
	);
}
