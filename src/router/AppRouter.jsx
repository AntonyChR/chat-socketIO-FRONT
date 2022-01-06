import {useContext, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import { ChatPage } from '../pages/ChatPage';
import AuthRouter from './AuthRouter';
import '../css/loading.css';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
const AppRouter = () => {

    const { auth, verificateToken } = useContext(AuthContext);

    useEffect(()=>{
        verificateToken(); 
    },[verificateToken])

    if(auth.checking){
        return (
            <h1>Loading...</h1>
        ) 
    }

    return (
        <Router>
            <div>
                <Switch>
                    {/* <Route path='/auth' component={AuthRouter}/> */}
                    {/* <Route exact path='/' component={ChatPage} /> */}
                    <PublicRoute isAuthenticated={auth.logged} path='/auth' component={AuthRouter}/>
                    <PrivateRoute isAuthenticated={auth.logged} path='/' component={ChatPage}/>

                    <Redirect to='/' />
                </Switch>
            </div>
        </Router>
    );
};

export default AppRouter;
