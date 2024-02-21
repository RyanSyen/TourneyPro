import Link from "next/link";

export default function Page() {
  let photos = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <section className="cards-container grid grid-cols-3 gap-4 justify-center items-center p-4 sm:grid-cols-1">
      {photos.map((id) => (
        <Link
          className="card flex justify-center items-center h-52 bg-[#eee] rounded-lg no-underline text-black text-2xl font-medium max-w-52"
          key={id}
          href={`/playground/model-route/photos/${id}`}
          passHref
        >
          {id}
        </Link>
      ))}
    </section>
  );
}
