import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Image, AsyncStorage} from 'react-native';
import { Constants } from 'expo';
import t from 'tcomb-form-native';
import MultiSelect from 'react-native-multiple-select';


const Form = t.form.Form;

// // // // // // // // // // // // //
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
    otro_transporte: t.maybe(t.String),//condicional de transporte de viaje

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
    userid: t.String,timestamp: t.maybe(t.String)
});


var options = {
    fields: {
        userid:{
            hidden:true
        },
        timestamp:{
            hidden:true
        },

        procedencia:{
            label: "Procedencia",
            hidden: true
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
    userid: Constants.installationId,
    procedencia: null
}
//  
// // // // // // // // // // // // 





// listado de provincias y paises
var items = [
    {
    name: "Capital Federal",
    id: "Capital Federal",
    },
    {
        name: "Buenos Aires",
        id: "Buenos Aires",
    },
    {
        name: "Catamarca",
        id: "Catamarca",
    },
    {
        name: "Chaco",
        id: "Chaco",
    },
    {
        name: "Chubut",
        id: "Chubut",
    },
    {
        name: "Cordoba",
        id: "Cordoba",
    },
    {
        name: "Corrientes",
        id: "Corrientes",
    },
    {
        name: "Entre Rios",
        id: "Entre Rios",
    },
    {
        name: "Formosa",
        id: "Formosa",
    },
    {
        name: "Jujuy",
        id: "Jujuy",
    },
    {
        name: "La Pampa",
        id: "La Pampa",
    },
    {
        name: "La Rioja",
        id: "La Rioja",
    },
    {
        name: "Mendoza",
        id: "Mendoza",
    },
    {
        name: "Misiones",
        id: "Misiones",
    },
    {
        name: "Neuquen",
        id: "Neuquen",
    },
    {
        name: "Rio Negro",
        id: "Rio Negro",
    },
    {
        name: "Salta",
        id: "Salta",
    },
    {
        name: "San Juan",
        id: "San Juan",
    },
    {
        name: "San Luis",
        id: "San Luis",
    },
    {
        name: "Santa Cruz",
        id: "Santa Cruz",
    },
    {
        name: "Santa Fe",
        id: "Santa Fe",
    },
    {
        name: "Santiago del Estero",
        id: "Santiago del Estero",
    },
    {
        name: "Tierra del Fuego",
        id: "Tierra del Fuego",
    },
    {
        name: "Tucuman",
        id: "Tucuman",
    },
    {
        name: "Afganistan",
        id: "Afganistan"
    },
    {
        name: "Albania",
        id: "Albania"
    },
    {
        name: "Alemania",
        id: "Alemania"
    },
    {
        name: "Andorra",
        id: "Andorra"
    },
    {
        name: "Angola",
        id: "Angola"
    },
    {
        name: "Antartida",
        id: "Antartida"
    },
    {
        name: "Antigua y Barbuda",
        id: "Antigua y Barbuda"
    },
    {
        name: "Arabia Saudi",
        id: "Arabia Saudi"
    },
    {
        name: "Argelia",
        id: "Argelia"
    },
    {
        name: "Argentina",
        id: "Argentina"
    },
    {
        name: "Armenia",
        id: "Armenia"
    },
    {
        name: "Australia",
        id: "Australia"
    },
    {
        name: "Austria",
        id: "Austria"
    },
    {
        name: "Azerbaiyan",
        id: "Azerbaiyan"
    },
    {
        name: "Bahamas",
        id: "Bahamas"
    },
    {
        name: "Bahrain",
        id: "Bahrain"
    },
    {
        name: "Bangladesh",
        id: "Bangladesh"
    },
    {
        name: "Barbados",
        id: "Barbados"
    },
    {
        name: "Belgica",
        id: "Belgica"
    },
    {
        name: "Belice",
        id: "Belice"
    },
    {
        name: "Benin",
        id: "Benin"
    },
    {
        name: "Bermudas",
        id: "Bermudas"
    },
    {
        name: "Bielorrusia",
        id: "Bielorrusia"
    },
    {
        name: "Birmania Myanmar",
        id: "Birmania Myanmar"
    },
    {
        name: "Bolivia",
        id: "Bolivia"
    },
    {
        name: "Bosnia y Herzegovina",
        id: "Bosnia y Herzegovina"
    },
    {
        name: "Botswana",
        id: "Botswana"
    },
    {
        name: "Brasil",
        id: "Brasil"
    },
    {
        name: "Brunei",
        id: "Brunei"
    },
    {
        name: "Bulgaria",
        id: "Bulgaria"
    },
    {
        name: "Burkina Faso",
        id: "Burkina Faso"
    },
    {
        name: "Burundi",
        id: "Burundi"
    },
    {
        name: "Butan",
        id: "Butan"
    },
    {
        name: "Cabo Verde",
        id: "Cabo Verde"
    },
    {
        name: "Camboya",
        id: "Camboya"
    },
    {
        name: "Camerun",
        id: "Camerun"
    },
    {
        name: "Canada",
        id: "Canada"
    },
    {
        name: "Chad",
        id: "Chad"
    },
    {
        name: "Chile",
        id: "Chile"
    },
    {
        name: "China",
        id: "China"
    },
    {
        name: "Chipre",
        id: "Chipre"
    },
    {
        name: "Colombia",
        id: "Colombia"
    },
    {
        name: "Comores",
        id: "Comores"
    },
    {
        name: "Congo",
        id: "Congo"
    },
    {
        name: "Corea del Norte",
        id: "Corea del Norte"
    },
    {
        name: "Corea del Sur",
        id: "Corea del Sur"
    },
    {
        name: "Costa de Marfil",
        id: "Costa de Marfil"
    },
    {
        name: "Costa Rica",
        id: "Costa Rica"
    },
    {
        name: "Croacia",
        id: "Croacia"
    },
    {
        name: "Cuba",
        id: "Cuba"
    },
    {
        name: "Dinamarca",
        id: "Dinamarca"
    },
    {
        name: "Dominica",
        id: "Dominica"
    },
    {
        name: "Ecuador",
        id: "Ecuador"
    },
    {
        name: "Egipto",
        id: "Egipto"
    },
    {
        name: "El Salvador",
        id: "El Salvador"
    },
    {
        name: "El Vaticano",
        id: "El Vaticano"
    },
    {
        name: "Emiratos arabes Unidos",
        id: "Emiratos arabes Unidos"
    },
    {
        name: "Eritrea",
        id: "Eritrea"
    },
    {
        name: "Eslovaquia",
        id: "Eslovaquia"
    },
    {
        name: "Eslovenia",
        id: "Eslovenia"
    },
    {
        name: "España",
        id: "España"
    },
    {
        name: "Estados Unidos",
        id: "Estados Unidos"
    },
    {
        name: "Estonia",
        id: "Estonia"
    },
    {
        name: "Etiopia",
        id: "Etiopia"
    },
    {
        name: "Filipinas",
        id: "Filipinas"
    },
    {
        name: "Finlandia",
        id: "Finlandia"
    },
    {
        name: "Fiji",
        id: "Fiji"
    },
    {
        name: "Francia",
        id: "Francia"
    },
    {
        name: "Gabon",
        id: "Gabon"
    },
    {
        name: "Gambia",
        id: "Gambia"
    },
    {
        name: "Georgia",
        id: "Georgia"
    },
    {
        name: "Ghana",
        id: "Ghana"
    },
    {
        name: "Gibraltar",
        id: "Gibraltar"
    },
    {
        name: "Granada",
        id: "Granada"
    },
    {
        name: "Grecia",
        id: "Grecia"
    },
    {
        name: "Guam",
        id: "Guam"
    },
    {
        name: "Guatemala",
        id: "Guatemala"
    },
    {
        name: "Guinea",
        id: "Guinea"
    },
    {
        name: "Guinea Ecuatorial",
        id: "Guinea Ecuatorial"
    },
    {
        name: "Guinea Bissau",
        id: "Guinea Bissau"
    },
    {
        name: "Guyana",
        id: "Guyana"
    },
    {
        name: "Haiti",
        id: "Haiti"
    },
    {
        name: "Honduras",
        id: "Honduras"
    },
    {
        name: "Hungria",
        id: "Hungria"
    },
    {
        name: "India",
        id: "India"
    },
    {
        name: "Indian Ocean",
        id: "Indian Ocean"
    },
    {
        name: "Indonesia",
        id: "Indonesia"
    },
    {
        name: "Iran",
        id: "Iran"
    },
    {
        name: "Iraq",
        id: "Iraq"
    },
    {
        name: "Irlanda",
        id: "Irlanda"
    },
    {
        name: "Islandia",
        id: "Islandia"
    },
    {
        name: "Israel",
        id: "Israel"
    },
    {
        name: "Italia",
        id: "Italia"
    },
    {
        name: "Jamaica",
        id: "Jamaica"
    },
    {
        name: "Japon",
        id: "Japon"
    },
    {
        name: "Jersey",
        id: "Jersey"
    },
    {
        name: "Jordania",
        id: "Jordania"
    },
    {
        name: "Kazajstan",
        id: "Kazajstan"
    },
    {
        name: "Kenia",
        id: "Kenia"
    },
    {
        name: "Kirguistan",
        id: "Kirguistan"
    },
    {
        name: "Kiribati",
        id: "Kiribati"
    },
    {
        name: "Kuwait",
        id: "Kuwait"
    },
    {
        name: "Laos",
        id: "Laos"
    },
    {
        name: "Lesoto",
        id: "Lesoto"
    },
    {
        name: "Letonia",
        id: "Letonia"
    },
    {
        name: "Libano",
        id: "Libano"
    },
    {
        name: "Liberia",
        id: "Liberia"
    },
    {
        name: "Libia",
        id: "Libia"
    },
    {
        name: "Liechtenstein",
        id: "Liechtenstein"
    },
    {
        name: "Lituania",
        id: "Lituania"
    },
    {
        name: "Luxemburgo",
        id: "Luxemburgo"
    },
    {
        name: "Macedonia",
        id: "Macedonia"
    },
    {
        name: "Madagascar",
        id: "Madagascar"
    },
    {
        name: "Malasia",
        id: "Malasia"
    },
    {
        name: "Malawi",
        id: "Malawi"
    },
    {
        name: "Maldivas",
        id: "Maldivas"
    },
    {
        name: "Mali",
        id: "Mali"
    },
    {
        name: "Malta",
        id: "Malta"
    },
    {
        name: "Marruecos",
        id: "Marruecos"
    },
    {
        name: "Mauricio",
        id: "Mauricio"
    },
    {
        name: "Mauritania",
        id: "Mauritania"
    },
    {
        name: "Mexico",
        id: "Mexico"
    },
    {
        name: "Micronesia",
        id: "Micronesia"
    },
    {
        name: "Moldavia",
        id: "Moldavia"
    },
    {
        name: "Monaco",
        id: "Monaco"
    },
    {
        name: "Mongolia",
        id: "Mongolia"
    },
    {
        name: "Montserrat",
        id: "Montserrat"
    },
    {
        name: "Mozambique",
        id: "Mozambique"
    },
    {
        name: "Namibia",
        id: "Namibia"
    },
    {
        name: "Nauru",
        id: "Nauru"
    },
    {
        name: "Nepal",
        id: "Nepal"
    },
    {
        name: "Nicaragua",
        id: "Nicaragua"
    },
    {
        name: "Niger",
        id: "Niger"
    },
    {
        name: "Nigeria",
        id: "Nigeria"
    },
    {
        name: "Noruega",
        id: "Noruega"
    },
    {
        name: "Nueva Zelanda",
        id: "Nueva Zelanda"
    },
    {
        name: "Oman",
        id: "Oman"
    },
    {
        name: "Paises Bajos",
        id: "Paises Bajos"
    },
    {
        name: "Pakistan",
        id: "Pakistan"
    },
    {
        name: "Palau",
        id: "Palau"
    },
    {
        name: "Panama",
        id: "Panama"
    },
    {
        name: "Papua Nueva Guinea",
        id: "Papua Nueva Guinea"
    },
    {
        name: "Paraguay",
        id: "Paraguay"
    },
    {
        name: "Peru",
        id: "Peru"
    },
    {
        name: "Polonia",
        id: "Polonia"
    },
    {
        name: "Portugal",
        id: "Portugal"
    },
    {
        name: "Puerto Rico",
        id: "Puerto Rico"
    },
    {
        name: "Qatar",
        id: "Qatar"
    },
    {
        name: "Reino Unido",
        id: "Reino Unido"
    },
    {
        name: "Republica Centroafricana",
        id: "Republica Centroafricana"
    },
    {
        name: "Republica Checa",
        id: "Republica Checa"
    },
    {
        name: "Republica Democratica del Congo",
        id: "Republica Democratica del Congo"
    },
    {
        name: "Republica Dominicana",
        id: "Republica Dominicana"
    },
    {
        name: "Ruanda",
        id: "Ruanda"
    },
    {
        name: "Rumania",
        id: "Rumania"
    },
    {
        name: "Rusia",
        id: "Rusia"
    },
    {
        name: "Sahara Occidental",
        id: "Sahara Occidental"
    },
    {
        name: "Samoa",
        id: "Samoa"
    },
    {
        name: "San Cristobal y Nevis",
        id: "San Cristobal y Nevis"
    },
    {
        name: "San Marino",
        id: "San Marino"
    },
    {
        name: "San Vicente y las Granadinas",
        id: "San Vicente y las Granadinas"
    },
    {
        name: "Santa Lucia",
        id: "Santa Lucia"
    },
    {
        name: "Santo Tome y Principe",
        id: "Santo Tome y Principe"
    },
    {
        name: "Senegal",
        id: "Senegal"
    },
    {
        name: "Seychelles",
        id: "Seychelles"
    },
    {
        name: "Sierra Leona",
        id: "Sierra Leona"
    },
    {
        name: "Singapur",
        id: "Singapur"
    },
    {
        name: "Siria",
        id: "Siria"
    },
    {
        name: "Somalia",
        id: "Somalia"
    },
    {
        name: "Southern Ocean",
        id: "Southern Ocean"
    },
    {
        name: "Sri Lanka",
        id: "Sri Lanka"
    },
    {
        name: "Swazilandia",
        id: "Swazilandia"
    },
    {
        name: "Sudafrica",
        id: "Sudafrica"
    },
    {
        name: "Sudan",
        id: "Sudan"
    },
    {
        name: "Suecia",
        id: "Suecia"
    },
    {
        name: "Suiza",
        id: "Suiza"
    },
    {
        name: "Surinam",
        id: "Surinam"
    },
    {
        name: "Tailandia",
        id: "Tailandia"
    },
    {
        name: "Taiwan",
        id: "Taiwan"
    },
    {
        name: "Tanzania",
        id: "Tanzania"
    },
    {
        name: "Tayikistan",
        id: "Tayikistan"
    },
    {
        name: "Togo",
        id: "Togo"
    },
    {
        name: "Tokelau",
        id: "Tokelau"
    },
    {
        name: "Tonga",
        id: "Tonga"
    },
    {
        name: "Trinidad y Tobago",
        id: "Trinidad y Tobago"
    },
    {
        name: "Tunez",
        id: "Tunez"
    },
    {
        name: "Turkmekistan",
        id: "Turkmekistan"
    },
    {
        name: "Turquia",
        id: "Turquia"
    },
    {
        name: "Tuvalu",
        id: "Tuvalu"
    },
    {
        name: "Ucrania",
        id: "Ucrania"
    },
    {
        name: "Uganda",
        id: "Uganda"
    },
    {
        name: "Uruguay",
        id: "Uruguay"
    },
    {
        name: "Uzbekistan",
        id: "Uzbekistan"
    },
    {
        name: "Vanuatu",
        id: "Vanuatu"
    },
    {
        name: "Venezuela",
        id: "Venezuela"
    },
    {
        name: "Vietnam",
        id: "Vietnam"
    },
    {
        name: "Yemen",
        id: "Yemen"
    },
    {
        name: "Djibouti",
        id: "Djibouti"
    },
    {
        name: "Zambia",
        id: "Zambia"
    },
    {
        name: "Zimbabue",
        id: "Zimbabue"

    }
];



export default class Encuesta extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            options: options , 
            value:default_values,
            selectedItems:[]
        };
    }

    onSelectedItemsChange = selectedItems => {
        this.setState({ selectedItems });
        console.log(selectedItems)
        var update_values = this.state.value;
        
        
        console.log(update_values);
        console.log(selectedItems[0]);
        update_values.procedencia = selectedItems[0];
        this.setState({value:update_values})
    };
    



    saveData = async () => {
        try {
            
            nuevo = this._form.getValue(); // use that ref to get the form value
            ///get current data
            if(!nuevo){
                alert("complete todo los campos")
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
            this.setState({ value: null });
            this.props.navigation.navigate("Home")
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

        var d = new Date()
        value.timestamp = d.getTime()+""
       
       


        this.setState({ options: update_options, value: value });
    }



    render() {
        const { selectedItems } = this.state;
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
                       <View>
                            <Text style={{
                                fontSize: 17, marginBottom: 10,
        fontWeight: '500'}}>Procedencia</Text>
                                
                        
                        </View>
                        <MultiSelect
                            hideTags
                            items={items}
                            uniqueKey="id"
                            ref={(component) => { this.multiSelect = component }}
                            onSelectedItemsChange={this.onSelectedItemsChange}
                            selectedItems={selectedItems}
                            selectText="Procedencia"
                            searchInputPlaceholderText="Buscar..."
                            onChangeInput={(text) => console.log(text)}
                            // altFontFamily="ProximaNova-Light"
                            tagRemoveIconColor="#CCC"
                            tagBorderColor="#CCC"
                            tagTextColor="#CCC"
                            selectedItemTextColor="#CCC"
                            selectedItemIconColor="#CCC"
                            itemTextColor="#000"
                            displayKey="name"
                            single={true}
                            searchInputStyle={{ color: '#CCC' }}
                            submitButtonColor="#CCC"
                            submitButtonText="Submit"
                        />
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


