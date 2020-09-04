import { FolderOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import React from 'react';
import { ModuleContainer } from 'src/components/CategoryDrawer/ModuleContainer';
import { Category } from 'src/data/queries/GetCategories';
import './CategoryDrawer.scss';

export function CategoryContainer({ category }: { category: Category }) {
	// category container
	const onCategoryClick = (category: Category) => {
		console.log(category);
	};

	return (
		<div key={category.id} className="wrapper">
			<div className="category-container" onClick={() => onCategoryClick(category)}>
				<FolderOutlined style={{ padding: 5, fontSize: '20px' }} />
				<span style={{ flexGrow: 1 }}>
					<strong>{category.title}</strong>
				</span>
				<Badge count={category.modules.length} />
			</div>
			{
				// add module menu
				category.modules.map(module => {
					return <ModuleContainer module={module} key={module.sid} />;
				})
			}
		</div>
	);
}
