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

	const remoteList = data?.filter( ( item ) => ! item.isLocal );
	const localList = data?.filter( ( item ) => item.isLocal );

	return (
		<>
			{ isLoading && data?.size === 0 && <Spinner /> }

			{ error && error.message && <span>{ error.message }</span> }

			{ data?.size === 0 && <p>{ __( 'No results found.', 'generateblocks' ) }</p> }

			{ !! remoteList.length &&
				<div className="gblocks-library">
					<h3>{ __( 'Remote Libraries', 'generateblocks' ) }</h3>

					{ remoteList.map( ( item ) => (
						<LibraryForm
							key={ item.id }
							{ ...item }
							onChange={ onChange }
							onDelete={ onDelete }
						/>
					) ) }
				</div>
			}

			{ !! localList.length &&
				<div className="gblocks-library">
					<h3>{ __( 'Local Libraries', 'generateblocks' ) }</h3>
					{ localList.map( ( item ) => (
						<LibraryForm
							key={ item.id }
							{ ...item }
							onChange={ onChange }
							onDelete={ onDelete }
						/>
					) ) }
				</div>
			}

			<Button isSmall variant="secondary" onClick={ onAdd }>
				{ __( 'Add Library (Move to GBP)', 'generateblocks' ) }
			</Button>
		</>
	);
}
