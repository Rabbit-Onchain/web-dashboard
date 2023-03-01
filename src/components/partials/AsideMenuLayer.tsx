import React from 'react'
import { mdiLogout, mdiClose, mdiLogin } from '@mdi/js'
import BaseIcon from '../ui/BaseIcon'
import AsideMenuItem from './AsideMenuItem'
import AsideMenuList from './AsideMenuList'
import { MenuAsideItem } from '../../interfaces'
import { useAppSelector, useAppDispatch } from '../../stores/hooks'
import { useState, useEffect } from 'react'
import { setUser } from "../../stores/mainSlice"
import { Wallet } from '../../core/service/near-protocol/near-wallet';
import { RabbitNft } from '../../core/service/near-protocol/near-interface'


type Props = {
  menu: MenuAsideItem[]
  className?: string
  onAsideLgCloseClick: () => void
}

export default function AsideMenuLayer({ menu, className = '', ...props }: Props) {
  const dispatch = useAppDispatch()
  const asideStyle = useAppSelector((state) => state.style.asideStyle)
  const asideBrandStyle = useAppSelector((state) => state.style.asideBrandStyle)
  const asideScrollbarsStyle = useAppSelector((state) => state.style.asideScrollbarsStyle)
  const darkMode = useAppSelector((state) => state.style.darkMode)

  const logoutItem: MenuAsideItem = {
    label: 'Disconnect Wallet',
    icon: mdiLogout,
    color: 'info',
    isLogout: true,
  }

  const loginItem: MenuAsideItem = {
    label: 'Connect Wallet',
    icon: mdiLogin,
    color: 'info',
    isLogin: true,
  }

  const handleAsideLgCloseClick = (e: React.MouseEvent) => {
    e.preventDefault()
    props.onAsideLgCloseClick()
  }

  const [isLogin, setIsLogin] = useState(false)
  const CONTRACT_ADDRESS = "dev-1677397761500-82279137383421";
  const [wallet, setWallet] = useState(null)
  const [contract, setContract] = useState(null)
  useEffect(() => {
    const initConnectWallet = async () => {
      let newWallet = await new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS })
      setWallet(newWallet)
      window['rabbitNft'] = new RabbitNft({
        contractId: CONTRACT_ADDRESS,
        walletToUse: newWallet
      });

      setContract(new RabbitNft({
        contractId: CONTRACT_ADDRESS,
        walletToUse: wallet
      }));

      let isSignedIn = await newWallet.startUp();
      if (isSignedIn) {
        // signedInFlow();
        setIsLogin(true)
      }
    }
    initConnectWallet()
  }, [isLogin])
  useEffect(() => {
    if (wallet) {
      const { accountId } = wallet
      accountId && dispatch(setUser({
        name: wallet.accountId || "",
        email: '',
        avatar:
          'https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93',
      }))
    }
  })
  return (
    <aside
      className={`${className} zzz w-60 fixed flex z-40 top-0 h-screen transition-position overflow-hidden`}
    >
      <div
        className={`flex-1 flex flex-col overflow-hidden dark:bg-slate-900 ${asideStyle}`}
      >
        <div
          className={`flex flex-row h-14 items-center justify-between dark:bg-slate-900 ${asideBrandStyle}`}
        >
          <div className="text-center flex justify-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0 mt-4">
            <img style={{ maxWidth: "60%" }} src="/static/images/logo1.png" />
          </div>
          <button
            className="hidden lg:inline-block xl:hidden p-3"
            onClick={handleAsideLgCloseClick}
          >
            <BaseIcon path={mdiClose} />
          </button>
        </div>

        <div
          className={`flex-1 overflow-y-auto overflow-x-hidden mt-10 ${darkMode ? 'aside-scrollbars-[slate]' : asideScrollbarsStyle
            }`}
        >
          <AsideMenuList menu={menu} />
        </div>
        <ul>
          {isLogin && <AsideMenuItem item={logoutItem} />}
          {!isLogin && <AsideMenuItem item={loginItem} />}

        </ul>
      </div>
    </aside>
  )
}
