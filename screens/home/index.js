import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {styles} from "./styles";
import API from '../../utils/API'
import { Empty } from "../../components/Empty";

export default function HomeScreen() {
    const [posts, setPosts] = React.useState([]);
    useEffect(() => {
        fetch(API + 'news')
            .then(response => response.json())
            .then(data => {
            setPosts(data)
        });
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Notícias</Text>
            </View>

            <FlatList
                style={styles.feed}
                data={posts}
                ListEmptyComponent={({item}) => (
                  <View>
                    <Empty text="Sem Dados"></Empty>
                  </View>
                )}
                renderItem={({ item }) => {
                    const post = item;
                    return(
                    <View style={styles.feedItem}>
                        <Image source={require('../../assets/icon.png')} style={styles.avatar} />
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <View>
                                    <Text style={styles.name}>Novidades - {post.title}</Text>
                                </View>

                            </View>
                            <Text style={styles.post}>{post.text}</Text>
                            <Image source={{uri:post.image}} style={styles.postImage} resizeMode="cover" />
                        </View>
                    </View>
                )}}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            ></FlatList>
        </View>
    );
}