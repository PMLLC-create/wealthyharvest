import { ViteReactSSG } from "vite-react-ssg";
import { QueryClient } from "@tanstack/react-query";
import { routes } from "./router";
import "./styles/index.css";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Prerendered pages already ship real data; avoid an eager
      // refetch storm the instant every page hydrates.
      staleTime: 5_000,
      retry: 1,
    },
  },
});

export const createRoot = ViteReactSSG({ routes, basename: import.meta.env.BASE_URL });
