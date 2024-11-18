import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StarText from './starText';
import StarButton from './starButton';
import colors from '../../constants/colors';

const StarHeader: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={require('../../../assets/empire_icon.png')} style={styles.icon} />
        <StarText style={styles.title}>Galaxy Navigator</StarText>
        <Image source={require('../../../assets/empire_icon.png')} style={styles.icon} />
      </View>
      <Image source={require('../../../assets/lightsaber.png')} style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 40,
    marginHorizontal: 10,
    tintColor: colors.white,
  },
  title: {
    fontSize: 24,
    color: colors.primary,
    marginBottom: 10,
  },
  divider: {
    width: '100%',
    height: 5,
    marginTop: 10,
  },
});

export default StarHeader;