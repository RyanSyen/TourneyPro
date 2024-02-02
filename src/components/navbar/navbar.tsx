"use client";

import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { DefaultSession, Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { BuiltInProviderType } from "next-auth/providers/index";
import {
  ClientSafeProvider,
  LiteralUnion,
  signIn,
  signOut,
  useSession,
} from "next-auth/react";
import { getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import AppLogo from "../common/appLogo";
import useNavbar from "./useNavbar";

//#region interfaces
interface ProviderType {
  providerData: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

// interface ProfileDropdownProps {
//   user?: DefaultSession;
//   isHidden?: boolean;
// }
//#endregion

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

const ProfileDropdown = ({ user }: DefaultSession) => {
  const firstLetter = user?.name?.split("")[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="rounded-[50%] cursor-pointer">
          {user?.image && <AvatarImage src={user.image} />}
          <AvatarFallback className="bg-[#999] text-[#121212]">
            {firstLetter}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-[#26282f] border-[3px] border-[#333741] text-slate-100 z-100 p-0"
        align="end"
        side="bottom"
        avoidCollisions
      >
        <DropdownMenuArrow
          className="bg-[#26282f] dropdown-arrow"
          width={15}
          height={8}
        />
        <DropdownMenuLabel className="flex gap-3 py-3">
          <div className="flex justify-center items-center">
            <Avatar className="rounded-[50%] cursor-pointer">
              {user?.image ? (
                <AvatarImage src={user.image} />
              ) : (
                <AvatarFallback className="bg-[#999] text-[#121212]">
                  {firstLetter}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
          <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {user?.name}
            </h4>
            <p className="text-sm font-normal text-[#8c94a1]">Administrator</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Tournament Builder</DropdownMenuItem>
          <DropdownMenuItem>Administration</DropdownMenuItem>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut()}>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
//#endregion

const Navbar = () => {
  const { isScrolled } = useNavbar();
  const [open, setOpen] = useState(false);
  const [providers, setProviders] = useState<ProviderType>({
    providerData: null,
  });

  const closeModal = () => setOpen(false);

  const session = useSession();
  console.log("user session: ", session);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const providers = await getProviders();
        setProviders((prevState) => ({
          ...prevState,
          providerData: providers,
        }));
        console.log("providers: ", providers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProviders();
  }, []);

  return (
    <>
      <nav
        className={`flex justify-between items-center fixed px-7 py-5 w-full bg-[#26282f] shadow-lg bg-opacity-60 z-[100] ${
          isScrolled ? "transparent-nav" : ""
        }`}
      >
        <div className="flex justify-center items-center">
          <NavDrawer />
          <AppLogo />
        </div>
        <div className="flex justify-center items-center">
          {session.data?.user && session.status === "authenticated" ? (
            <>
              <ProfileDropdown
                user={session.data.user}
                expires={session.data.expires}
              />
            </>
          ) : (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger
                className="py-2 px-6 rounded-3xl bg-gradient-to-r from-[#E50B0D] to-[#CF0868] hover:from-[#c3090c] hover:to-[#b10659] transition-colors"
                type="button"
                onClick={() => console.log("open sign in dialog")}
              >
                Sign In
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="justify-center items-center">
                  <div className="py-8">
                    <AppLogo enableOnClick={false} />
                  </div>
                  <DialogTitle className="text-2xl font-medium tracking-normal pb-4">
                    Welcome back player
                  </DialogTitle>
                  {/* <DialogDescription className="pt-6">
                    Welcome Back!
                  </DialogDescription> */}
                </DialogHeader>
                <div className="flex flex-col justify-center gap-3">
                  {providers.providerData &&
                    Object.values(providers.providerData).map((provider) => {
                      if (provider.id === "facebook") return;
                      //console.log(provider);
                      return (
                        <div
                          key={provider.name}
                          className="flex justify-center items-center"
                        >
                          <button
                            className="flex justify-start items-center gap-3 bg-[#fcfcfc] text-slate-950 px-10 py-3 rounded-xl w-3/4 hover:scale-105 transition duration-200 ease-in-out text-sm"
                            onClick={() => signIn(provider.id)}
                          >
                            <Image
                              src={`/logo/social-login/${provider.id}-icon.svg`}
                              alt={`${provider.id} icon`}
                              width={28}
                              height={28}
                            />
                            Continue with {provider.name}
                          </button>
                        </div>
                      );
                    })}
                </div>
                <DialogFooter className="block w-full text-center pt-8 pb-4">
                  <a
                    className="text-sm cursor-pointer text-[#8C94A1] hover:text-[#FF2D2F]"
                    onClick={closeModal}
                  >
                    Close
                  </a>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
