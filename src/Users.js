import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import firebaseApp from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

const Users = () => {
  const [users, setUsers] = useState([]);  // State to store users
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    console.log("hi laxman")
    fetchData = async()=>{
    querySnapshot = await firestore().collection('users').get();
    const users = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log('Users:', users);
    setUsers(users)
    setLoading(false)
  }
  fetchData()

  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Users List:</Text>
      {users.length === 0 ? (
        <Text>No users found.</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Text>{item.name} - {item.age} years old</Text>
          )}
        />
      )}
    </View>
  );
};

export default Users;
