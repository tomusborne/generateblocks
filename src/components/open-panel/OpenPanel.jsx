import { DropdownMenu, PanelBody } from '@wordpress/components';
import { moreVertical } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export const moreDesignOptions = {
	title: __( 'More design options', 'generateblocks' ),
	onClick: () => document.querySelector( '.gb-block-styles-tab-panel button[id*="styles"]' )?.click(),
};

export function OpenPanel( {
	title,
	children,
	dropdownOptions = [],
	shouldRender = true,
} ) {
	if ( ! shouldRender ) {
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

				{ children }
			</PanelBody>
		</div>
	);
}
