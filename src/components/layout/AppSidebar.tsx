"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import SidebarWidget from "./SidebarWidget";
import {
  BoxCubeIcon,
  // CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  // ListIcon,
  // PageIcon,
  PieChartIcon,
  PlugInIcon,
  TrophyIcon,
  // TrophyIcon,
  // TableIcon,
  // UserCircleIcon,
  GoalIcon,
} from "@/components/icons/components";

/* #region Types */
type SubItem = {
  name: string;
  path: string;
  pro?: boolean;
  new?: boolean;
};

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: SubItem[];
};

type MenuType = "main" | "others" | "dev";

type OpenSubmenu = {
  type: MenuType;
  index: number;
} | null;
/* #endregion */

/* #region Constants */
const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/",
  },
  {
    name: "Tournament",
    icon: <TrophyIcon />,
    path: "/tournament/list",
  },
];

const othersItems: NavItem[] = [
  {
    icon: <PieChartIcon />,
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: "/line-chart", pro: false },
      { name: "Bar Chart", path: "/bar-chart", pro: false },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "/alerts", pro: false },
      { name: "Avatar", path: "/avatars", pro: false },
      { name: "Badge", path: "/badge", pro: false },
      { name: "Buttons", path: "/buttons", pro: false },
      { name: "Images", path: "/images", pro: false },
      { name: "Videos", path: "/videos", pro: false },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin", pro: false },
      { name: "Sign Up", path: "/signup", pro: false },
    ],
  },
];

const devMenu: NavItem[] = [
  {
    icon: <GoalIcon />,
    name: "Tasks",
    subItems: [
      { name: "Kanban Board", path: "/tasks/kanban-board", pro: false },
      { name: "Summary", path: "/tasks/summary", pro: false },
    ],
  },
];
/* #endregion */

/* #region Old Code */

// type NavItem = {
//   name: string;
//   icon: React.ReactNode;
//   path?: string;
//   subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
// };

// const navItems: NavItem[] = [
//   {
//     icon: <GridIcon />,
//     name: "Dashboard",
//     // subItems: [{ name: "Ecommerce", path: "/", pro: false }],
//     path: "/",
//   },
//   // {
//   //   icon: <CalenderIcon />,
//   //   name: "Calendar",
//   //   path: "/calendar",
//   // },
//   // {
//   //   icon: <UserCircleIcon />,
//   //   name: "User Profile",
//   //   path: "/profile",
//   // },

//   // {
//   //   name: "Forms",
//   //   icon: <ListIcon />,
//   //   subItems: [{ name: "Form Elements", path: "/form-elements", pro: false }],
//   // },
//   // {
//   //   name: "Tables",
//   //   icon: <TableIcon />,
//   //   subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
//   // },
//   // {
//   //   name: "Pages",
//   //   icon: <PageIcon />,
//   //   subItems: [
//   //     { name: "Blank Page", path: "/blank", pro: false },
//   //     { name: "404 Error", path: "/error-404", pro: false },
//   //   ],
//   // },
//   {
//     name: "Tournament",
//     icon: <TrophyIcon />,
//     path: "/tournament/list",
//   },
// ];

// const othersItems: NavItem[] = [
//   {
//     icon: <PieChartIcon />,
//     name: "Charts",
//     subItems: [
//       { name: "Line Chart", path: "/line-chart", pro: false },
//       { name: "Bar Chart", path: "/bar-chart", pro: false },
//     ],
//   },
//   {
//     icon: <BoxCubeIcon />,
//     name: "UI Elements",
//     subItems: [
//       { name: "Alerts", path: "/alerts", pro: false },
//       { name: "Avatar", path: "/avatars", pro: false },
//       { name: "Badge", path: "/badge", pro: false },
//       { name: "Buttons", path: "/buttons", pro: false },
//       { name: "Images", path: "/images", pro: false },
//       { name: "Videos", path: "/videos", pro: false },
//     ],
//   },
//   {
//     icon: <PlugInIcon />,
//     name: "Authentication",
//     subItems: [
//       { name: "Sign In", path: "/signin", pro: false },
//       { name: "Sign Up", path: "/signup", pro: false },
//     ],
//   },
// ];

