import {
  mdiSharkFin,
  mdiChartTimelineVariant,
  mdiAccount,
  mdiMail,
} from '@mdi/js'
import Head from 'next/head'
import type { ReactElement } from 'react'
import React, { useState, useEffect } from 'react'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/partials/SectionMain'
import SectionTitleLine from '../../components/partials/token/SectionTitleLine'
import CardBoxWidget from '../../components/ui/CardBoxWidget'
import Tabs from './tokentabs'
import { getPageTitle } from '../../config'
import { useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import WhaleService from '../../core/service/whale.service'
import LoadingBlock from '../../components/ui/LoadingBlock'
import { truncateAddr, to$ } from '../../core/util'
import CardBox from '../../components/ui/CardBox'
import BaseButton from '../../components/ui/BaseButton'

const TokenPage = () => {
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
    setTimeout(() => {
      // loadWhale()
      setLoading(false)
    }, 500);
  }, [])

  return (
    <>
      <Head>
        <title>{getPageTitle('Token')}</title>
      </Head>

      {loading && <LoadingBlock /> }

      {!loading && 

        <SectionMain>
          <SectionTitleLine icon={mdiSharkFin} title={adr.toString()} main>
            <div className='w-32'>
              <div>
                  <BaseButton
                      label="Buy Now"
                      color="success"
                      className=''
                    />

                  <BaseButton
                      label="Share"
                      color="info"
                      className='ml-2'
                    />
              </div>
            </div>
          </SectionTitleLine>

            <Tabs color="pink" />
        </SectionMain>
      }
    </>
  )
}

TokenPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TokenPage
