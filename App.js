import React from 'react';
import { Alert, AppRegistry, AsyncStorage, Button, StyleSheet, State, Text, Time, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';

var STORAGE_KEY = '@MySuperStore:key';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coletar: 0,
            status : "inativo",
            intervalo : 1,
            tempo : 1000
        };
    }

    atualizaTempo() {
        let valor = this.state.intervalo * 1000;
        this.setState({ tempo : valor});
    }

    inicializa(){
        this.setState({coletar : 1});
        setTimeout(
          ()=> {
            this.setState({status : "leitura"});
            this.coletar();
          }, 1000);
    }

    coletar(){
      if (this.state.coletar == 1) {
        setTimeout(
          () => {
            //Faz a coleta e salva
            this.coletar();
          }, 3000);
      }
    }

    finaliza(){
        this.setState({coletar : 0});
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
                    <Text>Status da leitura: {this.state.status}</Text>
                    <Text>Valor coletar: {this.state.coletar}</Text>
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
