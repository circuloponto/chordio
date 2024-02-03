//import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Chord from '@/components/Chord';
//import ChordSaved from '@/components/ChordSaved';
import { MouseEventHandler, useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { v4 as uuidv4 } from 'uuid';
//import styles from '../../styles/SavedChords.module.scss'
import 'react-tabs/style/react-tabs.css';
import dynamic from 'next/dynamic'
import axios from 'axios'
import cookie from "cookie";

import AppContext from '@/components/AppContext'
import { useContext } from 'react'
import { IContext, IMex } from '../mysongs/types';




export const getServerSideProps = (async (context: IContext) => {

  const mycookie = cookie.parse(
    (context.req && context.req.headers.cookie) || ""
  );

  let cookieNameData = '';
  if (mycookie.authToken) {
    cookieNameData = mycookie.authToken;
  }
  console.log('cookieNameData', cookieNameData)
  console.log('cookie data typeof', typeof cookieNameData)

  const me = await axios.get(
    'https://x8ki-letl-twmt.n7.xano.io/api:4m4S1GeF/auth/me',

    { headers: { Authorization: 'Bearer ' + cookieNameData } },
  );
  /* const response = await axios.get(
    `https://x8ki-letl-twmt.n7.xano.io/api:4m4S1GeF/user/${me.id}`,
    { headers: { Authorization: 'Bearer ' + cookieNameData } },
  ); */
  // const responseX = response.data
  const meX = me.data
  //console.log('response', response)
  console.log('me', me)
  return { props: { meX } }


})

export default function MySongs({ meX }: IMex) {
  const contextApi = useContext(AppContext)
  console.log('contextApi', contextApi)
  const [input, setInput] = useState<string>();
  const [tab, setTab] = useState(0)
  const [data, setData] = useState({ actual_songs: [] })
  console.log('meX', meX)

  const handleTabClick = (e: any) => {
    console.log('e.target.tabIndex', e.target.tabIndex)
    const tabIndex = e.target.getAttribute("data-tabIndex");
    console.log('tabIndex', tabIndex)
    setTab(tabIndex)
    console.log('tab', tab)
  }
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        `https://x8ki-letl-twmt.n7.xano.io/api:4m4S1GeF/user/${meX.id}`,
        { headers: { Authorization: 'Bearer ' + contextApi.nameContext } },
      );
      const list = await axios.get(
        `https://x8ki-letl-twmt.n7.xano.io/api:4m4S1GeF/lists/${meX.lists_id}`,
        { headers: { Authorization: 'Bearer ' + contextApi.nameContext } },
      );
      const responseX = response.data
      setData(list.data)
      console.log('responseX', responseX)
      console.log('list', list)
    }
    getUser()

  }, [])
  console.log('data', data)
  const onlySongs: {
    actual_songs: Array<any>
  } = data//?.flat()
  console.log('onlySongs', onlySongs)
  return (
    <div className="sc_container">

      <div className='tabs'>
        {onlySongs?.actual_songs.map((obj, i) => {
          console.log('obj.id', obj.id)
          console.log('typeof', typeof obj.id)
          return <>
            <div key={i} data-tabIndex={obj.id} onClick={handleTabClick} className='tabTitle'>{obj.name}</div>
          </>
        })}
      </div>

      {onlySongs?.actual_songs?.map((obj, j) => {
        // console.log('tab', tab, 'obj.id', obj.id)
        return <>

          {tab === obj.id &&
            <>
              <div className='sc_chords'>
                {obj.chords.map((chord: string, i: number) => {
                  console.log
                  return tab === obj.id &&

                    <Chord key={i} chord={chord} />
                })}

              </div>
              {tab === obj.id &&



                <div className="inputcontainer">
                  <textarea
                    value={obj.lyrics}
                    //onChange={(e) => setInput(e.target.value)}
                    name=""
                    id=""
                    cols={30}
                    rows={10}
                    className="textArea"
                    placeholder="paste your lyrics and chords here"
                  ></textarea>
                </div>



              }
            </>
          }
        </>
      })}


    </div >

  )
}