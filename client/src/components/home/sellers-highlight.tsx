import { Link } from 'wouter';
import { sellers } from '@/data';

const SellersHighlight = () => {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold font-poppins">Top Verified Sellers</h2>
          <Link href="#" className="text-primary text-sm font-medium">View All</Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sellers.map((seller) => (
            <div key={seller.id} className="bg-white border border-neutral-200 rounded-lg p-4 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 ${seller.bgColor} rounded-full flex items-center justify-center text-white font-bold`}>
                  {seller.initials}
                </div>
                <div>
                  <h3 className="font-medium">{seller.name}</h3>
                  <div className="flex items-center text-sm">
                    <span className="text-secondary"><i className="ri-star-fill"></i> {seller.rating.toFixed(1)}</span>
                    <span className="mx-1 text-neutral-300">|</span>
                    <span className="text-neutral-500 text-xs">{seller.category}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-neutral-600 mb-3 line-clamp-2">{seller.description}</p>
              <button className="w-full bg-primary/10 text-primary font-medium py-2 text-sm rounded hover:bg-primary/20 transition">Visit Store</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SellersHighlight;
