import type { RouteRecord } from "vite-react-ssg";
import App from "./App";

// Static imports (not lazy) is a deliberate, small-app choice: everything
// prerenders through the same synchronous component tree, which keeps
// the SSG output simple. Revisit with route-level code splitting
// (React.lazy) if the page count/bundle size grows significantly.
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import CollectionDetail from "./pages/CollectionDetail";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import SearchPage from "./pages/SearchPage";
import About from "./pages/About";
import Wellness from "./pages/Wellness";
import Preparedness from "./pages/Preparedness";
import DigitalResources from "./pages/DigitalResources";
import Resources from "./pages/Resources";
import ResourceArticle from "./pages/ResourceArticle";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import { getProduct } from "@/shopify/storefront";
import { getCollection } from "@/shopify/storefront";
import { getArticle, getAllArticles } from "@/lib/content";
import {
  getProductStaticPaths,
  getCollectionStaticPaths,
  getArticleStaticPaths,
} from "@/lib/buildRoutes";

/**
 * Route `loader`s run during the SSG build (vite-react-ssg awaits them
 * before rendering each page to a static HTML string) AND again on the
 * client for normal React Router navigations. This is what makes the
 * prerendered /products/:handle and /collections/:handle files contain
 * real product data instead of a loading skeleton — see ProductDetail.tsx
 * and CollectionDetail.tsx, which read this via `useLoaderData()`.
 *
 * A missing handle throws a 404 Response, caught by the route's
 * `errorElement`.
 */
async function productLoader({ params }: { params: { handle?: string } }) {
  const product = params.handle ? await getProduct(params.handle) : null;
  if (!product) throw new Response("Not Found", { status: 404 });
  return product;
}

async function collectionLoader({ params }: { params: { handle?: string } }) {
  const collection = params.handle ? await getCollection(params.handle) : null;
  if (!collection) throw new Response("Not Found", { status: 404 });
  return collection;
}

async function articleLoader({ params }: { params: { slug?: string } }) {
  const article = params.slug ? await getArticle(params.slug) : null;
  if (!article) throw new Response("Not Found", { status: 404 });
  return article;
}

// Also used to prerender the /resources index with a real article list
// rather than an empty shell that only fills in client-side (see
// pages/Resources.tsx, which reads this via useLoaderData()).
async function articlesLoader() {
  return getAllArticles();
}

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      {
        path: "collections/:handle",
        element: <CollectionDetail />,
        loader: collectionLoader,
        // Officially documented vite-react-ssg mechanism: tells the SSG
        // build which concrete paths to prerender for this dynamic
        // route. Combined automatically with the static routes by
        // vite-react-ssg's default `includedRoutes` handler.
        getStaticPaths: getCollectionStaticPaths,
        errorElement: <NotFound />,
      },
      {
        path: "products/:handle",
        element: <ProductDetail />,
        loader: productLoader,
        getStaticPaths: getProductStaticPaths,
        errorElement: <NotFound />,
      },
      { path: "cart", element: <CartPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "about", element: <About /> },
      { path: "wellness", element: <Wellness /> },
      { path: "preparedness", element: <Preparedness /> },
      { path: "digital-resources", element: <DigitalResources /> },
      { path: "resources", element: <Resources />, loader: articlesLoader },
      {
        path: "resources/:slug",
        element: <ResourceArticle />,
        loader: articleLoader,
        getStaticPaths: getArticleStaticPaths,
        errorElement: <NotFound />,
      },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

