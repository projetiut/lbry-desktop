// @flow
import { handleActions } from 'util/redux-utils';
import * as ACTIONS from 'constants/action_types';

type PlaylistItem = {
  url: string,
  leftOff: number,
  added?: number,
};

type Playlist = {
  items: Array<PlaylistItem>,
  name: string,
  createdAt: number,
  updatedAt: number,
  collectionClaimId: ?string,
  builtin: boolean,
};

type PlaylistState = {
  lists: { [string]: Playlist },
};
// find some way to store resolved pl={url} collection playlists that are not saved
// find some way to copy url collection playlists to saved/sidebar playlists
const defaultState: PlaylistState = {
  listsById: {
    watchlater: {
      items: [{ url: 'lbry://@seriously#5/seriouspublish#c'}],
      id: 'watchlater',
      name: 'Watch Later',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      collectionClaimId: null,
      builtin: true,
    },
    favorites: {
      items: [
        { url: 'lbry://@seriously#5/seriouspublish#c'},
        { url: 'lbry://@JIGGYTOM#4/niece#a'},
        { url: 'lbry://@Karmakut#7/my-new-favorite-vehicle-in-squad-ft#4'},
      ],
      id: 'favorites',
      name: 'Favorites',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      collectionClaimId: null,
      builtin: true,
    },
    // randomid to start with, id becomes
    // mygarbageid: {
    //   items: [],
    //   name: 'garbage',
    //   createdAt: Date.now(),
    //   updatedAt: Date.now(),
    //   collectionClaimId: null,
    //   builtin: false,
    // },
  },
  error: null,
};

export default handleActions(
  {
    [ACTIONS.PLAYLIST_CREATE]: (state, action) => {
      const params = action.data; // { id:, items: Array<any>}
      const newListTemplate = {
        id: params.id,
        name: params.name,
        items: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        collectionClaimId: null,
        builtin: false,
      };

      const newList = Object.assign({}, newListTemplate, { ...params });
      const { listsById: lists } = state;
      const newLists = Object.assign({}, lists, { [params.id]: newList });

      return {
        ...state,
        listsById: newLists,
      };
    },

    [ACTIONS.PLAYLIST_DELETE]: (state, action) => {
      const { listsById: lists } = state;
      const { name } = action.data;
      if (lists && lists[name] && lists[name].userList) {
        delete lists[name];
      }
      return Object.assign({}, state, {
        lists,
      });
    },

    [ACTIONS.PLAYLIST_UPDATE]: (state, action) => {
      const { listsById: lists } = state;
      const newLists = Object.assign({}, lists);

      const { name, playlist } = action;
      newLists[name] = playlist;
      newLists[name]['updatedAt'] = Date.now();

      return {
        ...state,
        listsById: newLists,
      };
    },
    [ACTIONS.PLAYLIST_ERROR]: (state, action) => {

      return Object.assign({}, state, {
        error: action.data.message,
      });
    },
  },
  defaultState
);
