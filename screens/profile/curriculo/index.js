import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import {styles} from './styles';
import * as Print from 'expo-print';
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import API from '../../../utils/API';
import { getUser, getCurriculoPDF } from '../../../utils/user';
const createPDF = async() => {
    fetch(API + 'alluser/' + getUser())
        .then(res => res.json())
        .then(async(user) => {
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
                          }catch(e){
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
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={createPDF} style={{backgroundColor: "#f00", height: 100, marginTop: 10}}>
        <Text>AINNNN TAMEMAXUCANU</Text>
      </TouchableOpacity>
    </View>
  );
}