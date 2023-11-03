import QuestionAnswerForm from "./components/QuestionAnswerForm/QuestionAnswerForm";
import LoginForm from "./components/Login/LoginForm";
import AddAccount from "./components/Accounts/AddAccount";
import Layout from "./components/MainApp/Layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import { AuthProvider } from "./context/AuthProvider";
import AccountsDataGrid from "./components/Accounts/AccountsDataGrid";

const SERVER = process.env.REACT_APP_SERVER_API;

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
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
};

export { SERVER };
export default App;