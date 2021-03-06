import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  AppRegistry,
  TextInput
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

import { addDeck } from '../actions'
import { setDeck } from '../utils/helpers'
import TextButton from './TextButton'

class AddDeck extends Component {

  state = { deckText: '' }

  submit = () => {
    let deck = {
      title: this.state.deckText,
      cards: []
    }
    let deckId = setDeck(deck)
    this.props.dispatch(addDeck(deck, deckId))

    // reset

    this.setState({ deckText: '' })

    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home'})
      ]
    })
    this.props.navigation.dispatch(resetAction)

  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(deckText) => this.setState({deckText})}
          value={this.state.deckText}
          placeholder={'Deck Title'}
        />
        <TextButton  onPress={this.submit} style={[styles.button]}>Submit</TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between'
  },
  title: {
    justifyContent: 'center',
    fontSize: 40,
    textAlign: 'center',
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
  },
  textInput: {
    height: 40,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50,
    marginBottom: 20,
  },
  button: {
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 10,
    marginLeft: 70,
    marginRight: 70,
    marginTop: 30,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    }
  }
})


export default connect()(AddDeck)
