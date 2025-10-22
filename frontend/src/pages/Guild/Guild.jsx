import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import guildsService from '../../services/guilds/guildsService';
import { Guild, GuildMember } from '../../types/guilds';
import { usePlayer } from '../../hooks/usePlayer';

const Guild: React.FC = () => {
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
      console.error('Failed to load guild, error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return Loading guild...;
  }

  if (!guild) {
    return (
      
        
          No Guild
          You are not in a guild yet.
           window.location.href = '/guilds/list'}>
            Browse Guilds
          
        
      
    );
  }

  return (
    
      {guild.name} [{guild.tag}]
      
      
        
          Guild Info
          
            Level: {guild.level}
            Members: {guild.total_members}/{guild.max_members}
            Karma: {guild.guild_karma}
            Reputation: {guild.reputation}
            Territories: {guild.controlled_territories.length}
          
          {guild.description}
        

        
          Guild Bank
          
            Credits: {guild.guild_bank.credits}
          
           {
            const amount = prompt('Enter amount to contribute);
            if (amount) {
              guildsService.contributeToBank(parseInt(amount))
                .then(() => loadGuildData())
                .catch(console.error);
            }
          }}>
            Contribute Credits
          
        
      

      
        Members ({members.length})
        
          {members.map((member) => (
            
              
                {member.username}
                Level {member.level}
              
              {member.guild_rank}
            
          ))}
        
      
    
  );
};

export default Guild;
