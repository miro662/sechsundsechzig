type MessageProps = {
  content: string;
};

export default function Message({ content }: MessageProps) {
  return <li>{content}</li>;
}
