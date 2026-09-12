(function () {
  const demoHeading = document.querySelector('#demo .report-h2');
  if (demoHeading) demoHeading.textContent = 'Five Bioinformatics Case Studies';

  const demoKicker = document.querySelector('#demo .report-kicker');
  if (demoKicker) demoKicker.textContent = '06 · Demo';

  const close = document.querySelector('[data-close]');
  if (close) close.setAttribute('aria-label', 'Close');

  const tabs = document.querySelectorAll('.dialog-tabs .tab');
  if (tabs[0]) tabs[0].textContent = 'Task Background';
  if (tabs[1]) tabs[1].textContent = 'View Report';

  const resultLabel = document.querySelector('#context-panel .result-box > span');
  if (resultLabel) resultLabel.textContent = 'Key Result';

  const reportFrame = document.querySelector('#report-frame');
  if (reportFrame) reportFrame.title = 'Analysis report';

  const note = document.querySelector('.report-note');
  if (note) note.textContent = 'Report available for online viewing only.';

  const prev = document.querySelector('[data-prev]');
  const next = document.querySelector('[data-next]');
  if (prev) prev.textContent = '← Previous';
  if (next) next.textContent = 'Next →';
})();
