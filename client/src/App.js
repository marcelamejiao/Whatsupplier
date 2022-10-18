import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import Home from './pages/Home';
// import MaterialsList from './pages/MaterialsList'
// import SingleMaterial from './pages/OneMaterial'
// import SuppliersList from './pages/SuppliersList';
// import SingleSupplier from './pages/OneSupplier';
// import Production from './pages/Production'
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <div>
            <Routes>
              <Route
                path='/'
                element={<LandingPage />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
              {/* <Route
                path="/me"
                element={<Home />}
              />
              <Route
                path="/inventory"
                element={<MaterialsList />}
              />
              <Route
                path="/inventory/:materialId"
                element={<SingleMaterial />}
              />
              <Route
                path="/production"
                element={<Production />}
              />
              <Route
                path="/suppliers"
                element={<SuppliersList />}
              />
              <Route
                path="/suppliers/:supplierId"
                element={<SingleSupplier />}
              /> */}
              <Route
                path='*'
                element={<h1 className='display-2'>Wrong page!</h1>}
              />
            </Routes>
          </div>

          <Footer />
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
