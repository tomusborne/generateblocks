import { useState, useMemo, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { Dropdown, Button, Tooltip, ComboboxControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import getIcon from '../../utils/get-icon';
import '../editor.scss';
import { SelectPostType } from './SelectPostType.jsx';
import { SelectPost } from './SelectPost.jsx';

export function DynamicTagDropdown( { onInsert, renderToggle, tooltip } ) {
	const [ dynamicTagData, setDynamicTagData ] = useState( [] );
	const [ dynamicSource, setDynamicSource ] = useState( 'current' );
	const [ postTypeSource, setPostTypeSource ] = useState( 'post' );
	const [ postIdSource, setPostIdSource ] = useState( 0 );
	const [ dynamicTag, setDynamicTag ] = useState( '' );
	const [ dynamicTagToInsert, setDynamicTagToInsert ] = useState( '' );
	const [ metaKey, setMetaKey ] = useState( '' );

	async function loadTags() {
		if ( dynamicTagData.length ) {
			return;
		}

		const response = await apiFetch( {
			path: '/generateblocks/v1/dynamic-tags',
			method: 'GET',
		} );

		setDynamicTagData( response );
	}

	const dynamicTagOptions = useMemo( () => (
		dynamicTagData.map( ( { title, tag } ) => ( { label: title, value: tag } ) )
	), [ dynamicTagData ] );

	useEffect( () => {
		if ( ! dynamicTag ) {
			setDynamicTagToInsert( '' );
			return;
		}

		let tagToInsert = dynamicTag;

		if ( postIdSource ) {
			tagToInsert += ` postId=${ postIdSource }`;
		}

		if ( metaKey ) {
			tagToInsert += ` metaKey=${ metaKey }`;
		}

		tagToInsert = `{${ tagToInsert }}`;

		setDynamicTagToInsert( tagToInsert );
	}, [ postIdSource, dynamicTag, metaKey ] );

	return (
		<>
			<Dropdown
				className="gb-dynamic-tag__toggle"
				contentClassName="gb-dynamic-tag-content"
				placement="top left"
				onToggle={ () => {
					loadTags();
				} }
				popoverProps={ {
					focusOnMount: true,
				} }
				renderToggle={ ( { isOpen, onToggle } ) => {
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
				} }
				renderContent={ ( { onClose } ) => {
					return (
						<>
							<ComboboxControl
								label={ __( 'Select a dynamic tag', 'generateblocks' ) }
								value={ dynamicTag }
								options={ dynamicTagOptions }
								onChange={ ( value ) => setDynamicTag( value ) }
							/>

							{ !! dynamicTag && (
								<>
									<ComboboxControl
										label={ __( 'Source', 'generateblocks' ) }
										value={ dynamicSource }
										options={ [
											{ label: __( 'Current', 'generateblocks' ), value: 'current' },
											{ label: __( 'Post', 'generateblocks' ), value: 'post' },
										] }
										onChange={ ( value ) => setDynamicSource( value ) }
									/>

									{ 'post' === dynamicSource && (
										<>
											<SelectPostType
												value={ postTypeSource }
												onChange={ ( value ) => setPostTypeSource( value ) }
											/>

											<SelectPost
												postType={ postTypeSource }
												value={ postIdSource }
												id={ 'gblocks-select-post' }
												label={ __( 'Select source post', 'generateblocks' ) }
												help={ __( 'Search by name or ID.', 'generateblocks' ) }
												onChange={ ( value ) => setPostIdSource( value ) }
												isMulti={ false }
											/>
										</>
									) }

									{ dynamicTagToInsert.startsWith( '{post_meta' ) && (
										<TextControl
											label={ __( 'Meta key', 'generateblocks' ) }
											value={ metaKey }
											onChange={ ( value ) => setMetaKey( value ) }
										/>
									) }

									<TextControl
										label={ __( 'Dynamic tag to insert', 'generateblocks' ) }
										value={ dynamicTagToInsert }
										onChange={ ( value ) => setDynamicTagToInsert( value ) }
									/>

									<Button
										variant="primary"
										onClick={ () => {
											onInsert( dynamicTagToInsert );
											onClose();
										} }
									>
										{ __( 'Insert dynamic tag', 'generateblocks' ) }
									</Button>
								</>
							) }
						</>
					);
				} }
			/>
		</>
	);
}
