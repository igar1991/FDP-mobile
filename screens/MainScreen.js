import React, {useContext} from 'react';
import { View, TextInput, Button } from 'react-native';

export function MainScreen({navigation}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View>
      <Button title="Sign in" onPress={() => navigation.navigate('SignIn')} />
      <Button title="Sign up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
}