"use client"; // Ensure this is a Client Component

import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { CompanyProfile } from "./CompanyProfile";

export function App() {
  const params = useParams(); // Get dynamic route params
  const pathname = usePathname(); // Get current route
  const router = useRouter(); // For navigation

  useEffect(() => {
    if (pathname === "/company" || pathname === "/company/") {
      router.replace("/"); // Redirect unknown company routes to home
    }
  }, [pathname, router]);

  return (
    <div>
      <h1>Main App Component</h1>
      {pathname.startsWith("/company/") ? (
        <CompanyProfile companyId={params.id} />
      ) : (
        <p>Welcome to the homepage!</p>
      )}
    </div>
  );
}
