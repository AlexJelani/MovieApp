import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, ActivityIndicator, Image } from "react-native";

import { fetchMovie } from '../api/movies';

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovie(id),
  });

  if (isLoading) {
    return <ActivityIndicator/>;
  }
  if (error) {
    return <Text>Failed to fetch data</Text>;
  }
  return (
    <View>
      <Image
        source={{ uri: 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path }}
        style={{ width: '100%', height: 300 }}
      />
      <Text style={{ fontSize: 24, fontWeight: '500', marginVertical: 10 }}>{movie.title}</Text>
      <Text style={{ fontSize: 16, fontWeight: '400' }}>{movie.overview}</Text>

    </View>
  );
};

export default MovieDetails;

