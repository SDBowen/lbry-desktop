import { connect } from 'react-redux';
import { selectUnreadAmount } from 'redux/selectors/subscriptions';
import { selectShouldShowInviteGuide } from 'redux/selectors/app';
import { selectFollowedTags, selectMyClaimsWithoutChannels } from 'lbry-redux';
import SideBar from './view';

const select = state => ({
  unreadSubscriptionTotal: selectUnreadAmount(state),
  shouldShowInviteGuide: selectShouldShowInviteGuide(state),
  followedTags: selectFollowedTags(state),
  myClaims: selectMyClaimsWithoutChannels(state),
});

const perform = () => ({});

export default connect(
  select,
  perform
)(SideBar);
