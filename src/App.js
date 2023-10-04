import QuestionAnswerForm from "./components/QuestionAnswerForm/QuestionAnswerForm";
import AccountsTable from "./components/Accounts/AccountsTable";
import LoginForm from "./components/Login/LoginForm";
import AddAccount from "./components/Accounts/AddAccount";

const exampleAccounts = [
  {
    username: 'john_doe',
    password: 'password123',
    recoveryEmail: 'john.doe@example.com',
    name: 'John Doe',
    dob: '1990-05-15',
    gender: 'Male',
    mobileNo: '+1 (123) 456-7890',
    profileUrl: 'https://example.com/johndoe',
  },
  {
    username: 'jane_smith',
    password: 'securePassword',
    recoveryEmail: 'jane.smith@example.com',
    name: 'Jane Smith',
    dob: '1985-09-20',
    gender: 'Female',
    mobileNo: '+1 (987) 654-3210',
    profileUrl: 'https://example.com/janesmith',
  },
  {
    username: 'alice_jones',
    password: 'alice123',
    recoveryEmail: 'alice.jones@example.com',
    name: 'Alice Jones',
    dob: '1992-03-10',
    gender: 'Female',
    mobileNo: '+1 (555) 123-4567',
    profileUrl: 'https://example.com/alicejones',
  },
  {
    username: 'bob_smith',
    password: 'bob456',
    recoveryEmail: 'bob.smith@example.com',
    name: 'Bob Smith',
    dob: '1988-12-05',
    gender: 'Male',
    mobileNo: '+1 (777) 987-6543',
    profileUrl: 'https://example.com/bobsmith',
  },
  {
    username: 'emily_brown',
    password: 'emily789',
    recoveryEmail: 'emily.brown@example.com',
    name: 'Emily Brown',
    dob: '1995-02-28',
    gender: 'Female',
    mobileNo: '+1 (888) 555-7890',
    profileUrl: 'https://example.com/emilybrown',
  },
  {
    username: 'michael_clark',
    password: 'michael456',
    recoveryEmail: 'michael.clark@example.com',
    name: 'Michael Clark',
    dob: '1987-07-15',
    gender: 'Male',
    mobileNo: '+1 (333) 444-5678',
    profileUrl: 'https://example.com/michaelclark',
  },
  {
    username: 'susan_davis',
    password: 'susan123',
    recoveryEmail: 'susan.davis@example.com',
    name: 'Susan Davis',
    dob: '1991-09-02',
    gender: 'Female',
    mobileNo: '+1 (222) 789-1234',
    profileUrl: 'https://example.com/susandavis',
  },
  {
    username: 'kevin_miller',
    password: 'kevin789',
    recoveryEmail: 'kevin.miller@example.com',
    name: 'Kevin Miller',
    dob: '1986-11-20',
    gender: 'Male',
    mobileNo: '+1 (111) 987-6543',
    profileUrl: 'https://example.com/kevinmiller',
  },
  {
    username: 'linda_anderson',
    password: 'linda123',
    recoveryEmail: 'linda.anderson@example.com',
    name: 'Linda Anderson',
    dob: '1993-04-18',
    gender: 'Female',
    mobileNo: '+1 (444) 123-7890',
    profileUrl: 'https://example.com/lindaanderson',
  },
  {
    username: 'david_wilson',
    password: 'david456',
    recoveryEmail: 'david.wilson@example.com',
    name: 'David Wilson',
    dob: '1989-08-25',
    gender: 'Male',
    mobileNo: '+1 (555) 789-4567',
    profileUrl: 'https://example.com/davidwilson',
  },
  // Add 10 more account objects as needed
];

function App() {
  return (
    <div className="App">
      <AddAccount />
      <QuestionAnswerForm />
      <AccountsTable accounts={exampleAccounts}/>
      <LoginForm />
    </div>
  );
}

export default App;
