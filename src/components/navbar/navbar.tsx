"use client";

import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

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

import SignInDialog from "../auth/sign-in/signInDialog";
import SignUpDialog from "../auth/sign-up/signUpDialog";
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
          <Button onClick={() => signOut()}>Submit</Button>
          <DrawerClose>Cancel</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const ProfileDropdown = (props: { fullName: string; photoURL: string }) => {
  const firstLetter = props.fullName?.split("")[0];
  const { logOut } = useAuth();

  const items = [
    {
      id: 0,
      name: "Builder",
      url: "/playground",
    },
    {
      id: 1,
      name: "Administration",
      url: "/admin/administration",
    },
    {
      id: 2,
      name: "Profile",
      url: "/",
    },
    {
      id: 3,
      name: "Setting",
      url: "/",
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
        className="w-56 bg-[#26282f] border-[3px] border-[#333741] text-slate-100 z-100 p-0"
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
            <p className="text-sm font-normal text-[#8c94a1]">Administrator</p>
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

  if (userData) {
    const name = userData.fullName ?? "";
    const pic = userData.photoURL ?? "";
    return <ProfileDropdown fullName={name} photoURL={pic} />;
  } else {
    return (
      <>
        <SignInDialog />
        <SignUpDialog />
      </>
    );
  }
};
//#endregion

const Navbar = () => {
  const { isTransparent } = useNavbar();

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
        <div className="flex justify-center items-center">
          <UserStatus />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
