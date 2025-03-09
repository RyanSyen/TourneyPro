import Image from "next/image";

const ViewTournamentHeader = ({
  imgUrl,
  title,
}: {
  imgUrl: string;
  title: string;
}) => {
  return (
    <div className="relative w-full h-[350px]">
      <Image
        src={imgUrl}
        alt={title}
        fill
        sizes="100vw"
        className="object-cover object-center rounded-md"
        priority
      />
    </div>
  );
};

export default ViewTournamentHeader;
