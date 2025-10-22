import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import guildsService from '../../services/guilds/guildsService';
import { Guild as GuildType, GuildMember } from '../../types/guilds';
import { usePlayer } from '../../hooks/usePlayer';

const Guild: React.FC = () => {
  const { player: user } = usePlayer();
  const [guild, setGuild] = useState<GuildType | null>(null);
  const [members, setMembers] = useState<any[]>([]);
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
      console.error('Failed to load guild:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading guild...</div>;
  }

  if (!guild) {
    return (
      <div className="p-8">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">No Guild</h2>
          <p className="mb-4">You are not in a guild yet.</p>
          <Button onClick={() => window.location.href = '/guilds/list'}>
            Browse Guilds
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">{guild.name} [{guild.tag}]</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Guild Info</h2>
          <div className="space-y-2">
            <p><strong>Level:</strong> {guild.level}</p>
            <p><strong>Members:</strong> {guild.total_members}/{guild.max_members}</p>
            <p><strong>Karma:</strong> {guild.guild_karma}</p>
            <p><strong>Reputation:</strong> {guild.reputation}</p>
            <p><strong>Territories:</strong> {guild.controlled_territories.length}</p>
          </div>
          <p className="mt-4 text-gray-600">{guild.description}</p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Guild Bank</h2>
          <div className="space-y-2">
            <p><strong>Credits:</strong> {guild.guild_bank.credits}</p>
          </div>
          <Button className="mt-4" onClick={() => {
            const amount = prompt('Enter amount to contribute:');
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
        <h2 className="text-2xl font-bold mb-4">Members ({members.length})</h2>
        <div className="space-y-2">
          {members.map((member) => (
            <div key={member._id} className="flex justify-between items-center p-2 border-b">
              <div>
                <span className="font-medium">{member.username}</span>
                <span className="text-sm text-gray-500 ml-2">Level {member.level}</span>
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
