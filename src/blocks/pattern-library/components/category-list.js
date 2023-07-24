import { Button } from '@wordpress/components';
import { useLibrary } from './library-provider';
import { __ } from '@wordpress/i18n';

export default function CategoryList() {
	const { categories, activeCategory, setActiveCategory } = useLibrary();

	return (
		<div className="pattern-category-list">
			<Button
				isPressed={ '' === activeCategory }
				onClick={ () => setActiveCategory( '' ) }
			>
				{ __( 'All', 'generateblocks' ) }
			</Button>
			{ categories && categories.map( ( category ) => (
				<Button
					key={ category.id }
					isPressed={ category.id === activeCategory }
					onClick={ () => setActiveCategory( category.id ) }
				>
					{ category.name }
				</Button>
			) ) }
		</div>
	);
}
