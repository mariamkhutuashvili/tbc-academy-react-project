export default function Title({ titleName }: { titleName: string }) {
  console.log(titleName);
  return (
    <div>
      <h1>{titleName}</h1>
    </div>
  );
}
