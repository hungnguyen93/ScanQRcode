import HomeScreen from '~modules/home/HomeScreen';
import {PrivateStack} from '~navigation/types';

const PrivateRoutes = () => {
  return (
    <PrivateStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <PrivateStack.Screen component={HomeScreen} name="home" />
    </PrivateStack.Navigator>
  );
};

export default PrivateRoutes;
