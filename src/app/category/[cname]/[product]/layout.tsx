import { getProductByName } from '@/app/actions/product.actions';
import { ReactNode } from 'react';


// Correct interface for dynamic route params
interface ProductPageParams {
  cname: string;
  product: string;
}

interface ProductLayoutProps {
  children: ReactNode;
  params: ProductPageParams;
}

export async function generateMetadata({ params }: { params: ProductPageParams }): Promise<any> {
  const productName = decodeURIComponent(params.product);
  const res = await getProductByName(productName);

  if (!res?.success) {
    return {
      title: 'Product Not Found',
      description: 'This product could not be found',
      robots: {
        index: false,
        follow: true
      }
    };
  }

  const product = JSON.parse(res.product as string);
  const productUrl = `/category/${params.cname}/${product.slug || productName}`;

  return {
    title: product?.title,
    description: product.description.substring(0, 160),
    alternates: {
      canonical: productUrl
    },
    openGraph: {
      title: product.title,
      description: product.description.substring(0, 160),
      url: productUrl,
      images: product.images.map((img: string) => ({
        url: img,
        width: 800,
        height: 600,
        alt: product.title,
      })),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description.substring(0, 160),
      images: product.images[0] ? [product.images[0]] : undefined
    },
    other: {
      'product:price:amount': product.price.toString(),
      'product:price:currency': 'INR',
      'product:availability': product.stock > 0 ? 'in stock' : 'out of stock',
      'product:category': params.cname
    }
  };
}

export default function ProductLayout({ children, params }: ProductLayoutProps) {
  return (
    <div className="bg-gradient-to-tr from-[#0E091C] via-[#1F133D] to-[#0B1027] min-h-screen">
      {children}
    </div>
  );
}