import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  card: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    alignItems: 'flex-start',
  },
  cardHeader: {
    fontSize: 28,
    marginBottom: 10
  },
  cardText: {
    marginBottom: 10
  },
  cardButtons: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
  },
  cardButton: {
    margin: 5,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 40
  },
  navMenu: {
    width: 40,
    margin: 5
  },
  navText: {
    flex: 1,
    margin: 5
  }
});
