import { useEffect } from 'react';
import { Platform } from 'react-native';
import SpInAppUpdates, { IAUUpdateKind } from 'sp-react-native-in-app-updates';

const inAppUpdates = new SpInAppUpdates(false);

const useSimpleInAppUpdate = () => {
  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }

    const checkAndUpdate = async () => {
      try {
        const result = await inAppUpdates.checkNeedsUpdate();

        if (result.shouldUpdate) {
          await inAppUpdates.startUpdate({
            updateType: IAUUpdateKind.IMMEDIATE,
          });
        }
      } catch (error) {
        console.log('In-app update error:', error);
      }
    };

    checkAndUpdate();

    const subscription = inAppUpdates.addStatusUpdateListener(status => {
      if (status.status === 5) {
        inAppUpdates.installUpdate();
      }
    });

    return () => {
      subscription?.remove?.();
    };
  }, []);
};

export default useSimpleInAppUpdate;
