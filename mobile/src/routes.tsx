import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// Navegação stack --> Em pilha.
// As telas anteriores não deixam de existir ao passar para a próxima
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Points from './pages/Points';
import Detail from './pages/Detail';

// o AppStack fica responsável pelo roteamento da nossa aplicacao
const AppStack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator 
                headerMode="none" 
                screenOptions={
                    {
                        cardStyle:{
                            backgroundColor: '#f0f0f5'
                        }
                    }
                }
                >
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Points" component={Points} />
                <AppStack.Screen name="Detail" component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;