import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartPie,
  mdiChartTimelineVariant,
  mdiGithub,
  mdiMonitorCellphone,
  mdiReload,
} from '@mdi/js'
import Head from 'next/head'
import React, { useState } from 'react'
import type { ReactElement } from 'react'
import BaseButton from '../components/ui/BaseButton'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/partials/SectionMain'
import SectionTitleLineWithButton from '../components/ui/SectionTitleLineWithButton'
import CardBoxWidget from '../components/ui/CardBoxWidget'
import CardBoxTransaction from '../components/ui/CardBoxTransaction'
import { Client, Transaction } from '../interfaces'
import CardBoxClient from '../components/ui/CardBoxClient'
import CardBox from '../components/ui/CardBox'
import { getPageTitle } from '../config'

const ProFeatures = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Pro Features')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiAccountMultiple} title="Pro Features" />
        <CardBox>

          <div className="container mx-auto px-4 py-18">
              <header className="text-center mb-16">
                <h1 className="text-5xl mb-4">Pro Features</h1>
                <p className="leading-normal text-grey-dark md:w-1/2 md:mx-auto">
                  Connect your web3 wallet and verify your account first
                </p>
              </header>
              
              <div className="lg:flex lg:items-center lg:-mx-2">
                
                <div className="mb-4 lg:mb-0 lg:w-1/3 lg:px-2 rounded-md">
                  <div className="text-center border border-grey-light lg:pb-16 rounded">
                    <div> <img src="https://images.unsplash.com/photo-1439436556258-1f7fab1bfd4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80" /> </div>
                    <h2 className="text-lg mb-4 text-5xl mt-4">Lv1 NFT</h2>
                    <div className="mb-6">
                      <span className="block text-5xl pb-2">1 <img style={{display: "inline", width: "30px", verticalAlign: "baseline"}} src="/static/images/near.png" /></span>
                      <span className="text-sm text-grey">Monthly</span>
                    </div>
                    <ul className="text-grey leading-loose list-reset mb-6">
                      <li>Overview</li>
                      <li>Fundraising</li>
                      <li>Tokenomics</li>
                      <li>Vesting Schedule</li>
                    </ul>
                    <BaseButton
                      label="Buy Now"
                      color="danger"
                    />
                  </div>
                </div>
                
                <div className="mb-4 lg:mb-0 lg:w-1/3 lg:px-2 rounded-md">
                  <div className="text-center border border-grey-light lg:pb-16 rounded lg:shadow-lg">
                  <div> <img src="https://images.unsplash.com/photo-1674718744870-13c46484fc0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" /> </div>
                    <h2 className="text-lg mb-4 text-5xl mt-4">Lv2 NFT</h2>
                    <div className="mb-6">
                      <span className="block text-5xl pb-2">5 <img style={{display: "inline", width: "30px", verticalAlign: "baseline"}} src="/static/images/near.png" /></span>
                      <span className="text-sm text-grey">Monthly</span>
                    </div>
                    <ul className="text-grey-dark leading-loose list-reset mb-6">
                      <li>Lv1 features</li>
                      <li>Social</li>
                      <li>Financial</li>
                      <li>Developer Activity</li>
                      <li>Network</li>
                      <li>Ownership</li>
                    </ul>
                    <BaseButton
                      label="Buy Now"
                      color="danger"
                    />
                  </div>
                </div>
                
                <div className="mb-4 lg:mb-0 lg:w-1/3 lg:px-2 rounded-md">
                  <div className="text-center border border-grey-light lg:pb-16 rounded">
                  <div> <img src="https://images.unsplash.com/photo-1584237863847-b21b4f7ccd4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2198&q=80" /> </div>
                    <h2 className="text-lg mb-4 text-5xl mt-4">Lv3 NFT</h2>
                    <div className="mb-6">
                      <span className="block text-5xl pb-2">10 <img style={{display: "inline", width: "30px", verticalAlign: "baseline"}} src="/static/images/near.png" /></span>
                      <span className="text-sm text-grey">Monthly</span>
                    </div>

                    <ul className="text-grey leading-loose list-reset mb-6">
                      <li>Lv2 features</li>
                      <li>Whale Tracking</li>
                      <li>Competitor</li>
                      <li>Events</li>
                      <li>Alert</li>
                    </ul>
                    <BaseButton
                      label="Buy Now"
                      color="danger"
                    />
                  </div>
                </div>
                
              </div>
            </div>
        </CardBox>
      </SectionMain>
    </>
  )
}

ProFeatures.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ProFeatures
