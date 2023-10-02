import {appModel} from '~view-models/app-view-models';
import {RootStack} from './types';
import {observer} from 'mobx-react-lite';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '~services/navigation-service';
import PrivateRoutes from './private-routes';
import PublicRoutes from './public-routes';

const AppNavigator = () => {
  const isAuthenticated = appModel.authenticate.isAuthenticated;
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isAuthenticated ? (
          <RootStack.Screen name={'private'} component={PrivateRoutes} />
        ) : (
          <RootStack.Screen name={'public'} component={PublicRoutes} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default observer(AppNavigator);
