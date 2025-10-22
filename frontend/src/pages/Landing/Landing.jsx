/**
 * Landing page component
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';

const Landing: React.FC = () => {
  return (
    
      {/* Hero Section */}
      
        
          
            KARMA NEXUS 2.0
          
          
            Enter a revolutionary AI-powered multiplayer universe where every action shapes your destiny.
            Build your character through 80 unique traits, unlock legendary superpowers, and navigate a
            world where karma is everything.
          
          
            
              
                Start Your Journey
              
            
            
              
                Login
              
            
          
        

        {/* Features */}
        
          
            80 Traits System
            
              Develop your character through 60 base traits and 20 meta traits. Every action influences
              your personality and abilities.
            
          
          
            AI Pantheon
            
              Interact with 6 AI entities managing different aspects of the world. From the Karma Arbiter
              to the Oracle, each shapes your journey.
            
          
          
            25 Superpowers
            
              Unlock legendary powers across 5 tiers. From mind reading to reality bending, your traits
              determine your abilities.
            
          
        
      
    
  );
};

export default Landing;
