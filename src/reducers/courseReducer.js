import * as types from '../actions/actionType';
import initialState from './initialState';
export function courseReducer(state = initialState.courses, action) {
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