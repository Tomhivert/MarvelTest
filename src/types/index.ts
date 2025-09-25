export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}

export interface ErrorResponse {
  error: string;
  message?: string;
  path?: string;
  method?: string;
}

// TMDB API Types
export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  credits?: {
    cast: TMDBCastMember[];
  };
}

export interface TMDBCastMember {
  id: number;
  name: string;
  character: string;
  order: number;
}

export interface TMDBMovieCredits {
  id: number;
  cast: TMDBCastMember[];
}

// Assignment Response Types
export interface MoviesPerActorResponse {
  [actorName: string]: string[];
}

export interface ActorCharacter {
  movieName: string;
  characterName: string;
}

export interface ActorsWithMultipleCharactersResponse {
  [actorName: string]: ActorCharacter[];
}

export interface CharacterActor {
  movieName: string;
  actorName: string;
}

export interface CharactersWithMultipleActorsResponse {
  [characterName: string]: CharacterActor[];
}
