import { connect } from 'react-redux';
import { selectUnreadAmount, selectSubscriptions } from 'redux/selectors/subscriptions';
import { selectShouldShowInviteGuide } from 'redux/selectors/app';
import { selectFollowedTags, selectMyClaimsWithoutChannels } from 'lbry-redux';
import SideBar from './view';

const select = state => ({
  subscriptions: selectSubscriptions(state),
  shouldShowInviteGuide: selectShouldShowInviteGuide(state),
  followedTags: selectFollowedTags(state),
  myClaims: selectMyClaimsWithoutChannels(state),
});

const perform = () => ({});

export default connect(
  select,
  perform
)(SideBar);
