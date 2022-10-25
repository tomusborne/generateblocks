import { BaseControl, Button, ButtonGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { alignLeft, alignRight, alignCenter } from '@wordpress/icons';

export default function Alignment( { value, onChange } ) {
	return (
		<BaseControl
			label={ __('Text Alignment', 'generateblocks' ) }
		>
			<div>
				<ButtonGroup className="gblocks-alignment-button-group">
					<Button
						isPrimary={ 'left' === value }
						onClick={ () => onChange( 'left' !== value ? 'left' : '' ) }
						icon={ alignLeft }
					/>
					<Button
						isPrimary={ 'center' === value }
						onClick={ () => onChange( 'center' !== value ? 'center' : '' ) }
						icon={ alignCenter }
					/>
					<Button
						isPrimary={ 'right' === value }
						onClick={ () => onChange( 'right' !== value ? 'right' : '' ) }
						icon={ alignRight }
					/>
				</ButtonGroup>
			</div>
		</BaseControl>
	);
}
