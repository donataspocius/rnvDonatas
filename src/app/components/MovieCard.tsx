import React from 'react';
import {useSelector} from 'react-redux';
import {Text, View, StyleSheet, Image, Pressable} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  RootStackParamList,
  MovieDetailsScreenRouteProp,
} from './../types/screenTypes';
import {MovieCardProps} from '../types/dataTypes';
import {GlobalStyles} from '../constants/constants';
import {selectContentFavoriteMovies} from '../state/content/contentSlice';
interface MovieCardInfoProps {
  item: MovieCardProps;
  navigation: StackNavigationProp<
    RootStackParamList,
    'MovieDetails' | 'Library'
  >;
  navigationType?: 'navigate' | 'push';
  route?: MovieDetailsScreenRouteProp;
}

const MovieCard = ({
  item,
  navigation,
  navigationType = 'push',
}: MovieCardInfoProps) => {
  const favoriteMovies = useSelector(selectContentFavoriteMovies);
  const handleCardPress = () => {
    navigationType === 'push'
      ? navigation.push('MovieDetails', {
          movieId: String(item.id),
          isInFavorites,
        })
      : navigation.navigate('MovieDetails', {
          movieId: String(item.id),
          isInFavorites,
        });
  };

  // const isInFavorites = favoriteMovies.includes(item.id);
  const isInFavorites = favoriteMovies.some(movie => movie.id === item.id);

  return (
    <Pressable style={styles.movieCardContainer} onPress={handleCardPress}>
      <View style={styles.imgContainer}>
        <Image source={{uri: item.posterUrl}} style={styles.img} />
        {isInFavorites && (
          <View style={styles.icon}>
            <Icon
              name={'heart'}
              size={35}
              color={GlobalStyles.colors.primary}
            />
          </View>
        )}
      </View>
      <View>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  movieCardContainer: {
    flex: 1,
    margin: 10,
  },
  title: {
    fontSize: 15,
    color: GlobalStyles.colors.mainText,
    marginTop: 10,
    textAlign: 'center',
    width: 150,
  },
  imgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 161,
  },
  img: {
    width: 161,
    height: 230,
    borderRadius: 20,
  },
  icon: {
    position: 'relative',
    top: -90,
    right: 45,
  },
});

export default MovieCard;
