export default function PhotoPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <div className="card flex justify-center items-center h-52 bg-[#eee] rounded-lg no-underline text-black text-2xl font-medium max-w-52">
      {id}
    </div>
  );
}
