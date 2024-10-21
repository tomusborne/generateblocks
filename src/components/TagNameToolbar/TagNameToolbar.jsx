import { TagNameIcon } from './TagNameIcon';
import { __ } from '@wordpress/i18n';
import { ToolbarGroup } from '@wordpress/components';
import { BlockControls } from '@wordpress/block-editor';

export function TagNameToolbar( { label, onChange, tagName } ) {
	const options = [
		{
			label: __( 'Heading 1', 'generateblocks' ),
			value: 'h1',
		},
		{
			label: __( 'Heading 2', 'generateblocks' ),
			value: 'h2',
		},
		{
			label: __( 'Heading 3', 'generateblocks' ),
			value: 'h3',
		},
		{
			label: __( 'Heading 4', 'generateblocks' ),
			value: 'h4',
		},
		{
			label: __( 'Heading 5', 'generateblocks' ),
			value: 'h5',
		},
		{
			label: __( 'Heading 6', 'generateblocks' ),
			value: 'h6',
		},
		{
			label: __( 'Paragraph', 'generateblocks' ),
			value: 'p',
		},
		{
			label: __( 'Div', 'generateblocks' ),
			value: 'div',
		},
		{
			label: __( 'Span', 'generateblocks' ),
			value: 'span',
		},
	];

	if ( ! options.find( ( option ) => option.value === tagName ) ) {
		return null;
	}

	const controls = options.map( ( option ) => {
		return {
			isActive: option.value === tagName,
			icon: <TagNameIcon level={ option.value } />,
			title: option.label,
			onClick: () => onChange( option.value ),
		};
	} );

	return (
		<BlockControls>
			<ToolbarGroup
				isCollapsed={ true }
				icon={ <TagNameIcon level={ tagName } /> }
				label={ label }
				controls={ controls }
			/>
		</BlockControls>
	);
}
