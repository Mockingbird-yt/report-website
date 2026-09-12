const cases = [
  { title: 'DLBCL Prognostic Risk Model', desc: 'A 63-gene LASSO-Cox model for stratifying patients by survival risk.', context: 'Using gene-expression profiles and follow-up data from 420 DLBCL patients, this analysis builds and validates a prognostic model independent of age, stage, LDH, and ECOG status.', result: 'High- and low-risk groups differ significantly (P=1.18e-31); adjusted HR=4.59; C-index improves from 0.731 to 0.862.', video: 'assets/video/1-web.mp4', report: 'assets/reports/report-1.pdf' },
  { title: 'Single-Cell Hematopoietic Trajectory', desc: 'Reconstructing differentiation paths from HSCs to mature blood cells.', context: 'This task uses mouse bone-marrow single-cell RNA-seq data to reconstruct continuous differentiation trajectories, identify branch points, and find regulators of cell fate decisions.', result: '8,399 cells; 6 differentiation paths; 4 branch points; 10,415 dynamic genes identified.', video: 'assets/video/2-web.mp4', report: 'assets/reports/report-2.pdf' },
  { title: 'Protein-Protein Interaction Network', desc: 'Identifying core hub genes from ulcerative-colitis differential expression data.', context: 'Differentially expressed genes from GSE65114 are used to build a STRING protein-interaction network, followed by module analysis and topology-based hub-gene screening.', result: '299 DEGs; 224 nodes and 1,283 edges; 8 hub genes selected.', video: 'assets/video/3-web.mp4', report: 'assets/reports/report-3.pdf' },
  { title: 'PBMC3k Clustering and Annotation', desc: 'A complete single-cell workflow from quality control to immune-cell annotation.', context: 'Starting from the PBMC3k expression matrix, the workflow performs QC, normalization, highly variable gene selection, PCA, Louvain clustering, UMAP, and marker-based annotation.', result: '2,643 cells retained; 10 clusters; 9 PBMC cell types annotated.', video: 'assets/video/4-web.mp4', report: 'assets/reports/report-4.pdf' },
  { title: 'Machine-Learning Biomarker Screening', desc: 'Combining LASSO and SVM-RFE to identify HCM diagnostic biomarkers.', context: 'Differential expression and oxidative-stress gene sets are integrated with LASSO and SVM-RFE to identify stable diagnostic biomarkers for hypertrophic cardiomyopathy.', result: 'PRKCD, MGST1, and CA3 selected; corresponding AUC values are 0.981, 0.968, and 0.917.', video: 'assets/video/5-web.mp4', report: 'assets/reports/report-5.pdf' }
];

const grid = document.querySelector('#case-grid');
const dialog = document.querySelector('#case-dialog');
let current = 0;

grid.innerHTML = cases.map((item, index) => `<article class="case-card"><video controls controlslist="nodownload noplaybackrate" disablepictureinpicture preload="none" playsinline oncontextmenu="return false" src="${item.video}"></video><div class="case-copy"><span class="case-index">CASE ${String(index + 1).padStart(2, '0')}</span><h2>${item.title}</h2><p>${item.desc}</p><div class="case-actions"><button class="primary-button" data-open="${index}">Task Background</button><button class="secondary-button" data-open-report="${index}">View Report</button></div></div></article>`).join('');

const title = document.querySelector('#dialog-title');
const context = document.querySelector('#dialog-context');
const result = document.querySelector('#dialog-result');
const frame = document.querySelector('#report-frame');
const count = document.querySelector('#dialog-count');

function setTab(tabName) {
  document.querySelectorAll('[data-tab]').forEach(button => button.classList.toggle('is-active', button.dataset.tab === tabName));
  document.querySelector('#context-panel').hidden = tabName !== 'context';
  document.querySelector('#report-panel').hidden = tabName !== 'report';
}

function openCase(index, tabName = 'context') {
  current = (index + cases.length) % cases.length;
  const item = cases[current];
  document.querySelector('#dialog-kicker').textContent = `CASE ${String(current + 1).padStart(2, '0')}`;
  title.textContent = item.title;
  context.textContent = item.context;
  result.textContent = item.result;
  frame.src = `${item.report}#toolbar=0&navpanes=0`;
  count.textContent = `${current + 1} / ${cases.length}`;
  setTab(tabName);
  if (!dialog.open) dialog.showModal();
}

grid.addEventListener('click', event => {
  const button = event.target.closest('[data-open], [data-open-report]');
  if (!button) return;
  const isReport = button.dataset.openReport !== undefined;
  openCase(Number(button.dataset.open ?? button.dataset.openReport), isReport ? 'report' : 'context');
});

document.querySelector('[data-close]').addEventListener('click', () => dialog.close());
document.querySelector('[data-prev]').addEventListener('click', () => openCase(current - 1));
document.querySelector('[data-next]').addEventListener('click', () => openCase(current + 1));
document.querySelectorAll('[data-tab]').forEach(button => button.addEventListener('click', () => setTab(button.dataset.tab)));
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

let touchStartX = 0;
dialog.addEventListener('touchstart', event => { touchStartX = event.changedTouches[0].screenX; }, { passive: true });
dialog.addEventListener('touchend', event => {
  const delta = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(delta) > 55) openCase(current + (delta < 0 ? 1 : -1));
});
