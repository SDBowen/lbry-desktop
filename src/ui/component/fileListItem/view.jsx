// @flow
import * as icons from 'constants/icons';
import React, { useEffect } from 'react';
import { normalizeURI, convertToShareLink } from 'lbry-redux';
import CardMedia from 'component/cardMedia';
import TruncatedText from 'component/common/truncated-text';
import Icon from 'component/common/icon';
import UriIndicator from 'component/uriIndicator';
import classnames from 'classnames';
import FilePrice from 'component/filePrice';
import { openCopyLinkMenu } from 'util/context-menu';
import DateTime from 'component/dateTime';
import { withRouter } from 'react-router-dom';
import { formatLbryUriForWeb } from 'util/uri';
import FileProperties from 'component/fileProperties';

type Props = {
  uri: string,
  claim: ?StreamClaim,
  fileInfo: ?{},
  metadata: ?StreamMetadata,
  rewardedContentClaimIds: Array<string>,
  obscureNsfw: boolean,
  claimIsMine: boolean,
  pending?: boolean,
  resolveUri: string => void,
  isResolvingUri: boolean,
  isSubscribed: boolean,
  isNew: boolean,
  placeholder: boolean,
  preventResolve: boolean,
  history: { push: string => void },
  thumbnail: string,
  title: string,
  nsfw: boolean,
};

function FileListItem(props) {
  const {
    obscureNsfw,
    claimIsMine,
    pending,
    layout,
    history,
    uri,
    isResolvingUri,
    placeholder,
    thumbnail,
    title,
    nsfw,
    resolveUri,
    claim,
    large,
  } = props;

  const noClaim = claim === null;

  useEffect(() => {
    if (!pending && !isResolvingUri && !noClaim && uri) {
      resolveUri(uri);
    }
  }, [pending, isResolvingUri, uri, resolveUri, noClaim]);

  function handleContextMenu(e) {
    event.preventDefault();
    event.stopPropagation();
    if (claim) {
      openCopyLinkMenu(convertToShareLink(claim.permanent_url), event);
    }
  }

  function onClick(e) {
    if (title && !pending) {
      e.stopPropagation();
      history.push(formatLbryUriForWeb(uri));
    }
  }

  const abandoned = !isResolvingUri && !title && !placeholder;
  const shouldHide = abandoned || (!claimIsMine && !pending && obscureNsfw && nsfw);
  if (shouldHide) {
    return null;
  }

  if (!claim) {
    // placeholder
    return null;
  }

  const isChannel = claim && claim.value_type === 'channel';
  const claimsInChannel = isChannel ? claim.meta.claims_in_channel : 0;

  return (
    <li
      tabIndex="0"
      role="link"
      onClick={onClick}
      onContextMenu={handleContextMenu}
      className={classnames('file-list__item', {
        'file-list__item--large': large,
      })}
    >
      <CardMedia thumbnail={thumbnail} />

      <div className="file-list__item-info">
        <div className="file-list__item-title">
          <TruncatedText text={title} lines={2} />
        </div>
        <div className="media__subtitle">
          {pending ? <div>Pending...</div> : <UriIndicator uri={uri} link />}
          <div>{isChannel ? `${claimsInChannel} ${__('publishes')}` : <DateTime timeAgo uri={uri} />}</div>
        </div>
      </div>

      <div className="file-list__item-properties">
        <FileProperties uri={uri} />
      </div>
    </li>
  );
}

export default withRouter(FileListItem);
