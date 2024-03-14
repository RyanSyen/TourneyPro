"use client";

import { usePathname } from "next/navigation";

import Breadcrumb from "@/components/common/breadcrumb";

const breadcrumbLinks = [
  {
    name: "Administration",
    url: "/admin/account/list",
  },
  {
    name: "Account",
    url: "/admin/account/list",
  },
  {
    name: "Create Account",
    url: "/admin/account/create",
  },
];

const AdminBreadcrumb = () => {
  const path = usePathname();
  const isDefaultPage = path.includes("list");

  if (isDefaultPage) return null;

  return <Breadcrumb links={breadcrumbLinks} />;
};

export default AdminBreadcrumb;
