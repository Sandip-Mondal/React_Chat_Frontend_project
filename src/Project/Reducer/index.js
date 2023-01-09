const initialstate = 0;
const ReducerState = (state = initialstate, val) => {
    switch (val.type) {
        case "SIGNUP":
            return val.payload;
        case "LOGIN":
            return val.payload;

        default: return state;
    }
}

export default ReducerState;