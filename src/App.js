import { Redirect, Switch, Route } from 'react-router-dom';
import s from './App.module.scss'
import Teacher from './components/router/Teacher';
import LogIn from './components/Login/LogIn';
import Student from './components/router/Student';

const App=()=> {
  return (
    <div className={s.AppContainer}>
      <Redirect to={'/login'}/>
      <Switch>
          <Route path={'/login'} component={LogIn}/>
          <Route path={'/teacherPage'} component={Teacher}/>
          <Route path={'/studentPage'} component={Student}/>
      </Switch>
    </div>
  );
}

export default App;