export interface Song {
  id?: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  mood: string;
  rating: number;
  user_id?: string | null;
  spotify_url?: string;
  cover_url?: string;
  created_at?: string;
  actions?: SongAction[];
}

export interface SongAction {
  label: string;
  icon: string;
  action: (song: Song) => void;
}
