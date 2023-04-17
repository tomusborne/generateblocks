import { registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { addAction } from '@wordpress/hooks';
import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import getIcon from '../../../../utils/get-icon';
import './BlockAppender';
import getUniqueBlockNames from '../../../../utils/get-unique-block-names';
import { isEmpty } from 'lodash';

registerBlockVariation(
	'generateblocks/container',
	{
		name: 'button-container',
		title: __( 'Container' ),
		description: __( 'Group your buttons in a Container.', 'generateblocks' ),
		icon: getIcon( 'button-container' ),
		scope: [ 'block' ],
		attributes: {
			variantRole: 'button-container',
			display: 'flex',
		},
		isActive: ( attrs ) => 'button-container' === attrs.variantRole,
		innerBlocks: [
			[
				'generateblocks/button',
				generateBlocksStyling.button,
			],
		],
	}
);

function RenderBlocks( props ) {
	const { clientId, setAttributes } = props;
	const { getBlock } = useSelect( ( select ) => select( blockEditorStore ), [] );

	useEffect( () => {
		const thisBlock = getBlock( clientId );
		const newAttributes = {};

		if ( thisBlock && thisBlock.innerBlocks?.length ) {
			const uniqueBlockNames = getUniqueBlockNames( thisBlock.innerBlocks );

			if ( 1 === uniqueBlockNames.length ) {
				if ( 'generateblocks/button' !== uniqueBlockNames[ 0 ] && 'button-container' === props.attributes.variantRole ) {
					newAttributes.variantRole = '';
				} else if ( 'generateblocks/button' === uniqueBlockNames[ 0 ] ) {
					newAttributes.variantRole = 'button-container';
				}
			} else if ( 'button-container' === props.attributes.variantRole ) {
				newAttributes.variantRole = '';
			}
		}

		if ( ! isEmpty( newAttributes ) ) {
			setAttributes( newAttributes );
		}
	}, [] );
}

addAction(
	'generateblocks.editor.renderBlock',
	'generateblocks/container/variantCheck',
	RenderBlocks
);
