import { fetch } from '@/common/api/root';

export type ArtistDTO = {
  id: number;
  name: string | null;
};

export const getArtists = () => {
  return fetch<ArtistDTO[]>('/artists');
};

export const getArtist = (id: number | string) => {
  return fetch<ArtistDTO>(`/artists/${id}`);
};
