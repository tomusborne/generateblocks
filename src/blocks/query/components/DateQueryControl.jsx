import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { BaseControl } from '@wordpress/components';

import { Stack } from '@edge22/components';

import { DateTimeControl } from './DateTimeControl';

export function DateQueryControl( { id, value, onChange } ) {
	const [ dateQuery, setDateQuery ] = useState( value );
	const { before = '', after = '' } = dateQuery;

	return (
		<BaseControl
			id="gblocks-date-query"
			label={ __( 'Date Query', 'generateblocks' ) }
			className="gb-date-query"
			__nextHasNoMarginBottom
		>
			<Stack gap="12px" className="gb-date-query__inner">
				<DateTimeControl
					id={ `${ id }-before` }
					label={ __( 'Before', 'generateblocks' ) }
					help={ __( 'Limit response to posts published before a given date.', 'generateblocks' ) }
					value={ before }
					onChange={ ( newValue ) => {
						const newDateQuery = { ...dateQuery, before: newValue };

						setDateQuery( newDateQuery );

						if ( onChange ) {
							onChange( newDateQuery );
						}
					} }
				/>
				<hr />
				<DateTimeControl
					id={ `${ id }-after` }
					label={ __( 'After', 'generateblocks' ) }
					help={ __( 'Limit response to posts published after a given date.', 'generateblocks' ) }
					value={ after }
					onChange={ ( newValue ) => {
						const newDateQuery = { ...dateQuery, after: newValue };

						setDateQuery( newDateQuery );

						if ( onChange ) {
							onChange( newDateQuery );
						}
					} }
				/>
			</Stack>
		</BaseControl>
	);
}
