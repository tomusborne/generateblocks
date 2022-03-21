export default function getMediaUrl( media, size ) {
	return media?.media_details?.sizes?.[ size ]?.source_url || media?.source_url;
}
