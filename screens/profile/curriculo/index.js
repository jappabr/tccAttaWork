import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, useWindowDimensions, ScrollView } from 'react-native';
import { styles } from './styles';
import * as Print from 'expo-print';
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import API from '../../../utils/API';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    useFonts,
    Raleway_300Light,
    Raleway_500Medium,
} from '@expo-google-fonts/raleway';

import { getUser, getCurriculoPDF, setUser } from '../../../utils/user';
const createPDF = async () => {
    fetch(API + 'alluser/' + getUser())
        .then(res => res.json())
        .then(async (user) => {
            const html = await getCurriculoPDF(user);

            try {
                const { uri } = await Print.printToFileAsync({ html });
                if (Platform.OS === "ios") {
                    await Sharing.shareAsync(uri);
                } else {
                    const permission = await MediaLibrary.requestPermissionsAsync();
                    if (permission.granted) {
                        const res = await MediaLibrary.createAssetAsync(uri);
                        try {
                            const cUri = await FileSystem.getContentUriAsync(uri);

                            await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
                                data: cUri,
                                flags: 1,
                                type: "application/pdf",
                            });
                        } catch (e) {
                            console.log(e.message);
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            }
        });
};

export default function App() {
    const [alluser, setAlluser] = React.useState([]);
    const [fontsLoaded] = useFonts({
        Raleway_300Light,
        Raleway_500Medium,
    });
    React.useEffect(() => {
        fetch(API + 'alluser/' + getUser())
            .then(response => response.json())
            .then(data => {
                setAlluser(data)
            });
    }, []);
    return (!fontsLoaded ? <></> :
        <ScrollView style={styles.container}>
            <View style={styles.fundoPerfil}>
                <View style={{ paddingTop: 55 }}>
                    <Image
                        style={styles.profilePicture}
                        source={{ uri: alluser.profilePic }}
                    />

                </View>
                <Text style={{ fontSize: 24, fontFamily: 'Raleway_500Medium', color: "#fff", textTransform: 'uppercase', fontWeight: 'bold' }}>{alluser.curriculo?.nome}</Text>
                <Text style={{ fontSize: 18, fontFamily: 'Raleway_300Light', color: "#fff" }}>{alluser.curriculo?.cidade} - SP</Text>
                <Text style={{ fontSize: 18, fontFamily: 'Raleway_300Light', color: "#fff", paddingBottom: 2 }}>{alluser.email}{alluser.curriculo?.wpp ? ("- (11)" + alluser.curriculo.wpp) : " "}</Text>

            </View>
            <View style={{marginTop: 10}}>
                <Text style={{ fontSize: 20, fontFamily: 'Raleway_300Light', color: "#000", textTransform: 'uppercase', paddingLeft: 10, fontWeight: 'bold'}}>Formação Acadêmica</Text>
            </View>
            {alluser.formacs?.map(data => {
                return (
                    <View key={data.id} style={{ flexDirection: "column", margin: 10 }}>
                        <View style={{ flexDirection: "row", }}>
                            <Icon name="school" color="#0066CC" size={25} />
                            <Text style={{ fontSize: 20, fontFamily: 'Raleway_500Light', color: "#0066cc", marginBottom: 1 }}> {data.nomeEscola}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Icon name="chart-timeline" color="#204ac8" size={25} />
                            <Text style={{ fontSize: 20, fontFamily: 'Raleway_300Light', color: "#404040" }}> {data.desc}</Text>
                        </View>
                    </View>
                )
            })}
            <View style={styles.separa}></View>
            <View style={{marginTop: 10}}>
                <Text style={{ fontSize: 20, fontFamily: 'Raleway_300Light', color: "#000", textTransform: 'uppercase', paddingLeft: 10, fontWeight: 'bold'}}>Experiência</Text>
            </View>
            {alluser.xps?.map(data => {
                return (
                    <View key={data.id} style={{ flexDirection: "column", margin: 10 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Icon name="city-variant-outline" color="#0066CC" size={25} />
                            <Text style={{ fontSize: 20, fontFamily: 'Raleway_500Light', color: "#0066cc", marginBottom: 1 }}> {data.nomeEmpresa}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Icon name="briefcase-outline" color="#204ac8" size={25} />
                            <Text style={{ fontSize: 20, fontFamily: 'Raleway_300Light', color: "#404040" }}> {data.vaga}</Text>
                        </View>
                    </View>
                )
            })}
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={createPDF} style={styles.btnPDF}>
                    <Text style={styles.textPDF}>Baixar PDF</Text>
                    <Icon name="arrow-right-thick" style={{ color: "#fff" }} size={25} />
                    <Icon name="arrow-right-thick" style={{ color: "#fff" }} size={25} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}