import { useEffect, useRef, useState } from 'react';
import style from './Prompt.module.sass';

export default function Prompt({
  onSendMessage,
}: {
  onSendMessage: (content: string) => void;
}) {
  const [content, setContent] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => inputRef.current.focus(), []);

  const sendMessage = () => {
    onSendMessage(content);
    setContent('');
    inputRef.current.focus();
  };

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        sendMessage();
      }}
    >
      <div className={style.prompt}>
        <div className={style.ps1}>{'> '}</div>
        <input
          autoFocus
          className={style.messageinput}
          type="text"
          value={content}
          onChange={(ev) => setContent(ev.target.value)}
          ref={inputRef}
        />
        <button type="submit">Send</button>
      </div>
    </form>
  );
}
