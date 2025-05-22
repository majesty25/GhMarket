import { paymentOptions } from '@/data';

const PaymentMethodsHighlight = () => {
  return (
    <section className="py-10 bg-neutral-50" id="payment-methods">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold font-poppins text-center mb-8">Trusted & Secure Payment Options</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {paymentOptions.map((option) => (
            <div key={option.id} className="bg-white border border-neutral-200 rounded-lg p-4 flex flex-col items-center text-center hover:shadow-md transition">
              <div className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mb-3`}>
                {option.icon.startsWith('ri-') ? (
                  <i className={`${option.icon} text-2xl text-white`}></i>
                ) : (
                  <div className={`font-bold ${option.id === 'mtn' ? 'text-black' : 'text-white'} text-sm`}>{option.icon}</div>
                )}
              </div>
              <h3 className="font-medium mb-1">{option.name}</h3>
              <p className="text-xs text-neutral-500">{option.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PaymentMethodsHighlight;
