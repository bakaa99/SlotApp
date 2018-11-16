import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import ListItem from '../Components/ListItem';

const mapStateToProps = (state) => ({
    startTime: state.SlotsReducer.startTime,
    endTime: state.SlotsReducer.endTime,
    slots: state.SlotsReducer.slots
});

class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Slots',
        headerStyle: {
            backgroundColor: '#0686E4',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: "center",
            flex: 1,
        },
    };

    constructor(props) {
        super(props)
    }

    state = { slots: [] };

    componentDidMount() {
        this.generateSlots(this.convertTo24HoursFormat(this.props.startTime), this.convertTo24HoursFormat(this.props.endTime))
    }

    componentDidUpdate(prevProps) {
        if (this.props.slots !== prevProps.slots) {
            this.uploadData()
            this.generateSlots(this.convertTo24HoursFormat(this.props.startTime), this.convertTo24HoursFormat(this.props.endTime))
        }
    }

    uploadData() {
        let body = {
            startTime: this.props.startTime,
            endTime: this.props.endTime,
            slots: this.props.slots
        }
        fetch('http://localhost:4000/store/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
    }

    convertTo24HoursFormat(time) {
        splitTime = time.split(" ")
        if (splitTime[1] === 'AM')
            return parseInt(splitTime[0])
        else
            return parseInt(splitTime[0]) + 12
    }

    convertTo12HoursFormat(time) {
        if (time > 12)
            return this.formatTime(time - 12) + ' PM'

        else
            return this.formatTime(time) + ' AM'
    }

    formatTime(time) {
        if (time < 10) {
            return '0' + time
        }

        return time
    }

    generateSlots(start, end) {

        let slots = [];
        while (start < end) {
            let slotStartTime = this.convertTo12HoursFormat(start);
            let slotEndTime = this.convertTo12HoursFormat(start + 1);

            let slot = this.props.slots.find(slot => slot.startTime === slotStartTime && slot.endTime === slotEndTime);

            if (slot) {
                slots.push({ 'slot': { 'startTime': slotStartTime, 'endTime': slotEndTime, appointed: true } })
            }
            else {
                slots.push({ 'slot': { 'startTime': slotStartTime, 'endTime': slotEndTime, appointed: false } })
            }

            start = start + 1
        }
        this.setState({ slots: slots })

    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    extraData={this.props.slots}
                    data={this.state.slots}
                    renderItem={item => <ListItem navigation={this.props.navigation} slot={item.item.slot} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        paddingBottom: 15
    },
})