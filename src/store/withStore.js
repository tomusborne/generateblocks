import { Provider } from 'react-redux';
import gbStore from '../store';

export default function( Component ) {
	return ( props ) => {
		return (
			<Provider store={gbStore}>
				<Component { ...props } />
			</Provider>
		);
	};
}
