// radhe radhe

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getColumnValues } from "../../../../supabase/supabaseController.js"

export default function Bookmarks() {

  const [apps, setApps] = useState([]);
  
  useEffect(() => {
    async function supabaseWork() {
      try {
        const data = await getColumnValues("bookmarks", "bookmarks");
        
        if (data[0].length > 0) {
          setApps(data[0]);
          
        } else if (data[0].length === 0) {
          setApps([
            { "name": "YouTube", "url": "https://youtube.com" },
            { "name": "Gmail", "url": "https://mail.google.com" },
            { "name": "GitHub", "url": "https://github.com" },
            { "name": "Twitter", "url": "https://twitter.com" },
            { "name": "Netflix", "url": "https://netflix.com" },
            { "name": "Spotify", "url": "https://spotify.com" },
            { "name": "Amazon", "url": "https://amazon.com" },
            { "name": "Reddit", "url": "https://reddit.com" },
            { "name": "LinkedIn", "url": "https://linkedin.com" },
            { "name": "Discord", "url": "https://discord.com" },
            { "name": "Twitch", "url": "https://twitch.tv" },
            { "name": "Slack", "url": "https://slack.com" },
            { "name": "Pinterest", "url": "https://pinterest.com" },
            { "name": "Medium", "url": "https://medium.com" },
            { "name": "Airbnb", "url": "https://airbnb.com" },
            { "name": "Dropbox", "url": "https://dropbox.com" },
            { "name": "Notion", "url": "https://notion.so" },
            { "name": "Trello", "url": "https://trello.com" },
            { "name": "Figma", "url": "https://figma.com" },
            { "name": "Canva", "url": "https://canva.com" },
            { "name": "WhatsApp", "url": "https://web.whatsapp.com" },
            { "name": "Microsoft", "url": "https://microsoft.com" },
            { "name": "Google", "url": "https://google.com" },
            { "name": "Apple", "url": "https://apple.com" },
            { "name": "Vercel" , "url": "https://vercel.com"}
          ])
        } 
        else {
          console.warn("Unexpected data format from Supabase:", data);
        }
      } catch (error) {
        console.error("Error fetching bookmarks from Supabase:", error);
      }
    }

    supabaseWork(); // run only once
  }, []);


  const [currentPage, setCurrentPage] = useState(0);
  const appsPerPage = 18; // Increased from 12 to 18 for more apps per page
  const totalPages = Math.ceil(apps.length / appsPerPage);
  
  // Improved getFaviconUrl function with fallback mechanism
  const getFaviconUrl = (url) => {
    try {
      const domain = new URL(url).hostname;
      
      // Special case for WhatsApp which has known issues
      if (domain === 'mail.google.com') {
        throw Error()
      } 
      
      else if (domain === "web.whatsapp.com") {
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAUVBMVEVHcEz////////////////////////////////////////////////r+u/Z9uL1/fhe24gAzUkf02Sh6LZ+4Z1t3pHG8dMC0Viw7MKQ5apL2HsasPsVAAAADXRSTlMANIfD7f8zYGIW4N4+qsA5tgAAAQdJREFUeAF9k4UWgzAMRYM8vG6j//+hKyfQ+S6WEq9QpWm7Hui7dqB3xh6VfnpRzQteWGeqbPhg+6Or2hkVIVWVOfIKRmpTsA7MQoUJjDchCiVdSpJ/jEXZs6iTrFYs9UQD/3FG4MIn/jbUsmBukNXX7jhoqcPBLR2BPVBHhe5MGcKhDGAE5+iJh3kHoolg1FnSqdRFiZAEIJ6VHHbPKOR0iyYISKM4LBcUeehNskbCZy7oasV6LsX5CHEmb6k5lQ4XymoWBuKkwkjpFGdImXX9sUG47WSS0bvz1uxgJiosALyPCtHnrNm/sL4u9ivz/23yf4Mx84oXlpmemZ439UjvDNdxaOjiDkjvFKpa/ei0AAAAAElFTkSuQmCC"
      }
      
      // Return Google's service as primary source
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
      
    } catch (error) {
      
      const domain = new URL(url).hostname;
      
      return `https://icons.duckduckgo.com/ip3/${domain}.ico`
      // return "/api/placeholder/48/48";
    }
  };

  const handleOpenApp = (url) => {
    window.open(url, "_blank");
    navigate("/")
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Get current page's apps
  const currentApps = apps.slice(
    currentPage * appsPerPage,
    (currentPage + 1) * appsPerPage
  );

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="min-h-screen overflow-hidden bg-slate-900 p-8 flex flex-col">
      {/* Glass container */}
      <motion.div
        className="w-full h-full flex-grow rounded-lg p-6 bg-slate-800/40 backdrop-blur-md border border-slate-700/50 shadow-xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="grid grid-cols-4 md:grid-cols-6 gap-6 h-3/4 py-4">
          {currentApps.map((app, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center group"
              variants={itemVariants}
            >
              <div 
                className="w-32 h-32 mb-3 rounded-lg bg-slate-800/30 border border-slate-700/50 flex items-center justify-center overflow-hidden transition-transform duration-200 group-hover:shadow-lg"
                onClick={() => handleOpenApp(app.url)}
              >
                <img
                  src={getFaviconUrl(app.url)}
                  alt={`${app.name} logo`}
                  className={`w-14 h-14 object-contain ${app.name.toLowerCase() !== "microsoft" && "rounded-xl"} hover:scale-110 cursor-pointer`}
                  onError={(e) => {
                    // If Google's service fails, try DuckDuckGo instead
                    const domain = new URL(app.url).hostname;
                    e.target.src = `https://icons.duckduckgo.com/ip3/${domain}.ico`;
                    
                    // If DuckDuckGo also fails, use placeholder
                    e.target.onerror = () => {
                      e.target.src = "/api/placeholder/48/48";
                    };
                  }}
                />
              </div>
              <span className="text-sm text-slate-200 font-medium text-center">
                {app.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-2 h-2 rounded-full ${
                  currentPage === index
                    ? "bg-blue-500"
                    : "bg-slate-600 hover:bg-slate-500"
                } transition-colors`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Navigation arrows */}
        {totalPages > 1 && (
          <div className="flex justify-between mt-6">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 0}
              className={`px-4 py-2 rounded-md ${
                currentPage === 0
                  ? "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                  : "bg-slate-700/70 text-slate-200 hover:bg-slate-600"
              } transition-colors`}
            >
              Previous
            </button>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages - 1
                  ? "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                  : "bg-slate-700/70 text-slate-200 hover:bg-slate-600"
              } transition-colors`}
            >
              Next
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
