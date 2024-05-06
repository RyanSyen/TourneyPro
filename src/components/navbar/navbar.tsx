"use client";

import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserContext } from "@/context/UserProvider";
import useAuth from "@/hooks/useAuth";
import { RoleLookup } from "@/lookups/role/roleLookup";

import AppLogo from "../common/appLogo";
import useNavbar from "./useNavbar";

//#region styled wrappers & sub-components
const NavBurger = () => {
  return (
    <div className="md:hidden inline-flex justify-center items-center pr-7 cursor-pointer">
      <HamburgerMenuIcon width={24} height={24} />
    </div>
  );
};

const NavDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger className="flex justify-center items-center">
        <NavBurger />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>Cancel</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const ProfileDropdown = (props: {
  fullName: string;
  photoURL: string;
  roleId: number;
}) => {
  const firstLetter = props.fullName?.split("")[0];
  const role = RoleLookup.find((r) => r.id === props.roleId)?.title;
  const { logOut } = useAuth();

  const items = [
    {
      id: 0,
      name: "Tournament Builder",
      url: "/tournament/list",
    },
    {
      id: 1,
      name: "Administration",
      url: "/admin/account/list",
    },
    {
      id: 2,
      name: "Profile",
      url: "/profile/personal",
    },
    {
      id: 3,
      name: "Settings",
      url: "/profile/settings",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="rounded-[50%] cursor-pointer">
          {props.photoURL ? (
            // <AvatarImage src={props.photoURL} />
            <Image
              src={props.photoURL}
              alt="profile pic"
              width={64}
              height={64}
            />
          ) : (
            <AvatarFallback className="bg-[#999] text-[#121212]">
              {firstLetter}
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 border-[3px] !border-[#333741] text-slate-100 z-100 p-0"
        align="end"
        side="bottom"
        avoidCollisions
      >
        <DropdownMenuArrow className="dropdown-arrow" width={15} height={8} />
        <DropdownMenuLabel className="flex gap-3 py-3">
          <div className="flex justify-center items-center">
            <Avatar className="rounded-[50%] cursor-pointer">
              {props.photoURL ? (
                <AvatarImage src={props.photoURL} />
              ) : (
                <AvatarFallback className="bg-[#999] text-[#121212]">
                  {firstLetter}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
          <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {props.fullName}
            </h4>
            <p className="text-sm font-normal text-[#8c94a1]">{role}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {items.map((item) => (
            <Link key={item.id} href={item.url} prefetch={true}>
              <DropdownMenuItem className="cursor-pointer">
                {item.name}
              </DropdownMenuItem>
            </Link>
          ))}
          <DropdownMenuItem onClick={() => logOut()}>Sign Out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const UserStatus = () => {
  const userData = useUserContext();
  const router = useRouter();

  // console.log("userData: ", userData);
  // console.log("pass: ", userData && !userData.isFirstTimeUser);

  if (userData?.user) {
    // console.log("user data: ", userData.user);
    const name = userData.user?.fullName ?? "";
    const pic = userData.user?.photoUrl ?? "";
    return (
      <ProfileDropdown
        fullName={name}
        photoURL={pic}
        roleId={userData.user?.roleId ?? 0}
      />
    );
  } else {
    return (
      <Button
        className="py-2 px-6 rounded-3xl !h-full !text-base !text-[#fcfcfc] bg-gradient-to-r from-[#E50B0D] to-[#CF0868] hover:from-[#c3090c] hover:to-[#b10659] transition-colors"
        onClick={() => router.push("/signin")}
      >
        Sign In
      </Button>
    );
  }
};
//#endregion

const Navbar = () => {
  const { isTransparent } = useNavbar();
  const path = usePathname();
  let hideUserStatus = false;

  if (path.includes("signup" || "signin")) hideUserStatus = true;

  return (
    <>
      <nav
        className={`flex justify-between items-center fixed px-7 py-5 w-full bg-[#26282f] shadow-lg z-[100] ${
          isTransparent ? "transparent-nav" : ""
        }`}
      >
        <div className="flex justify-center items-center">
          <NavDrawer />
          <AppLogo />
        </div>
        <div
          className={`flex justify-center items-center ${
            hideUserStatus ? "hidden" : ""
          }`}
        >
          <UserStatus />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
