import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0.5, 0]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0F0F0F] text-white overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGM0LjQxOCAwIDgtMy41ODIgOC04cy0zLjU4Mi04LTgtOC04IDMuNTgyLTggOCAzLjU4MiA4IDggOHoiIHN0cm9rZT0iIzAwRkY5RCIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20" />
        </div>
      </motion.div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-[#0F0F0F]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img src="/src/assets/images/logo.svg" alt="ContentSync" className="h-8 w-auto" />
            </div>
            <div className="flex items-center space-x-4">
              <SignedOut>
                <SignInButton className="bg-gradient-to-r from-[#00FF9D] to-[#00B8FF] px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform" />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#00FF9D] to-[#00B8FF] bg-clip-text text-transparent">
              Transform Content Creation: AI Writes, You Perfect
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Generate blogs, ads, and videos in seconds. Edit with your team in real-time.
            </p>
            <button className="bg-gradient-to-r from-[#00FF9D] to-[#00B8FF] px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform">
              Start Free Trial
            </button>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="relative py-12 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-[#00FF9D] text-xl">1M+ assets created | 92% faster launches</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {['Adobe', 'Shopify', 'Microsoft', 'Google'].map((logo) => (
              <div key={logo} className="text-center hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-gray-400">{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'AI Draft Generation',
                description: 'Powered by GPT-4 turbo',
                icon: '🤖'
              },
              {
                title: 'Real-Time Collaboration',
                description: 'Multi-user editing',
                icon: '👥'
              },
              {
                title: 'Auto-Localization',
                description: '50+ languages',
                icon: '🌍'
              },
              {
                title: 'SEO Optimization',
                description: 'Smart keyword integration',
                icon: '🔍'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-[#1A1A1A] p-6 rounded-xl hover:border-[#00FF9D] border border-transparent transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Chen',
                role: 'Marketing Director, TechStart',
                quote: 'ContentSync has revolutionized our content creation process. We\'re now producing 5x more content with the same team.',
                image: '👩‍💼'
              },
              {
                name: 'Michael Rodriguez',
                role: 'Content Strategist, GrowthLabs',
                quote: 'The AI suggestions are spot-on, and the collaboration features make it easy to work with our remote team.',
                image: '👨‍💻'
              },
              {
                name: 'Emma Thompson',
                role: 'Founder, DigitalNomad',
                quote: 'As a solopreneur, ContentSync helps me maintain a consistent content schedule without burning out.',
                image: '👩‍💼'
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-[#0F0F0F] p-8 rounded-xl"
              >
                <div className="text-6xl mb-4">{testimonial.image}</div>
                <p className="text-gray-300 mb-4">{testimonial.quote}</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-[#00FF9D]">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Simple Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                name: 'Free',
                price: '$0',
                features: ['2 projects', 'Basic AI features', 'No video generation', 'No collaboration'],
                popular: false
              },
              {
                name: 'Starter',
                price: '$29',
                features: ['10 projects', 'Advanced AI features', 'Basic video generation', 'Priority support'],
                popular: false
              },
              {
                name: 'Agency',
                price: '$99',
                features: ['Unlimited projects', 'Premium AI features', 'Full video generation', 'Team collaboration'],
                popular: true
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                features: ['Custom solutions', 'Dedicated support', 'API access', 'Custom integrations'],
                popular: false
              }
            ].map((tier, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className={`bg-[#0F0F0F] p-8 rounded-xl relative ${
                  tier.popular ? 'border-2 border-[#00FF9D]' : 'border border-gray-800'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#00FF9D] text-black px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">{tier.name}</h3>
                <p className="text-4xl font-bold mb-6">{tier.price}<span className="text-sm text-gray-400">/month</span></p>
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-[#00FF9D] mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-gradient-to-r from-[#00FF9D] to-[#00B8FF] py-3 rounded-full font-semibold hover:scale-105 transition-transform">
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-[#0F0F0F] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-[#00FF9D] font-bold text-xl mb-4">ContentSync</h3>
              <p className="text-gray-400">AI-powered content creation platform</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Integrations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Security</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 ContentSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}