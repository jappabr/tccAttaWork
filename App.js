import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/home/index';
import { Roleta } from './screens/Roleta/index';

import { setUser } from './utils/user'

import Profile from './screens/profile/index';
import Formac from './screens/profile/formac/index';
import Xp from './screens/profile/xp/index';
import ProfileConfig from './screens/profile/config/index';
import Competencia from './screens/profile/Competencia/index';

import Login from './screens/login/index'
import Cadastro from './screens/cadastro/index1'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

const AppStack = () =>{
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="LoginStack"
        component={AuthStack}
        options={{headerShown:false}}
      />
      <HomeStack.Screen
        name="TabStack"
        component={TabNavigator}
        options={{headerShown:false}}
      />
    </HomeStack.Navigator>
  )
}

const AuthStack = () => {
  return(
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <LoginStack.Screen
        name="Cadastro"
        component={Cadastro}
        options={{headerShown: false}}
      />
    </LoginStack.Navigator>
  )
};
const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="profileConfig"
        component={ProfileConfig}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="profileFormac"
        component={Formac}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="profileXp"
        component={Xp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="profileCompetencia"
        component={Competencia}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {backgroundColor: 'white'},
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: '#0066cc',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: 'white',
          },
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Cards"
        component={Roleta}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="cards-playing" color={color} size={size} />
            ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = route => {
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  // console.log(routeName);

  if( routeName == 'GameDetails' ) {
    return 'none';
  }
  return 'flex';
};

function App() {
  return (
    <NavigationContainer>
      <AppStack/>
    </NavigationContainer>
  );
}



export default App;