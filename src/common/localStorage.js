import AsyncStorage from '@react-native-async-storage/async-storage';

// Save data to AsyncStorage
export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log('✅ Data saved successfully!');
  } catch (e) {
    console.error('❌ Error saving data', e);
  }
};

// Get data from AsyncStorage
export const getData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('❌ Error reading data', e);
  }
};

// Remove data from AsyncStorage
export const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('✅ Data removed successfully!');
  } catch (e) {
    console.error('❌ Error removing data', e);
  }
};