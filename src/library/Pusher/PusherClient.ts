import * as PusherObject from 'pusher'

const { PUSHER_APP_ID, PUSHER_APP_KEY, PUSHER_APP_SECRET } = process.env

export class pusher {
    
    private Pusher: PusherObject

    constructor() {
        this.Pusher = new PusherObject({
                appId:   PUSHER_APP_ID,
                  key:   PUSHER_APP_KEY,
               secret:   PUSHER_APP_SECRET,
              cluster:   'us2',
            encrypted:   true
        })
    }

    trigger(channelClient: string, eventClient: string, data: object = {}) {
        let trigger = this.Pusher.trigger(channelClient, eventClient, data)
        return trigger
    }
}