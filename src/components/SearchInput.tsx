"use client";

import {
  ArrowRight,
  Clock3,
  LoaderCircle,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";

import { filterProducts } from "@/app/actions/product.actions";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchProduct {
  _id?: string;
  id?: string;
  slug?: string;
  title: string;
  category?: string;
  description?: string;
  logoImage?: string;
  price?: number;
  originalPrice?: number;
  discount?: number;
}

const popularSearches = [
  "Netflix",
  "Spotify",
  "YouTube Premium",
  "Amazon Prime",
];

const SearchInput = () => {
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const requestIdRef = useRef(0);

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<SearchProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [error, setError] = useState<string | null>(null);

  const debouncedValue = useDebounce(inputValue.trim(), 300);

  const normalizedQuery = debouncedValue.toLowerCase();
  const hasSearchQuery = inputValue.trim().length >= 2;

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const currentRequestId = ++requestIdRef.current;

      if (debouncedValue.length < 2) {
        setSuggestions([]);
        setIsSearching(false);
        setError(null);
        setActiveIndex(-1);
        return;
      }

      try {
        setIsSearching(true);
        setError(null);

        const response = await filterProducts(debouncedValue);

        if (currentRequestId !== requestIdRef.current) {
          return;
        }

        if (!response.success || !response.products) {
          setSuggestions([]);
          return;
        }

        const parsedProducts = parseProducts(response.products);

        setSuggestions(parsedProducts);
        setActiveIndex(-1);
      } catch (error) {
        console.error("Product search failed:", error);

        if (currentRequestId === requestIdRef.current) {
          setSuggestions([]);
          setError("Search is temporarily unavailable.");
        }
      } finally {
        if (currentRequestId === requestIdRef.current) {
          setIsSearching(false);
        }
      }
    };

    fetchFilteredProducts();
  }, [debouncedValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const visibleSuggestions = useMemo(() => {
    return suggestions.slice(0, 6);
  }, [suggestions]);

  const getProductHref = (product: SearchProduct) => {
    const productId = product.id || product._id;

    return productId ? `/products/${productId}` : "/#products";
  };

  const openProduct = (product: SearchProduct) => {
    setInputValue(product.title);
    setIsOpen(false);
    setActiveIndex(-1);

    router.push(getProductHref(product));
  };

  const handlePopularSearch = (query: string) => {
    setInputValue(query);
    setIsOpen(true);
    setActiveIndex(-1);
  };

  const handleClear = () => {
    setInputValue("");
    setSuggestions([]);
    setActiveIndex(-1);
    setError(null);
    setIsOpen(true);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
      event.currentTarget.blur();
      return;
    }

    if (!isOpen) {
      if (event.key === "ArrowDown") {
        setIsOpen(true);
      }

      return;
    }

    if (visibleSuggestions.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      setActiveIndex((current) =>
        current >= visibleSuggestions.length - 1 ? 0 : current + 1,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setActiveIndex((current) =>
        current <= 0 ? visibleSuggestions.length - 1 : current - 1,
      );
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();

      const selectedProduct = visibleSuggestions[activeIndex];

      if (selectedProduct) {
        openProduct(selectedProduct);
      }
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-xl">
      <div
        className={[
          "relative flex h-11 items-center rounded-xl border bg-white/5.5 transition duration-200",
          isOpen
            ? "border-purple-400/45 shadow-lg shadow-purple-950/20 ring-4 ring-purple-400/8"
            : "border-white/10 hover:border-white/20",
        ].join(" ")}
      >
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 size-4.5 text-white/40"
        />

        <input
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search Netflix, Spotify and more"
          aria-label="Search subscription products"
          aria-expanded={isOpen}
          aria-controls="product-search-suggestions"
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 ? `search-result-${activeIndex}` : undefined
          }
          autoComplete="off"
          className="h-full w-full rounded-xl bg-transparent pl-10 pr-20 text-sm text-white outline-none placeholder:text-white/30"
        />

        <div className="absolute right-2 flex items-center gap-1">
          {isSearching && (
            <span
              aria-label="Searching"
              className="grid size-8 place-items-center"
            >
              <LoaderCircle className="size-4 animate-spin text-purple-300" />
            </span>
          )}

          {!isSearching && inputValue && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className="grid size-8 cursor-pointer place-items-center rounded-lg text-white/35 transition hover:bg-white/8 hover:text-white"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          id="product-search-suggestions"
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+0.65rem)] z-70 overflow-hidden rounded-2xl border border-white/10 bg-[#170D25]/98 shadow-2xl shadow-black/50 backdrop-blur-2xl"
        >
          {!hasSearchQuery ? (
            <PopularSuggestions onSelect={handlePopularSearch} />
          ) : isSearching && suggestions.length === 0 ? (
            <SearchLoadingState />
          ) : error ? (
            <SearchErrorState message={error} />
          ) : visibleSuggestions.length > 0 ? (
            <>
              <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
                <div>
                  <p className="text-xs font-semibold text-white/65">
                    Suggested products
                  </p>

                  <p className="mt-0.5 text-[11px] text-white/30">
                    Results for “{inputValue.trim()}”
                  </p>
                </div>

                <span className="rounded-full bg-purple-400/10 px-2.5 py-1 text-[10px] font-semibold text-purple-200">
                  {visibleSuggestions.length} found
                </span>
              </div>

              <div className="max-h-105 overflow-y-auto p-2">
                {visibleSuggestions.map((product, index) => {
                  const isActive = activeIndex === index;

                  return (
                    <Link
                      id={`search-result-${index}`}
                      role="option"
                      aria-selected={isActive}
                      key={
                        product._id ||
                        product.id ||
                        product.slug ||
                        `${product.title}-${index}`
                      }
                      href={getProductHref(product)}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => {
                        setInputValue(product.title);
                        setIsOpen(false);
                        setActiveIndex(-1);
                      }}
                      className={[
                        "group flex items-center gap-3 rounded-xl p-3 transition",
                        isActive ? "bg-purple-400/10" : "hover:bg-white/5",
                      ].join(" ")}
                    >
                      <ProductLogo product={product} />

                      <div className="min-w-0 flex-1">
                        <h3
                          className={[
                            "truncate text-sm font-semibold transition",
                            isActive
                              ? "text-purple-100"
                              : "text-white group-hover:text-purple-100",
                          ].join(" ")}
                        >
                          {highlightMatch(product.title, normalizedQuery)}
                        </h3>

                        <div className="mt-1 flex items-center gap-2">
                          {product.category && (
                            <span className="truncate text-xs text-white/35">
                              {product.category}
                            </span>
                          )}

                          {Number(product.discount) > 0 && (
                            <>
                              <span className="size-1 rounded-full bg-white/20" />

                              <span className="text-xs font-medium text-emerald-300">
                                {product.discount}% off
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        {typeof product.price === "number" && (
                          <p className="text-sm font-semibold text-white">
                            {formatCurrency(product.price)}
                          </p>
                        )}

                        {typeof product.originalPrice === "number" &&
                          product.originalPrice > Number(product.price) && (
                            <p className="mt-0.5 text-[11px] text-white/30 line-through">
                              {formatCurrency(product.originalPrice)}
                            </p>
                          )}
                      </div>

                      <ArrowRight
                        className={[
                          "size-4 shrink-0 transition",
                          isActive
                            ? "translate-x-0 text-purple-300"
                            : "-translate-x-1 text-white/20 group-hover:translate-x-0 group-hover:text-purple-300",
                        ].join(" ")}
                      />
                    </Link>
                  );
                })}
              </div>

              <div className="flex items-center justify-between border-t border-white/8 px-4 py-2.5 text-[10px] text-white/25">
                <span>Use ↑ ↓ to navigate</span>
                <span>Press Enter to open</span>
              </div>
            </>
          ) : (
            <NoSearchResults query={inputValue.trim()} />
          )}
        </div>
      )}
    </div>
  );
};

