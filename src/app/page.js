import Banner from "@/components/categories/Banner";
import AllProductsSection from "@/components/products/AllProductsSection";
import TrendingDownSection from "@/components/products/TrendingDownSection";
import TrendingUpSection from "@/components/products/TrendingUpSection";

export default function Home() {
  return (<>
    <Banner />
    <TrendingUpSection />
    <TrendingDownSection />
    <AllProductsSection />
  </>);
}
