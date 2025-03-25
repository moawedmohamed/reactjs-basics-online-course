"use client";

import { useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import { categories } from "../../data";
import { ICategory } from "../../interfaces";

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(" ");
// }
interface IProps{
    selected: {name:string,imageURL:string};
    setSelected: (category: ICategory) => void;
}
const Select = ({selected,setSelected}:IProps) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <Label className="block text-sm/6 font-medium text-gray-900">
        category
      </Label>
      <div className="relative mt-2">
        <ListboxButton
          className="grid w-full cursor-default grid-cols-1 rounded-md
         bg-white py-3 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1
          outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-800 sm:text-sm/6"
        >
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <img
              alt=""
              src={selected.imageURL}
              className="size-5 shrink-0 rounded-full"
            />
            <span className="block truncate">{selected.name}</span>
          </span>
          <ChevronUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg
           ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {categories.map((category) => (
            <ListboxOption
              key={category.id}
              value={category}
              className="group relative cursor-default select-none py-2 pr-9 pl-3 text-gray-900 
          hover:bg-indigo-600 hover:text-white 
          focus:bg-indigo-600 focus:text-white"
            >
              <div className="flex items-center">
                <img
                  alt=""
                  src={category.imageURL}
                  className="size-5 shrink-0 rounded-full"
                />
                <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                  {category.name}
                </span>
              </div>

              {selected.id === category.id && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-hover:text-white">
                  <CheckIcon aria-hidden="true" className="size-5" />
                </span>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};
export default Select;
