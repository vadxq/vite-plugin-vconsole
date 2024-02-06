if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.toggle('dark');
}

document.querySelector('#theme')?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
