import Video from 'react-native-video';
import {View, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useState, useEffect} from 'react';

import {MovieTrailerScreenRouteProp} from '../types/screenTypes';
import {RootStackParamList} from '../types/screenTypes';

interface MovieTrailerProps {
  route: MovieTrailerScreenRouteProp;
  navigation: StackNavigationProp<RootStackParamList, 'MovieTrailer'>;
}

const MovieTrailer = ({route, navigation}: MovieTrailerProps) => {
  const {mockVideoUrl, trailerName} = route.params;

  const [playing, setPlaying] = useState(true);

  const onEnd = useCallback(() => {
    setPlaying(false);
  }, []);

  useEffect(() => {
    if (trailerName) {
      navigation.setOptions({title: trailerName});
    }
  }, [trailerName, navigation]);

  return (
    <View>
      <Video
        source={{
          uri: mockVideoUrl,
        }}
        paused={!playing}
        controls={true}
        playWhenInactive={true}
        resizeMode="cover"
        onEnd={onEnd}
        style={styles.video}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 300,
  },
});

export default MovieTrailer;
