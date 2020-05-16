import { ApolloProvider } from '@apollo/react-hooks';
import { Button } from 'antd';
import React, { useState } from 'react';
import AddNewCategoryModal from 'src/components/AddNewCategoryModal/AddNewCategoryModal';
import AddNewModuleModal from 'src/components/AddNewModuleModal/AddNewModuleModal';
import SvgArea from 'src/components/SvgArea';
import TestArea from 'src/components/TestArea/TestArea';
import apolloClient from 'src/data/ApolloClient';
import './App.scss';
import CategoryDrawer from './components/CategoryDrawer/CategoryDrawer';

function App() {
	const [addNewModuleModalVisible, setAddNewModuleModalVisible] = useState<boolean>(false);
	const [addNewCategoryModalVisible, setAddNewCategoryModalVisible] = useState<boolean>(false);
	const [categoryDrawerVisible, setCategoryDrawerVisible] = useState<boolean>(false);

	return (
		<ApolloProvider client={apolloClient}>
			<div className="App">
				<SvgArea />
				<TestArea />

				<div className="controls">
					<Button type="primary" onClick={() => setCategoryDrawerVisible(true)}>
						Categories
					</Button>
					<Button type="primary" onClick={() => setAddNewCategoryModalVisible(true)}>
						Add New Category
					</Button>
					<Button type="primary" onClick={() => setAddNewModuleModalVisible(true)}>
						Add New Module
					</Button>
				</div>
			</div>

			<AddNewCategoryModal isVisible={addNewCategoryModalVisible} setIsVisible={setAddNewCategoryModalVisible} />
			<AddNewModuleModal isVisible={addNewModuleModalVisible} setIsVisible={setAddNewModuleModalVisible} />
			<CategoryDrawer isVisible={categoryDrawerVisible} setIsVisible={setCategoryDrawerVisible} />
		</ApolloProvider>
	);
}

export default App;
