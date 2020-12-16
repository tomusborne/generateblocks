import ApplyFilters from '../apply-filters/';

import {
	PanelBody,
} from '@wordpress/components';

import {
	Component,
} from '@wordpress/element';

import {
	applyFilters,
} from '@wordpress/hooks';

/**
 * Component Class
 */
export default class PanelArea extends Component {
	render() {
		const {
			title = false,
			initialOpen = false,
			icon,
			className,
			id,
			state,
			showPanel = true,
			children,
		} = this.props;

		const show = applyFilters( 'generateblocks.editor.showPanel', showPanel, id, this.props );

		if ( ! show ) {
			return null;
		}

		let hasChildren = true;

		if ( '' === children ) {
			hasChildren = false;
		}

		// If we have items in the panel, make sure they're not empty.
		if ( 'object' === typeof children ) {
			hasChildren = Object.values( children ).some( ( x ) => ( x !== null && x !== false && x !== '' ) );
		}

		if ( ! hasChildren ) {
			return null;
		}

		return (
			<ApplyFilters name={ 'generateblocks.panel.' + id } props={ this.props } state={ state }>
				{ title ? (
					<PanelBody
						title={ title }
						initialOpen={ initialOpen }
						icon={ icon }
						className={ className }
					>
						{
							applyFilters( 'generateblocks.editor.panelContents', children, id, this.props )
						}
					</PanelBody>
				) : (
					<PanelBody>
						{
							applyFilters( 'generateblocks.editor.panelContents', children, id, this.props )
						}
					</PanelBody>
				) }
			</ApplyFilters>
		);
	}
}
