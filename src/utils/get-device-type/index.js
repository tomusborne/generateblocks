export default () => {
	const localValue = localStorage.getItem( 'generateblocksDeviceType' );
	return localValue ? JSON.parse( localValue ) : 'Desktop';
};
