import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { athletesWithScores, SPORTS } from '../data/athletes';
import AthleteCard from '../components/AthleteCard';

const DiscoverScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const debounceTimer = useRef(null);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const handleSearchChange = useCallback((text) => {
    setSearchQuery(text);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedQuery(text.trim().toLowerCase());
    }, 300);
  }, []);

  const filteredAthletes = athletesWithScores.filter((a) => {
    const matchesSport = activeFilter === 'All' || a.sport === activeFilter;
    const matchesSearch =
      debouncedQuery === '' || a.name.toLowerCase().includes(debouncedQuery);
    return matchesSport && matchesSearch;
  });

  const handleCardPress = (athlete) => {
    navigation.navigate('Profile', { athlete });
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>🔍</Text>
      <Text style={styles.emptyTitle}>No athletes found</Text>
      <Text style={styles.emptySubtitle}>
        Try adjusting your search or filter.
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search athletes..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={handleSearchChange}
          returnKeyType="search"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setSearchQuery('');
              setDebouncedQuery('');
            }}
          >
            <Text style={styles.clearBtn}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Result count */}
      <Text style={styles.resultCount}>
        {filteredAthletes.length} athlete{filteredAthletes.length !== 1 ? 's' : ''} found
      </Text>

      {/* Filter Chips */}
      <View style={styles.filterRow}>
        {SPORTS.map((sport) => (
          <TouchableOpacity
            key={sport}
            style={[
              styles.chip,
              activeFilter === sport && styles.chipActive,
            ]}
            onPress={() => setActiveFilter(sport)}
          >
            <Text
              style={[
                styles.chipText,
                activeFilter === sport && styles.chipTextActive,
              ]}
            >
              {sport}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={filteredAthletes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AthleteCard athlete={item} onPress={handleCardPress} />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={
          filteredAthletes.length === 0 ? styles.emptyList : styles.list
        }
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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
    paddingBottom: 20,
  },
  emptyList: {
    flexGrow: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 10 : 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },
  clearBtn: {
    fontSize: 14,
    color: '#9CA3AF',
    paddingLeft: 8,
  },
  resultCount: {
    fontSize: 12,
    color: '#6B7280',
    marginHorizontal: 20,
    marginTop: 6,
    marginBottom: 2,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
  },
  chipActive: {
    backgroundColor: '#111827',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  chipTextActive: {
    color: '#fff',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  emptyEmoji: {
    fontSize: 52,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});

export default DiscoverScreen;