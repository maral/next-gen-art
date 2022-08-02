import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'

import Range from 'components/range'
import debounce from 'lib/debounce'

const SettingsBar = ({ settings, redraw }) => {
  const [open, setOpen] = useState(true)
  const [redrawOnChange, setRedrawOnChange] = useState(true)

  const redrawDebounced = debounce(() => {
    redraw()
  }, 500)

  return (
    <Row className="mb-5">
      <Col md={{ span: 6, offset: 3 }}>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          variant="secondary"
          className="mb-1"
        >
          {open ? 'Hide parameters' : 'Show parameters'}
        </Button>
        <Collapse in={open} className="mt-2">
          <Stack gap={2}>
            <Form.Check
              type="switch"
              id="redraw-on-change"
              label="Automatically redraw after change"
              checked={redrawOnChange}
              onChange={(event) => setRedrawOnChange(event.target.checked)}
            />
            {settings.map((setting, i) => {
              if (setting.type == 'switch') {
                return (
                  <Form.Check
                    key={i}
                    type="switch"
                    id={'switch-' + setting.name}
                    label={setting.label}
                    checked={setting.value}
                    onChange={async (event) => {
                      await setting.setValue(event.target.checked)
                      if (redrawOnChange) {
                        redraw.apply(this)
                      }
                    }}
                  />
                )
              } else {
                return (
                  <Range
                    key={i}
                    label={setting.label}
                    value={setting.value}
                    setValue={setting.setValue}
                    min={setting.min}
                    max={setting.max}
                    step={setting.step}
                    onChange={redrawOnChange ? redraw : null}
                  />
                )
              }
            })}
          </Stack>
        </Collapse>
        <Button className="w-100 mt-3" variant="primary" onClick={redraw}>
          Redraw
        </Button>
      </Col>
    </Row>
  )
}

export default SettingsBar
