import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";

const pages: Record<string, () => Promise<any>> = import.meta.glob(
  "../view/**/*.tsx"
);
function LazyLoad(element: string) {
  if (!element) {
    return <Outlet />;
  }
  const loadElement = pages[`../view/${element}.tsx`];
  const ElementNode = lazy(() => loadElement());
  return (
    <Suspense>
      <ElementNode />
    </Suspense>
  );
}

export default LazyLoad;
