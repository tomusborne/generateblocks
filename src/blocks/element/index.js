import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { Edit } from './edit';
import metadata from './block.json';
import { Save } from './save';
import './index.scss';
import { getElementType } from './utils/getElementType';

export function containerIcon() {
	return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><line x1="144" y1="40" x2="112" y2="40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><line x1="112" y1="216" x2="144" y2="216" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><path d="M184,40h24a8,8,0,0,1,8,8V72" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><line x1="216" y1="144" x2="216" y2="112" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><path d="M184,216h24a8,8,0,0,0,8-8V184" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><line x1="40" y1="112" x2="40" y2="144" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><path d="M72,216H48a8,8,0,0,1-8-8V184" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><path d="M72,40H48a8,8,0,0,0-8,8V72" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /></svg>;
}

export function gridIcon() {
	return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><rect x="48" y="48" width="160" height="160" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><line x1="128" y1="48" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><line x1="48" y1="128" x2="208" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /></svg>;
}

registerBlockType( metadata.name, {
	edit: Edit,
	save: Save,
	icon: containerIcon,
} );

registerBlockVariation(
	'generateblocks/element',
	{
		name: 'generateblocks/container',
		description: __( 'A container to add your blocks to.', 'generateblocks' ),
		title: 'Container',
		attributes: {
			tagName: 'div',
		},
		isActive: ( blockAttributes ) => {
			if ( 'grid' === blockAttributes?.styles?.display ) {
				return false;
			}

			return 'container' === getElementType( blockAttributes.tagName );
		},
		isDefault: true,
	},
);

registerBlockVariation(
	'generateblocks/element',
	{
		name: 'generateblocks/grid',
		description: __( 'Organize your content into sections and rows.', 'generateblocks' ),
		icon: gridIcon,
		title: 'Grid',
		attributes: {
			tagName: 'div',
			styles: {
				display: 'grid',
				gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
			},
		},
		innerBlocks: [
			[
				'generateblocks/element',
				{
					tagName: 'div',
				},
			],
			[
				'generateblocks/element',
				{
					tagName: 'div',
				},
			],
		],
		isActive: ( blockAttributes ) => 'grid' === blockAttributes?.styles?.display,
	},
);
