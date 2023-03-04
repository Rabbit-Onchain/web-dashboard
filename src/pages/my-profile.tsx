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
import BaseButton from '../components/ui/BaseButton'
import BaseButtons from '../components/ui/BaseButtons'
import BaseDivider from '../components/ui/BaseDivider'
import CardBox from '../components/ui/CardBox'
import CardBoxComponentBody from '../components/ui/CardBoxComponentBody'
import CardBoxComponentFooter from '../components/ui/CardBoxComponentFooter'
import FormField from '../components/ui/FormField'
import FormFilePicker from '../components/ui/FormFilePicker'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/partials/SectionMain'
import SectionTitleLineWithButton from '../components/ui/SectionTitleLineWithButton'
import UserCard from '../components/ui/UserCard'
import type { UserForm } from '../interfaces'
import { getPageTitle } from '../config'
import { useAppSelector } from '../stores/hooks'
import UserNft from '../components/ui/UserNft'

const MyProfilePage = () => {
  const userName = useAppSelector((state) => state.main.userName)
  const userEmail = useAppSelector((state) => state.main.userEmail)

  const [userNfts, setUserNfts] = useState([])
  const [loading, setLoading] = useState(true)

  const userForm: UserForm = {
    name: userName,
    email: userEmail,
  }

  const getUserNFTS = () => {
    // if (userName) {
    setLoading(true)
    // TODO: get all nfts of user
    setTimeout(() => {
      window['rabbitNft'].getUserNfts(userName).then(
        (result) => {
          if (result && result.length > 0) {
            setUserNfts(result)
          }
        },
        (error) => {
          setLoading(false)
        }
      )
    }, 1000)
    setLoading(false)
    // }
  }
  useEffect(() => {
    getUserNFTS()
  }, [userName, loading])

  return (
    <>
      <Head>
        <title>{getPageTitle('My Profile')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiAccount}
          title="My Profile"
          main
        ></SectionTitleLineWithButton>
        <UserCard className="mb-6" />
        <SectionTitleLineWithButton icon={mdiAccount} title="My NFTs"></SectionTitleLineWithButton>
        {!loading && (
          <CardBox>
            <div className="items-center text-center grid grid-cols-1 gap-y-4 gap-x-2 md:grid-cols-4 lg:grid-cols-12">
              <>
                {userNfts.map((userNft) => (
                  <UserNft key={userNft.token_id} userNft={userNft} />
                ))}
              </>
            </div>
          </CardBox>
        )}
        <SectionTitleLineWithButton
          icon={mdiAccount}
          title="My Whale Followings"
        ></SectionTitleLineWithButton>
        <CardBox>
          <div className="items-center text-center grid grid-cols-1 gap-y-4 gap-x-2 md:grid-cols-4 lg:grid-cols-12">
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <div className="w-full p-2 text-center space-y-2">
                <div className="w-24 mx-auto">
                  <img
                    src="https://images.unsplash.com/photo-1568430462989-44163eb1752f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80"
                    alt="media"
                    className="h-24 w-full shadow-lg rounded-full shadow-lg"
                  />
                </div>
                <div className="text-sm font-bold">0x2a82…3a26</div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <div className="w-full p-2 text-center space-y-2">
                <div className="w-24 mx-auto">
                  <img
                    src="https://images.unsplash.com/photo-1568430462989-44163eb1752f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80"
                    alt="media"
                    className="h-24 w-full shadow-lg rounded-full shadow-lg"
                  />
                </div>
                <div className="text-sm font-bold">0x2a82…3a26</div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <div className="w-full p-2 text-center space-y-2">
                <div className="w-24 mx-auto">
                  <img
                    src="https://images.unsplash.com/photo-1568430462989-44163eb1752f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80"
                    alt="media"
                    className="h-24 w-full shadow-lg rounded-full shadow-lg"
                  />
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
