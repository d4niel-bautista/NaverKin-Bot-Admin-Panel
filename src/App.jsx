import QuestionAnswerForm from "./components/QuestionAnswerForm/QuestionAnswerForm";
import AccountsTable from "./components/Accounts/AccountsTable";
import LoginForm from "./components/Login/LoginForm";
import AddAccount from "./components/Accounts/AddAccount";
import Layout from "./components/MainApp/Layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import { AuthProvider } from "./context/AuthProvider";

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: [{
      element: <Layout />,
      path: "/",
      children: [{
        path: "/accounts",
        element: <AccountsTable />,
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

export default App;