import React from 'react';
import { Route } from 'react-router-dom';

import ArticleList from './containers/articleListView';
import ArticleDetail from './containers/articleDetailView';
import Login from './containers/login';
import Signup from './containers/signup';


const BaseRouter = () => (
    <div>
        <Route exact path='/' component={ArticleList} />
        <Route exact path='/articles/:articleId' component={ArticleDetail} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
    </div>
);

export default BaseRouter;