import { connect } from 'react-redux';
import { selectFollowedTags, doFetchTrending, selectTrendingUris } from 'lbry-redux';
import DiscoverPage from './view';

const select = state => ({
  tags: selectFollowedTags(state),
  trending: selectTrendingUris(state),
});

const perform = {
  doFetchTrending,
};

export default connect(
  select,
  perform
)(DiscoverPage);
