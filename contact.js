// Progressive enhancement: contact links remain usable without JavaScript.
const copyButton = document.querySelector('.copy-email');
const emailLink = document.querySelector('#contact-email');
const feedback = document.querySelector('.contact-feedback');

if (copyButton && emailLink && feedback) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    copyButton.disabled = true;
    feedback.textContent = '';
    try {
      await navigator.clipboard.writeText(emailLink.textContent.trim());
      feedback.textContent = 'E-mail copiado. Cole no serviço de sua preferência.';
    } catch {
      // Select the visible address so copying is possible when permission is denied.
      const range = document.createRange();
      range.selectNodeContents(emailLink);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      feedback.textContent = 'Não foi possível copiar automaticamente. Selecione o endereço acima e copie manualmente.';
    } finally {
      copyButton.disabled = false;
    }
  });
}
