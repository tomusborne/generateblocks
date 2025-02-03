import { Tooltip, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';

function GlobeIcon( { size, ...props } ) {
	return (
		<svg
			viewBox="0 0 256 256"
			width={ size ? size : 24 }
			height={ size ? size : 24 }
			aria-hidden="true"
			focusable="false"
			{ ...props }
		>
			<rect width="256" height="256" fill="none" />
			<line x1="32" y1="128" x2="224" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" />
			<circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" />
			<path d="M168,128c0,64-40,96-40,96s-40-32-40-96,40-96,40-96S168,64,168,128Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" />
		</svg>
	);
}

function GlobalMaxWidthButton( { value, onChange } ) {
	const valueKey = 'var(--gb-container-width)';

	return (
		<Tooltip
			text={ valueKey === value
				? __( 'Remove global max-width', 'generateblocks' )
				: __( 'Set global max-width', 'generateblocks' )
			}
		>
			<Button
				icon={ <GlobeIcon /> }
				variant={ valueKey === value ? 'primary' : '' }
				onClick={ () => {
					if ( valueKey === value ) {
						onChange( '' );
					} else {
						onChange( valueKey );
					}
				} }
			/>
		</Tooltip>
	);
}

function addGlobalMaxWidth( componentProps, data ) {
	if ( 'maxWidth' !== data.cssProp ) {
		return componentProps;
	}

	return {
		...componentProps,
		overrideAction: ( onChange ) => (
			<GlobalMaxWidthButton
				value={ componentProps.value }
				onChange={ onChange }
			/>
		),
		disabled: 'var(--gb-container-width)' === componentProps.value
			? true
			: componentProps.disabled,
	};
}

addFilter(
	'generateblocks.control.props',
	'generateblocks/add-global-max-width',
	addGlobalMaxWidth,
);
