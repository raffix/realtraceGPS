import React from 'react';
import { Alert, AppRegistry, StyleSheet, Button, Text, View } from 'react-native';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {coletar: 0,};
    }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
            <Button
                onPress={this.setState({coletar : 1})}
                title="Iniciar"
                />
            <Button
                onPress={this.setState({coletar : 0})}
                title="Encerrar"
                color="#FF2828"
                />
        </View>
        <View style={styles.textContainer}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  buttonContainer: {
      margin: 20,
      flexDirection: 'row',
      justifyContent: 'space-between'
  }
});
