import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useShortlist } from '../context/ShortlistContext';
import ReadinessBar from '../components/ReadinessBar';
import StatRow from '../components/StatRow';

const SPORT_COLORS = {
  Football: '#16A34A',
  Basketball: '#EA580C',
  Athletics: '#2563EB',
};

const ProfileScreen = ({ route }) => {
  const { athlete } = route.params;
  const { isShortlisted, addToShortlist, removeFromShortlist } = useShortlist();
  const shortlisted = isShortlisted(athlete.id);
  const accentColor = SPORT_COLORS[athlete.sport] || '#4B5563';

  const handleShortlistToggle = () => {
    if (shortlisted) {
      Alert.alert(
        'Remove from Shortlist',
        `Remove ${athlete.name} from your shortlist?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Remove',
            style: 'destructive',
            onPress: () => removeFromShortlist(athlete.id),
          },
        ]
      );
    } else {
      addToShortlist(athlete);
    }
  };

  const statEntries = Object.entries(athlete.stats);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Card */}
      <View style={[styles.heroCard, { backgroundColor: accentColor }]}>
        <Text style={styles.heroAvatar}>{athlete.avatar}</Text>
        <Text style={styles.heroName}>{athlete.name}</Text>
        <Text style={styles.heroSub}>
          {athlete.position} · {athlete.sport}
        </Text>
        <View style={styles.heroBadgeRow}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeLabel}>AGE</Text>
            <Text style={styles.heroBadgeValue}>{athlete.age}</Text>
          </View>
          <View style={styles.heroDivider} />
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeLabel}>SCORE</Text>
            <Text style={styles.heroBadgeValue}>{athlete.score}</Text>
          </View>
          <View style={styles.heroDivider} />
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeLabel}>FROM</Text>
            <Text style={styles.heroBadgeValue}>{athlete.nationality}</Text>
          </View>
        </View>
      </View>

      {/* Readiness Score */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Readiness Score</Text>
        <ReadinessBar score={athlete.score} label="Overall Readiness" />
      </View>

      {/* Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Stats</Text>
        {statEntries.map(([key, value]) => (
          <StatRow
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            value={value}
          />
        ))}
      </View>

      {/* Shortlist Button */}
      <TouchableOpacity
        style={[
          styles.shortlistBtn,
          shortlisted
            ? styles.shortlistBtnRemove
            : { backgroundColor: accentColor },
        ]}
        onPress={handleShortlistToggle}
        activeOpacity={0.85}
      >
        <Text style={styles.shortlistBtnText}>
          {shortlisted ? '★  Remove from Shortlist' : '☆  Add to Shortlist'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    paddingBottom: 40,
  },
  heroCard: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 28,
    paddingHorizontal: 20,
  },
  heroAvatar: {
    fontSize: 56,
    marginBottom: 10,
  },
  heroName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
  },
  heroSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
    marginBottom: 18,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  heroBadge: {
    alignItems: 'center',
    flex: 1,
  },
  heroBadgeLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1,
  },
  heroBadgeValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#fff',
    marginTop: 2,
  },
  heroDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 12,
  },
  section: {
    backgroundColor: '#fff',
    margin: 16,
    marginBottom: 0,
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 14,
  },
  shortlistBtn: {
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  shortlistBtnRemove: {
    backgroundColor: '#EF4444',
  },
  shortlistBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ProfileScreen;