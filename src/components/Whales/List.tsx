import { mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useState, useEffect } from 'react'
import { useSampleClients } from '../../hooks/sampleData'
import { Client } from '../../interfaces'
import BaseButton from '../ui/BaseButton'
import BaseButtons from '../ui/BaseButtons'
import CardBoxModal from '../ui/CardBoxModal'
import UserAvatar from '../ui/UserAvatar'
import WhaleService from '../../core/service/whale.service'
import { truncateAddr } from '../../core/util'

const WhaleList = () => {
  const { clients } = useSampleClients()
  const [whaleData, setWhaleData] = useState([])
  let numPages = 0

  const loadWhales = () => {
    WhaleService.getWhales()
      .then(
        (result) => {
          console.log(result)
          console.log(result.whales)
          numPages = result.totalPage   
          // setCurrentPage(result.currentPage)
          setWhaleData(result.whales) 
        },
        (error) => {
        }
      )
  };

  useEffect(() => {
    console.log('userEffect in list whales now');
    loadWhales()
  }, [])

  // get data

  const perPage = 5

  const [currentPage, setCurrentPage] = useState(0)

  // const clientsPaginated = clients.slice(perPage * currentPage, perPage * (currentPage + 1))

  // const numPages = clients.length / perPage

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

  return (
    <>
      <CardBoxModal
        title="Sample modal"
        buttonColor="info"
        buttonLabel="Done"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
      </CardBoxModal>

      <CardBoxModal
        title="Please confirm"
        buttonColor="danger"
        buttonLabel="Confirm"
        isActive={isModalTrashActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
      </CardBoxModal>

      <table>
        <thead>
          <tr>
            <th>Address</th>
            <th>Net worth</th>
            <th>Top tokens</th>
            <th>Top protocols</th>
            <th>Last Transaction</th>
          </tr>
        </thead>
        <tbody>
          {whaleData.length > 0 && whaleData.map((client: any) => (
            <tr key={client.id}>
              <td data-label="Addresse">{truncateAddr(client.adr)}</td>
              <td data-label="Net worth">{client.usd_value}</td>
              <td data-label="Top tokens<"></td>
              <td data-label="Top protocols<"></td>
              <td data-label="Last Transaction<"></td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
          <BaseButtons>
            {pagesList.map((page) => (
              <BaseButton
                key={page}
                active={page === currentPage}
                label={page + 1}
                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                small
                onClick={() => setCurrentPage(page)}
              />
            ))}
          </BaseButtons>
          <small className="mt-6 md:mt-0">
            Page {currentPage + 1} of {numPages}
          </small>
        </div>
      </div>
    </>
  )
}

export default WhaleList
