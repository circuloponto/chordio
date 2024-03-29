
import axios from 'axios'
import Cookies from 'js-cookie';
import cookie from "cookie";
import { NextRequest, NextResponse, userAgent } from 'next/server'
import { ChangeEvent, useEffect, useRef, useState } from 'react';
//import styles from '../../styles/Transposer.module.scss'

/* import '../../styles/globals.scss'; */
//import { Chord } from 'tonal';
import { chords } from '../../chords.js';
import Chord from '../../components/Chord.tsx';
import { MdKeyboardDoubleArrowUp } from 'react-icons/md';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
//import AppContext from '@/components/AppContext'
import { useContext } from 'react'



// import types

import SaveModal from '@/components/saveModal';
import ConfirmSavemodal from '@/components/confirmSaveModal';
import TitleModal from '@/components/titleModal';


export const getServerSideProps = (async (context) => {

  const mycookie = cookie.parse(
    (context.req && context.req.headers.cookie) || ""
  );

  let cookieNameData = '';
  if (mycookie.authToken) {
    cookieNameData = mycookie.authToken;
  }
  // console.log('cookieNameData', cookieNameData)
  // console.log('cookie data typeof', typeof cookieNameData)

  const me = await axios.get(
    'https://x8ki-letl-twmt.n7.xano.io/api:4m4S1GeF/auth/me',

    { headers: { Authorization: 'Bearer ' + cookieNameData } },
  );

  const meX = me.data

  // console.log('me', me)
  return { props: { meX } }


})



