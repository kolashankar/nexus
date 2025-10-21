/**
 * Landing page component
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            KARMA NEXUS 2.0
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Enter a revolutionary AI-powered multiplayer universe where every action shapes your destiny.
            Build your character through 80 unique traits, unlock legendary superpowers, and navigate a
            world where karma is everything.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-purple-500/30">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">80 Traits System</h3>
            <p className="text-gray-300">
              Develop your character through 60 base traits and 20 meta traits. Every action influences
              your personality and abilities.
            </p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-purple-500/30">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">AI Pantheon</h3>
            <p className="text-gray-300">
              Interact with 6 AI entities managing different aspects of the world. From the Karma Arbiter
              to the Oracle, each shapes your journey.
            </p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-purple-500/30">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">25 Superpowers</h3>
            <p className="text-gray-300">
              Unlock legendary powers across 5 tiers. From mind reading to reality bending, your traits
              determine your abilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
