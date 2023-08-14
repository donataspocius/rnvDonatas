export interface MovieCardProps {
  title: string;
  posterUrl: string;
  id: string;
}

export interface MovieDetailsProps extends MovieCardProps {
  duration: string;
  genre: string[];
  rating: string;
  summary: string;
  videoUrl: string;
  year: string;
}
