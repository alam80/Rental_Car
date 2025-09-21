// Import necessary components & libraries
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/FontAwesome6';
import CountryPicker from 'react-native-country-picker-modal';
// import GoogleSVG from '../assets/google.svg';

const Login = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('IN'); // Default India
  const [callingCode, setCallingCode] = useState('91'); // Default +91
  const [visible, setVisible] = useState(false); // Modal visibility

  // Handle Mobile Login
  const handleMobileLogin = () => {
    if (phone.length < 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
    } else {
      navigation.navigate('Otp', { phone: `+${callingCode}${phone}` });
    }
  };

  // Google Login
  const handleGoogleLogin = () => {
    Alert.alert('Google Login', 'Google login clicked');
  };

  // Facebook Login
  const handleFacebookLogin = () => {
    Alert.alert('Facebook Login', 'Facebook login clicked');
  };

  return (
    <LinearGradient
      colors={['#43cea2', '#185a9d']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* App Logo */}
      <Image
        source={require('../assets/logo.jpg')} // Replace with your app logo path
        style={styles.logo}
      />

      

      {/* Country Code + Phone Number */}
      <View style={styles.phoneRow}>
        <TouchableOpacity
          style={styles.countryPicker}
          onPress={() => setVisible(true)}
        >
          <CountryPicker
            withFilter
            withFlag
            withCallingCode
            withEmoji
            visible={visible}
            countryCode={countryCode}
            onSelect={(country) => {
              setCountryCode(country.cca2);
              setCallingCode(country.callingCode[0]);
              setVisible(false);
            }}
            onClose={() => setVisible(false)}
          />
          <Text style={styles.callingCode}>+{callingCode}</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          placeholderTextColor="#9ca3af"
          keyboardType="phone-pad"
          onChangeText={setPhone}
          value={phone}
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.mobileButton} onPress={handleMobileLogin}>
        <Text style={styles.mobileButtonText}>Continue</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.divider} />
      </View>

      {/* Circular Social Buttons */}
      <View style={styles.socialButtonsRow}>
        <TouchableOpacity
          style={[styles.circleButton, { backgroundColor: '#DB4437' }]}
          onPress={handleGoogleLogin}
        >
          <Icons name="google" size={30} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.circleButton, { backgroundColor: '#4267B2' }]}
          onPress={handleFacebookLogin}
        >
          <Icon name="facebook" size={40} color="#fff" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    marginBottom: 40,
    borderRadius: 20,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 6,
  },
  subText: {
    fontSize: 16,
    color: '#e5e7eb',
    textAlign: 'center',
    marginBottom: 25,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
  },
  countryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f3f4f6',
  },
  callingCode: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  mobileButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  mobileButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#fff',
    fontSize: 14,
  },
  socialButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  circleButton: {
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
});
