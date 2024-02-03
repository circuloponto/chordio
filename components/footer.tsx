import IconLogoFacebook from './facebook'
import IconInstagramFill from './instagram'
import IconLinkedin from './linkedin'
import IconTwitterCircle from './twitter'

export default function Footer() {
  return (
    <footer onClick={() => alert('itclicks')} className='footer'>
      <div className="atBooky">© 2023 Chordio, Inc.</div>
      <div className="socials">
        {/*  <div>CONNECT:</div> */}

        <IconLogoFacebook fill={'#f44606'} className='icon' />
        <IconInstagramFill fill={'#f44606'} className='icon' />
        <IconTwitterCircle className='icon' />
        <IconLinkedin className='icon' />

      </div>
    </footer>
  )
}