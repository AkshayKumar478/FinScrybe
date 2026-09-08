import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./router";
import { SuperAdminSessionBootstrap } from "./modules/admin/components/SuperAdminSessionBootstrap";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SuperAdminSessionBootstrap>
        <RouterProvider router={router} />
      </SuperAdminSessionBootstrap>
    </QueryClientProvider>
  );
}

