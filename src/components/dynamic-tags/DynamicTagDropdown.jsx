import { useState, useMemo } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { Dropdown, Button, Tooltip, ComboboxControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import getIcon from '../../utils/get-icon';
import './editor.scss';

function findSelectedTag( contentText, tags ) {
	for ( const tag of tags ) {
		const searchString = `{${ tag }`;

		if ( contentText.includes( searchString ) ) {
			return tag;
		}
	}

	return null;
}

export function DynamicTagDropdown( { onInsert, renderToggle, tooltip, content } ) {
	const [ dynamicTagData, setDynamicTagData ] = useState( [] );

	async function loadTags() {
		const response = await apiFetch( {
			path: '/generateblocks/v1/dynamic-tags',
			method: 'GET',
		} );

		setDynamicTagData( response );
	}

	const dynamicTagOptions = useMemo( () => (
		dynamicTagData.map( ( { title, tag } ) => ( { label: title, value: tag } ) )
	), [ dynamicTagData ] );

	const dynamicTags = useMemo( () => (
		dynamicTagData.map( ( { tag } ) => ( tag ) )
	), [ dynamicTagData ] );

	const selectedTag = useMemo( () => {
		if ( ! content ) {
			return '';
		}

		return findSelectedTag( content, dynamicTags );
	}, [ content, dynamicTags ] );

	return (
		<>
			<Dropdown
				className="gb-dynamic-tag__toggle"
				contentClassName="gb-dynamic-tag-content"
				placement="top left"
				onToggle={ () => {
					loadTags();
				} }
				renderToggle={ ( { isOpen, onToggle } ) => {
					if ( renderToggle ) {
						return renderToggle( { isOpen, onToggle } );
					}

					const button = <Button
						onClick={ onToggle }
						aria-expanded={ isOpen }
						icon={ getIcon( 'dynamic' ) }
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
				} }
				renderContent={ ( { onClose } ) => {
					return (
						<>
							<ComboboxControl
								label={ __( 'Select a dynamic tag', 'generateblocks' ) }
								value={ selectedTag }
								options={ dynamicTagOptions }
								onChange={ ( value ) => {
									onInsert( `{${ value }}` );
									onClose();
								} }
							/>
						</>
					);
				} }
			/>
		</>
	);
}
