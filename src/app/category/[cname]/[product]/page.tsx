"use client";
import React, { useEffect, useState } from "react";
import { getProductByName } from "@/app/actions/product.actions";
import { useParams } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import Loader from "@/components/Loader";

const ProductPage = () => {
  const { product } = useParams();
  const productName = Array.isArray(product) ? product[0] : product;
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [sendDetail, setSendDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getProductByName(
          productName ? decodeURIComponent(productName) : ""
        );
        if (res.success) {
          setSendDetail(JSON.parse(res.product as any));
          setIsDetailOpen(true);
        }
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [productName]);

  if (loading) {
    return <Loader />;
  }

  if (sendDetail || isDetailOpen) {
    return (
      <ProductDetail
        {...{ setIsDetailOpen, isDetailOpen, product: sendDetail }}
      />
    );
  }

  // Handle case when product isn't found
  return (
    <div className="bg-gradient-to-tr from-[#0E091C] via-[#1F133D] to-[#0B1027] min-h-screen flex items-center justify-center">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-2xl font-bold text-white mb-4">
          Product Not Found
        </h1>
        <p className="text-gray-400 mb-6">
          The requested product doesn't exist or may have been removed.
        </p>
        <a
          href="/"
          className="bg-gradient-to-r from-[#A92EDF] to-purple-600 text-white px-6 py-3 rounded-lg inline-block"
        >
          Browse Products
        </a>
      </div>
    </div>
  );
};

export default ProductPage;