export default function MySongs({ meX }) {

  // console.log('me', meX)
  //const books = await getBooks()
  //console.log('books', books)
  // let chordObLocalStorage
  // let inputLocalStorage
  // let titleLocalStorage
  // if (typeof window !== "undefined") {
  //   chordObLocalStorage = JSON.parse(window.localStorage.getItem('chordObj')) || []
  //   inputLocalStorage = JSON.parse(window.localStorage.getItem('input')) || ''


  //   titleLocalStorage = JSON.parse(window.localStorage.getItem('title')) || ''









  //   console.log('chordObLocalStorage', chordObLocalStorage)
  //   console.log('inputLocalStorage', inputLocalStorage)
  //   console.log('titleLocalStorage', titleLocalStorage)
  //const contextApi = useContext(AppContext)

  const [input, setInput] = useState('');
  //const [input, setInput] = useState<string | boolean | null | undefined>('');
  const [chordObj, setChordObj] = useState([]);
  //const [chordObj, setChordObj] = useState<{ positions: string[], chordName: string }[] | []>([]);
  const [foundX, setFoundX] = useState([]);
  const [newLine, setNewLine] = useState([]);
  const [howMuch, setHowMuch] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [overlay, setOverlay] = useState(false)
  const [inputTitle, setInputTitle] = useState('')
  //const [inputTitle, setInputTitle] = useState<string | boolean | null | undefined>(titleLocalStorage)
  const [showTitleModal, setShowTitleModal] = useState(false);
  /*  useEffect(() => {
     console.log('context api', contextApi.nameContext)
   }, [contextApi.nameContext])
  */
  const regex =
    /\b(?:G,C,D|A,B,C|E,C,D)|([ABCDEFG](?:#|b)?)(?:\/[ABCDEFG][b|#]?)?(?:(?:(?:maj|min|sus|add|aug|dim)(?:\d{0,2}(?:#\d{1,2}|sus\d)?)?)|(?:m\d{0,2}(?:(?:maj|add|#)\d{0,2})?)|(?:-?\d{0,2}(?:\([^)]*\)|#\d{1,2})?))?\b/g;
  const regex2 =
    /[A-G]{1}([5])?([#b]{1})?(mM|Mm|m|M)?([679]|11)?((sus|aug|dim|add)([24]))?/gm;
  //const regex = /^[A-Ga-g](#|b)?(?:maj|min|aug|dim)?(?:[0-9]|sus|add)?(?:\/[A-Ga-g](#|b)?)?$/


  //let found: RegExpMatchArray | null = input.match(regex);
  let found = input.match(regex);
  // console.log('found', found);


  const filterdFound = new Set(found);
  // console.log('filterdFound', filterdFound);
  // console.log('input', input)

  const sanitizedInput = input.replace(/\n/g, '')
  // console.log('sanitizedInput', sanitizedInput)
  const arraySanitized = sanitizedInput.split(' ')
  // console.log('arraySanitized', arraySanitized)
  const filterdSanitized = arraySanitized.filter(n => n)
  // console.log('filterdSanitized', filterdSanitized)
  const title = filterdSanitized[0]
  // console.log('title', title)
  const handleCheck = () => {
    setChordObj([]);
    filterdFound?.forEach((chord, i) => {
      // console.log('chord', chord);
      const chordRes = chords(chord);
      // console.log('chordRes', chordRes)
      const positions = chordRes[0].positions;
      // console.log('positions', positions);
      // console.log('chordRes', chordRes);
      setChordObj((prev) => [...prev, { positions, chordName: chord }]);
      setFoundX(found);
      const result = input.split(/\r?\n/);
      // console.log('result', result);
      setNewLine(result);
    });

    console.log('chordObj', chordObj);
  };

  const handleUpOneTone = (e) => {
    const matrixSharp = [
      'C',
      'C#',
      'D',
      'D#',
      'E',
      'F',
      'F#',
      'G',
      'G#',
      'A',
      'A#',
      'B',
    ];
    const matrixFlat = [
      'C',
      'Db',
      'D',
      'Eb',
      'E',
      'F',
      'Gb',
      'G',
      'Ab',
      'A',
      'Bb',
      'B',
    ];
    const transcribeInterval = e.currentTarget.getAttribute('data-tone');
    setHowMuch(prev => prev += Number(transcribeInterval))
    console.log(e.currentTarget.getAttribute('data-tone'));
    const onlyNotes = /([ABCDEFG](?:#|b)?)/gm;
    //const onlyChord = //([a-z]+)/g;
    setFoundX(found);
    const foundChords = [...foundX];
    console.log(foundChords);
    const parsedNotes = foundChords.map((chord) => {
      //.log('chord', chord);
      const parsed = chord.match(onlyNotes);
      //console.log('parsed', parsed);
      return parsed;
    });
    const parsedNotesSharp = parsedNotes
      .map((note, i) => {
        //console.log('note', note);
        if (note[0].endsWith('#')) {
          const index = matrixSharp.indexOf(note[0]);
          note = matrixFlat[index];
          console.log('index from parsedNotesSharp', index);
        }
        return note;
      })
      .flat();
    console.log('parsedNotesSharp', parsedNotesSharp);
    console.log('parsedNotes', parsedNotes);
    const parsedChord = foundChords.map((chord) => {
      const parsed = chord.replace(/([ABCDEFG](?:#|b)?)/g, '');
      //console.log('parsed', parsed);
      return parsed;
    });
    console.log('parsedChord', parsedChord);
    const transposedRoots = parsedNotesSharp.map((note, i) => {
      //console.log('note', note);
      const index = matrixFlat.indexOf(note);
      console.log(
        'index + transcribeInterval',
        index + Number(transcribeInterval),
        'index',
        index
      );
      const newIndex = index + Number(transcribeInterval);
      let val =
        matrixFlat[
        ((newIndex % matrixFlat.length) + matrixFlat.length) %
        matrixFlat.length
        ];
      //const newNote = matrixFlat[index + transcribeInterval];
      // console.log('newNote', newNote);
      //console.log('val', val);

      return val;
    });
    setChordObj([]);
    console.log('transposedRoots', transposedRoots);
    const join = transposedRoots.map((note, i) => note + parsedChord[i]);
    console.log('join', join);
    let foundJoinObj = {};
    const foundJoin = found.map((chord, i) => {
      foundJoinObj[chord] = join[i];
      return { [chord]: join[i] };
    });
    console.log('foundJoinobj', foundJoinObj);
    const filterdFoundFinal = new Set(join);
    console.log('filterdFoundFinal', filterdFoundFinal);
    filterdFoundFinal.forEach((chord, i) => {
      console.log('chord', chord);
      const chordRes = chords(chord);
      const positions = chordRes[0].positions;
      console.log('positions', positions);
      console.log('chordRes', chordRes);
      setChordObj((prev) => [...prev, { positions, chordName: chord }]);
      //found = join;
      setFoundX(join);
    });

    setFoundX(join);
    console.log('foundX', foundX);
    console.log('join', join);
    console.log('input', input);
    console.log('newLine', newLine);
    const obj = {}
    const arrayLines = input.split(/\n/)
    console.log('arrayLines', arrayLines)
    /* for (let i = 0; i < foundX.length; i++) {
      const element = foundX[i];
      obj[foundX[i]] = join[i]
   
    } */

    const founXSet = new Set(foundX)
    const finalFoundX = Array.from(founXSet);
    const joinSet = new Set(join)
    const finalJoin = Array.from(joinSet);
    console.log('finalFoundX', finalFoundX)
    console.log('finalJoin', finalJoin)
    console.log('obj', obj)
    let newInput = input
    arrayLines.forEach((item, i) => {
      console.log('item', item)
      for (let j = 0; j < finalFoundX.length; j++) {
        const chord = finalFoundX[j];
        console.log('chord', chord)
        if (item.includes(chord)) {
          let chords = item.match(regex);
          const changedChords = chords?.map((chord, i) => {
            const index = finalFoundX.indexOf(chord)
            return finalJoin[index]
          })
          console.log('chords', chords)
          console.log('changedChords', changedChords)
          arrayLines[i] = changedChords?.join(' ')
          //arrayLines[i].replace(chord, finalJoin[j])
        }

      }
      console.log('arrayLines', arrayLines)
      setInput(arrayLines.join('\n'))
    })
    // foundX.forEach((chord, i) => {

    //   // newInput.replaceAll(chord, join[i]);
    //   newInput.split(chord).join(join[i])
    //   setInput(newInput)
    // })
    console.log('founXSet', founXSet)
    finalFoundX.forEach((chord, i) => {
      console.log('target chord', chord, 'new chord', finalJoin[i])
      //newInput = newInput.replaceAll(chord, finalJoin[i]);
      while (newInput.includes(chord)) {

        newInput = newInput.replace(chord, finalJoin[i]);
      }
    })

    console.log('inputFinal', input)
    console.log('newInput', newInput)
  }

  const handleDownOneTone = ({ target, currentTarget }) => {
    const matrixSharp = [
      'C',
      'C#',
      'D',
      'D#',
      'E',
      'F',
      'F#',
      'G',
      'G#',
      'A',
      'A#',
      'B',
    ];
    const matrixFlat = [
      'C',
      'Db',
      'D',
      'Eb',
      'E',
      'F',
      'Gb',
      'G',
      'Ab',
      'A',
      'Bb',
      'B',
    ];
    const much = howMuch - 1
    console.log('howMuchbefore', howMuch)
    setHowMuch(much)
    console.log('howMuchafter', howMuch)
    const onlyNotes = /([ABCDEFG](?:#|b)?)/gm;
    //const onlyChord = //([a-z]+)/g;
    setFoundX(found);
    let foundChords = [...foundX];
    console.log('foundChords', foundChords);
    // array onde retiramos a qualidade do acorde e ficamos com a root
    const parsedNotes = foundChords.map((chord) => {
      //.log('chord', chord);
      const parsed = chord.match(onlyNotes);
      //console.log('parsed', parsed);
      return parsed;
    });
    console.log('parsedNotes', parsedNotes);
    const parsedNotesSharp = parsedNotes
      .map((note) => {
        //console.log('note', note);
        //if (note !== null) {
        if (note[0].endsWith('#')) {
          const index = matrixSharp.indexOf(note[0]);
          note = matrixFlat[index];
          console.log('index from parsedNotesSharp', index);
        }
        //}

        return note;
      })
      .flat();
    console.log('parsedNotesSharp', parsedNotesSharp);
    // é um array com a qualidade do acorde
    const parsedChord = foundChords.map((chord) => {
      const parsed = chord.replace(/([ABCDEFG](?:#|b)?)/g, '');
      //console.log('parsed', parsed);
      return parsed;
    });
    console.log('parsedChord', parsedChord);
    // array com as roots transpostas para -1 semitom
    const transposedRoots = parsedNotesSharp.map((note, i) => {
      //console.log('note', note);
      let index = matrixFlat.indexOf(note)
      let newIndex = index - 1
      let val =
        matrixFlat[
        ((newIndex % matrixFlat.length) + matrixFlat.length) %
        matrixFlat.length
        ];
      //const newNote = matrixFlat[index + transcribeInterval];
      // console.log('newNote', newNote);
      console.log('val', val);

      return val;
    });
    setChordObj([]);
    console.log('transposedRoots', transposedRoots);
    // array com as roots transpostas mais a qualidade do acorde
    const join = transposedRoots.map((note, i) => note + parsedChord[i]);
    console.log('join', join);

    let foundJoinObj = {};
    if (found) {
      const foundJoin = found.map((chord, i) => {
        foundJoinObj[chord] = join[i];
        return { [chord]: join[i] };
      });
    }
    console.log('foundJoinobj', foundJoinObj);
    const filterdFoundFinal = new Set(join);
    console.log('filterdFoundFinal', filterdFoundFinal);
    filterdFoundFinal.forEach((chord, i) => {
      console.log('chord', chord);
      const chordRes = chords(chord);
      const positions = chordRes[0].positions;
      console.log('positions', positions);
      console.log('chordRes', chordRes);
      setChordObj((prev) => [...prev, { positions, chordName: chord }]);
      //found = join;
      setFoundX(join);
    });

    setFoundX(join);
    console.log('foundX', foundX);
    console.log('join', join);
    const obj = {}
    const arrayLines = input.split(/\n/)
    console.log('arrayLines', arrayLines)
    /* for (let i = 0; i < foundX.length; i++) {
      const element = foundX[i];
      obj[foundX[i]] = join[i]

    } */

    const founXSet = new Set(foundX)
    const finalFoundX = Array.from(founXSet);
    const joinSet = new Set(join)
    const finalJoin = Array.from(joinSet);
    console.log('finalFoundX', finalFoundX)
    console.log('finalJoin', finalJoin)
    console.log('obj', obj)
    let newInput = input
    arrayLines.forEach((item, i) => {
      console.log('item', item)
      for (let j = 0; j < finalFoundX.length; j++) {
        const chord = finalFoundX[j];
        console.log('chord', chord)
        if (item.includes(chord)) {
          let chords = item.match(regex);
          const changedChords = chords?.map((chord, i) => {
            const index = finalFoundX.indexOf(chord)
            return finalJoin[index]
          })
          console.log('chords', chords)
          console.log('changedChords', changedChords)
          if (changedChords) {

            arrayLines[i] = changedChords.join(' ')
          }
          //arrayLines[i].replace(chord, finalJoin[j])
        }

      }
      console.log('arrayLines', arrayLines)
      setInput(arrayLines.join('\n'))
    })
    // foundX.forEach((chord, i) => {

    //   // newInput.replaceAll(chord, join[i]);
    //   newInput.split(chord).join(join[i])
    //   setInput(newInput)
    // })

  }

  const handleSave = async () => {
    //const title = input.substr(0, 8)
    // console.log('title', title)
    console.log('input', input)
    console.log('inputTitle', inputTitle)
    if (foundX.length === 0) {

      console.log('its empty')
      setShowModal(true)
      return
    }

    // console.log('objectToSave', objectToSave)
    // console.log('input', input)
    // console.log('meX', meX)
    setModal(true)
    // let jsonObject = JSON.stringify(objectToSave, null, 2)
    // console.log('jsonObject', objectToSave)
    const objectToSave = {
      name: inputTitle,
      chords: chordObj,
      lyrics: input,
      id: uuidv4()
    }
    console.log('this one RIGHT HERE', objectToSave)
    if (meX.lists_id.length === 0 || meX.lists_id === 0) {
      // console.log('its empty')
      const postList = await axios.post(
        `https://x8ki-letl-twmt.n7.xano.io/api:4m4S1GeF/lists`,
        { actual_songs: objectToSave, }
      );
      // console.log('postList', postList)

      const patchUser = await axios.patch(
        `https://x8ki-letl-twmt.n7.xano.io/api:4m4S1GeF/user/${meX.id}`,
        {
          name: meX.name,
          email: meX.email,
          id: meX.id,
          lists_id: postList.data.id

        }
      );
      // console.log('patchUser', patchUser)
    } else {

      const getListId = await axios.get(
        `https://x8ki-letl-twmt.n7.xano.io/api:4m4S1GeF/lists/${meX.lists_id}`

      );
      // console.log('getListId', getListId);
      // console.log('objectToSave.chords[0].positions', objectToSave);

      Cookies.set('savedchords', objectToSave);
      const getList = await axios.get(
        `https://x8ki-letl-twmt.n7.xano.io/api:4m4S1GeF/lists/${getListId.data.id}`
      )
      // console.log('getList', getList)
      const currentList = getList.data.actual_songs
      currentList.push(objectToSave)
      // console.log('currentList', currentList)
      const update = await axios.patch(
        `https://x8ki-letl-twmt.n7.xano.io/api:4m4S1GeF/lists/${getListId.data.id}`,
        {
          actual_songs: currentList,
        }

      );
    }



  }


  // useEffect(() => {
  //   console.log('it run')
  //   if (chordObj.length !== 0 && input !== '' && inputTitle !== '') {

  //     window.localStorage.setItem('chordObj', JSON.stringify(chordObj))
  //     window.localStorage.setItem('input', JSON.stringify(input))
  //     window.localStorage.setItem('title', JSON.stringify(inputTitle))
  //   }
  // }, [chordObj, input, inputTitle]);

  return (
    <div className='landingPage'>
      <div className='container'>
        {showModal && (
          <SaveModal setShowModal={setShowModal} />
        )}
        {modal && (
          <ConfirmSavemodal setShowModal={setModal} />
        )}

        <div className='chords'>

          {chordObj?.map((chor) => {
            return <Chord key={chor.chordName} chord={chor} howMuch={howMuch} />;
          })}
        </div>
        <div className="layout">
          <div className="inputcontainer">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              name=""
              id=""
              cols={30}
              rows={10}
              className="textArea"
              placeholder="paste your lyrics and chords here"
            ></textarea>
            <div className="buttons">
              <button onClick={handleCheck}>Check Song</button>
              <button data-tone={2} onClick={handleUpOneTone}>
                <MdKeyboardDoubleArrowUp />
                <span className="tooltiptext">move a tone up</span>
              </button>
              <button data-tone={1} onClick={handleUpOneTone}>
                <MdKeyboardArrowUp />
                <span className="tooltiptext">move a semitone up</span>
              </button>
              <button data-tone={-1} onClick={handleDownOneTone}>
                <MdKeyboardArrowDown />
                <span className="tooltiptext">move a semitone down</span>
              </button>
              <button data-tone={-2} onClick={handleUpOneTone}>
                <MdKeyboardDoubleArrowDown />
                <span className="tooltiptext">move a tone down</span>
              </button>
              <button onClick={handleSave}>SAVE</button>
            </div>
            <div className="title">transposed semitones: <span className="howMuch">{howMuch}</span></div>

          </div>
        </div>
        <input type="text" placeholder="title song here" className="inputTitle" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} />
      </div>
    </div>
  )
}


