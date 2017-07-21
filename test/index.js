import tiza from '../src/index'
import Tiza from '../src/tiza'

describe('tiza', function() {
  let ins = tiza()

  beforeEach(function() {
    ins = tiza()
  })

  it('initial value', function() {
    expect(ins.getCurrentStyles()).toEqual([])
    expect(ins.getStyles()).toEqual([])
    expect(ins.getTexts()).toEqual([])
  })

  describe('style methods', function() {
    it('always return an instance', function() {
      expect(ins.style('color:red')).toEqual(jasmine.any(Tiza))
      expect(ins.color('red')).toEqual(jasmine.any(Tiza))
      expect(ins.bgColor('red')).toEqual(jasmine.any(Tiza))
      expect(ins.bold()).toEqual(jasmine.any(Tiza))
      expect(ins.italic()).toEqual(jasmine.any(Tiza))
      expect(ins.size(20)).toEqual(jasmine.any(Tiza))
      expect(ins.reset()).toEqual(jasmine.any(Tiza))
    })

    it('always return an new instance', function() {
      expect(ins.style('color:red')).not.toBe(ins)
      expect(ins.color('red')).not.toBe(ins)
      expect(ins.bgColor('red')).not.toBe(ins)
      expect(ins.bold()).not.toBe(ins)
      expect(ins.italic()).not.toBe(ins)
      expect(ins.size(20)).not.toBe(ins)
      expect(ins.reset()).not.toBe(ins)
    })

    it('save style', function() {
      expect(ins.style('color:red').getCurrentStyles()).toEqual(['color:red'])
      expect(ins.color('red').getCurrentStyles()).toEqual(['color:red'])
      expect(ins.bgColor('red').getCurrentStyles()).toEqual([
        'background-color:red',
      ])
      expect(ins.bold().getCurrentStyles()).toEqual(['font-weight:bold'])
      expect(ins.italic().getCurrentStyles()).toEqual(['font-style:italic'])
      expect(ins.size('120%').getCurrentStyles()).toEqual(['font-size:120%'])
      expect(ins.size(20).getCurrentStyles()).toEqual(['font-size:20px'])
    })

    it('method chaining', function() {
      expect(
        ins.style('color:red').bold().italic().getCurrentStyles()
      ).toEqual(['color:red', 'font-weight:bold', 'font-style:italic'])
    })

    it('reset', function() {
      expect(
        ins.style('color:red').bgColor('black').reset().getCurrentStyles()
      ).toEqual([])
    })
  })

  describe('text methods', function() {
    it('always return an instance', function() {
      expect(ins.text('abc')).toEqual(jasmine.any(Tiza))
      expect(ins.space()).toEqual(jasmine.any(Tiza))
      expect(ins.newline()).toEqual(jasmine.any(Tiza))
    })

    it('always return a new instance', function() {
      expect(ins.text('abc')).not.toBe(ins)
      expect(ins.space()).not.toBe(ins)
      expect(ins.newline()).not.toBe(ins)
    })

    it('save text', function() {
      expect(ins.text('abc').getTexts()).toEqual(['abc'])
      expect(ins.space().getTexts()).toEqual([' '])
      expect(ins.space(10).getTexts()).toEqual(['          '])
      expect(ins.newline().getTexts()).toEqual(['\n'])
      expect(ins.newline(10).getTexts()).toEqual(['\n\n\n\n\n\n\n\n\n\n'])
    })

    it('save current style', function() {
      expect(ins.color('red').text('abc').getStyles()).toEqual(['color:red'])
      expect(ins.color('red').space().getStyles()).toEqual(['color:red'])
      expect(ins.color('red').newline().getStyles()).toEqual(['color:red'])
    })

    it('keep previous styles', function() {
      const i = ins.color('red').text('a').bold().text('b')
      expect(i.getTexts()).toEqual(['a', 'b'])
      expect(i.getStyles()).toEqual(['color:red', 'color:red;font-weight:bold'])
    })

    it('ignore no argument', function() {
      expect(ins.text().getTexts()).toEqual([])
    })

    describe('multiple arguments', function() {
      it('save all arguments', function() {
        expect(ins.text('a', 'b', 'c').getTexts()).toEqual(['a', 'b', 'c'])
      })

      it('save current style for all arguments', function() {
        const i = ins.color('red').text('a', 'b', 'c')
        expect(i.getTexts()).toEqual(['a', 'b', 'c'])
        expect(i.getStyles()).toEqual(['color:red', 'color:red', 'color:red'])
      })

      it('support nesting', function() {
        const a = ins.color('red').text('a')
        const b = ins.bold().text(a, 'b')
        const c = ins.italic().text(b, 'c')
        expect(b.getTexts()).toEqual(['a', 'b'])
        expect(b.getStyles()).toEqual(['color:red', 'font-weight:bold'])
        expect(c.getTexts()).toEqual(['a', 'b', 'c'])
        expect(c.getStyles()).toEqual([
          'color:red',
          'font-weight:bold',
          'font-style:italic',
        ])
      })
    })
  })

  describe('log', function() {
    beforeEach(function() {
      spyOn(console, 'log').and.callThrough()
    })

    it('should call console.log', function() {
      ins.color('red').text('abc').log()
      expect(console.log).toHaveBeenCalledTimes(1)
      expect(console.log).toHaveBeenCalledWith('%cabc', 'color:red')
    })

    it('equal to text when argument passed', function() {
      ins.color('red').log('abc')
      expect(console.log).toHaveBeenCalledTimes(1)
      expect(console.log).toHaveBeenCalledWith('%cabc', 'color:red')
    })

    it('handle nesting', function() {
      const a = ins.color('red').text('red')
      const b = ins.bold().text(a, 'bold')
      const c = ins.italic().text(b, 'italic')
      c.log()
      expect(console.log).toHaveBeenCalledTimes(1)
      expect(console.log).toHaveBeenCalledWith(
        '%cred%cbold%citalic',
        'color:red',
        'font-weight:bold',
        'font-style:italic'
      )
    })
  })
})
