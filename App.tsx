import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Camera, CameraType} from 'react-native-camera-kit';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import AppNavigator from '~navigation/AppNavigator';
import { localServices } from '~services/local-services';
import { appModel } from '~view-models/app-view-models';

type typeObjText = {
  name?: string;
  numCCCD?: string;
  gender?: string;
  birthday?: string;
  address?: string;
  createDate?: string;
};
type TDataInput = {
  title: string;
  value: keyof typeObjText;
};
const data = {a: 1, b: 2};
console.log(data['a']);
const dataInput: TDataInput[] = [
  {title: 'Số CCCD', value: 'numCCCD'},
  {title: 'Họ và tên', value: 'name'},
  {title: 'Giới tính', value: 'gender'},
  {title: 'Năm sinh', value: 'birthday'},
  {title: 'Nơi thường trú', value: 'address'},
  {title: 'Ngày cấp', value: 'createDate'},
];

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    flex: 1,
    padding: 20,
  };

  useEffect(() => {
    const initData = async () => {
      await localServices.load();
      if (localServices.token.refreshToken) {
        appModel.authenticate.setIsAuthenticated(true);
      }
    };
    initData();
  });

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <AppNavigator />

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  viewText: {flexDirection: 'row', alignItems: 'center'},
  line: {
    height: 10,
  },
  text: {
    width: 100,
  },
  input: {
    paddingVertical: 2,
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  button: {
    padding: 20,
    paddingVertical: 15,
    backgroundColor: 'gray',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    flex: 1,
  },
  viewButton: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  textButton: {
    fontSize: 16,
    color: 'white',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    width: 100,
  },
  titleShow: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
    width: 100,
  },
  containerCard: {
    borderWidth: 1,
    borderColor: '#A3A5AE',
    borderRadius: 10,
    padding: 5,
  },
  body: {flex: 1},
});

export default App;
