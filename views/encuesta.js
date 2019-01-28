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
        solo: 'Solo',
        pareja: 'Pareja',
        familia: 'Familia',
        amigos: 'Amigos',
    }),
    viaje_cantidad: t.maybe(t.Number),///autofill, condicional por viaje
    informo: t.enums({
        internet: 'Redes Sociales (Facebook, Instagram, Twitter, Whatsapp)',
        medios: 'Medios de Comunicación (tv, radio)',
        otro:'Otro'
    }),
    otros_informo: t.maybe(t.String),//condicional de por donde se informo
    motivo: t.enums({
        vacaciones: 'Vacaciones',
        religion: 'Religion',
        trabajo: "Trabajo",
        visita: "Visita Flia/Amigos",
        salud: "Salud",
        otro: "Otro"
    }),
    otro_motivo: t.maybe(t.String),//condicional de motivo de viaje
    transporte: t.enums({
        omnibus: 'Omnibus',
        auto: 'Automovil',
        corrientes: 'Aeropuerto Corrientes',
        resistencia: 'Aeropuerto Resistencia',
        moto: 'Moto',
        otro: 'Otro'
    }),
    otro_transporte: t.String,//condicional de transporte de viaje

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
       hotel:"Hotel",
       casa:"Casa",
       dpto:"Departamento"
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
        procedencia:{
            label: "Procedencia",
        },
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
            label: 'En que tipo de Alojamiento?' // <= label for the name field
        },
        transporte: {
            label: 'Medio de transporte utilizado?' // <= label for the name field
        },
        primeravez: {
            label: 'Primera vez que asiste?' // <= label for the name field
        },
        edad: {
            label: "Edad", maxLength:2
        },

        // condicionales
        otro_motivo:
        {
            label: "Cual?",hidden:true
        },
        otros_informo: {
            label: "Cual?", hidden: true
        },
        otro_transporte: {
            label: "Cual?", hidden: true
        },
        viaje_cantidad:{
            label: "Cuantos?", hidden: true, maxLength: 2
        }
        
    }
};

var default_values = {
    procedencia:"Corrientes"
}
//  
// // // // // // // // // // // // 


const info = [];

const formStyles = {
    ...Form.stylesheet,
    controlLabel: {
        normal: {
            color: 'blue',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        },
        error: {
            color: 'red',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        }
    }
}

export default class Encuesta extends React.Component {
    constructor(props) {
        super(props);
        this.state = { options: options , value:default_values};
    }



    saveData = async () => {
        try {
            const nuevo = this._form.getValue(); // use that ref to get the form value
            ///get current data
            if(!nuevo){
                return
            }
            
            let data = await AsyncStorage.getItem('data');
            if (data !== null)//ya hay algo cargado?
            {
                //convierto string a objeto !
                var data = JSON.parse(data);
                //nuevo objeto 
                // var nuevo = { nombre: 'ivan', apellido: 'sambrana' };
                
                //inserto nuevo objeto
                data.push(nuevo);
                //convierto de nuevo a string!
                data = JSON.stringify(data);
                //guardo en el coso
                AsyncStorage.setItem('data', data);
                //muestro en consola
                console.log("data")
                console.log(data);

            }
            else {//es el primero asi que se inicializa
                data = [];
                data.push(nuevo);
                AsyncStorage.setItem('data', JSON.stringify(data));
                console.log("array")
                console.log(data);

            }

            alert("Encuesta Guardada")

        } catch (error) {
            console.log(error)
        }

    }
  
    onChange = (value)=>{
        var update_options = this.state.options;
        
        // como se informo del evento?
        
       if(value.informo){ if(value.informo == 'otro'){
            update_options = t.update(update_options, {
                fields: { otros_informo: {  hidden: { '$set': false } } }
            });
        }
        else{
            update_options = t.update(update_options, {
                fields: { otros_informo: { hidden: { '$set': true }}
                }
            });
        }}

        /// motivo del viaje
        if (value.motivo){if (value.motivo == 'otro') {
            update_options = t.update(update_options, {
                fields: {otro_motivo: {hidden: { '$set': false }}}
            });
        }
        else {
            update_options = t.update(update_options, {
                fields: { otro_motivo: { hidden: { '$set': true }}}
            });
        }}
        /// transporte
        if(value.informo){if (value.transporte == 'otro') {
            update_options = t.update(update_options, {
                fields: { otro_transporte: { hidden: { '$set': false } } }
            });
        }
        else {
            update_options = t.update(update_options, {
                fields: { otro_transporte: { hidden: { '$set': true } } }
            });
        }}
        /// grupo familiar
        if(value.viaje){if (value.viaje == 'familia' || value.viaje == 'amigos') {
            update_options = t.update(update_options, {
                fields: { viaje_cantidad: { hidden: { '$set': false } } }
            });
        }
        else {
            update_options = t.update(update_options, {
                fields: { viaje_cantidad: { hidden: { '$set': true } } }
            });
        }
        ///autofill si es solo o pareja
            if (value.viaje == 'solo') {
                value.viaje_cantidad = 1;
            }
            if (value.viaje == 'pareja') {
                value.viaje_cantidad = 2;
            }
        }
        
       
       


        this.setState({ options: update_options, value: value });
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
                            options={this.state.options}
                            value={this.state.value}
                            onChange={this.onChange}

                            />
                            

                        <Button
                            title="Enviar"
                            onPress={this.saveData}
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
        backgroundColor: '#88b14b',
        
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
})

// t.form.Form.stylesheet.textbox.normal.color = 'white';
// t.form.Form.stylesheet.controlLabel.normal.color ="white";
t.form.Form.stylesheet.textbox.normal.backgroundColor = "white";
t.form.Form.stylesheet.select.normal.backgroundColor = "white";
t.form.Form.stylesheet.select.normal.borderRadius= 4


