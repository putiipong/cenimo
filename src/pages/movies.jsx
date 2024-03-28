import { Helmet } from 'react-helmet-async';

import { ProductsView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function MoviesPage() {
  return (
    <>
      <Helmet>
        <title> Movies</title>
      </Helmet>

      <ProductsView />
    </>
  );
}
