import { Sherlockeye } from '~/searcher'

describe('Sherlockeye', function () {
  const subject = new Sherlockeye()

  it('should support ip, domain and email', function () {
    expect(subject.supportedTypes).toEqual(['ip', 'domain', 'email'])
  })

  describe('#searchByIP', function () {
    const ip = '1.1.1.1'
    it('should return a URL', function () {
      expect(subject.searchByIP(ip)._unsafeUnwrap()).toBe('https://app.sherlockeye.io/?q=1.1.1.1')
    })
  })

  describe('#searchByDomain', function () {
    const domain = 'github.com'
    it('should return a URL', function () {
      expect(subject.searchByDomain(domain)._unsafeUnwrap()).toBe(
        'https://app.sherlockeye.io/?q=github.com',
      )
    })
  })

  describe('#searchByEmail', function () {
    const email = 'test@test.com'
    it('should return a URL', function () {
      expect(subject.searchByEmail(email)._unsafeUnwrap()).toBe(
        'https://app.sherlockeye.io/?q=test%40test.com',
      )
    })
  })

})
