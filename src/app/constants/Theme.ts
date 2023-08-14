import {GlobalStyles} from './constants';
import {DefaultTheme} from '@react-navigation/native';

export const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: GlobalStyles.colors.mainBackground ?? '',
    text: GlobalStyles.colors.mainText ?? '',
  },
};
