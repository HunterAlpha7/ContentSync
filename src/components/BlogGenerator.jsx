import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function BlogGenerator() {
  const navigate = useNavigate();
  const [context, setContext] = useState('');
  const [keywords, setKeywords] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [location, setLocation] = useState(null);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const platforms = [
    {
      name: 'Facebook/Instagram',
      icon: '📱',
      description: 'Create engaging social media posts',
      prompt: `Create a Facebook/Instagram post about: {context}
Keywords to include: {keywords}
Location: {location}
Make it engaging, conversational, and include relevant hashtags.`
    },
    {
      name: 'Twitter',
      icon: '🐦',
      description: 'Generate concise tweets',
      prompt: `Create a Twitter thread about: {context}
Keywords to include: {keywords}
Location: {location}
Keep it concise, engaging, and include relevant hashtags.`
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      description: 'Write professional posts',
      prompt: `Create a LinkedIn post about: {context}
Keywords to include: {keywords}
Location: {location}
Make it professional, insightful, and include relevant hashtags.`
    },
    {
      name: 'Blog Post',
      icon: '📝',
      description: 'Generate detailed blog content',
      prompt: `Create a blog post about: {context}
Keywords to include: {keywords}
Location: {location}
Make it informative, well-structured, and SEO-optimized.`
    }
  ];

  const generateContent = async () => {
    if (!context || !keywords || !selectedPlatform) {
      setError("Please fill in all required fields and select a platform");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const selectedPlatformData = platforms.find(p => p.name === selectedPlatform);
      const prompt = selectedPlatformData.prompt
        .replace("{context}", context)
        .replace("{keywords}", keywords)
        .replace("{location}", location ? `Lat: ${location.latitude}, Long: ${location.longitude}` : "Not specified");

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "ContentSync"
        },
        body: JSON.stringify({
          model: "openai/gpt-4o",
          messages: [
            {
              role: "system",
              content: "You are a professional content writer specializing in creating engaging, SEO-optimized content."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setGeneratedContent(data.choices[0].message.content);
    } catch (err) {
      setError(`Error generating content: ${err.message}`);
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <motion.button
          onClick={() => navigate('/dashboard')}
          className="mb-8 text-[#00FF9D] hover:text-[#00B8FF] transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          ← Back to Dashboard
        </motion.button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Context
              </label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="w-full h-32 bg-[#1A1A1A] border border-gray-800 rounded-lg p-4 text-white focus:border-[#00FF9D] focus:outline-none"
                placeholder="Describe what you want to write about..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Keywords (comma-separated)
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-gray-800 rounded-lg p-4 text-white focus:border-[#00FF9D] focus:outline-none"
                placeholder="Enter keywords for SEO..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Select Platform
              </label>
              <div className="grid grid-cols-2 gap-4">
                {platforms.map((platform) => (
                  <motion.button
                    key={platform.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPlatform(platform.name)}
                    className={`p-4 rounded-lg border ${
                      selectedPlatform === platform.name
                        ? 'border-[#00FF9D] bg-[#1A1A1A]'
                        : 'border-gray-800 hover:border-[#00FF9D]'
                    }`}
                  >
                    <div className="text-2xl mb-2">{platform.icon}</div>
                    <div className="text-sm font-medium">{platform.name}</div>
                    <div className="text-xs text-gray-400">{platform.description}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button
              onClick={generateContent}
              disabled={isLoading}
              className={`w-full py-4 rounded-lg font-semibold ${
                isLoading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#00FF9D] to-[#00B8FF] hover:opacity-90'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              {isLoading ? 'Generating...' : 'Generate Content'}
            </motion.button>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500 rounded-xl text-red-500">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Generated Content
              </label>
              <div className="bg-[#1A1A1A] border border-gray-800 rounded-lg p-4 h-[500px] overflow-y-auto">
                {generatedContent ? (
                  <div className="prose prose-invert max-w-none">
                    {generatedContent.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-400 text-center py-20">
                    {isLoading ? 'Generating content...' : 'Generated content will appear here'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 