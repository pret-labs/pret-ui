import ReactModal from 'react-modal';
import clsx from 'classnames';
import CloseIcon from '../../../images/close.svg';
import FireIcon from '../../../images/fire.svg';
import { useIntl } from 'react-intl';
import messages from './messages';
import { CSSProperties, useEffect, useState } from 'react';
import { ethers, providers } from 'ethers';
import { BigNumber, normalize, valueToBigNumber } from '@aave/protocol-js';
import { useUserWalletDataContext } from '../../../libs/web3-data-provider';
import { isValid } from '../../../helpers/number';
import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import { useIncentivesDataContext } from '../../../libs/pool-data-provider/hooks/use-incentives-data-context';
import { useDynamicPoolDataContext } from '../../../libs/pool-data-provider';
import { EthTransactionData, sendEthTransaction } from '../../../helpers/send-ethereum-tx';
import { useWeb3React } from '@web3-react/core';
import { UiIncentiveDataProvider } from '@pret/contract-helpers';

const TOKEN_BALANCE_OF_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
];

const AIRDROP_ABI = [
  {
    inputs: [],
    name: 'claimAll',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getTotalAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getPendingAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getClaimableAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

function _OverlayElement(
  _props: React.ComponentPropsWithRef<'div'>,
  contentEl: React.ReactElement
) {
  const { className, ...props } = _props;
  return (
    <div className={clsx(className, 'AirdropModal__Overlay')} {...props}>
      {contentEl}
      <style jsx={true} global={true}>{`
        .AirdropModal__Overlay {
          transition: backdrop-filter 0.3s ease-in-out;
          backdrop-filter: blur(10px);
          padding: 0 14px !important;
        }
      `}</style>
    </div>
  );
}

function _ContentElement(_props: React.ComponentPropsWithRef<'div'>, children: React.ReactNode) {
  const { className, style, ...props } = _props;
  return (
    <div className={clsx(className, 'AirdropModal__Content')} {...props}>
      {children}
      <style jsx={true} global={true}>{`
        .AirdropModal__Content {
          width: 560px;
          max-width: 100% !important;
          padding: 30px !important;
          background: #181a20;
          border-radius: 12px;
          color: white;
          align-items: flex-start;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}

function SpaceLine({ style }: { style?: CSSProperties }) {
  return (
    <>
      <hr className="AirdropModal__space-line" style={style} />
      <style jsx={true} global={true}>{`
        .AirdropModal {
          &__space-line {
            width: 100%;
            height: 1px;
            border: 0;
            border-radius: 9999px;
            background: rgba(255, 255, 255, 0.2);
          }
        }
      `}</style>
    </>
  );
}

function AirdropModal({ onRequestClose }: { onRequestClose: () => void }) {
  const intl = useIntl();

  const { currentMarketData, networkConfig } = useProtocolDataContext();
  const cornTokenParams = currentMarketData.cornTokenParams;
  const cornDecimals = cornTokenParams.options.decimals;
  const cornAirdropAddress = currentMarketData.cornAirdropAddress;

  const { library: provider } = useWeb3React<providers.Web3Provider>();

  const { currentAccount } = useUserWalletDataContext();
  const [cornAirdropContract, setCornAirdropContract] = useState<ethers.Contract | null>(null);
  const [airdropClaimableAmountRaw, setAirdropClaimableAmountRaw] = useState('0');
  const [preMiningClaimableAmountRaw, setPreMiningClaimableAmountRaw] = useState('0');
  const [cornBalance, setCornBalance] = useState('-');
  const [airdropData, setAirdropData] = useState<{
    totalAmount: string;
    pendingAmount: string;
    claimableAmount: string;
  }>({
    totalAmount: '-',
    pendingAmount: '-',
    claimableAmount: '-',
  });
  const [preMiningData, setPreMiningData] = useState<{
    totalAmount: string;
    pendingAmount: string;
    claimableAmount: string;
  }>({
    totalAmount: '-',
    pendingAmount: '-',
    claimableAmount: '-',
  });

  const [refresh, setRefresh] = useState(false);

  const { user } = useDynamicPoolDataContext();
  const { userIncentives, incentivesTxBuilder } = useIncentivesDataContext();
  const incentivesControllerAddress = networkConfig.addresses.incentiveControllers?.corn;
  const incentiveData =
    incentivesControllerAddress &&
    userIncentives
      .map((incentive) => {
        for (let k in incentive) {
          if (k.toLowerCase() === incentivesControllerAddress.toLowerCase()) {
            return incentive[k];
          }
        }
        return undefined;
      })
      .find(Boolean);

  console.log({ cornAirdropAddress });
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    const _cornAirdropContract = new ethers.Contract(cornAirdropAddress, AIRDROP_ABI, signer);
    const _cornTokenContract = new ethers.Contract(
      cornTokenParams.options.address,
      TOKEN_BALANCE_OF_ABI,
      signer
    );

    setCornAirdropContract(_cornAirdropContract);
    Promise.all([
      _cornAirdropContract.getTotalAmount(currentAccount),
      _cornAirdropContract.getPendingAmount(currentAccount),
      _cornAirdropContract.getClaimableAmount(currentAccount),
      _cornTokenContract.balanceOf(currentAccount),
    ]).then(([_totalAmount, _pendingAmount, _claimableAmount, _cornBalance]) => {
      setAirdropClaimableAmountRaw(_claimableAmount.toString());
      const totalAmount = valueToBigNumber(
        normalize(valueToBigNumber(_totalAmount.toString()).toString(), cornDecimals)
      ).toFixed(4, BigNumber.ROUND_DOWN);
      const pendingAmount = valueToBigNumber(
        normalize(valueToBigNumber(_pendingAmount.toString()).toString(), cornDecimals)
      ).toFixed(4, BigNumber.ROUND_DOWN);
      const claimableAmount = valueToBigNumber(
        normalize(valueToBigNumber(_claimableAmount.toString()).toString(), cornDecimals)
      ).toFixed(4, BigNumber.ROUND_DOWN);
      const cornBalance = valueToBigNumber(
        normalize(valueToBigNumber(_cornBalance.toString()).toString(), cornDecimals)
      ).toFixed(4, BigNumber.ROUND_DOWN);
      setAirdropData({
        totalAmount,
        pendingAmount,
        claimableAmount,
      });
      setCornBalance(cornBalance);
    });

    (async function () {
      if (!incentivesControllerAddress) {
        throw new Error('Need to config corn incentivesControllerAddress');
      }
      if (networkConfig.addresses.uiIncentiveDataProvider) {
        const incentiveDataProviderContract = new UiIncentiveDataProvider({
          incentiveDataProviderAddress: networkConfig.addresses.uiIncentiveDataProvider,
          provider,
        });

        try {
          const {
            0: _totalAmountRaw,
            1: _pendingAmountRaw,
            2: _claimableAmountRaw,
          } = await incentiveDataProviderContract.getProgressiveIncentivesData(
            currentAccount,
            currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
            incentivesControllerAddress
          );
          setPreMiningClaimableAmountRaw(_claimableAmountRaw.toString());
          const [totalAmount, pendingAmount, claimableAmount] = [
            _totalAmountRaw,
            _pendingAmountRaw,
            _claimableAmountRaw,
          ].map((rewardRawData) =>
            valueToBigNumber(
              normalize(valueToBigNumber(rewardRawData.toString()).toString(), cornDecimals)
            ).toFixed(4, BigNumber.ROUND_DOWN)
          );
          setPreMiningData({
            totalAmount,
            pendingAmount,
            claimableAmount,
          });
        } catch (e) {
          throw e;
        }
      }
    })();
  }, [refresh]);

  return (
    <ReactModal isOpen={true} overlayElement={_OverlayElement} contentElement={_ContentElement}>
      <img
        className="AirdropModal__close-icon"
        src={CloseIcon}
        alt="close"
        onClick={onRequestClose}
        role="button"
      />
      <div className="AirdropModal__title-section">
        <img src={FireIcon} alt="fire" />
        <h3>{intl.formatMessage(messages.airdropModalName)}</h3>
      </div>
      <SpaceLine style={{ margin: '16px 0' }} />
      <div className="AirdropModal__CORN-balance">
        <div>
          <div className="corn-balance">{cornBalance} CORN</div>
          <p className="corn-balance-title">
            {intl.formatMessage(messages.yourCORNBalanceOn)} <span>AURORA</span>
          </p>
        </div>
        <button
          className="AirdropModal__purple-button"
          onClick={async () => {
            if (window.ethereum && window.ethereum.request) {
              await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: cornTokenParams as any,
              });
            }
          }}
        >
          {intl.formatMessage(messages.addCORNToMetamask)}
        </button>
      </div>
      <SpaceLine style={{ margin: '15px 0 8px' }} />
      <div className="AirdropModal__data-section">
        <p className="AirdropModal__subtitle">{intl.formatMessage(messages.pretPremining)}</p>
        <div className="AirdropModal__data-row">
          <div>
            <p className="data">{preMiningData.totalAmount} CORN</p>
            <p className="title">{intl.formatMessage(messages.totalRewards)}</p>
          </div>
          <div>
            <p className="data">{preMiningData.pendingAmount} CORN</p>
            <p className="title">{intl.formatMessage(messages.pendingRewards)}</p>
          </div>
          <div>
            <p className="data">{preMiningData.claimableAmount} CORN</p>
            <p className="title">{intl.formatMessage(messages.claimable)}</p>
          </div>
          <button
            className="AirdropModal__purple-button"
            disabled={
              !isValid(preMiningClaimableAmountRaw) ||
              valueToBigNumber(preMiningClaimableAmountRaw).eq(0)
            }
            onClick={async () => {
              if (!incentivesControllerAddress) {
                throw new Error('Need to config corn incentivesControllerAddress');
              }
              if (!user || !incentiveData) return;
              try {
                const transactions = await Promise.all(
                  incentivesTxBuilder.claimRewards({
                    user: user.id,
                    assets: incentiveData.assets,
                    to: user.id,
                    incentivesControllerAddress,
                  })
                );
                const actionTx = transactions[0];
                const uncheckedActionTxData = {
                  txType: actionTx.txType,
                  unsignedData: actionTx.tx,
                  gas: actionTx.gas,
                } as EthTransactionData;
                const actionTxData = uncheckedActionTxData.unsignedData
                  ? (uncheckedActionTxData as EthTransactionData & {
                      unsignedData: EthTransactionData;
                    })
                  : undefined;
                actionTxData &&
                  (await sendEthTransaction(
                    actionTxData.unsignedData,
                    provider,
                    // no need state setter
                    () => {},
                    null
                  ));
              } catch (e) {
                throw e;
              } finally {
                setRefresh(!refresh);
              }
            }}
          >
            {intl.formatMessage(messages.claim)}
          </button>
        </div>
      </div>
      <SpaceLine style={{ margin: '15px 0 8px' }} />
      <div className="AirdropModal__data-section">
        <p className="AirdropModal__subtitle">{intl.formatMessage(messages.airdrop)}</p>
        <div className="AirdropModal__data-row">
          <div>
            <p className="data">{airdropData.totalAmount} CORN</p>
            <p className="title">{intl.formatMessage(messages.totalRewards)}</p>
          </div>
          <div>
            <p className="data">{airdropData.pendingAmount} CORN</p>
            <p className="title">{intl.formatMessage(messages.pendingRewards)}</p>
          </div>
          <div>
            <p className="data">{airdropData.claimableAmount} CORN</p>
            <p className="title">{intl.formatMessage(messages.claimable)}</p>
          </div>
          <button
            className="AirdropModal__purple-button"
            disabled={
              !isValid(airdropClaimableAmountRaw) ||
              valueToBigNumber(airdropClaimableAmountRaw).eq(0)
            }
            onClick={async () => {
              if (!cornAirdropContract) {
                throw new Error('Airdrop Contract Initialize failed');
              }
              try {
                await cornAirdropContract.claimAll();
              } catch (e) {
                throw e;
              } finally {
                setRefresh(!refresh);
              }
            }}
          >
            {intl.formatMessage(messages.claim)}
          </button>
        </div>
      </div>
      <style jsx={true} global={true}>{`
        .AirdropModal {
          &__data-section {
            width: 100%;
          }
          &__data-row {
            width: 100%;
            margin-top: 8px;
            text-align: left;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .data {
              font-size: 16px;
            }
            .title {
              font-size: 12px;
              color: #656565;
              margin-top: 2px;
            }
          }
          &__subtitle {
            text-align: left;
            font-size: 12px;
            color: #4c38dc;
          }
          &__title-section {
            font-size: 14px;
            font-weight: 500;
            display: flex;
            img {
              width: 12px;
              height: 16px;
              margin-right: 15px;
            }
          }

          &__CORN-balance {
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-align: left;
            width: 100%;

            .corn-balance {
              font-size: 16px;
            }

            .corn-balance-title {
              margin-top: 2px;
              font-size: 12px;
              span {
                color: #3ab563;
              }
            }
          }

          &__purple-button {
            color: white;
            background: #4c38dc;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 12px;
            transition: all 300ms linear;
            &:hover {
              background: #4c38dccc;
              color: #ffffffcc;
            }
            &:disabled {
              background: gray;
            }
          }
          &__close-icon {
            width: 24px;
            height: 24px;
            position: absolute;
            right: 24px;
            top: 15px;
            &:hover {
              cursor: pointer;
            }
          }
        }
      `}</style>
    </ReactModal>
  );
}

export default AirdropModal;
