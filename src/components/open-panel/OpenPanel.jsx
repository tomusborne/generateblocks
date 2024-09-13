import { DropdownMenu, PanelBody } from '@wordpress/components';
import { moreVertical } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useRef, useState, useEffect } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

import './editor.scss';

export const moreDesignOptions = {
	title: __( 'More design options', 'generateblocks' ),
	onClick: () => document.querySelector( '.gb-block-styles-tab-panel button[id*="styles"]' )?.click(),
};

export function OpenPanel( props ) {
	const {
		title,
		children,
		dropdownOptions = [],
		shouldRender = true,
		panelId = '',
	} = props;
	const contentRef = useRef( null );
	const [ hasRenderedContent, setHasRenderedContent ] = useState( true );

	useEffect( () => {
		if ( ! contentRef.current ) {
			return;
		}

		if ( '' === contentRef.current.innerHTML.trim() ) {
			setHasRenderedContent( false );
		}
	}, [ children ] );

	if ( ! shouldRender || ! hasRenderedContent ) {
		return null;
	}

	return (
		<div className="gb-open-panel">
			<PanelBody>
				{ title && (
					<div className="gb-open-panel__title">
						<h2>{ title }</h2>
						{ dropdownOptions.length > 0 && (
							<DropdownMenu
								icon={ moreVertical }
								label={ __( 'More options', 'generateblocks' ) }
								controls={ dropdownOptions }
							/>
						) }
					</div>
				) }

				<div
					className="gb-open-panel__content"
					ref={ contentRef }
				>
					{ applyFilters(
						'generateblocks.blockSettings.openPanel',
						children,
						{
							...props,
							panelId,
						}
					) }
				</div>
			</PanelBody>
		</div>
	);
}
