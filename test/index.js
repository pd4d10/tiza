import tiza from '../src/index'
import Tiza from '../src/tiza'

describe('tiza', function() {
  it('initial value', function() {
    expect(tiza.getCurrentStyles()).toEqual([])
    expect(tiza.getStyles()).toEqual([])
    expect(tiza.getTexts()).toEqual([])
  })

  describe('style methods', function() {
    it('always return an instance', function() {
      expect(tiza.style('color:red')).toEqual(jasmine.any(Tiza))
      expect(tiza.color('red')).toEqual(jasmine.any(Tiza))
      expect(tiza.bgColor('red')).toEqual(jasmine.any(Tiza))
      expect(tiza.bold()).toEqual(jasmine.any(Tiza))
      expect(tiza.italic()).toEqual(jasmine.any(Tiza))
      expect(tiza.size(20)).toEqual(jasmine.any(Tiza))
      expect(tiza.reset()).toEqual(jasmine.any(Tiza))
    })

    it('always return an new instance', function() {
      expect(tiza.style('color:red')).not.toBe(tiza)
      expect(tiza.color('red')).not.toBe(tiza)
      expect(tiza.bgColor('red')).not.toBe(tiza)
      expect(tiza.bold()).not.toBe(tiza)
      expect(tiza.italic()).not.toBe(tiza)
      expect(tiza.size(20)).not.toBe(tiza)
      expect(tiza.reset()).not.toBe(tiza)
    })

    it('save style', function() {
      expect(tiza.style('color:red').getCurrentStyles()).toEqual(['color:red'])
      expect(tiza.color('red').getCurrentStyles()).toEqual(['color:red'])
      expect(tiza.bgColor('red').getCurrentStyles()).toEqual([
        'background-color:red',
      ])
      expect(tiza.bold().getCurrentStyles()).toEqual(['font-weight:bold'])
      expect(tiza.italic().getCurrentStyles()).toEqual(['font-style:italic'])
      expect(tiza.size('120%').getCurrentStyles()).toEqual(['font-size:120%'])
      expect(tiza.size(20).getCurrentStyles()).toEqual(['font-size:20px'])
    })

    it('method chaining', function() {
      expect(
        tiza.style('color:red').bold().italic().getCurrentStyles()
      ).toEqual(['color:red', 'font-weight:bold', 'font-style:italic'])
    })

    it('reset', function() {
      expect(
        tiza.style('color:red').bgColor('black').reset().getCurrentStyles()
      ).toEqual([])
    })
  })

  describe('text methods', function() {
    it('always return an instance', function() {
      expect(tiza.text('abc')).toEqual(jasmine.any(Tiza))
      expect(tiza.space()).toEqual(jasmine.any(Tiza))
      expect(tiza.newline()).toEqual(jasmine.any(Tiza))
    })

    it('always return a new instance', function() {
      expect(tiza.text('abc')).not.toBe(tiza)
      expect(tiza.space()).not.toBe(tiza)
      expect(tiza.newline()).not.toBe(tiza)
    })

    it('save text', function() {
      expect(tiza.text('abc').getTexts()).toEqual(['abc'])
      expect(tiza.space().getTexts()).toEqual([' '])
      expect(tiza.space(10).getTexts()).toEqual(['          '])
      expect(tiza.newline().getTexts()).toEqual(['\n'])
      expect(tiza.newline(10).getTexts()).toEqual(['\n\n\n\n\n\n\n\n\n\n'])
    })

    it('save current style', function() {
      expect(tiza.color('red').text('abc').getStyles()).toEqual(['color:red'])
      expect(tiza.color('red').space().getStyles()).toEqual(['color:red'])
      expect(tiza.color('red').newline().getStyles()).toEqual(['color:red'])
    })

    it('keep previous styles', function() {
      const i = tiza.color('red').text('a').bold().text('b')
      expect(i.getTexts()).toEqual(['a', 'b'])
      expect(i.getStyles()).toEqual(['color:red', 'color:red;font-weight:bold'])
    })

    it('ignore no argument', function() {
      expect(tiza.text().getTexts()).toEqual([])
    })

    describe('multiple arguments', function() {
      it('save all arguments', function() {
        expect(tiza.text('a', 'b', 'c').getTexts()).toEqual(['a', 'b', 'c'])
      })

      it('save current style for all arguments', function() {
        const i = tiza.color('red').text('a', 'b', 'c')
        expect(i.getTexts()).toEqual(['a', 'b', 'c'])
        expect(i.getStyles()).toEqual(['color:red', 'color:red', 'color:red'])
      })

      it('support nesting', function() {
        const a = tiza.color('red').text('a')
        const b = tiza.bold().text(a, 'b')
        const c = tiza.italic().text(b, 'c')
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
      tiza.color('red').text('abc').log()
      expect(console.log).toHaveBeenCalledTimes(1)
      expect(console.log).toHaveBeenCalledWith('%cabc', 'color:red')
    })

    it('equal to text when argument passed', function() {
      tiza.color('red').log('abc')
      expect(console.log).toHaveBeenCalledTimes(1)
      expect(console.log).toHaveBeenCalledWith('%cabc', 'color:red')
    })

    it('handle nesting', function() {
      const a = tiza.color('red').text('red')
      const b = tiza.bold().text(a, 'bold')
      const c = tiza.italic().text(b, 'italic')
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
