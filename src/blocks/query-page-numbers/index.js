import { registerBlockType } from '@wordpress/blocks';
import { Edit } from './edit';
import metadata from './block.json';

export function paginationIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><circle cx="128" cy="128" r="10" /><circle cx="60" cy="128" r="10" /><circle cx="196" cy="128" r="10" /></svg>
	);
}

registerBlockType( metadata.name, {
	edit: Edit,
	save: () => null,
	icon: paginationIcon,
} );