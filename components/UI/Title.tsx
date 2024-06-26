export default function Title({ titleName }: { titleName: string }) {
  return (
    <div>
      <h1 className="title">{titleName}</h1>
    </div>
  );
}
