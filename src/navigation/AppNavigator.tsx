import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={require('../screens/FeedScreen').default} />
      <Tab.Screen name="Stories" component={require('../screens/StoriesScreen').default} />
      <Tab.Screen name="Chat" component={require('../screens/ChatScreen').default} />
      <Tab.Screen name="Profile" component={require('../screens/ProfileScreen').default} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}