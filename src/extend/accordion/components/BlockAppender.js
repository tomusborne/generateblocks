import { Icon, plus } from '@wordpress/icons';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { Button, Tooltip } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import AccordionTemplate from './AccordionTemplate';

const BlockAppender = ( appender, { clientId, isSelected, attributes } ) => {
	const { insertBlocks } = useDispatch( 'core/block-editor' );

	const {
		variantRole,
	} = attributes;

	if ( 'accordion' === variantRole && isSelected ) {
		return <Tooltip text={ __( 'Add Accordion Item', 'generateblocks' ) }>
			<Button
				className="block-editor-button-block-appender"
				onClick={ () => {
					insertBlocks( createBlocksFromInnerBlocksTemplate( AccordionTemplate ), undefined, clientId );
				} }
			>
				<Icon icon={ plus } />
			</Button>
		</Tooltip>;
	}

	if ( 'accordion-item' === variantRole && isSelected ) {
		return false;
	}

	return appender;
};

addFilter(
	'generateblocks.editor.containerAppender',
	'generateblocks/accordion/BlockAppender',
	BlockAppender,
);
