import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import useHealthConnect from '../../../hooks/useHealthConnect.js';
import styles from './HealthConnectCard.styles';

const StatItem = ({ icon, iconBg, value, unit, label }) => (
  <View style={styles.statCard}>
    <View style={[styles.statIconContainer, { backgroundColor: iconBg }]}>
      {icon}
    </View>
    <Text style={styles.statValue}>
      {value}
      {unit && <Text style={styles.statUnit}> {unit}</Text>}
    </Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const formatSleepDuration = minutes => {
  if (minutes === 0) return '0';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

const formatNumber = num => {
  if (num === null || num === undefined) return '0';
  return num.toLocaleString();
};

const StatusItem = ({ done, text }) => (
  <View style={styles.statusRow}>
    <View style={styles.statusIcon}>
      {done ? (
        <Feather name="check-circle" size={20} color="#4CAF50" />
      ) : (
        <Feather name="alert-circle" size={20} color="#FF9800" />
      )}
    </View>
    <Text
      style={[
        styles.statusText,
        done ? styles.statusDone : styles.statusPending,
      ]}
    >
      {text}
    </Text>
  </View>
);

const HealthConnectCard = () => {
  const navigation = useNavigation();
  const {
    isLoading,
    sdkAvailable,
    permissionsGranted,
    healthData,
    error,
    refresh,
    requestHealthPermissions,
    openHealthConnect,
    installHealthConnect,
  } = useHealthConnect();

  const [lastSync, setLastSync] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!isLoading && permissionsGranted) {
      setLastSync(new Date());
    }
  }, [isLoading, permissionsGranted]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refresh();
    setLastSync(new Date());
    setIsRefreshing(false);
  };

  const handlePermissionRequest = async () => {
    const granted = await requestHealthPermissions();
    if (granted) {
      await refresh();
    }
  };

  const handleViewHistory = () => {
    navigation.navigate('HealthHistory');
  };

  if (Platform.OS !== 'android') {
    return (
      <View style={styles.container}>
        <View style={styles.notSupportedCard}>
          <Feather name="smartphone" size={24} color="#F57C00" />
          <Text style={[styles.notSupportedText, { marginTop: 8 }]}>
            Health Connect is only available on Android devices
          </Text>
        </View>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066FF" />
          <Text style={styles.loadingText}>
            Connecting to Health Connect...
          </Text>
        </View>
      </View>
    );
  }

  if (!sdkAvailable) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionCard}>
          <View style={styles.permissionIconContainer}>
            <MaterialCommunityIcons
              name="heart-pulse"
              size={32}
              color="#FF9800"
            />
          </View>
          <Text style={styles.permissionTitle}>Health Connect Required</Text>
          <Text style={styles.permissionDescription}>
            To track your health data, please install Health Connect from the
            Play Store.
          </Text>
          <StatusItem done={false} text="Health Connect not installed" />
          <Pressable
            style={[styles.permissionButton, styles.installButton]}
            onPress={installHealthConnect}
          >
            <Text style={styles.permissionButtonText}>
              Install Health Connect
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (!permissionsGranted) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionCard}>
          <View
            style={[
              styles.permissionIconContainer,
              { backgroundColor: '#E3F2FD' },
            ]}
          >
            <MaterialCommunityIcons
              name="shield-check"
              size={32}
              color="#0066FF"
            />
          </View>
          <Text style={styles.permissionTitle}>Permission Required</Text>
          <Text style={styles.permissionDescription}>
            Allow access to your health data to track steps, calories, heart
            rate, and more.
          </Text>
          <StatusItem done={true} text="Health Connect installed" />
          <StatusItem done={false} text="Permissions not granted" />
          <Pressable
            style={styles.permissionButton}
            onPress={handlePermissionRequest}
          >
            <Text style={styles.permissionButtonText}>Grant Permissions</Text>
          </Pressable>
          <Pressable
            style={[styles.permissionButton, styles.secondaryButton]}
            onPress={openHealthConnect}
          >
            <Text style={styles.secondaryButtonText}>Open Settings</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorCard}>
          <Feather name="alert-triangle" size={24} color="#D32F2F" />
          <Text style={[styles.errorText, { marginTop: 8 }]}>{error}</Text>
          <Pressable
            style={[styles.permissionButton, { marginTop: 12 }]}
            onPress={handleRefresh}
          >
            <Text style={styles.permissionButtonText}>Retry</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View style={styles.headerIcon}>
            <MaterialCommunityIcons
              name="heart-pulse"
              size={18}
              color="#4CAF50"
            />
          </View>
          <View>
            <Text style={styles.headerTitle}>Health Connect</Text>
            <Text style={styles.headerSubtitle}>Today's Activity</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Pressable
            style={[styles.refreshButton, { marginRight: 8 }]}
            onPress={handleViewHistory}
          >
            <Feather name="calendar" size={18} color="#0066FF" />
          </Pressable>
          <Pressable
            style={styles.refreshButton}
            onPress={handleRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <ActivityIndicator size="small" color="#0066FF" />
            ) : (
              <Feather name="refresh-cw" size={18} color="#0066FF" />
            )}
          </Pressable>
        </View>
      </View>

      <Pressable style={styles.mainCard} onPress={handleViewHistory}>
        <View style={styles.statsGrid}>
          <StatItem
            icon={
              <MaterialCommunityIcons name="walk" size={18} color="#0066FF" />
            }
            iconBg="#E3F2FD"
            value={formatNumber(healthData.steps)}
            label="Steps"
          />
          <StatItem
            icon={
              <MaterialCommunityIcons name="fire" size={18} color="#FF5722" />
            }
            iconBg="#FBE9E7"
            value={formatNumber(healthData.calories)}
            unit="kcal"
            label="Calories"
          />
          <StatItem
            icon={
              <MaterialCommunityIcons name="heart" size={18} color="#E91E63" />
            }
            iconBg="#FCE4EC"
            value={healthData.heartRate || '--'}
            unit={healthData.heartRate ? 'bpm' : ''}
            label="Heart Rate"
          />
          <StatItem
            icon={
              <MaterialCommunityIcons
                name="map-marker-distance"
                size={18}
                color="#9C27B0"
              />
            }
            iconBg="#F3E5F5"
            value={healthData.distance}
            unit="km"
            label="Distance"
          />
          <StatItem
            icon={
              <MaterialCommunityIcons name="bed" size={18} color="#3F51B5" />
            }
            iconBg="#E8EAF6"
            value={formatSleepDuration(healthData.sleepDuration)}
            label="Sleep"
          />
          <StatItem
            icon={
              <MaterialCommunityIcons
                name="lightning-bolt"
                size={18}
                color="#FF9800"
              />
            }
            iconBg="#FFF3E0"
            value={formatNumber(healthData.activeCalories)}
            unit="kcal"
            label="Active"
          />
          {/* <StatItem
            icon={
              <MaterialCommunityIcons
                name="stairs-up"
                size={18}
                color="#00BCD4"
              />
            }
            iconBg="#E0F7FA"
            value={formatNumber(healthData.floorsClimbed)}
            label="Floors"
          />
          <StatItem
            icon={
              <MaterialCommunityIcons name="timer" size={18} color="#4CAF50" />
            }
            iconBg="#E8F5E9"
            value={formatNumber(healthData.exerciseMinutes)}
            unit="min"
            label="Exercise"
          />
          <StatItem
            icon={
              <MaterialCommunityIcons
                name="heart-pulse"
                size={18}
                color="#F44336"
              />
            }
            iconBg="#FFEBEE"
            value={healthData.heartRateAvg || '--'}
            unit={healthData.heartRateAvg ? 'bpm' : ''}
            label="Avg HR"
          /> */}
        </View>

        {lastSync && (
          <Text style={styles.lastSyncText}>
            Last synced: {lastSync.toLocaleTimeString()} • Tap to view history
          </Text>
        )}
      </Pressable>
    </View>
  );
};

export default HealthConnectCard;
