import { all, fork, put, takeEvery } from "redux-saga/effects";
import {
    decreaseSagaSuccess,
    increaseSagaSuccess,
} from "../counter/counter.slide";

// worker
function* handleIncrement() {
    // yield delay(2000);
    try {
        // yield put({
        //     type: "counter/increaseSagaSuccess",
        //     payload: { value: 1 },
        // });
        yield put(increaseSagaSuccess({ value: 1 }));
    } catch (e) {
        yield put({
            type: "counter/increaseSagaFailed",
        });
        throw new Error("error");
    }
}

function* handleDecrement() {
    // yield delay(2000);
    try {
        yield put(decreaseSagaSuccess({ value: 1 }));
    } catch (e) {
        yield put({
            type: "counter/decreaseSagaFailed",
        });
        throw new Error("error");
    }
}

// watcher
// take thì để trong while true, còn takeEvery thì ko cần
function* watcherIncrement() {
    yield takeEvery("counter/increaseSagaStart", handleIncrement);
}

function* watcherDecrement() {
    yield takeEvery("counter/decreaseSagaStart", handleDecrement);
}

function* counterSaga() {
    yield all([fork(watcherIncrement), fork(watcherDecrement)]);
}

export default counterSaga;
