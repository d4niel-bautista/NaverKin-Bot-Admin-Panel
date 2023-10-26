import QuestionAnswerForm from "./components/QuestionAnswerForm/QuestionAnswerForm";
import AccountsTable from "./components/Accounts/AccountsTable";
import LoginForm from "./components/Login/LoginForm";
import AddAccount from "./components/Accounts/AddAccount";
import Layout from "./components/MainApp/Layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
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
      },
    ],
  },
  {
    path: "/login",
    element: <LoginForm />,
  }
]);

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
