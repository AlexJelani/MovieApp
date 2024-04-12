import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';

import MovieListItem from '../../components/MovieListItem';

import { fetchTopRatedMovies } from '~/api/movies';

export default function Home() {
  const {
    data: movies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movies'],
    queryFn: fetchTopRatedMovies,
  });


  if (isLoading) {
    return <ActivityIndicator/>;
  }
  if (error) {
    return <Text>{error.message}</Text>;
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Movies',
          headerTitleAlign: 'center', // Center the title horizontally
        }}
      />

      <View style={styles.container}>
        <FlatList
          data={movies}
          numColumns={2}
          contentContainerStyle={{ gap: 5 }}
          columnWrapperStyle={{ gap: 5 }}
          renderItem={({ item }) => <MovieListItem movie={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
