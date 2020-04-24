import ApplyFilters from '../apply-filters/';

const {
	PanelBody,
} = wp.components;

const {
	Component,
 	Fragment,
} = wp.element;

const {
	applyFilters
} = wp.hooks;

/**
 * Component Class
 */
export default class PanelArea extends Component {
    render() {
        const {
            title,
			initialOpen = false,
			icon,
			className,
			id,
			state,
			showPanel = true,
            children,
        } = this.props;

		const show = applyFilters( 'generateblocks.editor.showPanel', showPanel, id, this.props );

        return (
			<ApplyFilters name={ 'generateblocks.panel.' + id } props={ this.props } state={ state }>
				{ show &&
					<PanelBody
						title={ title }
						initialOpen={ initialOpen }
						icon={ icon }
						className={ className }
					>
						{ children }
					</PanelBody>
				}
			</ApplyFilters>
        );
    }
}
