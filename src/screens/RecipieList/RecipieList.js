import React, { useState, useCallback, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import RecipieListStyle from './RecipieListStyle';

import YoutubePlayer from 'react-native-youtube-iframe';

const RecipieList = props => {
  console.log('Props got in recipielist', props);

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  return (
    <SafeAreaView style={RecipieListStyle.container}>
      <ScrollView>
        {/* <YoutubePlayer
        height={300}
        play={playing}
        videoId={"CjpR9UbiF0E"}
        onChangeState={onStateChange}
      /> */}

        {props.route.params.list.map((item, index) => {
          console.log('ITEM ', item);

          return (
            <YoutubePlayer
              key={index}
              height={300}
              play={playing}
              videoId={item}
              onChangeState={onStateChange}
            />
          );
        })}

        {/* <TouchableOpacity   title={playing ? "pause" : "play"} onPress={togglePlaying} >
        <Text>Button</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecipieList;
