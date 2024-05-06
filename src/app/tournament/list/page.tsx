"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import CustomContainer from "@/components/common/customContainer";
import { Button } from "@/components/ui/button";
const cards = [
  { id: 1, title: "Card 1", content: "Content for card 1" },
  { id: 2, title: "Card 2", content: "Content for card 2" },
  { id: 3, title: "Card 3", content: "Content for card 3" },

  // Add more cards as needed
];

const TournamentCards = () => {
  return (
    <div className="flex flex-wrap items-center gap-4 overflow-auto">
      {cards.map((card) => (
        <div
          className="bg-[#ccc] border border-[#ccc] rounded-md p-5 w-[200px]"
          key={card.id}
        >
          <h2>{card.title}</h2>
          <p>{card.content}</p>
        </div>
      ))}
    </div>
  );
};

const TournamentList = () => {
  const router = useRouter();
  return (
    <main>
      <div className="relative flex-center items-start overflow-hidden h-[calc(100vh-6rem)] w-full">
        <div className="absolute top-0 bottom-0 left-[-50px] w-1/2 bg-cover bg-center">
          <Image
            src={"/dashboard/aaronchia_wooiyik.png"}
            alt="aaron chia and soh wooi yik image"
            width={500}
            height={300}
          />
        </div>

        <div className="absolute top-0 bottom-0 right-[-125px] w-1/2 bg-cover bg-center">
          <Image
            src={"/dashboard/lee_zii_jia.png"}
            alt="aaron chia and soh wooi yik image"
            width={500}
            height={300}
          />
        </div>
        <div className="absolute top-1/4 w-[95vw] bg-[#14141b] rounded-xl p-6 h-2/3">
          <div className="flex items-center gap-4 pb-8">
            <h2 className="scroll-m-20 text-3xl text-center font-semibold tracking-tight first:mt-0">
              Tournament List
            </h2>
            <Button
              variant={"main"}
              onClick={() => router.push("/tournament/create")}
            >
              Create Tournament
            </Button>
          </div>

          <TournamentCards />
        </div>
      </div>
    </main>
  );
};

export default TournamentList;
