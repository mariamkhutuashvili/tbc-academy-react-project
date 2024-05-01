interface TitleProps {
  titleName: string;
}

export default function Title({ titleName }: TitleProps) {
  console.log(titleName);
  return (
    <div>
      <h1>{titleName}</h1>
    </div>
  );
}
