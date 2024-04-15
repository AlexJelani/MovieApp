import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, ActivityIndicator, Image, Pressable } from "react-native";

import { fetchMovie } from '../api/movies';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { addMovieToWatchlist } from "../api/watchlist";

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
  const {mutate} = useMutation({
    mutationFn: () => addMovieToWatchlist(id)

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
      <View>
        <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }} onPress={() => mutate()}>>
          <FontAwesome name="bookmark-o" size={24} color="black" />
          <Text>Add to watchlist</Text>
        </Pressable>
      </View>
      <Text style={{ fontSize: 16, fontWeight: '400' }}>{movie.overview}</Text>

    </View>
  );
};

export default MovieDetails;

