// @flow
import * as ICONS from 'constants/icons';
import classnames from 'classnames';
import React from 'react';
import ChannelThumbnail from 'component/channelThumbnail';
import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button';
import ChannelTitle from 'component/channelTitle';
import Icon from 'component/common/icon';

type Props = {
  selectedChannelUrl: string, // currently selected channel
  channels: ?Array<ChannelClaim>,
  onChannelSelect: (url: string) => void,
};

type ListItemProps = {
  uri: string,
  isSelected?: boolean,
};

function ChannelListItem(props: ListItemProps) {
  const { uri, isSelected = false } = props;

  return (
    <div className={classnames('channel__list-item', { 'channel__list-item--selected': isSelected })}>
      <ChannelThumbnail uri={uri} />
      <ChannelTitle uri={uri} />
      {isSelected && <Icon icon={ICONS.DOWN} />}
    </div>
  );
}

function ChannelSelector(props: Props) {
  const { channels, activeChannelClaim, setActiveChannel } = props;
  const activeChannelUrl = activeChannelClaim && activeChannelClaim.canonical_url;

  function handleChannelSelect(channelClaim) {
    if (channelClaim.claim_id !== activeChannelClaim.claim_id) {
      setActiveChannel(channelClaim.claim_id);
    }
  }

  if (!channels || !activeChannelUrl) {
    return null;
  }

  return (
    <Menu className="channel__selector">
      <MenuButton className="">
        <ChannelListItem uri={activeChannelUrl} isSelected />
      </MenuButton>
      <MenuList className="menu__list channel__list">
        {channels &&
          channels.map(channel => (
            <MenuItem
              key={channel.canonical_url}
              onSelect={() => {
                if (activeChannelUrl !== channel.canonical_url) {
                  onChannelSelect(channel.canonical_url);
                }
              }}
            >
              <ChannelListItem uri={channel.canonical_url} />
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  );
}

export default ChannelSelector;
