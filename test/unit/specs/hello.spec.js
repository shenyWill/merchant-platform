import Vue from 'vue';
import Hello from '@/components/common/Hello';
import { createVue, triggerClick, destroyVM } from '../util';

describe('Hello.vue', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', done => {
    vm = createVue({
      template: `
        <div>
          <button class="btn">click</button>
          <input v-show="isShow" type="text" placeholder="hello">
        </div>
      `,
      data() {
        return {
          isShow: true
        };
      },
      methods: {
        handleClick () {
          this.isShow = !this.isShow;
        }
      },
      mounted() {
      }
    }, true);

    let element = vm.$el;
    let buttonEl = element.querySelector('button');
    let inputElm = element.querySelector('input');
    inputElm.focus();

    expect(inputElm.getAttribute('placeholder')).to.be.equal('hello');

    setTimeout(_ => {
      triggerClick(buttonEl);
      inputElm.value = 'test';
      setTimeout(_ => {
        expect(inputElm.value).to.be.equal('test');
        done();
      }, 500);
    }, 500);
  });

  it('should render correct contents', () => {
    const Constructor = Vue.extend(Hello);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App');
  });
});
