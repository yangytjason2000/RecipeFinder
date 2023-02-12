import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [counter, setCounter] = useState(0);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <button onClick={() => setCounter(counter + 1)}>You clicked {counter} times</button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