// const devMenu: NavItem[] = [
//   {
//     icon: <GoalIcon />,
//     name: "Tasks",
//     subItems: [
//       { name: "Kanban Board", path: "/dev/kanban-board", pro: false },
//       { name: "Summary", path: "/dev/summary", pro: false },
//     ],
//   },
// ];

// const AppSidebar: React.FC = () => {
//   const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
//   const pathname = usePathname();
//   const { isLoaded, isSignedIn, user } = useUser();

//   const renderMenuItems = (
//     navItems: NavItem[],
//     menuType: "main" | "others" | "dev"
//   ) => {
//     const filteredNavItems =
//       isLoaded && isSignedIn && user
//         ? navItems
//         : navItems.filter((nav) => nav.name !== "User Profile");

//     return (
//       <ul className="flex flex-col gap-4">
//         {filteredNavItems.map((nav, index) => {
//           return (
//             <li key={nav.name}>
//               {nav.subItems ? (
//                 <button
//                   onClick={() => handleSubmenuToggle(index, menuType)}
//                   className={`menu-item group  ${
//                     openSubmenu?.type === menuType &&
//                     openSubmenu?.index === index
//                       ? "menu-item-active"
//                       : "menu-item-inactive"
//                   } cursor-pointer ${
//                     !isExpanded && !isHovered
//                       ? "lg:justify-center"
//                       : "lg:justify-start"
//                   }`}
//                 >
//                   <span
//                     className={` ${
//                       openSubmenu?.type === menuType &&
//                       openSubmenu?.index === index
//                         ? "menu-item-icon-active"
//                         : "menu-item-icon-inactive"
//                     }`}
//                   >
//                     {nav.icon}
//                   </span>
//                   {(isExpanded || isHovered || isMobileOpen) && (
//                     <span className={`menu-item-text`}>{nav.name}</span>
//                   )}
//                   {(isExpanded || isHovered || isMobileOpen) && (
//                     <ChevronDownIcon
//                       className={`ml-auto w-5 h-5 transition-transform duration-200  ${
//                         openSubmenu?.type === menuType &&
//                         openSubmenu?.index === index
//                           ? "rotate-180 text-brand-500"
//                           : ""
//                       }`}
//                     />
//                   )}
//                 </button>
//               ) : (
//                 nav.path && (
//                   <Link
//                     href={nav.path}
//                     className={`menu-item group ${
//                       isActive(nav.path)
//                         ? "menu-item-active"
//                         : "menu-item-inactive"
//                     }`}
//                   >
//                     <span
//                       className={`${
//                         isActive(nav.path)
//                           ? "menu-item-icon-active"
//                           : "menu-item-icon-inactive"
//                       }`}
//                     >
//                       {nav.icon}
//                     </span>
//                     {(isExpanded || isHovered || isMobileOpen) && (
//                       <span className={`menu-item-text`}>{nav.name}</span>
//                     )}
//                   </Link>
//                 )
//               )}
//               {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
//                 <div
//                   ref={(el) => {
//                     subMenuRefs.current[`${menuType}-${index}`] = el;
//                   }}
//                   className="overflow-hidden transition-all duration-300"
//                   style={{
//                     height:
//                       openSubmenu?.type === menuType &&
//                       openSubmenu?.index === index
//                         ? `${subMenuHeight[`${menuType}-${index}`]}px`
//                         : "0px",
//                   }}
//                 >
//                   <ul className="mt-2 space-y-1 ml-9">
//                     {nav.subItems.map((subItem) => (
//                       <li key={subItem.name}>
//                         <Link
//                           href={subItem.path}
//                           className={`menu-dropdown-item ${
//                             isActive(subItem.path)
//                               ? "menu-dropdown-item-active"
//                               : "menu-dropdown-item-inactive"
//                           }`}
//                         >
//                           {subItem.name}
//                           <span className="flex items-center gap-1 ml-auto">
//                             {subItem.new && (
//                               <span
//                                 className={`ml-auto ${
//                                   isActive(subItem.path)
//                                     ? "menu-dropdown-badge-active"
//                                     : "menu-dropdown-badge-inactive"
//                                 } menu-dropdown-badge `}
//                               >
//                                 new
//                               </span>
//                             )}
//                             {subItem.pro && (
//                               <span
//                                 className={`ml-auto ${
//                                   isActive(subItem.path)
//                                     ? "menu-dropdown-badge-active"
//                                     : "menu-dropdown-badge-inactive"
//                                 } menu-dropdown-badge `}
//                               >
//                                 pro
//                               </span>
//                             )}
//                           </span>
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </li>
//           );
//         })}
//       </ul>
//     );
//   };
//   const [openSubmenu, setOpenSubmenu] = useState<{
//     type: "main" | "others" | "dev";
//     index: number;
//   } | null>(null);
//   const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
//     {}
//   );
//   const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

