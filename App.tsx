import { Outlet } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./main";
import { CartProvider } from "./context/CartContext";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { CartDrawer } from "./components/cart/CartDrawer";
import { Seo } from "./components/seo/Seo";
import { StructuredData, organizationSchema } from "./components/seo/StructuredData";
import { SITE_URL } from "./lib/env";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Seo title="Wealthy Harvest™ | Building Abundant Lives" path="/" />
        <StructuredData data={organizationSchema(SITE_URL)} />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content">
          <Outlet />
        </main>
        <Footer />
        <CartDrawer />
      </CartProvider>
    </QueryClientProvider>
  );
}
