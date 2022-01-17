import Matter from 'matter-js'
import Bird from "../components/Bird";
import Floor from "../components/Floor";
import {Dimensions} from "react-native";
import Obstacle from "../components/Obstacle";
import {getPipeSizePosPair} from "../utils/random";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width


export default restart => {
    let engine = Matter.Engine.create({enableSleeping: false})

    let world = engine.world

    world.gravity.y = 0.8;

    const pipeSizePosA = getPipeSizePosPair()
    const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.7)
    const pipeSizePosC  = getPipeSizePosPair(windowWidth * 1.4)


    return {
        physics: {engine, world},

        Bird: Bird(world, 'red', {x: 50, y: 300}, {width: 40, height: 40}),

        ObstacleTop1: Obstacle(world, 'ObstacleTop1', 'blue', pipeSizePosA.pipeTop.pos, pipeSizePosA.pipeTop.size),
        ObstacleBottom1: Obstacle(world, 'ObstacleBottom1', '#14d49f', pipeSizePosA.pipeBottom.pos, pipeSizePosA.pipeBottom.size),

        ObstacleTop2: Obstacle(world, 'ObstacleTop2', 'blue', pipeSizePosB.pipeTop.pos, pipeSizePosB.pipeTop.size),
        ObstacleBottom2: Obstacle(world, 'ObstacleBottom2', '#14d49f', pipeSizePosB.pipeBottom.pos, pipeSizePosB.pipeBottom.size),

        ObstacleTop3: Obstacle(world, 'ObstacleTop3', 'blue', pipeSizePosC.pipeTop.pos, pipeSizePosC.pipeTop.size),
        ObstacleBottom3: Obstacle(world, 'ObstacleBottom3', '#14d49f', pipeSizePosC.pipeBottom.pos, pipeSizePosC.pipeBottom.size),

        Floor: Floor(world, 'green', {x: windowWidth / 2 , y: windowHeight}, {width: windowWidth, height: 20}) // Порядок расположения height и width важен

    }
}