"use client";
import Image from "next/image";

import { supabase } from "@/lib/supabase";


export default function Home() {
  async function createProduct() {
    await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({
        name: "Pink Gajra",
        category: "gajray",
        price: 999,
        description: "A high-end Gajra for professionals.",
        images: [
          "https://images.unsplash.com/photo-1682685790740-1e3f5c8b6d7e?ixlib=rb-4.0.3&ixid=M3w5MTMyMXwwfDF8c2VhcmNofDJ8fGZsb3dlcnxlbnwwfHx8fDE2OTQyNzYxMDR8MA&auto=format&fit=crop&w=800&q=60",
        ],
        featured: true,
      }),
    });
  }

  async function deleteProduct() {
    await fetch("/api/products/1f7c1829-a89b-4d6b-9696-dc125cd78e0f", {
      method: "DELETE",
    });
  }

  async function fetchProduct() {
    const response = await fetch("/api/products/424d0a33-0db1-41e1-bea3-42013f441265");
    const product = await response.json();
    console.log("Fetched product:", product);
  }

  async function updateProduct() {
    await fetch("/api/products/424d0a33-0db1-41e1-bea3-42013f441265", {
      method: "PUT",
      body: JSON.stringify({
        name: "Updated Pink Gajra",
        price: 1099,
      }),
    });
  }

  return (
    <div>
      <button onClick={createProduct}>Create</button>
      <button onClick={deleteProduct}>Delete</button>
      <button onClick={fetchProduct}>Fetch</button>
      <button onClick={updateProduct}>Update</button>
    </div>
  );
}