document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, options);
  });

const themeSwitcher = document.querySelector('#theme-switcher');
const container = document.querySelector('#theme');


let mode = 'light';

themeSwitcher.addEventListener('click', function () {

  if (mode === 'dark') {
    mode = 'light';
    container.setAttribute('class', 'light');
  }
  else {
    mode = 'dark';
    container.setAttribute('class', 'dark');
  }
});

  