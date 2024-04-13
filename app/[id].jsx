import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, ActivityIndicator } from "react-native";

import { fetchMovie } from '../api/movies';

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data, isLoading, error } = useQuery({
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
      <Text style={{ fontSize: 24, fontWeight: '500' }}>{data.title}</Text>
    </View>
  );
};

export default MovieDetails;
