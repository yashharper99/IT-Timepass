import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

interface Story {
  id: string;
  username: string;
  userImage: string;
  storyImage: string;
  timestamp: string;
}

const DUMMY_STORIES: Story[] = [
  {
    id: '1',
    username: 'john_doe',
    userImage: 'https://picsum.photos/200',
    storyImage: 'https://picsum.photos/800/1200',
    timestamp: '2h ago'
  },
  {
    id: '2',
    username: 'jane_smith',
    userImage: 'https://picsum.photos/201',
    storyImage: 'https://picsum.photos/800/1201',
    timestamp: '3h ago'
  }
];

export default function StoriesScreen() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress] = useState(new Animated.Value(0));

  const currentStory = DUMMY_STORIES[currentStoryIndex];

  const startProgress = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start(() => {
      if (currentStoryIndex < DUMMY_STORIES.length - 1) {
        setCurrentStoryIndex(currentStoryIndex + 1);
        progress.setValue(0);
      } else {
        router.back();
      }
    });
  };

  React.useEffect(() => {
    startProgress();
  }, [currentStoryIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        {DUMMY_STORIES.map((_, index) => (
          <View key={index} style={styles.progressBar}>
            <Animated.View
              style={[
                styles.activeProgress,
                {
                  flex: index === currentStoryIndex ? progress : index < currentStoryIndex ? 1 : 0,
                },
              ]}
            />
          </View>
        ))}
      </View>

      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: currentStory.userImage }} style={styles.userImage} />
          <Text style={styles.username}>{currentStory.username}</Text>
          <Text style={styles.timestamp}>{currentStory.timestamp}</Text>
        </View>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: currentStory.storyImage }}
        style={styles.storyImage}
        resizeMode="cover"
      />

      <View style={styles.footer}>
        <View style={styles.replyInput}>
          <Text style={styles.replyPlaceholder}>Send message</Text>
        </View>
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="paper-plane-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  progressContainer: {
    flexDirection: 'row',
    padding: 8,
    gap: 4,
    position: 'absolute',
    top: 0,
    zIndex: 1,
    width: '100%',
  },
  progressBar: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1,
  },
  activeProgress: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  username: {
    color: '#fff',
    fontWeight: '600',
    marginRight: 8,
  },
  timestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  storyImage: {
    width,
    height,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  replyInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 12,
    marginRight: 8,
  },
  replyPlaceholder: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#CDEA68',
    justifyContent: 'center',
    alignItems: 'center',
  },
});