import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import LocationScreen from '../screens/LocationScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createMaterialBottomTabNavigator();

const BottomNavbar = () => {
  return (
    <Tab.Navigator
      // eslint-disable-next-line react-native/no-inline-styles
      barStyle={{
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 0.53,
        shadowRadius: 13.97,
        elevation: 21,
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: null,
          tabBarIcon: ({tintColor}) => <Icon name="wpexplorer" size={28} />,
        }}
        name="LocationScreen"
        component={LocationScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: null,
          tabBarIcon: ({tintColor}) => <Icon name="comment-o" size={25} />,
        }}
        name="ChatScreen"
        component={ChatScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: null,
          tabBarIcon: ({tintColor}) => <Icon name="user" size={25} />,
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomNavbar;