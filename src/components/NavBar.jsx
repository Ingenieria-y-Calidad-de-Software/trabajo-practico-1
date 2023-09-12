import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

export default function NavBar() {
  return (
    <Navbar className="w-screen !justify-start sm:justify-center md:justify-center bg-fondoNavBar shadow-sm ">
      <NavbarBrand className="mx-10">
        <p className=" text-2xl font-bold text-inherit text-azulTexto ">DeliverEat!</p>
      </NavbarBrand>
      
    </Navbar>
  );
}