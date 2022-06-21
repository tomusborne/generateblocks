export default function getMediaUrl( media, size ) {
	if ( 'object' === typeof media ) {
		return media?.media_details?.sizes?.[ size ]?.source_url || media?.source_url;
	}

	return media;
}
