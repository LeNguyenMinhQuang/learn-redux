import { all, fork } from "redux-saga/effects";
import counterSaga from "./counter.saga";
import UserSaga from "./user.saga";

function* rootSaga() {
    yield all([fork(counterSaga), fork(UserSaga)]);
}

export default rootSaga;
