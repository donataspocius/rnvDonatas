import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import {GlobalStyles} from '../constants/constants';
import {Library} from '../screens';
import {myTheme} from '../constants/Theme';
import HomeStack from './HomeStack';
import AuthStack from './AuthStack';
import {useSelector} from 'react-redux';
import {selectUserId} from '../state/auth/authSlice';
import UserProfile from '../screens/AuthStack/UserProfile';

const Tab = createBottomTabNavigator();

const MainTab = () => {
  const userId = useSelector(selectUserId);

  return (
    <NavigationContainer theme={myTheme}>
      <Tab.Navigator
        initialRouteName="HomeStack"
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: GlobalStyles.colors.primary,
          tabBarInactiveTintColor: GlobalStyles.colors.mainText,
          tabBarStyle: {
            backgroundColor: GlobalStyles.colors.mainBackground,
            borderTopColor: GlobalStyles.colors.mainBackground,
          },
        }}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarIcon: ({focused, color}) => (
              <Icon
                name={focused ? 'home' : 'home-outline'}
                size={25}
                color={color}
              />
            ),
          }}></Tab.Screen>
        {userId ? (
          <Tab.Screen
            name="Library"
            component={Library}
            options={{
              tabBarIcon: ({focused, color}) => (
                <Icon
                  name={focused ? 'heart' : 'heart-outline'}
                  size={27}
                  color={color}
                />
              ),
            }}></Tab.Screen>
        ) : null}
        <Tab.Screen
          name="AuthStack"
          component={userId ? UserProfile : AuthStack}
          options={{
            tabBarIcon: ({focused, color}) => (
              <Icon
                name={focused ? 'person' : 'person-outline'}
                size={25}
                color={color}
              />
            ),
          }}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainTab;
