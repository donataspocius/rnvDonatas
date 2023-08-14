import React, {useState} from 'react';
import {TextInput, TextInputProps} from 'react-native';

import {GlobalStyles} from '../constants/constants';

const Input: React.FC<TextInputProps> = ({...otherProps}) => {
  const [focused, setFocused] = useState<boolean>(false);
  return (
    <TextInput
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholderTextColor={'black'}
      style={[
        {
          fontSize: 14,
          padding: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: 10,
          marginVertical: 10,
          borderColor: '#c2c2c2',
          borderWidth: 3,
        },
        focused && {
          borderColor: GlobalStyles.colors.primary,
          borderWidth: 3,
          shadowOffset: {width: 4, height: 10},
          shadowColor: '#1f41bb',
          shadowOpacity: 0.2,
          shadowRadius: 10,
        },
      ]}
      {...otherProps}
    />
  );
};

export default Input;
