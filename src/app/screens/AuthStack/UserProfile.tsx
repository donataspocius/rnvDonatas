import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, Text, View, Image} from 'react-native';

import {
  selectContentFavoriteMovies,
  setUserFavorites,
} from '../../state/content/contentSlice';
import {GlobalStyles} from '../../constants/constants';
import Button from '../../components/Button';
import {logoutUser} from '../../utils/authFunctions';
import {updateUserId} from '../../state/auth/authSlice';

const UserProfile = () => {
  const dispatch = useDispatch();

  //   acquiring user data
  const userFavorites = useSelector(selectContentFavoriteMovies);
  const lastMovieSaved =
    userFavorites[userFavorites.length - 1]?.title || 'No movies yet';

  const handleLogout = () => {
    logoutUser();
    dispatch(updateUserId(''));
    dispatch(setUserFavorites([]));
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/avatar.png')}
        alt="profile photo"
        style={styles.img}
        resizeMode="contain"
      />

      <Text style={styles.title}>User Profile</Text>
      <View>
        <Text style={styles.text}>Favorite movies: {userFavorites.length}</Text>
        <Text style={styles.text}>Last movie saved: {lastMovieSaved}</Text>
      </View>
      <Button style={styles.button} onPress={handleLogout}>
        LOGOUT
      </Button>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 21,
    fontWeight: '500',
    color: GlobalStyles.colors.mainText,
    marginBottom: 50,
  },
  text: {
    fontSize: 17,
    color: GlobalStyles.colors.mainText,
    marginBottom: 10,
  },
  button: {
    backgroundColor: GlobalStyles.colors.primary,
    borderRadius: 7,
    marginTop: 50,
  },
});
