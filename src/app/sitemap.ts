// app/sitemap.ts
import { MetadataRoute } from "next";
import { getProductNames } from "@/app/actions/product.actions";
import { getCategory } from "./actions/category.actions";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.primeflix.site";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    // Note: Remove hash URLs from sitemap - crawlers don't index fragments
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/shipping`,
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/returns`,
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
  ];

  // Initialize dynamic pages arrays
  let categoryPages: MetadataRoute.Sitemap = [];
  let productPages: MetadataRoute.Sitemap = [];
  let productPages2 = [] as any;

  try {
    // Get all categories`

    const resCat: any = await getCategory();
    if (resCat?.success && resCat?.categories) {
      const categories = JSON.parse(resCat.categories!);
      categoryPages = categories.map((category: any) => ({
        url: `${baseUrl}/category/${
          category?.slug || encodeURIComponent(category?.title)
        }`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    }

    // Get all products
    const res: any = await getProductNames();
    if (res?.success && res?.products) {
      const products = JSON.parse(res.products!);
      productPages = products.map((product: any) => ({
        url: `${baseUrl}/category/${product?.category}/${
          product?.slug || encodeURIComponent(product?.title)
        }`,
        lastModified: product?.updatedAt
          ? new Date(product?.updatedAt)
          : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));

      const resPro: any = await getProductNames();
      if (resPro?.success && resPro?.products) {
        const products = JSON.parse(resPro.products!);
        productPages2 = products.map((product: any) => ({
          url: `${baseUrl}/product/${
            product?.slug || encodeURIComponent(product?.title)
          }`,
          lastModified: product?.updatedAt
            ? new Date(product?.updatedAt)
            : new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        }));
      }
    }
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return at least static pages if dynamic generation fails
    return staticPages;
  }
  return [...staticPages, ...categoryPages, ...productPages, ...productPages2];
}
