import Redis from 'ioredis';
import { ChannelBackend } from './Channel';
import { redis } from './main';

export class RedisChannelBackend implements ChannelBackend {
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
