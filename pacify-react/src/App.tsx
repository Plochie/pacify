import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import apolloClient from 'src/data/ApolloClient';
import { EditorPage, HomePage } from 'src/pages';
import './App.scss';

function App() {
	return (
		<ApolloProvider client={apolloClient}>
			<Router>
				<div>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/editor">Editor</Link>
						</li>
					</ul>

					<Switch>
						<Route path="/editor">
							<EditorPage />
						</Route>
						<Route path="/">
							<HomePage />
						</Route>
					</Switch>
				</div>
			</Router>
		</ApolloProvider>

		// <ApolloProvider client={apolloClient}>
		// 	<div className="App">
		// 		<SvgArea />
		// 		<TestArea />

		// 		<div className="controls">
		// 			<Button type="primary" onClick={() => setCategoryDrawerVisible(true)}>
		// 				Categories
		// 			</Button>
		// 			<Button type="primary" onClick={() => setAddNewCategoryModalVisible(true)}>
		// 				Add New Category
		// 			</Button>
		// 			<Button type="primary" onClick={() => setAddNewModuleModalVisible(true)}>
		// 				Add New Module
		// 			</Button>
		// 		</div>
		// 	</div>

		// 	<AddNewCategoryModal isVisible={addNewCategoryModalVisible} setIsVisible={setAddNewCategoryModalVisible} />
		// 	<AddNewModuleModal isVisible={addNewModuleModalVisible} setIsVisible={setAddNewModuleModalVisible} />
		// 	<CategoryDrawer isVisible={categoryDrawerVisible} setIsVisible={setCategoryDrawerVisible} />
		// </ApolloProvider>
	);
}

export default App;
