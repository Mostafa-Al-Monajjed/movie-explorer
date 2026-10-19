import { z } from "zod";

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  release_date: z.string().optional(),
  vote_average: z.number(),
  genre_ids: z.array(z.number()).optional(),
});

export const PaginatedMoviesSchema = z.object({
  page: z.number(),
  results: z.array(MovieSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export type Movie = z.infer<typeof MovieSchema>;
export type PaginatedMovies = z.infer<typeof PaginatedMoviesSchema>;

export const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const VideoSchema = z.object({
  key: z.string(),
  name: z.string(),
  site: z.string(),
  type: z.string(),
  official: z.boolean().optional(),
  published_at: z.string().optional(),
});

export const CastMemberSchema = z.object({
  id: z.number(),
  name: z.string(),
  character: z.string().optional(),
  profile_path: z.string().nullable(),
});

export const CrewMemberSchema = z.object({
  id: z.number(),
  name: z.string(),
  job: z.string(),
});

export const MovieDetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  tagline: z.string().optional(),
  overview: z.string(),
  runtime: z.number().nullable().optional(),
  release_date: z.string().optional(),
  vote_average: z.number(),
  vote_count: z.number(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  genres: z.array(GenreSchema),
  videos: z.object({ results: z.array(VideoSchema) }),
  credits: z.object({
    cast: z.array(CastMemberSchema),
    crew: z.array(CrewMemberSchema),
  }),
});

export type Video = z.infer<typeof VideoSchema>;
export type CastMember = z.infer<typeof CastMemberSchema>;
export type MovieDetails = z.infer<typeof MovieDetailsSchema>;

export const GenresResponseSchema = z.object({
  genres: z.array(GenreSchema),
});

export type Genre = z.infer<typeof GenreSchema>;
