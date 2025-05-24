import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
    createBrowserRouter,
    RouterProvider as Router,
} from "react-router-dom";

import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.tsx";
import { store, persistor } from "./redux/store.ts";

import "bootstrap/dist/css/bootstrap.min.css";
import MyTab from "./components/Tabs.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <div>404 Not Found!</div>,
        children: [
            { index: true, element: <MyTab /> },
            { path: "user", element: <div>User Page</div> },
        ],
    },
    {
        path: "/login",
        element: <div>Login Page</div>,
    },
]);

createRoot(document.getElementById("root")!).render(
    // <StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router router={router} />
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                // pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </PersistGate>
    </Provider>
    // </StrictMode>
);
