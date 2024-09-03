import { addFilter } from '@wordpress/hooks';

const v1Blocks = [
	'generateblocks/button',
	'generateblocks/headline',
	'generateblocks/container',
	'generateblocks/grid',
	'generateblocks/image',
	'generateblocks/query-loop',
];

function disableLegacyBlocks( settings, name ) {
	const activeBlockVersion = parseInt( generateBlocksEditor.activeBlockVersion );

	// Disable our version 1 blocks.
	if (
		v1Blocks.includes( name ) &&
		1 !== activeBlockVersion
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
		1 === activeBlockVersion
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
	'generateblocks/disableLegacyBlocks',
	disableLegacyBlocks,
);
