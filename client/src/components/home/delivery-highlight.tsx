const DeliveryHighlight = () => {
  return (
    <section className="py-10 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-poppins">Fast & Reliable Delivery Across Ghana</h2>
            <p className="text-neutral-600 mb-6">Our network of trusted delivery agents ensures your orders arrive safely and on time. Enjoy same-day delivery in major cities and real-time tracking for all your packages.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <i className="ri-time-line"></i>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Same-Day Delivery</h3>
                  <p className="text-xs text-neutral-500">For orders before 12pm</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <i className="ri-map-pin-line"></i>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Real-Time Tracking</h3>
                  <p className="text-xs text-neutral-500">Know where your order is</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1526367790999-0150786686a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80" 
              alt="Delivery tracking map visualization" 
              className="w-full h-auto" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryHighlight;
