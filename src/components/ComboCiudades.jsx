import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function ComboCiudades( {onSelectCategory} ) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Ciudad*"]));

  const selectCategory = (key) => {
    const [first] = key;
    setSelectedKeys(first);
    onSelectCategory ( (first) );

  }

  return (
    <Dropdown className="group flex flex-col w-full">
      <DropdownTrigger>
        <Button
          variant="solid"
          className="capitalize relative w-full inline-flex tap-highlight-transparent shadow-sm px-3 
          bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 
          min-h-unit-10 rounded-medium flex-col items-start justify-center gap-0 transition-background 
          motion-reduce:transition-none !duration-150 outline-none group-data-[focus-visible=true]:z-10 
          group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus 
          group-data-[focus-visible=true]:ring-offset-2 
          group-data-[focus-visible=true]:ring-offset-background h-14 py-2"
        >
          {selectedKeys}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="solid"
        selectionMode="single"
        selectedKeys={selectedKeys}
        // eslint-disable-next-line no-restricted-globals
        onSelectionChange={(key)=> selectCategory(key)}
        
      >
        
        <DropdownItem key="Córdoba">Córdoba</DropdownItem>
        <DropdownItem key="Villa Maria">Villa Maria</DropdownItem>
        <DropdownItem key="Buenos Aires">Buenos Aires</DropdownItem>
        <DropdownItem key="Villa Allende">Villa Allende</DropdownItem>
        <DropdownItem key="Arroyito">Arroyito</DropdownItem>
        <DropdownItem key="Río Tercero">Río Tercero</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
