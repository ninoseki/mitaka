import { expect } from 'chai';
import 'mocha';
import { SecurityTrails } from '../lib/securitytrails';

describe('SecurityTrails', () => {
  describe('#searchUrl', () => {
    it('should return URL', () => {
      const st = new SecurityTrails();

      expect(st.searchUrl('8.8.8.8')).to.equal('https://securitytrails.com/list/ip/8.8.8.8');
      expect(st.searchUrl('github.com')).to.equal('https://securitytrails.com/domain/github.com');
      expect(st.searchUrl('test')).to.equal('https://securitytrails.com/list/keyword/test');
    });
  });
});
