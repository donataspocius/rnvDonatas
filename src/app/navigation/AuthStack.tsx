import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {GlobalStyles} from '../constants/constants';
import AuthScreen from '../screens/AuthStack/AuthScreen';
import {useSelector} from 'react-redux';
import {selectUserId} from '../state/auth/authSlice';
import UserProfile from '../screens/AuthStack/UserProfile';

const Stack = createStackNavigator();

const AuthStack = () => {
  const userId = useSelector(selectUserId);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: GlobalStyles.colors.mainText,
        headerTitleStyle: {
          fontWeight: '500',
          fontSize: 21,
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
};

export default AuthStack;
