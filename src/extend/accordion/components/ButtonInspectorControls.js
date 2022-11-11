import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment, useEffect } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { __, _x } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';

const withButtonAccordion = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const {
			name,
			attributes,
			setAttributes,
			clientId,
		} = props;

		if ( 'generateblocks/button' !== name ) {
			return <BlockEdit { ...props } />;
		}

		const {
			variantRole,
		} = attributes;

		const {
			getBlockParentsByBlockName,
			getBlocksByClientId,
		} = useSelect( ( select ) => select( 'core/block-editor' ), [] );

		useEffect( () => {
			const parentBlockId = getBlockParentsByBlockName( clientId, 'generateblocks/container', true )[ 0 ];

			if ( parentBlockId ) {
				const parentBlock = getBlocksByClientId( parentBlockId );

				if ( parentBlock ) {
					const isAccordionToggle = 'accordion-item' === parentBlock[ 0 ].attributes.variantRole;

					if ( isAccordionToggle && 'accordion-toggle' !== variantRole ) {
						setAttributes( {
							variantRole: 'accordion-toggle',
						} );
					}

					if ( ! isAccordionToggle && 'accordion-toggle' === variantRole ) {
						setAttributes( {
							variantRole: '',
						} );
					}
				}
			} else if ( 'accordion-toggle' === variantRole ) {
				setAttributes( {
					variantRole: '',
				} );
			}
		} );

		return <BlockEdit { ...props } />;
	};
}, 'withButtonAccordion' );

addFilter(
	'editor.BlockEdit',
	'generateblocks/accordion/buttonInspectorControls',
	withButtonAccordion,
);

const addAccordionIcons = ( iconSVGSets, { attributes } ) => {
	if ( 'accordion-toggle' === attributes.variantRole ) {
		iconSVGSets = {
			accordion: {
				group: __( 'Accordion', 'generateblocks' ),
				svgs: {
					accordionArrows: {
						label: _x( 'Accordion Arrows', 'label', 'generateblocks' ),
						icon: <>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="1em" height="1em" ariaHidden="true" role="img" className="gb-accordion__icon"><path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" fill="currentColor"></path></svg>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="1em" height="1em" ariaHidden="true" role="img" className="gb-accordion__icon-open"><path d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z" fill="currentColor"></path></svg>
						</>,
					},
					accordionPlusMinus: {
						label: _x( 'Accordion Plus/Minus', 'label', 'generateblocks' ),
						icon: <>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="1em" height="1em" ariaHidden="true" role="img" className="gb-accordion__icon"><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" fill="currentColor"></path></svg>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="1em" height="1em" ariaHidden="true" role="img" className="gb-accordion__icon-open"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" fill="currentColor" /></svg>
						</>,
					},
				},
			},
			...iconSVGSets,
		};
	}

	return iconSVGSets;
};

addFilter(
	'generateblocks.editor.iconSVGSets',
	'generateblocks/accordion/add-accordion-icons',
	addAccordionIcons
);
