import QuestionAnswerForm from "./components/QuestionAnswerForm/QuestionAnswerForm";
import LoginForm from "./components/Login/LoginForm";
import AddAccount from "./components/Accounts/AddAccount";
import Layout from "./components/MainApp/Layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import { AuthProvider } from "./context/AuthProvider";
import AccountsDataGrid from "./components/Accounts/AccountsDataGrid";
import IncreaseLevel from "./components/IncreaseLevel/IncreaseLevel";
import Configurations from "./components/Configurations/Configurations";
import { ServerAPIProvider } from "./context/ServerAPIProvider";

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: [{
      element: <Layout />,
      path: "/",
      children: [{
        path: "/accounts",
        element: <AccountsDataGrid />,
      },
      {
        path: "/add_account",
        element: <AddAccount />,
      },
      {
        path: "/configurations",
        element: <Configurations />,
      },
      {
        path: "/increase_level",
        element: <IncreaseLevel />,
      },
      {
        path: "/question_answer_form",
        element: <QuestionAnswerForm />,
      }]
    }],
  },
  {
    path: "/login",
    element: <LoginForm />,
  }
]);

const App = () => {
  return (
    <div className="App">
      <ServerAPIProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ServerAPIProvider>
    </div>
  );
};

export default App;