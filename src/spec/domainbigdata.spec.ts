import { expect } from 'chai';
import 'mocha';
import { DomainBigData } from '../lib/domainbigdata';

describe('DomainBigData', () => {
  describe('#searchByDomain', () => {
    it('should return URL', () => {
      const domainBigData = new DomainBigData();
      expect(domainBigData.supportedTypes.indexOf('domain')).not.equal(-1);
      expect(domainBigData.searchByDomain('github.com')).
        to.equal('https://domainbigdata.com/github.com');
    });
  });
});
