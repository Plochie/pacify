import { useLazyQuery } from '@apollo/react-hooks';
import { Drawer } from 'antd';
import React, { useEffect } from 'react';
import { Category, GET_CATEGORIES } from 'src/data/queries/GetCategories';
import { CategoryContainer } from './CategoryContainer';
import './CategoryDrawer.scss';

interface CategoryDrawerProps {
	isVisible: boolean;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CategoryDrawer(props: CategoryDrawerProps) {
	// start of component
	const [getCategories, { data }] = useLazyQuery<{ categories: Category[] }>(GET_CATEGORIES, { fetchPolicy: 'network-only' });

	useEffect(() => {
		if (props.isVisible) {
			getCategories();
		}
	}, [props.isVisible, getCategories]);

	const onClose = () => {
		props.setIsVisible(false);
	};

	return (
		<Drawer title="Basic Drawer" placement={'left'} closable={true} onClose={onClose} visible={props.isVisible}>
			{
				// Categories
				data?.categories.map(category => {
					return (
						<div key={category.id} className="wrapper">
							<CategoryContainer category={category} />
						</div>
					);
				})
			}
		</Drawer>
	);
}
