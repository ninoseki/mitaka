import { expect } from 'chai';
import 'mocha';
import { SecurityTrails } from '../lib/securitytrails';

describe('SecurityTrails', () => {
  describe('#searchUrl', () => {
    it('should return URL', () => {
      const st = new SecurityTrails();

      expect(st.searchByIP('8.8.8.8')).to.equal('https://securitytrails.com/list/ip/8.8.8.8');
      expect(st.searchByDomain('github.com')).to.equal('https://securitytrails.com/domain/github.com');
      expect(st.searchByText('test')).to.equal('https://securitytrails.com/list/keyword/test');
    });
  });
});
