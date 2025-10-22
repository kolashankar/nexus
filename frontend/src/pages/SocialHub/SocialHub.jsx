import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import socialService from '../../services/social/socialService';
import { usePlayer } from '../../hooks/usePlayer';

const SocialHub: React.FC = () => {
  const { player: user } = usePlayer();
  const [onlinePlayers, setOnlinePlayers] = useState([]);
  const [alliance, setAlliance] = useState(null);
  const [marriage, setMarriage] = useState(null);
  const [mentorship, setMentorship] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [mentorshipRequests, setMentorshipRequests] = useState([]);

  useEffect(() => {
    loadSocialData();
  }, []);

  const loadSocialData = async () => {
    try {
      // Load online players
      const players = await socialService.getOnlinePlayers();
      setOnlinePlayers(players);

      // Load alliance
      try {
        const allianceData = await socialService.getMyAlliance();
        setAlliance(allianceData);
      } catch (error) {
        // Not in an alliance
      }

      // Load marriage
      try {
        const marriageData = await socialService.getMyMarriage();
        setMarriage(marriageData);
      } catch (error) {
        // Not married
      }

      // Load mentorship
      try {
        const mentorshipData = await socialService.getMyMentorship();
        setMentorship(mentorshipData);
      } catch (error) {
        // Not in mentorship
      }

      // Load proposals
      try {
        const proposalsData = await socialService.getPendingProposals();
        setProposals(proposalsData);
      } catch (error) {
        // No proposals
      }

      // Load mentorship requests
      try {
        const requestsData = await socialService.getPendingMentorshipRequests();
        setMentorshipRequests(requestsData);
      } catch (error) {
        // No requests
      }
    } catch (error) {
      console.error('Failed to load social data, error);
    }
  };

  return (
    
      Social Hub

      
        
          Online Players
          Alliance
          Marriage
          Mentorship
        

        
          
            Online Players ({onlinePlayers.length})
            
              {onlinePlayers.map((player) => (
                
                  
                    {player.username}
                    Level {player.level}
                  
                  View Profile
                
              ))}
            
          
        

        
          
            {alliance ? (
              
                Your Alliance
                Name);
                  loadSocialData();
                }}>
                  Leave Alliance
                
              
            ) : (
              
                No Alliance
                You are not in an alliance yet.
                 {
                  const name = prompt('Enter alliance name (optional)
                  await socialService.createAlliance(name || undefined);
                  loadSocialData();
                }}>
                  Create Alliance
                
              
            )}
          
        

        
          
            {marriage ? (
              
                Marriage
                Married Since).toLocaleDateString()}
                Joint Karma)')) {
                    await socialService.divorce();
                    loadSocialData();
                  }
                }}>
                  Divorce
                
              
            ) : (
              
                Not Married
                {proposals.length > 0 && (
                  
                    Pending Proposals
                    {proposals.map((proposal) => (
                      
                        Proposal from {proposal.proposer_id}
                        
                           {
                            await socialService.acceptProposal(proposal._id);
                            loadSocialData();
                          }}>Accept
                           {
                            await socialService.rejectProposal(proposal._id);
                            loadSocialData();
                          }}>Reject
                        
                      
                    ))}
                  
                )}
              
            )}
          
        

        
          
            {mentorship ? (
              
                Mentorship
                Lessons Completed);
                  loadSocialData();
                }}>
                  Complete Lesson
                
              
            ) : (
              
                No Mentorship
                {mentorshipRequests.length > 0 && (
                  
                    Pending Requests
                    {mentorshipRequests.map((request) => (
                      
                        Request from {request.apprentice_id}
                        
                           {
                            await socialService.acceptMentorshipRequest(request._id);
                            loadSocialData();
                          }}>Accept
                           {
                            await socialService.rejectMentorshipRequest(request._id);
                            loadSocialData();
                          }}>Reject
                        
                      
                    ))}
                  
                )}
              
            )}
          
        
      
    
  );
};

export default SocialHub;
