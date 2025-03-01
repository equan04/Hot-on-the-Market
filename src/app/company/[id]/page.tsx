"use client";

import { useRouter } from "next/router";

export default function CompanyPage() {
  const router = useRouter();
  return <h1>Company ID: {params.id}</h1>;
}
