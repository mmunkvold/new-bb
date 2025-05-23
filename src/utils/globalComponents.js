import HeadingElement from '../components/common/HeadingElement.vue';
import NavigationLink from '../components/common/NavigationLink.vue';
import BaseButton from '../components/base-components/BaseButton.vue';
import FilterButtons from '@/components/buttons/FilterButtons.vue';
import BicycleLoader from '@/components/common/BicycleLoader.vue';

export default function registerGlobalComponents(app) {
  app.component('HeadingElement', HeadingElement);
  app.component('NavigationLink', NavigationLink);
  app.component('BaseButton', BaseButton);
  app.component('FilterButtons', FilterButtons);
  app.component('BicycleLoader', BicycleLoader);

  const icons = import.meta.glob('../assets/icons/*.vue', { eager: true });

    Object.entries(icons).forEach(([path, module]) => {
        const name = path.split('/').pop().replace('.vue', ''); 
        app.component(name, module.default);
    });
}