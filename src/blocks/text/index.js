import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { registerFormatType } from '@wordpress/rich-text';
import { Edit } from './edit';
import metadata from './block.json';
import { Save } from './save';
import { getElementType } from '../element/utils/getElementType';
import { DynamicTag } from './components/DynamicTag';

export function textIcon() {
	return <svg className="gb-block-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><line x1="128" y1="56" x2="128" y2="200" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><polyline points="56 88 56 56 200 56 200 88" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><line x1="96" y1="200" x2="160" y2="200" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /></svg>;
}

export function headingIcon() {
	return <svg className="gb-block-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><line x1="56" y1="56" x2="56" y2="200" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><line x1="200" y1="128" x2="56" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><line x1="200" y1="56" x2="200" y2="200" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /></svg>;
}

export function buttonIcon() {
	return <svg className="gb-block-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><circle cx="128" cy="128" r="10" /><circle cx="84" cy="128" r="10" /><circle cx="172" cy="128" r="10" /></svg>;
}

registerBlockType( metadata, {
	edit: Edit,
	save: Save,
	icon: textIcon,
} );

registerBlockVariation(
	'generateblocks/text',
	{
		name: 'generateblocks/heading',
		title: 'Headline',
		description: __( 'A heading text element.', 'generateblocks' ),
		icon: headingIcon,
		attributes: {
			tagName: 'h2',
		},
		isActive: ( blockAttributes ) => 'heading' === getElementType( blockAttributes.tagName ),
	},
);

registerBlockVariation(
	'generateblocks/text',
	{
		name: 'generateblocks/button',
		title: 'Button',
		description: __( 'An interactive button element.', 'generateblocks' ),
		icon: buttonIcon,
		attributes: {
			tagName: 'a',
			styles: {
				display: 'inline-flex',
				alignItems: 'center',
				backgroundColor: '#215bc2',
				color: '#ffffff',
				paddingTop: '1rem',
				paddingRight: '2rem',
				paddingBottom: '1rem',
				paddingLeft: '2rem',
				textDecoration: 'none',
				'&:is(:hover, :focus)': {
					backgroundColor: '#1a4a9b',
					color: '#ffffff',
				},
			},
		},
		isActive: ( blockAttributes ) => 'button' === getElementType( blockAttributes.tagName ),
	},
);

registerFormatType(
	'generateblocks/dynamic-tag',
	{
		title: 'Dynamic tags',
		tagName: 'dynamic', // We don't use this.
		className: null,
		edit: DynamicTag,
	}
);
