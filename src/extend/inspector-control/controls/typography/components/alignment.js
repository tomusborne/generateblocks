import { BaseControl, Button, ButtonGroup, Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import typographyOptions from '../options';

export default function Alignment( { value, onChange } ) {
	const alignments = typographyOptions.alignments;

	return (
		<BaseControl
			label={ __( 'Text Alignment', 'generateblocks' ) }
			id="gblocks-alignment-button-group"
		>
			<div>
				<ButtonGroup className="gblocks-alignment-button-group" id="gblocks-alignment-button-group">
					{ Object.values( alignments ).map( ( alignment ) => {
						return (
							<Tooltip key={ alignment.align } text={ alignment.title }>
								<Button
									isPrimary={ alignment.align === value }
									onClick={ () => onChange( alignment.align !== value ? alignment.align : '' ) }
									icon={ alignment.icon }
								/>
							</Tooltip>
						);
					} ) }
				</ButtonGroup>
			</div>
		</BaseControl>
	);
}
