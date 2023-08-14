import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  selectContentFavoriteMovies,
  selectContentStatus,
  selectContentError,
  fetchFavoriteMovies,
} from '../state/content/contentSlice';
import MovieCard from '../components/MovieCard';
import {GlobalStyles} from '../constants/constants';
import {selectUserId} from '../state/auth/authSlice';
import {RootStackParamList} from '../types/screenTypes';
import HeaderLogout from '../components/HeaderLogout';

interface LibraryProps {
  navigation: StackNavigationProp<RootStackParamList, 'Library'>;
}

const Library = ({navigation}: LibraryProps) => {
  const userId = useSelector(selectUserId);

  const dispatch = useDispatch();
  const status = useSelector(selectContentStatus);
  const error = useSelector(selectContentError);
  const userFavoriteMovies = useSelector(selectContentFavoriteMovies);

  // setting custom header for Library
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerShadowVisible: false,
      headerTitleAlign: 'center',
      headerTitle: 'Favorite Movies',
      headerStyle: {
        backgroundColor: GlobalStyles.colors.mainBackground,
      },
      headerTintColor: GlobalStyles.colors.mainText,
      headerRight: () =>
        userId ? <HeaderLogout navigation={navigation} /> : null,
    });
  }, [navigation, userId]);

  // dispatching action with genres list
  useEffect(() => {
    dispatch(fetchFavoriteMovies(userId) as any);
  }, [userId, dispatch]);

  return (
    <View style={styles.cardContainer}>
      {error && <Text style={styles.text}>{error}</Text>}
      <View style={styles.moviesContainer}>
        {userFavoriteMovies.length ? (
          <FlatList
            data={userFavoriteMovies}
            renderItem={({item}) => (
              <MovieCard
                item={item}
                navigation={navigation}
                navigationType="navigate"
              />
            )}
            numColumns={2}
          />
        ) : (
          <Text style={styles.text}>No favorite movies yet!</Text>
        )}
      </View>
      {status === 'loading' && (
        <ActivityIndicator size={'large'} color={GlobalStyles.colors.primary} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  titleContainer: {
    marginTop: StatusBar.currentHeight,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  moviesContainer: {
    flex: 7,
  },

  title: {
    fontSize: 21,
    color: GlobalStyles.colors.mainText,
    textAlign: 'center',
    marginVertical: 30,
  },
  text: {
    fontSize: 17,
    color: GlobalStyles.colors.primary,
    textAlign: 'center',
  },
});

export default Library;
