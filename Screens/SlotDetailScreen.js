import React from 'react';
import {
    StyleSheet, Text, View, TextInput, TouchableWithoutFeedback,
    Keyboard, TouchableOpacity, Alert, Modal, TouchableHighlight, CameraRoll, ScrollView,
    PermissionsAndroid, Platform, Image
} from 'react-native';
import { connect } from 'react-redux';
import * as Actions from '../Redux/Actions/ActionTypes';


const mapStateToProps = (state) => ({
    slots: state.SlotsReducer.slots
});

const mapDispatchToProps = (dispatch) => ({
    save: (data) => dispatch({ type: Actions.SAVE_SLOT, data }),
    edit: (data) => dispatch({ type: Actions.EDIT_SLOT, data }),
});

class SlotDetailsScreen extends React.Component {

    static navigationOptions = {
        title: 'Details',
        headerStyle: {
            backgroundColor: '#0686E4',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            flex: 1,
            marginRight: 75
        },
    };

    constructor(props) {
        super(props)
    }


    state = {
        startTime: '',
        EndTime: '',
        firstName: '',
        lastName: '',
        phone: '',
        editSlot: false,
        modalVisible: false
    }

    componentWillMount() {
        const { navigation } = this.props;
        const selectedSlot = navigation.getParam('slot');
        let slot = this.props.slots.find(slot => slot.startTime === selectedSlot.startTime && slot.endTime === selectedSlot.endTime);
        if (slot) {
            this.setState(
                {
                    firstName: slot.firstName,
                    lastName: slot.lastName,
                    phone: slot.phone,
                    startTime: slot.startTime,
                    endTime: slot.endTime,
                    editing: true
                }
            )
        }
        else {
            this.setState(
                {
                    startTime: selectedSlot.startTime,
                    endTime: selectedSlot.endTime
                }
            )
        }
    }

    _onPressSave = () => {
        let { firstName, lastName, phone, startTime, endTime, editSlot } = this.state;
        if (!firstName || !lastName || !phone || firstName.match(/^ *$/) !== null || lastName.match(/^ *$/) !== null || phone.match(/^ *$/) !== null) {
            Alert.alert(
                'Alert',
                'Invalid Data',
                [
                    { text: 'OK', onPress: () => null },
                ],
                { cancelable: true }
            )
            this.setState({
                firstName: '',
                lastName: '',
                phone: '',
            })
        }
        else {
            data = {
                startTime: startTime,
                endTime: endTime,
                firstName: firstName,
                lastName: lastName,
                phone: phone
            }
            if (editSlot)
                this.props.edit(data)
            else
                this.props.save(data)

            this.props.navigation.goBack()
        }
    };

    async requestPhotosPermission() {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.getPhotos();
            } else {
                console.log("Photos permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }

    getPhotos = () => {
        CameraRoll.getPhotos({
            first: 1000,
            assetType: 'Photos',
        })
            .then(r => {
                this.setState({ photos: r.edges });
            })
            .catch((err) => {
                //Error Loading Images
            });
    };

    _onPressCancel = () => {
        this.props.navigation.goBack()
    };

    showModal = () => {
        Platform.OS === 'Android' ? this.requestPhotosPermission() : this.getPhotos()
        this.setState({ modalVisible: true })
    }

    hideModal = () => {
        this.setState({ modalVisible: false })
    }


    renderPhotos = () => {
        if (this.state.photos) {
            return (
                <View style={{ justifyContent: 'center' }}>
                    <View style={[styles.ButtonContainer, { paddingBottom: 20 }]}>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: '#0686E4' }]}
                            onPress={this.hideModal}
                        >
                            <Text style={styles.buttonText}> Close</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentInset={bottom = 50}>
                        {this.state.photos.map((p, i) => {
                            return (
                                <View key={i} style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image

                                        style={{
                                            width: '90%',
                                            height: 200,
                                        }}
                                        source={{ uri: p.node.image.uri }}
                                    />
                                </View>
                            );
                        })}
                        <View style={{ paddingBottom: 250 }}/>
                    </ScrollView>

                </View>
            );
        }

    }



    render() {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.hideModal()
                        }}>
                        <View style={{ marginTop: 22 }}>
                            <View>
                                {this.renderPhotos()}
                            </View>
                        </View>
                    </Modal>
                    <View style={styles.InputView}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="First Name"
                            onChangeText={(firstName) => this.setState({ firstName })}
                            value={this.state.firstName}
                        />
                    </View>
                    <View style={styles.InputView}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Last Name"
                            onChangeText={(lastName) => this.setState({ lastName })}
                            value={this.state.lastName}
                        />
                    </View>
                    <View style={styles.InputView}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Phone Number"
                            onChangeText={(phone) => this.setState({ phone })}
                            value={this.state.phone}
                        />
                    </View>
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#7AAE1A' }]} onPress={this._onPressSave}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>

                        <View style={{ width: '12%' }} />

                        <TouchableOpacity style={[styles.button, { backgroundColor: '#C63927' }]} onPress={this._onPressCancel}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: '#0686E4' }]}
                            onPress={this.showModal}
                        >
                            <Text style={styles.buttonText}> Gallery</Text>
                        </TouchableOpacity>
                    </View>
                </View >
            </TouchableWithoutFeedback>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SlotDetailsScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: '#F5FCFF',
    },
    InputView: {
        paddingHorizontal: 30,
        paddingVertical: 25
    },
    textInput: {
        paddingHorizontal: 5,
        height: 30,
        borderBottomWidth: 1,
        borderRadius: 4,
    },
    ButtonContainer: {
        paddingTop: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: {
        width: '35%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20,

    }
});