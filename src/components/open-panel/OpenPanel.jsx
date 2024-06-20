import { DropdownMenu, PanelBody } from '@wordpress/components';
import { moreVertical } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import './editor.scss';

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
