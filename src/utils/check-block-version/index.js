export default function isBlockVersionLessThan( blockVersion, targetVersion ) {
	return ( ! blockVersion || blockVersion < targetVersion );
}
