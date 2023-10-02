import React, {useEffect} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
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
import {observer} from 'mobx-react-lite';
import {useViewModel} from '~utils/hook';
import {HomeModel, TObjText} from './home-model';
import Loading from '~components/loadings/Loading';
import {ICCCD} from '~models/cccd';
import moment from 'moment';
import { Camera, CameraType } from 'react-native-camera-kit';

type TDataInput = {
  title: string;
  value: keyof TObjText;
};

const dataInput: TDataInput[] = [
  {title: 'Số CCCD', value: 'no'},
  {title: 'Họ và tên', value: 'name'},
  {title: 'Giới tính', value: 'gender'},
  {title: 'Năm sinh', value: 'birthday'},
  {title: 'Nơi thường trú', value: 'address'},
  {title: 'Ngày cấp', value: 'issuedDate'},
];

const HomeScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const homeViewModel = useViewModel(HomeModel);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    flex: 1,
    padding: 20,
  };

  const ItemSeparatorComponent = () => {
    return <View style={styles.line} />;
  };

  const CardComponent = (data: ICCCD | TObjText, show: boolean = true) => {
    return (
      <View style={[styles.containerCard]}>
        {dataInput.map((item, index) => (
          <View key={item.value} style={styles.viewText}>
            <Text style={show ? styles.titleShow : styles.title}>
              {item.title}:
            </Text>
            <TextInput
              multiline={index === 4}
              editable={show}
              onChangeText={text =>
                homeViewModel.onChangeText(text, item.value)
              }
              style={styles.input}
              placeholder={item.title}
              value={data[item.value]}
            />
          </View>
        ))}
      </View>
    );
  };

  const renderItems = ({item}: ListRenderItemInfo<ICCCD>) => {
    return CardComponent(item, false);
  };
  const keyExtractor = (item: ICCCD) => `${item.id}`;

  useEffect(() => {
    homeViewModel.getListCCCD(1);

  
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.body}>
        {CardComponent(homeViewModel.objText)}
        <View style={styles.viewButton}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              homeViewModel.setOpenScan(true);
            }}>
            <Text style={styles.textButton}>Quét QR</Text>
          </TouchableOpacity>
          {
            <TouchableOpacity
              style={[styles.button, {backgroundColor: '#248BB0'}]}
              onPress={homeViewModel.createCCCD}>
              <Text style={styles.textButton}>Tạo mới</Text>
            </TouchableOpacity>
          }
        </View>
        <FlatList
          data={homeViewModel.data.items}
          renderItem={renderItems}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      </View>
      {homeViewModel.openScan ? (
        <>
        
          <Camera
            style={StyleSheet.absoluteFill}
            cameraType={CameraType.Back} // front/back(default)
            flashMode="auto"
            scanBarcode={true}
            onReadCode={homeViewModel.handleQR} // optional
            showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
            laserColor="transparent" // (default red) optional, color of laser in scanner frame
            frameColor="white" // (default white) optional, color of border of scanner frame
          />

          <TouchableOpacity
            onPress={() => homeViewModel.setOpenScan(false)}
            style={{position: 'absolute', left: 20, top: 20}}>
            <Text>Go back</Text>
          </TouchableOpacity>
        </>
      ) : null}
      <Loading isVisible={homeViewModel.isLoading} />
    </SafeAreaView>
  );
};

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

export default observer(HomeScreen);