//   // const isActive = (path: string) => path === pathname;
//   const isActive = useCallback((path: string) => path === pathname, [pathname]);

//   useEffect(() => {
//     // Check if the current path matches any submenu item
//     let submenuMatched = false;
//     ["main", "others"].forEach((menuType) => {
//       const items = menuType === "main" ? navItems : othersItems;
//       items.forEach((nav, index) => {
//         if (nav.subItems) {
//           nav.subItems.forEach((subItem) => {
//             if (isActive(subItem.path)) {
//               setOpenSubmenu({
//                 type: menuType as "main" | "others",
//                 index,
//               });
//               submenuMatched = true;
//             }
//           });
//         }
//       });
//     });

//     // If no submenu item matches, close the open submenu
//     if (!submenuMatched) {
//       setOpenSubmenu(null);
//     }
//   }, [pathname, isActive]);

//   useEffect(() => {
//     // Set the height of the submenu items when the submenu is opened
//     if (openSubmenu !== null) {
//       const key = `${openSubmenu.type}-${openSubmenu.index}`;
//       if (subMenuRefs.current[key]) {
//         setSubMenuHeight((prevHeights) => ({
//           ...prevHeights,
//           [key]: subMenuRefs.current[key]?.scrollHeight || 0,
//         }));
//       }
//     }
//   }, [openSubmenu]);

//   const handleSubmenuToggle = (
//     index: number,
//     menuType: "main" | "others" | "dev"
//   ) => {
//     setOpenSubmenu((prevOpenSubmenu) => {
//       if (
//         prevOpenSubmenu &&
//         prevOpenSubmenu.type === menuType &&
//         prevOpenSubmenu.index === index
//       ) {
//         return null;
//       }
//       return { type: menuType, index };
//     });
//   };

//   return (
//     <aside
//       className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200
//         ${
//           isExpanded || isMobileOpen
//             ? "w-[290px]"
//             : isHovered
//             ? "w-[290px]"
//             : "w-[90px]"
//         }
//         ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
//         lg:translate-x-0`}
//       onMouseEnter={() => !isExpanded && setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div
//         className={`py-8 flex  ${
//           !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
//         }`}
//       >
//         <Link href="/">
//           {isExpanded || isHovered || isMobileOpen ? (
//             <div className="flex justify-center items-center">
//               <Image
//                 src="/images/logo/golden-trophy.svg"
//                 alt="Logo"
//                 width={60}
//                 height={60}
//                 priority
//               />
//               <h2 className="text-gray-800 dark:text-white scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0">
//                 TourneyPro
//               </h2>
//             </div>
//           ) : (
//             <Image
//               src="/images/logo/golden-trophy.svg"
//               alt="Logo"
//               width={60}
//               height={60}
//               priority
//             />
//           )}
//         </Link>
//       </div>
//       <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
//         <nav className="mb-6">
//           <div className="flex flex-col gap-4">
//             <div>
//               <h2
//                 className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
//                   !isExpanded && !isHovered
//                     ? "lg:justify-center"
//                     : "justify-start"
//                 }`}
//               >
//                 {isExpanded || isHovered || isMobileOpen ? (
//                   "Menu"
//                 ) : (
//                   <HorizontaLDots />
//                 )}
//               </h2>
//               {renderMenuItems(navItems, "main")}
//             </div>

//             <div className="">
//               <h2
//                 className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
//                   !isExpanded && !isHovered
//                     ? "lg:justify-center"
//                     : "justify-start"
//                 }`}
//               >
//                 {isExpanded || isHovered || isMobileOpen ? (
//                   "Others"
//                 ) : (
//                   <HorizontaLDots />
//                 )}
//               </h2>
//               {renderMenuItems(othersItems, "others")}
//             </div>
//           </div>
//         </nav>
//         {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}
//       </div>
//     </aside>
//   );
// };
/* #endregion */

