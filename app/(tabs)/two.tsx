import { useInfiniteQuery } from "@tanstack/react-query";
import { Stack } from 'expo-router';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';

import MovieListItem from '../../components/MovieListItem';

import { fetchWatchListMovies } from '~/api/watchlist';

export default function Home() {
  // @ts-ignore
  // @ts-ignore
  const {
    data,
    isLoading,
    error,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: ['watchlist'],
    queryFn: fetchWatchListMovies,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => pages.length + 1,
  });


  if (isLoading) {
    return <ActivityIndicator/>;
  }
  if (error) {
    return <Text>{error.message}</Text>;
  }
  const movies = data?.pages?.flat();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'MoviesList',
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
          onEndReached={() => {
            fetchNextPage();
          }}
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
