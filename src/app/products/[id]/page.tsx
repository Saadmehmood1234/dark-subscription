import { notFound } from "next/navigation";

import { getProduct } from "@/app/actions/product.actions";
import ProductDetail from "@/components/ProductDetail";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductDetailPage = async ({
  params,
}: ProductDetailPageProps) => {
  const { id } = await params;

  const response = await getProduct();

  if (!response.success) {
    notFound();
  }

  const product = response.data?.find(
    (item) => String(item.id) === id,
  );

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#100719]">
      <ProductDetail product={product} />
    </main>
  );
};

export default ProductDetailPage;