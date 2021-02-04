// @flow
import { CHANNEL_NEW, CHANNEL_ANONYMOUS } from 'constants/claim';
import React, { Fragment } from 'react';
import { FormField } from 'component/common/form';

type Props = {
  hideAnon?: boolean,
  tiny?: boolean,
  label: string,
  myChannelClaims: ?Array<ChannelClaim>,
  injected: ?Array<string>,
  activeChannelClaim: ?ChannelClaim,
  setActiveChannel: string => void,
};

function SelectChannel(props: Props) {
  const {
    fetchingChannels,
    myChannelClaims = [],
    hideAnon,
    label,
    injected = [],
    tiny,
    activeChannelClaim,
    setActiveChannel,
  } = props;

  function handleChannelChange(event: SyntheticInputEvent<*>) {
    const channelClaimId = event.target.value;
    setActiveChannel(channelClaimId);
  }

  return (
    <>
      <FormField
        name="channel"
        label={!tiny && (label || __('Channel'))}
        labelOnLeft={tiny}
        type={tiny ? 'select-tiny' : 'select'}
        onChange={handleChannelChange}
        value={activeChannelClaim && activeChannelClaim.claim_id}
        disabled={fetchingChannels}
      >
        {fetchingChannels ? (
          <option>{__('Loading your channels...')}</option>
        ) : (
          <>
            {!hideAnon && <option value={CHANNEL_ANONYMOUS}>{__('Anonymous')}</option>}
            {myChannelClaims &&
              myChannelClaims.map(({ name, claim_id: claimId }) => (
                <option key={claimId} value={claimId}>
                  {name}
                </option>
              ))}
            {injected &&
              injected.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
          </>
        )}
      </FormField>
    </>
  );
}

export default SelectChannel;
