import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Image ,TouchableOpacity, AsyncStorage, Platform} from 'react-native';

import { Constants } from 'expo';



export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = 
    {
      timestamp: new Date().getTime()
    };
  }

  

  enviar = async () => {
    // let server = "192.168.1.15"//totolink
    // let server = "10.1.17.203"//estadistica
    let server = "13.90.59.76"//Azure Chamaoke
    console.log("send data to "+server);
    
   try {
     let data = await AsyncStorage.getItem('data');
     if (data !== null)//ya hay algo cargado?
     {
      // enviar la data

       // http://localhost/apiEncuestoff/public/api/carnaval/send
       const myRequest = new Request('http://'+server+'/apiencuestoff/public/api/carnaval/send',
         {
           method: 'POST',
           body: data
         });


       fetch(myRequest)
         .then(response => {
           if (response.status === 200) {
             alert('Actualizado')
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
        <View style={styles.container}>
          <Button title="Nueva Encuesta" onPress={() => this.props.navigation.navigate("Encuesta")} />
          <Text></Text>
          <Button title="Subir Encuestas" onPress={this.enviar} />
          {/* <Button title="Limpiar" onPress={this.CleanData} /> */}
          {/* <Button title="Test" onPress={this.test} /> */}
        </View>
        <View style={styles.header}>
          <Text>{Constants.installationId}</Text>
          <Text>{this.state.timestamp}</Text>
        </View>
      


      </View>
    );
  }
}


const styles = StyleSheet.create({
  header:{
    height: 50,
  },
  padre:{
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    // paddingLeft: 100,
    // paddingRight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#88b14b'
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    // paddingLeft: 100,
    // paddingRight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#88b14b'
  },
  TouchableOpacity: {
    borderWidth: 1,
    padding: 25,
    borderColor: 'black'
  }
 
})

