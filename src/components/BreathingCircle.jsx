import React, { useEffect, useState, useRef } from 'react';

function BreathingCircle({ inhale, hold, exhale, wait, cycles, prepareTime = 5 }) {
  const [isPreparing, setIsPreparing] = useState(true);
  const [phase, setPhase] = useState('inhale');
  const [cycle, setCycle] = useState(1);
  const [displayCycle, setDisplayCycle] = useState(1);
  const [totalTimeLeft, setTotalTimeLeft] = useState(0);
  const [prepareTimeLeft, setPrepareTimeLeft] = useState(prepareTime);
  const [transitionDuration, setTransitionDuration] = useState(inhale);
  const [circleSize, setCircleSize] = useState('8rem');

  const countdownRef = useRef(null);

  useEffect(() => {
    const prepareCountdown = setInterval(() => {
      setPrepareTimeLeft((prev) => {
        if (prev > 0) return prev - 1;
        clearInterval(prepareCountdown);
        setIsPreparing(false);
        startBreathing();
        return 0;
      });
    }, 1000);

    const startBreathing = () => {
      const sequence = [
        { phase: 'inhale', duration: inhale },
        { phase: 'hold', duration: hold },
        { phase: 'exhale', duration: exhale },
        { phase: 'wait', duration: wait },
      ];

      let currentIndex = 0;
      let currentCycle = 1;
      let phaseTimer;

      setTotalTimeLeft((inhale + hold + exhale + wait) * cycles);

      if (!countdownRef.current) {
        countdownRef.current = setInterval(() => {
          setTotalTimeLeft((prev) => {
            if (prev > 1) return prev - 1;
            clearInterval(countdownRef.current);
            countdownRef.current = null;
            return 0;
          });
        }, 1000);
      }

      const updatePhase = () => {
        const { phase, duration } = sequence[currentIndex];
        setPhase(phase);
        setTransitionDuration(duration);

        if (phase === 'inhale') {
          setTimeout(() => setCircleSize('16rem'), (duration / 4) * 1000);
        } else if (phase === 'hold') {
          setCircleSize('16rem');
        } else if (phase === 'exhale' || phase === 'wait') {
          setCircleSize('8rem');
        }

        phaseTimer = setTimeout(() => {
          currentIndex = (currentIndex + 1) % sequence.length;

          if (currentIndex === 0) {
            currentCycle += 1;
            setCycle(currentCycle);

            if (currentCycle < 5) {
              setDisplayCycle(currentCycle);
            }

            if (currentCycle > cycles) {
              clearInterval(countdownRef.current);
              countdownRef.current = null;
              return;
            }
          }

          updatePhase();
        }, duration * 1000);
      };

      updatePhase();

      return () => {
        clearTimeout(phaseTimer);
        clearInterval(countdownRef.current);
      };
    };

    return () => clearInterval(prepareCountdown);
  }, [inhale, hold, exhale, wait, cycles, prepareTime]);

  // Función para formatear tiempo restante en minutos y segundos
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="flex flex-col items-center">
      {isPreparing ? (
        <div className="w-full flex flex-col items-center">
          <p className="text-gray-700 text-lg mb-2">Get Ready...</p>
          <div className="relative w-64 h-4 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-1000"
              style={{ width: `${((prepareTime - prepareTimeLeft) / prepareTime) * 100}%` }}
            />
          </div>
          <p className="text-gray-700 text-sm mt-2">{prepareTimeLeft} seconds</p>
        </div>
      ) : (
        <>
          <div className="relative w-64 h-64 flex items-center justify-center">
            <div
              className="absolute bg-blue-300 rounded-full transition-all ease-in-out"
              style={{
                width: circleSize,
                height: circleSize,
                transitionDuration: `${transitionDuration}s`,
                transformOrigin: 'center'
              }}
            >
              <p className="text-white text-lg font-semibold flex items-center justify-center h-full">
                {phase.toUpperCase()}
              </p>
            </div>
          </div>
          {/* Tiempo restante formateado en minutos y segundos */}
          <p className="text-gray-700 text-xl mt-4">{formatTime(totalTimeLeft)}</p>
          <p className="text-gray-600">Cycle: {displayCycle} of {cycles}</p>
        </>
      )}
    </div>
  );
}

export default BreathingCircle;
