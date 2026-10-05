import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./routes";
import { SuperAdminSessionBootstrap } from "./providers/SuperAdminSessionBootstrap";
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

