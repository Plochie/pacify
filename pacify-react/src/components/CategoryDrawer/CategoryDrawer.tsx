import { DownOutlined } from '@ant-design/icons';
import { useLazyQuery } from '@apollo/react-hooks';
import { Drawer, Tree } from 'antd';
import React, { useEffect } from 'react';
import { Category, GET_CATEGORIES } from 'src/data/queries/GetCategories';

interface TreeNode {
	title: string;
	key: string;
	children?: TreeNode[];
}

let treeData: TreeNode[];

interface CategoryDrawerProps {
	isVisible: boolean;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function CategoryDrawer(props: CategoryDrawerProps) {
	// start of component
	const [getCategories, { data }] = useLazyQuery<{ categories: Category[] }>(GET_CATEGORIES, { fetchPolicy: 'network-only' });

	useEffect(() => {
		if (props.isVisible) {
			getCategories();
		}
	}, [props.isVisible, getCategories]);

	// set category tree after data received
	if (data && data.categories) {
		treeData = [];

		data.categories.forEach(category => {
			let children: TreeNode[] = [];

			if (category.modules) {
				category.modules.forEach(module => {
					children.push({
						title: module.title,
						key: module.sid,
					});
				});
			}

			// add category first
			treeData.push({
				title: category.title,
				key: category.sid,
				children,
			});
		});

		console.log(treeData);
	}

	const onClose = () => {
		props.setIsVisible(false);
	};

	return (
		<Drawer title="Basic Drawer" placement={'left'} closable={true} onClose={onClose} visible={props.isVisible}>
			{/* <p>{JSON.stringify(data, null, 4)}</p> */}
			<Tree showIcon defaultExpandAll defaultSelectedKeys={['0-0-0']} switcherIcon={<DownOutlined />} treeData={treeData} />
		</Drawer>
	);
}

export default CategoryDrawer;
