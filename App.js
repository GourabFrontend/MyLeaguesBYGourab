
import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import MyLeagues from './src/screens/MyLeagues';

export default function App() {
  return (
    
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle="light-content" />
        <MyLeagues />
      </SafeAreaView>
    
  );
}
