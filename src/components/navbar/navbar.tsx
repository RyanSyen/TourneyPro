"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import useNavbar from "./useNavbar";
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
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import AppLogo from "../common/appLogo";

//#region styled wrappers
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
//#endregion

const Navbar = () => {
  const { isScrolled } = useNavbar();

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
          <Dialog>
            <DialogTrigger
              className="py-2 px-6 rounded-3xl bg-gradient-to-r from-[#E50B0D] to-[#CF0868] hover:from-[#c3090c] hover:to-[#b10659] transition-colors"
              type="button"
              onClick={() => console.log("open sign in dialog")}
            >
              Sign In
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
