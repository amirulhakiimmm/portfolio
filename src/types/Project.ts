export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  type: string;
  typeColor: string;
  year: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  coverImage: string;
  images: string[];
  longDescription: string;
  role: string;
  duration: string;
  highlights: string[];
}