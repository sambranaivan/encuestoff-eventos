import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Image } from 'react-native';
import { Constants } from 'expo';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
    procedencia: t.String,
    sexo: t.enums({
        'F': 'Femenino',
        'M': 'Masculino'
    }, 'Sexo'),
    edada: t.Boolean,
    edadb: t.Boolean,
    edadc: t.Boolean,
    edadd: t.Boolean,
    edade: t.Boolean,
    profesion: t.enums({
        'Empleado': 'Empleado',
        'Estudiante': 'Estudiante',
        'Ama de Casa': 'Ama de Casa',
        'Desocupado': 'Desocupado',
        'Otro': 'Otro'
    }),
    viaje: t.enums({
        'Solo': 'Solo',
        'Pareja': 'Pareja',
        'Familia': 'Familia',
        'Amigos': 'Amigos',
    }),
    informo: t.enums({
        internet: 'Internet, Redes Sociales',
        medios: 'Medios de Comunicación'
    }),
    motivo: t.enums({
        ocio: 'Ocio, Recreación, Vacaciones',
        religion: 'Medios de Comunicación',
        trabajo: "Trabajo",
        visita: "Visita Flia/Amigos",
        salud: "Salud",
        otro: "Otro"
    }),
    transporte: t.enums({
        corrientes: 'Aeropuerto Corrientes',
        resistencia: 'Aeropuerto Resistencia',
        auto: 'Automovil',
        omnibus: 'Omnibus',
        motorhome: 'Motorhome',
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

    primeravez: t.enums({
        si: 'Si',
        no: 'No'
    }),

    recomendaria: t.enums({
        si: 'Si', no: 'No', talvez: 'talvez'
    }),

    gastos: t.enums(
        {
            a: 'Menos de $2000',
            b: 'de $2.000 a $5.000',
            c: 'entre $5.000 y $10.000',
            d: 'Más de $20.000',
            e: 'No sabe No Contesta'
        }),

    calificacion: t.enums({
        a: 'Exccelente',
        b: 'Bueno',
        c: 'Regular',
        d: 'Malo',
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
        transporte: {
            label: 'Medio de transporte utilizado?' // <= label for the name field
        },
        primeravez: {
            label: 'Primera vez que?' // <= label for the name field
        },
        edada: {
            label: "Edad de 0 a 14 Años"
        },
        edadb: {
            label: "de 15 a 24 Años"
        },
        edadc: {
            label: "de 25 a 54 Años"
        },
        edade: {
            label: "65 Años o más"
        },
        edadd: {
            label: "de 55 a 64 Años"
        },

    }
};


export default class Encuesta extends React.Component {
    handleSubmit = () => {
        // do the things  
        const value = this._form.getValue(); // use that ref to get the form value
        console.log('value: ', value);

        // MANDAR value a la funcion de guardar
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

    },
    container: {
        // justifyContent: 'center',
        // flex:1,
        // marginTop: 50,
        paddingLeft: 20,
        paddingRight: 20,

        // backgroundColor: '#ffffff',
    },
    titulo: {
        // justifyContent:'center',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        fontWeight: 'bold',
        flex: 9
    }
});
