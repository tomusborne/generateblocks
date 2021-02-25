import classnames from 'classnames';
import getIcon from '../../utils/get-icon';

// Import CSS
import './editor.scss';

import {
	__,
} from '@wordpress/i18n';

import {
	Component,
} from '@wordpress/element';

import {
	Button,
	ToggleControl,
} from '@wordpress/components';

import {
	URLInput,
} from '@wordpress/block-editor';

import {
	applyFilters,
} from '@wordpress/hooks';

export default class ButtonURLInput extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			moreOptions: false,
		};

		this.onChange = this.onChange.bind( this );
	}

	onChange( data ) {
		const {
			url,
			target,
			relNoFollow,
			relSponsored,
		} = this.props;

		this.props.onChange( {
			...{
				url,
				target,
				relNoFollow,
				relSponsored,
			},
			...data,
		} );
	}

	render() {
		const {
			url,
			target,
			relNoFollow,
			relSponsored,
			className,
			autoFocus,
		} = this.props;

		const {
			onChange,
		} = this;

		const {
			moreOptions,
		} = this.state;

		return (
			<div className={ classnames( 'gblocks-component-url-input', className ) }>
				<div className="gblocks-component-url-input-flex">
					<URLInput
						value={ url }
						onChange={ ( value ) => {
							onChange( {
								url: value,
							} );
						} }
						autoFocus={ autoFocus } // eslint-disable-line jsx-a11y/no-autofocus
					/>
					<Button
						icon={ getIcon( 'ellipsis' ) }
						label={ moreOptions ? __( 'Hide More Options', 'generateblocks' ) : __( 'Show More Options', 'generateblocks' ) }
						onClick={ () => {
							this.setState( {
								moreOptions: ! moreOptions,
							} );
						} }
					/>
				</div>
				{ moreOptions &&
					<div className="gblocks-component-url-input-more-options">
						{ applyFilters( 'generateblocks.editor.urlInputMoreOptions', '', this.props, this.state ) }

						<ToggleControl
							label={ __( 'Open link in a new tab', 'generateblocks' ) }
							checked={ target || '' }
							onChange={ ( value ) => {
								onChange( {
									target: value,
								} );
							} }
						/>

						<ToggleControl
							label={ __( 'Add rel="nofollow"', 'generateblocks' ) }
							checked={ relNoFollow || '' }
							onChange={ ( value ) => {
								onChange( {
									relNoFollow: value,
								} );
							} }
						/>

						<ToggleControl
							label={ __( 'Add rel="sponsored"', 'generateblocks' ) }
							checked={ relSponsored || '' }
							onChange={ ( value ) => {
								onChange( {
									relSponsored: value,
								} );
							} }
						/>
					</div>
				}
			</div>
		);
	}
}
