export default () => {
	return localStorage.getItem( 'generateblocksDeviceType' ) || 'Desktop';
};
