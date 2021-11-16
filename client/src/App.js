import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Pet from './pages/Pet';
import EditPet from './pages/EditPet';
import AddPet from './pages/AddPet';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
const httpLink = createUploadLink({ 
  uri: 'http://localhost:3001/graphql',
  // uri: '/graphql'
});
const authLink = setContext((_, { headers } ) => {
  const token = localStorage.getItem('id_token');

  return {headers: {
    ...headers,
    authorization: token ? `Bearer ${token}` : ''
  }}
})
const client = new ApolloClient({
  // request: operation => {
  //   const token = localStorage.getItem('id_token');

  //   operation.setContext({
  //     headers: {
  //       authorization: token ? `Bearer ${token}` : ''
  //     }
  //   });
  // },
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  // // development
  // uri: 'http://localhost:3001/graphql'
  // // production
  // // uri: 'https://my-pets-raymondlopez13.herokuapp.com//graphql'
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
              <Route exact path='/add-pet' component={AddPet} />
              <Route exact path='/:name' component={Pet} />
              <Route exact path='/:name/edit' component={EditPet} />
              
            </Switch>

      </Router>
    </ApolloProvider>
  );
}

export default App;
