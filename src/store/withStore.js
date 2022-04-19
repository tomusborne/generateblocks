import { Provider } from 'react-redux';
import gbStore from '../store';

export default function withStore( Component ) {
	return ( props ) => {
		return (
			<Provider store={gbStore}>
				<Component { ...props } />
			</Provider>
		);
	};
}
