export default function getSelectedDevice( selectedDevice ) {
	const storedDevice = window.localStorage.getItem( 'generateblocksSelectedDevice' );
	let currentDevice = selectedDevice;

	if ( storedDevice ) {
		currentDevice = storedDevice;
	}

	return currentDevice;
}
