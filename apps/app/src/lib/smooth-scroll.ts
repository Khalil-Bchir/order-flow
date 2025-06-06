export const scrollToSection = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80, // Offset for header height
      behavior: 'smooth',
    });
  }
};
