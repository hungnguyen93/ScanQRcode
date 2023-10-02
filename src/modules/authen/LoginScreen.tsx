import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Container} from '~components';
import {useViewModel} from '~utils/hook';
import {SignInModel} from './sigin-model';
import Loading from '~components/loadings/Loading';

const LoginScreen = () => {
  const {changeTextPass, changeTextUser, isLoading, handleLogin} =
    useViewModel(SignInModel);

  return (
    <Container>
      <View style={styles.body}>
        <TextInput
          onChangeText={changeTextUser}
          placeholder="Username"
          style={styles.textInput}
        />
        <TextInput
          onChangeText={changeTextPass}
          placeholder="Password"
          style={styles.textInput}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.btnSubmit}>
          <Text style={styles.textLogin}>Login</Text>
        </TouchableOpacity>
      </View>
      <Loading isVisible={isLoading} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  btnSubmit: {
    marginTop: 16,
    paddingVertical: 8,
    backgroundColor: 'blue',
    alignItems: 'center',
    borderRadius: 8,
  },
  textInput: {
    padding: 8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 8,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: '40%',
  },
  textLogin: {
    fontSize: 20,
    color: 'white',
  },
});

export default LoginScreen;
