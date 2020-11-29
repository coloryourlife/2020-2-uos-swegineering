import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SignIn } from './Components/auth/SignIn';
import {OrderMenu} from './Components/customer/OrderMenu';
import { SignUp } from './Components/auth/SignUp'
import {OrderDone} from './Components/customer/OrderDone'
import {ManageOrder} from './Components/staff/ManageOrder';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <SignIn/>
          </Route>
          <Route path='/signup'>
            <SignUp/>
          </Route>
          <Route path='/order'>
            <OrderMenu />
          </Route>
          <Route path='/orderDone'>
            <OrderDone />
          </Route>
          <Route path='/manageOrder'>
            <ManageOrder />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
