import { useEffect, useRef } from 'react';
import { Message } from '../lib/chat';
import MessageComponent from './Message';
import style from './Messages.module.sass';

type MessagesProps = {
  messages: Message[];
};

export default function Messages({ messages }: MessagesProps) {
  const bottom = useRef<HTMLDivElement>(null);
  useEffect(() => bottom.current?.scrollIntoView());

  return (
    <div className={style.messages}>
      <ul>
        {messages.map(({ id, content }) => (
          <MessageComponent key={id} content={content} />
        ))}
      </ul>
      <div ref={bottom}></div>
    </div>
  );
}
