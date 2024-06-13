"use client";

import {
  LightningBoltIcon,
  MagicWandIcon,
  VideoIcon,
} from "@radix-ui/react-icons";

const ComingSoon = () => {
  return (
    <section
      className={`space-y-4 overflow-y-auto pr-4 bg-[#14141b] rounded-xl p-6`}
    >
      <h4 className="flex items-center gap-2 scroll-m-20 text-xl font-semibold tracking-tight">
        Features in development
        <LightningBoltIcon width={20} height={20} />
      </h4>
      <div className="flex flex-col justify-center gap-4 cursor-default">
        <div className="flex gap-2 items-center text-slate-400">
          <VideoIcon />
          Livestreaming - organizers allow users to livestream the matches on
          TourneyPro
        </div>
        <div className="flex gap-2 items-center text-slate-400">
          <MagicWandIcon />
          Recruit tournament officials - organizers able to recruit officials in
          TourneyPro
        </div>
      </div>
    </section>
  );
};
export default ComingSoon;
