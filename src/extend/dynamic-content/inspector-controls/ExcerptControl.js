import { ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import NumberControl from '../../../components/number-control';
import DebouncedTextControl from '../../../components/debounced-text-control';

export default function ExcerptControl( props ) {
	const {
		isActive,
		useDefaultMoreLink,
		customMoreLinkText,
		setAttributes,
	} = props;

	return (
		<>
			{ isActive &&
				<>
					<NumberControl
						{ ...props }
						label={ __( 'Excerpt length', 'generateblocks' ) }
						attributeName="excerptLength"
						min="0"
					/>

					<ToggleControl
						label={ __( 'Use default more link', 'generateblocks' ) }
						checked={ !! useDefaultMoreLink }
						onChange={ ( value ) => setAttributes( { useDefaultMoreLink: value } ) }
					/>

					{ ! useDefaultMoreLink &&
						<DebouncedTextControl
							label={ __( 'Custom more link text', 'generateblocks' ) }
							value={ customMoreLinkText }
							onChange={ ( value ) => setAttributes( { customMoreLinkText: value } ) }
						/>
					}
				</>
			}
		</>
	);
}
