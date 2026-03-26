// src/components/ui/Chip.js

import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';

const Chip = ({
  label,
  selected = false,
  onPress,
  showBorder = true,
  icon = null,
}) => {
  return (
    <Pressable
      style={[
        styles.chip,
        selected && styles.chipSelected,
        showBorder && styles.chipBorder,
      ]}
      onPress={onPress}
    >
      {icon && <Text style={styles.iconText}>{icon}</Text>}
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
  },
  chipSelected: {
    backgroundColor: '#0066FF',
  },
  chipBorder: {
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  iconText: {
    fontSize: 14,
    marginRight: 6,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
});

export default Chip;
