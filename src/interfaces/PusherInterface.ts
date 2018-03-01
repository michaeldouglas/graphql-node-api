import { pusher } from './../library/Pusher/PusherClient';


export interface PusherInterface {
    pusherTriggers: pusher,
    trigger(channelClient: string, eventClient: string, data: object)
}