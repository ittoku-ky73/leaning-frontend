const tabs = document.querySelectorAll('.info-box li a');
const panels = document.querySelectorAll('.info-box article');

tabs.forEach((tab, index) => {
  tab.onclick = function () {
    // initialize className to the tabs and panels 
    tabs.forEach((tab) => { tab.className = ''; });
    panels.forEach((panel) => { panel.className = ''; });

    // add className to this tab and panels
    tab.className = 'active';
    panels[index].className = 'active-panel';
  }
});