/* #region Sidebar Title */
const SidebarTitle: React.FC<{ title: string; isCompact: boolean }> = ({
  title,
  isCompact,
}) => (
  <h2
    className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
      isCompact ? "lg:justify-center" : "justify-start"
    }`}
  >
    {isCompact ? <HorizontaLDots /> : title}
  </h2>
);
/* #endregion */

/* #region Badges (new/pro) */
const ItemBadge: React.FC<{ label: string; isActive: boolean }> = ({
  label,
  isActive,
}) => (
  <span
    className={`ml-auto ${
      isActive ? "menu-dropdown-badge-active" : "menu-dropdown-badge-inactive"
    } menu-dropdown-badge`}
  >
    {label}
  </span>
);
/* #endregion */

/* #region Menu Item */
const MenuItem: React.FC<{
  item: NavItem;
  isActive: boolean;
  isCompact: boolean;
}> = ({ item, isActive, isCompact }) => (
  <Link
    href={item.path || "#"}
    className={`menu-item group ${
      isActive ? "menu-item-active" : "menu-item-inactive"
    }`}
  >
    <span
      className={`${
        isActive ? "menu-item-icon-active" : "menu-item-icon-inactive"
      }`}
    >
      {item.icon}
    </span>
    {!isCompact && <span className="menu-item-text">{item.name}</span>}
  </Link>
);
/* #endregion */

/* #region Submenu Button */
const SubmenuButton: React.FC<{
  item: NavItem;
  isOpen: boolean;
  isCompact: boolean;
  onClick: () => void;
}> = ({ item, isOpen, isCompact, onClick }) => (
  <button
    onClick={onClick}
    className={`menu-item group ${
      isOpen ? "menu-item-active" : "menu-item-inactive"
    } cursor-pointer ${isCompact ? "lg:justify-center" : "lg:justify-start"}`}
  >
    <span
      className={`${
        isOpen ? "menu-item-icon-active" : "menu-item-icon-inactive"
      }`}
    >
      {item.icon}
    </span>
    {!isCompact && (
      <>
        <span className="menu-item-text">{item.name}</span>
        <ChevronDownIcon
          className={`ml-auto w-5 h-5 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-brand-500" : ""
          }`}
        />
      </>
    )}
  </button>
);
/* #endregion */

/* #region Submenu */
const Submenu: React.FC<{
  subItems: SubItem[];
  isActive: (path: string) => boolean;
  setRef: (el: HTMLDivElement | null) => void;
  height: number;
}> = ({ subItems, isActive, setRef, height }) => (
  <div
    ref={setRef}
    className="overflow-hidden transition-all duration-300"
    style={{ height: `${height}px` }}
  >
    <ul className="mt-2 space-y-1 ml-9">
      {subItems.map((subItem) => (
        <li key={subItem.name}>
          <Link
            href={subItem.path}
            className={`menu-dropdown-item ${
              isActive(subItem.path)
                ? "menu-dropdown-item-active"
                : "menu-dropdown-item-inactive"
            }`}
          >
            {subItem.name}
            <span className="flex items-center gap-1 ml-auto">
              {subItem.new && (
                <ItemBadge label="new" isActive={isActive(subItem.path)} />
              )}
              {subItem.pro && (
                <ItemBadge label="pro" isActive={isActive(subItem.path)} />
              )}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
/* #endregion */

/* #region Menu */
const MenuSection: React.FC<{
  title: string;
  items: NavItem[];
  menuType: MenuType;
  isCompact: boolean;
  openSubmenu: OpenSubmenu;
  subMenuHeight: Record<string, number>;
  subMenuRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
  isActive: (path: string) => boolean;
  handleSubmenuToggle: (index: number, type: MenuType) => void;
}> = ({
  title,
  items,
  menuType,
  isCompact,
  openSubmenu,
  subMenuHeight,
  subMenuRefs,
  isActive,
  handleSubmenuToggle,
}) => {
  // const { isLoaded, isSignedIn, user } = useUser();

  // Filter items based on user authentication status
  // const filteredItems =
  //   isLoaded && isSignedIn && user
  //     ? items
  //     : items.filter((item) => item.name !== "User Profile");

  return (
    <div>
      <SidebarTitle title={title} isCompact={isCompact} />
      <ul className="flex flex-col gap-4">
        {items.map((item, index) => {
          const isSubmenuOpen =
            openSubmenu?.type === menuType && openSubmenu?.index === index;
          const submenuKey = `${menuType}-${index}`;

          return (
            <li key={item.name}>
              {item.subItems ? (
                <>
                  <SubmenuButton
                    item={item}
                    isOpen={isSubmenuOpen}
                    isCompact={isCompact}
                    onClick={() => handleSubmenuToggle(index, menuType)}
                  />
                  {!isCompact && (
                    <Submenu
                      subItems={item.subItems}
                      isActive={isActive}
                      setRef={(el) => {
                        subMenuRefs.current[submenuKey] = el;
                      }}
                      height={
                        isSubmenuOpen ? subMenuHeight[submenuKey] || 0 : 0
                      }
                    />
                  )}
                </>
              ) : (
                item.path && (
                  <MenuItem
                    item={item}
                    isActive={isActive(item.path)}
                    isCompact={isCompact}
                  />
                )
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
/* #endregion */

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const [openSubmenu, setOpenSubmenu] = useState<OpenSubmenu>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Check if a path is active
  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  // Handle submenu toggle
  const handleSubmenuToggle = (index: number, menuType: MenuType) => {
    setOpenSubmenu((prev) => {
      if (prev?.type === menuType && prev?.index === index) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  // Set initial open submenu based on current path
  useEffect(() => {
    const checkSubmenuMatch = (items: NavItem[], type: MenuType) => {
      items.forEach((item, index) => {
        if (item.subItems?.some((subItem) => isActive(subItem.path))) {
          setOpenSubmenu({ type, index });
          return true;
        }
      });
      return false;
    };

    const hasMatch =
      checkSubmenuMatch(navItems, "main") ||
      checkSubmenuMatch(othersItems, "others") ||
      checkSubmenuMatch(devMenu, "dev");

    if (!hasMatch) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  // Update submenu heights when opened
  useEffect(() => {
    if (openSubmenu) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      const element = subMenuRefs.current[key];
      if (element) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: element.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  // Determine if sidebar should be in compact mode
  const isCompact = !isExpanded && !isHovered && !isMobileOpen;

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200
        ${isCompact ? "w-[90px]" : "w-[290px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo Section */}
      <div
        className={`py-8 flex ${
          isCompact ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isCompact ? (
            <Image
              src="/images/logo/golden-trophy.svg"
              alt="Logo"
              width={60}
              height={60}
              priority
            />
          ) : (
            <div className="flex justify-center items-center">
              <Image
                src="/images/logo/golden-trophy.svg"
                alt="Logo"
                width={60}
                height={60}
                priority
              />
              <h2 className="text-gray-800 dark:text-white scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0">
                TourneyPro
              </h2>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation Section */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <MenuSection
              title="Menu"
              items={navItems}
              menuType="main"
              isCompact={isCompact}
              openSubmenu={openSubmenu}
              subMenuHeight={subMenuHeight}
              subMenuRefs={subMenuRefs}
              isActive={isActive}
              handleSubmenuToggle={handleSubmenuToggle}
            />

            <MenuSection
              title="Others"
              items={othersItems}
              menuType="others"
              isCompact={isCompact}
              openSubmenu={openSubmenu}
              subMenuHeight={subMenuHeight}
              subMenuRefs={subMenuRefs}
              isActive={isActive}
              handleSubmenuToggle={handleSubmenuToggle}
            />

            <MenuSection
              title="Dev Menu"
              items={devMenu}
              menuType="dev"
              isCompact={isCompact}
              openSubmenu={openSubmenu}
              subMenuHeight={subMenuHeight}
              subMenuRefs={subMenuRefs}
              isActive={isActive}
              handleSubmenuToggle={handleSubmenuToggle}
            />
          </div>
        </nav>

        {/* Widget only shown when not in compact mode */}
        {!isCompact && <SidebarWidget />}
      </div>
    </aside>
  );
};

export default AppSidebar;
