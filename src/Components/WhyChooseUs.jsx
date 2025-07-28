import {
  ShieldCheck,
  Truck,
  Wallet,
  PhoneCall,
  FileText,
  Smile,
} from "lucide-react";

const whyChooseUs = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-blue-600 mb-3" />,
    title: "Best Price Guarantee",
    description:
      "VoyageX charges zero commission from transport partners, ensuring you always get the lowest rates directly from verified providers.",
  },
  {
    icon: <Truck className="w-10 h-10 text-blue-600 mb-3" />,
    title: "Freedom to Choose",
    description:
      "Browse vehicle profiles, ratings, and capacity. Select what fits your route and cargo — no middlemen involved.",
  },
  {
    icon: <Wallet className="w-10 h-10 text-blue-600 mb-3" />,
    title: "No Advance Payment",
    description:
      "Book instantly without any upfront fees. Pay directly to the driver after successful delivery.",
  },
  {
    icon: <PhoneCall className="w-10 h-10 text-blue-600 mb-3" />,
    title: "Talk Before You Book",
    description:
      "Get in touch with the vehicle provider or driver before confirming your booking for added clarity.",
  },
  {
    icon: <FileText className="w-10 h-10 text-blue-600 mb-3" />,
    title: "Transparent Billing",
    description:
      "Get clear pricing, automated invoices, and trip logs with no hidden charges or surprise fees.",
  },
  {
    icon: <Smile className="w-10 h-10 text-blue-600 mb-3" />,
    title: "Trusted by Thousands",
    description:
      "Over 10,000+ satisfied customers across India trust VoyageX for their logistics and transportation needs.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-gray-100 px-4 sm:px-6 lg:px-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">
          Why Choose Us
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover what makes VoyageX the most trusted logistics vehicle booking
          platform in India.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 ">
        {whyChooseUs.map((item, idx) => (
          <div
            style={{ borderRadius: "0 25px 0 25px " }}
            key={idx}
            className="bg-white  rounded-xl p-6 shadow-lg hover:shadow-md transition duration-300 text-center"
          >
            <div className="flex justify-center">{item.icon}</div>
            <h3 className="text-xl text-indigo-600 font-semibold mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm p-4">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
