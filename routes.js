import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';


import Home from './views/home';
import Encuesta from './views/encuesta';
import Menu from './views/menu';
import Sincro from './views/sincro';

const Stack = createStackNavigator({
    Home:{screen:Home},
    Encuesta: { screen: Encuesta },
    Menu: { screen: Menu },
    Sincro: { screen: Sincro }
},{initialRouteName:'Home',headerMode:'none'});

const App = createAppContainer(Stack);
export default App;