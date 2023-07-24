import { Button, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import LibraryForm from './library-form';

export default function LibrariesList( props ) {
	const {
		data,
		isLoading,
		error,
		onAdd,
		onChange,
		onDelete,
	} = props;

	return (
		<>
			{ isLoading && data?.size === 0 && <Spinner /> }

			{ error && error.message && <span>{ error.message }</span> }

			{ data?.size === 0 && <p>{ __( 'No results found.', 'generateblocks' ) }</p> }

			{ data.map( ( item ) => (
				<LibraryForm
					key={ item.id }
					{ ...item }
					onChange={ onChange }
					onDelete={ onDelete }
				/>
			) ) }

			<Button isSmall variant="secondary" onClick={ onAdd }>
				{ __( 'Add Library (Move to GBP)', 'generateblocks' ) }
			</Button>
		</>
	);
}
