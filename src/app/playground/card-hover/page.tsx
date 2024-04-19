import Image from "next/image";

const CardHoverPlayground = () => {
  return (
    <div className="relative container flex-center flex-wrap gap-8 flex-col sm:flex-row">
      <div className="group relative cursor-pointer w-[300px] h-[350px] bg-[#14141b] rounded-md transition-all duration-5000 ease-in-out shadow-md hover:border-[#FF2D2F] backdrop-blur-md">
        <div className="relative flex-center flex-col py-4 transition-all duration-500 group-hover:translate-y-[-20px]">
          <div className="img">
            <Image
              src={"/roles/organizer.svg"}
              alt="test img"
              width={256}
              height={300}
            />
          </div>
          <div className="title">Organizer</div>
        </div>
        <div className="absolute flex bottom-0 left-0 right-0 p-4 translate-y-10 transition-all duration-500 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          Organizers are able to create and manage tournaments with our
          intuitive builder with no upfront costs.
        </div>
      </div>
    </div>
  );
};

export default CardHoverPlayground;
