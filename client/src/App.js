import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  // development
  uri: 'http://localhost:3001/graphql'
  // production
  // uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
          <Nav/>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/user' component={Profile} />
              <Route exact path='/signup' component={Signup} />
            </Switch>

      </Router>
    </ApolloProvider>
  );
}

export default App;
