import Button from '@/src/components/Button';
import { supabase } from '@/src/lib/supabase';
import { View, Text } from 'react-native';

const ProfileScreen = () => {
  return (
    <View>
        <Text>Profile</Text>
        <Button onPress={() => supabase.auth.signOut()} text="Sign out"/>
    </View>
  );
};

export default ProfileScreen;
