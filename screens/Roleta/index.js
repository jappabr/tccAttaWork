
import { useState, useRef, useCallback, useEffect } from 'react';
import { View, Animated, PanResponder, Linking } from 'react-native';
import { Card } from '../../components/Card';
import { Footer } from '../../components/Footer';
import { THEME } from '../../theme';
import API from '../../utils/API';

import { styles } from './styles';

export function Roleta() {
    const [cards, setCards] = useState([]);
    let cardsJson 
    const swipe = useRef(new Animated.ValueXY()).current;
    const tiltSign = useRef(new Animated.Value(1)).current;

    useEffect(() => {
    fetch(API + 'cards')
    .then(response => response.json())
      .then(data =>{
        setCards(data)
        cardsJson= data
      })
    }, []);

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, {dx: x, dy: y, y0}) => {
            swipe.setValue({ x, y:0 }),
            tiltSign.setValue(y0 > THEME.CARD.HEIGHT / 2 ? 1 : -1)
        },
        onPanResponderRelease:  (_, {dx, dy}) => {
            const direction = Math.sign(dx);
            const isActionActive = Math.abs(dx) > 100;

            if(isActionActive) {
                Animated.timing(swipe, {
                    duration: 500,
                    toValue: {
                        x: direction * THEME.CARD.OUT_OF_SCREEN,
                        y: dy
                    },
                    useNativeDriver: true
                }).start(()=>removeTopCard(direction));
            } else {
                Animated.spring(swipe, {
                    toValue: {
                        x: 0, y: 0
                    },
                    useNativeDriver: true,
                    friction: 5
                }).start();
            }
        },
    });
    
    const removeTopCard = useCallback((direction) => {
        setCards((prevState) => {
        if(direction==-1){
          Linking.openURL('http://api.whatsapp.com/send?phone=5511' + prevState[0].wpp + '&text=Olá, vim pelo aplicativo do AttaWork e tenho interesse na vaga: ' + prevState[0].title)
        }
          if(prevState.length == 1){
              return cardsJson
          }
          else
            return prevState.slice(1)
        });
        swipe.setValue({x: 0, y: 0});
    }, [swipe, cardsJson]);

    const handleChoice = useCallback((direction) => { // TODO navigate Chat
        Animated.timing(swipe.x, {
            toValue: direction * THEME.CARD.OUT_OF_SCREEN,
            duration: 500,
            useNativeDriver: true,
        }).start(()=>removeTopCard(direction))
    }, [removeTopCard, swipe.x]);

    return (
        <View style={styles.container}>
            {cards?.map(({id, title, desc, bannerUrl}, index) => {
                const isFirst = index == 0;

                const dragHandlers = isFirst ? panResponder.panHandlers : {};


                return <Card key={id} name={title} desc={desc} source={bannerUrl} isFirst={isFirst} swipe={swipe} tiltSign={tiltSign} {...dragHandlers}/>
            }).reverse()}

            <Footer handleChoice={handleChoice} />
        </View>
    );
}
