import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import List from './components/list';
import Create from './components/create';
import Update from './components/update';

//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<Router>
		<div>
			<Route exact path='/' component={List} />
			<Route path='/create' component={Create} />
			<Route path='/update/:id' component={Update} />
		</div>
    </Router>,
    
document.getElementById('root'));

//registerServiceWorker();
