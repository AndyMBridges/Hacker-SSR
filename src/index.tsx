import React from 'react'
import { render, hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import Loadable from 'react-loadable'
import { Frontload } from 'react-frontload'
import { ConnectedRouter } from 'connected-react-router'
import createStore from './store'
// import { getAllPosts } from './actions/postsActions';

import App from './App'

import './index.css'

// Create a store and get back itself and its history object
const { store, history } = createStore()

// store.dispatch(getAllPosts());

// Running locally, we should run on a <ConnectedRouter />
// rather than on a <StaticRouter /> like on the server
// Let's also let React Frontload explicitly know we're not rendering on the server here

/* eslint-disable react/jsx-filename-extension */
const Application = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Frontload noServerRender>
        <App />
      </Frontload>
    </ConnectedRouter>
  </Provider>
)

const root = document.querySelector('#root')

if (root && root.hasChildNodes() === true) {
  // If it's an SSR, we use hydrate to get fast page loads by just
  // attaching event listeners after the initial render
  Loadable.preloadReady().then(() => {
    hydrate(Application, root)
  })
} else {
  // If we're not running on the server, just render like normal
  render(Application, root)
}
