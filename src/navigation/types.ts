import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export const RootStack = createNativeStackNavigator<RootStackParamList>();
export const PrivateStack = createNativeStackNavigator<PrivateStackParamList>();
export const PublicStack = createNativeStackNavigator<PublicStackParamList>();

export type PublicStackParamList = {
  login: undefined;
};

export type PublicStackScreenProps<T extends keyof PublicStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<PublicStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type PrivateStackParamList = {
  home: undefined;
};

export type PrivateStackScreenProps<T extends keyof PrivateStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<PrivateStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type RootStackParamList = {
  public: NavigatorScreenParams<PublicStackParamList>;
  private: NavigatorScreenParams<PrivateStackParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
