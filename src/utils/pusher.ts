import * as Pusher from 'pusher'
import * as PusherJS from 'pusher-js'

const { PUSHER_APP_ID, PUSHER_APP_KEY, PUSHER_APP_SECRET } = process.env

var pusher = new Pusher({
    appId: PUSHER_APP_ID,
    key: PUSHER_APP_KEY,
    secret: PUSHER_APP_SECRET,
    cluster: 'us2',
    encrypted: true
});

const socket = new PusherJS(PUSHER_APP_KEY, {
    cluster: 'us2',
    encrypted: true
});


/*PusherJS.log = (msg: string): void => {
    console.log(msg);
};*/

const channel = socket.subscribe('my-channel');

export const pusherTrigger = (): void => {
    pusher.trigger('my-channel', 'my-event', {
        "message": "hello world"
    }) 

    channel.bind('my-event', function (data) {
        console.log(`AQUI - ${data.message}`);
    })
}