import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>MovieDetail: {id}</Text>
    </View>
  );
}

export default MovieDetails ;
