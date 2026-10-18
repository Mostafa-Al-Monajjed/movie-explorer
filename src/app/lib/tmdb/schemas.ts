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
