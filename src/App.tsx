import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import { router } from "./routes/Routes";

const App = () => {
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster position="top-center" reverseOrder={false} />
      </Provider>
    </PersistGate>
  );
};

export default App;
