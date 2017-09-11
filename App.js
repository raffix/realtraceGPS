import React from 'react';
import { Alert, AppRegistry, AsyncStorage, Button, StyleSheet, State, Slider, Text, TextInput, Time, ToastAndroid, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';

var STORAGE_KEY = '@MySuperStore:key';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coletar: 0,
            status : "inativo",
            intervalo : 5,
            tempo : 1000
        };
    }

    atualizaTempo() {
        let valor = this.state.intervalo * 1000;
        this.setState({ tempo : valor});
    }

    inicializa(){
        this.setState({coletar : 1});
        this.atualizaTempo();
        setTimeout(
          ()=> {
            ToastAndroid.show("Coleta iniciada", ToastAndroid.SHORT);
            this.setState({status : "leitura"});
            this.coletar();
          }, 1000);
    }

    coletar(){
      let timer = this.state.tempo;
      if (this.state.coletar == 1) {
        setTimeout(
          () => {
            //Faz a coleta e salva
            this.coletar();
          }, timer);
      }
    }

    finaliza(){
        this.setState({coletar : 0});
    }

    getVal(val){
        ToastAndroid.show(val + " segundos", ToastAndroid.SHORT);
    }

    render() {
        return (
              <View style={styles.container}>
                <View style={styles.textos}>
                    <Text>Coletor de dados GPS</Text>
                </View>
                <View style={styles.intervaloColeta}>
                    <Text>Intervalo da coleta: {this.state.intervalo} s</Text>
                    <Slider
                        style={{ width: 300 }}
                        step={1}
                        minimumValue={5}
                        maximumValue={30}
                        value={this.state.intervalo}
                        onValueChange={val => this.setState({ intervalo: val })}
                        onSlidingComplete={ val => this.getVal(val)}
                    />
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
  intervaloColeta : {
      padding: 20,
      alignItems: 'center',
      flexDirection: 'column',
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
