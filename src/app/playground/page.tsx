"use client";

import Link from "next/link";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Playground = () => {
  const routes = [
    {
      name: "carousel",
      desc: "exploring shadcn carousel with embla carousel",
      url: "/playground/carousel",
    },
    {
      name: "payment datatable",
      desc: "exploring shadcn and tanstack datatable",
      url: "/playground/payments-datatable",
    },
    {
      name: "todo list",
      desc: "quick crud application with firestore",
      url: "/playground/todolist",
    },
    {
      name: "open modals with intercepting & parallel routes",
      desc: (
        <ul className="flex flex-col gap-2">
          <li>
            Intercepting Routes allows us to load a route from another part of
            your app
          </li>
          <li>
            E.g. when click a photo in a feed, the photo will pop up like a
            modal. Nextjs will intercept /photo/1 and overlay it will a modal
          </li>
          <li>
            However, when you refresh to click the sharable url then entire
            photo will be rendered instead of a modal. Route interception only
            occur routing internally in the app
          </li>
          <li>
            <div>(.) to match segments on the same level</div>
            <div>(..) to match segments one level above</div>
            <div>(..)(..) to match segments two levels above</div>
            <div>(...) to match segments from the root app directory</div>
          </li>
          <li>
            Parallel routes allow you to render one or more pages within the
            same layout. Useful for dynamic sections of the page like dashboard
          </li>
          <li>
            Parellel routes are created using named slots like @modal and are
            passed as props to the shared parent layout
          </li>
        </ul>
      ),
      url: "/playground/model-route",
    },
    {
      name: "react hook form with zod validation",
      desc: "quick demo",
      url: "/playground/react-hook-form",
    },
    {
      name: "area search bar",
      desc: "quick search on Malaysia's city/state/postcode",
      url: "/playground/area",
    },
    {
      name: "react-tel-input",
      desc: "telephone input with country code",
      url: "/playground/react-tel-input",
    },
    {
      name: "react query with shadcn tabs",
      desc: "react query with nextjs example: https://medium.com/@aalam-info-solutions-llp/react-query-integration-from-the-scratch-in-next-js-and-react-js-91d585a0a65e",
      url: "/playground/react-query",
    },
    {
      name: "toast playground",
      desc: "radix toast component",
      url: "/playground/toast",
    },
  ];

  return (
    <div className="pb-16">
      <h2 className="scroll-m-20 border-b pb-6 text-3xl font-semibold tracking-tight first:mt-0">
        Playground Directory
      </h2>
      <Table>
        <TableCaption>A list of component playgrounds for testing</TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {routes
            .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
            .map((route) => (
              <TableRow key={route.name} className="hover:bg-slate-700">
                <TableCell>{route.name}</TableCell>
                <TableCell>{route.desc}</TableCell>
                <TableCell>
                  <Link href={route.url}>GO</Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Playground;
