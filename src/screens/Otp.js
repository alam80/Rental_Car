import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState, useRef } from 'react';

const Otp = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '']); // 4-digit OTP
  const inputs = useRef([]); // Input refs

  const handleOtpChange = (text, index) => {
    if (text.length > 1) return; // Only allow 1 digit per box
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      // 👉 Focus next input
      inputs.current[index + 1].focus();
    }
    if (!text && index > 0) {
      // 👈 Focus previous input on backspace
      inputs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 4) {
      alert('Please enter the complete 4-digit OTP');
    } else {
      console.log(`OTP Verified: ${enteredOtp}`);
      // ✅ Navigate to MainTabs screen
      navigation.replace('MainTabs'); // 👈 Replace to prevent going back to OTP
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* 🖼️ Logo */}
      <Image
        source={require('../assets/logo.jpg')}
        style={styles.logo}
      />

      {/* 📝 Title */}
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>We’ve sent a 4-digit code to your mobile</Text>

      {/* 🔢 OTP Boxes */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpBox}
            value={digit}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => handleOtpChange(text, index)}
            ref={(ref) => (inputs.current[index] = ref)}
          />
        ))}
      </View>

      {/* ✅ Verify Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Verify OTP</Text>
      </TouchableOpacity>

      {/* 🔄 Resend Code */}
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn’t receive OTP? </Text>
        <TouchableOpacity>
          <Text style={styles.resendLink}>Resend Code</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Otp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 25,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginBottom: 30,
  },
  otpBox: {
    width: 50,
    height: 55,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#fff',
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  resendText: {
    color: '#555',
  },
  resendLink: {
    color: '#4A90E2',
    fontWeight: '600',
  },
});
