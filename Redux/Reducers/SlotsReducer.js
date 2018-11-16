import * as Actions from '../Actions/ActionTypes'

const initialState = {
    startTime: '9 AM',
    endTime: '5 PM',
    slots: []
};

const SlotsReducer = (state = initialState, action) => {
    switch (action.type) {

        case Actions.LOAD_INITIAL: {
            return Object.assign({}, state, {
                slots: action.data.slots,
                startTime: action.data.startTime,
                endTime: action.data.endTime
            });
        }

        case Actions.SAVE_SLOT:
            return Object.assign({}, state, {
                slots: [
                    ...state.slots,
                    {
                        startTime: action.data.startTime,
                        endTime: action.data.endTime,
                        firstName: action.data.firstName,
                        lastName: action.data.lastName,
                        phone: action.data.phone
                    }
                ]
            });
            
        case Actions.EDIT_SLOT:
            let slots = state.slots;

            slots.map((slot, index) => {
                if (slot.startTime === action.data.startTime && slot.endTime === action.data.endTime) {
                    return Object.assign(slot, {
                        firstName: action.data.firstName,
                        lastName: action.data.lastName,
                        phone: action.data.phone
                    })
                }
            })

            return Object.assign({}, state, {
                slots
            })
        default:
            return state;
    }
}

export default SlotsReducer;