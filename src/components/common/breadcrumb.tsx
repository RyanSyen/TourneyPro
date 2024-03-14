import { ChevronRightIcon } from "lucide-react";

import CustomLink from "../ui/link";

interface Props {
  name: string;
  url: string;
}

const Breadcrumb = ({ links }: { links: Props[] }) => {
  return (
    <div className="flex items-center">
      {links.map((link, index) => (
        <BreadcrumbItems
          key={index}
          index={index}
          link={link}
          isLastLink={index === links.length - 1}
        />
      ))}
    </div>
  );
};

const BreadcrumbItems = ({
  link,
  index,
  isLastLink,
}: {
  link: Props;
  index: number;
  isLastLink: boolean;
}) => {
  if (isLastLink) {
    return <span className="text-sm font-normal">{link.name}</span>;
  } else {
    return (
      <>
        <CustomLink
          key={link.name}
          variant={isLastLink ? null : "breadcrumb"}
          href={link.url}
          name={link.name}
        />
        <span className="px-1">
          <ChevronRightIcon color="#8c94a1" />
        </span>
      </>
    );
  }
};

export default Breadcrumb;
