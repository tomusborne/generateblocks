import { applyFilters } from '@wordpress/hooks';
import { createContext } from '@wordpress/element';
import { useInnerBlocksCount } from '../../hooks';
import TemplateSelector from './index';

const defaultContext = {
	label: 'Label',
	instructions: 'Instructions...',
	templates: [],
};

const TemplateContext = createContext( defaultContext );

export const withTemplateContext = ( WrappedComponent ) => ( ( props ) => {
	const { clientId } = props;
	const innerBlocksCount = useInnerBlocksCount( clientId );
	const templateContext = applyFilters(
		'generateblocks.editor.templateContext',
		defaultContext,
		props
	);

	return (
		<TemplateContext.Provider value={ templateContext }>
			{ 0 < templateContext.templates.length && 0 === innerBlocksCount
				? <WrappedComponent { ...props } ContentRenderer={ TemplateSelector } />
				: <WrappedComponent { ...props } />
			}
		</TemplateContext.Provider>
	);
} );

export default TemplateContext;
