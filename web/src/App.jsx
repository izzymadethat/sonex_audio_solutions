import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/store";

function App() {
  return (
    <>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </>
  );
}

export default App;
