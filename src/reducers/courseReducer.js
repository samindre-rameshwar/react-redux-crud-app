import * as types from '../actions/actionType';
export function courseReducer(state = [], action) {
    switch (action.type) {
        case types.LOAD_COURSES_SUCCESS:
            return action.courses;
        // break;

        default:
            return state;
        // break;
    }
}

export default courseReducer;