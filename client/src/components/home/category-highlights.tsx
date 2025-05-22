import { Link } from 'wouter';
import { categories } from '@/data';

const CategoryHighlights = () => {
  return (
    <section className="py-10 bg-neutral-50" id="categories">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold font-poppins">Shop by Category</h2>
          <Link href="#" className="text-primary text-sm font-medium">View All</Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link href={`/category/${category.slug}`} key={category.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-4 flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-3">
                <i className={`${category.icon} text-2xl text-primary`}></i>
              </div>
              <h3 className="text-sm font-medium text-center">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryHighlights;
