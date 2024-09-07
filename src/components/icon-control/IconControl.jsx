import { TextControl, BaseControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { IconModal } from './IconModal.jsx';
import sanitizeSVG from '../../utils/sanitize-svg/index.js';
import './editor.scss';

export function IconControl( { value, onChange, onClear, attributes } ) {
	const [ isOpen, setIsOpen ] = useState( false );

	return (
		<>
			<BaseControl
				className="gb-icon-control"
			>
				<TextControl
					label={ __( 'SVG Code', 'generateblocks' ) }
					value={ value }
					onChange={ onChange }
					onBlur={ () => {
						const sanitizedValue = sanitizeSVG( value );
						onChange( sanitizedValue );
					} }
				/>

				<div className="gb-icon-control__preview">
					{ !! value && (
						<span dangerouslySetInnerHTML={ { __html: value } } />
					) }

					{ !! value && (
						<Button
							variant="secondary"
							size="small"
							onClick={ onClear }
							isDestructive
						>
							{ __( 'Clear', 'generateblocks' ) }
						</Button>
					) }

					<Button
						variant="secondary"
						size="small"
						onClick={ () => setIsOpen( true ) }
					>
						{ __( 'Open Library', 'generateblocks' ) }
					</Button>
				</div>
			</BaseControl>

			{ !! isOpen && (
				<IconModal
					value={ value }
					onChange={ onChange }
					setIsOpen={ setIsOpen }
					attributes={ attributes }
				/>
			) }
		</>
	);
}
