import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');

  const user = {
    name: 'Sanouwar Alam',
    email: 'sanouwar@example.com',
    image: 'https://i.pravatar.cc/150?img=12',
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    // 💡 Apply theme globally with context or state manager like Redux
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'English' ? 'Hindi' : 'English'));
    // 💡 You could hook into i18n or a translation library here
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image source={{ uri: user.image }} style={styles.avatar} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProfile')}>
            <Icon name="edit" size={18} color="#4A90E2" />
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Settings */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionRow} onPress={toggleLanguage}>
            <Icon name="language" size={22} color="#4A90E2" />
            <Text style={styles.actionText}>Language: {language}</Text>
          </TouchableOpacity>

          <View style={styles.actionRow}>
            <Icon name="dark-mode" size={22} color="#4A90E2" />
            <Text style={styles.actionText}>Dark Mode</Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Switch value={isDarkMode} onValueChange={toggleTheme} />
            </View>
          </View>

          <View style={styles.actionRow}>
            <Icon name="info" size={22} color="#4A90E2" />
            <Text style={styles.actionText}>App Version: 1.0.0</Text>
          </View>

          <TouchableOpacity style={[styles.actionRow, styles.logoutRow]}>
            <Icon name="logout" size={22} color="#EF4444" />
            <Text style={[styles.actionText, { color: '#EF4444' }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4A90E2',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  email: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 10,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#4A90E2',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  editText: {
    color: '#4A90E2',
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  actionContainer: {
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1,
  },
  logoutRow: {
    borderBottomWidth: 0,
    marginTop: 10,
  },
  actionText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#374151',
    fontWeight: '500',
  },
});
