import classNames from 'classnames';
import { Tooltip } from '@wordpress/components';

function CellContent( { cell, isActive, isCompact, onClick } ) {
	return (
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
	);
}

export default function Cell( { cell, label, isActive, isCompact, onClick } ) {
	return (
		<>
			{ isCompact &&
				<CellContent
					cell={ cell }
					isActive={ isActive }
					isCompact={ isCompact }
					onClick={ onClick }
				/>
			}
			{ ! isCompact &&
				<Tooltip text={ label }>
					<div>
						<CellContent
							cell={ cell }
							isActive={ isActive }
							isCompact={ isCompact }
							onClick={ onClick }
						/>
					</div>
				</Tooltip>
			}
		</>
	);
}
