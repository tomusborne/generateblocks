import { BaseControl, Button, ButtonGroup, Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { alignLeft, alignRight, alignCenter } from '@wordpress/icons';

export default function Alignment( { value, onChange } ) {
	const alignments = [ 'left', 'center', 'right', 'justify' ];

	const icons = {
		left: alignLeft,
		center: alignCenter,
		right: alignRight,
	};

	const labels = {
		left: __( 'Left', 'generateblocks' ),
		center: __( 'Center', 'generateblocks' ),
		right: __( 'Right', 'generateblocks' ),
	};

	return (
		<BaseControl
			label={ __( 'Text Alignment', 'generateblocks' ) }
			id="gblocks-alignment-button-group"
		>
			<div>
				<ButtonGroup className="gblocks-alignment-button-group" id="gblocks-alignment-button-group">
					{ alignments.map( ( alignment ) => {
						return (
							<Tooltip key={ alignment } text={ labels[ alignment ] }>
								<Button
									isPrimary={ alignment === value }
									onClick={ () => onChange( alignment !== value ? alignment : '' ) }
									icon={ icons[ alignment ] }
								/>
							</Tooltip>
						);
					} ) }
				</ButtonGroup>
			</div>
		</BaseControl>
	);
}
