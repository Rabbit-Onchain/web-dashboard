import {
  mdiAccount,
  mdiAsterisk,
  mdiFormTextboxPassword,
  mdiGithub,
  mdiMail,
  mdiUpload,
  mdiSharkFin,
  mdiChartTimelineVariant,
} from '@mdi/js'
import { Formik, Form, Field } from 'formik'
import Head from 'next/head'
import type { ReactElement } from 'react'
import React, { useState, useEffect } from 'react'
import BaseButton from '../../components/ui/BaseButton'
import BaseButtons from '../../components/ui/BaseButtons'
import BaseDivider from '../../components/ui/BaseDivider'
import CardBox from '../../components/ui/CardBox'
import CardBoxComponentBody from '../../components/ui/CardBoxComponentBody'
import CardBoxComponentFooter from '../../components/ui/CardBoxComponentFooter'
import FormField from '../../components/ui/FormField'
import FormFilePicker from '../../components/ui/FormFilePicker'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/partials/SectionMain'
import SectionTitleLine from '../../components/partials/profile/SectionTitleLine'
import CardBoxWidget from '../../components/ui/CardBoxWidget'
import Tabs from '../../components/ui/Tabs'
import UserCard from '../../components/ui/UserCard'
import type { UserForm } from '../../interfaces'
import { getPageTitle } from '../../config'
import { useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import WhaleService from '../../core/service/whale.service'
import LoadingBlock from '../../components/ui/LoadingBlock'
import { truncateAddr, to$ } from '../../core/util'

const ProfilePage = () => {
  const router = useRouter()
  const { adr } = router.query

  const [whaleData, setWhaleData] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const loadWhale = () => {
    setLoading(true)
    WhaleService.getWhale({
      adr: adr
    })
      .then(
        (result) => {
          setLoading(false)
          console.log(result)
          setWhaleData(result.whale) 
        },
        (error) => {
          setLoading(false)
          console.log(error);
        }
      )
  };

  useEffect(() => {
    console.log('userEffect in list whales now');
    loadWhale()
  }, [])

  return (
    <>
      <Head>
        <title>{getPageTitle('Profile')}</title>
      </Head>

      {loading && <LoadingBlock /> }

      {!loading && whaleData && 

        <SectionMain>
          <SectionTitleLine icon={mdiSharkFin} title={adr.toString()} main>
            <div className='w-32'>
              <CardBoxWidget
                trendLabel="Overflow"
                trendType="warning"
                trendColor="warning"
                icon={mdiChartTimelineVariant}
                iconColor="danger"
                number={parseFloat(whaleData.usd_value)}
                //number={5268888}
                numberPrefix="$"
                label=""
              />
            </div>
          </SectionTitleLine>

          <Tabs color="pink" />

        </SectionMain>

      }
    </>
  )
}

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ProfilePage
