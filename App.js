
// import React from 'react';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { StatusBar } from 'expo-status-bar';
// import MyLeagues from './src/screens/MyLeagues';
// export default function App() {
//   return (
//     <GestureHandlerRootView  style={{flex:1}}>
//       <StatusBar />
//         <MyLeagues />  
//     </GestureHandlerRootView>
//   );
// }
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar, SafeAreaView } from 'react-native';
import MyLeagues from './src/screens/MyLeagues';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle="light-content" />
        <MyLeagues />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
