import MenuItem from '@/components/common/MenuItem';
import { createTest, destroyVM } from '../util';

describe('MenuItem', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(MenuItem, {
      name: 'test',
      icon: 'icon-bag'
    }, true);
    expect(vm.$el.querySelector('.menu-item__name').textContent).to.equal('test');
  });
});
