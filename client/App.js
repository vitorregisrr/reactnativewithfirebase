import React, {useEffect} from 'react';
import {Provider as PaperProvider, Appbar} from 'react-native-paper';
import { YellowBox } from 'react-native';
import Navigation from './src/components/Navigation';
import firebase from 'firebase';
import {firebaseConfig} from './config';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const App = () => {
    useEffect(() => {
        YellowBox.ignoreWarnings(['Animated: `useNativeDriver`']);
    }, [])
    
    return (
        <PaperProvider>
            <Appbar.Header>
                <Appbar.Content
                    title="CRUD de Televisões"
                    subtitle="Projeto básico de estudos de aplicação serverless"/>
            </Appbar.Header>
            <Navigation></Navigation>
        </PaperProvider>
    )
}

export default App;