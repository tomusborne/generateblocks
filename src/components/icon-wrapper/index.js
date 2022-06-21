import { Fragment } from '@wordpress/element';

export default ( {
	icon,
	hasIcon = true,
	direction = 'left',
	children,
	hideChildren = false,
	showWrapper = false,
	wrapperClassname = '',
} ) => {
	const Icon = icon ? (
		<span
			className="gb-icon"
			dangerouslySetInnerHTML={ { __html: icon } }
		/>
	) : undefined;

	return (
		<Fragment>
			{ hasIcon && 'left' === direction && Icon }
			{ hideChildren || ( showWrapper
				? <span className={ wrapperClassname }>{ children }</span>
				: children
			) }
			{ hasIcon && 'right' === direction && Icon }
		</Fragment>
	);
};
