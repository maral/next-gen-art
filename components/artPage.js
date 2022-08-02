import dynamic from 'next/dynamic'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useState, memo } from 'react'

import Layout from 'components/layout'
import SettingsBar from 'components/settingsBar'

const Sketch = memo(
  dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
  }),
)

let p5Object = null
const width = 1200
const height = 1000

const ArtPage = ({ settings, drawFactory, title }) => {
  const setup = (p5, canvasParentRef) => {
    p5Object = p5
    p5.createCanvas(width, height).parent(canvasParentRef)
    p5.noLoop()
  }

  const redraw = async () => {
    p5Object.redraw()
  }

  const initialState = {}

  settings.map((setting, i) => {
    initialState[setting.name] = setting.initial
  })

  const [state, setState] = useState(initialState)

  const draw = drawFactory(state)

  settings.map((setting, i) => {
    settings[i].value = state[setting.name]
    settings[i].setValue = (value) => {
      setState((prevState) => ({
        ...prevState,
        [setting.name]: value,
      }))
    }
  })

  return (
    <Layout wide noLogo title={title}>
      <SettingsBar settings={settings} redraw={redraw} />
      <Row>
        <Col className="text-center">
          <Sketch setup={setup} draw={draw} />
        </Col>
      </Row>
    </Layout>
  )
}

export default ArtPage
