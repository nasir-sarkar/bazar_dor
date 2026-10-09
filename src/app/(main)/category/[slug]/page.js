import { notFound } from "next/navigation";
import CategoryProducts from "./CategoryProducts";
import { getCategoryBySlug, getProducts } from "@/lib/market";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  return { title: category ? `${category.nameBn} এর দাম` : "পেজ পাওয়া যায়নি" };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const [category, products] = await Promise.all([
    getCategoryBySlug(slug),
    getProducts(),
  ]);


  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter((product) => product.category === category.slug);

  return <CategoryProducts category={category} products={categoryProducts} />;
}