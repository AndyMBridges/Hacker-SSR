// defaults
import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import styled from 'styled-components';
import Loadable from 'react-loadable';

const Homepage = Loadable({
  loader: () => import(/* webpackChunkName: "home" */'./containers/Home/index'),
  loading: () => <div>Loading...</div>
});

const NotFoundPage = Loadable({
  loader: () => import(/* webpackChunkName: "404" */'./containers/404/index'),
  loading: () => <div>Loading...</div>
});

const Wrapper = styled.div`
  padding: 2rem;
  max-width: 1100px;
  margin: 0 auto;
`

const App = () => (
  <div className="App">
    <Navbar />
    <Wrapper>
      <Switch>
        <Route exact={true} path="/" component={Homepage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Wrapper>
  </div>
)

export default App
