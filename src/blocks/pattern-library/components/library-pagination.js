import { __ } from '@wordpress/i18n';
import ReactPaginate from 'react-paginate';
import { useLibrary } from './library-provider';

export default function Pagination( { items, itemsPerPage, wrapperRef } ) {
	const pageCount = Math.ceil( items.length / itemsPerPage );
	const { setPaginationOffset } = useLibrary();

	// Invoke when user click to request another page.
	const handlePageClick = ( event ) => {
		const newOffset = ( event.selected * itemsPerPage ) % items.length;

		setPaginationOffset( newOffset );
		wrapperRef.current.closest( '.components-modal__content' ).scrollTo( {
			top: 0,
			behavior: 'smooth',
		} );
	};

	return (
		<>
			<ReactPaginate
				key={ pageCount }
				containerClassName="gblocks-pattern-library-pagination"
				breakLabel="..."
				nextLabel={ __( 'Next', 'generateblocks' ) }
				onPageChange={ handlePageClick }
				pageRangeDisplayed={ 5 }
				pageCount={ pageCount }
				previousLabel={ __( 'Previous', 'generateblocks' ) }
				renderOnZeroPageCount={ null }
			/>
		</>
	);
}
