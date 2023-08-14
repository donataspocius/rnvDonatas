import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SectionList,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {
  fetchMoviesByGenres,
  selectContentError,
  selectContentStatus,
  selectContentMoviesByGenre,
  updateMoviesByGenreList,
} from '../state/content/contentSlice';
import {AppDispatch} from '../state/store';
import useFetchData from '../utils/customHooks';
import MovieCard from '../components/MovieCard';
import {API, GlobalStyles} from '../constants/constants';

const Browse = () => {
  const [genres, setGenres] = useState<Array<string>>([]);
  const [currentPageByGenre, setCurrentPageByGenre] = useState<{
    [key: string]: number;
  }>({});

  const navigation = useNavigation<any>(); // solve this
  const dispatch = useDispatch<AppDispatch>();

  const status = useSelector(selectContentStatus);
  const error = useSelector(selectContentError);
  const moviesByGenre = useSelector(selectContentMoviesByGenre);

  // getting genres list from API
  const {data: genresData} = useFetchData(API.getGenresList);

  useEffect(() => {
    if (genresData) {
      const genresList = genresData.data;
      setGenres([...genresList, 'All Movies']);

      // Initialize the currentPageByGenre state object with all genres set to 2 (because 1 is already loaded initially)
      const initialCurrentPageByGenre: {[key: string]: number} = {};
      genresList.forEach((genre: string) => {
        initialCurrentPageByGenre[genre] = 2;
      });

      initialCurrentPageByGenre['All Movies'] = 2;

      setCurrentPageByGenre(initialCurrentPageByGenre);
    }
  }, [genresData]);

  // dispatching action with genres list
  useEffect(() => {
    dispatch(fetchMoviesByGenres(genres));
  }, [genres, dispatch]);

  const loadMoreData = async (sectionTitle: string) => {
    // current page by active genre
    const currentPage = currentPageByGenre[sectionTitle];

    let response;
    let newMovies;
    let totalPages;

    try {
      // fetching data
      if (sectionTitle === 'All Movies') {
        response = await axios.get(API.getAllMovies(currentPage, 15));
      } else {
        response = await axios.get(
          API.getMoviesByGenre(sectionTitle, currentPage),
        );
      }

      if (response.data) {
        newMovies = await response.data.data.data;
        totalPages = await response.data.data.totalPages;

        if (currentPage > totalPages) {
          return;
        }

        // Update the current page state for the specific genre
        setCurrentPageByGenre(prevState => ({
          ...prevState,
          [sectionTitle]: currentPage + 1,
        }));

        dispatch(updateMoviesByGenreList({title: sectionTitle, newMovies}));
      } else {
        return;
      }
    } catch (error) {
      console.error('Error fetching more data:', error);
    }
  };
  return (
    <View>
      {status === 'loading' ? (
        <ActivityIndicator size={'large'} color={GlobalStyles.colors.primary} />
      ) : (
        <View>
          {moviesByGenre && (
            <SectionList
              contentContainerStyle={{paddingHorizontal: 10}}
              sections={moviesByGenre}
              showsHorizontalScrollIndicator={false}
              renderSectionHeader={({section}) => (
                <>
                  <Text style={styles.title}>{section.title}</Text>
                  <FlatList
                    horizontal
                    data={section.data}
                    renderItem={({item}) => (
                      <MovieCard item={item} navigation={navigation} />
                    )}
                    onEndReached={() => loadMoreData(section.title)}
                    onEndReachedThreshold={0.5}
                  />
                </>
              )}
              renderItem={({item, section}) => {
                return null;
              }}
            />
          )}
        </View>
      )}
      {error && <Text>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 21,
    fontWeight: '500',
    color: GlobalStyles.colors.mainText,
    marginBottom: 10,
  },
  movieContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
    width: 150,
    height: 200,
  },
  movie: {
    width: 120,
    height: 160,
    backgroundColor: '#ccc',
    padding: 5,
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  cont: {
    width: 1000,
    height: 70,
    margin: 10,
    backgroundColor: 'green',
  },
});

export default Browse;
