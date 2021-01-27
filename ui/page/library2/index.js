import { connect } from 'react-redux';
import {
  selectDownloadUrlsCount,
  selectIsFetchingFileList,
  selectMyPurchases,
  selectIsFetchingMyPurchases,
  doPurchaseList,
} from 'lbry-redux';
import { selectPlaylists } from 'redux/selectors/playlists';
import LibraryPage from './view';

const select = state => ({
  allDownloadedUrlsCount: selectDownloadUrlsCount(state),
  fetchingFileList: selectIsFetchingFileList(state),
  myPurchases: selectMyPurchases(state),
  fetchingMyPurchases: selectIsFetchingMyPurchases(state),
  playlists: selectPlaylists(state),
});

export default connect(select, {
  doPurchaseList,
})(LibraryPage);
