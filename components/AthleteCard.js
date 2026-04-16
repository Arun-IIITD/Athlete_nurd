import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useShortlist } from '../context/ShortlistContext';

const SPORT_COLORS = {
  Football: { bg: '#E8F5E9', accent: '#2E7D32', dot: '#43A047' },
  Basketball: { bg: '#FFF3E0', accent: '#E65100', dot: '#FB8C00' },
  Athletics: { bg: '#E3F2FD', accent: '#1565C0', dot: '#1E88E5' },
};

const ScoreBadge = ({ score }) => {
  const color =
    score >= 85 ? '#2E7D32' : score >= 70 ? '#F57C00' : '#C62828';
  return (
    <View style={[styles.scoreBadge, { backgroundColor: color }]}>
      <Text style={styles.scoreText}>{score}</Text>
    </View>
  );
};

const AthleteCard = ({ athlete, onPress }) => {
  const { isShortlisted } = useShortlist();
  const colors = SPORT_COLORS[athlete.sport] || { bg: '#F3F4F6', accent: '#374151', dot: '#6B7280' };
  const shortlisted = isShortlisted(athlete.id);

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.bg }]}
      onPress={() => onPress(athlete)}
      activeOpacity={0.85}
    >
      {/* Left: Avatar */}
      <View style={[styles.avatarContainer, { borderColor: colors.dot }]}>
        <Text style={styles.avatar}>{athlete.avatar}</Text>
      </View>

      {/* Middle: Info */}
      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>{athlete.name}</Text>
          {shortlisted && <Text style={styles.shortlistBadge}>★</Text>}
        </View>
        <Text style={[styles.position, { color: colors.accent }]}>
          {athlete.position} · {athlete.sport}
        </Text>
        <Text style={styles.meta}>Age {athlete.age} · {athlete.nationality}</Text>
      </View>

      {/* Right: Score */}
      <ScoreBadge score={athlete.score} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatar: {
    fontSize: 24,
  },
  info: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  shortlistBadge: {
    fontSize: 14,
    color: '#F59E0B',
  },
  position: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  meta: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  scoreBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  scoreText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
});

export default AthleteCard;