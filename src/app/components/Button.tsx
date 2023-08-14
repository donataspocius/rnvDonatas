import {
  View,
  Pressable,
  Text,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';
import {GlobalStyles} from '../constants/constants';

interface ButtonProps {
  children: string;
  style?: StyleProp<ViewStyle>;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

const Button = ({onPress, style, children, disabled}: ButtonProps) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => pressed && styles.pressed}
        disabled={disabled}>
        <View style={styles.button}>
          <Text style={styles.text}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 9,
    minWidth: '45%',
    alignItems: 'center',
  },
  pressed: {
    borderRadius: 7,
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primaryLight,
  },
  text: {
    color: GlobalStyles.colors.mainText,
    fontWeight: '500',
    fontSize: 16,
  },
});

export default Button;
