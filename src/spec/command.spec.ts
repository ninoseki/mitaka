import { expect } from 'chai';
import 'mocha';
import { Command } from '../lib/command';

describe('Command', () => {
  describe('#constructor', () => {
    it('should return attributes', () => {
      const command = new Command('Search https://github.com as a url on Urlscan');
      expect(command.action).to.equal('search');
      expect(command.query).to.equal('https://github.com');
      expect(command.target).to.equal('Urlscan');
    });
  });
  describe('#search', () => {
    it('should return a URL for search', () => {
      const command = new Command('Search https://github.com as a url on Urlscan');
      expect(command.search()).to.equal('https://urlscan.io/search/#%22https%3A%2F%2Fgithub.com%22');
    });
  });
});
