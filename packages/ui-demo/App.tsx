import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Box} from "@ferns/ui";

export default function App() {
  console.log("APP", Box)
  return (
    <Box alignItems="center" justifyContent="center" height="100%">
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </Box>  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
