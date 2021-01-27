import { connect } from 'react-redux';
import PlaylistAdd from './view';
import { withRouter } from 'react-router';
import { selectPlaylists } from 'redux/selectors/playlists';
import { doAddPlaylist, doUpdatePlaylist } from 'redux/actions/playlists';
import { makeSelectClaimForUri } from 'lbry-redux';

// playlists
// createPlaylist
// playlistAddClaim

const select = (state, props) => ({
  claim: makeSelectClaimForUri(props.uri)(state),
  playlists: selectPlaylists(state),
});

const perform = dispatch => ({
  addPlaylist: name => dispatch(doAddPlaylist(name)),
  updatePlaylist: (name, params) => dispatch(doUpdatePlaylist(name, params)),
});

export default withRouter(connect(select, perform)(PlaylistAdd));
