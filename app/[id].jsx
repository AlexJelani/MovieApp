import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Image, Pressable } from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { fetchMovie } from '../api/movies';
import { addMovieToWatchList } from '../api/watchlist';

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const client = useQueryClient();

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movies', id],
    queryFn: () => fetchMovie(id),
  });

  const { mutate } = useMutation({
    mutationFn: () => addMovieToWatchList(id),
    onSuccess: async () => {
      await client.invalidateQueries(['watchlist']);
    },
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch data</Text>;
  }

  return (
    <View>
      <Image
        source={{
          uri: 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path,
        }}
        style={{ width: '100%', height: 300 }}
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 30, fontWeight: '500', marginVertical: 10 }}>
          {movie.title}
        </Text>
        <View style={{ marginVertical: 10 }}>
          <Pressable
            onPress={() => mutate()}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
          >
            <FontAwesome name="bookmark-o" size={24} color="black" />
            <Text>Add to watchlist</Text>
          </Pressable>
        </View>
        <Text style={{ fontSize: 16 }}>{movie.overview}</Text>
      </View>
    </View>
  );
};

export default MovieDetails;
