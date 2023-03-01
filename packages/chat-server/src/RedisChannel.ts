import Redis from 'ioredis';
import { Channel } from './Channel';
import { redis } from './main';

export class RedisChannel implements Channel {
  redis: Redis;
  constructor() {
    this.redis = new Redis();
  }

  public publish(message: string | Buffer) {
    redis.publish('chat', message);
  }

  public subscribe(callback: (message: string | Buffer) => void) {
    const redisSub = redis.duplicate();
    redisSub.subscribe('chat');
    redisSub.on('message', (_, message) => {
      callback(message);
    });
  }
}
