import tiza from '../src/index'

describe('Tiza should be a function', () => {
  it('right', function() {
    expect(typeof tiza).toEqual('function')
  })
})

// describe('tiza.color', () => {
//   it('should be a function', () => {
//     expect(tiza.color).toEqual(jasmine.any('function'))
//   })
// })

describe('tiza.log', function() {
  it('should be a function', function() {
    expect(typeof tiza.log).toEqual('function')
  })
})

describe('f', function() {
  beforeEach(function() {
    spyOn(console, 'log').and.callThrough()
    tiza.log('test')
  })

  it('called console.log', function() {
    expect(console.log).toHaveBeenCalled()
  })

  it('called console.log with correct argument', function() {
    expect(console.log).toHaveBeenCalledWith('%ctest', '')
  })
})
