import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Switch,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, Spacing, Typography, Radii } from "@/constants/theme";
import { useState } from "react";

export default function SettingsScreen() {
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(true);

  return (
    <View style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* PROFILE CARD */}
        <Pressable style={styles.profileCard}>
          <View style={styles.profileLeft}>
            <View>
              <Image
                source={{
                  uri: "https://i.pravatar.cc/150?img=15",
                }}
                style={styles.avatar}
              />

              <View style={styles.badge}>
                <MaterialCommunityIcons
                  name="check-decagram"
                  size={14}
                  color={Colors.success}
                />
              </View>
            </View>

            <View>
              <Text style={styles.userName}>Alexander Sterling</Text>

              <View style={styles.proBadge}>
                <Text style={styles.proText}>PRO MEMBER</Text>
              </View>
            </View>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={Colors.textPrimary}
          />
        </Pressable>

        {/* ACTION CARDS */}
        <View style={styles.actionRow}>
          <Pressable style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <MaterialCommunityIcons
                name="wallet-outline"
                size={32}
                color={Colors.navy}
              />
            </View>

            <View>
              <Text style={styles.actionLabel}>Default Ledger</Text>
              <Text style={styles.actionValue}>Main Savings</Text>
            </View>
          </Pressable>

          <Pressable style={[styles.actionCard, styles.premiumCard]}>
            <View style={styles.actionIcon}>
              <Ionicons
                name="sparkles-outline"
                size={32}
                color={Colors.textWhite}
              />
            </View>
            <View>
              <Text style={[styles.actionLabel, styles.premiumText]}>
                Upgrade to Sovereign
              </Text>
              <Text style={[styles.actionValue, styles.premiumText]}>
                Executive
              </Text>
            </View>
          </Pressable>
        </View>

        {/* SECURITY */}
        <Text style={styles.sectionTitle}>SECURITY & ACCESS</Text>

        <View style={styles.settingsGroup}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <Ionicons
                  name="finger-print-outline"
                  size={22}
                  color={Colors.navy}
                />
              </View>

              <View>
                <Text style={styles.settingTitle}>Biometrics</Text>
                <Text style={styles.settingSubtitle}>
                  FaceID or TouchID Enabled
                </Text>
              </View>
            </View>

            <Switch
              value={isBiometricEnabled}
              onValueChange={setIsBiometricEnabled}
              trackColor={{
                false: "#D0D5DD",
                true: "#53D89C",
              }}
              thumbColor="#fff"
            />
          </View>

          <Pressable style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <MaterialCommunityIcons
                  name="form-textbox-password"
                  size={20}
                  color={Colors.navy}
                />
              </View>

              <View>
                <Text style={styles.settingTitle}>User Password</Text>
                <Text style={styles.settingSubtitle}>
                  Last updated 5 days ago
                </Text>
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.textPrimary}
            />
          </Pressable>
        </View>

        {/* PREFERENCES */}
        <Text style={styles.sectionTitle}>PREFERENCES</Text>

        <View style={styles.settingsGroup}>
          <Pressable style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <Ionicons name="cash-outline" size={20} color={Colors.navy} />
              </View>

              <View>
                <Text style={styles.settingTitle}>Currency</Text>
                <Text style={styles.settingSubtitle}>USD ($)</Text>
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.textPrimary}
            />
          </Pressable>

          <Pressable style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <Feather name="globe" size={20} color={Colors.navy} />
              </View>

              <View>
                <Text style={styles.settingTitle}>Language</Text>
                <Text style={styles.settingSubtitle}>English (US)</Text>
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.textPrimary}
            />
          </Pressable>

          <Pressable style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <Ionicons
                  name="help-circle-outline"
                  size={20}
                  color={Colors.navy}
                />
              </View>

              <View>
                <Text style={styles.settingTitle}>Help Center</Text>
                <Text style={styles.settingSubtitle}>
                  FAQs and direct support
                </Text>
              </View>
            </View>
          </Pressable>
        </View>

        {/* SIGN OUT */}
        <Pressable style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={28} color={Colors.danger} />

          <Text style={styles.logoutText}>Sign Out</Text>
        </Pressable>

        {/* VERSION */}
        <Text style={styles.version}>SOVEREIGN LEDGER V2.4.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },

  container: {
    padding: 16,
    paddingBottom: 120,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  logo: {
    width: 42,
    height: 42,
    borderRadius: 100,
  },

  appName: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.navy,
  },

  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  profileLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 100,
  },

  badge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 100,
    backgroundColor: "#4EDEA3",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },

  userName: {
    fontSize: Typography["xl"],
    fontWeight: "700",
    color: Colors.textBlack,
    marginBottom: 6,
  },

  proBadge: {
    backgroundColor: "#E8EEF9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  proText: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.navy,
  },

  actionRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 36,
  },

  actionCard: {
    flex: 1,
    backgroundColor: "#EEF1F4",
    borderRadius: 22,
    padding: 18,
    minHeight: 120,
    justifyContent: "space-between",
    gap: 12,
  },

  premiumCard: {
    backgroundColor: Colors.navy,
  },

  premiumText: {
    color: Colors.textWhite,
  },

  actionIcon: {
    marginBottom: 12,
  },

  actionLabel: {
    fontSize: 12,
    fontWeight: Typography.semibold,
    color: Colors.textPrimary,
  },

  actionValue: {
    fontSize: Typography.xl,
    fontWeight: "700",
    color: Colors.textBlack,
  },

  premiumLabel: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    color: "#fff",
  },

  sectionTitle: {
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: "700",
    color: "#8B8D98",
    marginBottom: 16,
  },

  settingsGroup: {
    gap: 14,
    marginBottom: 32,
  },

  settingItem: {
    backgroundColor: "#F0F2F5",
    borderRadius: 22,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  settingIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  settingTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.textBlack,
    marginBottom: 4,
  },

  settingSubtitle: {
    fontSize: 14,
    color: Colors.textPrimary,
  },

  logoutBtn: {
    backgroundColor: Colors.dangerLight,
    borderRadius: Radii.sm,
    paddingVertical: 18,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },

  logoutText: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.danger,
  },

  version: {
    textAlign: "center",
    marginTop: 36,
    fontSize: 12,
    letterSpacing: 4,
    color: "#8B8D98",
    fontWeight: "600",
  },
});
