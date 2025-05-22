const ServiceHighlights = () => {
  const services = [
    {
      icon: 'ri-truck-line',
      title: 'Same-Day Delivery',
      description: 'In Accra, Kumasi & more'
    },
    {
      icon: 'ri-secure-payment-line',
      title: 'Secure Payments',
      description: 'Mobile Money & more'
    },
    {
      icon: 'ri-map-pin-time-line',
      title: 'Real-Time Tracking',
      description: 'Know where your order is'
    },
    {
      icon: 'ri-store-2-line',
      title: 'Verified Sellers',
      description: 'Quality guaranteed'
    }
  ];

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-3">
                <i className={`${service.icon} text-xl`}></i>
              </div>
              <h3 className="font-medium text-sm md:text-base">{service.title}</h3>
              <p className="text-neutral-500 text-xs md:text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;
