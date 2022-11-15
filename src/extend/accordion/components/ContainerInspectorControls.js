import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment, useEffect } from '@wordpress/element';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { ToggleControl, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { cloneBlock } from '@wordpress/blocks';
import getIcon from '../../../utils/get-icon';

const withContainerAccordion = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const {
			name,
			attributes,
			setAttributes,
			clientId,
		} = props;

		if ( 'generateblocks/container' !== name ) {
			return <BlockEdit { ...props } />;
		}

		const {
			variantRole,
		} = attributes;

		const {
			getBlockParents,
			getBlocksByClientId,
			getBlockParentsByBlockName,
		} = useSelect( ( select ) => select( 'core/block-editor' ), [] );

		const { insertBlocks } = useDispatch( 'core/block-editor' );

		useEffect( () => {
			const parentBlockId = getBlockParents( clientId, true )[ 0 ];

			if ( parentBlockId ) {
				const parentBlock = getBlocksByClientId( parentBlockId );

				if ( parentBlock ) {
					if ( 'generateblocks/container' === parentBlock[ 0 ].name ) {
						const isAccordionItem = 'accordion' === parentBlock[ 0 ].attributes.variantRole;

						if ( isAccordionItem && 'accordion-item' !== variantRole ) {
							setAttributes( {
								variantRole: 'accordion-item',
							} );
						}

						if ( ! isAccordionItem && 'accordion-item' === variantRole ) {
							setAttributes( {
								variantRole: '',
							} );
						}

						const isAccordionContent = 'accordion-item' === parentBlock[ 0 ].attributes.variantRole;

						if ( isAccordionContent && 'accordion-content' !== variantRole ) {
							setAttributes( {
								variantRole: 'accordion-content',
							} );
						}

						if ( ! isAccordionContent && 'accordion-content' === variantRole ) {
							setAttributes( {
								variantRole: '',
							} );
						}
					}
				}
			} else if ( 'accordion-item' === variantRole || 'accordion-content' === variantRole ) {
				setAttributes( {
					variantRole: '',
				} );
			}
		} );

		return (
			<Fragment>
				<BlockEdit { ...props } />

				<InspectorControls>
					{ 'accordion-item' === variantRole &&
						<BlockControls>
							<ToolbarGroup>
								<ToolbarButton
									className="gblocks-block-control-icon gblocks-add-grid-item"
									icon={ getIcon( 'addContainer' ) }
									label={ __( 'Duplicate Accordion Item', 'generateblocks' ) }
									onClick={ () => {
										const thisBlock = getBlocksByClientId( clientId )[ 0 ];
										const parentAccordion = getBlockParentsByBlockName( clientId, 'generateblocks/container', true )[ 0 ];

										const clonedBlock = cloneBlock(
											thisBlock,
											{
												uniqueId: '',
											}
										);

										insertBlocks( clonedBlock, undefined, parentAccordion );
									} }
									showTooltip
								/>
							</ToolbarGroup>
						</BlockControls>
					}
				</InspectorControls>
			</Fragment>
		);
	};
}, 'withContainerAccordion' );

addFilter(
	'editor.BlockEdit',
	'generateblocks/accordion/containerInspectorControls',
	withContainerAccordion,
);

function accordionSettingsPanel( content, props ) {
	const { attributes, setAttributes } = props;
	const { variantRole, accordionMultipleOpen, accordionItemOpen } = attributes;

	if ( 'accordion' !== variantRole && 'accordion-item' !== variantRole ) {
		return content;
	}

	return (
		<>
			{ 'accordion' === variantRole &&
				<ToggleControl
					label={ __( 'Keep multiple items open', 'generateblocks' ) }
					checked={ !! accordionMultipleOpen }
					onChange={ ( value ) => {
						setAttributes( {
							accordionMultipleOpen: value,
						} );
					} }
				/>
			}

			{ 'accordion-item' === variantRole &&
				<>
					<ToggleControl
						label={ __( 'Item open by default', 'generateblocks' ) }
						checked={ !! accordionItemOpen }
						onChange={ ( value ) => {
							setAttributes( {
								accordionItemOpen: value,
							} );
						} }
					/>
				</>
			}

			{ content }
		</>
	);
}

addFilter(
	'generateblocks.editor.containerSettingsPanel',
	'generateblocks/accordion/containerSettingsPanel',
	accordionSettingsPanel
);

const ContainerTemplateLock = ( templateLock, props ) => {
	if ( 'accordion-item' === props.attributes.variantRole ) {
		templateLock = 'insert';
	}

	return templateLock;
};

addFilter(
	'generateblocks.editor.containerTemplateLock',
	'generateblocks/accordion/containerTemplateLock',
	ContainerTemplateLock,
);
