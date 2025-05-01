import { motion } from "framer-motion";
import { useUser, UserButton } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useUser();
  const [selectedOption, setSelectedOption] = useState(null);
  const [showWIP, setShowWIP] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState(null);
  const [locationAvailable, setLocationAvailable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setLocationAvailable(true);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationAvailable(false);
        }
      );
    } else {
      setLocationAvailable(false);
    }

    return () => clearInterval(timer);
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === 'blog') {
      navigate('/blog-generator');
    } else {
      setShowWIP(true);
      setTimeout(() => {
        setShowWIP(false);
        setSelectedOption(null);
      }, 2000);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGM0LjQxOCAwIDgtMy41ODIgOC04cy0zLjU4Mi04LTgtOC04IDMuNTgyLTggOCAzLjU4MiA4IDggOHoiIHN0cm9rZT0iIzAwRkY5RCIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-[#0F0F0F]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img src="/src/assets/images/logo.svg" alt="ContentSync" className="h-12 w-auto" />
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-[#00FF9D]">{user?.firstName || 'User'}</span>
              <div className="relative">
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10",
                      userButtonPopoverCard: "bg-[#1A1A1A] border border-gray-800",
                      userButtonPopoverActionButton: "text-white hover:bg-[#0F0F0F]",
                      userButtonPopoverActionButtonText: "text-white",
                      userButtonPopoverFooter: "hidden"
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Time and Location Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-32 right-8 bg-[#1A1A1A] p-6 rounded-xl border border-gray-800 shadow-lg w-64"
          >
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-2xl">⏰</span>
              <div>
                <p className="text-sm text-gray-400">Current Time</p>
                <p className="text-xl font-semibold">
                  {formatTime(currentTime)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📍</span>
              <div>
                <p className="text-sm text-gray-400">Location</p>
                {locationAvailable ? (
                  <p className="text-xl font-semibold text-[#00FF9D]">
                    Local specialization available
                  </p>
                ) : (
                  <p className="text-xl font-semibold text-red-500">
                    Local specialization unavailable
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#00FF9D] to-[#00B8FF] bg-clip-text text-transparent">
              Hello, {user?.firstName || 'there'}!
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12">
              What are we creating on this beautiful day?
            </p>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Blog/Post',
                  description: 'Create engaging written content',
                  icon: '📝',
                  type: 'blog'
                },
                {
                  title: 'Photo',
                  description: 'Generate and edit images',
                  icon: '📸',
                  type: 'photo'
                },
                {
                  title: 'Video',
                  description: 'Create stunning video content',
                  icon: '🎥',
                  type: 'video'
                }
              ].map((option) => (
                <motion.button
                  key={option.type}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOptionClick(option.type)}
                  className={`p-8 rounded-xl bg-[#1A1A1A] hover:border-[#00FF9D] border border-transparent transition-colors ${
                    selectedOption === option.type ? 'border-[#00FF9D]' : ''
                  }`}
                >
                  <div className="text-6xl mb-4">{option.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                  <p className="text-gray-400">{option.description}</p>
                </motion.button>
              ))}
            </div>

            {/* Work in Progress Modal */}
            {showWIP && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed inset-0 flex items-center justify-center z-50"
              >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                <div className="relative bg-[#1A1A1A] p-8 rounded-xl max-w-md w-full mx-4">
                  <div className="text-6xl mb-4 text-center">🚧</div>
                  <h3 className="text-2xl font-bold text-center mb-4 text-[#00FF9D]">
                    Work in Progress
                  </h3>
                  <p className="text-gray-300 text-center">
                    This feature is coming soon! Stay tuned for updates.
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
} 