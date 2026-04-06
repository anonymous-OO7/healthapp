import * as React from 'react';
import { ToastAndroid } from 'react-native';
import { ToastOptions, ToastType } from 'react-native-toast-message';
import Toast from 'react-native-toast-message';

interface Options extends Omit<ToastOptions, 'type' | 'text1' | 'text2'> {
  type?: ToastType;
  text1?: string;
  text2?: string;
}

export default function useToast() {
  const showCustomToast = React.useCallback(
    (message: string, options?: Options) => {
      return Toast.show({
        type: options?.type ?? 'success',
        text1: options?.text1 ?? 'Hello',
        text2: options?.text2 ?? message,
      });
    },
    [],
  );

  return { showCustomToast };
}

export const showToast = (message: string) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};
