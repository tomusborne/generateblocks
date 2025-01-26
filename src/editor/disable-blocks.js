import { addFilter } from '@wordpress/hooks';

const v1Blocks = [
	'generateblocks/button',
	'generateblocks/headline',
	'generateblocks/container',
	'generateblocks/grid',
	'generateblocks/image',
	'generateblocks/query-loop',
];

function disableBlocks( settings, name ) {
	const useV1Blocks = generateBlocksEditor.useV1Blocks;

	// Disable our version 1 blocks.
	if (
		v1Blocks.includes( name ) &&
		! useV1Blocks
	) {
		return {
			...settings,
			supports: {
				...settings.supports,
				inserter: false,
			},
		};
	}

	// Disable our new blocks if legacy blocks are enabled.
	if (
		! v1Blocks.includes( name ) &&
		name.startsWith( 'generateblocks' ) &&
		useV1Blocks
	) {
		return {
			...settings,
			supports: {
				...settings.supports,
				inserter: false,
			},
		};
	}

	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'generateblocks/disableBlocks',
	disableBlocks,
);
