import React from 'react';
import { Platform } from 'react-native';
import useInAppUpdate from '../../hooks/useInAppUpdate';
import UpdateModal from './UpdateModal';

const InAppUpdateWrapper = ({ children }) => {
  const {
    updateAvailable,
    showModal,
    setShowModal,
    startImmediateUpdate,
    startFlexibleUpdate,
  } = useInAppUpdate();

  const handleUpdate = async () => {
    setShowModal(false);
    await startImmediateUpdate();
  };

  const handleLater = () => {
    setShowModal(false);
  };

  return (
    <>
      {children}
      {Platform.OS === 'android' && (
        <UpdateModal
          visible={showModal}
          onUpdate={handleUpdate}
          onLater={handleLater}
          isForceUpdate={false}
        />
      )}
    </>
  );
};

export default InAppUpdateWrapper;
