
import { getProductByName } from '@/app/actions/product.actions';
import { Metadata } from 'next';
import { ReactNode } from 'react';


interface LayoutProps {
  children: ReactNode;
  params: {
    pname: string;
  };
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const productName = decodeURIComponent(params.pname);
  const res = await getProductByName(productName);

  if (!res?.success) {
    return {
      title: 'Product Not Found',
      description: 'This product could not be found',
      robots: {
        index: false,
        follow: true
      }
    }
  }
  const product = JSON.parse(res.product as any);
  const productUrl = `/product/${product.slug || productName}`;

  return {
    title: product?.title?.toLowerCase(), // Will become "Product Title | My Store" via template
    description: product.description.substring(0, 160),
    alternates: {
      canonical: productUrl
    },
    openGraph: {
      title: product.title,
      description: product.description.substring(0, 160),
      url: productUrl,
      images: product.images.map((img:string) => ({
        url: img,
        width: 800,
        height: 600,
        alt: product.title,
      })),
    },
    twitter: {
      title: product.title,
      description: product.description.substring(0, 160),
      images: product.images[0] // Just use first image for Twitter
    },
    other: {
      'product:price:amount': product.price.toString(),
      'product:price:currency': 'INR',
      'product:availability': product.stock > 0 ? 'in stock' : 'out of stock'
    }
  }
}

export default function ProductLayout({ children }:{children:ReactNode}) {
  return (
    <div className="bg-gradient-to-tr from-[#0E091C] via-[#1F133D] to-[#0B1027] min-h-screen">
      {children}
    </div>
  )
}