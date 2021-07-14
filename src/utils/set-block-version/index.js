export default function setBlockVersion( props, blockVersion ) {
	if ( 'undefined' === typeof props.attributes.blockVersion || props.attributes.blockVersion < blockVersion ) {
		props.setAttributes( {
			blockVersion,
		} );
	}
}
