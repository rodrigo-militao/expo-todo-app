import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{ props.title }</Text>
      <Text style={styles.subtitle}>{ props.subtitle }</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  header: {
    backgroundColor: '#171717',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#F3F3F3',
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  subtitle: {
    color: '#F3F3F3',
    fontSize: 11,
    textTransform: 'uppercase'
  }
});

export default Header;
