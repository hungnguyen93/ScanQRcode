import {
    NavigationState,
    PartialState,
    StackActions,
    TabActions,
    CommonActions,
    NavigationContainerEventMap,
  } from '@react-navigation/native';
  import {createNavigationContainerRef} from '@react-navigation/native';
  import {
    PrivateStackParamList,
    PublicStackParamList,
    RootStackParamList,
  } from '../navigation/types';
  export const navigationRef = createNavigationContainerRef<RootStackParamList>();
  class NavigationServices {
    currentScreen: string = '';
    pushTo = (routeName: string, params: object): void => {
      if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.push(routeName, params));
      }
    };
    
    pop = (): void => {
      if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.pop());
      }
    };
  
    navigate = (
      routeName: keyof RootStackParamList | keyof PublicStackParamList | keyof PrivateStackParamList,
      params?: any,
    ): void => {
      if (navigationRef.isReady()) {
        navigationRef.navigate(routeName, params);
      }
    };
  
    jumpTo = (routeName: string, params?: object): void => {
      if (navigationRef.isReady()) {
        const tabActions = TabActions.jumpTo(routeName, params);
        navigationRef.dispatch(tabActions);
      }
    };
  
    back = (): void => {
      if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.goBack());
      }
    };
  
    popToTop = () => {
      if (navigationRef.isReady()) {
        const popToTopAction = StackActions.popToTop();
        navigationRef.dispatch(popToTopAction);
      }
    };
  
    replace = (routeName: string, params?: object) => {
      if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.replace(routeName, params));
      }
    };
  
    reset = (routeName: string, params?: object, index?: number) => {
      if (navigationRef.isReady()) {
        navigationRef.dispatch(
          CommonActions.reset({
            index: index || 0,
            routes: [{name: routeName, params}],
          }),
        );
      }
    };
  
    setParam = (params: object, route: string) => {
      if (navigationRef.isReady()) {
        if (route) {
          navigationRef.dispatch({
            ...CommonActions.setParams(params),
            source: route,
          });
        } else navigationRef.dispatch(CommonActions.setParams(params));
      }
    };
  
    getActiveRouteName(
      navigationState: NavigationState | PartialState<NavigationState>,
    ): string {
      const route = navigationState.routes[navigationState.index || 0];
      // dive into nested navigators
      if (route.state) {
        return this.getActiveRouteName(route.state);
      }
      return route.name;
    }
  
    handleNavigationStateChange(state?: NavigationState): void {
      if (!state) {
        return;
      }
  
      const currentScreen = this.getActiveRouteName(state);
      this.currentScreen = currentScreen;
    }
  
    getParam = (route: any, key: string, defaultValue?: any) => {
      // const route = get(props, 'route');
      try {
        if (route) {
          const param = route.params[key];
          if (param) return param;
          return defaultValue;
        } else {
          return defaultValue;
        }
      } catch (error) {
        return defaultValue;
      }
    };
  
    addNavigationEventListener = (
      eventName: keyof NavigationContainerEventMap,
      action: () => void,
    ) => {
      navigationRef.addListener(eventName, action);
    };
    removeNavigationEventListener = (
      eventName: keyof NavigationContainerEventMap,
      action: () => void,
    ) => {
      navigationRef.removeListener(eventName, action);
    };
  }
  const navigationServices = new NavigationServices();
  export {navigationServices};
  