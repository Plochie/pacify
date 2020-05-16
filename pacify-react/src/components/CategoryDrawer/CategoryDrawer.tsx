import { DownOutlined } from '@ant-design/icons';
import { useLazyQuery } from '@apollo/react-hooks';
import { Drawer, Tree } from 'antd';
import React, { useEffect } from 'react';
import { Category, GET_CATEGORIES } from 'src/data/queries/GetCategories';

let treeData: {
	title: string;
	key: string;
	children: {
		title: string;
		key: string;
	}[];
}[] = [];

interface CategoryDrawerProps {
	isVisible: boolean;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function CategoryDrawer(props: CategoryDrawerProps) {
	const [getCategories, { data }] = useLazyQuery<{ categories: Category[] }>(GET_CATEGORIES);

	useEffect(() => {
		if (props.isVisible) {
			getCategories();
		}
	}, [props.isVisible]);

	// set category tree after data received
	if (data && data.categories) {
		treeData = [];

		console.log('here', data);

		data.categories.forEach(category => {
			// add category first
			treeData.push({
				title: category.name,
				key: category.sid,
				children: [],
			});
		});
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
