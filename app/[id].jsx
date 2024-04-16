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
  const [isBookmarked, setIsBookmarked] = useState(false); // State to manage bookmark status

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovie(id),
  });

  const { mutate } = useMutation({
    mutationFn: () => addMovieToWatchList(id),
    onSuccess: () => {
      client.invalidateQueries(['watchlist']);
      setIsBookmarked(true); // Update bookmark status on successful mutation
    },
    onError: (error) => {
      console.error('Error adding movie to watchlist:', error);
      // Optionally, you can show an error message to the user
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
        source={{ uri: 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path }}
        style={{ width: '100%', height: 300 }}
      />
      <Text style={{ fontSize: 24, fontWeight: '500', marginVertical: 10 }}>{movie.title}</Text>
      <View style={{ marginVertical: 10 }}>
        <Pressable
          style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
          onPress={() => {
            mutate();
          }}>
          <FontAwesome
            name={isBookmarked ? 'bookmark' : 'bookmark-o'} // Change icon based on bookmark status
            size={24}
            color={isBookmarked ? 'red' : 'black'} // Change color based on bookmark status
          />
          <Text>Add to watchlist</Text>
        </Pressable>
      </View>
      <Text style={{ fontSize: 16, fontWeight: '400' }}>{movie.overview}</Text>
    </View>
  );
};

export default MovieDetails;
