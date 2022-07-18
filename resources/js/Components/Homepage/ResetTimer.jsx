import { Inertia } from '@inertiajs/inertia';
import Countdown from 'react-countdown';

const ResetTime = () => {

  const done = () => {
    Inertia.reload({ only: ['posts'] })
  }

  const countRender = (value) => {
    return (
      <div className="mockup-code">
        <pre data-prefix="1" className={value > 5 ? "bg-warning text-warning-content" : null}>
          <code>menuggu pembaruan...</code>
        </pre>
        {value < 0 ? "repost..." :
          <pre data-prefix="2" className={value <= 5 ? "bg-warning text-warning-content" : null}>
            <code>postingan diacak dalam <span className={value <= 5 ? "bg-white text-black" : "bg-primary text-black"}>{value} detik</span></code>
          </pre>}
      </div >
    )
  }

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <Countdown
      date={Date.now() + randomInteger(90000, 1200000)}
      intervalDelay={1000}
      precision={0}
      renderer={props => countRender(props.seconds)}
      onComplete={() => done()}
      overtime={true}
    />
  )
}

export default ResetTime

