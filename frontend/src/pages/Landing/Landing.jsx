import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
      {/* Hero Section */}
      <div className="hero-section relative overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center space-y-8">
            {/* Logo/Title */}
            <div className="space-y-4">
              <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                KARMA NEXUS 2.0
              </h1>
              <p className="text-2xl text-cyan-300 font-light">
                AI-Powered Multiplayer Karma-Based RPG
              </p>
            </div>

            {/* Tagline */}
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Enter a world where every action shapes your destiny. 
              Navigate a complex society managed by AI gods, where consequences ripple through an interconnected web of traits, relationships, and cosmic karma.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4 justify-center pt-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-6 text-lg"
                onClick={() => navigate('/register')}
              >
                Start Your Journey
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-8 py-6 text-lg"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="cyber-grid"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section py-20 bg-black/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-cyan-400">
            Revolutionary Features
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-gray-800/50 border-cyan-500/30 hover:border-cyan-500 transition-all">
              <div className="text-center space-y-3">
                <div className="text-4xl">🧬</div>
                <h3 className="text-xl font-bold text-cyan-400">80 Traits System</h3>
                <p className="text-gray-300">
                  60 base traits + 20 meta traits. Every action shapes your character's personality.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gray-800/50 border-purple-500/30 hover:border-purple-500 transition-all">
              <div className="text-center space-y-3">
                <div className="text-4xl">🤖</div>
                <h3 className="text-xl font-bold text-purple-400">AI Pantheon</h3>
                <p className="text-gray-300">
                  6 AI gods manage different aspects: Karma Arbiter, Oracle, Economist, Warlord, Architect, and your personal AI Companion.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gray-800/50 border-pink-500/30 hover:border-pink-500 transition-all">
              <div className="text-center space-y-3">
                <div className="text-4xl">⚡</div>
                <h3 className="text-xl font-bold text-pink-400">25 Superpowers</h3>
                <p className="text-gray-300">
                  Unlock incredible abilities across 5 tiers, from Mind Reading to Reality Bending.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gray-800/50 border-blue-500/30 hover:border-blue-500 transition-all">
              <div className="text-center space-y-3">
                <div className="text-4xl">🏰</div>
                <h3 className="text-xl font-bold text-blue-400">Guild Warfare</h3>
                <p className="text-gray-300">
                  Create guilds, control territories, and engage in epic guild wars.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gray-800/50 border-green-500/30 hover:border-green-500 transition-all">
              <div className="text-center space-y-3">
                <div className="text-4xl">🌍</div>
                <h3 className="text-xl font-bold text-green-400">Living World</h3>
                <p className="text-gray-300">
                  Dynamic events triggered by collective player karma. Your choices affect everyone.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gray-800/50 border-orange-500/30 hover:border-orange-500 transition-all">
              <div className="text-center space-y-3">
                <div className="text-4xl">⚔️</div>
                <h3 className="text-xl font-bold text-orange-400">Turn-Based Combat</h3>
                <p className="text-gray-300">
                  Strategic combat system with abilities tied to your traits and superpowers.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Ready to Shape Your Destiny?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of players in a world where every action has consequences.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-6 text-xl"
            onClick={() => navigate('/register')}
          >
            Create Your Character
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/50 py-8 border-t border-cyan-500/30">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2025 Karma Nexus 2.0. All rights reserved.</p>
          <p className="mt-2 text-sm">Powered by AI • Built with React & FastAPI</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
