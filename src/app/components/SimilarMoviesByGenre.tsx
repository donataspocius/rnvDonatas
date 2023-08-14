import React from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../types/screenTypes';
import useFetchData from '../utils/customHooks';
import {API} from '../constants/constants';
import MovieCard from './MovieCard';
import {GlobalStyles} from '../constants/constants';
import {MovieCardProps} from '../types/dataTypes';

interface SimilarMoviesByGenre {
  genre: string;
  movieId: string;
  navigation: StackNavigationProp<RootStackParamList, 'MovieDetails'>;
}

const SimilarMoviesByGenre = ({
  genre,
  navigation,
  movieId,
}: SimilarMoviesByGenre) => {
  const {data, isLoading, error} = useFetchData(API.getMoviesByGenre(genre));
  const moviesByGenre = data?.data.data.filter(
    // filtering out current movie
    (movie: MovieCardProps) => movie.id !== movieId,
  );

  return (
    <>
      {isLoading && (
        <ActivityIndicator size={'large'} color={GlobalStyles.colors.primary} />
      )}
      <ScrollView>
        <Text style={styles.titleTextH4}>Similar Movies</Text>
        <FlatList
          horizontal
          data={moviesByGenre}
          renderItem={({item}) => (
            <MovieCard item={item} navigation={navigation} />
          )}
        />
      </ScrollView>
      {error && <Text>{error}</Text>}
    </>
  );
};

export default SimilarMoviesByGenre;

const styles = StyleSheet.create({
  titleTextH4: {
    fontSize: 15,
    color: GlobalStyles.colors.mainText,
    fontWeight: '500',
  },
});
