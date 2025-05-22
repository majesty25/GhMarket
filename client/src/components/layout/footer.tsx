import { Link } from 'wouter';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary text-white font-bold text-xl">G</div>
              <div className="text-xl font-bold text-white">Ghana<span className="text-accent">Market</span></div>
            </div>
            <p className="text-neutral-400 text-sm mb-4">Ghana's premier e-commerce platform connecting buyers, sellers, and delivery agents nationwide.</p>
            <div className="flex gap-4">
              <a href="#" className="text-neutral-400 hover:text-white"><i className="ri-facebook-fill"></i></a>
              <a href="#" className="text-neutral-400 hover:text-white"><i className="ri-twitter-fill"></i></a>
              <a href="#" className="text-neutral-400 hover:text-white"><i className="ri-instagram-line"></i></a>
              <a href="#" className="text-neutral-400 hover:text-white"><i className="ri-linkedin-fill"></i></a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-neutral-400 hover:text-white">Home</Link></li>
              <li><Link href="#" className="text-neutral-400 hover:text-white">Shop</Link></li>
              <li><Link href="#" className="text-neutral-400 hover:text-white">Categories</Link></li>
              <li><Link href="#" className="text-neutral-400 hover:text-white">Sellers</Link></li>
              <li><Link href="#" className="text-neutral-400 hover:text-white">Become a Seller</Link></li>
              <li><Link href="#" className="text-neutral-400 hover:text-white">Become a Delivery Agent</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-neutral-400 hover:text-white">Contact Us</Link></li>
              <li><Link href="#" className="text-neutral-400 hover:text-white">FAQs</Link></li>
              <li><Link href="#" className="text-neutral-400 hover:text-white">Shipping Policy</Link></li>
              <li><Link href="#" className="text-neutral-400 hover:text-white">Returns & Refunds</Link></li>
              <li><Link href="#" className="text-neutral-400 hover:text-white">Terms & Conditions</Link></li>
              <li><Link href="#" className="text-neutral-400 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <i className="ri-map-pin-line text-primary mt-1"></i>
                <span className="text-neutral-400">123 Independence Ave, Accra, Ghana</span>
              </li>
              <li className="flex gap-3">
                <i className="ri-phone-line text-primary mt-1"></i>
                <span className="text-neutral-400">+233 20 123 4567</span>
              </li>
              <li className="flex gap-3">
                <i className="ri-mail-line text-primary mt-1"></i>
                <span className="text-neutral-400">info@ghanamarket.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-500 text-sm">© 2023 GhanaMarket. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <div className="h-8 bg-neutral-800 px-4 rounded flex items-center">
                <span className="text-xs text-neutral-400">Secure Payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
