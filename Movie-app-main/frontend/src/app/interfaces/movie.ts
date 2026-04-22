import { Genre } from './genre';

export interface Movie {
  id: number;
  title: string;
  description: string;
  release_year: number;
  genre: Genre;
  poster_url?: string;
  video_url?: string;
  is_premium: boolean;
}