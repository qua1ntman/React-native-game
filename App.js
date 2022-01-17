import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GameEngine} from "react-native-game-engine";
import entities from './entities'
import Physics from './physics'
import {Touchable} from "react-native-web";
import Matter from "matter-js";



export default function App() {

    const [running, setRunning] = useState (false)
    const [gameEngine, setGameEngine] = useState (null)
    const [currentPoints, setCurrentPoints] = useState(0)

    useEffect(() => {
        setRunning(false)
    }, [])
  return (
    <View style={{flex: 1}}>
      <GameEngine
        ref={(ref) => {setGameEngine(ref)}}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={(e) => {
            switch(e.type) {
                case 'game_over':
                    setRunning(false)
                    gameEngine.stop()
                    // setCurrentPoints(`Your score is \n ${currentPoints}`)
                    break;
                case 'new_points':
                    setCurrentPoints(currentPoints + 1)
                    break;
            }
        }}
        style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
      >
          <StatusBar style="auto" hidden={true}/>

      </GameEngine>
        {running ? <Text style={{textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 10}}>{currentPoints}</Text>
          : <>
                <Text style={{textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 10}}>Your score is:</Text>
                <Text style={{textAlign: 'center', fontSize: 40, fontWeight: 'bold'}}>{currentPoints}</Text>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                   <TouchableOpacity style={{backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10}}
                      onPress={() => {
                          setCurrentPoints(0)
                      setRunning(true)
                      gameEngine.swap(entities())
                      }}
                   >
                       <Text style={{fontWeight: 'bold', color: 'white', fontSize: 30}}>
                           START GAME
                       </Text>
                   </TouchableOpacity>
                </View>
            </>
            }
    </View>
  );
}


