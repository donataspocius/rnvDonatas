import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";

import {
  MovieDetailsScreenRouteProp,
  RootStackParamList,
} from "../types/screenTypes";
import {
  selectContentFavoriteMovies,
  addToFavorites,
  removeFromFavorites,
} from "../state/content/contentSlice";
import { AppDispatch } from "../state/store";
import Button from "../components/Button";
import useFetchData from "../utils/customHooks";
import { selectUserId } from "../state/auth/authSlice";
import { GlobalStyles, API } from "../constants/constants";
import { MovieDetailsProps, MovieCardProps } from "../types/dataTypes";
import SimilarMoviesByGenre from "../components/SimilarMoviesByGenre";

const mockVideoUrl =
  "https://imdb-video.media-imdb.com/vi212714009/1434659607842-pgv4ql-1650547759492.mp4?Expires=1692086716&Signature=IYL~-8Uk3Cly6Vxe-Uqzyd6X09v0NfaFzMhF1RdK~-LABKcliZFmznJocUeIXEYrlESh93aAA02pUgUvpN1hdLHd21SBFPHQDV33x8f8KkBmWKT0D0aQARE0GljQ47LG-N5mGeiARxPW-ztIwUCdwJTj-zmyb9xif3BVJjkm-FYH516VE0Jxz0CqSXQk0TOAm4Svm8nmhRhq4975nRv9Nwt3G1JTeJ6pncx3kdB~9KrinpRL14c4CuktuqsgL1ljIGd0A52aS6Fm8JRyGeh0UT35yEh6VXGIt~NjQyQoV3bZacoreC4Ka6~Wb22s0u8AD~DHdm7ilzo-if6oqa~QWA__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA";

interface MovieRouteProps {
  route: MovieDetailsScreenRouteProp;
  navigation: StackNavigationProp<RootStackParamList, "MovieDetails">;
}

const MovieDetails = ({ route, navigation }: MovieRouteProps) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetailsProps>();

  const { movieId } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const favoriteMovies = useSelector(selectContentFavoriteMovies);
  const userId = useSelector(selectUserId);

  const {
    duration,
    genre,
    id,
    posterUrl,
    rating,
    summary,
    title,
    videoUrl,
    year,
  } = movieDetails ?? {};

  // fetching movie details data by movieId
  const { data, isLoading, error } = useFetchData(
    API.getMovieDetailsById(movieId)
  );

  // setting movieData to state
  useEffect(() => {
    if (data) {
      setMovieDetails(data.data[0]);
    }
  }, [data]);

  const isInFavorites = favoriteMovies.some((movie) => movie.id === id);

  // setting Header title
  useEffect(() => {
    if (movieDetails) {
      navigation.setOptions({ title: movieDetails.title });
    }
  }, [movieDetails, navigation]);

  const handlePlayMovie = () => {
    if (!mockVideoUrl) return;
    navigation.navigate("MovieTrailer", {
      // videoUrl
      mockVideoUrl,
      trailerName: `${title} trailer`,
    });
  };

  const handleFavorites = () => {
    const movieData: MovieCardProps = {
      id: movieId,
      posterUrl: posterUrl as string,
      title: title as string,
    };

    if (!userId) {
      navigation.navigate("AuthStack");
    } else {
      isInFavorites
        ? dispatch(removeFromFavorites(movieData))
        : dispatch(addToFavorites(movieData));
    }
  };

  return (
    <View>
      {isLoading && (
        <ActivityIndicator size={"large"} color={GlobalStyles.colors.primary} />
      )}
      {movieDetails && (
        <ScrollView style={styles.movieDetailsContainer}>
          <View style={styles.imgContainer}>
            <Image
              source={{
                uri: posterUrl,
              }}
              style={styles.img}
            />
          </View>
          <View>
            <Text style={[styles.titleTextH3, styles.marginBottom15]}>
              {title}
            </Text>
            <View style={styles.statsContainer}>
              <Text
                style={styles.text}
              >{`\u2605 ${rating}  |  ${duration}  |  ${year}`}</Text>
            </View>
            <View style={styles.hrContainer}>
              <View style={styles.hr}></View>
            </View>
            <View>
              <Text style={[styles.text, styles.genresContainer]}>
                {genre!.join(" | ")}
              </Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={[styles.titleTextH4, styles.marginBottom5]}>
                Story Line
              </Text>
              <Text style={[styles.text, styles.decriptionText]}>
                {summary}
              </Text>
            </View>
            <View style={styles.btnContainer}>
              <Button onPress={handlePlayMovie} style={styles.button}>
                {!mockVideoUrl ? "No Trailer" : "Watch Trailer"}
              </Button>
              <Button onPress={handleFavorites} style={styles.button}>
                {isInFavorites
                  ? "Remove from ❤️"
                  : userId
                  ? "Add to ❤️"
                  : "Login to Add to ❤️"}
              </Button>
            </View>
            <SimilarMoviesByGenre
              genre={genre![0]}
              navigation={navigation}
              movieId={movieId}
            />
          </View>
        </ScrollView>
      )}
      {error && <Text>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  movieDetailsContainer: {
    paddingHorizontal: 20,
  },
  imgContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
  },
  img: { width: 350, height: 430, borderRadius: 20 },
  titleTextH3: {
    fontSize: 21,
    color: GlobalStyles.colors.mainText,
    textAlign: "center",
    fontWeight: "500",
  },
  titleTextH4: {
    fontSize: 15,
    color: GlobalStyles.colors.mainText,
    fontWeight: "500",
  },
  marginBottom15: {
    marginBottom: 15,
  },
  marginBottom5: {
    marginBottom: 5,
  },
  text: {
    fontSize: 15,
    color: GlobalStyles.colors.greyText,
  },
  descriptionContainer: {
    marginBottom: 30,
  },
  decriptionText: {
    textAlign: "justify",
  },
  statsContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 15,
  },
  hrContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: 15,
  },
  hr: {
    height: 1,
    width: "60%",
    backgroundColor: GlobalStyles.colors.primary,
  },

  genresContainer: {
    textAlign: "center",
    marginBottom: 20,
  },
  genreItem: {
    marginRight: 5,
  },

  btnContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    gap: 30,
    marginBottom: 20,
  },
  button: {
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary,
    backgroundColor: "transparent",
  },
});

export default MovieDetails;
