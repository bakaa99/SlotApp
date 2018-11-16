import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, } from 'react-navigation';
import HomeScreen from './Screens/HomeScreen';
import SlotDetailScreen from './Screens/SlotDetailScreen';
import { Provider } from 'react-redux';
import * as Actions from './Redux/Actions/ActionTypes';
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
    fetch('http://localhost:4000/store/'
    ).then((response) => response.json())
      .then((responseJson) => {
        () => {
          store.dispatch({ type: Actions.LOAD_INITIAL, data:responseJson })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
