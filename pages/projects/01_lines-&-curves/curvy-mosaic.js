import ArtPage from 'components/artPage'
import getPalettes from 'lib/palettes'

let palettes
let currentPalette = 0
const goldenRatio = 1.618

const settings = [
  {
    name: 'stepLength',
    label: 'Step length',
    initial: 25,
    min: 10,
    max: 100,
    step: 1,
  },
  {
    name: 'loops',
    label: 'Loops',
    initial: 2,
    min: 1,
    max: 10,
    step: 1,
  },
  {
    name: 'thickness',
    label: 'Thickness',
    initial: 4,
    min: 1,
    max: 20,
    step: 1,
  },
  {
    name: 'thicknessVariability',
    label: 'Thickness variability',
    initial: 0,
    min: 0,
    max: 10,
    step: 1,
  },
  {
    name: 'enableDrawSquares',
    label: 'Draw squares',
    initial: true,
    type: 'switch',
  },
  {
    name: 'enableDrawCurves',
    label: 'Draw curves',
    initial: true,
    type: 'switch',
  },
]

const drawFactory = ({
  stepLength,
  loops,
  thickness,
  thicknessVariability,
  enableDrawSquares,
  enableDrawCurves,
}) => {
  stepLength = Math.max(1, stepLength)
  const draw = (p5) => {
    palettes = getPalettes()
    pickRandomPalette()
    p5.background(getAndRemoveRandomColor())

    for (let i = 1; i <= loops; i++) {
      if (enableDrawSquares && enableDrawCurves) {
        drawBoth(p5, stepLength * i, 1 / goldenRatio ** (i - 1))
      } else if (enableDrawCurves) {
        drawCurves(p5, stepLength * i, 1 / goldenRatio ** (i - 1))
      } else if (enableDrawSquares) {
        drawSquares(p5, stepLength * i, 1 / goldenRatio ** (i - 1))
      }
    }
  }

  const drawSquares = (p5, stepLength, probability) => {
    fillGeneric(p5, true, false, stepLength, probability)
  }

  const drawCurves = (p5, stepLength, probability) => {
    fillGeneric(p5, false, true, stepLength, probability)
  }

  const drawBoth = (p5, stepLength, probability) => {
    fillGeneric(p5, true, true, stepLength, probability)
  }

  const fillGeneric = (
    p5,
    drawSquares,
    drawCurves,
    stepLength,
    probability,
  ) => {
    for (let x = 0; x < p5.width; x = x + stepLength) {
      for (let y = 0; y < p5.height; y = y + stepLength) {
        if (Math.random() < probability) {
          if (drawSquares) {
            p5.noStroke()
            p5.fill(getRandomColor())
            p5.rect(x, y, stepLength, stepLength)
          }

          if (drawCurves) {
            p5.noFill()
            setRandomStrokeColor(p5)
            p5.strokeWeight(getVariableValue(thickness, thicknessVariability))
            let n = Math.random()
            if (n < 0.25) {
              p5.arc(
                x,
                y + stepLength,
                stepLength * 2,
                stepLength * 2,
                p5.PI + p5.HALF_PI,
                0,
              )
            } else if (n < 0.5) {
              p5.arc(x, y, stepLength * 2, stepLength * 2, 0, p5.HALF_PI)
            } else if (n < 0.75) {
              p5.arc(
                x + stepLength,
                y,
                stepLength * 2,
                stepLength * 2,
                p5.HALF_PI,
                p5.PI,
              )
            } else {
              p5.arc(
                x + stepLength,
                y + stepLength,
                stepLength * 2,
                stepLength * 2,
                p5.PI,
                p5.PI + p5.HALF_PI,
              )
            }
          }
        }
      }
    }
  }

  const getVariableValue = (value, variability) =>
    Math.max(1, value + getRandomInt(-variability, variability))

  const getAndRemoveRandomColor = () => {
    let i = getRandomInt(0, palettes[currentPalette].length - 1)
    let color = palettes[currentPalette][i]
    palettes[currentPalette].splice(i, 1)
    return color
  }

  const setRandomStrokeColor = (p5) => {
    const color = getRandomColor()
    p5.stroke(color)
  }

  const pickRandomPalette = () => {
    currentPalette = getRandomInt(0, palettes.length - 1)
  }

  const getRandomColor = () => {
    const i = getRandomInt(0, palettes[currentPalette].length - 1)
    return palettes[currentPalette][i]
  }

  const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  return draw
}

const CurvyMosaic = () => (
  <ArtPage title="Curvy Mosaic" drawFactory={drawFactory} settings={settings} />
)

export default CurvyMosaic
