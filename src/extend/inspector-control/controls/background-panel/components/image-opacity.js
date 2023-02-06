import { __ } from '@wordpress/i18n';
import { Notice, RangeControl } from '@wordpress/components';

export default function ImageOpacity( { value, onChange, isPseudoElement } ) {
	return (
		<>
			<RangeControl
				label={ __( 'Image Opacity', 'generateblocks' ) }
				value={ value }
				onChange={ onChange }
				min={ 0 }
				max={ 1 }
				step={ 0.01 }
				initialPosition={ generateBlocksDefaults.container.bgOptions.opacity }
			/>

			{ 1 !== value && ! isPseudoElement &&
				<Notice
					className="gblocks-option-notice"
					status="info"
					isDismissible={ false }
				>
					{ __( 'Your selector must be set to Pseudo Element to use opacity.', 'generateblocks' ) }
				</Notice>
			}
		</>
	);
}
