import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import socialService from '../../services/social/socialService';
import { usePlayer } from '../../hooks/usePlayer';

const SocialHub = () => {
  const { player= usePlayer();
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
      console.error('Failed to load social data', error);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Social Hub</h1>

      <Tabs defaultValue="players">
        <TabsList>
          <TabsTrigger value="players">Online Players</TabsTrigger>
          <TabsTrigger value="alliance">Alliance</TabsTrigger>
          <TabsTrigger value="marriage">Marriage</TabsTrigger>
          <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
        </TabsList>

        <TabsContent value="players">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Online Players ({onlinePlayers.length})</h2>
            <div className="space-y-2">
              {onlinePlayers.map((player) => (
                <div
                  key={player.player_id}
                  className="flex justify-between items-center p-3 border rounded"
                >
                  <div>
                    <p className="font-semibold">{player.username}</p>
                    <p className="text-sm text-muted-foreground">Level {player.level}</p>
                  </div>
                  <Button size="sm">View Profile</Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="alliance">
          <Card className="p-6">
            {alliance ? (
              <div>
                <h2 className="text-xl font-bold mb-4">Your Alliance</h2>
                <p className="mb-4">Name
                <Button
                  onClick={async () => {
                    await socialService.leaveAlliance();
                    loadSocialData();
                  }}
                >
                  Leave Alliance
                </Button>
              </div>
            ) 
              <div>
                <h2 className="text-xl font-bold mb-4">No Alliance</h2>
                <p className="mb-4">You are not in an alliance yet.</p>
                <Button
                  onClick={async () => {
                    const name = prompt('Enter alliance name (optional)');
                    await socialService.createAlliance(name || undefined);
                    loadSocialData();
                  }}
                >
                  Create Alliance
                </Button>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="marriage">
          <Card className="p-6">
            {marriage ? (
              <div>
                <h2 className="text-xl font-bold mb-4">Marriage</h2>
                <p className="mb-2">
                  Married Since).toLocaleDateString()}
                </p>
                <p className="mb-4">Joint Karma
                <Button
                  onClick={async () => {
                    if (confirm('Are you sure you want to divorce?')) {
                      await socialService.divorce();
                      loadSocialData();
                    }
                  }}
                >
                  Divorce
                </Button>
              </div>
            ) 
              <div>
                <h2 className="text-xl font-bold mb-4">Not Married</h2>
                {proposals.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Pending Proposals</h3>
                    {proposals.map((proposal) => (
                      <div
                        key={proposal._id}
                        className="flex justify-between items-center p-3 border rounded mb-2"
                      >
                        <span>Proposal from {proposal.proposer_id}</span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={async () => {
                              await socialService.acceptProposal(proposal._id);
                              loadSocialData();
                            }}
                          >
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={async () => {
                              await socialService.rejectProposal(proposal._id);
                              loadSocialData();
                            }}
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="mentorship">
          <Card className="p-6">
            {mentorship ? (
              <div>
                <h2 className="text-xl font-bold mb-4">Mentorship</h2>
                <p className="mb-4">Lessons Completed
                <Button
                  onClick={async () => {
                    await socialService.completeLesson();
                    loadSocialData();
                  }}
                >
                  Complete Lesson
                </Button>
              </div>
            ) 
              <div>
                <h2 className="text-xl font-bold mb-4">No Mentorship</h2>
                {mentorshipRequests.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Pending Requests</h3>
                    {mentorshipRequests.map((request) => (
                      <div
                        key={request._id}
                        className="flex justify-between items-center p-3 border rounded mb-2"
                      >
                        <span>Request from {request.apprentice_id}</span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={async () => {
                              await socialService.acceptMentorshipRequest(request._id);
                              loadSocialData();
                            }}
                          >
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={async () => {
                              await socialService.rejectMentorshipRequest(request._id);
                              loadSocialData();
                            }}
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialHub;
