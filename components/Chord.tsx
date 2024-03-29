/* eslint-disable react/prop-types */
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
//import styles from '../styles/Chord.module.scss';

interface ChordProps {
  chord: {
    name: string,
    positions: string[],
    fingers: string[],
  };
  howMuch?: number;
}
const Chord = ({ chord, howMuch }: ChordProps) => {
  //console.log('chord', chord);
  //console.log('howMuch', howMuch);
  //console.log('chord.positions', chord.positions);
  const chordPositions = chord.positions.reverse();
  //console.log('chordPositions', chordPositions);
  const positions = chord.positions.filter((item) => item !== 'x');
  const parsedPositions = positions.map((item) => Number(item));
  //console.log('parsedPositions', parsedPositions);
  const min = Math.min(...parsedPositions);
  //console.log('min', min);
  let zeroBased;
  if (min === 0) {
    zeroBased = [
      [min, min + 1, min + 2, min + 3, min + 4],
      [min, min + 1, min + 2, min + 3, min + 4],
      [min, min + 1, min + 2, min + 3, min + 4],
      [min, min + 1, min + 2, min + 3, min + 4],
      [min, min + 1, min + 2, min + 3, min + 4],
      [min, min + 1, min + 2, min + 3, min + 4],
    ];
  } else {
    zeroBased = [
      [min - 1, min, min + 1, min + 2, min + 3, min + 4],
      [min - 1, min, min + 1, min + 2, min + 3, min + 4],
      [min - 1, min, min + 1, min + 2, min + 3, min + 4],
      [min - 1, min, min + 1, min + 2, min + 3, min + 4],
      [min - 1, min, min + 1, min + 2, min + 3, min + 4],
      [min - 1, min, min + 1, min + 2, min + 3, min + 4],
    ];
  }
  /*  const [fretboard, setFretboard] = useState([
    [min, min + 1, min + 2, min + 3, min + 4, min + 5],
    [min, min + 1, min + 2, min + 3, min + 4, min + 5],
    [min, min + 1, min + 2, min + 3, min + 4, min + 5],
    [min, min + 1, min + 2, min + 3, min + 4, min + 5],
    [min, min + 1, min + 2, min + 3, min + 4, min + 5],
    [min, min + 1, min + 2, min + 3, min + 4, min + 5],
  ]); */
  const [fretboard, setFretboard] = useState(zeroBased);
  return (
    <div className="chord">
      <div className="chordName">{chord.chordName}</div>
      <div className="fretboardWithX">
        <div className="Xspot">
          {chord.positions.map((fret, i, arr) => {
            return (
              <div
                className={arr[5 - i] === 'x' ? 'x' : 'noShow'}
                key={uuidv4()}
              >
                {arr[5 - i] === 'x' ? 'x' : '-'}
              </div>
            );
          })}
        </div>
        <div>
          {fretboard.map((string, i) => {
            return (
              <div className="string" key={uuidv4()}>
                {string.map((fret, j) => {
                  // console.log('actual values:', chordPositions[5 - i], fret);
                  // console.log(
                  //   'checksdfsdf:',
                  //   Number(chordPositions[5 - i]) === fret
                  // );
                  const check = Number(chordPositions[5 - i]) === Number(fret);
                  //console.log('check', check);
                  return (
                    <div
                      //suppressHydrationWarning={true}
                      className={check ? 'fret active' : 'fret'}
                      key={uuidv4()}
                    >
                      {/* {fret} */}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className="fretNumbers">
        {fretboard[0].map((fretNumber, i) => {
          return <div key={uuidv4()}>{fretNumber}</div>;
        })}
      </div>
    </div>
  );
};

export default Chord;
