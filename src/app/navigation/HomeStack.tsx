import React from 'react';
import {useSelector} from 'react-redux';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import {GlobalStyles} from '../constants/constants';
import {selectUserId} from '../state/auth/authSlice';
import HeaderLogout from '../components/HeaderLogout';
import {Browse, MovieDetails, MovieTrailer, Home} from '../screens';
import {RootStackParamList} from '../types/screenTypes';

const Stack = createStackNavigator();

interface HomeStackProps {
  navigation: StackNavigationProp<RootStackParamList, 'HomeStack'>;
}

const HomeStack = ({navigation}: HomeStackProps) => {
  const userId = useSelector(selectUserId);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: GlobalStyles.colors.mainBackground,
        },
        headerTintColor: GlobalStyles.colors.mainText,
        headerTitleStyle: {
          fontWeight: '500',
          fontSize: 21,
        },
        headerTitleAlign: 'center',
        headerRight: () =>
          userId ? <HeaderLogout navigation={navigation} /> : null,
      }}>
      <Stack.Screen
        name="Home"
        component={userId ? Browse : Home}
        options={{headerShown: !!userId}}
      />
      <Stack.Screen name="Browse" component={Browse} />
      <Stack.Screen name="MovieDetails" component={MovieDetails as any} />
      <Stack.Screen name="MovieTrailer" component={MovieTrailer as any} />
    </Stack.Navigator>
  );
};

export default HomeStack;
