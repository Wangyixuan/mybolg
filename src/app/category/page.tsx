import { getAllCategoryInfo } from "@/app/utils/supabase";
import CategoryCard from "@/app/components/categoryCard";

export default async function Category() {
  const categoryInfo = await getAllCategoryInfo();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {
        categoryInfo.map((data) => (
          <div key={data.name} className="w-full">
            <CategoryCard data={data} />
          </div>
        ))
      }
    </div>
  );
}