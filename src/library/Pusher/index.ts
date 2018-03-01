import * as PusherJS from 'pusher-js'

import { pusher } from './PusherClient';
import { PusherInterface } from './../../interfaces/PusherInterface'


let Pusher = null

if(!Pusher) {
    Pusher = {}
    
    Pusher['pusherTriggers'] = new pusher   
}

export default <PusherInterface>Pusher