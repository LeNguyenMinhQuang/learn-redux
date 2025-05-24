import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
    decrement,
    increaseSagaStart,
    increment,
} from "../redux/counter/counter.slide";

function Count() {
    // setup
    const countValue = useAppSelector((state) => state.count.value);
    const dispatch = useAppDispatch();

    // function
    const handleChangeValue = (value: string) => {
        switch (value) {
            case "plus":
                dispatch(increment());
                break;
            case "minus":
                dispatch(decrement());
                break;
        }
    };

    const handleChangeValue2 = (value: string) => {
        switch (value) {
            case "plus":
                dispatch(increaseSagaStart());
                break;
            case "minus":
                dispatch({ type: "counter/decreaseSagaStart" });
                break;
        }
    };
    return (
        <>
            <h3>Count: {countValue}</h3>
            <div className="d-flex mb-3">
                <Button
                    variant="success"
                    className="me-3"
                    data-button="plus"
                    onClick={(e) =>
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        handleChangeValue(e.target.getAttribute("data-button"))
                    }
                >
                    Increase +1
                </Button>
                <Button
                    variant="warning"
                    data-button="minus"
                    onClick={(e) =>
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        handleChangeValue(e.target.getAttribute("data-button"))
                    }
                >
                    Decrease -1
                </Button>
            </div>

            <div className="d-flex">
                <Button
                    variant="success"
                    className="me-3"
                    data-button="plus"
                    onClick={(e) =>
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        handleChangeValue2(e.target.getAttribute("data-button"))
                    }
                >
                    Increase with Sage +1
                </Button>
                <Button
                    variant="warning"
                    data-button="minus"
                    onClick={(e) =>
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        handleChangeValue2(e.target.getAttribute("data-button"))
                    }
                >
                    Decrease with Sage -1
                </Button>
            </div>
        </>
    );
}

export default Count;
