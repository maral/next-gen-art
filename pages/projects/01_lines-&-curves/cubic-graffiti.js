import ArtPage from 'components/artPage'
import getPalettes from 'lib/palettes'

let palettes
let currentPalette = 0

const settings = [
  {
    name: 'stepLength',
    label: 'Step length',
    initial: 25,
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: 'stepCount',
    label: 'Step count',
    initial: 10,
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: 'loops',
    label: 'Loops',
    initial: 1000,
    min: 1,
    max: 10000,
    step: 5,
  },
  {
    name: 'thickness',
    label: 'Thickness',
    initial: 6,
    min: 1,
    max: 20,
    step: 1,
  },
  {
    name: 'thicknessVariability',
    label: 'Thickness variability',
    initial: 2,
    min: 0,
    max: 10,
    step: 1,
  },
  {
    name: 'bulletRadius',
    label: 'Bullet radius',
    initial: 15,
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: 'bulletRadiusVariability',
    label: 'Bul. radius variability',
    initial: 2,
    min: 0,
    max: 10,
    step: 1,
  },
]

const drawFactory = ({
  stepLength,
  stepCount,
  loops,
  thickness,
  thicknessVariability,
  bulletRadius,
  bulletRadiusVariability,
}) => {
  const draw = (p5) => {
    p5.strokeWeight(thickness)
    palettes = getPalettes()
    pickRandomPalette()

    p5.background(getAndRemoveRandomColor())

    for (let i = 0; i < loops; i++) {
      fillLongLine(p5, stepLength, stepCount)
    }
  }

  const directions = [
    [1, 1],
    [-1, 1],
    [-1, -1],
    [1, -1],
  ]

  const changes = [
    [0, 1, 3],
    [0, 1, 2],
    [1, 2, 3],
    [0, 2, 3],
  ]

  const fillLongLine = (p5, stepLength, stepCount) => {
    let i = 0
    let x = getRandomInt(0, p5.width)
    let y = getRandomInt(0, p5.height)
    let direction = getRandomInt(0, 3)

    p5.noFill()
    setRandomStrokeColor(p5)

    p5.strokeWeight(getVariableValue(bulletRadius, bulletRadiusVariability))
    p5.point(x, y)

    p5.strokeWeight(getVariableValue(thickness, thicknessVariability))
    while (i++ < stepCount) {
      p5.line(
        x,
        y,
        x + getDirectionX(direction) * stepLength,
        y + getDirectionY(direction) * stepLength,
      )
      x += getDirectionX(direction) * stepLength
      y += getDirectionY(direction) * stepLength
      direction = changes[direction][getRandomInt(0, 2)]
    }
    p5.strokeWeight(getVariableValue(bulletRadius, bulletRadiusVariability))
    p5.point(x, y)
  }

  const getVariableValue = (value, variability) =>
    Math.max(1, value + getRandomInt(-variability, variability))

  const getDirectionX = (direction) => {
    return directions[direction][0]
  }

  const getDirectionY = (direction) => {
    return directions[direction][1]
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

  const getAndRemoveRandomColor = () => {
    let i = getRandomInt(0, palettes[currentPalette].length - 1)
    let color = palettes[currentPalette][i]
    palettes[currentPalette].splice(i, 1)
    return color
  }

  const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  return draw
}

const CubicGraffiti = () => (
  <ArtPage
    title="Cubic Graffiti"
    drawFactory={drawFactory}
    settings={settings}
  />
)

export default CubicGraffiti
