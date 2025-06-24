import { Heart } from "lucide-react";

// Import all supporter images from assets/supporters directory
import supporter10 from "../assets/supporters/10-allia_logo.png";
import supporter30 from "../assets/supporters/30-fe_logo.png";
import supporter40 from "../assets/supporters/40-TSIP-logo.png";
import supporter50 from "../assets/supporters/50-UNLTD-logo.png";
import supporter60 from "../assets/supporters/60-HL-logo.png";
import supporter70 from "../assets/supporters/70-CSVJBS-logo.png";
import supporter80 from "../assets/supporters/80-Bain-logo.png";
import supporter90 from "../assets/supporters/90-a-million-realities-logo.png";
import supporter100 from "../assets/supporters/100-BVC-logo.png";
import supporter110 from "../assets/supporters/110-the-packard-foundation.png";
import supporter120 from "../assets/supporters/120-comic-relief-logo.png";
import supporter130 from "../assets/supporters/130-TheFore-Logo.png";
import supporter140 from "../assets/supporters/140-openregulatory.png";
import supporter150 from "../assets/supporters/150-NIHR-Logo.png";
import supporter160 from "../assets/supporters/160-IUK.png";
import supporter170 from "../assets/supporters/170-CPI.png";
import supporter180 from "../assets/supporters/180-NHS-CEP-logo.png";

const Supporters = () => {
  // Supporter data with actual images - add your website links here
  const supporters = [
    {
      id: 10,
      name: "Allia",
      logo: supporter10.src,
      website: "https://example.com" // Replace with actual website
    },
    {
      id: 30,
      name: "Future Entrepreneurs",
      logo: supporter30.src,
      website: "https://example.com" // Replace with actual website
    },
    {
      id: 40,
      name: "TSIP",
      logo: supporter40.src,
      website: "https://example.com" // Replace with actual website
    },
    {
      id: 50,
      name: "UnLtd",
      logo: supporter50.src,
      website: "https://example.com" // Replace with actual website
    },
    {
      id: 60,
      name: "HL",
      logo: supporter60.src,
      website: "https://example.com" // Replace with actual website
    },
    {
      id: 70,
      name: "CSV JBS",
      logo: supporter70.src,
      website: "https://example.com" // Replace with actual website
    },
    {
      id: 80,
      name: "Bain",
      logo: supporter80.src,
      website: "https://example.com" // Replace with actual website
    },
    {
      id: 90,
      name: "A Million Realities",
      logo: supporter90.src,
      website: "https://example.com" // Replace with actual website
    },
    {
      id: 100,
      name: "BVC",
      logo: supporter100.src,
      website: "https://example.com" // Replace with actual website
    },
    {
      id: 110,
      name: "The Packard Foundation",
      logo: supporter110.src,
      website: "https://example.com" // Replace with actual website
    },
    {
      id: 120,
      name: "Comic Relief",
      logo: supporter120.src,
      website: "https://example.com" // Replace with actual website
    },
    {
      id: 130,
      name: "The Fore",
      logo: supporter130.src,
      website: "https://example.com" // Replace with actual website
    },
    {
      id: 140,
      name: "Open Regulatory",
      logo: supporter140.src,
      website: "https://example.com" // Replace with actual website
    },
    {
      id: 150,
      name: "NIHR",
      logo: supporter150.src,
      website: "https://example.com" // Replace with actual website
    },
    {
      id: 160,
      name: "Innovate UK",
      logo: supporter160.src,
      website: "https://example.com" // Replace with actual website
    },
    {
      id: 170,
      name: "CPI",
      logo: supporter170.src,
      website: "https://example.com" // Replace with actual website
    },
    {
      id: 180,
      name: "NHS CEP",
      logo: supporter180.src,
      website: "https://example.com" // Replace with actual website
    }
  ];

  // Sort supporters by ID in descending order (highest number first, appears on right)
  const sortedSupporters = [...supporters].sort((a, b) => b.id - a.id);

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Heart className="inline-block mr-2" size={16} />
            OUR SUPPORTERS
          </div>
          <h2 className="text-1xl text-gray-500 mb-8 font-small">
            Playphysio is very grateful for support received from the following organisations:
          </h2>
        </div>

        {/* Supporters Carousel */}
        <div className="relative overflow-hidden">
          {/* Scrolling Container */}
          <div className="flex animate-scroll items-center">
            {/* Create a seamless loop by rendering supporters twice */}
            {[...sortedSupporters, ...sortedSupporters].map((supporter, index) => (
              <div key={`${supporter.id}-${index}`} className="flex-shrink-0 w-40 h-16 flex items-center justify-center mx-10">
                <a
                  href={supporter.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-75 transition-opacity duration-300"
                >
                  <img
                    src={supporter.logo}
                    alt={supporter.name}
                    className="max-h-16 max-w-40 w-auto h-auto object-contain grayscale opacity-50 hover:opacity-75 hover:grayscale-0 transition-all duration-300"
                    loading="eager"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>


    </section>
  );
};

export default Supporters;
