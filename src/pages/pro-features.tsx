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

  const buyNft = async (title, rarity, amount) => {
    let rs = await window['rabbitNft'].mintNft(title, rarity, amount);
    console.log('rs buyNft: ', rs);
  }

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
                    <div> <img src="https://dl.openseauserdata.com/cache/originImage/files/d71fa9e6fb8ed0856ae060e4c30d76c9.png" /> </div>
                    <h2 className="text-lg mb-4 text-5xl mt-4">Common</h2>
                    <div className="mb-6">
                      <span className="block text-5xl pb-2">1 Ⓝ</span>
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
                      onClick={() => buyNft("Common", "Common", "1")}
                    />
                  </div>
                </div>
                
                <div className="mb-4 lg:mb-0 lg:w-1/3 lg:px-2 rounded-md">
                  <div className="text-center border border-grey-light lg:pb-16 rounded lg:shadow-lg">
                  <div> <img src="https://dl.openseauserdata.com/cache/originImage/files/7b3d5e784b8003818d482e591525a234.png" /> </div>
                    <h2 className="text-lg mb-4 text-5xl mt-4">Rare</h2>
                    <div className="mb-6">
                      <span className="block text-5xl pb-2">5 Ⓝ</span>
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
                      onClick={() => buyNft("Rare", "Rare", "5")}
                    />
                  </div>
                </div>
                
                <div className="mb-4 lg:mb-0 lg:w-1/3 lg:px-2 rounded-md">
                  <div className="text-center border border-grey-light lg:pb-16 rounded">
                  <div> <img src="https://dl.openseauserdata.com/cache/originImage/files/73b5e5a4d93333a17f21b205d0ccac0d.png" /> </div>
                    <h2 className="text-lg mb-4 text-5xl mt-4">Mythic</h2>
                    <div className="mb-6">
                      <span className="block text-5xl pb-2">10 Ⓝ</span>
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
                      onClick={() => buyNft("Mythic", "Mythic", "10")}
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