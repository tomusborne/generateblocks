import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { Button } from '@wordpress/components';

import { Autocomplete } from '@edge22/components';

// TODO: Move this to the Autocomplete as a property (ex: Autocomplete.groupFilter).
function groupFilter( source, query, itemToString ) {
	return Array.isArray( source )
		? source
			.map( ( item ) => {
				const { items = [] } = item;
				return {
					...item,
					items: items.filter( ( subItem ) =>
						itemToString( subItem ).toLowerCase().includes( query.toLowerCase() )
					),
				};
			} )
			.filter( ( f ) => f.items.length > 0 )
		: [];
}

export function SelectMeta( {
	type,
	post,
	term,
	user,
	source,
	sourceId,
	onSelect,
	onEnter,
	onClear,
	onAdd,
	label = __( 'Meta key', 'generateblocks' ),
	value = '',
} ) {
	const currentUser = useSelect( ( select ) => {
		const { getCurrentUser } = select( coreStore );

		return getCurrentUser ? getCurrentUser() : null;
	} );

	const metaKeys = useMemo( () => {
		switch ( type ) {
			case 'post':
				if ( ! post?.meta ) {
					return [];
				}

				const postItems = applyFilters(
					'generateblocks.editor.SelectMetaKeys.keys',
					Object.keys( post.meta ).map( ( key ) => ( { label: key, value: key } ) ),
					post
				);

				if ( postItems.length === 0 ) {
					return [];
				}

				return [
					{
						id: 'post_meta',
						label: __( 'Post Meta', 'generateblocks' ),
						items: postItems,
					},
				];
			case 'author':
				const authorMeta = post?.author?.meta;

				if ( ! authorMeta ) {
					return [];
				}

				const authorItems = Object.keys( authorMeta ).map( ( key ) => ( { label: key, value: key } ) );

				if ( authorItems.length === 0 ) {
					return [];
				}

				return [
					{
						id: 'author_meta',
						label: __( 'Author Meta', 'generateblocks' ),
						items: authorItems,
					},
				];
			case 'user':
				const userMeta = 'current' === source ? currentUser?.meta : user?.meta ?? {};

				if ( ! userMeta ) {
					return [];
				}
				const userItems = Object.keys( userMeta ).map( ( key ) => ( { label: key, value: key } ) );

				if ( userItems.length === 0 ) {
					return [];
				}

				return [
					{
						id: 'user_meta',
						label: __( 'User Meta', 'generateblocks' ),
						items: userItems,
					},
				];
			case 'term':
				const termMeta = term?.meta ?? {};

				if ( ! termMeta ) {
					return [];
				}
				const termItems = Object.keys( termMeta ).map( ( key ) => ( { label: key, value: key } ) );

				if ( termItems.length === 0 ) {
					return [];
				}

				return [
					{
						id: 'term_meta',
						label: __( 'Term Meta', 'generateblocks' ),
						items: termItems,
					},
				];
			default:
				return [];
		}
	}, [ post, type, term, currentUser, user, source ] );

	const metaKeyOptions = applyFilters(
		'generateblocks.editor.SelectMetaKeys.options',
		metaKeys,
		{
			user: user ? user : currentUser,
			post,
			term,
			type,
			source,
			sourceId,
		}
	);

	return (
		<Autocomplete
			className="gb-meta-key-select"
			label={ label }
			selected={ value }
			onSelect={ onSelect }
			source={ metaKeyOptions }
			toStringKey="value"
			showClear={ true }
			onEnter={ onEnter }
			onClear={ onClear }
			itemFilter={ groupFilter }
			afterInputWrapper={ ( { inputValue, items } ) => {
				return (
					<Button
						variant="primary"
						size="compact"
						className="gb-gc-add__button"
						disabled={ ! inputValue || items.length > 0 }
						onClick={ () => onAdd && onAdd( { inputValue, items } ) }
					>
						{ __( 'Add', 'generateblocks' ) }
					</Button>
				);
			} }
		/>
	);
}
