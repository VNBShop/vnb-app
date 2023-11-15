/* eslint-disable react/react-in-jsx-scope */
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewProps,
} from 'react-native';
import {
  CodeField,
  Cursor,
  MaskSymbol,
  isLastFilledCell,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {color} from '../UIkit/palette';
import {common} from '../UIkit/styles';

export type InputOtpRefProps = {
  value: string;
  setErrorMessage: (message: string) => void;
  focus: () => void;
  clear: () => void;
};

export type InputOtpProps = {
  isSecurity?: boolean;
  onSubmit: (params: unknown) => void;
  errorMessage?: string;
  numOfCell?: number;
  autoSubmit?: boolean;
} & ViewProps;

const {width: DEVICE_WIDTH} = Dimensions.get('window');

export const InputOtp = forwardRef<InputOtpRefProps, InputOtpProps>(
  (
    {
      isSecurity = false,
      onSubmit,
      errorMessage = '',
      numOfCell = 6,
      autoSubmit = true,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<TextInput | any>();

    const [value, setValue] = useState('');
    const [error, setError] = useState(errorMessage);
    const [codeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });

    const onCheckOTP = (text: string) => {
      setValue(text.replace(/[^0-9]/g, ''));
    };

    useImperativeHandle(ref, () => ({
      value,
      setErrorMessage: (message: string) => {
        setError(message);
      },
      focus: () => {
        inputRef.current?.focus();
      },
      clear: () => {
        setValue('');
      },
    }));

    useEffect(() => {
      if (value.length === numOfCell && autoSubmit) {
        onSubmit?.(value);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
      <>
        <CodeField
          ref={inputRef}
          {...props}
          {...codeFieldProps}
          value={value}
          caretHidden={false}
          onChangeText={onCheckOTP}
          cellCount={numOfCell}
          rootStyle={
            numOfCell === 4 && {paddingHorizontal: DEVICE_WIDTH / 6 - 8}
          }
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoFocus
          renderCell={({index, symbol, isFocused}) => (
            <View
              key={index}
              style={[styles.cell, isFocused && {borderColor: color.secondary}]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol ? (
                <Text style={[styles.center, common.text_base]}>
                  {isSecurity ? (
                    <MaskSymbol
                      maskSymbol="•"
                      isLastFilledCell={isLastFilledCell({index, value})}>
                      {symbol}
                    </MaskSymbol>
                  ) : (
                    symbol
                  )}
                </Text>
              ) : isFocused ? (
                <Text style={styles.center}>
                  <Cursor cursorSymbol="|" />
                </Text>
              ) : (
                <Text style={styles.center}>-</Text>
              )}
            </View>
          )}
        />
        <Text>{error}</Text>
      </>
    );
  },
);

const styles = StyleSheet.create({
  cell: {
    width: (DEVICE_WIDTH - 20 * 2) / 6 - 8,
    height: (DEVICE_WIDTH - 20 * 2) / 6 - 8,
    borderWidth: 0.5,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: color.border_input,
  },
  center: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
