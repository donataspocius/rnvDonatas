import { RouteProp } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Browse: undefined;
  Library: undefined;
  AuthStack: undefined;
  HomeStack: undefined;
  HeaderLogout: undefined;
  MovieDetails: { movieId: string; isInFavorites: Boolean };
  MovieTrailer: { mockVideoUrl: string; trailerName: string };
};

// HOME SCREEN
export type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;

// BROWSE SCREEN
export type BrowseScreenRouteProp = RouteProp<RootStackParamList, "Browse">;

// MOVIE DETAILS SCREEN
export type MovieDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  "MovieDetails"
> & {
  state?: {
    routes: {
      name: string;
      params?: any;
    }[];
    index: number;
  };
};
export type MovieDetailsScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  "MovieDetails"
> & {
  setOptions: any;
};

// MOVIE TRAILER SCREEN
export type MovieTrailerScreenRouteProp = RouteProp<
  RootStackParamList,
  "MovieTrailer"
>;
