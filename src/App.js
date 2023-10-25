import { useContext } from "react";
import { PageContext } from "./contexts/Page";
import { Items } from "./pages/Items";
import { Cart } from "./pages/Cart";
import { Confirmation } from "./pages/Confirmation";

export const App = () => {
  const { page } = useContext(PageContext);

  if (page === "items") {
    return <Items />;
  }

  if (page === "cart") {
    return <Cart />;
  }

  if (page === "confirmation") {
    return <Confirmation />;
  }

  return <div>Page not found.</div>;
};
