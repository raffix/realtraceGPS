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
            tempo : 1000,
            locationsArray: {
              locations: [
              ]
            },
            ultima: '',
        };
    }

    loadData(){
      try {
        var value = AsyncStorage.getItem(STORAGE_KEY);
        if (value !== null){
          //setting the state will trigger the render inside the list
          this.setState({
            locationsArray: {
              locations: JSON.parse(value)
            }
          });
          this._appendMessage('Recovered selection from disk: ' + value);
        }
      } catch (error) {
        this._appendMessage('AsyncStorage error: ' + error.message);
      }
    }

    enviar(){
      this.loadData();

      if (value.isArray()) {
        this.send(value);
      }
    }

    send(dados) {

      return true;
    }

    atualizaTempo() {
        let valor = this.state.intervalo * 1000;
        this.setState({ tempo : valor});
    }

    inicializa(){
        this.setState({coletar : 1});
        this.atualizaTempo();
        //this.loadData();

        setTimeout(
          ()=> {
            this._appendMessage("Coleta iniciada");
            this.setState({status : "leitura"});
            this.coletar();
          }, 1000);
    }



    coletar(){
      let timer = this.state.tempo;
      if (this.state.coletar == 1) {
        setTimeout(
          () => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                var locations = this.state.locationsArray.locations;
                locations.push(position);

                this.setState({
                  locations: locations
                });

                position = this.state.locationsArray.locations.lenght;
                this.setState({ultima : position});
              },
              (error) => this.setState({ error: error.message }),
              { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
            );
            this.coletar();
          }, timer);
      }
    }

    finaliza(){
        this.setState({coletar : 0});
        this.setState({status : "inativa"});
        this._saveLocationStorage(JSON.stringify(this.state.locationsArray.locations));
        this._appendMessage("Coleta encerrada");
    }
    
    _saveLocationStorage = async(locations) => {
       try {
         await AsyncStorage.setItem(STORAGE_KEY, locations)
         this._appendMessage('Saved selection to disk: ' + locations);
       } catch (error) {
         this._appendMessage('AsyncStorage error: ' + error.message);
       }
    }


    //Toast
    getVal(val){
      ToastAndroid.show(val + " segundos", ToastAndroid.SHORT);
    }

    _appendMessage(mensagem) {
      ToastAndroid.show(mensagem, ToastAndroid.SHORT);
      console.log(mensagem);
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
                        maximumValue={40}
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
                    <Text>Ultima posição: {this.state.ultima}</Text>
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
