
import React from 'react';
import { Provider } from 'react-redux';
import store from '../components/redux/store';
import MyLeagues from '../components/screens/MyLeagues';
import { StatusBar } from 'react-native';

const Index = () => (
  // Wrap the MyLeagues component with the Provider component
  // The Provider component provides the Redux store to all components in the component tree
  <Provider store={store}>
    {/* Render the MyLeagues component */}
    {/* The MyLeagues component is responsible for rendering the main UI */}
    <StatusBar backgroundColor="#1a1a1a" barStyle="light-content"/>
    <MyLeagues />
  </Provider>
);

export default Index;

