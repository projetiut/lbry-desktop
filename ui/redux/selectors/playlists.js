// @flow
import { createSelector } from 'reselect';

const selectState = (state: { playlists: PlaylistState }) => state.playlists;

export const selectPlaylists = createSelector(selectState, state => state.lists);

export const makeSelectPlaylistForName = (name: string) =>
  createSelector(selectPlaylists, lists => {
    return lists[name];
  });

export const makeSelectUrlsForPlaylist = (name: string) =>
  createSelector(makeSelectPlaylistForName(name), playlist => {
    const items = playlist.items || [];
    const urls = items.map(item => item.url);
    return urls;
  });
