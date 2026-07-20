import html2pdf from 'html2pdf.js'

export async function exportDocumentAsPdf(quill, documentId) {
  const editorContent = quill.root.cloneNode(true)

  const wrapper = document.createElement('div')
  wrapper.style.cssText =
    'padding: 24px; font-family: Georgia, "Times New Roman", serif; font-size: 12pt; line-height: 1.6; color: #000;'
  wrapper.appendChild(editorContent)

  const options = {
    margin: [12, 12, 12, 12],
    filename: `paperlite-${documentId}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  }

  await html2pdf().set(options).from(wrapper).save()
}
