import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Home, Building2, DollarSign, TrendingUp, MapPin } from 'lucide-react';
import { toast } from '../ui/sonner';

interface Property {
  id: string;
  name: string;
  description: string;
  property_type: string;
  size: number;
  location: any;
  territory_id: number;
  price: number;
  passive_income: number;
  status: string;
  property_id?: string;
  purchase_price?: number;
}

export const RealEstateMarket: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [myProperties, setMyProperties] = useState<Property[]>([]);
  const [activeTab, setActiveTab] = useState('market');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProperties();
    fetchMyProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/real-estate/properties', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setProperties(data.properties || []);
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    }
  };

  const fetchMyProperties = async () => {
    try {
      const response = await fetch('/api/real-estate/my-properties', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setMyProperties(data.properties || []);
    } catch (error) {
      console.error('Failed to fetch my properties:', error);
    }
  };

  const purchaseProperty = async (propertyId: string) => {
    try {
      const response = await fetch('/api/real-estate/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ property_id: propertyId })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Property purchased!', {
          description: `${data.property_name} - ${data.passive_income} credits/day`
        });
        fetchProperties();
        fetchMyProperties();
      } else {
        toast.error('Purchase failed', {
          description: data.error || 'Unable to purchase property'
        });
      }
    } catch (error) {
      toast.error('Purchase failed');
    }
  };

  const getPropertyIcon = (type: string) => {
    switch (type) {
      case 'apartment':
        return <Home className="h-6 w-6" />;
      case 'house':
      case 'mansion':
        return <Building2 className="h-6 w-6" />;
      default:
        return <Building2 className="h-6 w-6" />;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat().format(price);
  };

  const filteredProperties = properties.filter(prop => 
    filter === 'all' || prop.property_type === filter
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Building2 className="h-8 w-8" />
            Real Estate Market
          </h1>
          <p className="text-muted-foreground mt-1">
            Invest in properties for passive income
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="market">Marketplace</TabsTrigger>
          <TabsTrigger value="portfolio">
            My Properties ({myProperties.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="market" className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'apartment' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('apartment')}
            >
              Apartments
            </Button>
            <Button
              variant={filter === 'house' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('house')}
            >
              Houses
            </Button>
            <Button
              variant={filter === 'commercial' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('commercial')}
            >
              Commercial
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProperties.map(property => (
              <Card key={property.id} className="p-4 hover:shadow-lg transition-all">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{property.name}</h3>
                      <Badge variant="outline">
                        {property.property_type}
                      </Badge>
                    </div>
                    {getPropertyIcon(property.property_type)}
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {property.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        Territory {property.territory_id}
                      </span>
                      <span>{property.size}m²</span>
                    </div>

                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        Price:
                      </span>
                      <span>{formatPrice(property.price)}</span>
                    </div>

                    <div className="flex items-center justify-between text-green-600">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        Income:
                      </span>
                      <span>{formatPrice(property.passive_income)}/day</span>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => purchaseProperty(property.id)}
                  >
                    Purchase
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          {myProperties.length === 0 ? (
            <Card className="p-8 text-center">
              <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                You don't own any properties yet
              </p>
              <Button className="mt-4" onClick={() => setActiveTab('market')}>
                Browse Properties
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myProperties.map(property => (
                <Card key={property.property_id} className="p-4">
                  <div className="space-y-3">
                    <h3 className="font-bold">{property.name}</h3>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Purchase Price:</span>
                        <span>{formatPrice(property.purchase_price)}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Daily Income:</span>
                        <span>{formatPrice(property.passive_income)}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
