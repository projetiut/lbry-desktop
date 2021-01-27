import { connect } from 'react-redux';
import PlaylistContent from './view';
import { makeSelectUrlsForPlaylistId } from 'redux/selectors/playlists';

const select = (state, props) => ({
  claims: makeSelectUrlsForPlaylistId(props.name)(state),
});

const perform = dispatch => ({});

export default connect(select, perform)(PlaylistContent);
