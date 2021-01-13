/**
 * WordPress dependencies
 */
import {
	applyFilters,
} from '@wordpress/hooks';

import {
	Component,
} from '@wordpress/element';

/**
 * Component Class
 */
export default class ApplyFilters extends Component {
	render() {
		const {
			name,
			children,
		} = this.props;

		return (
			applyFilters(
				name,
				children || '',
				this.props,
			)
		);
	}
}
