import { PusherClient } from './PusherClient';
import * as Pusher from 'pusher'
import * as PusherJS from 'pusher-js'

import { PusherInterface } from './../../interfaces/PusherInterface'

/*


var pusher = new Pusher();




/*

//const channel = socket.subscribe('my-channel');

export const pusherTrigger = (channelClient: string, eventClient: string): Pusher => {
    pusher.trigger(channelClient, eventClient, {
        "message": "hello world"
    }) 

    /*channel.bind('my-event', function (data) {
        console.log(`AQUI - ${data.message}`);
    })
}

export interface PusherClients extends Pusher {
    pusherTrigger(pusher: Pusher)
}*/




let pusher = null;

const { PUSHER_APP_ID, PUSHER_APP_KEY, PUSHER_APP_SECRET } = process.env

//
const socket = new PusherJS(PUSHER_APP_KEY, {
    cluster: 'us2',
    encrypted: true
});
/*PusherJS.log = (msg: string): void => {
    console.log(msg);
};*/
const channel = socket.subscribe('my-channel');
channel.bind('my-event', function (data) {
    console.log(`AQUI - ${data.message}`);
})
//
 
if(!pusher) {
    pusher = {}
    
    const pusherObject: Pusher =  new Pusher({
            appId:   PUSHER_APP_ID,
              key:   PUSHER_APP_KEY,
           secret:   PUSHER_APP_SECRET,
          cluster:   'us2',
        encrypted:   true
    })

    const PusherClientObject = new PusherClient(pusherObject)
    PusherClientObject.trigger('my-channel', 'my-event')

    pusher['pusher'] = PusherClientObject
}

export default <PusherInterface>pusher