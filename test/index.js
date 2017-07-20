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
  // it('should be a function', function() {
  //   expect(typeof tiza.log).toEqual('function')
  // })
})

describe('Support', function() {
  beforeEach(function() {
    spyOn(console, 'log').and.callThrough()
    tiza().log('test').flush()
  })
  it('called console.log', function() {
    expect(console.log).toHaveBeenCalledTimes(1)
  })
  it('called console.log with correct argument', function() {
    expect(console.log).toHaveBeenCalledWith('%ctest', '')
  })
})

describe('support wrap', function() {
  beforeEach(function() {
    spyOn(console, 'log').and.callThrough()
    const error = tiza().color('red').log
    // const warning = tiza().color('yellow')
    tiza().log(error('error'), 'log').flush()
  })
  it('should call console.log once', function() {
    expect(console.log).toHaveBeenCalledTimes(1)
  })
  it('should with correct argument', function() {
    expect(console.log).toHaveBeenCalledWith('%cerror%clog', 'color:red', '')
  })
})

// tiza()
//   .color('red')
//   .size(16)
//   .log('Tiza')
//   .reset()
//   .log(" is a JS library for browsers' console styling.")
//   .newline(2)
//   .log('Support')
//   .space()
//   .color('#CC3399')
//   .log('All')
//   .space()
//   .color('#FF6666')
//   .log('CSS')
//   .space()
//   .color('#336699')
//   .log('colors')
//   .reset()
//   .log(',')
//   .space()
//   .color('#fff')
//   .bgColor('blue')
//   .log('background color')
//   .reset()
//   .log(', ')
//   .bold()
//   .log('bold')
//   .reset()
//   .log(', ')
//   .italic()
//   .log('italic')
//   .reset()
//   .log(', and ')
//   .size(20)
//   .log('size')
//   .reset()
//   .newline(2)
//   .log('Support ')
//   .color('#fff')
//   .style(
//     `
//     background: linear-gradient(to right, red, orange, green, blue);
//     padding: 4px;
//     border-radius: 4px;
//   `
//   )
//   .log('custom styles')
//   .reset()
//   .log(' too!')
//   .reset()
//   .newline(2)
//   .log('Give it a try! https://github.com/pd4d10/tiza')
//   // Always remember to call `flush` at last to put all to console
//   .flush()
