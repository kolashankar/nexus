import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6">KARMA NEXUS 2.0</h1>
          <p className="text-xl mb-8 text-muted-foreground">
            Enter a revolutionary AI-powered multiplayer universe where every action shapes your
            destiny. Build your character through 80 unique traits, unlock legendary superpowers,
            and navigate a world where karma is everything.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register">
              <Button size="lg">Start Your Journey</Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="p-6 border rounded-lg">
            <h3 className="text-2xl font-bold mb-4">80 Traits System</h3>
            <p className="text-muted-foreground">
              Develop your character through 60 base traits and 20 meta traits. Every action
              influences your personality and abilities.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-2xl font-bold mb-4">AI Pantheon</h3>
            <p className="text-muted-foreground">
              Interact with 6 AI entities managing different aspects of the world. From the Karma
              Arbiter to the Oracle, each shapes your journey.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-2xl font-bold mb-4">25 Superpowers</h3>
            <p className="text-muted-foreground">
              Unlock legendary powers across 5 tiers. From mind reading to reality bending, your
              traits determine your abilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
