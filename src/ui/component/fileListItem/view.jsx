// @flow
import * as icons from 'constants/icons';
import * as React from 'react';
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

// class FileCard extends React.PureComponent<Props> {

//   componentDidMount() {
//     if (!this.props.preventResolve) {
//       this.resolve(this.props);
//     }
//   }

//   componentDidUpdate() {
//     if (!this.props.preventResolve) {
//       this.resolve(this.props);
//     }
//   }

//   resolve = (props: Props) => {
//     const { isResolvingUri, resolveUri, claim, uri, pending } = props;

//     if (!pending && !isResolvingUri && claim === undefined && uri) {
//       resolveUri(uri);
//     }
//   };

function FileListItem(props) {
  const {
    // claim,
    // fileInfo,
    // rewardedContentClaimIds,
    obscureNsfw,
    claimIsMine,
    pending,
    // isSubscribed,
    // isNew,
    layout,
    history,
    uri,
    isResolvingUri,
    placeholder,
    thumbnail,
    title,
    nsfw,
  } = props;

  const abandoned = !isResolvingUri && !title && !placeholder;

  if (abandoned) {
    return null;
  }

  const shouldHide = !claimIsMine && !pending && obscureNsfw && nsfw;
  if (shouldHide) {
    return null;
  }

  const handleContextMenu = event => {
    event.preventDefault();
    event.stopPropagation();
    if (claim) {
      openCopyLinkMenu(convertToShareLink(claim.permanent_url), event);
    }
  };

  const onClick = e => {
    if (title && !pending) {
      e.stopPropagation();
      history.push(formatLbryUriForWeb(uri));
    }
  };

  return (
    <li
      tabIndex="0"
      role="button"
      onClick={onClick}
      onContextMenu={handleContextMenu}
      className={classnames('file-list__item', {
        'card--link': !pending,
        'media--pending': pending,
      })}
    >
      <CardMedia thumbnail={thumbnail} />
      <div className="list-item__info">
        <div className="media__title" style={{ maxWidth: 400 }}>
          <TruncatedText text={title} lines={2} />
        </div>
        <div className="media__subtitle">
          {pending ? <div>Pending...</div> : <UriIndicator uri={uri} link />}
          <div>
            <DateTime timeAgo uri={uri} />
          </div>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ width: '100%' }}>
          <FileProperties uri={uri} />
        </div>
        <div style={{ position: 'absolute', bottom: 10, right: 10 }}>
          <div className="media-properties">
            {['Bitcoin', 'LBRY', 'Science', 'History', 'Movie'].map(tag => {
              if (Math.random() > 0.71) {
                return (
                  <span key={tag} className="badge">
                    {tag}
                  </span>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </li>
  );
}

export default withRouter(FileListItem);
