import { all, fork } from "redux-saga/effects";
import counterSaga from "./counter.saga";

function* rootSaga() {
    yield all([fork(counterSaga)]);
}

export default rootSaga;
