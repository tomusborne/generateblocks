import { __ } from '@wordpress/i18n';
import { createBlock, getBlockType } from '@wordpress/blocks';
import { RichText, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { Platform, useEffect } from '@wordpress/element';
import { PanelBody, SelectControl } from '@wordpress/components';

export function Edit( props ) {
	const {
		attributes,
		setAttributes,
		mergeBlocks,
		onReplace,
		clientId,
	} = props;

	const {
		tagName,
		content,
	} = attributes;

	const blockProps = useBlockProps();

	useEffect( () => {
		if ( ! tagName ) {
			setAttributes( { tagName: 'span' } );
		}
	}, [ tagName ] );

	const tagNames = getBlockType( 'generateblocks/text' )?.attributes?.content?.selector?.split( ',' );
	const tagNameOptions = tagNames.map( ( tag ) => ( {
		label: tag,
		value: tag,
	} ) );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Text Settings' ) }>
					<SelectControl
						label={ __( 'Tag Name' ) }
						value={ tagName }
						options={ tagNameOptions }
						onChange={ ( value ) => setAttributes( { tagName: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<RichText
				identifier="content"
				tagName={ tagName || 'span' }
				value={ content }
				onChange={ ( value ) => setAttributes( { content: value } ) }
				onMerge={ mergeBlocks }
				onSplit={ ( value, isOriginal ) => {
					let block;

					if ( isOriginal || value ) {
						block = createBlock( 'generateblocks/text', {
							...attributes,
							content: value,
						} );
					} else {
						block = createBlock(
							'generateblocks/text'
						);
					}

					if ( isOriginal ) {
						block.clientId = clientId;
					}

					return block;
				} }
				onReplace={ onReplace }
				onRemove={ () => onReplace( [] ) }
				placeholder={ __( 'Text' ) }
				{ ...( Platform.isNative && { deleteEnter: true } ) } // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
				{ ...blockProps }
			/>
		</>
	);
}
