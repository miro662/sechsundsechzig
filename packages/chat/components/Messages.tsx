import { ReactElement, useEffect, useRef } from 'react';
import MessageComponent from './Message';
import style from './Messages.module.sass';

interface MessageItem {
  type: 'messsage';
  id: string;
  user: string;
  content: string;
  date: Date;
}

interface ServerNotificationItem {
  type: 'server_notification';
  id: string;
  content: string;
  date: Date;
}

export type Item = MessageItem | ServerNotificationItem;

function itemToComponent(item: Item): ReactElement {
  switch (item.type) {
    case 'messsage':
      return (
        <MessageComponent
          username={item.user}
          key={item.id}
          content={item.content}
          date={item.date}
        />
      );
    case 'server_notification':
      return (
        <MessageComponent
          key={item.id}
          content={item.content}
          date={item.date}
        />
      );
  }
}

type MessagesProps = {
  items: Item[];
};

export default function Messages({ items }: MessagesProps) {
  const bottom = useRef<HTMLDivElement>(null);
  useEffect(() => bottom.current?.scrollIntoView());

  return (
    <div className={style.messages}>
      <ul>{items.map(itemToComponent)}</ul>
      <div ref={bottom}></div>
    </div>
  );
}
