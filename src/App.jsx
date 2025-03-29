import { AuthProvider } from "./context/AuthContext";
import Router from "./router/routes";

function App() {
  return (
    <>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  );
}

export default App;
