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
      let user = await AsyncStorage.getItem('contador');
       user = "a"+user
      AsyncStorage.setItem('contador', user);
      alert(user)
    } catch (error) {
      let user = "ivan";
      AsyncStorage.setItem('contador', user);
    }
  }

  ViewData = async()=>{
    try {
      let user = await AsyncStorage.getItem('contador');
      alert(user)
    } catch (error) {
      alert(error)
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
      
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    padding:100
  },
 
})

