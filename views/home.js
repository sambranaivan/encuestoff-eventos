import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Image ,TouchableOpacity, AsyncStorage} from 'react-native';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
      let user = await AsyncStorage.getItem('contador');
      if (user !== null) {
        // We have data!!
        alert(user);
      }
      else{
        alert('Vacio');
      }
    } catch (error) {
      alert(error)
    }
  }

  CleanData = async()=>{
    try {
      AsyncStorage.removeItem('contador');
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
      <View style={styles.container}>
      <Button title="Nueva Encuesta" onPress={() => this.props.navigation.navigate("Encuesta")}/>
      <Text></Text>
        <Button title="Subir Encuesstas" onPress={() => this.props.navigation.navigate("Sincro")} />
        <TouchableOpacity onPress={this.saveData}>
          <Text>Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.ViewData  }>
          <Text>Mostrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.CleanData}>
          <Text>Borrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.Allkeys}>
          <Text>AllKeys</Text>
        </TouchableOpacity>
      
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    padding:100
  },
 
})

