import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default class ListItem extends Component {

  _onPressButton = () => {
    this.props.navigation.navigate('Details', { slot: this.props.slot })
  }

  render() {    
    return (
      <View style={styles.container}>
        <TouchableOpacity style={[styles.innerView, { backgroundColor: this.props.slot.appointed ? 'red' : '#FFF', }]} onPress={this._onPressButton}>
          <Text style={styles.textStyle}> {this.props.slot.startTime} - {this.props.slot.endTime}</Text>
          <Image source={require('../assets/next.png')} style={{ width: 20, height: 20 }} />
        </TouchableOpacity >
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#F0F0F0',
  },
  innerView: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 5
  },
  textStyle: {
    fontSize: 18
  }
})