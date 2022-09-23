import PanelArea from '../../../../components/panel-area';
import HtmlTag from './components/html-tag';

export default function ElementControls( { attributes, setAttributes } ) {
	const marginUnit = generateBlocksDefaults.headline.marginUnit;
	const {
		element,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
	} = attributes;

	return (
		<PanelArea id={ 'headlineElement' }>
			<HtmlTag
				value={ element }
				onChange={ ( value ) => {
					setAttributes( {
						element: value,
					} );

					if ( ! marginTop && ! marginRight && ! marginBottom && ! marginLeft ) {
						if ( 'p' === value ) {
							setAttributes( { marginUnit: 'em' } );
						} else {
							setAttributes( { marginUnit } );
						}
					}
				} }
			/>
		</PanelArea>
	);
}
