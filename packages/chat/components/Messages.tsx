import { useEffect, useRef } from 'react';
import { Message } from 'chat-protocol';
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
        {messages.map(({ user, id, content, date }) => (
          <MessageComponent
            username={user}
            key={id}
            content={content}
            date={date}
          />
        ))}
      </ul>
      <div ref={bottom}></div>
    </div>
  );
}
