import { connect } from 'react-redux';
import { selectMyChannelClaims } from 'lbry-redux';
import { selectActiveChannelClaim } from 'redux/selectors/app';
import { doSetActiveChannel } from 'redux/actions/app';
import SelectChannel from './view';

const select = state => ({
  channels: selectMyChannelClaims(state),
  activeChannelClaim: selectActiveChannelClaim(state),
});

export default connect(select, {
  doSetActiveChannel,
})(SelectChannel);
