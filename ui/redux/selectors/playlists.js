// @flow
import { createSelector } from 'reselect';

const selectState = (state: { playlists: PlaylistState }) => state.playlists;

export const selectPlaylists = createSelector(selectState, state => state.listsById);

export const makeSelectPlaylistForId = (id: string) =>
  createSelector(selectPlaylists, lists => {
    const playlist = lists[id];
    playlist[id] = id;
    return playlist;
  });

export const makeSelectUrlsForPlaylistId = (id: string) =>
  createSelector(makeSelectPlaylistForId(id), playlist => {
    const items = playlist.items || [];
    const urls = items.map(item => item.url);
    return urls;
  });
