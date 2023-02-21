import { mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useState, useEffect } from 'react'
import { useSampleClients } from '../../hooks/sampleData'
import { Client } from '../../interfaces'
import BaseButton from '../ui/BaseButton'
import BaseButtons from '../ui/BaseButtons'
import CardBoxModal from '../ui/CardBoxModal'
import Pagination from '../ui/Pagination'
import UserAvatar from '../ui/UserAvatar'
import WhaleService from '../../core/service/whale.service'
import { truncateAddr, to$ } from '../../core/util'

const WhaleList = () => {
  const [whaleData, setWhaleData] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [numPages, setNumPages] = useState(0)
  const [pagesList, setPagesList] = useState([])
  
  const loadWhales = () => {
    WhaleService.getWhales({
      page: currentPage
    })
      .then(
        (result) => {
          let pages = [];
          console.log(result)
          setWhaleData(result.whales) 
          setNumPages(result.totalPage)
          for (let i = 0; i < numPages; i++) {
            pages.push(i)
          }
          setPagesList(pages);
        },
        (error) => {
          console.log(error);
        }
      )
  };

  useEffect(() => {
    console.log('userEffect in list whales now');
    loadWhales()
  }, [])

  useEffect(() => {
    // if (currentPage )
    console.log('userEffect change page in list whales now');
    loadWhales()
  }, [currentPage])

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
              <td data-label="Net worth">{to$(client.usd_value)}</td>
              <td data-label="Top tokens<"></td>
              <td data-label="Top protocols<"></td>
              <td data-label="Last Transaction<"></td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        totalPages={numPages}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  )
}

export default WhaleList
