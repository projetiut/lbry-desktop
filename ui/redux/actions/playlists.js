// @flow
import * as ACTIONS from 'constants/action_types';
import { makeSelectPlaylistForId } from 'redux/selectors/playlists';
import { v4 as uuid } from 'uuid';

export const doAddPlaylist = name => (dispatch: Dispatch, getState: GetState) => {
  const state = getState();
  // if (existing) {
  //   return dispatch({
  //     type: ACTIONS.PLAYLIST_ERROR,
  //     data: {
  //       message: 'there is already a playlist with that name',
  //     },
  //   });
  // }
  return dispatch({
    type: ACTIONS.PLAYLIST_CREATE,
    data: {
      items: [],
      id: uuid(), // start with a uuid, this becomes a claimId after publish
      name: name,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      collectionClaimId: null,
      builtin: false,
    },
  });
};

export const doUpdatePlaylist = (id, params) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState();
  const playlist = makeSelectPlaylistForId(id)(state);

  console.log('playlist', playlist)
  const generatePlaylistItem = (claim) => {
    if (claim && claim.canonical_url) {
      const item = {};
      item.url = claim.canonical_url;
      item.claimId = claim.claim_id;
      item.addedAt = Date.now();
      return item;
    }
  };

  if (!playlist) {
    return dispatch({
      type: ACTIONS.PLAYLIST_ERROR,
      data: {
        message: 'playlist does not exist',
      },
    });
  }

  const items = playlist.items;
  console.log('items', items)
  if (params.claims) {
    params.claims.forEach(claim => items.push(generatePlaylistItem(claim)));
  }

  // add addedat date
  dispatch({
    type: ACTIONS.PLAYLIST_UPDATE,
    data: {
      name: name,
      playlist: {
        items: items,
        id: playlist.id,
        name: params.name || playlist.name,
        createdAt: playlist.createdAt,
        updatedAt: Date.now(),
        collectionClaimId: playlist.collectionClaimId,
        builtin: playlist.builtin,
      },
    },
  });
};
