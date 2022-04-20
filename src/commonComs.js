import Vue from 'vue'

const Coms = [{
  name: 'diy-paging',
  component: () =>
    import ('./components/Paging.vue')
}

]

const vueComs = () => {
  Coms.forEach(item => {
    return Vue.component(item.name, item.component)
  })
}
export default vueComs
