/**
 * WordPress dependencies
 */
const {
    applyFilters,
} = wp.hooks;

const { Component } = wp.element;

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
