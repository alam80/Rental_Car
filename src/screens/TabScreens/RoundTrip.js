import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  TextInput,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

const RoundTrip = ({ navigation }) => {
  const [selectedTrip, setSelectedTrip] = useState('roundtrip');
  const [pickupCity, setPickupCity] = useState('');
  const [dropCity, setDropCity] = useState('');
  const [pickupDate, setPickupDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [pickupTime, setPickupTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState({ type: '', visible: false });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSelectedTrip('roundtrip');
    });
    return unsubscribe;
  }, [navigation]);

  const handleChangeDate = (event, selectedDate) => {
    setShowPicker({ type: '', visible: false });
    if (selectedDate) {
      if (showPicker.type === 'pickupDate') setPickupDate(selectedDate);
      if (showPicker.type === 'returnDate') setReturnDate(selectedDate);
    }
  };

  const handleChangeTime = (event, selectedTime) => {
    setShowPicker({ type: '', visible: false });
    if (selectedTime && showPicker.type === 'pickupTime') {
      setPickupTime(selectedTime);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          {/* <TouchableOpacity>
            <Icon name="account-circle" size={28} color="#4A90E2" />
          </TouchableOpacity> */}
          <Text style={styles.headerTitle}>Round Trip</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Form Box */}
        <View style={styles.inputBox}>
          {/* Trip Type Toggle */}
          <View style={styles.tripTypeContainer}>
            <TouchableOpacity
              style={[
                styles.tripButton,
                selectedTrip === 'oneway'
                  ? styles.tripButtonActive
                  : styles.tripButtonInactive,
              ]}
              onPress={() => {
                setSelectedTrip('oneway');
                navigation.navigate('OneWay');
              }}
            >
              <Text
                style={[
                  styles.tripButtonText,
                  selectedTrip === 'oneway'
                    ? styles.tripButtonTextActive
                    : styles.tripButtonTextInactive,
                ]}
              >
                ONE WAY
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tripButton,
                selectedTrip === 'roundtrip'
                  ? styles.tripButtonActive
                  : styles.tripButtonInactive,
              ]}
              onPress={() => setSelectedTrip('roundtrip')}
            >
              <Text
                style={[
                  styles.tripButtonText,
                  selectedTrip === 'roundtrip'
                    ? styles.tripButtonTextActive
                    : styles.tripButtonTextInactive,
                ]}
              >
                ROUND TRIP
              </Text>
            </TouchableOpacity>
          </View>

          {/* Pickup City */}
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>FROM</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Enter Pickup City"
              placeholderTextColor="#9ca3af"
              value={pickupCity}
              onChangeText={setPickupCity}
            />
          </View>

          {/* Drop City */}
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>TO</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Enter Drop City"
              placeholderTextColor="#9ca3af"
              value={dropCity}
              onChangeText={setDropCity}
            />
          </View>

          {/* Pickup Date */}
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>PICK UP</Text>
            <TouchableOpacity
              style={styles.dateTimeField}
              onPress={() => setShowPicker({ type: 'pickupDate', visible: true })}
            >
              <Text style={styles.dateTimeText}>
                {pickupDate.toDateString()}
              </Text>
              <Icon name="calendar-today" size={20} color="#4A90E2" />
            </TouchableOpacity>
          </View>

          {/* Return Date */}
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>RETURN</Text>
            <TouchableOpacity
              style={styles.dateTimeField}
              onPress={() => setShowPicker({ type: 'returnDate', visible: true })}
            >
              <Text style={styles.dateTimeText}>
                {returnDate.toDateString()}
              </Text>
              <Icon name="calendar-today" size={20} color="#4A90E2" />
            </TouchableOpacity>
          </View>

          {/* Pickup Time */}
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>PICK UP AT</Text>
            <TouchableOpacity
              style={styles.dateTimeField}
              onPress={() => setShowPicker({ type: 'pickupTime', visible: true })}
            >
              <Text style={styles.dateTimeText}>
                {pickupTime.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
              <Icon name="schedule" size={20} color="#4A90E2" />
            </TouchableOpacity>
          </View>

          {/* Search Cabs */}
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>EXPLORE CABS</Text>
          </TouchableOpacity>
        </View>

        {/* DateTime Picker */}
        {showPicker.visible && (
          <DateTimePicker
            value={
              showPicker.type.includes('Date')
                ? showPicker.type === 'pickupDate'
                  ? pickupDate
                  : returnDate
                : pickupTime
            }
            mode={showPicker.type.includes('Date') ? 'date' : 'time'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={
              showPicker.type.includes('Date')
                ? handleChangeDate
                : handleChangeTime
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default RoundTrip;

// Styles remain the same (no change needed)



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4A90E2',
  },
  inputBox: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 10,
  },
  tripTypeContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#4A90E2',
    marginBottom: 15,
  },
  tripButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
  },
  tripButtonActive: {
    backgroundColor: '#4A90E2',
  },
  tripButtonInactive: {
    backgroundColor: '#ffffff',
  },
  tripButtonText: {
    fontSize: 14,
    fontWeight: '400',
  },
  tripButtonTextActive: {
    color: '#ffffff',
  },
  tripButtonTextInactive: {
    
    color: '#4A90E2',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputLabel: {
    width: 100,
    fontSize: 15,
    fontWeight:500,
    color: '#2e2c2cff',
  },
  inputField: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 4,
    fontSize: 12,
    color: '#333',
  },
  dateTimeField: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 4,
  },
  dateTimeText: {
    fontSize: 12,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 9,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
