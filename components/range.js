import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

const Range = ({
  value,
  setValue,
  label,
  onChange,
  min = 5,
  max = 100,
  step = 1,
}) => {
  const onChangeComposed = async (event) => {
    await setValue(parseInt(event.target.value))
    if (onChange) {
      onChange.apply(this)
    }
  }

  return (
    <Row className="align-items-center">
      <Col xs={6}>
        <InputGroup>
          <InputGroup.Text>{label}</InputGroup.Text>
          <Form.Control
            className="form-control-sm text-center"
            value={value}
            onChange={onChangeComposed}
          ></Form.Control>
        </InputGroup>
      </Col>
      <Col>
        <Form.Range
          className="align-middle"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChangeComposed}
        />
      </Col>
    </Row>
  )
}

export default Range
