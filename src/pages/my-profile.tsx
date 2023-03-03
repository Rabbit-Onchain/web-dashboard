import {
  mdiAccount,
  mdiAsterisk,
  mdiFormTextboxPassword,
  mdiGithub,
  mdiMail,
  mdiUpload,
} from '@mdi/js'
import { Formik, Form, Field } from 'formik'
import Head from 'next/head'
import type { ReactElement } from 'react'
import React, { useState, useEffect } from 'react'
import CardBox from '../components/ui/CardBox'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/partials/SectionMain'
import SectionTitleLineWithButton from '../components/ui/SectionTitleLineWithButton'
import UserCard from '../components/ui/UserCard'
import type { UserForm } from '../interfaces'
import { getPageTitle } from '../config'
import { useAppSelector } from '../stores/hooks'

const MyProfilePage = () => {
  const userName = useAppSelector((state) => state.main.userName)
  const userEmail = useAppSelector((state) => state.main.userEmail)

  const userForm: UserForm = {
    name: userName,
    email: userEmail,
  }

  useEffect(() => {
    getUserNFTS();
  }, []); 

  const getUserNFTS = async() => {
    if (userName) {
      // TODO: get all nfts of user
      const rs = await window['rabbitNft'].getUserNfts(userName);
      console.log('rs buyNft: ', rs);
      // if (rs && rs.length > 0) {}
    }
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('My Profile')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiAccount} title="My Profile" main></SectionTitleLineWithButton>

        <UserCard className="mb-6" />

        <SectionTitleLineWithButton icon={mdiAccount} title="My NFTs"></SectionTitleLineWithButton>
        
        <CardBox>
          <div className="items-center text-center grid grid-cols-1 gap-y-4 gap-x-2 md:grid-cols-4 lg:grid-cols-12">
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <div className="w-full p-2 text-center space-y-2">
              <div className="w-24 mx-auto">
                <img src="https://dl.openseauserdata.com/cache/originImage/files/d71fa9e6fb8ed0856ae060e4c30d76c9.png" alt="media" className="h-24 w-full shadow-lg rounded-full shadow-lg" />
              </div>
              <div className="text-sm font-bold">Common</div>
              <div className="text-sm">Expired At: 12 May 2023</div>
            </div>
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <div className="w-full p-2 text-center space-y-2">
              <div className="w-24 mx-auto">
                <img src="https://dl.openseauserdata.com/cache/originImage/files/d71fa9e6fb8ed0856ae060e4c30d76c9.png" alt="media" className="h-24 w-full shadow-lg rounded-full shadow-lg" />
              </div>
              <div className="text-sm font-bold">Common</div>
              <div className="text-sm">Expired At: 12 May 2023</div>
            </div>
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <div className="w-full p-2 text-center space-y-2">
              <div className="w-24 mx-auto">
                <img src="https://dl.openseauserdata.com/cache/originImage/files/d71fa9e6fb8ed0856ae060e4c30d76c9.png" alt="media" className="h-24 w-full shadow-lg rounded-full shadow-lg" />
              </div>
            <div className="text-sm font-bold">Common</div>
            <div className="text-sm">Expired At: 12 May 2023</div>
            </div>
            </div>
          </div>
        </CardBox>

        <SectionTitleLineWithButton icon={mdiAccount} title="My Whale Followings"></SectionTitleLineWithButton>
        
        <CardBox>
          <div className="items-center text-center grid grid-cols-1 gap-y-4 gap-x-2 md:grid-cols-4 lg:grid-cols-12">
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <div className="w-full p-2 text-center space-y-2">
              <div className="w-24 mx-auto">
                <img src="https://images.unsplash.com/photo-1568430462989-44163eb1752f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80" alt="media" className="h-24 w-full shadow-lg rounded-full shadow-lg" />
              </div>
              <div className="text-sm font-bold">0x2a82…3a26</div>
            </div>
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <div className="w-full p-2 text-center space-y-2">
              <div className="w-24 mx-auto">
              <img src="https://images.unsplash.com/photo-1568430462989-44163eb1752f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80" alt="media" className="h-24 w-full shadow-lg rounded-full shadow-lg" />
              </div>
              <div className="text-sm font-bold">0x2a82…3a26</div>
            </div>
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <div className="w-full p-2 text-center space-y-2">
              <div className="w-24 mx-auto">
              <img src="https://images.unsplash.com/photo-1568430462989-44163eb1752f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80" alt="media" className="h-24 w-full shadow-lg rounded-full shadow-lg" />
              </div>
              <div className="text-sm font-bold">0x2a82…3a26</div>
            </div>
            </div>
          </div>
        </CardBox>
        
      </SectionMain>
    </>
  )
}

MyProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default MyProfilePage
