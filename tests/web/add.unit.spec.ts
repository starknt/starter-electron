import { useCounter } from '@app-web/composable/useCounter'
import { add } from '@app/compat-common'

test('Add function', () => {
  expect(add(1, 2)).toEqual(3)
})

test('useCounter', () => {
  const counter = useCounter(0)

  it('reset', () => {
    expect(counter.count).toBe(0)
    counter.inc(2)
    counter.reset()
    expect(counter.count).toBe(0)
  })

  it('inc', () => {
    expect(counter.count).toBe(0)
    counter.inc(1)
    expect(counter.count).toBe(1)
    counter.reset()
  })

  it('dec', () => {
    expect(counter.count).toBe(0)
    counter.dec(1)
    expect(counter.count).toBe(-1)
    counter.reset()
  })
})
