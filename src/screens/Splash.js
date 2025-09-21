import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';

const Splash = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); //  Splash ke baad Home Screen
    }, 3000); // 3 secound delay

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* App Logo */}
      <Image
        source={require('../assets/logo.jpg')} 
        style={styles.logo}
        resizeMode="contain"
      />
     
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8aa9f1ff', // 👈 Background Color
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  appName: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
});
