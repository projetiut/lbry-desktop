import { connect } from 'react-redux';
import PlaylistContent from './view';
import { makeSelectUrlsForPlaylist } from 'redux/selectors/playlists';

const select = (state, props) => ({
  claims: makeSelectUrlsForPlaylist(props.name)(state),
});

const perform = dispatch => ({});

export default connect(select, perform)(PlaylistContent);
