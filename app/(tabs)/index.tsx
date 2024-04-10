import { Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';


export default function Home() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Movies',
          headerTitleAlign: 'center', // Center the title horizontally
      }} />
      <View style={styles.container}>
        <Text />
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
