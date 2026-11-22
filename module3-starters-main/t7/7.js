const trigger = document.getElementById('trigger');
const target = document.getElementById('target');
const originalImage = target.src;

trigger.addEventListener('mouseover', () => {
  target.src = 'img/picB.jpg';
});

trigger.addEventListener('mouseout', () => {
  target.src = originalImage;
});
