import { FaTools, FaHandsHelping, FaMapMarkerAlt, FaRupeeSign } from 'react-icons/fa';

export default function Hero() {
  const features = [
    { icon: <FaMapMarkerAlt />, text: 'Localized Services' },
    { icon: <FaRupeeSign />, text: 'Affordable Prices' },
    { icon: <FaTools />, text: 'Verified Providers' },
    { icon: <FaHandsHelping />, text: 'Easy Connection' }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Welcome to EASELIFE
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Connect with trusted service providers in your area
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                <span className="text-2xl">{feature.icon}</span>
                <span className="font-semibold">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Service Type Icons */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {[
            { name: 'Labour', emoji: '👷' },
            { name: 'Tailoring', emoji: '✂️' },
            { name: 'Electrician', emoji: '⚡' },
            { name: 'Teacher', emoji: '👨‍🏫' },
            { name: 'Staff', emoji: '👔' }
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/30 transition cursor-pointer"
            >
              <div className="text-4xl mb-2">{service.emoji}</div>
              <div className="font-semibold">{service.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

