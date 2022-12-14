import { ThemeProvider } from 'styled-components';
import GlobalStyles from './components/styles/Global';
import React from 'react';
import 'react-notifications/lib/notifications.css';
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
import Home from './pages/Home';
import MaterialsList from './pages/MaterialsList'
import PlaceOrder from './pages/PlaceOrder';
import SingleMaterial from './pages/SingleMaterial'
import SuppliersList from './pages/SuppliersList';
import SingleSupplier from './pages/SingleSupplier';
import Production from './pages/Production'
import SendMaterialToProduction from './pages/SendMaterialToProduction';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SuccessfulPayment from './pages/SuccessfulPayment';


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

const theme = {
  colors: {
    body: '#ffff',
    footer: '#569ec2'
  },
  mobile: '768px',
}
function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Router>
          <>
            <GlobalStyles />
            <Navbar />
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
                <Route
                  path="/home"
                  element={<Home />}
                />
                <Route
                 path="/success"
                 element={<SuccessfulPayment />}
                />
                <Route
                  path="/inventory"
                  element={<MaterialsList />}
                />
                <Route
                  path="/inventory/:materialId/place-order"
                  element={<PlaceOrder />}
                />
                <Route
                  path="/inventory/:materialId"
                  element={<SingleMaterial />}
                />
                <Route
                  path="/materials/:materialId/send-to-production"
                  element={<SendMaterialToProduction />}
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
                />
                <Route
                  path='*'
                  element={<h1 className='display-2'>Wrong page!</h1>}
                />
              </Routes>
            <Footer />
          </>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
