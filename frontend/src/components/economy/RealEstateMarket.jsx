import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Home, Building2, DollarSign, TrendingUp, MapPin } from 'lucide-react';
import { toast } from '../ui/sonner';



export const RealEstateMarket = () => {
  const [properties, setProperties] = useState([]);
  const [myProperties, setMyProperties] = useState([]);
  const [activeTab, setActiveTab] = useState('market');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProperties();
    fetchMyProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/real-estate/properties', {
        headers)}`
        }
      });
      const data = await response.json();
      setProperties(data.properties || []);
    } catch (error) {
      console.error('Failed to fetch properties', error);
    }
  };

  const fetchMyProperties = async () => {
    try {
      const response = await fetch('/api/real-estate/my-properties', {
        headers)}`
        }
      });
      const data = await response.json();
      setMyProperties(data.properties || []);
    } catch (error) {
      console.error('Failed to fetch my properties', error);
    }
  };

  const purchaseProperty = async (propertyId) => {
    try {
      const response = await fetch('/api/real-estate/purchase', {
        method,
        headers,
          'Authorization')}`
        },
        body)
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Property purchased!', {
          description);
        fetchProperties();
        fetchMyProperties();
      } else {
        toast.error('Purchase failed', {
          description);
      }
    } catch (error) {
      toast.error('Purchase failed');
    }
  };

  const getPropertyIcon = (type) => {
    switch (type) {
      case 'apartment'
        return null;
      case 'house'
      case 'mansion'
        return null;
      default;
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat().format(price);
  };

  const filteredProperties = properties.filter(prop => 
    filter === 'all' || prop.property_type === filter
  );

  return (
    
      
        
          
            
            Real Estate Market
          
          
            Invest in properties for passive income
          
        
      

      
        
          Marketplace
          
            My Properties ({myProperties.length})
          
        

        
          
             setFilter('all')}
            >
              All
            
             setFilter('apartment')}
            >
              Apartments
            
             setFilter('house')}
            >
              Houses
            
             setFilter('commercial')}
            >
              Commercial
            
          

          
            {filteredProperties.map(property => (
              
                
                  
                    
                      {property.name}
                      
                        {property.property_type}
                      
                    
                    {getPropertyIcon(property.property_type)}
                  

                  
                    {property.description}
                  

                  
                    
                      
                        
                        Territory {property.territory_id}
                      
                      {property.size}m²
                    

                    
                      
                        
                        Price)}
                    

                    
                      
                        
                        Income)}/day
                    
                  

                   purchaseProperty(property.id)}
                  >
                    Purchase
                  
                
              
            ))}
          
        

        
          {myProperties.length === 0 ? (
            
              
              
                You don't own any properties yet
              
               setActiveTab('market')}>
                Browse Properties
              
            
          ) 
            
              {myProperties.map(property => (
                
                  
                    {property.name}
                    
                      
                        Purchase Price)}
                      
                      
                        Daily Income)}
                      
                    
                  
                
              ))}
            
          )}
        
      
    
  );
};
