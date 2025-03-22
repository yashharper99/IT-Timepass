import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const PROFILE_POSTS = [
  { id: '1', image: 'https://picsum.photos/400', likes: 1234 },
  { id: '2', image: 'https://picsum.photos/401', likes: 856 },
  { id: '3', image: 'https://picsum.photos/402', likes: 2341 },
  { id: '4', image: 'https://picsum.photos/403', likes: 543 },
  { id: '5', image: 'https://picsum.photos/404', likes: 987 },
  { id: '6', image: 'https://picsum.photos/405', likes: 1567 },
];

const HIGHLIGHTS = [
  { id: '1', title: 'Travel', image: 'https://picsum.photos/200' },
  { id: '2', title: 'Food', image: 'https://picsum.photos/201' },
  { id: '3', title: 'Pets', image: 'https://picsum.photos/202' },
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('grid');

  // Add interfaces for type safety
  interface HighlightItem {
    id: string;
    title: string;
    image: string;
  }
  
  interface PostItem {
    id: string;
    image: string;
    likes: number;
  }
  
  // Update the renderHighlight and renderPost functions
  const renderHighlight = ({ item }: { item: HighlightItem }) => (
    <TouchableOpacity style={styles.highlightItem}>
      <View style={styles.highlightImageContainer}>
        <Image source={{ uri: item.image }} style={styles.highlightImage} />
      </View>
      <Text style={styles.highlightTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderPost = ({ item }: { item: PostItem }) => (
    <TouchableOpacity style={styles.postItem}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      {activeTab === 'list' && (
        <View style={styles.postOverlay}>
          <Ionicons name="heart" size={20} color="#fff" />
          <Text style={styles.postLikes}>{item.likes}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.username}>john_doe</Text>
          <TouchableOpacity onPress={() => router.push('/settings')}>
            <Ionicons name="menu-outline" size={28} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.profileInfo}>
        <View style={styles.profileStats}>
          <Image
            source={{ uri: 'https://picsum.photos/200' }}
            style={styles.profileImage}
          />
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>156</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2.5K</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1.2K</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>

        <View style={styles.bioSection}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.bio}>📸 Photography enthusiast</Text>
          <Text style={styles.bio}>🌍 Travel lover</Text>
          <Text style={styles.bio}>🎨 Digital creator</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-social-outline" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={HIGHLIGHTS}
          renderItem={renderHighlight}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.highlightsList}
          keyExtractor={item => item.id}
        />

        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'grid' && styles.activeTab]}
            onPress={() => setActiveTab('grid')}
          >
            <Ionicons
              name="grid-outline"
              size={24}
              color={activeTab === 'grid' ? '#000' : '#666'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'list' && styles.activeTab]}
            onPress={() => setActiveTab('list')}
          >
            <Ionicons
              name="list-outline"
              size={24}
              color={activeTab === 'list' ? '#000' : '#666'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={PROFILE_POSTS}
        renderItem={renderPost}
        numColumns={3}
        scrollEnabled={false}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileInfo: {
    padding: 16,
  },
  profileStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#666',
    fontSize: 12,
  },
  bioSection: {
    marginTop: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  bio: {
    color: '#333',
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    fontWeight: '600',
  },
  shareButton: {
    backgroundColor: '#F1F5F9',
    padding: 8,
    borderRadius: 8,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightsList: {
    marginTop: 16,
  },
  highlightItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  highlightImageContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 2,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  highlightImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  highlightTitle: {
    fontSize: 12,
    marginTop: 4,
  },
  tabBar: {
    flexDirection: 'row',
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: '#000',
  },
  postItem: {
    width: width / 3,
    height: width / 3,
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  postOverlay: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  postLikes: {
    color: '#fff',
    fontWeight: '600',
  },
});