import React, { useEffect, useState } from 'react'
import { mdiMinus, mdiPlus } from '@mdi/js'
import BaseIcon from '../ui/BaseIcon'
import Link from 'next/link'
import { getButtonColor } from '../../colors'
import AsideMenuList from './AsideMenuList'
import { MenuAsideItem } from '../../interfaces'
import { useAppSelector, useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'
import { setUser } from "../../stores/mainSlice"
import { Wallet } from '../../core/service/near-protocol/near-wallet';
import { RabbitNft } from '../../core/service/near-protocol/near-interface'

type Props = {
  item: MenuAsideItem
  isDropdownList?: boolean
}

const AsideMenuItem = ({ item, isDropdownList = false }: Props) => {
  const dispatch = useAppDispatch()
  const [isLinkActive, setIsLinkActive] = useState(false)
  const [isDropdownActive, setIsDropdownActive] = useState(false)

  const asideMenuItemStyle = useAppSelector((state) => state.style.asideMenuItemStyle)
  const asideMenuDropdownStyle = useAppSelector((state) => state.style.asideMenuDropdownStyle)
  const asideMenuItemActiveStyle = useAppSelector((state) => state.style.asideMenuItemActiveStyle)

  const activeClassAddon = !item.color && isLinkActive ? asideMenuItemActiveStyle : ''

  const { asPath, isReady } = useRouter()

  useEffect(() => {
    if (item.href && isReady) {
      const linkPathName = new URL(item.href, location.href).pathname

      const activePathname = new URL(asPath, location.href).pathname

      setIsLinkActive(linkPathName === activePathname)
    }
  }, [item.href, isReady, asPath])

  const asideMenuItemInnerContents = (
    <>
      {item.icon && (
        <BaseIcon path={item.icon} className={`flex-none ${activeClassAddon}`} w="w-16" size="18" />
      )}
      <span
        className={`grow text-ellipsis line-clamp-1 ${item.menu ? '' : 'pr-12'
          } ${activeClassAddon}`}
      >
        {item.label}
      </span>
      {item.menu && (
        <BaseIcon
          path={isDropdownActive ? mdiMinus : mdiPlus}
          className={`flex-none ${activeClassAddon}`}
          w="w-12"
        />
      )}
    </>
  )

  const componentClass = [
    'flex cursor-pointer',
    isDropdownList ? 'py-3 px-6 text-sm' : 'py-3',
    item.color
      ? getButtonColor(item.color, false, true)
      : `${asideMenuItemStyle} dark:text-slate-300 dark:hover:text-white`,
  ].join(' ')


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
    <li>
      {item.href && (
        <Link href={item.href} target={item.target} className={componentClass}>
          {asideMenuItemInnerContents}
        </Link>
      )}
      {!item.href && !item.isLogin && !item.isLogout && (
        <div className={componentClass} onClick={() => setIsDropdownActive(!isDropdownActive)}>
          {asideMenuItemInnerContents}
        </div>
      )}
      {!item.href && item.isLogin && (
        <div className={componentClass} onClick={() => wallet.signIn()}>
          {asideMenuItemInnerContents}
        </div>
      )}
      {!item.href && item.isLogout && (
        <div className={componentClass} onClick={() => { wallet.signOut(); setIsLogin(false) }}>
          {asideMenuItemInnerContents}
        </div>
      )}
      {item.menu && (
        <AsideMenuList
          menu={item.menu}
          className={`${asideMenuDropdownStyle} ${isDropdownActive ? 'block dark:bg-slate-800/50' : 'hidden'
            }`}
          isDropdownList
        />
      )}
    </li>
  )
}

export default AsideMenuItem
