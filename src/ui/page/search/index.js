import { connect } from 'react-redux';
import { doSearch, selectIsSearching, makeSelectSearchUris, makeSelectQueryWithOptions } from 'lbry-redux';
import SearchPage from './view';

const select = state => ({
  isSearching: selectIsSearching(state),
  uris: makeSelectSearchUris(makeSelectQueryWithOptions()(state))(state),
});

const perform = {
  doSearch,
};

export default connect(
  select,
  perform
)(SearchPage);
