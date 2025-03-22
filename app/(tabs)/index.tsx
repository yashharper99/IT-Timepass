import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Story {
  id: string;
  username: string;
  image: string;
  isYours?: boolean;
}

interface Post {
  id: string;
  username: string;
  userImage: string;
  postImage: string;
  likes: number;
  caption: string;
  comments: number;
}

const DUMMY_STORIES: Story[] = [
  { id: '1', username: 'Your Story', image: 'https://picsum.photos/200', isYours: true },
  { id: '2', username: 'john_doe', image: 'https://picsum.photos/201' },
  { id: '3', username: 'jane_smith', image: 'https://picsum.photos/202' },
  { id: '4', username: 'mike_wilson', image: 'https://picsum.photos/203' },
  { id: '5', username: 'sarah_parker', image: 'https://picsum.photos/204' },
];

const DUMMY_POSTS: Post[] = [
  {
    id: '1',
    username: 'john_doe',
    userImage: 'https://picsum.photos/200',
    postImage: 'https://picsum.photos/400',
    likes: 1234,
    caption: 'Beautiful sunset! 🌅',
    comments: 89,
  },
  {
    id: '2',
    username: 'jane_smith',
    userImage: 'https://picsum.photos/201',
    postImage: 'https://picsum.photos/401',
    likes: 856,
    caption: 'Perfect weekend getaway 🏖️',
    comments: 45,
  },
];

export default function HomeScreen() {
  const renderStory = ({ item }: { item: Story }) => (
    <TouchableOpacity style={styles.storyContainer}>
      <View style={[styles.storyRing, item.isYours && styles.yourStoryRing]}>
        <Image source={{ uri: item.image }} style={styles.storyImage} />
      </View>
      <Text style={styles.storyUsername} numberOfLines={1}>
        {item.username}
      </Text>
    </TouchableOpacity>
  );

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <View style={styles.postUser}>
          <Image source={{ uri: item.userImage }} style={styles.postUserImage} />
          <Text style={styles.postUsername}>{item.username}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: item.postImage }} style={styles.postImage} />

      <View style={styles.postActions}>
        <View style={styles.postLeftActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart-outline" size={28} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="paper-plane-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.postFooter}>
        <Text style={styles.likesCount}>{item.likes.toLocaleString()} likes</Text>
        <View style={styles.captionContainer}>
          <Text style={styles.postUsername}>{item.username}</Text>
          <Text style={styles.caption}>{item.caption}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.viewComments}>
            View all {item.comments} comments
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>IT-Timepass</Text>
        <TouchableOpacity>
          <Ionicons name="add-circle-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={DUMMY_POSTS}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <FlatList
            data={DUMMY_STORIES}
            renderItem={renderStory}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.storiesContainer}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  storiesContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  storyContainer: {
    alignItems: 'center',
    marginRight: 16,
    width: 72,
  },
  storyRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    padding: 3,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E60023',
  },
  yourStoryRing: {
    borderColor: '#E2E8F0',
  },
  storyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 33,
  },
  storyUsername: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  postContainer: {
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  postUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postUserImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  postUsername: {
    fontWeight: '600',
  },
  postImage: {
    width: '100%',
    height: 400,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  postLeftActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    marginRight: 8,
  },
  postFooter: {
    paddingHorizontal: 12,
    gap: 4,
  },
  likesCount: {
    fontWeight: '600',
  },
  captionContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  caption: {
    flex: 1,
  },
  viewComments: {
    color: '#666',
    marginTop: 4,
  },
});