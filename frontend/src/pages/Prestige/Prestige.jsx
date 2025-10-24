import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../components/ui/alert-dialog';
import prestigeService from '../../services/prestige/prestigeService';
import { toast } from '../../components/ui/sonner';
import { Crown, Sparkles } from 'lucide-react';

const Prestige = () => {
  const [prestige, setPrestige] = useState(null);
  const [eligibility, setEligibility] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrestige();
    checkEligibility();
  }, []);

  const fetchPrestige = async () => {
    try {
      const data = await prestigeService.getPrestige();
      setPrestige(data);
    } catch (error) {
      console.error('Failed to fetch prestige', error);
    } finally {
      setLoading(false);
    }
  };

  const checkEligibility = async () => {
    try {
      const data = await prestigeService.checkPrestigeEligibility();
      setEligibility(data);
    } catch (error) {
      console.error('Failed to check eligibility', error);
    }
  };

  const handlePrestige = async () => {
    try {
      const result = await prestigeService.performPrestige();
      toast.success(result.message);
      fetchPrestige();
      checkEligibility();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to prestige');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading prestige...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Crown className="w-8 h-8" />
            Prestige System
          </h1>
          {prestige && (
            <Badge variant="secondary" className="text-lg">
              Level {prestige.current_prestige_level}
            </Badge>
          )}
        </div>
      </div>
      <div className="grid gap-6">
        {/* Current Status */}
        {prestige && (
          // FIX: Complete className string
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> 
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Prestige Level</p>
                  <p className="text-3xl font-bold">{prestige.current_prestige_level}/10</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Prestiges</p>
                  <p className="text-3xl font-bold">{prestige.total_prestiges}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Prestige Points</p>
                  <p className="text-3xl font-bold">{prestige.prestige_points}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Eligibility */}
        {eligibility && (
          <Card>
            <CardHeader>
              <CardTitle>Prestige Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Level 100</span>
                    {/* FIX: Complete ternary operator */}
                    <Badge variant={eligibility.current_level >= 100 ? 'default' : 'destructive'}> 
                      {eligibility.current_level}/100
                    </Badge>
                  </div>
                  <Progress value={(eligibility.current_level / 100) * 100} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Karma</span>
                    {/* FIX: Complete ternary operator */}
                    <Badge variant={eligibility.current_karma >= 1000 ? 'default' : 'destructive'}> 
                      {eligibility.current_karma}/1000
                    </Badge>
                  </div>
                  <Progress value={(eligibility.current_karma / 1000) * 100} />
                </div>

                {eligibility.requirements.achievements > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Achievements</span>
                      <Badge
                        variant={
                          eligibility.current_achievements >= eligibility.requirements.achievements
                            ? 'default'
                            : 'destructive' // FIX: Complete ternary operator
                        }
                      >
                        {eligibility.current_achievements}/{eligibility.requirements.achievements}
                      </Badge>
                    </div>
                    <Progress
                      value={
                        (eligibility.current_achievements / eligibility.requirements.achievements) *
                        100
                      }
                    />
                  </div>
                )}

                <div className="mt-6">
                  {/* FIX: Complete ternary operator, assumed 'else' case is a disabled button */}
                  {eligibility.eligible ? ( 
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="w-full" size="lg">
                          <Sparkles className="mr-2" />
                          Prestige Now
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Prestiging will reset your level and traits, but you'll keep 10% of your
                            trait progress and gain permanent bonuses. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handlePrestige}>Prestige</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    <Button className="w-full" size="lg" disabled>
                      {eligibility.message}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Permanent Bonuses */}
        {prestige && Object.keys(prestige.permanent_bonuses).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Permanent Bonuses</CardTitle>
            </CardHeader>
            <CardContent>
              {/* FIX: Complete className string */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
                {Object.entries(prestige.permanent_bonuses).map(([bonus, value]) => (
                  <div key={bonus} className="flex justify-between p-3 border rounded">
                    <span className="capitalize">{bonus.replace('_', ' ')}</span>
                    <span className="font-bold">x{value.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Prestige;