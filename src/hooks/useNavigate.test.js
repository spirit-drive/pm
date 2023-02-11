import { getToWithSearch, getPath } from './useNavigate';

describe('useNavigate', () => {
  describe('getToWithSearch', () => {
    it('empty to, add to search', () => {
      expect(getToWithSearch('', '', { addToSearch: { test: 'test' } })).toBe('?test=test');
    });

    it('add to search', () => {
      expect(getToWithSearch('test', '', { addToSearch: { test: 'test' } })).toBe('test?test=test');
    });

    it('add to not empty search', () => {
      expect(getToWithSearch('test', '?test2=test2', { addToSearch: { test: 'test' } })).toBe(
        'test?test=test&test2=test2'
      );
    });

    it('empty to, remove from search', () => {
      expect(getToWithSearch('', '', { removeKeysFromSearch: ['test'] })).toBe('');
      expect(getToWithSearch('', '', { removeKeysFromSearch: [] })).toBe('');
    });

    it('remove from search', () => {
      expect(getToWithSearch('test', '', { removeKeysFromSearch: ['test'] })).toBe('test');
      expect(getToWithSearch('test', '', { removeKeysFromSearch: [] })).toBe('test');
    });

    it('remove from not empty search', () => {
      expect(getToWithSearch('test', '?test2=test2', { removeKeysFromSearch: ['test2'] })).toBe('test');
    });

    it('remove few keys from not empty search', () => {
      expect(
        getToWithSearch('test', '?test2=test2&test=test&test1=test1', { removeKeysFromSearch: ['test2', 'test1'] })
      ).toBe('test?test=test');
    });

    it('add and remove', () => {
      expect(
        getToWithSearch('test', '?test2=test2&test1=test1', {
          removeKeysFromSearch: ['test2', 'test1'],
          addToSearch: { test: 'test' },
        })
      ).toBe('test?test=test');
    });

    it('add and remove same things', () => {
      expect(getToWithSearch('test', '', { removeKeysFromSearch: ['test'], addToSearch: { test: 'test' } })).toBe(
        'test'
      );
    });
  });

  describe('getPath', () => {
    it('to root with empty to', () => {
      expect(getPath({ pathname: '/1/management/plugin/1', to: '', toRoot: true })).toBe('/1/management/plugin/1');
    });

    it('to not root  with empty to', () => {
      expect(getPath({ pathname: '/1/management/plugin/1', to: '', toRoot: false })).toBe('/1/management/plugin/1');
    });

    it('to root with empty to and unknown companyId', () => {
      expect(getPath({ pathname: '/1/management/plugin/1', to: '', toRoot: true })).toBe('/1/management/plugin/1');
    });

    it('to not root  with empty to and unknown companyId', () => {
      expect(getPath({ pathname: '/1/management/plugin/1', to: '', toRoot: false })).toBe('/1/management/plugin/1');
    });

    it('to root simple', () => {
      expect(getPath({ pathname: '/1/management/plugin/1', to: '/test', toRoot: true })).toBe('/test');
    });

    it('to root with search', () => {
      expect(getPath({ pathname: '/1/management/plugin/1?test=test', to: '/test', toRoot: true })).toBe('/test');
    });

    it('to root with unknown companyId', () => {
      expect(getPath({ pathname: '/1/management/plugin/1', to: '/test', companyId: undefined, toRoot: true })).toBe(
        '/test'
      );
    });

    it('to not root simple', () => {
      expect(getPath({ pathname: '/1/management/plugin/1/', to: '/test', toRoot: false })).toBe('/test');
    });

    it('to not root with search', () => {
      expect(getPath({ pathname: '/1/management/plugin/1/?test=test', to: '/test', toRoot: false })).toBe('/test');
    });

    it('to not root unknown companyId', () => {
      expect(getPath({ pathname: '/1/management/plugin/1/?test=test', to: '/test', toRoot: false })).toBe('/test');
    });

    it('to root simple with adding path', () => {
      expect(getPath({ pathname: '/1/management/plugin/1', to: 'test', toRoot: true })).toBe(
        '/1/management/plugin/1/test'
      );
    });

    it('to root with unknown companyId with adding path', () => {
      expect(getPath({ pathname: '/1/management/plugin/1', to: 'test', toRoot: true })).toBe(
        '/1/management/plugin/1/test'
      );
    });

    it('to not root simple with adding path', () => {
      expect(getPath({ pathname: '/1/management/plugin/1/', to: 'test', toRoot: false })).toBe('test');
    });
  });
});
