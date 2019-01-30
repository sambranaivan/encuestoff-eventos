import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Image ,TouchableOpacity, AsyncStorage, Platform, Alert} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Constants } from 'expo';



export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = 
    {
      timestamp: new Date().getTime(),
      spinner:false
    }
  }

  

  enviar = async () => {
    // let server = "192.168.1.15"//totolink
    // let server = "10.1.17.203"//estadistica
    // let server = "13.90.59.76"//Azure Chamaoke
    let server = "estadisticas.apps.mcypcorrientes.gob.ar/"//Azure Chamaoke
    console.log("send data to "+server);
    this.setState({spinner:true});
    
   try {
     let data = await AsyncStorage.getItem('data');
     if (data !== null)//ya hay algo cargado?
     {
      // enviar la data

       // http://localhost/apiEncuestoff/public/api/carnaval/send
       const myRequest = new Request('http://'+server+'api/carnaval/send',
         {
           method: 'POST',
           body: data
         });


       fetch(myRequest)
         .then(response => {
           if (response.status === 200) {
             this.setState({ spinner: false });
            //  alert('Actualizado')
            Alert.alert(
  'Encuestas Actualizada',
  'Presione Aceptar para continuar',
  [
    {text: 'Aceptar', onPress: () => console.log('OK Pressed')},
  ],
  {cancelable: false},
);
           } else {
             console.log(response);
             throw new Error('Something went wrong on api server!');
           }
         })
         .then(response => {
           // console.log("Debug")
           console.debug(response);
           // ...
         }).catch(error => {
           console.error(error);
         });

      // fin de envio
     }
     else
     {
       this.setState({ spinner: false });
       alert("No Hay Encuestas que Enviar")
     }

     
   } catch (error) {
     alert(error)
   }


  }

 
  
  saveData = async () => {
   try {
     
    ///get current data
    let data = await AsyncStorage.getItem('data');
    if(data !== null)//ya hay algo cargado?
    {
        //convierto string a objeto !
        var data = JSON.parse(data);
        //nuevo objeto 
        var nuevo = { nombre: 'ivan', apellido: 'sambrana' };
        //inserto nuevo objeto
        data.push(nuevo);
        //convierto de nuevo a string!
        data = JSON.stringify(data);
        //guardo en el coso
        AsyncStorage.setItem('data',data);
        //muestro en consola
        console.log("data")
        console.log(data);
      
    }
    else{//es el primero asi que se inicializa
      data = [];
      data.push({nombre:"primero",apellido:"ultimo"});
      AsyncStorage.setItem('data', JSON.stringify(data));
      console.log("array")
      console.log(data);

    }


   } catch (error) {
     console.log(error)
   }
   
  }

  ViewData = async()=>{
    try {
      let data = await AsyncStorage.getItem('data');
     alert(data);
    
    } catch (error) {
      alert(error)
    }
  }

  CleanData = async()=>{
    try {
      AsyncStorage.removeItem('data');
      console.log("limpio");
    } catch (error) {
      console.log(error)
    }
  }

  Allkeys = async()=>{
    try {
      console.log(AsyncStorage.removeItem('getAllKeys'));
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <View style={styles.padre}>
        <View style={{
          marginTop: 10,
          height: 100,
          flexDirection: 'row',
        }}>
         
        <Image source={require('../assets/images/carnaval.png')} style={{ height: "100%", resizeMode: "contain",flex:1 }} />
        </View>
        <View style={styles.container}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Cargando...'}
            textStyle={styles.spinnerTextStyle}
          />

         
      
           <Button title="borrar" onPress={this.CleanData}/>
            
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Encuesta")} style={styles.button}>
            <Text style={styles.buttonText}>Nueva Encuesta</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={this.enviar} style={styles.button}>
            <Text style={styles.buttonText}>Subir Encuestas</Text>
            </TouchableOpacity>

        </View>
        <View style={styles.header}>
          <Text style={{ color: "#9a9a9a"}}>{Constants.installationId}</Text>
        </View>
      


      </View>
    );
  }
}


const styles = StyleSheet.create({
  header:{
    marginTop: 10,
    height: 30,
    
    flexDirection: 'row',
  },
  padre:{
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    // paddingLeft: 100,
    // paddingRight: 100,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#f2f2f0',
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    // paddingLeft: 100,
    // paddingRight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f0',
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#8fbd4d'
  },
  buttonText: {
    padding: 20,
    fontSize:24,
    color: 'white'
  }
 
})

