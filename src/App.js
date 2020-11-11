import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SignIn } from './Components/auth/SignIn';
import { SignUp } from './Components/auth/SignUp';
import {OrderMenu} from './Components/customer/OrderMenu';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <SignIn/>
          </Route>
          <Route path='/signup'>
            <SignUp/>
          </Route>
          <Route path='/order/:order_id'>
            <OrderMenu />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
