export default ({ app, store }, inject) => {
  inject('notifier', {
    showMessage ({ content = '', color = '' }) {
      console.log('showing message');
      store.commit('snackbar/showMessage', { content, color })
    }
  })
}
