import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';


export default function Home() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Watchlist',
          headerTitleAlign: 'center', // Center the title horizontally
      }} />
      <View style={styles.container} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
