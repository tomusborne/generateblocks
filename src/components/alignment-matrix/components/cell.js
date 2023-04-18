import classNames from 'classnames';
import { Tooltip } from '@wordpress/components';

export default function Cell( { cell, label, isActive, isCompact, onClick } ) {
	return (
		<Tooltip text={ label }>
			<div
				tabIndex={ ! isCompact ? '0' : null }
				className={ classNames( 'gb-matrix-cell', { active: isActive } ) }
				onClick={ !! onClick ? () => onClick( cell ) : undefined }
				onKeyDown={ ( e ) => {
					if ( onClick && ( 'Enter' === e.key || ' ' === e.key ) ) {
						onClick( cell );
					}
				} }
				role={ ! isCompact ? 'button' : 'presentation' }
			>
				<span className="gb-matrix-cell-state" />
			</div>
		</Tooltip>
	);
}
