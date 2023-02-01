import { useDeviceType } from '../hooks';

export default ( WrappedComponent ) => {
	return ( props ) => {
		const [ deviceType ] = useDeviceType();

		return ( <WrappedComponent { ...props } deviceType={ deviceType } /> );
	};
};
