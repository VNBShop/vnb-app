import React, {useState} from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Image,
  TextInputProps,
} from 'react-native';
import {eyeHide, eyeView} from '../../assets';

type Props = {
  style: StyleProp<ViewStyle>;
};

type InputPasswordProps = Props & TextInputProps;

const InputPassword = ({style, ...props}: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const [isfocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        secureTextEntry={!showPassword}
        style={style}
      />
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => setShowPassword(prev => !prev)}>
        {isfocus ? (
          showPassword ? (
            <Image source={eyeView} style={styles.icon} />
          ) : (
            <Image source={eyeHide} style={styles.icon} />
          )
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  iconContainer: {
    padding: 8,
    position: 'absolute',
    right: 8,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default InputPassword;
