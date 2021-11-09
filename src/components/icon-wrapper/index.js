import { Fragment } from '@wordpress/element';

export default ( {
	icon,
	hasIcon = true,
	direction = 'left',
	children,
	ariaLabel,
	hideChildren = false,
	showWrapper = false,
	wrapperClassname = '',
} ) => {
	const Icon = icon ? (
		<span
			className="gb-icon"
			aria-label={ ariaLabel }
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
