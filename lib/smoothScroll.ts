export const smoothScroll = (targetId: string) => {
  const target = document.getElementById(targetId);
  if (!target) return;
  
  window.scrollTo({
    top: target.offsetTop,
    behavior: 'smooth'
  });
};

export const smoothScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
