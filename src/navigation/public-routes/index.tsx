import LoginScreen from '~modules/authen/LoginScreen';
import {PublicStack} from '~navigation/types';

const PublicRoutes = () => {
  return (
    <PublicStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <PublicStack.Screen component={LoginScreen} name="login" />
    </PublicStack.Navigator>
  );
};

export default PublicRoutes;
