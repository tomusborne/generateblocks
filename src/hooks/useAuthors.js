import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export default () => (
	useSelect( ( select ) => {
		const { getUsers } = select( coreStore );

		return getUsers( { who: 'authors' } ) || [];
	}, [] )
);
