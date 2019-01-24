import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Image, AsyncStorage} from 'react-native';
import { Constants } from 'expo';
import t from 'tcomb-form-native';

const Form = t.form.Form;

// // // // // // // // // // // // 
// Esto va a cambiar a cada rato

const User = t.struct({
    procedencia: t.String,
    sexo: t.enums({
        'F': 'Femenino',
        'M': 'Masculino'
    }, 'Sexo'),
    edad: t.Number,
  
    viaje: t.enums({
        'Solo': 'Solo',
        'Pareja': 'Pareja',
        'Familia': 'Familia',
        'Amigos': 'Amigos',
    }),
    informo: t.enums({
        internet: 'Redes Sociales (Facebook, Instagram, Twitter, Whatsapp)',
        medios: 'Medios de Comunicación (tv, radio)'
    }),
    motivo: t.enums({
        vacaciones: 'Vacaciones',
        religion: 'Religion',
        trabajo: "Trabajo",
        visita: "Visita Flia/Amigos",
        salud: "Salud",
        otro: "Otro"
    }),
    transporte: t.enums({
        omnibus: 'Omnibus',
        auto: 'Automovil',
        corrientes: 'Aeropuerto Corrientes',
        resistencia: 'Aeropuerto Resistencia',
        moto: 'Moto',
        otro: 'Otro'
    }),

    alojamiento: t.enums({
        corrientes: 'Corrientes',
        empedrado: 'Empedrado',
        itati: 'Itatí',
        paso: 'Paso de la Patria',
        Ramada: 'Ramada Paso',
        sancosme: 'San Cosme',
        santaana: 'Santa Ana de los Guacaras',
        resistencia: 'Resistencia'
    }),
    tipoalojamiento: t.enums({
       hotel:"hotel",
       casa:"casa",
       dpto:"departamento"
    }),

    primeravez: t.enums({
        si: 'Si',
        no: 'No'
    }),

    recomendaria: t.enums({
        si: 'Si', no: 'No', talvez: 'talvez'
    }),

    gastos: t.enums(
        {
            a: 'Menos de $500',
            b: 'de $500 a $1.000',
            c: 'entre $1.000 y $3.000',
            d: 'Más de $3.000',
            e: 'No sabe No Contesta'
        }),
});


var options = {
    fields: {
        viaje: {
            label: 'Con quien viaja?' // <= label for the name field
        },
        informo: {
            label: 'Como se infomó del evento?' // <= label for the name field
        },
        motivo: {
            label: 'Motivo del viaje?' // <= label for the name field
        },
        gastos: {
            label: 'Cuanto estima que gastó durante la estadia?' // <= label for the name field
        },
        calificacion: {
            label: 'Como califica el evento?' // <= label for the name field
        },
        recomendaria: {
            label: 'Recomendaria el evento?' // <= label for the name field
        },
        alojamiento: {
            label: 'Donde se aloja durante su estadía?' // <= label for the name field
        },
        tipoalojamiento: {
            label: 'Que tipo de Alojamiento?' // <= label for the name field
        },
        transporte: {
            label: 'Medio de transporte utilizado?' // <= label for the name field
        },
        primeravez: {
            label: 'Primera vez que?' // <= label for the name field
        },
        edad: {
            label: "Edad"
        },
        
    }
};


//  
// // // // // // // // // // // // 


const info = [];



export default class Encuesta extends React.Component {
    handleSubmit = async () => {
        // do the things  
        const value = this._form.getValue(); // use that ref to get the form value
        

        // refresco el estado de la variable info
        this.Refresh;

        console.log(info);
        
        


    }

    Refresh = async () => {
        try {
            let _info = await AsyncStorage.getItem('info');
            if (_info !== null) {//ya hay datos entonces refresco
                info = _info
            }
            else {
                ///esta vacio inicio la variable en vacio
                AsyncStorage.setItem('info','[]');//array vacio en string
            }
        } catch (error) {
            alert(error)
        }
    }

    

    render() {
        return (

            <View style={styles.padre}>
                <View style={styles.header}>
                    <Image source={require('../assets/images/iconito.png')} style={{ height: 50, resizeMode: "contain", flex: 1, marginLeft: 10 }}>

                    </Image>
                    <Text style={styles.titulo} >
                        Encuesta Carnaval
        </Text>
                    <Text style={{ flex: 1 }} >
                    </Text>
                </View>
                <ScrollView style={styles.scroll}>
                    <View style={styles.container}>

                        <Form
                            ref={c => this._form = c} // assign a ref
                            type={User}
                            options={options} />


                        <Button
                            title="Enviar"
                            onPress={this.handleSubmit}
                        />
                    </View >
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 50,
        backgroundColor: "grey",
        flexDirection: 'row',

    },
    scroll: {

    },
    padre: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        // backgroundColor: '#8fbd4d'

    },
    container: {
        // justifyContent: 'center',
        // flex:1,
        // marginTop: 50,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#8fbd4d',
        
        // backgroundColor: '#ffffff',
    },
    titulo: {
        // justifyContent:'center',
        textAlign: 'center',
        fontWeight: 'bold',
        color: "white",
        fontSize: 30,
        fontWeight: 'bold',
        flex: 9
    }
});
