import * as PusherObject from 'pusher'

class PusherClient {
    
    private Pusher: PusherObject

    constructor(Pusher: PusherObject) {
        this.Pusher = Pusher
    }

    trigger(channelClient: string, eventClient: string):PusherObject {
        let trigger = this.Pusher.trigger(channelClient, eventClient, {
            "message": "hello world"
        })

        return trigger
    }
}

export { PusherClient }