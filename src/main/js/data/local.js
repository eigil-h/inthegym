import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_ID_KEY = '@user_id_key';

export const getUserId = async () => {
  try {
    return await AsyncStorage.getItem(USER_ID_KEY);
  } catch (e) {
    return null;
  }
};

export const setUserId = async (userId) => {
  try {
    await AsyncStorage.setItem(USER_ID_KEY, userId);
    // eslint-disable-next-line no-empty
  } catch (e) {
  }
};
