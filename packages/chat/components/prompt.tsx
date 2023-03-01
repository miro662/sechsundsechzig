import { useState } from 'react';

export default function Prompt({
  onSendMessage,
}: {
  onSendMessage: (content: string) => void;
}) {
  const [content, setContent] = useState('');

  return (
    <div>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          onSendMessage(content);
          setContent('');
        }}
      >
        <input
          type="text"
          value={content}
          onChange={(ev) => setContent(ev.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
