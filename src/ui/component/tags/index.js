import { connect } from 'react-redux';
import { selectAllTags, selectFollowedTags, doToggleTagFollow, doAddTag, doDeleteTag } from 'lbry-redux';
import Tag from './view';

const select = (state, props) => ({
  tags: selectAllTags(state),
  followedTags: selectFollowedTags(state),
});

export default connect(
  select,
  {
    doToggleTagFollow,
    doAddTag,
    doDeleteTag,
  }
)(Tag);
