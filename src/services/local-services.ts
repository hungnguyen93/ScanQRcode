import AsyncStorage from '@react-native-async-storage/async-storage';

export type TypeToken = {
  accessToken: string;
  refreshToken: string;
};
class LocalServices {
  token: TypeToken = {
    accessToken: '',
    refreshToken: '',
  };

  get settingKey(): string {
    return 'app_name';
  }

  private save = async () => {
    let jsonString = '';
    jsonString = JSON.stringify(this);
    await AsyncStorage.setItem(this.settingKey, jsonString);
  };

  public load = async () => {
    const jsonString = await AsyncStorage.getItem(this.settingKey);
    const jsonObject = jsonString ? JSON.parse(jsonString) : '';
    Object.assign(this, jsonObject);
  };

  saveToken = async (token: TypeToken) => {
    this.token = token;
    await this.save();
  };

  clearToken = async () => {
    this.token = {
      accessToken: '',
      refreshToken: '',
    };
    await this.save();
  };
}

const instance = new LocalServices();
export {instance as localServices};

// class LocalData {
//   isShowBannerInHome: boolean = true;

//   closeBanderInHome = () => {
//     this.isShowBannerInHome = false;
//   };
// }

// const instanceData = new LocalData();
// export {instanceData as localData};

// async function LocalServices() {
//   const token: TypeToken = {
//     accessToken: '',
//     refreshToken: '',
//   };
//   const settingKey = (key: string = 'app_name') => {
//     return key;
//   };
//   const jsonString = await AsyncStorage.getItem(settingKey());
//   const jsonObject = jsonString ? JSON.parse(jsonString) : {};

//   const save = () => {
//     AsyncStorage.setItem(settingKey(), JSON.stringify(jsonObject));
//   };

//   const storage = {
//     get() {
//       return jsonObject[settingKey()];
//     },
//     set(value: string) {
//       jsonObject[settingKey()] = value;
//       save();
//     },
//     remove() {
//       delete jsonObject[settingKey()];
//       save();
//     },
//   };

//   return storage;
// }
// const instanceData = LocalServices();
// export {instanceData as localData};
