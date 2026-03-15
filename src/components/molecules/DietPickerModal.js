import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Colors } from '../../assets/colors';

const Theme = {
  background: '#FAFAFA',
  white: '#FFFFFF',
  textMain: '#1A1A1A',
  textSecondary: '#8E8E93',
  primary: Colors.primary || '#FF6B35',
  divider: '#EFEFEF',
  shadow: '#000',
  green: '#4CAF50',
  red: '#E53935',
};

const DietPickerModal = ({
  isVisible,
  onClose,
  onSelect,
  currentFilter,
  t,
}) => {
  const options = [
    { key: 'all', label: t('filters.all'), color: '#999' },
    { key: 'veg', label: t('filters.veg'), color: '#4CAF50' },
    { key: 'non-veg', label: t('filters.nonVeg'), color: '#E53935' },
  ];

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalContentCenter}>
          <Text style={styles.modalTitle}>{t('filters.selectDiet')}</Text>
          {options.map(opt => (
            <TouchableOpacity
              key={opt.key}
              style={styles.dietOptionItem}
              onPress={() => {
                onSelect(opt.key);
                onClose();
              }}
            >
              <View
                style={[styles.dietOptionDot, { backgroundColor: opt.color }]}
              />
              <Text
                style={[
                  styles.dietOptionText,
                  currentFilter === opt.key && {
                    fontWeight: '700',
                    color: opt.color,
                  },
                ]}
              >
                {opt.label}
              </Text>
              {currentFilter === opt.key && (
                <Text style={{ marginLeft: 'auto', color: opt.color }}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
export default DietPickerModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentBottom: {
    width: '100%',
    backgroundColor: Theme.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingBottom: 40,
    position: 'absolute',
    bottom: 0,
  },
  modalContentCenter: {
    width: '80%',
    backgroundColor: Theme.white,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    color: Theme.textMain,
  },
  dietOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Theme.divider,
  },
  dietOptionDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 15,
  },
  dietOptionText: {
    fontSize: 16,
    color: Theme.textMain,
    fontWeight: '500',
  },
});
