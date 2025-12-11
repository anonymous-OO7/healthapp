import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  Platform,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import {
  BatteryOptEnabled,
  RequestDisableOptimization,
} from "react-native-battery-optimization-check";
import { NativeModules } from "react-native";
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import useToast from "../../../hooks/useToast.tsx";
import Button from "../Button.tsx";

const { UnusedAppRestrictionsModule } = NativeModules;

const RESTRICTION_STATUS = {
  ERROR: 0,
  FEATURE_NOT_AVAILABLE: 1,
  DISABLED: 2,
  API_30_BACKPORT: 3,
  API_30: 4,
  API_31: 5,
} as const;

type RestrictionStatus =
  (typeof RESTRICTION_STATUS)[keyof typeof RESTRICTION_STATUS];

interface PermissionStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  enabled: boolean;
  loading: boolean;
}

const CombinedPermissionModal: React.FC = () => {
  const { showCustomToast } = useToast();
  const [modalVisible, setModalVisible] = useState(false);
  const [restrictionStatus, setRestrictionStatus] =
    useState<RestrictionStatus | null>(null);
  const [slideAnim] = useState(new Animated.Value(0));

  const [steps, setSteps] = useState<PermissionStep[]>([
    {
      id: "battery",
      title: "Battery Optimization",
      description: "Disable battery optimization for reliable background sync",
      completed: false,
      enabled: true,
      loading: false,
    },
    {
      id: "unused_restrictions",
      title: "Unused App Restrictions",
      description: "Prevent automatic permission removal when app is unused",
      completed: false,
      enabled: false,
      loading: false,
    },
  ]);

  useEffect(() => {
    if (Platform.OS === "android") checkInitialPermissions();
  }, []);

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(0);
    }
  }, [modalVisible]);

  // Only close modal when all complete
  useEffect(() => {
    if (steps.every((s) => s.completed)) {
      setModalVisible(false);
      showCustomToast("All permissions configured successfully!", {
        type: "success",
      });
    }
  }, [steps]);

  const slideStyle = {
    transform: [
      {
        translateY: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [responsiveScreenHeight(100), 0],
        }),
      },
    ],
  };

  const checkInitialPermissions = async () => {
    const batteryOptEnabled = await BatteryOptEnabled();
    let unusedEnabled = false;
    try {
      const status =
        await UnusedAppRestrictionsModule.checkUnusedAppRestrictionsStatus();
      setRestrictionStatus(status);
      unusedEnabled = [
        RESTRICTION_STATUS.API_30_BACKPORT,
        RESTRICTION_STATUS.API_30,
        RESTRICTION_STATUS.API_31,
      ].includes(status);
    } catch {}
    if (batteryOptEnabled || unusedEnabled) {
      setSteps((prev) =>
        prev.map((step) => {
          if (step.id === "battery")
            return { ...step, completed: !batteryOptEnabled };
          if (step.id === "unused_restrictions")
            return {
              ...step,
              completed: !unusedEnabled,
              enabled: !batteryOptEnabled,
            };
          return step;
        })
      );
      setModalVisible(true);
      showCustomToast(
        "Please complete permission setup for optimal app performance.",
        { type: "info" }
      );
    }
  };

  const updateStep = (id: string, data: Partial<PermissionStep>) =>
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));

  const enableNextStep = () =>
    updateStep("unused_restrictions", { enabled: true });

  const handleBatteryOptimization = async () => {
    updateStep("battery", { loading: true });
    try {
      await RequestDisableOptimization();
      setTimeout(async () => {
        const isEnabled = await BatteryOptEnabled();
        if (!isEnabled) {
          updateStep("battery", { completed: true, loading: false });
          enableNextStep();
          showCustomToast("Battery optimization disabled", {
            type: "success",
          });
        } else {
          updateStep("battery", { loading: false });
          showCustomToast("Permission not granted", { type: "error" });
        }
      }, 1000);
    } catch {
      updateStep("battery", { loading: false });
      showCustomToast("Something went wrong", { type: "error" });
    }
  };

  const handleUnusedAppRestrictions = async () => {
    updateStep("unused_restrictions", { loading: true });
    try {
      await UnusedAppRestrictionsModule.openUnusedAppRestrictionsSettings();
      setTimeout(async () => {
        const status =
          await UnusedAppRestrictionsModule.checkUnusedAppRestrictionsStatus();
        if (status === RESTRICTION_STATUS.DISABLED) {
          updateStep("unused_restrictions", {
            completed: true,
            loading: false,
          });
          showCustomToast("Unused restrictions disabled", {
            type: "success",
          });
        } else {
          updateStep("unused_restrictions", { loading: false });
          showCustomToast("Please disable in settings", {
            type: "error",
          });
        }
      }, 1000);
    } catch {
      updateStep("unused_restrictions", { loading: false });
      showCustomToast("Unable to open settings", { type: "error" });
    }
  };

  const getIcon = (s: PermissionStep) =>
    s.completed ? "✅" : s.loading ? "⏳" : s.enabled ? "⚙️" : "⭕";

  const getText = (s: PermissionStep) =>
    s.loading
      ? "Processing..."
      : s.completed
      ? "Completed"
      : s.id === "battery"
      ? "Open Battery Settings"
      : "Open App Restrictions Settings";

  return (
    <Modal visible={modalVisible} transparent animationType="slide">
      <View style={styles.overlay}>
        <Animated.View style={[styles.containerStyle, slideStyle]}>
          <Text style={styles.modalTitle}>Permission Setup Required</Text>
          <Text style={styles.modalSubtitle}>
            Complete these steps to ensure optimal app performance:
          </Text>
          {steps.map((step, i) => (
            <View key={step.id} style={styles.stepContainer}>
              <View style={styles.stepHeader}>
                <Text style={styles.stepIcon}>{getIcon(step)}</Text>
                <View style={styles.stepTextContainer}>
                  <Text
                    style={[
                      styles.stepTitle,
                      step.completed && styles.completedText,
                      !step.enabled && styles.disabledText,
                    ]}
                  >
                    {i + 1}. {step.title}
                  </Text>
                  <Text
                    style={[
                      styles.stepDescription,
                      !step.enabled && styles.disabledText,
                    ]}
                  >
                    {step.description}
                  </Text>
                </View>
              </View>
              <Button
                mode="contained"
                style={[
                  styles.stepButton,
                  step.completed && styles.completedButton,
                  !step.enabled && styles.disabledButton,
                ]}
                onPress={() =>
                  step.id === "battery"
                    ? handleBatteryOptimization()
                    : handleUnusedAppRestrictions()
                }
                disabled={!step.enabled || step.completed || step.loading}
                loading={step.loading}
              >
                {getText(step)}
              </Button>
            </View>
          ))}
          <Text style={styles.footerText}>
            Both permissions are required for the best app experience.
          </Text>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default CombinedPermissionModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: responsiveScreenWidth(4),
  },
  containerStyle: {
    backgroundColor: "#F9F9F9",
    borderRadius: responsiveScreenWidth(4),
    padding: responsiveScreenWidth(5),
    maxHeight: responsiveScreenHeight(80),
    width: "100%",
  },
  modalTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: responsiveScreenFontSize(2.5),
    color: "#000",
    textAlign: "center",
    marginBottom: responsiveScreenHeight(1),
  },
  modalSubtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: responsiveScreenFontSize(1.8),
    color: "#444",
    textAlign: "center",
    marginBottom: responsiveScreenHeight(3),
  },
  stepContainer: {
    backgroundColor: "#FFF",
    borderRadius: responsiveScreenWidth(3),
    padding: responsiveScreenWidth(4),
    marginBottom: responsiveScreenHeight(2),
    elevation: 2,
  },
  stepHeader: {
    flexDirection: "row",
    marginBottom: responsiveScreenHeight(1.5),
  },
  stepIcon: {
    fontSize: responsiveScreenFontSize(3),
    marginRight: responsiveScreenWidth(3),
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: responsiveScreenFontSize(2),
    color: "#000",
    marginBottom: responsiveScreenHeight(0.5),
  },
  stepDescription: {
    fontFamily: "Poppins-Regular",
    fontSize: responsiveScreenFontSize(1.6),
    color: "#666",
    lineHeight: responsiveScreenHeight(2.2),
  },
  stepButton: {
    borderRadius: responsiveScreenWidth(2),
    marginTop: responsiveScreenHeight(1),
  },
  completedButton: {
    backgroundColor: "#4CAF50",
  },
  disabledButton: {
    backgroundColor: "#E0E0E0",
  },
  completedText: {
    fontFamily: "Poppins-Regular",
    color: "#4CAF50",
    textDecorationLine: "line-through",
  },
  disabledText: {
    fontFamily: "Poppins-Regular",
    color: "#999",
  },
  footerText: {
    fontFamily: "Poppins-Regular",
    fontSize: responsiveScreenFontSize(1.5),
    color: "#888",
    textAlign: "center",
    marginTop: responsiveScreenHeight(2),
    fontStyle: "italic",
  },
});
