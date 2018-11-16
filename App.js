import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, } from 'react-navigation';
import HomeScreen from './Screens/HomeScreen';
import SlotDetailScreen from './Screens/SlotDetailScreen';
import { Provider } from 'react-redux';

import store from './Redux/Reducers';

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Details: {
      screen: SlotDetailScreen
    }
  },
  {
    initialRouteName: 'Home',
  }
);

class Container extends React.Component {

  componentDidMount() {
    this.callApi()
  }

  callApi = async () => {
    const response = await fetch('/store/');
    const body = await response.json();
    console.log('---->  ',body );
    
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    return <RootStack />;
  }
}


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
