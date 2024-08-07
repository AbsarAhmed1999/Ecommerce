"use client";
import React from "react";
import { ProductCard } from "@/Components/ProductCard/ProductCard";

export interface Product {
  name: string;
  price: string;
  sentence: string;
  emoji: string;
  id: number;
}

export default function Dashboard({
  filteredData,
}: {
  filteredData: Product[];
}) {
  return (
    <div className="dashboard-page">
      <div className="product-list">
        {filteredData.map((value: Product) => {
          const { name, price, sentence, emoji, id } = value;
          return (
            <ProductCard
              key={id}
              name={name}
              price={price}
              sentence={sentence}
              emoji={emoji}
              id={id}
            />
          );
        })}
      </div>
    </div>
  );
}
