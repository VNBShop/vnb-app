import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {back} from '../assets';
import {Icon} from '../components/ui/icon';
import {RootStackProps} from '../../types/route';
import LottieView from 'lottie-react-native';
import {notFoundLottie} from '../lottie';
import {common} from '../UIkit/styles';

type SearchScreenProps = NativeStackScreenProps<RootStackProps, 'Search'>;
export default function SearchScreen({navigation}: SearchScreenProps) {
  return (
    <SafeArea>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon size={25} icon={back} />
        </TouchableOpacity>
        <TextInput
          autoFocus
          style={styles.searchInput}
          placeholderTextColor={color.gray}
          placeholder="Search products"
        />
      </View>

      <View style={styles.notFoundContainer}>
        <LottieView
          source={notFoundLottie}
          autoPlay
          loop
          style={styles.notFound}
        />
        <Text style={[common.text_base, common.text_gray]}>
          No thing to see!
        </Text>
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  searchInput: {
    flex: 1,
    borderWidth: 0.6,
    borderColor: color.border_input,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 9999,
    backgroundColor: color.divider,
    fontSize: 16,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFound: {
    width: 200,
    height: 200,
  },
});
