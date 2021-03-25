import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, FlatList, View } from 'react-native';
import * as Location from 'expo-location';

import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Conditions from '../../components/Conditions';
import Forecast from '../../components/Forecast';

import api, { key } from '../../services/api'

const mylist = [
    {
        "date": "23/03",
        "weekday": "Ter",
        "max": 28,
        "min": 18,
        "description": "Tempestades isoladas",
        "condition": "storm"
    },
    {
        "date": "24/03",
        "weekday": "Qua",
        "max": 28,
        "min": 18,
        "description": "Tempestades",
        "condition": "clear_day"
    },
    {
        "date": "25/03",
        "weekday": "Qui",
        "max": 27,
        "min": 17,
        "description": "Tempestades",
        "condition": "storm"
    },
    {
        "date": "26/03",
        "weekday": "Sex",
        "max": 28,
        "min": 18,
        "description": "Tempestades",
        "condition": "storm"
    },
    {
        "date": "27/03",
        "weekday": "Sáb",
        "max": 30,
        "min": 18,
        "description": "Tempestades",
        "condition": "storm"
    },
    {
        "date": "28/03",
        "weekday": "Dom",
        "max": 30,
        "min": 19,
        "description": "Ensolarado com muitas nuvens",
        "condition": "cloudly_day"
    },
    {
        "date": "29/03",
        "weekday": "Seg",
        "max": 27,
        "min": 19,
        "description": "Tempestades",
        "condition": "storm"
    },
    {
        "date": "30/03",
        "weekday": "Ter",
        "max": 25,
        "min": 19,
        "description": "Tempestades",
        "condition": "storm"
    },
    {
        "date": "31/03",
        "weekday": "Qua",
        "max": 22,
        "min": 17,
        "description": "Tempestades isoladas",
        "condition": "storm"
    },
    {
        "date": "01/04",
        "weekday": "Qui",
        "max": 21,
        "min": 15,
        "description": "Parcialmente nublado",
        "condition": "cloudly_day"
    }
];

export default function Home() {
    const [errorMsg, setErrorMsg] = useState(null)
    const [loading, setLoading] = useState(true)
    const [weather, setWeather] = useState([]);
    const [icon, setIcon] = useState({ name: 'cloud', color: '#FFF' });
    const [background, setBackground] = useState(['#1ed6ff', '#97c1ff'])

    useEffect(() => {

        (async () => {
            let { status } = await Location.requestPermissionsAsync();

            if (status !== 'granted') {
                setErrorMsg('Permissão negada para acessar a localização');
                setLoading(false);
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            //   console.log(location.coords);

            //weather?key=e0dfc7e7&lat=-23.682&lon=-46.875
            const response = await api.get(`/weather?key=${key}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`);




            switch (response.data.results.condition_slug) {
                case 'clear_day':
                    setIcon({ name: 'partly-sunny', color: '#FFB300' });
                    break;
                case 'rain':
                    setIcon({ name: 'rainy', color: '#FFF' });
                    break;
                case 'storm':
                    setIcon({ name: 'rainy', color: '#FFF' });
                    break;
            }

            setLoading(false);

        })();
    }, []);





    return (
        <SafeAreaView style={styles.container}>

            <Menu />

            <Header />

            <Conditions />

            <FlatList
                horizontal={true}
                contentContainerStyle={{ paddingBottom: '5%' }}
                style={styles.list}
                data={mylist}
                keyExtractor={item => item.date}
                renderItem={({ item }) => <Forecast data={item} />}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e8f0ff',
        paddingTop: '5%',
    },
    list: {
        marginTop: 10,
        marginLeft: 10,
    }
})