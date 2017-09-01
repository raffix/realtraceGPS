import React from 'react';
import { Alert, AppRegistry, Button, StyleSheet, State, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import TimerMixin from 'react-timer-mixin';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coletar: 0,
            intervalo: 1000,
                    };
    }

    inicializa(event){
        this.setState({coletar : 1});
        this.coletaDados().bind(this);
    }

    finaliza(){
        this.setState({coletar : 0});
    }

    coletaDados(){
      let compare = this.state.coletar;

      while(compare < 100){
        this.setTimeout(() =>{
          compare++;
          this.setState({coletar : compare});
        }, 1000);
      }
    }

    render() {
        return (
              <View style={styles.container}>
                <View style={styles.textos}>
                    <Text>Coletor de dados GPS</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={this.inicializa.bind(this)}
                        title="Iniciar"
                        />
                    <Button
                        onPress={this.finaliza.bind(this)}
                        title="Encerrar"
                        color="#FF2828"
                        />
                </View>
                <View style={styles.textContainer}>
                    <Text>Status da leitura: {this.state.coletar}</Text>
                </View>
              </View>
        );
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 50,
  },
  textos:{
      alignItems: 'center',
  },
  buttonContainer: {
      margin: 20,
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
  textContainer: {
      justifyContent: 'center',
      alignItems: 'center',
  }
});
