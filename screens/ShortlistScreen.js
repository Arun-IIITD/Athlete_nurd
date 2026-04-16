import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useShortlist } from '../context/ShortlistContext';

const ShortlistItem = ({ athlete, onRemove, onPress }) => {
  const handleRemove = () => {
    Alert.alert(
      'Remove Athlete',
      `Remove ${athlete.name} from your shortlist?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => onRemove(athlete.id) },
      ]
    );
  };

  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(athlete)} activeOpacity={0.8}>
      <View style={styles.itemLeft}>
        <Text style={styles.itemAvatar}>{athlete.avatar}</Text>
        <View>
          <Text style={styles.itemName}>{athlete.name}</Text>
          <Text style={styles.itemSub}>
            {athlete.position} · {athlete.sport} · Age {athlete.age}
          </Text>
        </View>
      </View>
      <View style={styles.itemRight}>
        <View style={styles.scoreTag}>
          <Text style={styles.scoreTagText}>{athlete.score}</Text>
        </View>
        <TouchableOpacity style={styles.removeBtn} onPress={handleRemove}>
          <Text style={styles.removeBtnText}>✕</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const ShortlistScreen = ({ navigation }) => {
  const { shortlist, removeFromShortlist, averageScore } = useShortlist();

  const handlePress = (athlete) => {
    // Navigate into Discover stack's Profile – works if Shortlist has access to navigation
    navigation.navigate('Discover', {
      screen: 'Profile',
      params: { athlete },
    });
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>📋</Text>
      <Text style={styles.emptyTitle}>No athletes shortlisted</Text>
      <Text style={styles.emptySubtitle}>
        Tap "Add to Shortlist" on any athlete's profile to save them here.
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.statsCard}>
      <View style={styles.statBlock}>
        <Text style={styles.statValue}>{shortlist.length}</Text>
        <Text style={styles.statLabel}>Athletes</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statBlock}>
        <Text style={styles.statValue}>{averageScore || '—'}</Text>
        <Text style={styles.statLabel}>Avg Score</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={shortlist}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ShortlistItem
            athlete={item}
            onRemove={removeFromShortlist}
            onPress={handlePress}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={
          shortlist.length === 0 ? styles.emptyList : styles.list
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  list: {
    paddingBottom: 30,
  },
  emptyList: {
    flexGrow: 1,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#111827',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    borderRadius: 16,
    padding: 20,
    justifyContent: 'space-around',
  },
  statBlock: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 30,
    fontWeight: '800',
    color: '#F9FAFB',
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#374151',
    marginHorizontal: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 5,
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemAvatar: {
    fontSize: 28,
    marginRight: 12,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  itemSub: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  scoreTag: {
    backgroundColor: '#111827',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  scoreTagText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  removeBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeBtnText: {
    color: '#DC2626',
    fontWeight: '700',
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingBottom: 80,
  },
  emptyEmoji: {
    fontSize: 56,
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default ShortlistScreen;