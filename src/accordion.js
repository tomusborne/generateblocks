const getSiblings = ( elem ) => {
	return Array.prototype.filter.call( elem.parentNode.children, ( sibling ) => {
		return sibling !== elem;
	} );
};

const Accordion = ( event ) => {
	const accordionItem = event.target.closest( '.gb-accordion__item' );
	const accordionContent = accordionItem.querySelectorAll( '.gb-accordion__content' )[ 0 ];
	const accordionToggle = accordionItem.querySelectorAll( '.gb-accordion__toggle' )[ 0 ];
	const container = accordionItem.closest( '.gb-accordion' );

	if ( container && null === container.getAttribute( 'data-accordion-multiple-open' ) ) {
		const siblingAccordionItems = getSiblings( accordionItem );

		if ( siblingAccordionItems ) {
			siblingAccordionItems.forEach( ( siblingAccordionItem ) => {
				if ( siblingAccordionItem.classList.contains( 'gb-accordion__item-open' ) ) {
					const siblingAccordionContent = siblingAccordionItem.querySelectorAll( '.gb-accordion__content' )[ 0 ];

					if ( siblingAccordionContent ) {
						siblingAccordionContent.style.maxHeight = siblingAccordionContent.scrollHeight + 'px';

						setTimeout( () => {
							siblingAccordionItem.classList.remove( 'gb-accordion__item-open' );
							siblingAccordionContent.style.maxHeight = null;
						}, 10 );
					}

					const siblingAccordionToggle = siblingAccordionItem.querySelectorAll( '.gb-accordion__toggle' )[ 0 ];

					if ( siblingAccordionToggle ) {
						siblingAccordionToggle.setAttribute( 'aria-expanded', false );
					}
				}
			} );
		}
	}

	if ( accordionItem.classList.contains( 'gb-accordion__item-open' ) ) {
		accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';

		setTimeout( () => {
			accordionToggle.setAttribute( 'aria-expanded', false );
			accordionItem.classList.remove( 'gb-accordion__item-open' );
			accordionContent.style.maxHeight = null;
		}, 10 );
	} else {
		accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';

		setTimeout( () => {
			accordionToggle.setAttribute( 'aria-expanded', true );
			accordionItem.classList.add( 'gb-accordion__item-open' );

			addEventListener( 'transitionend', ( e ) => {
				if ( 'max-height' === e.propertyName ) {
					accordionContent.style.maxHeight = null;
				}
			},
			{
				once: true,
			} );
		}, 10 );
	}
};

document.querySelectorAll( '.gb-accordion__item .gb-accordion__toggle' ).forEach( ( e ) => {
	e.addEventListener( 'click', Accordion );
} );

const accordionItems = document.querySelectorAll( '.gb-accordion__item' );

if ( accordionItems ) {
	accordionItems.forEach( ( accordionItem ) => {
		const accordionToggle = accordionItem.querySelectorAll( '.gb-accordion__toggle' )[ 0 ];
		const accordionContent = accordionItem.querySelectorAll( '.gb-accordion__content' )[ 0 ];
		const accordionToggleId = accordionToggle.getAttribute( 'id' );
		const accordionContentId = accordionContent.getAttribute( 'id' );

		if ( accordionToggleId ) {
			accordionContent.setAttribute( 'aria-labelledby', accordionToggleId );
		}

		if ( accordionContentId ) {
			accordionToggle.setAttribute( 'aria-controls', accordionContentId );
		}

		if ( accordionItem.classList.contains( 'gb-accordion__item-open' ) && accordionToggle ) {
			accordionToggle.setAttribute( 'aria-expanded', true );
		} else if ( accordionToggle ) {
			accordionToggle.setAttribute( 'aria-expanded', false );
		}
	} );
}
