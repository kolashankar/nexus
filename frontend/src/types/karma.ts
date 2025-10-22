export interface KarmaEvent {
  _id: string;
  event_type: string;
  player_id: string;
  karma_change: number;
  description: string;
  metadata?: any;
  timestamp: string;
}

export interface KarmaScore {
  karma_points: number;
  moral_class: 'good' | 'average' | 'bad';
  karma_trend: 'rising' | 'falling' | 'stable';
}

export interface WorldKarmaState {
  collective_karma: number;
  karma_trend: 'rising' | 'falling' | 'stable';
  active_event?: {
    event_type: string;
    name: string;
    description: string;
    started_at: string;
    ends_at: string;
    effects: any;
  };
}
