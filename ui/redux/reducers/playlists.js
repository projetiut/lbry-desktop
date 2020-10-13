// @flow
import { handleActions } from 'util/redux-utils';
import * as ACTIONS from 'constants/action_types';

type PlaylistItem = {
  url: string,
  leftOff: number,
  added?: Date,
};

type Playlist = {
  items: Array<PlaylistItem>,
  name: string,
  userList: boolean,
  saved: boolean, //
  collectionUrl?: string,
};

type PlaylistState = {
  lists: { [string]: Playlist },
};
// find some way to store resolved pl={url} collection playlists that are not saved
// find some way to copy url collection playlists to saved/sidebar playlists
const defaultState: PlaylistState = {
  lists: {
    watchlater: {
      items: [{ url: 'lbry://@seriously#5/seriouspublish#c', leftOff: 0 }],
      name: 'watch later',
      userList: false,
      saved: true,
    },
    favorites: {
      items: [
        { url: 'lbry://@seriously#5/seriouspublish#c', leftOff: 0 },
        { url: 'lbry://@JIGGYTOM#4/niece#a', leftOff: 0 },
        { url: 'lbry://@Karmakut#7/my-new-favorite-vehicle-in-squad-ft#4', leftOff: 0 },
      ],
      name: 'favorites',
      userList: false,
      saved: true,
    },
    // randomid to start with, id becomes
    mygarbageid: {
      items: [],
      name: 'garbage',
      userList: true,
      saved: true,
    },
  },
};

export default handleActions(
  {
    [ACTIONS.PLAYLIST_ADD]: (state, action) => {
      const { lists } = state;
      const { name } = action.data;
      if (lists && !lists[name]) {
        lists[name] = {
          items: [],
          name: name,
        };
      }
      return Object.assign({}, state, {
        lists,
      });
    },

    [ACTIONS.PLAYLIST_DELETE]: (state, action) => {
      const { lists } = state;
      const { name } = action.data;
      if (lists && lists[name] && lists[name].userList) {
        delete lists[name];
      }
      return Object.assign({}, state, {
        lists,
      });
    },

    [ACTIONS.PLAYLIST_LIST_ADD]: (state, action) => {
      const { lists } = state;
      const { listName, url } = action.data;
      if (lists[listName]) {
        lists[listName].items.push(url);
      }

      return Object.assign({}, state, {
        lists,
      });
    },

    [ACTIONS.PLAYLIST_LIST_DELETE]: (state, action) => {
      const { lists } = state;
      const { listName, url } = action.data;
      if (lists[listName]) {
        lists[listName].items.push(url);
      }

      return Object.assign({}, state, {
        lists,
      });
    },

    [ACTIONS.PLAYLIST_LIST_UPDATE]: (state, action) => {
      const { lists } = state;
      const { listName, list } = action.data;
      if (lists[listName]) {
        lists[listName] = list;
      }

      return Object.assign({}, state, {
        lists,
      });
    },
  },
  defaultState
);