interface PopularSuggestionsProps {
  onSelect: (query: string) => void;
}

const PopularSuggestions = ({ onSelect }: PopularSuggestionsProps) => {
  return (
    <div className="p-4">
      <div className="flex items-center gap-2">
        <Sparkles className="size-4 text-purple-300" />

        <div>
          <p className="text-sm font-semibold text-white">Popular searches</p>

          {/* <p className="mt-0.5 text-xs text-white/35">
            Quickly find popular subscriptions
          </p> */}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {popularSearches.map((query) => (
          <button
            type="button"
            key={query}
            onClick={() => onSelect(query)}
            className="inline-flex cursor-pointer min-h-9 items-center gap-2 rounded-full border border-white/8 bg-white/[0.035] px-3 text-xs font-medium text-white/60 transition hover:border-purple-400/25 hover:bg-purple-400/10 hover:text-purple-100"
          >
            <Clock3 className="size-3.5 text-white/30" />
            {query}
          </button>
        ))}
      </div>
    </div>
  );
};

const ProductLogo = ({ product }: { product: SearchProduct }) => {
  return (
    <div className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/10 bg-white p-1.5">
      {product.logoImage ? (
        <img
          src={product.logoImage}
          alt=""
          loading="lazy"
          className="h-full w-full object-contain"
        />
      ) : (
        <span className="text-sm font-semibold text-purple-600">
          {product.title.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
};

const SearchLoadingState = () => {
  return (
    <div className="space-y-2 p-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex animate-pulse items-center gap-3 rounded-xl p-2"
        >
          <div className="size-11 rounded-xl bg-white/8" />

          <div className="flex-1 space-y-2">
            <div className="h-3.5 w-2/3 rounded bg-white/8" />
            <div className="h-3 w-1/3 rounded bg-white/5" />
          </div>

          <div className="h-4 w-14 rounded bg-white/7" />
        </div>
      ))}
    </div>
  );
};

const SearchErrorState = ({ message }: { message: string }) => {
  return (
    <div className="px-5 py-8 text-center">
      <div className="mx-auto grid size-10 place-items-center rounded-full bg-red-400/10">
        <Search className="size-4 text-red-300" />
      </div>

      <p className="mt-3 text-sm font-semibold text-white">
        Search unavailable
      </p>

      <p className="mt-1 text-xs leading-5 text-white/40">{message}</p>
    </div>
  );
};

const NoSearchResults = ({ query }: { query: string }) => {
  return (
    <div className="px-5 py-9 text-center">
      <div className="mx-auto grid size-11 place-items-center rounded-full border border-white/8 bg-white/5">
        <Search className="size-5 text-white/35" />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-white">
        No products found
      </h3>

      <p className="mx-auto mt-1.5 max-w-xs text-xs leading-5 text-white/40">
        We couldn&apos;t find a product matching “{query}”. Try a product name
        or category.
      </p>
    </div>
  );
};

const parseProducts = (products: unknown): SearchProduct[] => {
  try {
    if (Array.isArray(products)) {
      return products as SearchProduct[];
    }

    if (typeof products === "string") {
      const parsed = JSON.parse(products);

      return Array.isArray(parsed) ? (parsed as SearchProduct[]) : [];
    }

    return [];
  } catch (error) {
    console.error("Unable to parse search products:", error);
    return [];
  }
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

const highlightMatch = (title: string, query: string) => {
  if (!query) return title;

  const index = title.toLowerCase().indexOf(query);

  if (index === -1) {
    return title;
  }

  const before = title.slice(0, index);
  const match = title.slice(index, index + query.length);
  const after = title.slice(index + query.length);

  return (
    <>
      {before}
      <mark className="bg-transparent font-bold text-purple-300">{match}</mark>
      {after}
    </>
  );
};

export default SearchInput;
