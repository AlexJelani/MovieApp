import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import { useQuery } from "@tanstack/react-query";
import { fetchMovie} from "../api/movies";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

    const{} = useQuery({
      fetchKey: ["movie", id],
      queryFn: () => fetchMovie(id),
    })
  return (
    <View>
      <Text>MovieDetail: {id}</Text>
    </View>
  );
}

export default MovieDetails ;
