import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import guildsService from '../../services/guilds/guildsService';
import { usePlayer } from '../../hooks/usePlayer';

const Guild = () => {
  const { player: user } = usePlayer();
  const [guild, setGuild] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGuildData();
  }, []);

  const loadGuildData = async () => {
    try {
      const guildId = user?.guild_id;
      if (guildId) {
        const guildData = await guildsService.getGuild(guildId);
        setGuild(guildData);
        
        const membersData = await guildsService.getGuildMembers(guildId);
        setMembers(membersData);
      }
    } catch (error) {
      console.error('Failed to load guild', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading guild...</div>;
  }

  if (!guild) {
    return (
      <div className="container mx-auto py-6">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">No Guild</h2>
          <p className="mb-4">You are not in a guild yet.</p>
          <Button onClick={() => window.location.href = '/guilds/list'}>
            Browse Guilds
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">{guild.name} [{guild.tag}]</h1>
      
      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Guild Info</h2>
          <div className="space-y-2">
            <p>Level: {guild.level}</p>
            <p>Members: {guild.total_members}/{guild.max_members}</p>
            <p>Karma: {guild.guild_karma}</p>
            <p>Reputation: {guild.reputation}</p>
            <p>Territories: {guild.controlled_territories.length}</p>
          </div>
          <p className="mt-4">{guild.description}</p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Guild Bank</h2>
          <div className="space-y-4">
            <p>Credits: {guild.guild_bank.credits}</p>
          </div>
          <Button onClick={() => {
            const amount = prompt('Enter amount to contribute');
            if (amount) {
              guildsService.contributeToBank(parseInt(amount))
                .then(() => loadGuildData())
                .catch(console.error);
            }
          }}>
            Contribute Credits
          </Button>
        </Card>
      </div>

      <Card className="p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">Members ({members.length})</h2>
        <div className="space-y-2">
          {members.map((member) => (
            <div key={member.player_id} className="flex justify-between items-center p-3 border rounded">
              <div>
                <p className="font-semibold">{member.username}</p>
                <p className="text-sm text-muted-foreground">Level {member.level}</p>
              </div>
              <span className="text-sm">{member.guild_rank}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Guild;
