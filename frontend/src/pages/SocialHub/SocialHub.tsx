import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import socialService from '../../services/social/socialService';
import { usePlayer } from '../../hooks/usePlayer';

const SocialHub: React.FC = () => {
  const { player: user } = usePlayer();
  const [onlinePlayers, setOnlinePlayers] = useState<any[]>([]);
  const [alliance, setAlliance] = useState<any>(null);
  const [marriage, setMarriage] = useState<any>(null);
  const [mentorship, setMentorship] = useState<any>(null);
  const [proposals, setProposals] = useState<any[]>([]);
  const [mentorshipRequests, setMentorshipRequests] = useState<any[]>([]);

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
      console.error('Failed to load social data:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Social Hub</h1>

      <Tabs defaultValue="players" className="w-full">
        <TabsList>
          <TabsTrigger value="players">Online Players</TabsTrigger>
          <TabsTrigger value="alliance">Alliance</TabsTrigger>
          <TabsTrigger value="marriage">Marriage</TabsTrigger>
          <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
        </TabsList>

        <TabsContent value="players">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Online Players ({onlinePlayers.length})</h2>
            <div className="space-y-2">
              {onlinePlayers.map((player) => (
                <div key={player._id} className="flex justify-between items-center p-2 border-b">
                  <div>
                    <span className="font-medium">{player.username}</span>
                    <span className="text-sm text-gray-500 ml-2">Level {player.level}</span>
                  </div>
                  <Button size="sm" variant="outline">View Profile</Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="alliance">
          <Card className="p-6">
            {alliance ? (
              <div>
                <h2 className="text-2xl font-bold mb-4">Your Alliance</h2>
                <p><strong>Name:</strong> {alliance.alliance_name || 'Unnamed Alliance'}</p>
                <p><strong>Members:</strong> {alliance.members.length}/3</p>
                <Button className="mt-4" variant="destructive" onClick={async () => {
                  await socialService.leaveAlliance();
                  loadSocialData();
                }}>
                  Leave Alliance
                </Button>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4">No Alliance</h2>
                <p className="mb-4">You are not in an alliance yet.</p>
                <Button onClick={async () => {
                  const name = prompt('Enter alliance name (optional):');
                  await socialService.createAlliance(name || undefined);
                  loadSocialData();
                }}>
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
                <h2 className="text-2xl font-bold mb-4">Marriage</h2>
                <p><strong>Married Since:</strong> {new Date(marriage.married_at).toLocaleDateString()}</p>
                <p><strong>Joint Karma:</strong> {marriage.joint_karma}</p>
                <Button className="mt-4" variant="destructive" onClick={async () => {
                  if (confirm('Are you sure you want to divorce? (Karma penalty applies)')) {
                    await socialService.divorce();
                    loadSocialData();
                  }
                }}>
                  Divorce
                </Button>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4">Not Married</h2>
                {proposals.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-bold mb-2">Pending Proposals</h3>
                    {proposals.map((proposal: any) => (
                      <div key={proposal._id} className="flex justify-between items-center p-2 border-b">
                        <span>Proposal from {proposal.proposer_id}</span>
                        <div className="space-x-2">
                          <Button size="sm" onClick={async () => {
                            await socialService.acceptProposal(proposal._id);
                            loadSocialData();
                          }}>Accept</Button>
                          <Button size="sm" variant="outline" onClick={async () => {
                            await socialService.rejectProposal(proposal._id);
                            loadSocialData();
                          }}>Reject</Button>
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
                <h2 className="text-2xl font-bold mb-4">Mentorship</h2>
                <p><strong>Lessons Completed:</strong> {mentorship.lessons_completed}</p>
                <p><strong>XP Bonus:</strong> {mentorship.apprentice_xp_bonus * 100}%</p>
                <Button className="mt-4" onClick={async () => {
                  await socialService.completeLesson();
                  loadSocialData();
                }}>
                  Complete Lesson
                </Button>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4">No Mentorship</h2>
                {mentorshipRequests.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-bold mb-2">Pending Requests</h3>
                    {mentorshipRequests.map((request: any) => (
                      <div key={request._id} className="flex justify-between items-center p-2 border-b">
                        <span>Request from {request.apprentice_id}</span>
                        <div className="space-x-2">
                          <Button size="sm" onClick={async () => {
                            await socialService.acceptMentorshipRequest(request._id);
                            loadSocialData();
                          }}>Accept</Button>
                          <Button size="sm" variant="outline" onClick={async () => {
                            await socialService.rejectMentorshipRequest(request._id);
                            loadSocialData();
                          }}>Reject</Button>
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
