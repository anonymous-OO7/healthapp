import { useEffect, useState, useCallback } from 'react';
import { Platform, Alert } from 'react-native';
import SpInAppUpdates, { IAUUpdateKind } from 'sp-react-native-in-app-updates';

const inAppUpdates = new SpInAppUpdates(false);

const useInAppUpdate = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const checkUpdate = useCallback(async () => {
    try {
      const result = await inAppUpdates.checkNeedsUpdate();
      if (result.shouldUpdate) {
        setUpdateAvailable(true);
        setShowModal(true);
      }
    } catch (error) {
      console.log('Update check error:', error);
    }
  }, []);

  const startImmediateUpdate = useCallback(async () => {
    try {
      await inAppUpdates.startUpdate({
        updateType: IAUUpdateKind.IMMEDIATE,
      });
    } catch (error) {
      console.log('Immediate update error:', error);
    }
  }, []);

  const startFlexibleUpdate = useCallback(async () => {
    try {
      await inAppUpdates.startUpdate({
        updateType: IAUUpdateKind.FLEXIBLE,
      });
    } catch (error) {
      console.log('Flexible update error:', error);
    }
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      checkUpdate();
    }
  }, [checkUpdate]);

  useEffect(() => {
    const subscription = inAppUpdates.addStatusUpdateListener(status => {
      if (status.status === 5) {
        inAppUpdates.installUpdate();
      }
    });

    return () => {
      subscription?.remove?.();
    };
  }, []);

  return {
    updateAvailable,
    showModal,
    setShowModal,
    checkUpdate,
    startImmediateUpdate,
    startFlexibleUpdate,
  };
};

export default useInAppUpdate;
