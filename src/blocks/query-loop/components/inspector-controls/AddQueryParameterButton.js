import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default ( props ) => {
	return (
		<div style={ { marginBottom: '1.33em' } }>
			<Button
				isPrimary
				text={ __( 'Add Parameter', 'generateblocks' ) }
				{ ...props }
			/>
		</div>
	);
};
