import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default ( props ) => {
	return (
		<div style={ { textAlign: 'center', marginBottom: '1.33em' } }>
			<Button
				isPrimary
				text={ __( 'Add query parameter', 'generateblocks' ) }
				{ ...props }
			/>
		</div>
	);
};
