import style from './Message.module.sass';
import strftime from 'strftime';

type MessageProps = {
  username?: string;
  content: string;
  date: Date;
};

export default function Message({ username, content, date }: MessageProps) {
  const formatDate = (date: Date) => strftime('%H:%M', date);

  if (username !== undefined) {
    return (
      <li className={style.message}>
        <div className={style.username}>[{username}]</div>
        <div className={style.content}>{content}</div>
        <div className={style.date}>{formatDate(date)}</div>
      </li>
    );
  } else {
    return (
      <li className={`${style.message} ${style.systemMessage}`}>
        <div className={style.content}>{content}</div>
        <div className={style.date}>{formatDate(date)}</div>
      </li>
    );
  }
}
