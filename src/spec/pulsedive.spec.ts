import { expect } from 'chai';
import 'mocha';
import { Pulsedive } from '../lib/pulsedive';

describe('Pulsedive', () => {
  describe('#searchByURL', () => {
    it('should return URL', () => {
      const pd = new Pulsedive();
      expect(pd.searchByURL('https://github.com')).
        to.equal('https://pulsedive.com/indicator/?ioc=aHR0cHM6Ly9naXRodWIuY29t');
    });
  });
});
