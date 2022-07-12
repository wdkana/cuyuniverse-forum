import { Inertia } from '@inertiajs/inertia';
import Countdown from 'react-countdown';

const ResetTime = () => {

  const done = () => {
    Inertia.reload({ only: ['news'] })
  }

  const countRender = (value) => {
    return (
      <div className="mockup-code">
        <pre data-prefix="1" className={value > 5 ? "bg-warning text-warning-content" : null}>
          <code>microfrontend preparing...</code>
        </pre>
        {value < 0 ? "renews..." :
          <pre data-prefix="2" className={value <= 5 ? "bg-warning text-warning-content" : null}>
            <code>news will updated on <span className={value <= 5 ? "bg-white text-black" : "bg-secondary"}>{value}</span></code>
          </pre>}
      </div >
    )
  }

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <Countdown
      date={Date.now() + randomInteger(12000, 20000)}
      intervalDelay={1000}
      precision={0}
      renderer={props => countRender(props.seconds)}
      onComplete={() => done()}
      overtime={true}
    />
  )
}

export default ResetTime

